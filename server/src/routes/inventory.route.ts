// src/routes/inventory.route.ts
import { Router } from 'express'
import { getInventoryHandler } from '../controllers/inventory/inventory.controller'
import { requireAuth } from '../middleware/auth'
import { createInventoryItemHandler } from '../controllers/inventory/inventory.controller'
import { deleteInventoryItemHandler } from '../controllers/inventory/inventory.controller'

const router = Router()

console.log('✅ inventory.route.ts loaded')
router.get('/', requireAuth, getInventoryHandler)
router.post('/', requireAuth, createInventoryItemHandler)
router.delete('/:id', requireAuth, deleteInventoryItemHandler)



export default router
