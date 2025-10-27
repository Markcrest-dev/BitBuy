'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { useCurrency } from '@/hooks/useCurrency'
import { TrashIcon, ShoppingBagIcon, TruckIcon, ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore()
  const { formatPrice } = useCurrency()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
              <ShoppingBagIcon className="w-16 h-16 text-amber-600" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping now!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 sm:mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-600 transition-colors flex items-center gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            Home
          </Link>
          <span className="text-amber-600">/</span>
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </nav>

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border-2 border-amber-100 hover:border-amber-300"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <Link href={`/products/${item.slug}`} className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-32 h-32 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition-all">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <svg
                            className="w-12 h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-bold text-gray-900 hover:text-amber-600 transition-colors mb-2 block text-base sm:text-lg line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                      {isClient ? formatPrice(item.price) : `$${item.price.toFixed(2)}`}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center border-2 border-amber-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-amber-50 transition-colors text-amber-600 font-bold text-lg"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          min="1"
                          max={item.inventory}
                          className="w-16 text-center border-x-2 border-amber-200 py-2 font-bold text-gray-900 focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.inventory}
                          className="px-4 py-2 hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-amber-600 font-bold text-lg"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                        Remove
                      </button>
                    </div>

                    {item.quantity >= item.inventory && (
                      <p className="text-xs text-orange-600 mt-2 font-medium">
                        ⚠️ Maximum quantity reached
                      </p>
                    )}
                  </div>

                  {/* Item Total - Hidden on mobile, shown on larger screens */}
                  <div className="text-center sm:text-right mt-4 sm:mt-0">
                    <p className="text-sm text-gray-500 mb-1">Total</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {isClient ? formatPrice(item.price * item.quantity) : `$${(item.price * item.quantity).toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 sm:p-8 sticky top-4 border-2 border-amber-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-bold">{isClient ? formatPrice(subtotal) : `$${subtotal.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : (isClient ? formatPrice(shipping) : `$${shipping.toFixed(2)}`)}
                  </span>
                </div>
                {subtotal < 50 && subtotal > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
                    <TruckIcon className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <p className="text-xs text-orange-700 font-medium">
                      Add {isClient ? formatPrice(50 - subtotal) : `$${(50 - subtotal).toFixed(2)}`} more for free shipping!
                    </p>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Tax (10%)</span>
                  <span className="font-bold">{isClient ? formatPrice(tax) : `$${tax.toFixed(2)}`}</span>
                </div>
                <div className="border-t-2 border-amber-200 pt-4 flex justify-between font-bold text-xl sm:text-2xl">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    {isClient ? formatPrice(total) : `$${total.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white text-center py-4 rounded-xl font-bold text-base sm:text-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="block w-full text-center py-4 border-2 border-amber-300 rounded-xl font-bold hover:bg-amber-50 transition-all duration-300 text-amber-700"
              >
                Continue Shopping
              </Link>

              {/* Features */}
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheckIcon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <span className="font-medium">30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="font-medium">Secure payment guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
