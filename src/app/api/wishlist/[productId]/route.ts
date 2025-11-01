import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE - Remove item from wishlist
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { productId } = await params

    // Find and delete the wishlist item
    const wishlistItem = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    })

    if (!wishlistItem) {
      return NextResponse.json(
        { error: 'Item not in wishlist' },
        { status: 404 }
      )
    }

    await prisma.wishlist.delete({
      where: {
        id: wishlistItem.id,
      },
    })

    return NextResponse.json({
      message: 'Removed from wishlist',
    })
  } catch (error: any) {
    console.error('Remove from wishlist error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}
