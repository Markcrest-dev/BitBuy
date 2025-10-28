# Stripe Payment Integration - Implementation Guide

## ✅ Completed

1. **Installed Stripe packages**
   ```bash
   npm install stripe @stripe/stripe-js --legacy-peer-deps
   ```

2. **Created Stripe utility** (`src/lib/stripe.ts`)
3. **Created Checkout API** (`src/app/api/checkout/route.ts`)
4. **Updated Checkout Page** (`src/app/(shop)/checkout/page.tsx`)

---

## 🚧 Remaining Tasks

### 1. Create Success Page

**File:** `src/app/(shop)/checkout/success/page.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCartStore()
  const [sessionId] = useState(searchParams.get('session_id'))

  useEffect(() => {
    // Clear cart after successful payment
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  if (!sessionId) {
    router.push('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <CheckCircleIcon className="w-20 h-20 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            Payment Successful!
          </h1>

          <p className="text-xl text-gray-700 mb-8">
            Thank you for your order. We've sent a confirmation email with your order details.
          </p>

          <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-amber-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>
            <ul className="text-left space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span>You'll receive an order confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span>Track your order status in your dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span>Your items will be shipped within 2-3 business days</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-xl font-bold text-lg hover:from-amber-700 hover:to-yellow-700 transition-all shadow-xl hover:shadow-2xl"
            >
              View My Orders
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-amber-300 text-amber-700 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 2. Create Cancel Page

**File:** `src/app/(shop)/checkout/cancel/page.tsx`

```typescript
'use client'

import Link from 'next/link'
import { XCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <XCircleIcon className="w-20 h-20 text-orange-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>

          <p className="text-xl text-gray-700 mb-8">
            Your payment was cancelled. Your cart items are still saved.
          </p>

          <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-8 mb-8 border-2 border-amber-100">
            <p className="text-gray-700 mb-4">
              No charges were made to your account. You can return to your cart to complete your purchase when you're ready.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-xl font-bold text-lg hover:from-amber-700 hover:to-yellow-700 transition-all shadow-xl hover:shadow-2xl"
            >
              <ArrowLeftIcon className="w-6 h-6" />
              Back to Cart
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-amber-300 text-amber-700 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 3. Create Stripe Webhook Handler

**File:** `src/app/api/webhooks/stripe/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

// This is required to handle Stripe webhook raw body
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Create order in database
        await handleCheckoutSessionCompleted(session)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('PaymentIntent succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('PaymentIntent failed:', paymentIntent.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata

  if (!metadata) {
    throw new Error('No metadata in session')
  }

  const {
    userId,
    shippingAddressId,
    cartItems,
    subtotal,
    shipping,
    tax,
    total,
  } = metadata

  // Parse cart items
  const items = JSON.parse(cartItems)

  // Generate unique order number
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  // Create order in database
  const order = await prisma.order.create({
    data: {
      userId,
      orderNumber,
      status: 'PENDING',
      subtotal: parseFloat(subtotal),
      shipping: parseFloat(shipping),
      tax: parseFloat(tax),
      total: parseFloat(total),
      shippingAddressId,
      items: {
        create: items.map((item: any) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          productName: '', // Will be fetched from product
        })),
      },
    },
    include: {
      items: true,
      shippingAddress: true,
    },
  })

  // Update product names in order items
  for (const item of order.items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      select: { name: true },
    })

    if (product) {
      await prisma.orderItem.update({
        where: { id: item.id },
        data: { productName: product.name },
      })
    }
  }

  // Decrease product inventory
  for (const item of items) {
    await prisma.product.update({
      where: { id: item.id },
      data: {
        inventory: {
          decrement: item.quantity,
        },
      },
    })
  }

  // TODO: Send order confirmation email
  console.log('Order created successfully:', order.orderNumber)

  return order
}
```

### 4. Environment Variables

Add these to your `.env` file:

```bash
# Stripe
STRIPE_SECRET_KEY="sk_test_YOUR_SECRET_KEY"
STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_PUBLISHABLE_KEY"
STRIPE_WEBHOOK_SECRET="whsec_YOUR_WEBHOOK_SECRET"
```

---

## 📝 Setup Instructions

### Step 1: Get Stripe Keys

1. Go to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** and **Secret key**
3. Add them to your `.env` file

### Step 2: Set up Stripe Webhook

1. Install Stripe CLI:
   ```bash
   brew install stripe/stripe-cli/stripe
   # or
   curl -s https://packages.stripe.com/api/v1/stripe-cli/releases/latest/linux/x86_64 | tar -xz
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copy the webhook signing secret (`whsec_...`) and add it to `.env`

### Step 3: Test the Integration

1. Add items to cart
2. Go to checkout
3. Use Stripe test card: `4242 4242 4242 4242`
4. Use any future expiry date and any 3-digit CVC
5. Complete payment
6. Check webhook logs and database for order creation

---

## 🧪 Test Cards

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Success |
| 4000 0025 0000 3155 | Requires authentication |
| 4000 0000 0000 9995 | Declined |

---

## 🚀 Production Setup

When ready for production:

1. Switch to live Stripe keys in production environment
2. Set up production webhook endpoint in Stripe Dashboard
3. Update `NEXTAUTH_URL` to production URL
4. Test with real card (small amount)
5. Monitor Stripe Dashboard for transactions

---

## 📋 Checklist

- [x] Install Stripe packages
- [x] Create Stripe utility
- [x] Create checkout API
- [x] Update checkout page
- [ ] Create success page
- [ ] Create cancel page
- [ ] Create webhook handler
- [ ] Add environment variables
- [ ] Test with Stripe test cards
- [ ] Set up webhook forwarding
- [ ] Test end-to-end flow

---

## 🆘 Troubleshooting

**Issue:** Webhook not receiving events
- **Solution:** Make sure `stripe listen` is running

**Issue:** Order not created after payment
- **Solution:** Check webhook logs in terminal

**Issue:** "No signature" error
- **Solution:** Verify `STRIPE_WEBHOOK_SECRET` is set correctly

**Issue:** Address not found
- **Solution:** Create an address in dashboard first

---

##  Next Steps After Stripe

Once Stripe is working:

1. **Email Notifications** - Send order confirmation emails
2. **Order Management** - Connect orders page to display real orders
3. **Address API** - Create address management endpoints
4. **Cart Sync** - Sync cart to database
5. **Admin Dashboard** - Add order management for admins

---

**Status:** 60% Complete
**Next File to Create:** `src/app/(shop)/checkout/success/page.tsx`
