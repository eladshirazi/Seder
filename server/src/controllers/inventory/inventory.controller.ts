import { Request, Response } from 'express'
import { getAllInventoryItemsWithQuantity } from '../../services/inventory/inventory.service'
import { createInventoryItem } from '../../services/inventory/inventory.service'
import { prisma } from '../../lib/db'

export async function getInventoryHandler(req: Request, res: Response) {
  try {
    const items = await getAllInventoryItemsWithQuantity()
    res.json(items)
  } catch (error) {
    console.error('Error in getInventoryHandler:', error)
    res.status(500).json({ error: 'Failed to fetch inventory items' })
  }
}

export async function createInventoryItemHandler(req: Request, res: Response): Promise<void> {
  try {
    const { name, category, unit, minStockLevel } = req.body

    if (!name || !unit) {
      res.status(400).json({ error: 'Name and unit are required' })
      return
    }

    const item = await createInventoryItem({ name, category, unit, minStockLevel })
    res.status(201).json(item)
  } catch (error) {
    console.error('Error creating inventory item:', error)
    res.status(500).json({ error: 'Failed to create item' })
  }
}

export async function deleteInventoryItemHandler(req: Request, res: Response) {
  const itemId = req.params.id

  if (!itemId) {
    return res.status(400).json({ success: false, error: 'Missing item id' })
  }

  console.log('🗑️ Deleting item with id:', itemId)

  try {
    await prisma.stockMovement.deleteMany({
      where: { inventoryItemId: itemId },
    })
    
    await prisma.inventoryItem.delete({
      where: { id: itemId },
    })

    return res.status(200).json({ success: true })
  } catch (err: any) {
    console.error('❌ Error deleting inventory item:', err)

    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Item not found' })
    }

    return res.status(500).json({ success: false, error: 'Failed to delete item' })
  }
}
