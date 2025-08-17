'use client'

import { useInventory } from '@/lib/hooks/useInventory'
import { Button } from '@/components/ui/button'
import { InventoryTable } from '@/components/inventory/inventory-table'
import { useState } from 'react'
import { AddInventoryItemForm } from '@/components/inventory/AddInventoryItemForm'

export default function InventoryPage() {
  const [showForm, setShowForm] = useState(false)
  const { items, isLoading, error , refetch} = useInventory()

  if (isLoading) {
    return <p className="p-4 text-gray-500">Loading inventory...</p>
  }

  if (error) {
    return <p className="p-4 text-red-500">Error: {error}</p>
  }

  const transformedItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category || 'Uncategorized',
    quantity: item.currentQuantity,
    supplier: '-', // בעתיד נשלוף ספק
    minStockLevel: item.minStockLevel,
  }))

  const totalItems = transformedItems.length
  const totalQuantity = transformedItems.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockCount = transformedItems.filter((item) => item.quantity < item.minStockLevel).length
  const uniqueSuppliers = new Set(transformedItems.map((item) => item.supplier)).size

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600">Manage your inventory items</p>
        </div>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Cancel' : '+ Add Item'}
        </Button>
      </div>

        {/* Add Item Form */}
        {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <AddInventoryItemForm
            onSuccess={() => {
              console.log('✅ onSuccess called')
              setShowForm(false) 
              refetch()
            }}
          />
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon="📦" title="Total Items" value={totalItems} color="blue" />
        <StatCard icon="📊" title="Total Quantity" value={totalQuantity} color="green" />
        <StatCard icon="⚠️" title="Low Stock" value={lowStockCount} color="yellow" />
        <StatCard icon="🏢" title="Suppliers" value={uniqueSuppliers} color="purple" />
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Inventory Items</h2>
        </div>
        <div className="p-6">
          <InventoryTable 
          items={transformedItems}
          onItemDeleted={refetch}
          />
        </div>
      </div>
    </div>
  )
}

// Small helper component for stat cards
function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: string
  title: string
  value: number
  color: 'blue' | 'green' | 'yellow' | 'purple'
}) {
  const bgColor = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
  }[color]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center ${bgColor}`}>
            <span className="text-lg">{icon}</span>
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}
