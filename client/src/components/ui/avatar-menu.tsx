"use client"

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { User, LogOut, Settings, UserCircle } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'

interface AvatarMenuProps {
  className?: string
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .join('')
    .slice(0, 2)
}

export function AvatarMenu({ className }: AvatarMenuProps) {
  const { user, logout } = useAuth()
  if (!user) return null

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 font-bold text-lg focus:outline-none border border-gray-200 hover:ring-2 hover:ring-blue-200 transition ${className ?? ''}`}
          aria-label="User menu"
        >
          <span>{getInitials(`${user.firstName} ${user.lastName}`)}</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={8}
        className="z-50 min-w-[180px] rounded-xl bg-white shadow-lg border border-gray-100 py-2 px-1 animate-fadeIn"
      >
        <DropdownMenu.Label className="px-3 py-2 text-xs text-gray-500 font-semibold">
          Signed in as
        </DropdownMenu.Label>
        <div className="px-3 pb-2">
          <div className="font-medium text-gray-900 text-sm">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xs text-gray-500 truncate">{user.email}</div>
        </div>
        <DropdownMenu.Separator className="my-1 h-px bg-gray-100" />
        <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
          <UserCircle className="w-4 h-4 text-blue-600" />
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer text-sm">
          <Settings className="w-4 h-4 text-purple-600" />
          Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="my-1 h-px bg-gray-100" />
        <DropdownMenu.Item
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer text-sm font-medium"
          onSelect={async (e) => {
            e.preventDefault()
            await logout()
          }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
} 