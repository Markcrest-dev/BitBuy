'use client'

import Link from 'next/link'
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <p>Free shipping on orders over $50!</p>
          <div className="flex gap-4">
            <Link href="/track-order" className="hover:underline">
              Track Order
            </Link>
            <Link href="/help" className="hover:underline">
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 flex-shrink-0">
            ShopHub
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-0 top-0 h-full px-6 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* User Account */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 hover:text-blue-600 transition"
            >
              <UserIcon className="w-6 h-6" />
              <span className="text-sm">Sign In</span>
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 hover:text-blue-600 transition"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="hidden sm:inline text-sm">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-2">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <ul className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:gap-6 py-3`}>
            <li>
              <Link href="/" className="block py-2 hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block py-2 hover:text-blue-600 transition">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories/electronics" className="block py-2 hover:text-blue-600 transition">
                Electronics
              </Link>
            </li>
            <li>
              <Link href="/categories/clothing" className="block py-2 hover:text-blue-600 transition">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="/categories/home" className="block py-2 hover:text-blue-600 transition">
                Home & Living
              </Link>
            </li>
            <li>
              <Link href="/deals" className="block py-2 text-red-600 font-semibold hover:text-red-700 transition">
                Deals
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
