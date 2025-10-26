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

interface WelcomeEmailProps {
  name: string
  email: string
}

export default function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Heading style={logo}>BitBuy</Heading>
            <Text style={tagline}>Your Premium E-Commerce Destination</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Welcome to BitBuy! 🎉</Heading>

            <Text style={text}>
              Hi {name || 'there'},
            </Text>

            <Text style={text}>
              Thank you for joining BitBuy! We're thrilled to have you as part of our community.
              Get ready to discover amazing products at unbeatable prices.
            </Text>

            <Text style={text}>
              Here's what you can do with your new account:
            </Text>

            <ul style={list}>
              <li style={listItem}>Browse thousands of premium products</li>
              <li style={listItem}>Track your orders in real-time</li>
              <li style={listItem}>Save your favorite items to wishlists</li>
              <li style={listItem}>Get exclusive deals and early access to sales</li>
              <li style={listItem}>Enjoy fast and free shipping on orders over $50</li>
            </ul>

            <Section style={buttonContainer}>
              <Button style={button} href={`${process.env.NEXTAUTH_URL}/products`}>
                Start Shopping Now
              </Button>
            </Section>

            <Text style={text}>
              Your account email: <strong>{email}</strong>
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Need help? Contact us at{' '}
              <Link href="mailto:support@bitbuy.com" style={link}>
                support@bitbuy.com
              </Link>
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} BitBuy. All rights reserved.
            </Text>
            <Text style={footerSmall}>
              This email was sent to {email}. If you didn't create an account with BitBuy,
              you can safely ignore this email.
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

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const list = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  paddingLeft: '20px',
}

const listItem = {
  margin: '8px 0',
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

const footerSmall = {
  color: '#aab7c4',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 0 0',
}

const link = {
  color: '#d4af37',
  textDecoration: 'underline',
}
