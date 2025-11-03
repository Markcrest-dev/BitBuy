import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Try to connect to database
    await prisma.$connect()

    // Try a simple query
    const userCount = await prisma.user.count()

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Database connection error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
