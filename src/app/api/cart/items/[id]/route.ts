import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { updateCartItemQuantity, removeFromCart } from '@/lib/cart-service'

// PUT - Update cart item quantity
export async function PUT(
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
    const body = await req.json()
    const { quantity } = body

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Invalid quantity' },
        { status: 400 }
      )
    }

    const cartItem = await updateCartItemQuantity(
      session.user.id,
      id,
      quantity
    )

    return NextResponse.json({
      message: 'Cart item updated',
      cartItem,
    })
  } catch (error: any) {
    console.error('Update cart item error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update cart item' },
      { status: 500 }
    )
  }
}

// DELETE - Remove item from cart
export async function DELETE(
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

    await removeFromCart(session.user.id, id)

    return NextResponse.json({
      message: 'Item removed from cart',
    })
  } catch (error: any) {
    console.error('Remove cart item error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to remove cart item' },
      { status: 500 }
    )
  }
}
