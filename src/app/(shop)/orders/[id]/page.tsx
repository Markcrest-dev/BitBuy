'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { formatPrice } from '@/lib/utils'
import { format } from 'date-fns'
import { ArrowLeftIcon, TruckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  productName: string
  product: {
    id: string
    name: string
    slug: string
    images: string[]
  }
}

interface Order {
  id: string
  orderNumber: string
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  subtotal: number
  shipping: number
  tax: number
  total: number
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  shippingAddress?: {
    id: string
    fullName: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phoneNumber?: string
  }
  paymentMethod?: string
  trackingNumber?: string
}

const statusConfig = {
  PENDING: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    icon: '⏳',
    description: 'Your order is being processed'
  },
  PROCESSING: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    icon: '🔄',
    description: 'Your order is being prepared for shipment'
  },
  SHIPPED: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    icon: '📦',
    description: 'Your order is on its way'
  },
  DELIVERED: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: '✅',
    description: 'Your order has been delivered'
  },
  CANCELLED: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    icon: '❌',
    description: 'This order has been cancelled'
  },
}

async function fetchOrder(orderId: string) {
  const response = await fetch(`/api/orders/${orderId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch order')
  }
  const data = await response.json()
  return data.order as Order
}

async function cancelOrder(orderId: string) {
  const response = await fetch(`/api/orders/${orderId}/cancel`, {
    method: 'POST',
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to cancel order')
  }
  return response.json()
}

export default function OrderDetailsPage() {
  const params = useParams()
  const orderId = params.id as string
  const queryClient = useQueryClient()

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrder(orderId),
  })

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  const handleCancelOrder = async () => {
    if (confirm(`Are you sure you want to cancel order ${order?.orderNumber}?`)) {
      try {
        await cancelOrderMutation.mutateAsync(orderId)
        alert('Order cancelled successfully')
      } catch (error: any) {
        alert(error.message || 'Failed to cancel order')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-red-700 mb-2">Order Not Found</h2>
            <p className="text-red-600 mb-6">
              The order you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <Link
              href="/dashboard/orders"
              className="inline-block bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-yellow-700 transition font-medium shadow-md"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusInfo = statusConfig[order.status]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-amber-600">/</span>
          <Link href="/dashboard" className="hover:text-amber-600 transition-colors">
            Dashboard
          </Link>
          <span className="mx-2 text-amber-600">/</span>
          <Link href="/dashboard/orders" className="hover:text-amber-600 transition-colors">
            Orders
          </Link>
          <span className="mx-2 text-amber-600">/</span>
          <span className="text-gray-900 font-medium">{order.orderNumber}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 font-medium"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 mb-6 border-2 border-amber-100">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Order {order.orderNumber}
              </h1>
              <p className="text-gray-600">
                Placed on {format(new Date(order.createdAt), 'MMMM dd, yyyy \'at\' h:mm a')}
              </p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
                <span className="text-xl">{statusInfo.icon}</span>
                {order.status}
              </div>
              <p className="text-sm text-gray-600 mt-2">{statusInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 mb-6 border-2 border-amber-100">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Order Timeline</h2>
          <div className="space-y-4">
            <div className={`flex items-center gap-4 ${order.status !== 'CANCELLED' ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'}`}>
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Order Placed</p>
                <p className="text-sm text-gray-600">{format(new Date(order.createdAt), 'MMM dd, yyyy h:mm a')}</p>
              </div>
            </div>

            <div className={`flex items-center gap-4 ${order.status === 'CANCELLED' ? 'opacity-50' : 'opacity-100'}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'}`}>
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Processing</p>
                <p className="text-sm text-gray-600">
                  {['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status)
                    ? format(new Date(order.updatedAt), 'MMM dd, yyyy h:mm a')
                    : 'Pending'}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-4 ${order.status === 'CANCELLED' ? 'opacity-50' : 'opacity-100'}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${['SHIPPED', 'DELIVERED'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'}`}>
                <TruckIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Shipped</p>
                <p className="text-sm text-gray-600">
                  {['SHIPPED', 'DELIVERED'].includes(order.status)
                    ? format(new Date(order.updatedAt), 'MMM dd, yyyy h:mm a')
                    : 'Pending'}
                </p>
                {order.trackingNumber && (
                  <p className="text-sm text-amber-600 font-medium">
                    Tracking: {order.trackingNumber}
                  </p>
                )}
              </div>
            </div>

            <div className={`flex items-center gap-4 ${order.status === 'CANCELLED' ? 'opacity-50' : 'opacity-100'}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-500' : 'bg-gray-300'}`}>
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Delivered</p>
                <p className="text-sm text-gray-600">
                  {order.status === 'DELIVERED'
                    ? format(new Date(order.updatedAt), 'MMM dd, yyyy h:mm a')
                    : 'Pending'}
                </p>
              </div>
            </div>

            {order.status === 'CANCELLED' && (
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500">
                  <XCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Cancelled</p>
                  <p className="text-sm text-gray-600">{format(new Date(order.updatedAt), 'MMM dd, yyyy h:mm a')}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 border-2 border-amber-100">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-amber-200 last:border-0">
                    <Link href={`/products/${item.product.slug}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.productName}
                        className="w-24 h-24 object-cover rounded-lg hover:opacity-75 transition"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-semibold text-gray-900 hover:text-amber-600 transition"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Details */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 border-2 border-amber-100">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="border-t-2 border-amber-200 pt-3 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span className="text-amber-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 border-2 border-amber-100">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Shipping Address</h2>
                <div className="text-gray-700 space-y-1">
                  <p className="font-semibold">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  {order.shippingAddress.phoneNumber && (
                    <p className="mt-2">Phone: {order.shippingAddress.phoneNumber}</p>
                  )}
                </div>
              </div>
            )}

            {/* Payment Method */}
            {order.paymentMethod && (
              <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 border-2 border-amber-100">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Payment Method</h2>
                <p className="text-gray-700">{order.paymentMethod}</p>
              </div>
            )}

            {/* Actions */}
            {(order.status === 'PENDING' || order.status === 'PROCESSING') && (
              <button
                onClick={handleCancelOrder}
                disabled={cancelOrderMutation.isPending}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelOrderMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
              </button>
            )}

            <Link
              href="/dashboard/orders"
              className="block w-full text-center bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-yellow-700 transition font-medium shadow-md"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
