'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'

interface WishlistItem {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  image: string
  inStock: boolean
  inventory: number
}

export default function WishlistPage() {
  const { addItem } = useCartStore()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      slug: 'wireless-bluetooth-headphones',
      price: 79.99,
      comparePrice: 129.99,
      image: '/images/products/headphones-1.jpg',
      inStock: true,
      inventory: 50,
    },
    {
      id: '2',
      name: 'Smart Watch Series 5',
      slug: 'smart-watch-series-5',
      price: 299.99,
      comparePrice: 399.99,
      image: '/images/products/watch-1.jpg',
      inStock: false,
      inventory: 0,
    },
  ])

  const handleRemove = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddToCart = (item: WishlistItem) => {
    addItem({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      image: item.image,
      inventory: item.inventory,
    })
    alert('Added to cart!')
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
          <span className="text-gray-900 font-medium">Wishlist</span>
        </nav>

        <div className="max-w-6xl">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">My Wishlist ({wishlist.length})</h1>

          {wishlist.length === 0 ? (
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-12 text-center border-2 border-amber-100">
              <div className="text-6xl mb-4">💝</div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Save your favorite items to your wishlist to buy them later
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition shadow-md font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group border-2 border-amber-100">
                <Link href={`/products/${item.slug}`} className="block">
                  <div className="relative aspect-square bg-gray-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          className="w-24 h-24"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white px-4 py-2 rounded-lg font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleRemove(item.id)
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition"
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </Link>

                  <div className="p-4">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-semibold text-gray-900 hover:text-amber-700 line-clamp-2 mb-2 block transition-colors"
                    >
                      {item.name}
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                        {formatPrice(item.price)}
                      </span>
                      {item.comparePrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.comparePrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition shadow-md font-medium disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed"
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {wishlist.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                href="/products"
                className="inline-block text-amber-700 hover:text-amber-800 font-bold transition-colors"
              >
                Continue Shopping →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
