'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function DashboardPage() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'January 2025',
  })

  const [stats] = useState({
    totalOrders: 12,
    activeOrders: 2,
    totalSpent: 1245.67,
    savedItems: 5,
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold">Dashboard</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8 text-gray-900">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-amber-100">
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 font-semibold"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/orders"
                className="block px-4 py-3 rounded-lg hover:bg-amber-50 transition"
              >
                Orders
              </Link>
              <Link
                href="/dashboard/addresses"
                className="block px-4 py-3 rounded-lg hover:bg-amber-50 transition"
              >
                Addresses
              </Link>
              <Link
                href="/dashboard/wishlist"
                className="block px-4 py-3 rounded-lg hover:bg-amber-50 transition"
              >
                Wishlist
              </Link>
              <Link
                href="/dashboard/profile"
                className="block px-4 py-3 rounded-lg hover:bg-amber-50 transition"
              >
                Profile Settings
              </Link>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white rounded-xl p-6 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
            <p className="text-yellow-100">Member since {user.memberSince}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-100 hover:border-amber-300 transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-medium">Total Orders</p>
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100 hover:border-green-300 transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-medium">Active Orders</p>
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.activeOrders}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100 hover:border-purple-300 transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-medium">Total Spent</p>
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-100 hover:border-red-300 transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-medium">Saved Items</p>
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.savedItems}</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-amber-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link href="/dashboard/orders" className="text-amber-600 hover:text-amber-700 text-sm font-semibold transition">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 'ORD-001',
                  date: 'Oct 20, 2025',
                  status: 'Delivered',
                  total: 129.99,
                  items: 3,
                  statusColor: 'green',
                },
                {
                  id: 'ORD-002',
                  date: 'Oct 18, 2025',
                  status: 'In Transit',
                  total: 89.50,
                  items: 2,
                  statusColor: 'blue',
                },
              ].map((order) => (
                <div key={order.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-amber-300 hover:bg-amber-50/30 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.statusColor === 'green'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">{order.items} items</p>
                    <p className="font-bold text-gray-900">${order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-100">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/dashboard/orders"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition"
              >
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Track Order</p>
                  <p className="text-xs text-gray-600">Check delivery status</p>
                </div>
              </Link>

              <Link
                href="/dashboard/addresses"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition"
              >
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Manage Addresses</p>
                  <p className="text-xs text-gray-600">Update delivery info</p>
                </div>
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition"
              >
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Get Help</p>
                  <p className="text-xs text-gray-600">Contact support</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
