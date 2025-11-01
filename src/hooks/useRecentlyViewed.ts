'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'recentlyViewedProducts'
const MAX_ITEMS = 12

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRecentlyViewed(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error)
    }
  }, [])

  const addProduct = (productId: string) => {
    try {
      setRecentlyViewed((prev) => {
        // Remove if already exists
        const filtered = prev.filter((id) => id !== productId)
        // Add to beginning
        const updated = [productId, ...filtered].slice(0, MAX_ITEMS)
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    } catch (error) {
      console.error('Error adding to recently viewed:', error)
    }
  }

  const clearAll = () => {
    try {
      setRecentlyViewed([])
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing recently viewed:', error)
    }
  }

  return {
    recentlyViewed,
    addProduct,
    clearAll,
  }
}
