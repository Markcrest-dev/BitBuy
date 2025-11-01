import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Status validation schema
const statusSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
})

// PATCH - Update order status (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const session = await auth()

    // Check if user is admin
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const { orderId } = await params
    const body = await req.json()

    // Validate input
    const validationResult = statusSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid status value', issues: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { status } = validationResult.data

    // Check if order exists
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    // TODO: Send email notification to customer about status change

    return NextResponse.json({
      message: 'Order status updated successfully',
      order: updatedOrder,
    })
  } catch (error: any) {
    console.error('Update order status error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update order status' },
      { status: 500 }
    )
  }
}
