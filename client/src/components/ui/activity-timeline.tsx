import { ReactNode } from 'react'

interface ActivityItem {
  id: string
  description: string
  time: string
  type: 'info' | 'success' | 'warning' | 'error'
}

interface ActivityTimelineProps {
  items: ActivityItem[]
  className?: string
}

const typeColors = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
}

export function ActivityTimeline({ items, className = '' }: ActivityTimelineProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="flex items-start space-x-3">
          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${typeColors[item.type]}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">{item.description}</p>
            <p className="text-xs text-gray-400 mt-1">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
} 