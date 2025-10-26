import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

interface SearchResult {
  results: any[]
  categories: any[]
  suggestions: string[]
  total: number
}

export function useSearch(query: string, enabled = true) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return useQuery<SearchResult>({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        return { results: [], categories: [], suggestions: [], total: 0 }
      }

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(debouncedQuery)}`
      )

      if (!response.ok) {
        throw new Error('Search failed')
      }

      return response.json()
    },
    enabled: enabled && debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Hook for recent searches (stored in localStorage)
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches')
    if (stored) {
      setRecentSearches(JSON.parse(stored))
    }
  }, [])

  const addRecentSearch = (query: string) => {
    if (!query || query.length < 2) return

    const updated = [
      query,
      ...recentSearches.filter((s) => s !== query),
    ].slice(0, 10)

    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  return { recentSearches, addRecentSearch, clearRecentSearches }
}

// Hook for popular searches
export function usePopularSearches() {
  return useQuery<string[]>({
    queryKey: ['popularSearches'],
    queryFn: async () => {
      // For now, return static popular searches
      // In production, this would come from analytics
      return [
        'headphones',
        'laptop',
        'smartphone',
        'sneakers',
        'jacket',
        'yoga mat',
      ]
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}
