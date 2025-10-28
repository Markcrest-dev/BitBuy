'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session_id = searchParams.get('session_id')
    if (session_id) {
      setSessionId(session_id)
      // Here you could verify the session with Stripe and create the order
      // For now, we'll just mark as successful
      setLoading(false)
    } else {
      // Redirect if no session ID
      router.push('/cart')
    }
  }, [searchParams, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-20 w-20 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed and you will receive a confirmation email shortly.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-2">Session ID</p>
          <p className="text-xs text-gray-700 font-mono break-all">
            {sessionId}
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/dashboard/orders"
            className="block w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            View My Orders
          </Link>

          <Link
            href="/products"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          If you have any questions about your order, please{' '}
          <Link href="/contact" className="text-amber-600 hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
