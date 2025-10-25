// Re-export Prisma generated types
export type {
  User,
  Account,
  Session,
  VerificationToken,
  Address,
  Category,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Review,
  Wishlist,
  Role,
  OrderStatus,
} from '@prisma/client'

// Extended types with relations
export interface ProductWithCategory {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  sku: string
  inventory: number
  images: string[]
  categoryId: string
  featured: boolean
  active: boolean
  createdAt: Date
  updatedAt: Date
  category: {
    id: string
    name: string
    slug: string
  }
}

export interface CartItemWithProduct {
  id: string
  cartId: string
  productId: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
    slug: string
    price: number
    images: string[]
    inventory: number
  }
}

export interface CartWithItems {
  id: string
  userId: string
  items: CartItemWithProduct[]
}

export interface OrderWithItems {
  id: string
  orderNumber: string
  status: string
  subtotal: number
  tax: number
  shipping: number
  total: number
  createdAt: Date
  items: {
    id: string
    productName: string
    quantity: number
    price: number
  }[]
  shippingAddress: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
}

export interface ProductWithReviews {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  images: string[]
  inventory: number
  category: {
    name: string
    slug: string
  }
  reviews: {
    id: string
    rating: number
    comment: string
    createdAt: Date
    user: {
      name: string | null
    }
  }[]
  _count: {
    reviews: number
  }
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

// Filter and Sort types
export interface ProductFilters {
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  search?: string
  inStock?: boolean
}

export interface ProductSort {
  field: 'price' | 'name' | 'createdAt' | 'rating'
  order: 'asc' | 'desc'
}

// Form types
export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
}

export interface AddressFormData {
  street: string
  city: string
  state: string
  country: string
  zipCode: string
  isDefault?: boolean
}

export interface CheckoutFormData {
  shippingAddressId: string
  shippingMethod: 'standard' | 'express' | 'overnight'
  paymentMethod: string
}

export interface ReviewFormData {
  rating: number
  comment: string
}

// Cart action types
export type CartAction =
  | { type: 'ADD_ITEM'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { cartItemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { cartItemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartWithItems }

// Order status types
export type OrderStatusType = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

// User role types
export type UserRole = 'USER' | 'ADMIN'
