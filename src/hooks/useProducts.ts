import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useProductStore } from '@/store/productStore'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice?: number
  images: string[]
  categoryId: string
  category: {
    id: string
    name: string
    slug: string
  }
  inventory: number
  sku: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Fetch all products with filters
export function useProducts(params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
  sort?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams()

      if (params?.page) searchParams.set('page', params.page.toString())
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.category) searchParams.set('category', params.category)
      if (params?.search) searchParams.set('search', params.search)
      if (params?.sort) searchParams.set('sort', params.sort)
      if (params?.minPrice) searchParams.set('minPrice', params.minPrice.toString())
      if (params?.maxPrice) searchParams.set('maxPrice', params.maxPrice.toString())
      if (params?.inStock !== undefined)
        searchParams.set('inStock', params.inStock.toString())

      const response = await fetch(`/api/products?${searchParams.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      return response.json()
    },
  })
}

// Fetch single product by slug
export function useProduct(slug: string) {
  const addToRecentlyViewed = useProductStore((state) => state.addToRecentlyViewed)

  return useQuery<Product>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await fetch(`/api/products/${slug}`)
      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }
      const data = await response.json()

      // Add to recently viewed
      if (data.id) {
        addToRecentlyViewed(data.id)
      }

      return data
    },
    enabled: !!slug,
  })
}

// Fetch featured products
export function useFeaturedProducts() {
  return useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/products?featured=true&limit=8')
      if (!response.ok) {
        throw new Error('Failed to fetch featured products')
      }
      const data = await response.json()
      return data.products
    },
  })
}

// Fetch products by category
export function useProductsByCategory(categorySlug: string) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'category', categorySlug],
    queryFn: async () => {
      const response = await fetch(`/api/products?category=${categorySlug}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products by category')
      }
      return response.json()
    },
    enabled: !!categorySlug,
  })
}

// Search products
export function useSearchProducts(query: string) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'search', query],
    queryFn: async () => {
      const response = await fetch(`/api/products?search=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Failed to search products')
      }
      return response.json()
    },
    enabled: query.length > 0,
  })
}
