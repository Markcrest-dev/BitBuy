import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/product/ProductCard'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Hot Deals - BitBuy',
  description: 'Discover amazing deals and discounts on premium products at BitBuy!',
}

export default async function DealsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/landing')
  }

  // Fetch products with discounts (price less than compare price)
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      compareAtPrice: {
        not: null,
      },
    },
    include: {
      category: true,
      reviews: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Filter products where compareAtPrice > price (actual deals)
  const dealsProducts = products.filter(
    (product) => product.compareAtPrice && product.compareAtPrice > product.price
  )

  // Calculate average ratings and discount percentage
  const productsWithRatings = dealsProducts.map((product) => {
    const discountPercentage = product.compareAtPrice
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : 0

    return {
      ...product,
      averageRating:
        product.reviews.length > 0
          ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length
          : 0,
      reviewCount: product.reviews.length,
      discountPercentage,
    }
  })

  // Sort by discount percentage (highest first)
  const sortedDeals = productsWithRatings.sort(
    (a, b) => b.discountPercentage - a.discountPercentage
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section - Red/Gold Theme for Deals */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-2xl animate-pulse">🔥</span>
              <span className="font-semibold">Limited Time Offers</span>
            </div>
            <h1 className="text-6xl font-bold mb-4">
              Hot Deals & Discounts
            </h1>
            <p className="text-xl text-red-100">
              Save big on premium products with our exclusive deals and limited-time offers!
            </p>
            <div className="mt-8 flex items-center justify-center gap-6 text-red-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{sortedDeals.length}</div>
                <div className="text-sm">Active Deals</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {sortedDeals.length > 0
                    ? `${Math.max(...sortedDeals.map((p) => p.discountPercentage))}%`
                    : '0%'}
                </div>
                <div className="text-sm">Max Savings</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Free</div>
                <div className="text-sm">Shipping $50+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Categories Quick Links */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#all-deals"
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              All Deals
            </a>
            <a
              href="#top-deals"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all"
            >
              Top Deals
            </a>
            <a
              href="#new-deals"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all"
            >
              New Deals
            </a>
            <a
              href="#ending-soon"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all"
            >
              Ending Soon
            </a>
          </div>
        </div>
      </section>

      {/* Deals Products Section */}
      <section id="all-deals" className="py-16">
        <div className="container mx-auto px-4">
          {sortedDeals.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-3xl">🎉</span>
                  {sortedDeals.length} Amazing Deals
                </h2>
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select className="border-2 border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>Biggest Discount</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Best Rated</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedDeals.map((product) => (
                  <div key={product.id} className="relative">
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      -{product.discountPercentage}% OFF
                    </div>
                    <ProductCard
                      product={{
                        ...product,
                        averageRating: product.averageRating,
                        reviewCount: product.reviewCount,
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-amber-100 rounded-full mb-6">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Deals Right Now</h3>
              <p className="text-gray-600 mb-8">
                Check back soon for amazing discounts and special offers!
              </p>
              <a
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl"
              >
                Browse All Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Deal Alert CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-yellow-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
            <p className="text-xl text-yellow-100 mb-8">
              Sign up for deal alerts and be the first to know about exclusive offers
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-all shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
