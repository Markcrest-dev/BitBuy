'use client'

import Link from 'next/link'
import { ShoppingCartIcon, UserIcon, Bars3Icon, ArrowRightOnRectangleIcon, ChevronDownIcon, FireIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import SearchBar from '@/components/search/SearchBar'
import CurrencySelector from '@/components/CurrencySelector'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const setUserId = useCartStore((state) => state.setUserId)
  const { data: session } = useSession()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Update cart userId when session changes
  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id)
    } else {
      setUserId(null)
    }
  }, [session?.user?.id, setUserId])

  const categories = [
    { name: 'Electronics', href: '/categories/electronics', icon: '💻' },
    { name: 'Clothing', href: '/categories/clothing', icon: '👕' },
    { name: 'Home & Living', href: '/categories/home-living', icon: '🏠' },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Single Unified Header */}
      <div className="bg-gradient-to-r from-gray-900 via-amber-900 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Logo */}
            <Link href="/landing" className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent flex-shrink-0 hover:scale-105 transition-transform">
              BitBuy
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
              <Link href="/products" className="text-white hover:text-amber-400 transition-colors font-medium text-sm">
                All Products
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-white hover:text-amber-400 transition-colors font-medium text-sm">
                  Categories
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-2 border-amber-100">
                  <div className="p-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/deals" className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors font-bold text-sm">
                <FireIcon className="w-4 h-4" />
                Deals
              </Link>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-md">
              <SearchBar showButton={false} placeholder="Search products..." />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Currency Selector */}
              <div className="hidden sm:block">
                <CurrencySelector />
              </div>

              {/* User Account */}
              {session ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="text-sm font-medium hidden lg:inline">{session.user?.name || 'Account'}</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
                  >
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Shopping Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 text-white hover:text-amber-400 transition-colors"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                <span className="hidden lg:inline text-sm font-medium">Cart</span>
                {isClient && getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-amber-400 transition-colors"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-3">
            <SearchBar showButton={false} placeholder="Search products..." />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link
              href="/landing"
              className="block py-2 px-4 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 px-4 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>

            {/* Mobile Categories */}
            <div>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between py-2 px-4 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors font-medium"
              >
                Categories
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoriesOpen && (
                <div className="mt-2 ml-4 space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center gap-3 py-2 px-4 text-gray-600 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/deals"
              className="block py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FireIcon className="w-5 h-5" />
              Deals
            </Link>

            {/* Mobile User Actions */}
            {!session && (
              <Link
                href="/login"
                className="block py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
            {session && (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 px-4 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
