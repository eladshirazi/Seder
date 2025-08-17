
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface CreateInventoryItemInput {
  name: string
  category?: string
  unit: string
  minStockLevel?: number
}

interface CreateInventoryItemResponse {
  success: boolean
  error?: string
}

export interface InventoryItem {
    id: string
    name: string
    category: string | null
    unit: string
    minStockLevel: number
    currentQuantity: number
    createdAt: string
  }

  export async function createInventoryItem(data: CreateInventoryItemInput): Promise<CreateInventoryItemResponse> {
    console.log('📡 Calling API to create inventory item:', data)
  
    const res = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
  
    const result = await res.json()
  
    console.log('📥 API result:', result)
  
    return {
      success: res.ok, 
      error: !res.ok ? result.error || 'Unknown error' : undefined,
    }
  }
  

export async function fetchInventoryItems(): Promise<InventoryItem[]> {
    const res = await fetch(`${API_BASE_URL}/inventory`, {
      credentials: 'include'
    })
  
    if (!res.ok) {
      throw new Error('Failed to load inventory')
    }
  
    return res.json()
  }

  export async function deleteInventoryItem(id: string): Promise<{ success: boolean; error?: string }> {
    console.log('🗑️ Deleting item with id:', id)
    const res = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  
    return res.json()
  }
  