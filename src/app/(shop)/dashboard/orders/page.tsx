'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { formatPrice } from '@/lib/utils'
import { format } from 'date-fns'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  productName: string
  product: {
    id: string
    name: string
    slug: string
    images: string[]
  }
}

interface Order {
  id: string
  orderNumber: string
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  subtotal: number
  shipping: number
  tax: number
  total: number
  createdAt: string
  items: OrderItem[]
  shippingAddress?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

const statusColors = {
  PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  PROCESSING: { bg: 'bg-blue-100', text: 'text-blue-700' },
  SHIPPED: { bg: 'bg-purple-100', text: 'text-purple-700' },
  DELIVERED: { bg: 'bg-green-100', text: 'text-green-700' },
  CANCELLED: { bg: 'bg-red-100', text: 'text-red-700' },
}

async function fetchOrders() {
  const response = await fetch('/api/orders')
  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }
  const data = await response.json()
  return data.orders as Order[]
}

async function cancelOrder(orderId: string) {
  const response = await fetch(`/api/orders/${orderId}/cancel`, {
    method: 'POST',
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to cancel order')
  }
  return response.json()
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  const handleCancelOrder = async (orderId: string, orderNumber: string) => {
    if (confirm(`Are you sure you want to cancel order ${orderNumber}?`)) {
      try {
        await cancelOrderMutation.mutateAsync(orderId)
        alert('Order cancelled successfully')
      } catch (error: any) {
        alert(error.message || 'Failed to cancel order')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-amber-600">/</span>
          <Link href="/dashboard" className="hover:text-amber-600 transition-colors">
            Dashboard
          </Link>
          <span className="mx-2 text-amber-600">/</span>
          <span className="text-gray-900 font-medium">Orders</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
          My Orders
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-4 border-2 border-amber-100">
              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 font-bold shadow-sm"
                >
                  Orders
                </Link>
                <Link
                  href="/dashboard/addresses"
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition font-medium"
                >
                  Addresses
                </Link>
                <Link
                  href="/dashboard/wishlist"
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition font-medium"
                >
                  Wishlist
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition font-medium"
                >
                  Profile Settings
                </Link>
              </nav>
            </div>
          </aside>

          {/* Orders List */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 border-2 border-amber-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Order History</h2>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading orders...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-700">Failed to load orders. Please try again.</p>
                </div>
              )}

              {/* Orders List */}
              {!isLoading && !error && (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border-2 border-amber-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow"
                    >
                      {/* Order Header */}
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                        <div className="flex flex-wrap gap-6">
                          <div>
                            <p className="text-xs text-gray-600">Order Number</p>
                            <p className="font-semibold">{order.orderNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Date Placed</p>
                            <p className="font-semibold">
                              {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Total Amount</p>
                            <p className="font-semibold">{formatPrice(order.total)}</p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColors[order.status].bg
                          } ${statusColors[order.status].text}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Order Items */}
                      <div className="px-6 py-4">
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div className="flex gap-4">
                                {item.product.images[0] && (
                                  <img
                                    src={item.product.images[0]}
                                    alt={item.productName}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                )}
                                <div>
                                  <Link
                                    href={`/products/${item.product.slug}`}
                                    className="font-medium text-gray-900 hover:text-amber-600"
                                  >
                                    {item.productName}
                                  </Link>
                                  <p className="text-sm text-gray-600">
                                    Quantity: {item.quantity} × {formatPrice(item.price)}
                                  </p>
                                </div>
                              </div>
                              <p className="font-semibold">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-4 pt-4 border-t border-amber-200 flex flex-wrap gap-3">
                          <Link
                            href={`/orders/${order.id}`}
                            className="px-4 py-2 text-sm border-2 border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition font-medium"
                          >
                            View Details
                          </Link>
                          {(order.status === 'PENDING' || order.status === 'PROCESSING') && (
                            <button
                              onClick={() => handleCancelOrder(order.id, order.orderNumber)}
                              disabled={cancelOrderMutation.isPending}
                              className="px-4 py-2 text-sm border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition font-medium disabled:opacity-50"
                            >
                              {cancelOrderMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
                            </button>
                          )}
                        </div>

                        {/* Expanded Details */}
                        {selectedOrder === order.id && order.shippingAddress && (
                          <div className="mt-4 pt-4 border-t border-amber-200 bg-amber-50 -mx-6 px-6 py-4">
                            <h3 className="font-semibold mb-3 text-gray-900">Order Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 mb-1">Shipping Address</p>
                                <p className="font-medium">{order.shippingAddress.street}</p>
                                <p>
                                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                                  {order.shippingAddress.zipCode}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Order Summary</p>
                                <p>Subtotal: {formatPrice(order.subtotal)}</p>
                                <p>Shipping: {formatPrice(order.shipping)}</p>
                                <p>Tax: {formatPrice(order.tax)}</p>
                                <p className="font-semibold mt-2">
                                  Total: {formatPrice(order.total)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && !error && orders.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                  <Link
                    href="/products"
                    className="inline-block bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-yellow-700 transition font-medium shadow-md"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
