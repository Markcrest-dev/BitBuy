'use client'

import Link from 'next/link'
import { XCircleIcon } from '@heroicons/react/24/solid'

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <XCircleIcon className="h-20 w-20 text-red-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-8">
          Your payment was cancelled. No charges have been made to your account.
          Your items are still in your cart.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800">
            Need help? If you experienced any issues during checkout, please contact our support team.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/cart"
            className="block w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Return to Cart
          </Link>

          <Link
            href="/products"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Questions?{' '}
          <Link href="/contact" className="text-amber-600 hover:underline">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  )
}
