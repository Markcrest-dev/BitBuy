# Deployment Guide - BitBuy E-Commerce Platform

This guide walks you through deploying the BitBuy e-commerce platform to production using Vercel and setting up all required services.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Environment Variables](#environment-variables)
4. [Vercel Deployment](#vercel-deployment)
5. [Post-Deployment Steps](#post-deployment-steps)
6. [Monitoring & Analytics](#monitoring--analytics)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account with repository access
- ✅ Vercel account (free tier works fine)
- ✅ PostgreSQL database (production)
- ✅ Cloudinary account for image storage
- ✅ Resend account for email services
- ✅ (Optional) Stripe account for payments

---

## Database Setup

### Option 1: Vercel Postgres (Recommended)

**YOU WILL DO THIS:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Choose your preferred region (select closest to your users)
6. Click **Create**
7. Copy the `DATABASE_URL` connection string
8. Save it for the environment variables section

**Pricing**: Free tier includes 60 hours compute time/month, 256 MB storage

### Option 2: Neon (Alternative)

**YOU WILL DO THIS:**

1. Go to [Neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Copy the connection string
5. Format: `postgresql://username:password@host/database?sslmode=require`

**Pricing**: Free tier includes 512 MB storage

### Option 3: Railway (Alternative)

**YOU WILL DO THIS:**

1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Add a PostgreSQL database
4. Copy the connection string from the **Connect** tab

**Pricing**: $5/month credit on free tier

---

## Environment Variables

### Step 1: Create Production Environment Variables

**YOU WILL DO THIS:**

Create accounts and get API keys for the following services:

#### 1. Cloudinary (Image Storage)

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free account
3. From Dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret

#### 2. Resend (Email Service)

1. Go to [Resend.com](https://resend.com)
2. Sign up for free account
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the API key

#### 3. NextAuth Secret

Generate a secure random string:

```bash
# Run this command in your terminal
openssl rand -base64 32
```

Copy the output - this is your `NEXTAUTH_SECRET`

#### 4. (Optional) Stripe for Payments

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your test keys first from **Developers > API keys**
3. Later, enable live mode and get production keys

### Step 2: Environment Variables Reference

Here's what you'll need:

```bash
# Database
DATABASE_URL="postgresql://user:pass@host/db"

# NextAuth
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-generated-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Resend
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# App Configuration
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_APP_NAME="BitBuy"

# Optional: Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## Vercel Deployment

### Step 1: Push Code to GitHub

**YOU WILL DO THIS:**

```bash
# Make sure all changes are committed
git status

# Push to GitHub
git push origin main
```

### Step 2: Import Project to Vercel

**YOU WILL DO THIS:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** > **Project**
3. Select **Import Git Repository**
4. Choose your GitHub repository
5. Click **Import**

### Step 3: Configure Project Settings

**YOU WILL DO THIS:**

1. **Framework Preset**: Should auto-detect as "Next.js"
2. **Root Directory**: Leave as `./`
3. **Build Command**: Will use default `npm run build`
4. **Install Command**: Change to `npm install --legacy-peer-deps`

### Step 4: Add Environment Variables

**YOU WILL DO THIS:**

1. In the **Environment Variables** section:
2. Add each variable from the list above
3. Set the environment to **Production**
4. Click **Add** for each variable

Here's the list to add:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APP_NAME`

### Step 5: Deploy

**YOU WILL DO THIS:**

1. Click **Deploy**
2. Wait for the build to complete (5-10 minutes)
3. Vercel will provide a URL like `https://bitbuy-xxx.vercel.app`

---

## Post-Deployment Steps

### Step 1: Run Database Migrations

**YOU WILL DO THIS:**

After successful deployment, you need to run migrations on production database:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Run migrations on production
vercel env pull .env.production
DATABASE_URL="your-production-db-url" npx prisma migrate deploy
```

Or use Vercel's terminal:

1. Go to your project in Vercel Dashboard
2. Click on **Deployments**
3. Click on the latest deployment
4. Open **Functions** tab
5. Find any function and click **View Logs**
6. Use the terminal to run: `npx prisma migrate deploy`

### Step 2: Seed Production Database

**YOU WILL DO THIS:**

Seed the database with initial categories and sample products:

```bash
# Using Vercel CLI with production environment
DATABASE_URL="your-production-db-url" npm run db:seed
```

Or manually:

1. Access your production database using a PostgreSQL client
2. Run the seed script locally pointing to production DB
3. Verify data was created

### Step 3: Create Admin User

**YOU WILL DO THIS:**

1. Go to your deployed site
2. Navigate to `/register`
3. Create an account with your admin email
4. Manually update the database to set `role = 'ADMIN'`:

```sql
UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'your-admin-email@example.com';
```

### Step 4: Configure Custom Domain (Optional)

**YOU WILL DO THIS:**

1. In Vercel Dashboard, go to your project
2. Click **Settings** > **Domains**
3. Click **Add Domain**
4. Enter your custom domain (e.g., `bitbuy.com`)
5. Follow DNS configuration instructions
6. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` with your custom domain

### Step 5: Update Cloudinary Settings

**YOU WILL DO THIS:**

1. Log in to Cloudinary
2. Go to **Settings** > **Upload**
3. Enable **Unsigned uploading** (optional)
4. Set upload presets for product images
5. Configure folder structure

### Step 6: Configure Resend Email Domain

**YOU WILL DO THIS:**

1. Log in to Resend
2. Go to **Domains**
3. Click **Add Domain**
4. Enter your domain
5. Add DNS records as instructed
6. Verify domain
7. Update `RESEND_FROM_EMAIL` to use your verified domain

### Step 7: Test Production Deployment

**YOU WILL DO THIS:**

Test the following workflows:

- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Products display with images
- [ ] Search functionality works
- [ ] Add to cart works
- [ ] Checkout process (without payment)
- [ ] Email notifications arrive
- [ ] Admin dashboard access

---

## Monitoring & Analytics

### Option 1: Vercel Analytics (Recommended)

**YOU WILL DO THIS:**

1. In Vercel Dashboard, go to your project
2. Navigate to **Analytics** tab
3. Click **Enable Analytics**
4. Free tier includes:
   - Page views
   - Top pages
   - Top referrers
   - Devices and browsers

### Option 2: Google Analytics

**YOU WILL DO THIS:**

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Add to your app:

Create `src/lib/analytics.ts`:

```typescript
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}
```

Add to `src/app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script>
```

### Option 3: Error Tracking with Sentry

**YOU WILL DO THIS:**

1. Go to [Sentry.io](https://sentry.io)
2. Create a new project (Next.js)
3. Follow integration instructions
4. Install Sentry:

```bash
npx @sentry/wizard@latest -i nextjs
```

5. Configure DSN in environment variables
6. Deploy updated code

---

## Production Checklist

Before going live, verify:

### Security
- [ ] All environment variables are set in Vercel
- [ ] `.env` files are NOT committed to Git
- [ ] Database uses strong password
- [ ] HTTPS is enabled (Vercel does this automatically)
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled (if applicable)

### Performance
- [ ] Images are optimized
- [ ] Database has proper indexes
- [ ] Caching is enabled
- [ ] Bundle size is optimized

### Functionality
- [ ] All critical user flows work
- [ ] Payment gateway tested (if implemented)
- [ ] Emails are being sent and received
- [ ] Database backups are configured
- [ ] Error handling works correctly

### SEO
- [ ] Meta tags are set
- [ ] Sitemap is generated
- [ ] robots.txt is configured
- [ ] Open Graph images are set

---

## Troubleshooting

### Build Fails on Vercel

**Problem**: Build fails with module not found errors

**Solution**:
1. Check `package.json` has all dependencies
2. Verify `npm install --legacy-peer-deps` is used
3. Check build logs for specific errors
4. Ensure `prisma generate` runs before build

### Database Connection Issues

**Problem**: Can't connect to database

**Solution**:
1. Verify `DATABASE_URL` is correctly formatted
2. Check database allows connections from Vercel's IP ranges
3. Ensure SSL mode is enabled: `?sslmode=require`
4. Test connection using a database client

### Images Not Loading

**Problem**: Product images don't display

**Solution**:
1. Check Cloudinary environment variables are set
2. Verify `next.config.ts` has Cloudinary in `remotePatterns`
3. Check browser console for CORS errors
4. Ensure images exist in Cloudinary

### Emails Not Sending

**Problem**: Email notifications don't arrive

**Solution**:
1. Verify Resend API key is correct
2. Check sender email domain is verified in Resend
3. Check spam folder
4. Review Resend logs for errors
5. Ensure `RESEND_FROM_EMAIL` matches verified domain

### Authentication Issues

**Problem**: Can't log in or session expires immediately

**Solution**:
1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your deployment URL
3. Clear cookies and try again
4. Check browser console for errors

### 500 Internal Server Error

**Problem**: Pages show 500 errors

**Solution**:
1. Check Vercel function logs
2. Verify all environment variables are set
3. Check database is accessible
4. Review error in Sentry (if configured)

---

## Rollback Procedure

If deployment has critical issues:

**YOU WILL DO THIS:**

1. Go to Vercel Dashboard
2. Navigate to **Deployments**
3. Find the last working deployment
4. Click the three dots menu
5. Select **Promote to Production**
6. Confirm the rollback

---

## Continuous Deployment

Once set up, Vercel automatically deploys on every push to main:

1. Make code changes locally
2. Commit changes: `git commit -m "your message"`
3. Push to GitHub: `git push origin main`
4. Vercel automatically detects and deploys
5. Monitor deployment in Vercel Dashboard

---

## Cost Breakdown (Estimated)

### Free Tier (Development/Small Scale)
- **Vercel**: Free (Hobby plan)
- **Database** (Vercel Postgres): Free tier available
- **Cloudinary**: Free (25GB storage, 25GB bandwidth/month)
- **Resend**: Free (3,000 emails/month)
- **Total**: $0/month

### Paid Tier (Production/Growing Business)
- **Vercel Pro**: $20/month
- **Database** (Vercel Postgres): ~$20-50/month depending on usage
- **Cloudinary**: $99/month (Plus plan)
- **Resend**: $20/month (10,000 emails/month)
- **Custom Domain**: $10-15/year
- **Total**: ~$160/month + domain

---

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Prisma Deployment**: https://www.prisma.io/docs/guides/deployment
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Resend Docs**: https://resend.com/docs

---

## Deployment Timeline

**Total Time**: Approximately 2-3 hours

1. **Service Setup** (60 mins): Create accounts, get API keys
2. **Vercel Configuration** (30 mins): Import project, set environment variables
3. **Database Setup** (20 mins): Create database, run migrations
4. **Post-Deployment** (30 mins): Seed data, test workflows
5. **Monitoring Setup** (20 mins): Configure analytics and error tracking

---

**Next Steps**: After successful deployment, monitor your application and start onboarding real users!

*Last updated: 2025-10-26*
