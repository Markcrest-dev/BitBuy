import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'popular'

export interface ProductFilters {
  categories: string[]
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  search?: string
  sort: SortOption
}

interface ProductStore {
  filters: ProductFilters
  setFilters: (filters: Partial<ProductFilters>) => void
  resetFilters: () => void

  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Recently viewed products
  recentlyViewed: string[]
  addToRecentlyViewed: (productId: string) => void
  clearRecentlyViewed: () => void

  // Wishlist (product IDs)
  wishlist: string[]
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  toggleWishlist: (productId: string) => void
}

const defaultFilters: ProductFilters = {
  categories: [],
  minPrice: undefined,
  maxPrice: undefined,
  inStock: undefined,
  search: undefined,
  sort: 'newest',
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }))
      },

      resetFilters: () => {
        set({ filters: defaultFilters })
      },

      // Search
      searchQuery: '',

      setSearchQuery: (query) => {
        set({ searchQuery: query })
      },

      // Recently viewed
      recentlyViewed: [],

      addToRecentlyViewed: (productId) => {
        const { recentlyViewed } = get()

        // Remove if already exists
        const filtered = recentlyViewed.filter((id) => id !== productId)

        // Add to beginning, keep max 20
        set({
          recentlyViewed: [productId, ...filtered].slice(0, 20),
        })
      },

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] })
      },

      // Wishlist
      wishlist: [],

      addToWishlist: (productId) => {
        const { wishlist } = get()
        if (!wishlist.includes(productId)) {
          set({ wishlist: [...wishlist, productId] })
        }
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
        }))
      },

      isInWishlist: (productId) => {
        return get().wishlist.includes(productId)
      },

      toggleWishlist: (productId) => {
        const { wishlist } = get()
        if (wishlist.includes(productId)) {
          get().removeFromWishlist(productId)
        } else {
          get().addToWishlist(productId)
        }
      },
    }),
    {
      name: 'product-storage',
    }
  )
)
