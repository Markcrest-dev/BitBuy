'use client'

import Link from 'next/link'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      {/* Trust Badges */}
      <div className="border-b border-gray-700/50 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheckIcon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">100% Secure Payments</h4>
                <p className="text-xs text-gray-400">SSL encrypted transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Quality Guaranteed</h4>
                <p className="text-xs text-gray-400">Premium products only</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <HeartIcon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Customer Satisfaction</h4>
                <p className="text-xs text-gray-400">24/7 support available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                BitBuy
              </h3>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your premier destination for premium household appliances, cutting-edge gadgets, stylish clothing, trendy sneakers, and quality everyday essentials. Shop with confidence and style.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:support@bitbuy.com" className="flex items-center gap-3 text-sm hover:text-amber-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <EnvelopeIcon className="w-4 h-4 text-amber-400" />
                </div>
                <span>support@bitbuy.com</span>
              </a>
              <a href="tel:+2348012345678" className="flex items-center gap-3 text-sm hover:text-amber-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <PhoneIcon className="w-4 h-4 text-amber-400" />
                </div>
                <span>+234 801 234 5678</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-4 h-4 text-amber-400" />
                </div>
                <span>15 Admiralty Way, Lekki Phase 1<br />Lagos, Nigeria</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', label: 'Facebook' },
                { icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', label: 'Twitter' },
                { icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z', label: 'Instagram' },
                { icon: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z', label: 'TikTok' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-amber-500 hover:to-yellow-600 flex items-center justify-center transition-all hover:scale-110 border border-gray-700 hover:border-amber-500 group"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-amber-400" />
              Shop
            </h3>
            <ul className="space-y-3 text-sm">
              {['All Products', 'New Arrivals', 'Best Sellers', 'On Sale', 'Electronics', 'Fashion', 'Home & Living'].map((item, index) => (
                <li key={index}>
                  <Link href={`/products${item === 'All Products' ? '' : '?category=' + item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-amber-400 transition-colors hover:pl-2 inline-block duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQs', href: '/faq' },
                { label: 'Track Order', href: '/track-order' },
                { label: 'Shipping Info', href: '/shipping' },
                { label: 'Returns & Refunds', href: '/returns' },
                { label: 'Size Guide', href: '/size-guide' },
                { label: 'Gift Cards', href: '/gift-cards' }
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:text-amber-400 transition-colors hover:pl-2 inline-block duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Blog', href: '/blog' },
                { label: 'Affiliates', href: '/affiliates' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '/cookies' }
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:text-amber-400 transition-colors hover:pl-2 inline-block duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-12 border-t border-gray-700/50">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Join Our Newsletter
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to get special offers, exclusive deals, and the latest news delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-gray-700 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} <span className="text-amber-400 font-semibold">BitBuy</span>. All rights reserved. Made with <HeartIcon className="w-4 h-4 inline text-red-500" />
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-gray-500 text-xs mr-2">We accept:</span>
              <div className="flex gap-2 flex-wrap">
                {/* Visa */}
                <div className="w-12 h-8 bg-white rounded border border-gray-700 hover:border-amber-500 transition-all flex items-center justify-center p-1" title="Visa">
                  <svg viewBox="0 0 48 32" className="w-full h-full">
                    <path fill="#1434CB" d="M19.8 23.4l2.4-14.8h3.8l-2.4 14.8h-3.8zm17.8-14.4c-.8-.3-2-.6-3.6-.6-3.9 0-6.7 2-6.7 5 0 2.2 2 3.4 3.6 4.1 1.6.7 2.1 1.2 2.1 1.8 0 1-.9 1.4-1.8 1.4-1.2 0-1.8-.2-2.8-.6l-.4-.2-.4 2.6c.9.4 2.6.8 4.4.8 4.2 0 6.9-2 6.9-5.2 0-1.7-1-3-3.2-4.1-1.3-.7-2.1-1.1-2.1-1.8 0-.6.7-1.2 2.2-1.2 1.3 0 2.2.3 2.9.6l.3.1.4-2.7zM45 8.6h-3c-.9 0-1.6.3-2 1.2l-5.7 13.6h4.2l.8-2.3h5.1l.5 2.3H49L45.8 8.6h-.8zm-4.8 9.6c.3-.9 1.6-4.3 1.6-4.3l.9 4.3h-2.5zM16.8 8.6L13 19.5l-.4-2c-.7-2.4-3-5-5.5-6.3l3.4 12.2h4.2l6.3-14.8h-4.2z"/>
                    <path fill="#F7B600" d="M7.6 8.6H.1l-.1.5c5 1.2 8.3 4.2 9.7 7.8l-1.4-7c-.2-.9-.9-1.2-1.7-1.3z"/>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="w-12 h-8 bg-white rounded border border-gray-700 hover:border-amber-500 transition-all flex items-center justify-center p-1" title="Mastercard">
                  <svg viewBox="0 0 48 32" className="w-full h-full">
                    <circle fill="#EB001B" cx="18" cy="16" r="10"/>
                    <circle fill="#F79E1B" cx="30" cy="16" r="10"/>
                    <path fill="#FF5F00" d="M24 8.9c-2 1.7-3.3 4.3-3.3 7.1s1.3 5.4 3.3 7.1c2-1.7 3.3-4.3 3.3-7.1s-1.3-5.4-3.3-7.1z"/>
                  </svg>
                </div>
                {/* PayPal */}
                <div className="w-12 h-8 bg-white rounded border border-gray-700 hover:border-amber-500 transition-all flex items-center justify-center p-1" title="PayPal">
                  <svg viewBox="0 0 48 32" className="w-full h-full">
                    <path fill="#003087" d="M18.1 9h-4.8L10 22.2h3l.7-4.5h1.6c3.4 0 5.4-1.7 5.9-5 .2-1.4 0-2.6-.7-3.4-.8-.9-2.1-1.3-3.9-1.3h-.5zm.5 4.9c-.3 1.7-1.6 1.7-2.8 1.7h-.7l.5-3.2h.6c.9 0 1.7 0 2.1.5.3.3.4.8.3 1z"/>
                    <path fill="#009CDE" d="M28.1 13.8h-3l-.2 1.1-.3-.9c-.6-1.6-2.4-2.1-4.1-2.1-3.8 0-7.1 2.9-7.7 7-.3 2.1.1 4 1.3 5.3 1 1.2 2.5 1.7 4.2 1.7 3 0 4.7-1.9 4.7-1.9l-.2 1.1h2.7l2.6-11.3zm-4.2 4.9c-.3 2-1.9 3.3-4 3.3-1 0-1.8-.3-2.4-1-.5-.6-.7-1.5-.6-2.5.3-2 2-3.4 3.9-3.4 1 0 1.8.3 2.3 1 .6.6.9 1.5.8 2.6z"/>
                    <path fill="#003087" d="M35.5 9h-3l.2-1.2h2.7L35.5 9zm-.5 13.2h2.9l1.8-11.4h-2.9l-1.8 11.4z"/>
                    <path fill="#009CDE" d="M43.9 9.1l-2 11.1-.2-1c-.6-1.6-2.4-2.1-4.1-2.1-3.8 0-7.1 2.9-7.7 7-.3 2.1.1 4 1.3 5.3 1 1.2 2.5 1.7 4.2 1.7 3 0 4.7-1.9 4.7-1.9l-.2 1.1h2.7L46 9.1h-2.1zm-5.2 9.7c-.3 2-1.9 3.3-4 3.3-1 0-1.8-.3-2.4-1-.5-.6-.7-1.5-.6-2.5.3-2 2-3.4 3.9-3.4 1 0 1.8.3 2.3 1 .6.6.9 1.5.8 2.6z"/>
                  </svg>
                </div>
                {/* Verve */}
                <div className="w-12 h-8 bg-white rounded border border-gray-700 hover:border-amber-500 transition-all flex items-center justify-center text-xs font-bold" title="Verve" style={{background: 'linear-gradient(to right, #00425F, #00AEEF)'}}>
                  <span className="text-white">VERVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
