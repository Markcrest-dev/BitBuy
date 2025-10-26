import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/product/ProductCard'
import SortSelector from '@/components/product/SortSelector'
import Link from 'next/link'

interface SearchParams {
  category?: string
  minPrice?: string
  maxPrice?: string
  search?: string
  sort?: string
  featured?: string
}

export const dynamic = 'force-dynamic'

async function getProducts(searchParams: SearchParams) {
  const {
    category,
    minPrice,
    maxPrice,
    search,
    sort,
    featured,
  } = searchParams

  const where: any = {
    active: true,
  }

  if (category) {
    where.category = {
      slug: category,
    }
  }

  if (featured === 'true') {
    where.featured = true
  }

  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = parseFloat(minPrice)
    if (maxPrice) where.price.lte = parseFloat(maxPrice)
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  let orderBy: any = { createdAt: 'desc' }

  if (sort === 'price-asc') orderBy = { price: 'asc' }
  if (sort === 'price-desc') orderBy = { price: 'desc' }
  if (sort === 'name') orderBy = { name: 'asc' }
  if (sort === 'discount') {
    where.comparePrice = { not: null }
    orderBy = { comparePrice: 'desc' }
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    orderBy,
    take: 50,
  })

  return products
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const [products, categories] = await Promise.all([
    getProducts(params),
    getCategories(),
  ])

  const currentCategory = params.category
  const currentSort = params.sort || 'newest'

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold">Products</span>
        </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 border-2 border-amber-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </h2>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm text-gray-700 uppercase tracking-wide">Categories</h3>
              <div className="space-y-2">
                <Link
                  href="/products"
                  className={`block px-3 py-2 rounded-lg transition ${
                    !currentCategory
                      ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 font-semibold'
                      : 'hover:bg-amber-50 text-gray-700'
                  }`}
                >
                  All Products
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    className={`block px-3 py-2 rounded-lg transition ${
                      currentCategory === cat.slug
                        ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 font-semibold'
                        : 'hover:bg-amber-50 text-gray-700'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm text-gray-700 uppercase tracking-wide">Price Range</h3>
              <div className="space-y-2">
                <Link
                  href={`/products${currentCategory ? `?category=${currentCategory}` : ''}`}
                  className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-sm text-gray-700 transition"
                >
                  All Prices
                </Link>
                <Link
                  href={`/products?${currentCategory ? `category=${currentCategory}&` : ''}maxPrice=50`}
                  className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-sm text-gray-700 transition"
                >
                  Under $50
                </Link>
                <Link
                  href={`/products?${currentCategory ? `category=${currentCategory}&` : ''}minPrice=50&maxPrice=100`}
                  className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-sm text-gray-700 transition"
                >
                  $50 - $100
                </Link>
                <Link
                  href={`/products?${currentCategory ? `category=${currentCategory}&` : ''}minPrice=100&maxPrice=500`}
                  className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-sm text-gray-700 transition"
                >
                  $100 - $500
                </Link>
                <Link
                  href={`/products?${currentCategory ? `category=${currentCategory}&` : ''}minPrice=500`}
                  className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-sm text-gray-700 transition"
                >
                  Over $500
                </Link>
              </div>
            </div>

            {/* Special Offers */}
            <div>
              <h3 className="font-semibold mb-3 text-sm text-gray-700 uppercase tracking-wide">Special Offers</h3>
              <div className="space-y-2">
                <Link
                  href="/products?featured=true"
                  className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-sm text-gray-700 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured Products
                </Link>
                <Link
                  href="/products?sort=discount"
                  className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-sm text-gray-700 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  On Sale
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Header with Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentCategory
                  ? categories.find((c) => c.slug === currentCategory)?.name || 'Products'
                  : 'All Products'}
              </h1>
              <p className="text-gray-600 mt-1">{products.length} products found</p>
            </div>

            {/* Sort Dropdown */}
            <SortSelector />
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <Link
                href="/products"
                className="inline-block bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-yellow-700 transition shadow-lg"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}
