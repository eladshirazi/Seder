'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createInventoryItem } from '@/lib/api' 

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().optional(),
  unit: z.string().min(1, 'Unit is required'),
  minStockLevel: z.coerce.number().min(0, 'Must be zero or higher'),
  
})

type FormValues = z.infer<typeof formSchema>

export function AddInventoryItemForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      unit: '',
      minStockLevel: 0,
    },
  })

  const onSubmit = async (data: FormValues) => {
    console.log('📤 onSubmit called with:', data)
    setIsSubmitting(true)
    try {
      const result = await createInventoryItem(data)

      if (!result.success) {
        throw new Error(result.error || 'Failed to add item')
      }

      toast.success('Item added successfully')
      reset()
      onSuccess?.()
    } catch (err) {
      toast.error((err as Error).message || 'Error adding item')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Name" {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <Input placeholder="Category (optional)" {...register('category')} />
        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
      </div>
      <div>
        <Input placeholder="Unit (e.g. kg, bottle)" {...register('unit')} />
        {errors.unit && <p className="text-sm text-red-500">{errors.unit.message}</p>}
      </div>
      <div>
        <Input
          type="number"
          placeholder="Minimum Stock Level"
          {...register('minStockLevel')}
        />
        {errors.minStockLevel && (
          <p className="text-sm text-red-500">{errors.minStockLevel.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Item'}
      </Button>
    </form>
  )
}
