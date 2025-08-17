"use client"

import { AvatarMenu } from './avatar-menu'

interface TopbarProps {
  className?: string
}

export function Topbar({ className }: TopbarProps) {
  return (
    <header className={`w-full bg-white shadow-sm h-20 flex items-center px-8 justify-between ${className ?? ''}`}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">Seder.</span>
      </div>
      {/* User menu */}
      <div className="flex items-center gap-4">
        <AvatarMenu />
      </div>
    </header>
  )
} 