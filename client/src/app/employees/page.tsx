import { Button } from '@/components/ui/button'

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage your team members</p>
        </div>
        <Button>
          + Add Employee
        </Button>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-lg shadow p-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <span className="text-4xl">👥</span>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Employees Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            This feature is coming soon. You'll be able to manage your team members, track their roles, and monitor performance.
          </p>
          <div className="mt-6">
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 