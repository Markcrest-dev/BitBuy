import { prisma } from './prisma'
import { OrderStatus } from '@prisma/client'

export interface CreateOrderData {
  userId: string
  cartItems: Array<{
    productId: string
    quantity: number
    price: number
    productName: string
  }>
  shippingAddressId: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  currencyCode?: string
  stripeSessionId?: string
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
  productName: string
}

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substr(2, 9).toUpperCase()
  return `ORD-${timestamp}-${randomStr}`
}

/**
 * Create a new order in the database
 */
export async function createOrder(data: CreateOrderData) {
  try {
    const orderNumber = generateOrderNumber()

    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        orderNumber,
        status: OrderStatus.PENDING,
        subtotal: data.subtotal,
        shipping: data.shipping,
        tax: data.tax,
        total: data.total,
        currencyCode: data.currencyCode || 'USD',
        shippingAddressId: data.shippingAddressId,
        items: {
          create: data.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            productName: item.productName,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingAddress: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    // Update product inventory
    for (const item of data.cartItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          inventory: {
            decrement: item.quantity,
          },
        },
      })
    }

    // Clear user's cart after order is created
    await clearUserCart(data.userId)

    return order
  } catch (error) {
    console.error('Error creating order:', error)
    throw new Error('Failed to create order')
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingAddress: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    return order
  } catch (error) {
    console.error('Error updating order status:', error)
    throw new Error('Failed to update order status')
  }
}

/**
 * Cancel an order (only if not shipped)
 */
export async function cancelOrder(orderId: string, userId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    })

    if (!order) {
      throw new Error('Order not found')
    }

    if (order.userId !== userId) {
      throw new Error('Unauthorized')
    }

    if (order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED) {
      throw new Error('Cannot cancel order that has been shipped or delivered')
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new Error('Order is already cancelled')
    }

    // Restore product inventory
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          inventory: {
            increment: item.quantity,
          },
        },
      })
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CANCELLED },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingAddress: true,
      },
    })

    return updatedOrder
  } catch (error) {
    console.error('Error cancelling order:', error)
    throw error
  }
}

/**
 * Get user orders with pagination
 */
export async function getUserOrders(
  userId: string,
  page: number = 1,
  limit: number = 10
) {
  try {
    const skip = (page - 1) * limit

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  images: true,
                },
              },
            },
          },
          shippingAddress: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.order.count({
        where: { userId },
      }),
    ])

    return {
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error('Error fetching user orders:', error)
    throw new Error('Failed to fetch orders')
  }
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string, userId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingAddress: true,
      },
    })

    return order
  } catch (error) {
    console.error('Error fetching order:', error)
    throw new Error('Failed to fetch order')
  }
}

/**
 * Clear user's cart
 */
export async function clearUserCart(userId: string) {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
    })

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      })
    }
  } catch (error) {
    console.error('Error clearing cart:', error)
    // Don't throw error - cart clearing is not critical
  }
}
