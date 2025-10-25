import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Fetch dashboard statistics (Admin only)
export async function GET() {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const [
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalProducts,
      recentOrders,
      lowStockProducts,
      topProducts,
    ] = await Promise.all([
      // Total orders
      prisma.order.count(),

      // Total revenue
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),

      // Total customers
      prisma.user.count({
        where: {
          role: 'USER',
        },
      }),

      // Total products
      prisma.product.count({
        where: {
          active: true,
        },
      }),

      // Recent orders
      prisma.order.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),

      // Low stock products
      prisma.product.findMany({
        where: {
          inventory: {
            lte: 10,
          },
          active: true,
        },
        orderBy: {
          inventory: 'asc',
        },
        take: 10,
      }),

      // Top selling products
      prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: 'desc',
          },
        },
        take: 10,
      }),
    ])

    // Get product details for top products
    const topProductIds = topProducts.map((item) => item.productId)
    const topProductDetails = await prisma.product.findMany({
      where: {
        id: {
          in: topProductIds,
        },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    })

    const topProductsWithDetails = topProducts.map((item) => ({
      ...topProductDetails.find((p) => p.id === item.productId),
      totalSold: item._sum.quantity,
    }))

    const stats = {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalCustomers,
      totalProducts,
      recentOrders,
      lowStockProducts,
      topProducts: topProductsWithDetails,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Get admin stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
