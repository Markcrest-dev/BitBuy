'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ProductWithCategory } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useState } from 'react'

interface ProductCardProps {
  product: ProductWithCategory
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { formatPrice } = useCurrency()
  const [imageError, setImageError] = useState(false)

  const discountPercentage = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] || '',
      inventory: product.inventory,
    })
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {product.images[0] && !imageError ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Discount Badge - Premium Design */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            Save {discountPercentage}%
          </div>
        )}

        {/* Featured Badge - Premium Design */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-primary-light text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            ⭐ Featured
          </div>
        )}

        {/* Out of Stock Overlay - Enhanced */}
        {product.inventory === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold shadow-xl">
              Out of Stock
            </div>
          </div>
        )}

        {/* Quick View Button - Appears on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-full py-2.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl font-semibold hover:bg-white transition-colors text-sm"
            onClick={handleAddToCart}
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info - Enhanced Spacing */}
      <div className="p-5">
        {/* Category - Uppercase Badge Style */}
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">{product.category.name}</p>

        {/* Product Name - Larger, Bolder */}
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors text-base leading-snug">
          {product.name}
        </h3>

        {/* Price - Prominent Display */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-gray-400 line-through font-medium">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>

        {/* Stock Status - Warning Badge */}
        {product.inventory > 0 && product.inventory <= 10 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-xs font-medium mb-3">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Only {product.inventory} left
          </div>
        )}

        {/* Add to Cart Button - Premium Style */}
        <button
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            product.inventory > 0
              ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={product.inventory === 0}
          onClick={handleAddToCart}
        >
          {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </Link>
  )
}
