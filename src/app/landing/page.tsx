import Link from 'next/link';
import {
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  StarIcon,
  SparklesIcon,
  GiftIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Luxurious Gold Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-yellow-100 text-sm font-medium mb-8 border border-white/30">
              <SparklesIcon className="w-5 h-5" />
              <span>Welcome to BitBuy - Your Premium Shopping Destination</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
              Shop Smarter,
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
                Live Better
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-yellow-50 max-w-3xl mx-auto leading-relaxed">
              Discover an extraordinary collection of premium household appliances, cutting-edge gadgets,
              fashion essentials, and everyday items—all curated with excellence in mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/register"
                className="group px-10 py-5 bg-white text-amber-600 rounded-2xl font-bold text-lg hover:bg-yellow-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-3"
              >
                Get Started Free
                <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
              >
                Sign In
              </Link>
            </div>

            <p className="mt-8 text-yellow-100 text-sm">
              ✨ Join over 10,000+ satisfied customers worldwide
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-amber-100 rounded-full text-amber-700 text-sm font-bold mb-4">
              WHY CHOOSE BITBUY
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Shopping Made
              <span className="text-amber-600"> Extraordinary</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Experience the perfect blend of quality, convenience, and value with every purchase
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShoppingBagIcon,
                title: 'Premium Quality',
                description: 'Handpicked products from trusted brands worldwide',
                color: 'from-amber-500 to-yellow-500'
              },
              {
                icon: TruckIcon,
                title: 'Fast Delivery',
                description: 'Free shipping on orders over $50 with express options',
                color: 'from-yellow-500 to-amber-600'
              },
              {
                icon: ShieldCheckIcon,
                title: 'Secure Shopping',
                description: '100% secure payments with buyer protection guarantee',
                color: 'from-amber-600 to-orange-500'
              },
              {
                icon: GiftIcon,
                title: 'Rewards Program',
                description: 'Earn points on every purchase and unlock exclusive perks',
                color: 'from-orange-500 to-amber-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-amber-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border-2 border-amber-100 hover:border-amber-300 hover:-translate-y-3"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} p-3 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="w-full h-full" strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-2xl mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore Our Collections
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              From electronics to fashion, we've got everything you need
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Electronics', icon: '💻', color: 'from-blue-400 to-blue-600' },
              { name: 'Fashion', icon: '👗', color: 'from-pink-400 to-pink-600' },
              { name: 'Home & Living', icon: '🏠', color: 'from-green-400 to-green-600' },
              { name: 'Beauty', icon: '💄', color: 'from-purple-400 to-purple-600' },
              { name: 'Sports', icon: '⚽', color: 'from-orange-400 to-orange-600' },
              { name: 'Gadgets', icon: '📱', color: 'from-amber-400 to-amber-600' }
            ].map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-amber-300 hover:-translate-y-3 cursor-pointer"
              >
                <div className={`text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-amber-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-amber-600 to-amber-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Everything You Need,
                <br />
                All in One Place
              </h2>
              <p className="text-yellow-100 text-xl">
                Join BitBuy today and experience shopping reimagined
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Exclusive member discounts',
                'Early access to sales',
                'Free returns within 30 days',
                'Priority customer support',
                '24/7 shopping convenience',
                'Loyalty rewards program',
                'Secure payment options',
                'Lightning-fast checkout'
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <CheckCircleIcon className="w-8 h-8 text-yellow-300 flex-shrink-0" strokeWidth={2} />
                  <span className="text-lg font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-600 to-amber-700 rounded-[3rem] p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <StarIcon className="w-16 h-16 mx-auto mb-6 text-yellow-300" strokeWidth={2} />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Shopping?
              </h2>
              <p className="text-xl text-yellow-100 mb-10 max-w-2xl mx-auto">
                Create your free account now and get instant access to thousands of premium products
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="group px-10 py-5 bg-white text-amber-600 rounded-2xl font-bold text-lg hover:bg-yellow-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-3"
                >
                  Create Free Account
                  <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
                >
                  I Have an Account
                </Link>
              </div>
              <p className="mt-6 text-yellow-100 text-sm">
                No credit card required • Free forever • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Bar */}
      <section className="py-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <CreditCardIcon className="w-6 h-6 text-amber-400" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <TruckIcon className="w-6 h-6 text-amber-400" />
                <span className="font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-6 h-6 text-amber-400" />
                <span className="font-medium">Buyer Protection</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 BitBuy. All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
