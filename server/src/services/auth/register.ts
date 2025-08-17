import bcrypt from 'bcrypt'
import { prisma } from '../../lib/db'
import { RegisterInput } from '../../lib/validations'

interface RegisterResult {
  success: boolean
  user?: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  error?: string
}

export async function registerUser({ email, password, firstName, lastName }: RegisterInput): Promise<RegisterResult> {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return {
        success: false,
        error: 'User with this email already exists'
      }
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      }
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName!,
        lastName: user.lastName!
      }
    }
  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      error: 'Failed to create user'
    }
  }
} 