import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { syncCart } from '@/lib/cart-service'

// POST - Sync local storage cart to database
export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { items } = body

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid cart items' },
        { status: 400 }
      )
    }

    const cart = await syncCart(session.user.id, items)

    return NextResponse.json({
      message: 'Cart synced successfully',
      cart,
    })
  } catch (error: any) {
    console.error('Cart sync error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to sync cart' },
      { status: 500 }
    )
  }
}
