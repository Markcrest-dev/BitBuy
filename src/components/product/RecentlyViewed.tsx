'use client'

import { useState, useEffect } from 'react'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import ProductCard from './ProductCard'
import { ProductWithCategory } from '@/types'

export default function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed()
  const [products, setProducts] = useState<ProductWithCategory[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      if (recentlyViewed.length === 0) return

      setIsLoading(true)
      try {
        const response = await fetch('/api/products/recently-viewed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds: recentlyViewed }),
        })

        if (response.ok) {
          const data = await response.json()
          setProducts(data.products || [])
        }
      } catch (error) {
        console.error('Failed to fetch recently viewed products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [recentlyViewed])

  if (recentlyViewed.length === 0 || products.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recently Viewed</h2>
          <p className="text-gray-600">{products.length} products</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
