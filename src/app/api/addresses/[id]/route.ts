import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Address validation schema
const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required').optional(),
  city: z.string().min(1, 'City is required').optional(),
  state: z.string().min(1, 'State is required').optional(),
  country: z.string().min(1, 'Country is required').optional(),
  zipCode: z.string().min(1, 'ZIP code is required').optional(),
  isDefault: z.boolean().optional(),
})

// GET - Fetch single address
export async function GET(
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

    const address = await prisma.address.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!address) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ address })
  } catch (error: any) {
    console.error('Get address error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch address' },
      { status: 500 }
    )
  }
}

// PUT - Update address
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

    // Validate input
    const validationResult = addressSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: validationResult.error.issues },
        { status: 400 }
      )
    }

    // Verify address belongs to user
    const existingAddress = await prisma.address.findUnique({
      where: { id },
    })

    if (!existingAddress) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      )
    }

    if (existingAddress.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const data = validationResult.data

    // If setting as default, unset other default addresses
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: session.user.id,
          isDefault: true,
          id: { not: id },
        },
        data: {
          isDefault: false,
        },
      })
    }

    const address = await prisma.address.update({
      where: { id },
      data,
    })

    return NextResponse.json({
      message: 'Address updated successfully',
      address,
    })
  } catch (error: any) {
    console.error('Update address error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update address' },
      { status: 500 }
    )
  }
}

// DELETE - Delete address
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

    // Verify address belongs to user
    const address = await prisma.address.findUnique({
      where: { id },
    })

    if (!address) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      )
    }

    if (address.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Check if address is used in any orders
    const ordersCount = await prisma.order.count({
      where: { shippingAddressId: id },
    })

    if (ordersCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete address that has been used in orders' },
        { status: 400 }
      )
    }

    await prisma.address.delete({
      where: { id },
    })

    // If this was the default address, set another address as default
    if (address.isDefault) {
      const firstAddress = await prisma.address.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'asc' },
      })

      if (firstAddress) {
        await prisma.address.update({
          where: { id: firstAddress.id },
          data: { isDefault: true },
        })
      }
    }

    return NextResponse.json({
      message: 'Address deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete address error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete address' },
      { status: 500 }
    )
  }
}
