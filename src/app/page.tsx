import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";
import { TruckIcon, LockClosedIcon, ArrowPathIcon, SparklesIcon, StarIcon, FireIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
      active: true,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    take: 8,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return products;
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return categories;
}

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section - Premium Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-secondary text-white">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Discover Quality,
                <br />
                <span className="bg-gradient-to-r from-accent to-yellow-300 bg-clip-text text-transparent">
                  Experience Excellence
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Shop premium household appliances, cutting-edge gadgets, fashion, and everyday essentials—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/products"
                  className="group px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2"
                >
                  Start Shopping
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products?featured=true"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
                >
                  Explore Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories - Luxury Design */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4">
              Explore Our Collections
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Browse through our curated collection of premium products across multiple categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary hover:-translate-y-2 relative overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Gold accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {getCategoryIcon(category.slug)}
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Premium Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-3">
                <StarIcon className="w-4 h-4" />
                Premium Selection
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600 text-lg">Handpicked items just for you</p>
            </div>
            <Link
              href="/products"
              className="group mt-4 md:mt-0 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-bold hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              View All Products
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500 text-lg font-medium">No featured products available yet</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for amazing deals!</p>
            </div>
          )}
        </div>
      </section>

      {/* Flash Deals - Eye-catching Banner */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <FireIcon className="w-5 h-5 animate-pulse-soft" />
              Limited Time Offer
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Flash Deals
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Don't miss out on incredible savings - Grab them before they're gone!
            </p>
            <Link
              href="/products?sort=discount"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              Browse All Deals
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features - Luxury Icon Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { Icon: TruckIcon, title: 'Free Shipping', desc: 'On all orders over $50', color: 'from-primary to-accent' },
              { Icon: LockClosedIcon, title: 'Secure Payment', desc: '100% protected transactions', color: 'from-secondary to-primary-dark' },
              { Icon: ArrowPathIcon, title: 'Easy Returns', desc: 'Hassle-free 30-day returns', color: 'from-accent to-primary-light' }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="mx-auto w-16 h-16 mb-4 text-primary group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <feature.Icon className="w-full h-full" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function getCategoryIcon(slug: string) {
  const icons: Record<string, string> = {
    'electronics': '💻',
    'clothing': '👕',
    'shoes': '👟',
    'home-living': '🏠',
    'beauty': '💄',
    'sports': '⚽',
  };
  return icons[slug] || '🛍️';
}
