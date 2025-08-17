'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from './getCurrentUser'
import { User } from './auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => Promise<void>
  refetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

  const fetchUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      
      // If no user and we've already checked auth, redirect to login
      if (!currentUser && hasCheckedAuth) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setUser(null)
      
      // Only redirect if we've already checked auth once
      if (hasCheckedAuth) {
        router.push('/login')
      }
    } finally {
      setIsLoading(false)
      setHasCheckedAuth(true)
    }
  }

  const logout = async () => {
    try {
      // Import logout function dynamically to avoid circular dependencies
      const { logout: logoutApi } = await import('./auth')
      await logoutApi()
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, clear user and redirect to homepage
      setUser(null)
      router.push('/')
    }
  }

  const refetchUser = async () => {
    setIsLoading(true)
    await fetchUser()
  }

  useEffect(() => {
    fetchUser()
  }, []) // Only run once on mount

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refetchUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
} 