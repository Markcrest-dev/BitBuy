import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  slug: string
  price: number
  image: string
  quantity: number
  inventory: number
}

interface CartStore {
  items: CartItem[]
  userId: string | null
  setUserId: (userId: string | null) => void
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

// Get user-specific storage key
const getStorageKey = (userId: string | null) => {
  return userId ? `cart-storage-${userId}` : 'cart-storage-guest'
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      userId: null,

      setUserId: (userId) => {
        const currentUserId = get().userId

        // If user changed, load their cart from storage
        if (currentUserId !== userId) {
          set({ userId, items: [] })

          // Load cart from localStorage for this user
          if (typeof window !== 'undefined') {
            const storageKey = getStorageKey(userId)
            const stored = localStorage.getItem(storageKey)
            if (stored) {
              try {
                const data = JSON.parse(stored)
                set({ items: data.state?.items || [] })
              } catch (e) {
                console.error('Failed to load cart:', e)
              }
            }
          }
        }
      },

      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          // Update quantity if item exists
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: Math.min(i.quantity + 1, i.inventory) }
                : i
            ),
          })
        } else {
          // Add new item
          set({
            items: [...items, { ...item, quantity: 1 }],
          })
        }

        // Save to user-specific storage
        saveToStorage(get().userId, get().items)
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })

        // Save to user-specific storage
        saveToStorage(get().userId, get().items)
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.inventory) }
              : item
          ),
        })

        // Save to user-specific storage
        saveToStorage(get().userId, get().items)
      },

      clearCart: () => {
        set({ items: [] })

        // Save to user-specific storage
        saveToStorage(get().userId, [])
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage-guest',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          // This will be overridden by user-specific loading
          if (typeof window === 'undefined') return null
          return localStorage.getItem(name)
        },
        setItem: (name, value) => {
          // User-specific saving is handled in the action methods
          if (typeof window === 'undefined') return
          localStorage.setItem(name, value)
        },
        removeItem: (name) => {
          if (typeof window === 'undefined') return
          localStorage.removeItem(name)
        },
      })),
    }
  )
)

// Helper function to save cart to user-specific storage
function saveToStorage(userId: string | null, items: CartItem[]) {
  if (typeof window === 'undefined') return

  const storageKey = getStorageKey(userId)
  const data = {
    state: { items, userId },
    version: 0,
  }
  localStorage.setItem(storageKey, JSON.stringify(data))
}
