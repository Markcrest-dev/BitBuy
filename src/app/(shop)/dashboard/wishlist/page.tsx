'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCurrency } from '@/hooks/useCurrency'
import { useCartStore } from '@/store/cartStore'

interface WishlistItem {
  id: string
  productId: string
  product: {
    id: string
    name: string
    slug: string
    price: number
    comparePrice?: number | null
    images: string[]
    inventory: number
    active: boolean
  }
  createdAt: string
}

export default function WishlistPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { addItem } = useCartStore()
  const { formatPrice } = useCurrency()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard/wishlist')
    }
  }, [status, router])

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!session?.user) return

      try {
        const response = await fetch('/api/wishlist')
        if (response.ok) {
          const data = await response.json()
          setWishlist(data.wishlist || [])
        }
      } catch (error) {
        console.error('Failed to fetch wishlist:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user) {
      fetchWishlist()
    }
  }, [session])

  const handleRemove = async (productId: string) => {
    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setWishlist((prev) => prev.filter((item) => item.product.id !== productId))
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to remove from wishlist')
      }
    } catch (error) {
      console.error('Remove from wishlist error:', error)
      alert('Failed to remove from wishlist')
    }
  }

  const handleAddToCart = (item: WishlistItem) => {
    addItem({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      image: item.product.images[0] || '',
      inventory: item.product.inventory,
    })
    alert('Added to cart!')
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    )
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
              {wishlist.map((item) => {
                const inStock = item.product.inventory > 0 && item.product.active
                return (
                  <div key={item.id} className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group border-2 border-amber-100">
                    <Link href={`/products/${item.product.slug}`} className="block">
                      <div className="relative aspect-square bg-gray-100">
                        {item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
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

                        {!inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="bg-white px-4 py-2 rounded-lg font-semibold">
                              Out of Stock
                            </span>
                          </div>
                        )}

                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleRemove(item.product.id)
                          }}
                          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition"
                        >
                          <TrashIcon className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-semibold text-gray-900 hover:text-amber-700 line-clamp-2 mb-2 block transition-colors"
                      >
                        {item.product.name}
                      </Link>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.comparePrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.product.comparePrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={!inStock}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition shadow-md font-medium disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed"
                      >
                        <ShoppingCartIcon className="w-5 h-5" />
                        {inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                )
              })}
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
