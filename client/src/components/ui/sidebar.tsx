"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Boxes, Users, DollarSign } from 'lucide-react'

interface SidebarNavItem {
  name: string
  href: string
  icon: React.ReactNode
  accentClass?: string
}

interface SidebarProps {
  nav: SidebarNavItem[]
  className?: string
}

const accentMap: Record<string, string> = {
  Dashboard: 'text-blue-600',
  Inventory: 'text-blue-600',
  Employees: 'text-green-600',
  Finance: 'text-purple-600',
}

export function Sidebar({ nav, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black flex flex-col shadow-lg ${className ?? ''}`}>
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <span className="text-2xl font-bold text-white tracking-tight">Seder.</span>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {nav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition
                ${isActive ? 'bg-white text-black shadow-md' : 'text-white hover:bg-gray-900 hover:text-white'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`w-5 h-5 ${accentMap[item.name] || 'text-gray-400'}`}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

// Example nav array for usage:
// const nav = [
//   { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
//   { name: 'Inventory', href: '/dashboard/inventory', icon: <Boxes /> },
//   { name: 'Employees', href: '/dashboard/employees', icon: <Users /> },
//   { name: 'Finance', href: '/dashboard/finance', icon: <DollarSign /> },
// ] 