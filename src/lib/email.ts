import { Resend } from 'resend'
import WelcomeEmail from '@/emails/WelcomeEmail'
import OrderConfirmationEmail from '@/emails/OrderConfirmationEmail'
import ShippingNotificationEmail from '@/emails/ShippingNotificationEmail'

// Initialize Resend only if API key is provided
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export default resend

/**
 * Send email helper function
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param react - React email component
 * @returns Promise with send result
 */
export async function sendEmail(
  to: string | string[],
  subject: string,
  react: React.ReactElement
) {
  // Skip sending email if Resend is not configured
  if (!resend) {
    console.warn('Email service not configured. Skipping email send.')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'BitBuy <noreply@bitbuy.com>',
      to,
      subject,
      react,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(
  email: string,
  name: string
) {
  return sendEmail(
    email,
    'Welcome to BitBuy! 🎉',
    WelcomeEmail({ name, email })
  )
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(orderData: {
  email: string
  name: string
  orderNumber: string
  orderDate: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}) {
  return sendEmail(
    orderData.email,
    `Order Confirmation - ${orderData.orderNumber}`,
    OrderConfirmationEmail({
      orderId: orderData.orderNumber,
      orderDate: orderData.orderDate,
      customerName: orderData.name,
      customerEmail: orderData.email,
      items: orderData.items,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
    })
  )
}

/**
 * Send order shipped notification email
 */
export async function sendShippingNotificationEmail(shipmentData: {
  email: string
  name: string
  orderNumber: string
  trackingNumber: string
  carrier: string
  estimatedDelivery?: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}) {
  // Calculate estimated delivery if not provided (3-5 business days)
  const estimatedDelivery = shipmentData.estimatedDelivery || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return sendEmail(
    shipmentData.email,
    `Your Order Has Shipped - ${shipmentData.orderNumber}`,
    ShippingNotificationEmail({
      orderId: shipmentData.orderNumber,
      customerName: shipmentData.name,
      trackingNumber: shipmentData.trackingNumber,
      carrier: shipmentData.carrier,
      estimatedDelivery,
      shippingAddress: shipmentData.shippingAddress,
    })
  )
}
