import { prisma } from '../../lib/db'

interface LogoutResult {
  success: boolean
  error?: string
}

export async function logoutUser(token: string): Promise<LogoutResult> {
  try {
    // Delete the session
    await prisma.session.deleteMany({
      where: {
        token
      }
    })

    return {
      success: true
    }
  } catch (error) {
    console.error('Logout error:', error)
    return {
      success: false,
      error: 'Failed to logout'
    }
  }
} 