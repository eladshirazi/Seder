import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/db'

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        role: string
      }
    }
  }
}

interface JWTPayload {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from HTTP-only cookie
    const token = req.cookies?.token

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      })
      return
    }

    // Verify JWT token
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured')
      res.status(500).json({
        success: false,
        error: 'Authentication service unavailable'
      })
      return
    }

    const decoded = jwt.verify(token, jwtSecret) as JWTPayload

    // Check if session exists and is valid
    const session = await prisma.session.findFirst({
      where: {
        token,
        userId: decoded.userId,
        expiresAt: {
          gt: new Date()
        }
      }
    })

    if (!session) {
      res.status(401).json({
        success: false,
        error: 'Session expired'
      })
      return
    }

    // Check if user still exists and is active
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
        isActive: true
      },
      select: {
        id: true,
        email: true,
        role: true
      }
    })

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'User not found or inactive'
      })
      return
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        error: 'Invalid token'
      })
      return
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        error: 'Token expired'
      })
      return
    }

    res.status(500).json({
      success: false,
      error: 'Authentication failed'
    })
  }
} 