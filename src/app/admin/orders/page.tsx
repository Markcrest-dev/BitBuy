import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import OrderActions from '@/components/admin/OrderActions'

async function getOrders() {
  return await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      shippingAddress: true,
      items: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'PENDING').length,
    processing: orders.filter((o) => o.status === 'PROCESSING').length,
    shipped: orders.filter((o) => o.status === 'SHIPPED').length,
    delivered: orders.filter((o) => o.status === 'DELIVERED').length,
    cancelled: orders.filter((o) => o.status === 'CANCELLED').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">Manage customer orders and fulfillment</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400">
          <div className="text-sm font-medium text-gray-600">Total Orders</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400">
          <div className="text-sm font-medium text-gray-600">Pending</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-400">
          <div className="text-sm font-medium text-gray-600">Processing</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">{stats.processing}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-400">
          <div className="text-sm font-medium text-gray-600">Shipped</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">{stats.shipped}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-400">
          <div className="text-sm font-medium text-gray-600">Delivered</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{stats.delivered}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-400">
          <div className="text-sm font-medium text-gray-600">Cancelled</div>
          <div className="text-3xl font-bold text-red-600 mt-2">{stats.cancelled}</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.user.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(order.total)}
                      </div>
                      <div className="text-xs text-gray-500">{order.currencyCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <OrderActions orderId={order.id} currentStatus={order.status} />
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
