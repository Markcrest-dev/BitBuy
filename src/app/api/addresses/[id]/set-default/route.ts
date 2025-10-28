import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PUT - Set address as default
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

    // Unset all other default addresses
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

    // Set this address as default
    const updatedAddress = await prisma.address.update({
      where: { id },
      data: { isDefault: true },
    })

    return NextResponse.json({
      message: 'Default address updated successfully',
      address: updatedAddress,
    })
  } catch (error: any) {
    console.error('Set default address error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to set default address' },
      { status: 500 }
    )
  }
}
