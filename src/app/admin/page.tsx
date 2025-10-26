import { prisma } from '@/lib/prisma'
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CubeIcon,
} from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/utils'

async function getAdminStats() {
  const [
    totalOrders,
    totalRevenue,
    totalUsers,
    totalProducts,
    recentOrders,
  ] = await Promise.all([
    // Total orders
    prisma.order.count(),

    // Total revenue
    prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: {
          not: 'CANCELLED',
        },
      },
    }),

    // Total users
    prisma.user.count(),

    // Total products
    prisma.product.count({
      where: {
        active: true,
      },
    }),

    // Recent orders
    prisma.order.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
  ])

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.total || 0,
    totalUsers,
    totalProducts,
    recentOrders,
  }
}

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  const statCards = [
    {
      name: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: CurrencyDollarIcon,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingBagIcon,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      name: 'Total Users',
      value: stats.totalUsers.toString(),
      icon: UserGroupIcon,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      name: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: CubeIcon,
      color: 'bg-gradient-to-br from-primary to-primary-dark',
    },
  ]

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-xl`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                      <div className="text-sm text-gray-500">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
