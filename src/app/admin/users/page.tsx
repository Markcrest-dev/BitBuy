import { prisma } from '@/lib/prisma'
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          orders: true,
          reviews: true,
        },
      },
    },
  })

  return users
}

async function getUserStats() {
  const [totalUsers, adminCount, customerCount, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'ADMIN' } }),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    }),
  ])

  return {
    totalUsers,
    adminCount,
    customerCount,
    recentUsers,
  }
}

export default async function AdminUsersPage() {
  const users = await getUsers()
  const stats = await getUserStats()

  const statCards = [
    {
      name: 'Total Users',
      value: stats.totalUsers.toString(),
      icon: UserGroupIcon,
      color: 'from-amber-500 to-yellow-600',
      textColor: 'text-amber-600',
    },
    {
      name: 'Administrators',
      value: stats.adminCount.toString(),
      icon: ShieldCheckIcon,
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600',
    },
    {
      name: 'Customers',
      value: stats.customerCount.toString(),
      icon: UserIcon,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
    },
    {
      name: 'New This Month',
      value: stats.recentUsers.toString(),
      icon: CalendarIcon,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
    },
  ]

  const getRoleBadgeColor = (role: string) => {
    return role === 'ADMIN'
      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage all registered users</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg font-medium hover:from-amber-700 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl">
              Export Users
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all border-2 border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className={`text-3xl font-bold ${stat.textColor} mt-2`}>{stat.value}</p>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-2 border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            />
          </div>
          <select className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all">
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="CUSTOMER">Customer</option>
            <option value="VENDOR">Vendor</option>
          </select>
          <select className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all">
            <option value="">Sort By</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="orders">Most Orders</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border-2 border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Users ({users.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-amber-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Reviews
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <UserGroupIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-amber-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{user.name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                          <span className="truncate max-w-xs">{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{user._count.orders}</div>
                      <div className="text-xs text-gray-500">orders</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{user._count.reviews}</div>
                      <div className="text-xs text-gray-500">reviews</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all text-xs"
                        >
                          View
                        </Link>
                        <button className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-yellow-700 transition-all text-xs">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {users.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-bold text-gray-900">1</span> to{' '}
                <span className="font-bold text-gray-900">{Math.min(users.length, 10)}</span> of{' '}
                <span className="font-bold text-gray-900">{users.length}</span> users
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Previous
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all font-medium">
                  1
                </button>
                <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
          <ShieldCheckIcon className="w-12 h-12 text-blue-600 mb-4" strokeWidth={1.5} />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Promote to Admin</h3>
          <p className="text-sm text-gray-600 mb-4">
            Upgrade selected user accounts to administrator access
          </p>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Manage Roles →
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
          <EnvelopeIcon className="w-12 h-12 text-green-600 mb-4" strokeWidth={1.5} />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Send Email</h3>
          <p className="text-sm text-gray-600 mb-4">
            Send promotional emails or notifications to users
          </p>
          <button className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
            Compose Email →
          </button>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200">
          <CalendarIcon className="w-12 h-12 text-amber-600 mb-4" strokeWidth={1.5} />
          <h3 className="text-lg font-bold text-gray-900 mb-2">User Analytics</h3>
          <p className="text-sm text-gray-600 mb-4">
            View detailed analytics and user behavior insights
          </p>
          <button className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
            View Analytics →
          </button>
        </div>
      </div>
    </div>
  )
}
