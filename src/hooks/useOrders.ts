import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUIStore } from '@/store/uiStore'

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

export interface Order {
  id: string
  orderNumber: string
  userId: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  subtotal: number
  tax: number
  shipping: number
  total: number
  shippingAddress: {
    fullName: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  items: Array<{
    id: string
    productId: string
    quantity: number
    price: number
    product: {
      name: string
      slug: string
      images: string[]
    }
  }>
  createdAt: string
  updatedAt: string
}

export interface OrdersResponse {
  orders: Order[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Fetch user's orders
export function useOrders(params?: { page?: number; limit?: number; status?: OrderStatus }) {
  return useQuery<OrdersResponse>({
    queryKey: ['orders', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams()

      if (params?.page) searchParams.set('page', params.page.toString())
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.status) searchParams.set('status', params.status)

      const response = await fetch(`/api/orders?${searchParams.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      return response.json()
    },
  })
}

// Fetch single order
export function useOrder(orderId: string) {
  return useQuery<Order>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await fetch(`/api/orders/${orderId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch order')
      }
      return response.json()
    },
    enabled: !!orderId,
  })
}

// Create order
export function useCreateOrder() {
  const queryClient = useQueryClient()
  const addToast = useUIStore((state) => state.addToast)

  return useMutation({
    mutationFn: async (orderData: {
      items: Array<{ productId: string; quantity: number; price: number }>
      shippingAddress: {
        fullName: string
        phone: string
        address: string
        city: string
        state: string
        zipCode: string
        country: string
      }
      paymentMethod: string
    }) => {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create order')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      addToast({
        message: 'Order placed successfully!',
        type: 'success',
      })
    },
    onError: (error: Error) => {
      addToast({
        message: error.message || 'Failed to create order',
        type: 'error',
      })
    },
  })
}

// Cancel order
export function useCancelOrder() {
  const queryClient = useQueryClient()
  const addToast = useUIStore((state) => state.addToast)

  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED' }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to cancel order')
      }

      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['order', data.id] })
      addToast({
        message: 'Order cancelled successfully',
        type: 'success',
      })
    },
    onError: (error: Error) => {
      addToast({
        message: error.message || 'Failed to cancel order',
        type: 'error',
      })
    },
  })
}

// Track order (public)
export function useTrackOrder(orderNumber: string, email: string) {
  return useQuery<Order>({
    queryKey: ['track-order', orderNumber, email],
    queryFn: async () => {
      const response = await fetch(
        `/api/orders/track?orderNumber=${orderNumber}&email=${encodeURIComponent(email)}`
      )
      if (!response.ok) {
        throw new Error('Failed to track order')
      }
      return response.json()
    },
    enabled: !!orderNumber && !!email,
  })
}
