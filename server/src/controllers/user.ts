import { Request, Response, RequestHandler } from 'express'
import { getCurrentUser } from '../services/auth/me'

export const getMe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      })
      return
    }

    const result = await getCurrentUser(req.user.id)

    if (!result.success) {
      res.status(404).json({
        success: false,
        error: result.error
      })
      return
    }

    res.status(200).json({
      success: true,
      user: result.user
    })
  } catch (error) {
    console.error('Get me controller error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
} 