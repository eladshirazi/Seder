import { Request, Response, RequestHandler } from 'express'
import { registerUser } from '../services/auth/register'
import { loginUser } from '../services/auth/login'
import { logoutUser } from '../services/auth/logout'
import { registerSchema, loginSchema } from '../lib/validations'

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input
    const validationResult = registerSchema.safeParse(req.body)
    
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.errors
      })
      return
    }

    const { email, password, firstName, lastName } = validationResult.data

    // Register user
    const result = await registerUser({ email, password, firstName, lastName })

    if (!result.success) {
      res.status(400).json({
        success: false,
        error: result.error
      })
      return
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: result.user
    })
  } catch (error) {
    console.error('Registration controller error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input
    const validationResult = loginSchema.safeParse(req.body)
    
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.errors
      })
      return
    }

    const { email, password } = validationResult.data

    // Login user
    const result = await loginUser({ email, password })

    if (!result.success) {
      res.status(401).json({
        success: false,
        error: result.error
      })
      return
    }

    // Set JWT token in HTTP-only cookie
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: result.user
    })
  } catch (error) {
    console.error('Login controller error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

export const logout: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies?.token

    if (token) {
      await logoutUser(token)
    }

    // Clear the cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Logout controller error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
} 