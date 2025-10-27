import { Metadata } from 'next'
import { TruckIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Shipping Information - BitBuy',
  description: 'Learn about our shipping options, delivery times, and costs across Nigeria.',
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <TruckIcon className="w-20 h-20 mx-auto mb-6" strokeWidth={1.5} />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Shipping Information
            </h1>
            <p className="text-xl sm:text-2xl text-yellow-100">
              Fast, reliable delivery across Nigeria
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Shipping Options */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Shipping Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-8 border-2 border-amber-100 hover:border-amber-300 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mb-6">
                    <TruckIcon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Standard Shipping</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Delivery within 3-7 business days across Nigeria
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                      Lagos & Abuja: 2-3 days
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                      Other major cities: 4-5 days
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                      Remote areas: 5-7 days
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t-2 border-amber-100">
                    <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                      ₦1,500 - ₦3,000
                    </p>
                    <p className="text-sm text-gray-500 mt-1">FREE on orders over ₦20,000</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Express Shipping</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Fast delivery within 1-3 business days
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      Lagos & Abuja: Next day
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      Other major cities: 2-3 days
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      Priority handling
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t-2 border-amber-200">
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ₦3,500 - ₦5,000
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Available for eligible items</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Shipping */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CurrencyDollarIcon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Free Shipping on Orders Over ₦20,000</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Enjoy free standard shipping on all orders over ₦20,000 anywhere in Nigeria. Simply add items to your cart and the discount will be applied automatically at checkout.
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Areas */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Delivery Areas
              </h2>
              <div className="bg-white rounded-2xl p-8 border-2 border-amber-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <MapPinIcon className="w-6 h-6 text-amber-600" strokeWidth={2} />
                      <h3 className="text-lg font-bold text-gray-900">Major Cities</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>Lagos</li>
                      <li>Abuja</li>
                      <li>Port Harcourt</li>
                      <li>Kano</li>
                      <li>Ibadan</li>
                      <li>Benin City</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <MapPinIcon className="w-6 h-6 text-amber-600" strokeWidth={2} />
                      <h3 className="text-lg font-bold text-gray-900">Regional Coverage</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>Enugu</li>
                      <li>Kaduna</li>
                      <li>Jos</li>
                      <li>Calabar</li>
                      <li>Warri</li>
                      <li>Aba</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <MapPinIcon className="w-6 h-6 text-amber-600" strokeWidth={2} />
                      <h3 className="text-lg font-bold text-gray-900">All 36 States</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We deliver to all states in Nigeria, including remote areas. Additional delivery time may apply for locations outside major cities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Time */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Order Processing
              </h2>
              <div className="bg-white rounded-2xl p-8 border-2 border-amber-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Processing Times</h3>
                    <div className="space-y-4 text-gray-600">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <span>Orders placed before 2 PM</span>
                        <span className="font-bold text-amber-600">Same day processing</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <span>Orders placed after 2 PM</span>
                        <span className="font-bold text-amber-600">Next business day</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Weekend orders</span>
                        <span className="font-bold text-amber-600">Monday processing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Your Order</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Once your order ships, you'll receive a tracking number via email and SMS. Use it to track your package in real-time.
              </p>
              <a
                href="/track-order"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl"
              >
                Track Your Order
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Do you ship outside Nigeria?',
                    a: 'Currently, we only ship within Nigeria. International shipping is coming soon!'
                  },
                  {
                    q: 'Can I change my delivery address after ordering?',
                    a: 'Yes, you can change your delivery address before the order is shipped. Contact our support team immediately.'
                  },
                  {
                    q: 'What if I\'m not home for delivery?',
                    a: 'Our courier will attempt delivery up to 3 times. You can also schedule a convenient delivery time.'
                  },
                  {
                    q: 'Do you offer weekend delivery?',
                    a: 'Yes, weekend delivery is available in Lagos and Abuja for express shipping orders.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border-2 border-amber-100 hover:border-amber-300 transition-all">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Have More Questions?
            </h2>
            <p className="text-xl text-yellow-100 mb-8">
              Our customer support team is here to help 24/7
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
