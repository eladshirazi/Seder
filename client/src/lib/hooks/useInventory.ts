'use client'

import { useEffect, useState, useCallback } from 'react'
import { fetchInventoryItems, InventoryItem } from '@/lib/api'

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadItems = useCallback(async () => {
    console.log('🔁 refetch called')
    setIsLoading(true)
    try {
      const data = await fetchInventoryItems()
      setItems(data)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  return {
    items,
    isLoading,
    error,
    refetch: loadItems,
  }
}
