import { Metadata } from 'next'
import { ArrowPathIcon, ShieldCheckIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Returns & Refunds - BitBuy',
  description: 'Learn about our 30-day return policy and hassle-free refund process.',
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ArrowPathIcon className="w-20 h-20 mx-auto mb-6" strokeWidth={1.5} />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Returns & Refunds
            </h1>
            <p className="text-xl sm:text-2xl text-yellow-100">
              30-day hassle-free returns on all purchases
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Our Policy */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheckIcon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Our 30-Day Return Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We want you to be completely satisfied with your purchase. If you're not happy for any reason, you can return most items within 30 days of delivery for a full refund or exchange. No questions asked.
                  </p>
                </div>
              </div>
            </div>

            {/* Eligible Items */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                What Can Be Returned?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border-2 border-amber-100">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Eligible for Return</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Unused items in original packaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Items with all tags and labels attached</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Defective or damaged products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Wrong items received</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Most electronics (unopened)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Not Eligible for Return</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Personal care items (opened)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Underwear and intimate apparel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Perishable goods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Gift cards and vouchers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>Custom or personalized items</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Return Process */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                How to Return an Item
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Initiate Return Request',
                    description: 'Log into your account and go to Orders. Select the item you want to return and click "Request Return".',
                    color: 'from-blue-500 to-indigo-600'
                  },
                  {
                    step: '2',
                    title: 'Pack Your Item',
                    description: 'Place the item in its original packaging with all accessories, manuals, and tags. Use a sturdy box for shipping.',
                    color: 'from-purple-500 to-indigo-600'
                  },
                  {
                    step: '3',
                    title: 'Schedule Pickup',
                    description: 'Choose a convenient pickup date and time. Our courier will collect the package from your address at no extra cost.',
                    color: 'from-amber-500 to-yellow-600'
                  },
                  {
                    step: '4',
                    title: 'Receive Refund',
                    description: 'Once we receive and inspect your return, your refund will be processed within 3-5 business days.',
                    color: 'from-green-500 to-emerald-600'
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 border-2 border-amber-100 hover:border-amber-300 hover:shadow-xl transition-all">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-2xl font-bold text-white">{item.step}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Refund Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Refund Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border-2 border-amber-100 text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mx-auto mb-4">
                    <ClockIcon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Processing Time</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                    3-5 Days
                  </p>
                  <p className="text-sm text-gray-600">After we receive your return</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-amber-100 text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                    <CurrencyDollarIcon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Refund Method</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Refunded to original payment method or store credit
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-amber-100 text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheckIcon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Full Refund</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    100% of item cost including shipping if applicable
                  </p>
                </div>
              </div>
            </div>

            {/* Exchanges */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Exchange Instead?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                If you'd prefer to exchange your item for a different size, color, or product, we can arrange that too! Simply indicate "Exchange" when initiating your return request, and we'll guide you through the process.
              </p>
              <p className="text-sm text-gray-600">
                Note: You'll only pay the difference if the new item costs more. If it costs less, we'll refund the difference.
              </p>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Do I need to pay for return shipping?',
                    a: 'No! We provide free return pickup anywhere in Nigeria for all eligible returns.'
                  },
                  {
                    q: 'Can I return a sale item?',
                    a: 'Yes, sale items can be returned following the same policy as regular-priced items, as long as they meet the return criteria.'
                  },
                  {
                    q: 'What if my item was damaged during shipping?',
                    a: 'Contact us immediately with photos of the damage. We\'ll arrange a free return and send a replacement or full refund right away.'
                  },
                  {
                    q: 'Can I get a refund as store credit instead?',
                    a: 'Yes! If you prefer store credit, we\'ll add an extra 5% bonus to your refund amount that you can use on future purchases.'
                  },
                  {
                    q: 'How long do I have to return an item?',
                    a: 'You have 30 days from the delivery date to initiate a return. The return must be shipped back within 7 days of approval.'
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
              Need Help with a Return?
            </h2>
            <p className="text-xl text-yellow-100 mb-8">
              Our customer support team is here to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/account"
                className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Go to My Orders
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
