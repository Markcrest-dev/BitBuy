import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Address validation schema
const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  isDefault: z.boolean().optional(),
})

// GET - Fetch user's addresses
export async function GET() {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const addresses = await prisma.address.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({ addresses })
  } catch (error: any) {
    console.error('Get addresses error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch addresses' },
      { status: 500 }
    )
  }
}

// POST - Create new address
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

    // Validate input
    const validationResult = addressSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: validationResult.error.issues },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // If this is set as default, unset other default addresses
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: session.user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      })
    }

    // If this is the first address, make it default
    const existingAddressCount = await prisma.address.count({
      where: { userId: session.user.id },
    })

    const address = await prisma.address.create({
      data: {
        userId: session.user.id,
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        isDefault: data.isDefault ?? existingAddressCount === 0,
      },
    })

    return NextResponse.json(
      {
        message: 'Address created successfully',
        address,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create address error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create address' },
      { status: 500 }
    )
  }
}
