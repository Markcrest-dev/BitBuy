import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getUserCart, addToCart, clearCart } from '@/lib/cart-service'

// GET - Fetch user's cart
export async function GET() {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const cart = await getUserCart(session.user.id)

    if (!cart) {
      return NextResponse.json({
        cart: null,
        items: [],
        total: 0,
      })
    }

    // Calculate cart totals
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    return NextResponse.json({
      cart,
      items: cart.items,
      subtotal,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    })
  } catch (error: any) {
    console.error('Get cart error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

// POST - Add item to cart
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
    const { productId, quantity, price } = body

    if (!productId || !quantity || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be greater than 0' },
        { status: 400 }
      )
    }

    const cartItem = await addToCart(
      session.user.id,
      productId,
      quantity,
      price
    )

    return NextResponse.json({
      message: 'Item added to cart',
      cartItem,
    })
  } catch (error: any) {
    console.error('Add to cart error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

// DELETE - Clear cart
export async function DELETE() {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await clearCart(session.user.id)

    return NextResponse.json({
      message: 'Cart cleared successfully',
    })
  } catch (error: any) {
    console.error('Clear cart error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to clear cart' },
      { status: 500 }
    )
  }
}
