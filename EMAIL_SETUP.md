# Email Setup for BitBuy

This guide will help you set up email notifications using Resend for the BitBuy e-commerce platform.

## Why Resend?

Resend is a modern email API designed for developers:
- Simple integration with React Email components
- Generous free tier (100 emails/day, 3,000 emails/month)
- No credit card required for free tier
- Excellent deliverability
- Built specifically for transactional emails

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

After logging in to your Resend dashboard:

1. Go to **API Keys** in the sidebar
2. Click **Create API Key**
3. Give it a name (e.g., "BitBuy Development")
4. Select permissions (Full Access for development)
5. Click **Add**
6. Copy your API key (it starts with `re_`)

## Step 3: Configure Environment Variables

1. Open your `.env` file in the root directory
2. Add your Resend API key:

```env
# Email (Resend)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=BitBuy <noreply@yourdomain.com>
```

Replace:
- `re_your_api_key_here` with your actual API key
- `noreply@yourdomain.com` with your sending email

## Step 4: Verify Your Domain (Production Only)

For production, you need to verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain name (e.g., `bitbuy.com`)
4. Add the provided DNS records to your domain registrar
5. Wait for verification (usually takes a few minutes)

**Note**: For development/testing, you can use `onboarding@resend.dev` which is pre-verified.

## Step 5: Test Email Sending

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Register a new account on your site
3. Check your email inbox for the welcome email

## Email Templates

The platform includes the following email templates:

### 1. Welcome Email
- **Sent when**: User registers a new account
- **Template**: `src/emails/WelcomeEmail.tsx`
- **Features**: Welcome message, account info, CTA to start shopping

### 2. Order Confirmation Email
- **Sent when**: Order is successfully placed
- **Template**: `src/emails/OrderConfirmationEmail.tsx`
- **Features**: Order details, items list, pricing, shipping address

### 3. Shipping Notification Email
- **Sent when**: Order ships
- **Template**: `src/emails/ShippingNotificationEmail.tsx`
- **Features**: Tracking number, carrier info, estimated delivery, tracking link

## Customizing Email Templates

All email templates use React Email components and can be customized:

1. Templates are located in `src/emails/`
2. Edit the TSX files to modify content and styling
3. Styles are inline CSS-in-JS for maximum email client compatibility
4. The templates use the BitBuy brand colors (gold #d4af37 and black #1a1a1a)

## Testing Emails Locally

To preview emails without sending them:

1. Install React Email dev tools:
   ```bash
   npm install -D email-dev
   ```

2. Add script to `package.json`:
   ```json
   "scripts": {
     "email": "email dev"
   }
   ```

3. Run the email dev server:
   ```bash
   npm run email
   ```

4. Open `http://localhost:3000` to preview templates

## Sending Emails Programmatically

Use the `sendEmail` helper function:

```typescript
import { sendEmail } from '@/lib/email'
import WelcomeEmail from '@/emails/WelcomeEmail'

await sendEmail(
  'user@example.com',
  'Welcome to BitBuy!',
  WelcomeEmail({ name: 'John', email: 'user@example.com' })
)
```

## Troubleshooting

### Emails not sending
- Verify your RESEND_API_KEY is correct
- Check the server console for error messages
- Ensure you're not exceeding the free tier limit (100/day)

### Emails going to spam
- For development: This is normal when using `onboarding@resend.dev`
- For production: Verify your domain and set up SPF/DKIM records

### Invalid email address
- In development, you can only send to your verified email
- In production with verified domain, you can send to any email

## Free Tier Limits

Resend free tier includes:
- 3,000 emails per month
- 100 emails per day
- All features included
- No credit card required

This should be more than enough for development and small production deployments.

## Going to Production

Before deploying to production:

1. Verify your domain in Resend
2. Update `EMAIL_FROM` to use your domain
3. Add SPF and DKIM DNS records
4. Test all email flows
5. Monitor email deliverability in Resend dashboard
6. Consider upgrading to paid plan if you exceed limits
