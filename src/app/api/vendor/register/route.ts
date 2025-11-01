import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to apply.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      businessName,
      businessEmail,
      businessPhone,
      description,
      address,
      city,
      country,
      taxId,
    } = body

    // Validate required fields
    if (!businessName || !businessEmail || !description || !country) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Check if business email is already in use
    const existingBusinessEmail = await prisma.vendor.findUnique({
      where: { businessEmail },
    })

    if (existingBusinessEmail) {
      return NextResponse.json(
        { error: 'Business email is already registered' },
        { status: 400 }
      )
    }

    // Check if user already has a vendor account
    const existingVendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    })

    if (existingVendor) {
      return NextResponse.json(
        { error: 'You already have a vendor application' },
        { status: 400 }
      )
    }

    // Create vendor account
    const vendor = await prisma.vendor.create({
      data: {
        userId: session.user.id,
        businessName,
        businessEmail,
        businessPhone: businessPhone || null,
        description,
        address: address || null,
        city: city || null,
        country,
        taxId: taxId || null,
        status: 'PENDING',
      },
    })

    // Update user role to VENDOR
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: 'VENDOR' },
    })

    return NextResponse.json({
      message: 'Application submitted successfully',
      vendor,
    })
  } catch (error) {
    console.error('Error creating vendor:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
