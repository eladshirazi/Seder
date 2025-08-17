import { Router } from 'express'
import { getMe } from '../controllers/user'
import { requireAuth } from '../middleware/auth'

const router = Router()

// Protected routes - require authentication
router.get('/me', requireAuth, getMe)

export { router as userRoutes } 