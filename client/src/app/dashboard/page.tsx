'use client'

import { useAuth } from '@/lib/AuthContext'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { QuickAction } from '@/components/ui/quick-action'
import { ActivityTimeline } from '@/components/ui/activity-timeline'
import { Alert } from '@/components/ui/alert'
import { 
  Boxes, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  FileText, 
  BarChart3,
  AlertTriangle
} from 'lucide-react'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login via AuthProvider
  }

  const activityItems = [
    {
      id: '1',
      description: 'New inventory item "Premium Widget" added',
      time: '2 hours ago',
      type: 'info' as const,
    },
    {
      id: '2',
      description: 'Employee John Doe completed shift',
      time: '4 hours ago',
      type: 'success' as const,
    },
    {
      id: '3',
      description: 'Monthly financial report generated',
      time: '1 day ago',
      type: 'info' as const,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user.firstName}! 👋
        </h1>
        <p className="text-xl text-gray-600">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover>
          <CardContent className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Boxes className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Employees</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$45,678</p>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAction
            icon={Plus}
            label="Add Item"
            color="blue"
            href="../inventory/page.tsx"
          />
          <QuickAction
            icon={Users}
            label="Add Employee"
            color="green"
            href="../employees/page.tsx"
          />
          <QuickAction
            icon={FileText}
            label="Generate Report"
            color="purple"
            href="../finance/page.tsx"
          />
          <QuickAction
            icon={BarChart3}
            label="View Analytics"
            color="orange"
            href="/dashboard"
          />
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Alerts</h2>
        <div className="space-y-4">
          <Alert
            title="Low Stock Alert"
            variant="warning"
          >
            Widget A is running low on stock. Consider reordering soon.
          </Alert>
          <Alert
            title="System Update"
            variant="info"
          >
            New features are available. Check out the latest updates.
          </Alert>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <Card>
          <CardContent>
            <ActivityTimeline items={activityItems} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 