'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)
      try {
        // TODO: Implement actual search API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock results
        setResults([
          {
            id: '1',
            name: `Wireless Headphones matching "${query}"`,
            slug: 'wireless-headphones',
            price: 79.99,
            comparePrice: 129.99,
            images: ['/images/products/headphones-1.jpg'],
            rating: 4.5,
            reviewCount: 128,
            inventory: 50,
          },
          {
            id: '2',
            name: `Smart Watch for "${query}"`,
            slug: 'smart-watch',
            price: 299.99,
            images: ['/images/products/watch-1.jpg'],
            rating: 4.8,
            reviewCount: 89,
            inventory: 30,
          },
        ])
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (query) {
      fetchResults()
    } else {
      setIsLoading(false)
    }
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Search Results</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Search Results {query && `for "${query}"`}
        </h1>
        {!isLoading && (
          <p className="text-gray-600">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-gray-600 mb-6">
            {query
              ? `We couldn't find anything matching "${query}"`
              : 'Try searching for something'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse All Products
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>
          </div>

          {/* Search Suggestions */}
          <div className="mt-8 text-left max-w-md mx-auto">
            <h3 className="font-semibold mb-3">Search Suggestions:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check your spelling</li>
              <li>• Try more general keywords</li>
              <li>• Try different keywords</li>
              <li>• Browse by category instead</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Popular Searches */}
      {results.length === 0 && !isLoading && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Headphones',
              'Laptop',
              'Phone',
              'Watch',
              'Camera',
              'Shoes',
              'Clothing',
              'Beauty',
            ].map((term) => (
              <Link
                key={term}
                href={`/search?q=${term}`}
                className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
