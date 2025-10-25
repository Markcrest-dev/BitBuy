'use client'

import { useState } from 'react'
import Link from 'next/link'

interface OrderTracking {
  orderNumber: string
  status: string
  estimatedDelivery: string
  currentLocation: string
  timeline: {
    status: string
    date: string
    description: string
    completed: boolean
  }[]
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [tracking, setTracking] = useState<OrderTracking | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // TODO: Implement actual order tracking API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock tracking data
      setTracking({
        orderNumber: orderNumber,
        status: 'In Transit',
        estimatedDelivery: 'Dec 25, 2024',
        currentLocation: 'New York Distribution Center',
        timeline: [
          {
            status: 'Order Placed',
            date: 'Dec 20, 2024 10:30 AM',
            description: 'Your order has been received',
            completed: true,
          },
          {
            status: 'Processing',
            date: 'Dec 20, 2024 2:45 PM',
            description: 'Your order is being prepared',
            completed: true,
          },
          {
            status: 'Shipped',
            date: 'Dec 21, 2024 9:00 AM',
            description: 'Package has been shipped',
            completed: true,
          },
          {
            status: 'In Transit',
            date: 'Dec 22, 2024 3:20 PM',
            description: 'Package is on the way to you',
            completed: true,
          },
          {
            status: 'Out for Delivery',
            date: 'Estimated Dec 25, 2024',
            description: 'Package is out for delivery',
            completed: false,
          },
          {
            status: 'Delivered',
            date: 'Estimated Dec 25, 2024',
            description: 'Package will be delivered',
            completed: false,
          },
        ],
      })
    } catch (err) {
      setError('Order not found. Please check your order number and email.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Track Order</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>

        {!tracking ? (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-600 mb-6 text-center">
              Enter your order number and email to track your package
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-800">{error}</div>
                </div>
              )}

              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  required
                  placeholder="e.g., ORD-123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isLoading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Can't find your order number?</p>
              <Link href="/dashboard/orders" className="text-blue-600 hover:text-blue-700 font-medium">
                View your orders →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="text-xl font-bold">{tracking.orderNumber}</p>
                </div>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
                  {tracking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold">{tracking.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Location</p>
                  <p className="font-semibold">{tracking.currentLocation}</p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Tracking History</h2>

              <div className="space-y-6">
                {tracking.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          event.completed
                            ? 'bg-blue-600 border-blue-600'
                            : 'bg-white border-gray-300'
                        }`}
                      ></div>
                      {index < tracking.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-full min-h-[40px] ${
                            event.completed ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        ></div>
                      )}
                    </div>

                    <div className="flex-1 pb-6">
                      <p className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {event.status}
                      </p>
                      <p className="text-sm text-gray-600">{event.date}</p>
                      <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setTracking(null)}
                className="flex-1 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition font-semibold"
              >
                Track Another Order
              </button>
              <Link
                href="/contact"
                className="flex-1 py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition font-semibold"
              >
                Contact Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
