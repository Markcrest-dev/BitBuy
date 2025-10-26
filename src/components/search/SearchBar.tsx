'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useSearch, useRecentSearches, usePopularSearches } from '@/hooks/useSearch'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

interface SearchBarProps {
  className?: string
  showButton?: boolean
  placeholder?: string
}

export default function SearchBar({
  className = '',
  showButton = true,
  placeholder = 'Search for products, categories...'
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { data: searchResults, isLoading } = useSearch(query, isOpen)
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches()
  const { data: popularSearches } = usePopularSearches()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) return

    addRecentSearch(searchQuery)
    setIsOpen(false)
    setQuery('')
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative w-full flex items-center bg-slate-50/50 border-2 border-gray-200/80 rounded-full overflow-hidden hover:border-primary/40 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-sm hover:shadow-md group">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-5 group-focus-within:text-primary transition-colors" />

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="flex-1 px-4 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent font-medium"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setIsOpen(false)
              }}
              className="mr-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          )}

          {showButton && (
            <button
              type="submit"
              className="m-1 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-full hover:from-primary-dark hover:to-primary transition-all flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg"
            >
              <span className="text-sm">Search</span>
            </button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 max-h-96 overflow-y-auto z-50">
          {query.length >= 2 && searchResults ? (
            <div>
              {/* Product Results */}
              {searchResults.results.length > 0 && (
                <div className="p-2">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Products
                  </p>
                  {searchResults.results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => {
                        addRecentSearch(query)
                        setIsOpen(false)
                        setQuery('')
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-primary/5 rounded-xl transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        {product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category.name}</p>
                      </div>
                      <p className="font-bold text-primary">{formatPrice(product.price)}</p>
                    </Link>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {searchResults.suggestions.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Suggestions
                  </p>
                  {searchResults.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-primary/5 rounded-xl transition-colors text-gray-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchResults.results.length === 0 && searchResults.suggestions.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p className="font-medium">No results found for "{query}"</p>
                  <p className="text-sm mt-1">Try different keywords</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="p-2">
                  <div className="flex items-center justify-between px-4 py-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Recent Searches
                    </p>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-primary hover:text-primary-dark"
                    >
                      Clear
                    </button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-4 py-2 hover:bg-primary/5 rounded-xl transition-colors text-gray-700 flex items-center gap-2"
                    >
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      {search}
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Searches */}
              {popularSearches && popularSearches.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Popular Searches
                  </p>
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-4 py-2 hover:bg-primary/5 rounded-xl transition-colors text-gray-700"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {isLoading && query.length >= 2 && (
            <div className="p-8 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Searching...</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
