import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface QuickActionProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  href?: string
  className?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

const colorClasses = {
  blue: 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300',
  green: 'border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300',
  purple: 'border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300',
  orange: 'border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300',
}

export function QuickAction({ 
  icon: Icon, 
  label, 
  onClick, 
  href, 
  className = '', 
  color = 'blue' 
}: QuickActionProps) {
  const baseClasses = `
    flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed
    transition-all duration-200 cursor-pointer min-h-[120px]
    ${colorClasses[color]}
    ${className}
  `

  const content = (
    <>
      <Icon className="w-8 h-8" />
      <span className="font-medium text-center">{label}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  )
} 