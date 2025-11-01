import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get reviews for a product
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params

    const reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Calculate average rating
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0

    return NextResponse.json({
      reviews,
      averageRating,
      totalReviews: reviews.length,
    })
  } catch (error: any) {
    console.error('Get reviews error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
