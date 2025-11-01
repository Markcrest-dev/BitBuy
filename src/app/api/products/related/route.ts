import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get related products (same category)
// Query params: ?slug=product-slug OR ?productId=product-id
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const productId = searchParams.get('productId')

    if (!slug && !productId) {
      return NextResponse.json(
        { error: 'Either slug or productId is required' },
        { status: 400 }
      )
    }

    // Get the product
    const product = await prisma.product.findUnique({
      where: slug ? { slug } : { id: productId! },
      select: {
        id: true,
        categoryId: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get related products from the same category
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        active: true,
        NOT: {
          id: product.id, // Exclude the current product
        },
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
      take: 8, // Limit to 8 related products
      orderBy: [
        { featured: 'desc' }, // Featured products first
        { createdAt: 'desc' }, // Then by newest
      ],
    })

    return NextResponse.json({ relatedProducts })
  } catch (error: any) {
    console.error('Get related products error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch related products' },
      { status: 500 }
    )
  }
}
