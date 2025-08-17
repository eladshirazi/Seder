import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../../lib/db'
import { LoginInput } from '../../lib/validations'

interface LoginResult {
  success: boolean
  user?: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
  token?: string
  error?: string
}

export async function loginUser({ email, password }: LoginInput): Promise<LoginResult> {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true
      }
    })

    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password'
      }
    }

    // Check if user is active
    if (!user.isActive) {
      return {
        success: false,
        error: 'Account is deactivated'
      }
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Invalid email or password'
      }
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured')
      return {
        success: false,
        error: 'Authentication service unavailable'
      }
    }

    const payload = { 
      userId: user.id,
      email: user.email,
      role: user.role
    }

    // @ts-expect-error - TypeScript types for jwt.sign are incorrect in v9+, but this is correct usage
    const token = jwt.sign(payload, jwtSecret, { 
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    })

    // Create session record
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName!,
        lastName: user.lastName!,
        role: user.role
      },
      token
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: 'Authentication failed'
    }
  }
} 