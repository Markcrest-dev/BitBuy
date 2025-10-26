import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Heading,
  Hr,
  Button,
} from '@react-email/components'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderConfirmationEmailProps {
  orderId: string
  orderDate: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export default function OrderConfirmationEmail({
  orderId,
  orderDate,
  customerName,
  customerEmail,
  items,
  subtotal,
  shipping,
  total,
  shippingAddress,
}: OrderConfirmationEmailProps) {
  const formatPrice = (amount: number) => {
    return `$${amount.toFixed(2)}`
  }

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>BitBuy</Heading>
            <Text style={tagline}>Your Premium E-Commerce Destination</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Order Confirmed! 🎉</Heading>

            <Text style={text}>
              Hi {customerName},
            </Text>

            <Text style={text}>
              Thank you for your order! We've received your payment and your order is being
              processed. You'll receive another email when your items ship.
            </Text>

            {/* Order Details */}
            <Section style={orderBox}>
              <table style={table}>
                <tbody>
                  <tr>
                    <td style={tableLabel}>Order Number:</td>
                    <td style={tableValue}>#{orderId}</td>
                  </tr>
                  <tr>
                    <td style={tableLabel}>Order Date:</td>
                    <td style={tableValue}>{orderDate}</td>
                  </tr>
                  <tr>
                    <td style={tableLabel}>Email:</td>
                    <td style={tableValue}>{customerEmail}</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* Order Items */}
            <Heading style={h2}>Order Items</Heading>
            <Section style={itemsBox}>
              {items.map((item, index) => (
                <div key={index} style={itemRow}>
                  <Text style={itemName}>
                    {item.name} <span style={itemQty}>x {item.quantity}</span>
                  </Text>
                  <Text style={itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
                </div>
              ))}

              <Hr style={hr} />

              {/* Totals */}
              <div style={totalRow}>
                <Text style={totalLabel}>Subtotal:</Text>
                <Text style={totalValue}>{formatPrice(subtotal)}</Text>
              </div>
              <div style={totalRow}>
                <Text style={totalLabel}>Shipping:</Text>
                <Text style={totalValue}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</Text>
              </div>
              <div style={totalRow}>
                <Text style={totalLabelBold}>Total:</Text>
                <Text style={totalValueBold}>{formatPrice(total)}</Text>
              </div>
            </Section>

            {/* Shipping Address */}
            <Heading style={h2}>Shipping Address</Heading>
            <Section style={addressBox}>
              <Text style={addressText}>{customerName}</Text>
              <Text style={addressText}>{shippingAddress.street}</Text>
              <Text style={addressText}>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </Text>
              <Text style={addressText}>{shippingAddress.country}</Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button
                style={button}
                href={`${process.env.NEXTAUTH_URL}/orders/${orderId}`}
              >
                View Order Details
              </Button>
            </Section>

            <Text style={text}>
              If you have any questions, please don't hesitate to contact our support team.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Track your order:{' '}
              <Link href={`${process.env.NEXTAUTH_URL}/track-order`} style={link}>
                Track Order
              </Link>
            </Text>
            <Text style={footerText}>
              Need help?{' '}
              <Link href="mailto:support@bitbuy.com" style={link}>
                Contact Support
              </Link>
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} BitBuy. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const header = {
  padding: '32px 24px',
  backgroundColor: '#1a1a1a',
  textAlign: 'center' as const,
}

const logo = {
  fontSize: '32px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #d4af37 0%, #ffd700 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  margin: '0',
}

const tagline = {
  color: '#d4af37',
  fontSize: '14px',
  margin: '8px 0 0 0',
}

const content = {
  padding: '32px 24px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
}

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const orderBox = {
  backgroundColor: '#f8f8f8',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
}

const table = {
  width: '100%',
}

const tableLabel = {
  color: '#8898aa',
  fontSize: '14px',
  padding: '8px 0',
}

const tableValue = {
  color: '#1a1a1a',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'right' as const,
  padding: '8px 0',
}

const itemsBox = {
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
}

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
}

const itemName = {
  color: '#1a1a1a',
  fontSize: '14px',
  margin: '0',
}

const itemQty = {
  color: '#8898aa',
  fontSize: '14px',
}

const itemPrice = {
  color: '#1a1a1a',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
}

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
}

const totalLabel = {
  color: '#525252',
  fontSize: '14px',
  margin: '0',
}

const totalValue = {
  color: '#525252',
  fontSize: '14px',
  margin: '0',
}

const totalLabelBold = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const totalValueBold = {
  color: '#d4af37',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
}

const addressBox = {
  backgroundColor: '#f8f8f8',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
}

const addressText = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#d4af37',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '16px 0',
}

const footer = {
  padding: '0 24px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
}

const link = {
  color: '#d4af37',
  textDecoration: 'underline',
}
