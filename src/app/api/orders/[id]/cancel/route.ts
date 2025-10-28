import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { cancelOrder } from '@/lib/order-service'

// POST - Cancel an order
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    const order = await cancelOrder(id, session.user.id)

    return NextResponse.json({
      message: 'Order cancelled successfully',
      order,
    })
  } catch (error: any) {
    console.error('Cancel order error:', error)

    let statusCode = 500
    if (error.message === 'Order not found') {
      statusCode = 404
    } else if (error.message === 'Unauthorized') {
      statusCode = 403
    } else if (
      error.message.includes('Cannot cancel') ||
      error.message.includes('already cancelled')
    ) {
      statusCode = 400
    }

    return NextResponse.json(
      { error: error.message || 'Failed to cancel order' },
      { status: statusCode }
    )
  }
}
