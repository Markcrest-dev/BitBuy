import { useQuery } from '@tanstack/react-query'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  parent?: Category
  children?: Category[]
  _count?: {
    products: number
  }
}

// Fetch all categories
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      return data.categories || []
    },
    staleTime: 10 * 60 * 1000, // Categories don't change often, cache for 10 minutes
  })
}

// Fetch single category by slug
export function useCategory(slug: string) {
  return useQuery<Category>({
    queryKey: ['category', slug],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${slug}`)
      if (!response.ok) {
        throw new Error('Failed to fetch category')
      }
      return response.json()
    },
    enabled: !!slug,
  })
}

// Fetch top-level categories (no parent)
export function useTopCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories', 'top'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch top categories')
      }
      const data = await response.json()
      const categories = data.categories || []
      return categories.filter((cat: Category) => !cat.parentId)
    },
    staleTime: 10 * 60 * 1000,
  })
}
