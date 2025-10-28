'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { useCurrency } from '@/hooks/useCurrency'
import { ShoppingBagIcon, TruckIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { items, getTotalPrice, getTotalItems } = useCartStore()
  const { formatPrice } = useCurrency()

  const [isClient, setIsClient] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [addresses, setAddresses] = useState<any[]>([])

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/checkout')
    }
  }, [status, router])

  // Redirect if cart is empty
  useEffect(() => {
    if (isClient && items.length === 0) {
      router.push('/cart')
    }
  }, [isClient, items, router])

  // Fetch user's addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('/api/addresses')
        if (response.ok) {
          const data = await response.json()
          setAddresses(data)

          // Auto-select default address
          const defaultAddr = data.find((addr: any) => addr.isDefault)
          if (defaultAddr) {
            setSelectedAddress(defaultAddr.id)
          } else if (data.length > 0) {
            setSelectedAddress(data[0].id)
          }
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error)
      }
    }

    if (session?.user) {
      fetchAddresses()
    }
  }, [session])

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert('Please select a shipping address')
      return
    }

    setIsProcessing(true)

    try {
      // Prepare cart items for checkout
      const cartItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }))

      // Create Stripe Checkout Session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          shippingAddressId: selectedAddress,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert(error.message || 'Failed to process checkout')
      setIsProcessing(false)
    }
  }

  if (status === 'loading' || !isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-amber-600">/</span>
          <Link href="/cart" className="hover:text-amber-600 transition-colors">
            Cart
          </Link>
          <span className="mx-2 text-amber-600">/</span>
          <span className="text-gray-900 font-medium">Checkout</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">
            Complete your order - {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 border-2 border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <TruckIcon className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No addresses saved</p>
                  <Link
                    href="/dashboard/addresses"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition shadow-md font-medium"
                  >
                    Add Address
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedAddress === address.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-amber-200 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{address.street}</p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p className="text-sm text-gray-600">{address.country}</p>
                        </div>
                        {address.isDefault && (
                          <span className="px-2 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 text-xs font-bold rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 border-2 border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBagIcon className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingBagIcon className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">
                      {isClient ? formatPrice(item.price * item.quantity) : `$${(item.price * item.quantity).toFixed(2)}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6 border-2 border-amber-100 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Subtotal</span>
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

              <button
                onClick={handleCheckout}
                disabled={isProcessing || !selectedAddress || addresses.length === 0}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCardIcon className="w-6 h-6" />
                    Proceed to Payment
                  </>
                )}
              </button>

              {/* Security Badges */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <LockClosedIcon className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Secure SSL Encrypted Payment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CreditCardIcon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Powered by Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
