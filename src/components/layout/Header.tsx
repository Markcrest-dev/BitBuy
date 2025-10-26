'use client'

import Link from 'next/link'
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar - Luxury Gold/Black Theme */}
      <div className="bg-gradient-to-r from-secondary via-primary-dark to-secondary text-white py-2.5">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <p className="flex items-center gap-2">
            <span className="text-accent">✨</span>
            Free shipping on orders over $50!
          </p>
          <div className="flex gap-6">
            <Link href="/track-order" className="hover:text-accent transition-colors">
              Track Order
            </Link>
            <Link href="/help" className="hover:text-accent transition-colors">
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Luxury Gold Branding */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent flex-shrink-0 hover:scale-105 transition-transform">
            ShopHub
          </Link>

          {/* Search Bar - Premium Design */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="w-full flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm hover:shadow-md">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white hover:from-primary-dark hover:to-primary transition-all flex items-center justify-center">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons - Gold Theme */}
          <div className="flex items-center gap-4">
            {/* User Account */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors font-medium"
            >
              <UserIcon className="w-6 h-6" />
              <span className="text-sm">Sign In</span>
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-primary transition-colors font-medium"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="hidden sm:inline text-sm">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary transition-colors"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search - Premium Design */}
        <div className="md:hidden mt-4">
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
            />
            <button className="px-4 py-3 text-primary hover:text-primary-dark transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation - Refined Gold Theme */}
      <nav className="bg-gradient-to-r from-slate-50 to-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <ul className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:gap-8 py-3`}>
            <li>
              <Link href="/" className="block py-2 text-gray-700 font-medium hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block py-2 text-gray-700 font-medium hover:text-primary transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories/electronics" className="block py-2 text-gray-700 font-medium hover:text-primary transition-colors">
                Electronics
              </Link>
            </li>
            <li>
              <Link href="/categories/clothing" className="block py-2 text-gray-700 font-medium hover:text-primary transition-colors">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="/categories/home" className="block py-2 text-gray-700 font-medium hover:text-primary transition-colors">
                Home & Living
              </Link>
            </li>
            <li>
              <Link href="/deals" className="block py-2 text-red-600 font-bold hover:text-red-700 transition-colors flex items-center gap-1">
                <span>🔥</span> Deals
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
