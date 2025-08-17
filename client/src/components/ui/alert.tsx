import { ReactNode } from 'react'
import { AlertTriangle, X } from 'lucide-react'

interface AlertProps {
  title?: string
  children: ReactNode
  variant?: 'error' | 'warning' | 'info'
  onClose?: () => void
  className?: string
}

const variantStyles = {
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

const variantIcons = {
  error: AlertTriangle,
  warning: AlertTriangle,
  info: AlertTriangle,
}

export function Alert({ 
  title, 
  children, 
  variant = 'error', 
  onClose, 
  className = '' 
}: AlertProps) {
  const Icon = variantIcons[variant]

  return (
    <div className={`rounded-xl border p-4 ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start">
        <Icon className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          {title && (
            <h3 className="font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 p-1 rounded-md hover:bg-red-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
} 