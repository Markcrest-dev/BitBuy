'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatPrice } from '@/lib/utils'

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: 'Oct 20, 2025',
      status: 'Delivered',
      total: 129.99,
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 89.99 },
        { name: 'Phone Case', quantity: 2, price: 20.00 },
      ],
      statusColor: 'green',
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-002',
      date: 'Oct 18, 2025',
      status: 'In Transit',
      total: 89.50,
      items: [
        { name: 'USB Cable', quantity: 2, price: 44.75 },
      ],
      statusColor: 'blue',
      trackingNumber: 'TRK987654321',
    },
    {
      id: 'ORD-003',
      date: 'Oct 15, 2025',
      status: 'Processing',
      total: 199.99,
      items: [
        { name: 'Smart Watch', quantity: 1, price: 199.99 },
      ],
      statusColor: 'yellow',
      trackingNumber: null,
    },
    {
      id: 'ORD-004',
      date: 'Oct 10, 2025',
      status: 'Delivered',
      total: 45.50,
      items: [
        { name: 'Notebook Set', quantity: 1, price: 45.50 },
      ],
      statusColor: 'green',
      trackingNumber: 'TRK555444333',
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Orders</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/orders"
                className="block px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold"
              >
                Orders
              </Link>
              <Link
                href="/dashboard/addresses"
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Addresses
              </Link>
              <Link
                href="/dashboard/wishlist"
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Wishlist
              </Link>
              <Link
                href="/dashboard/profile"
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Profile Settings
              </Link>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Orders List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Order History</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Filter
                </button>
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Export
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-6">
                      <div>
                        <p className="text-xs text-gray-600">Order Number</p>
                        <p className="font-semibold">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Date Placed</p>
                        <p className="font-semibold">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Total Amount</p>
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.statusColor === 'green'
                          ? 'bg-green-100 text-green-700'
                          : order.statusColor === 'blue'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">{formatPrice(item.price)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        View Details
                      </button>
                      {order.trackingNumber && (
                        <button className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                          Track Package
                        </button>
                      )}
                      {order.status === 'Delivered' && (
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                          Buy Again
                        </button>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {selectedOrder === order.id && (
                      <div className="mt-4 pt-4 border-t bg-gray-50 -mx-6 px-6 py-4">
                        <h3 className="font-semibold mb-3">Order Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Shipping Address</p>
                            <p className="font-medium">123 Main Street</p>
                            <p>New York, NY 10001</p>
                            <p>United States</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Payment Method</p>
                            <p className="font-medium">Visa ending in 4242</p>
                            {order.trackingNumber && (
                              <>
                                <p className="text-gray-600 mt-3 mb-1">Tracking Number</p>
                                <p className="font-medium">{order.trackingNumber}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State (if no orders) */}
            {orders.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                <Link
                  href="/products"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
