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
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Products</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-bold mb-4">Filters</h2>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm text-gray-700">Categories</h3>
              <div className="space-y-2">
                <Link
                  href="/products"
                  className={`block px-3 py-2 rounded transition ${
                    !currentCategory
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  All Products
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    className={`block px-3 py-2 rounded transition ${
                      currentCategory === cat.slug
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm text-gray-700">Price Range</h3>
              <div className="space-y-2">
                <Link
                  href={`/products${currentCategory ? `?category=${currentCategory}` : ''}`}
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-sm"
                >
                  All Prices
                </Link>
                <Link
                  href={`/products?${currentCategory ? `category=${currentCategory}&` : ''}maxPrice=50`}
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-sm"
                >
                  Under $50
                </Link>
                <Link
                  href={`/products?${currentCategory ? `category=${currentCategory}&` : ''}minPrice=50&maxPrice=100`}
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-sm"
                >
                  $50 - $100
                </Link>
                <Link
                  href={`/products?${currentCategory ? `category=${currentCategory}&` : ''}minPrice=100&maxPrice=500`}
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-sm"
                >
                  $100 - $500
                </Link>
                <Link
                  href={`/products?${currentCategory ? `category=${currentCategory}&` : ''}minPrice=500`}
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-sm"
                >
                  Over $500
                </Link>
              </div>
            </div>

            {/* Special Offers */}
            <div>
              <h3 className="font-semibold mb-3 text-sm text-gray-700">Special Offers</h3>
              <div className="space-y-2">
                <Link
                  href="/products?featured=true"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-sm"
                >
                  Featured Products
                </Link>
                <Link
                  href="/products?sort=discount"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-sm"
                >
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
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
