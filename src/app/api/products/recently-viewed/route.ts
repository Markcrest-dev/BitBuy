import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Get recently viewed products by IDs
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productIds } = body

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ products: [] })
    }

    // Fetch products by IDs
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
        active: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    // Sort products to match the order of productIds (most recent first)
    const sortedProducts = productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p) => p !== undefined)

    return NextResponse.json({ products: sortedProducts })
  } catch (error: any) {
    console.error('Get recently viewed products error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch recently viewed products' },
      { status: 500 }
    )
  }
}
