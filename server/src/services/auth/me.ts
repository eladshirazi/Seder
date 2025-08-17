import { prisma } from '../../lib/db'

interface UserInfo {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: Date
}

interface GetUserResult {
  success: boolean
  user?: UserInfo
  error?: string
}

export async function getCurrentUser(userId: string): Promise<GetUserResult> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        isActive: true
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

    if (!user) {
      return {
        success: false,
        error: 'User not found'
      }
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName!,
        lastName: user.lastName!,
        role: user.role,
        createdAt: user.createdAt
      }
    }
  } catch (error) {
    console.error('Get current user error:', error)
    return {
      success: false,
      error: 'Failed to fetch user information'
    }
  }
} 