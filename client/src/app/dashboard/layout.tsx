'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { Sidebar } from '@/components/ui/sidebar'
import { Topbar } from '@/components/ui/topbar'
import { LayoutDashboard, Boxes, Users, DollarSign } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const nav = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
  { name: 'Inventory', href: '/inventory', icon: <Boxes /> },
  { name: 'Employees', href: '/employees', icon: <Users /> },
  { name: 'Finance', href: '/finance', icon: <DollarSign /> },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login via AuthProvider
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <Sidebar nav={nav} />
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        <Topbar />
        <main className="flex-1 py-8 px-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
} 