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

interface ShippingNotificationEmailProps {
  orderId: string
  customerName: string
  trackingNumber: string
  carrier: string
  estimatedDelivery: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export default function ShippingNotificationEmail({
  orderId,
  customerName,
  trackingNumber,
  carrier,
  estimatedDelivery,
  shippingAddress,
}: ShippingNotificationEmailProps) {
  // Generate tracking URL based on carrier
  const getTrackingUrl = () => {
    const carriers: { [key: string]: string } = {
      'ups': `https://www.ups.com/track?tracknum=${trackingNumber}`,
      'fedex': `https://www.fedex.com/fedextrack/?tracknumbers=${trackingNumber}`,
      'usps': `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
      'dhl': `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
    }
    return carriers[carrier.toLowerCase()] || '#'
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
            <Heading style={h1}>Your Order Has Shipped! 📦</Heading>

            <Text style={text}>
              Hi {customerName},
            </Text>

            <Text style={text}>
              Great news! Your order has been shipped and is on its way to you.
            </Text>

            {/* Tracking Info */}
            <Section style={trackingBox}>
              <Heading style={trackingHeading}>Tracking Information</Heading>

              <table style={table}>
                <tbody>
                  <tr>
                    <td style={tableLabel}>Order Number:</td>
                    <td style={tableValue}>#{orderId}</td>
                  </tr>
                  <tr>
                    <td style={tableLabel}>Carrier:</td>
                    <td style={tableValue}>{carrier}</td>
                  </tr>
                  <tr>
                    <td style={tableLabel}>Tracking Number:</td>
                    <td style={tableValue}>{trackingNumber}</td>
                  </tr>
                  <tr>
                    <td style={tableLabel}>Estimated Delivery:</td>
                    <td style={tableValue}>{estimatedDelivery}</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* Track Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={getTrackingUrl()}>
                Track Your Package
              </Button>
            </Section>

            {/* Shipping Address */}
            <Heading style={h2}>Shipping To:</Heading>
            <Section style={addressBox}>
              <Text style={addressText}>{customerName}</Text>
              <Text style={addressText}>{shippingAddress.street}</Text>
              <Text style={addressText}>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </Text>
              <Text style={addressText}>{shippingAddress.country}</Text>
            </Section>

            {/* Additional Info */}
            <Section style={infoBox}>
              <Text style={infoText}>
                <strong>📍 What's Next?</strong>
              </Text>
              <Text style={infoText}>
                Your package is on its way! You can track its progress using the tracking number above.
                Once delivered, you'll receive a confirmation notification.
              </Text>
              <Text style={infoText}>
                <strong>📞 Need Help?</strong>
              </Text>
              <Text style={infoText}>
                If you have any questions or concerns about your delivery, our support team is here to help.
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              View order details:{' '}
              <Link href={`${process.env.NEXTAUTH_URL}/orders/${orderId}`} style={link}>
                View Order
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
  margin: '24px 0 12px',
}

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const trackingBox = {
  backgroundColor: '#f0f7ff',
  border: '2px solid #d4af37',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
}

const trackingHeading = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
  textAlign: 'center' as const,
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

const addressBox = {
  backgroundColor: '#f8f8f8',
  borderRadius: '8px',
  padding: '16px',
  margin: '12px 0',
}

const addressText = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
}

const infoBox = {
  backgroundColor: '#f8f8f8',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const infoText = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
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
