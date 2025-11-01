import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Fetch user's wishlist
export async function GET() {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ wishlist })
  } catch (error: any) {
    console.error('Get wishlist error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

// POST - Add item to wishlist
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
    const { productId } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if already in wishlist
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Product already in wishlist' },
        { status: 400 }
      )
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: session.user.id,
        productId,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(
      {
        message: 'Added to wishlist',
        wishlistItem,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Add to wishlist error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}
