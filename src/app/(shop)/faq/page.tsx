'use client'

import Link from 'next/link'
import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqs: FAQ[] = [
    {
      category: 'Orders',
      question: 'How do I place an order?',
      answer: 'To place an order, simply browse our products, add items to your cart, and proceed to checkout. Fill in your shipping and payment information, and confirm your order. You\'ll receive a confirmation email once your order is placed.',
    },
    {
      category: 'Orders',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Contact our support team immediately if you need to make changes.',
    },
    {
      category: 'Orders',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.',
    },
    {
      category: 'Shipping',
      question: 'What are your shipping options?',
      answer: 'We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Free standard shipping is available on orders over $50.',
    },
    {
      category: 'Shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by location. Check our shipping calculator at checkout for specific rates.',
    },
    {
      category: 'Shipping',
      question: 'What if my package is lost or damaged?',
      answer: 'If your package is lost or arrives damaged, please contact our support team within 48 hours of the expected delivery date. We\'ll work with the shipping carrier to resolve the issue and send a replacement if necessary.',
    },
    {
      category: 'Returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on most items. Products must be unused, in original packaging, and in resalable condition. Some items like software, personal care products, and clearance items are non-returnable.',
    },
    {
      category: 'Returns',
      question: 'How do I return an item?',
      answer: 'To initiate a return, log into your account, go to your order history, and click "Return Items". Follow the instructions to print your return label. Once we receive the item, we\'ll process your refund within 5-7 business days.',
    },
    {
      category: 'Returns',
      question: 'Who pays for return shipping?',
      answer: 'For defective or incorrect items, we cover return shipping costs. For standard returns, customers are responsible for return shipping unless you have BitBuy Premium membership.',
    },
    {
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.',
    },
    {
      category: 'Payment',
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.',
    },
    {
      category: 'Payment',
      question: 'Do you offer payment plans?',
      answer: 'Yes, we partner with Affirm and Klarna to offer flexible payment plans on purchases over $200. You can choose your payment plan at checkout.',
    },
    {
      category: 'Account',
      question: 'Do I need an account to place an order?',
      answer: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, view order history, and receive exclusive deals.',
    },
    {
      category: 'Account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you instructions to reset your password.',
    },
    {
      category: 'Account',
      question: 'Can I change my email address?',
      answer: 'Yes, you can update your email address in your account settings under Profile Information.',
    },
  ]

  const categories = ['all', 'Orders', 'Shipping', 'Returns', 'Payment', 'Account']

  const filteredFAQs = selectedCategory === 'all'
    ? faqs
    : faqs.filter((faq) => faq.category === selectedCategory)

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">FAQ</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Find answers to common questions about orders, shipping, returns, and more
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Category Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Questions' : category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-blue-600 mb-1 block">
                      {faq.category}
                    </span>
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 ml-4 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Contact Support
              </Link>
              <a
                href="mailto:support@bitbuy.com"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border border-blue-200"
              >
                Email Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/about"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition text-center"
            >
              <div className="text-4xl mb-3">ℹ️</div>
              <h3 className="font-bold mb-2">About Us</h3>
              <p className="text-sm text-gray-600">Learn more about BitBuy</p>
            </Link>
            <Link
              href="/terms"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition text-center"
            >
              <div className="text-4xl mb-3">📜</div>
              <h3 className="font-bold mb-2">Terms of Service</h3>
              <p className="text-sm text-gray-600">Read our terms and conditions</p>
            </Link>
            <Link
              href="/privacy"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition text-center"
            >
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold mb-2">Privacy Policy</h3>
              <p className="text-sm text-gray-600">How we protect your data</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
