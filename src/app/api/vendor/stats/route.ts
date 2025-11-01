import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get vendor account
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
      include: {
        products: {
          where: { active: true },
        },
        orders: {
          where: {
            status: {
              in: ['PENDING', 'PROCESSING'],
            },
          },
        },
        payouts: {
          where: {
            status: 'PENDING',
          },
        },
      },
    })

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor account not found. Please apply to become a vendor first.' },
        { status: 404 }
      )
    }

    // Calculate pending payouts total
    const pendingPayouts = vendor.payouts.reduce(
      (sum, payout) => sum + payout.amount,
      0
    )

    // Get recent orders with details
    const recentOrders = await prisma.order.findMany({
      where: { vendorId: vendor.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        total: true,
        createdAt: true,
      },
    })

    // Calculate revenue and commission
    const revenue = vendor.totalSales
    const commission = revenue * (vendor.commission / 100)
    const netEarnings = revenue - commission

    return NextResponse.json({
      businessName: vendor.businessName,
      status: vendor.status,
      totalSales: vendor.totalSales,
      revenue,
      commission,
      netEarnings,
      totalProducts: vendor.products.length,
      pendingOrders: vendor.orders.length,
      pendingPayouts,
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error('Error fetching vendor stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendor stats' },
      { status: 500 }
    )
  }
}
