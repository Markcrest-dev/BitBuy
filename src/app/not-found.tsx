import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Go to Homepage
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Browse Products
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">You might also be interested in:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-blue-600 hover:text-blue-700">
              About Us
            </Link>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700">
              Contact Support
            </Link>
            <Link href="/faq" className="text-blue-600 hover:text-blue-700">
              FAQ
            </Link>
            <Link href="/track-order" className="text-blue-600 hover:text-blue-700">
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
