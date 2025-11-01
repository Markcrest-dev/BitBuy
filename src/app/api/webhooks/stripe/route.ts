import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createOrder, updateOrderStatus } from '@/lib/order-service'
import { awardPurchasePoints } from '@/lib/loyalty'
import { OrderStatus } from '@prisma/client'

// Disable body parsing for webhook endpoints
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log('Checkout session completed:', session.id)

        // Extract metadata
        const metadata = session.metadata
        if (!metadata) {
          console.error('No metadata found in session')
          break
        }

        const { userId, shippingAddressId, cartItems, subtotal, shipping, tax, total } = metadata

        if (!userId || !shippingAddressId || !cartItems) {
          console.error('Missing required metadata')
          break
        }

        // Parse cart items
        let parsedCartItems
        try {
          parsedCartItems = JSON.parse(cartItems)
        } catch (error) {
          console.error('Failed to parse cart items:', error)
          break
        }

        // Fetch product details to get product names
        const cartItemsWithNames = await Promise.all(
          parsedCartItems.map(async (item: any) => {
            const product = await fetch(
              `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products/${item.id}`
            ).then((res) => res.json())

            return {
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
              productName: product.product?.name || 'Unknown Product',
            }
          })
        )

        // Create order in database
        const order = await createOrder({
          userId,
          cartItems: cartItemsWithNames,
          shippingAddressId,
          subtotal: parseFloat(subtotal),
          shipping: parseFloat(shipping),
          tax: parseFloat(tax),
          total: parseFloat(total),
          stripeSessionId: session.id,
        })

        console.log('Order created successfully:', order.orderNumber)

        // Award loyalty points for the purchase
        try {
          await awardPurchasePoints(userId, order.subtotal, order.id)
          console.log('Loyalty points awarded for order:', order.orderNumber)
        } catch (loyaltyError) {
          console.error('Failed to award loyalty points:', loyaltyError)
          // Don't fail the webhook if loyalty points fail
        }

        // Send order confirmation email
        try {
          const { sendOrderConfirmationEmail } = await import('@/lib/email')

          await sendOrderConfirmationEmail({
            email: order.user.email || '',
            name: order.user.name || 'Customer',
            orderNumber: order.orderNumber,
            orderDate: order.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            items: order.items.map((item) => ({
              name: item.productName,
              quantity: item.quantity,
              price: item.price,
            })),
            subtotal: order.subtotal,
            shipping: order.shipping,
            tax: order.tax,
            total: order.total,
            shippingAddress: {
              street: order.shippingAddress.street,
              city: order.shippingAddress.city,
              state: order.shippingAddress.state,
              zipCode: order.shippingAddress.zipCode,
              country: order.shippingAddress.country,
            },
          })

          console.log('Order confirmation email sent')
        } catch (emailError) {
          console.error('Failed to send order confirmation email:', emailError)
          // Don't fail the webhook if email fails
        }

        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('PaymentIntent succeeded:', paymentIntent.id)
        // Additional logic if needed
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('PaymentIntent failed:', paymentIntent.id)
        // TODO: Notify user of failed payment
        break
      }

      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge
        console.log('Charge succeeded:', charge.id)
        break
      }

      case 'charge.failed': {
        const charge = event.data.object as Stripe.Charge
        console.error('Charge failed:', charge.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
