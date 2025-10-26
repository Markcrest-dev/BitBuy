import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy - BitBuy',
  description: 'Learn about how BitBuy uses cookies to improve your shopping experience.',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-yellow-100">
              How we use cookies to enhance your experience at BitBuy
            </p>
            <p className="text-sm text-yellow-200 mt-4">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit our website.
                They help us provide you with a better shopping experience by remembering your preferences,
                keeping you signed in, and understanding how you use our site.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Cookie Policy explains what cookies are, how we use them, and how you can manage your
                cookie preferences on BitBuy.
              </p>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>

              {/* Essential Cookies */}
              <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Essential Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies are necessary for the website to function properly. They enable core
                  functionality such as security, authentication, and shopping cart features.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Authentication and session management</li>
                  <li>Shopping cart functionality</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing</li>
                </ul>
                <p className="text-sm text-amber-800 font-semibold mt-3">
                  ⚠️ These cookies cannot be disabled as they are essential for the site to work.
                </p>
              </div>

              {/* Performance Cookies */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Performance Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies collect anonymous information about how visitors use our website,
                  helping us understand which pages are most popular and identify any errors.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Google Analytics</li>
                  <li>Page load times and performance metrics</li>
                  <li>Error tracking and debugging</li>
                  <li>Traffic analysis</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚙️</span>
                  Functional Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies allow our website to remember choices you make and provide enhanced,
                  personalized features.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Language preferences</li>
                  <li>Region/location settings</li>
                  <li>Recently viewed products</li>
                  <li>Wishlist and favorites</li>
                  <li>Cart persistence</li>
                </ul>
              </div>

              {/* Marketing Cookies */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Marketing Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies track your browsing activity to deliver advertisements that are relevant
                  to you and your interests.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Personalized product recommendations</li>
                  <li>Targeted advertising</li>
                  <li>Social media integration (Facebook, Google)</li>
                  <li>Retargeting campaigns</li>
                  <li>Email marketing preferences</li>
                </ul>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We work with trusted third-party services that may also set cookies on your device. These include:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">🔵 Google Services</h4>
                  <p className="text-sm text-gray-700">
                    Google Analytics, Google OAuth, Google Ads
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">📘 Facebook</h4>
                  <p className="text-sm text-gray-700">
                    Facebook Login, Facebook Pixel, Social Sharing
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-2">💳 Stripe</h4>
                  <p className="text-sm text-gray-700">
                    Payment processing and fraud detection
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-bold text-gray-900 mb-2">📧 Email Services</h4>
                  <p className="text-sm text-gray-700">
                    Resend for transactional emails
                  </p>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Manage Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                You have the right to decide whether to accept or reject cookies. Here are your options:
              </p>

              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-l-4 border-amber-500">
                  <h4 className="font-bold text-gray-900 mb-2">🌐 Browser Settings</h4>
                  <p className="text-sm text-gray-700">
                    Most web browsers allow you to control cookies through their settings. You can set your
                    browser to refuse all cookies or to alert you when a cookie is being sent.
                  </p>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border-l-4 border-gray-400">
                  <h4 className="font-bold text-gray-900 mb-2">⚙️ Cookie Preferences</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    You can manage your cookie preferences directly on our website using the cookie banner
                    or preference center.
                  </p>
                  <button className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-amber-700 hover:to-yellow-700 transition-all">
                    Manage Cookie Preferences
                  </button>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border-l-4 border-gray-400">
                  <h4 className="font-bold text-gray-900 mb-2">🚫 Opt-Out Tools</h4>
                  <p className="text-sm text-gray-700">
                    You can opt out of targeted advertising using tools like Google Ad Settings, Facebook Ad
                    Preferences, or industry opt-out pages like the Network Advertising Initiative.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ Important:</strong> Disabling certain cookies may affect the functionality of our
                  website. For example, you may not be able to add items to your cart or complete purchases
                  if essential cookies are blocked.
                </p>
              </div>
            </div>

            {/* Browser-Specific Instructions */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Browser-Specific Instructions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For information on how to manage cookies in specific browsers, please refer to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</span>
                </li>
              </ul>
            </div>

            {/* Updates to Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or
                for other operational, legal, or regulatory reasons. We encourage you to review this page
                periodically to stay informed about how we use cookies.
              </p>
            </div>

            {/* Contact */}
            <div className="p-6 bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 text-white rounded-xl">
              <h2 className="text-2xl font-bold mb-3">Questions About Our Cookie Policy?</h2>
              <p className="text-yellow-100 mb-4">
                If you have any questions about how we use cookies or this policy, please don't hesitate
                to contact us.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-all shadow-lg"
                >
                  Contact Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
