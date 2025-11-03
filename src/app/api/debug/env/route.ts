import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL ? 'SET (hidden)' : 'NOT SET',
      DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
      DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 20) + '...',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET (hidden)' : 'NOT SET',
      FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET ? 'SET (hidden)' : 'NOT SET',
      FACEBOOK_CLIENT_SECRET_LENGTH: process.env.FACEBOOK_CLIENT_SECRET?.length || 0,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET (hidden)' : 'NOT SET',
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET (hidden)' : 'NOT SET',
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'SET (hidden)' : 'NOT SET',
    }

    return NextResponse.json({
      success: true,
      environment: envVars,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
