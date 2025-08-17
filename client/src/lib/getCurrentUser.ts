import { User } from './auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      return null
    }

    const result = await response.json()
    
    if (result.success && result.user) {
      return result.user
    }

    return null
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
} 