import { prisma } from '../../lib/db'

interface StockMovementLite {
  type: 'IN' | 'OUT'
  quantity: number
}

interface InventoryItemWithMovements {
  id: string
  name: string
  category: string | null
  unit: string
  minStockLevel: number
  createdAt: Date
  stockMovements: StockMovementLite[]
}

interface InventoryItemWithQuantity {
  id: string
  name: string
  category: string | null
  unit: string
  minStockLevel: number
  currentQuantity: number
  createdAt: Date
}

export async function getAllInventoryItemsWithQuantity(): Promise<InventoryItemWithQuantity[]> {
  const items = await prisma.inventoryItem.findMany({
    include: {
      stockMovements: true,
    },
    orderBy: { name: 'asc' },
  })

  return items.map((item: InventoryItemWithMovements): InventoryItemWithQuantity => {
    const totalIn = item.stockMovements
      .filter((m: StockMovementLite) => m.type === 'IN')
      .reduce((sum: number, m: StockMovementLite) => sum + m.quantity, 0)

    const totalOut = item.stockMovements
      .filter((m: StockMovementLite) => m.type === 'OUT')
      .reduce((sum: number, m: StockMovementLite) => sum + m.quantity, 0)

    const currentQuantity = totalIn - totalOut

    return {
      id: item.id,
      name: item.name,
      category: item.category,
      unit: item.unit,
      minStockLevel: item.minStockLevel,
      currentQuantity,
      createdAt: item.createdAt,
    }
  })
}


export async function createInventoryItem(data: {
  name: string
  category?: string
  unit: string
  minStockLevel?: number
}) {
  return prisma.inventoryItem.create({
    data: {
      name: data.name,
      category: data.category ?? null,
      unit: data.unit,
      minStockLevel: data.minStockLevel ?? 0,
      stockMovements: {
        create: {
          type: 'IN',
          quantity: 0, // אם תרצה, תוכל לשנות שיכניס כבר כמות התחלתית
        },
      },
    },
    include: {
      stockMovements: true, // ← כדי לוודא שחוזר גם המידע הזה
    }
  })
}