# OAuth Setup Guide - Google & Facebook

This guide explains how to set up Google and Facebook OAuth authentication for BitBuy.

## Prerequisites

- A Google Cloud account
- A Facebook Developer account
- Access to your `.env` file

---

## Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "BitBuy" and click "Create"

### Step 2: Configure OAuth Consent Screen

1. In the left sidebar, go to **APIs & Services** → **OAuth consent screen**
2. Select **External** and click "Create"
3. Fill in the required fields:
   - **App name**: BitBuy
   - **User support email**: Your email
   - **Developer contact**: Your email
4. Click "Save and Continue"
5. Skip scopes (click "Save and Continue")
6. Add test users if needed
7. Click "Save and Continue" then "Back to Dashboard"

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click "**+ CREATE CREDENTIALS**" → "OAuth client ID"
3. Select **Web application**
4. Configure:
   - **Name**: BitBuy Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)
5. Click "Create"
6. **Copy the Client ID and Client Secret**

### Step 4: Add to Environment Variables

Add to your `.env` file:

```bash
GOOGLE_CLIENT_ID="your-client-id-here"
GOOGLE_CLIENT_SECRET="your-client-secret-here"
```

---

## Facebook OAuth Setup

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Select "**Consumer**" and click "Next"
4. Fill in:
   - **App name**: BitBuy
   - **App contact email**: Your email
5. Click "Create App"

### Step 2: Add Facebook Login Product

1. In your app dashboard, click "Add Product"
2. Find "**Facebook Login**" and click "Set Up"
3. Select "**Web**" as the platform
4. Enter your site URL: `http://localhost:3000` (you can change this later)
5. Click "Save" and "Continue"

### Step 3: Configure Facebook Login Settings

1. In the left sidebar, go to **Facebook Login** → **Settings**
2. Add **Valid OAuth Redirect URIs**:
   - `http://localhost:3000/api/auth/callback/facebook` (development)
   - `https://yourdomain.com/api/auth/callback/facebook` (production)
3. Click "Save Changes"

### Step 4: Get App ID and Secret

1. Go to **Settings** → **Basic** in the left sidebar
2. You'll see:
   - **App ID** (this is your Client ID)
   - **App Secret** (click "Show" to reveal it)
3. **Copy both values**

### Step 5: Add to Environment Variables

Add to your `.env` file:

```bash
FACEBOOK_CLIENT_ID="your-app-id-here"
FACEBOOK_CLIENT_SECRET="your-app-secret-here"
```

---

## Testing OAuth Login

### Development (localhost:3000)

1. Restart your Next.js server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Click "Sign in with Google" or "Sign in with Facebook"

4. You should be redirected to the provider's login page

5. After authentication, you'll be redirected back to your app

### Troubleshooting

**Common Issues:**

1. **"Redirect URI mismatch"**
   - Make sure the redirect URI in your provider settings exactly matches
   - Format: `http://localhost:3000/api/auth/callback/[provider]`

2. **"App not configured correctly"**
   - Check that environment variables are set correctly
   - Restart your dev server after adding env variables

3. **Facebook: "This app is not available"**
   - Go to **App Review** → **Permissions and Features**
   - Make sure your app is in "Development" mode or published

4. **Google: "Access blocked"**
   - Add your Google account as a test user
   - Or publish the OAuth consent screen

---

## Production Deployment

### For Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all four OAuth variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `FACEBOOK_CLIENT_ID`
   - `FACEBOOK_CLIENT_SECRET`

4. Update your OAuth provider settings with production URLs:
   - `https://yourdomain.com/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/facebook`

### Important Notes:

- **Never commit** your `.env` file to Git
- Use different OAuth apps for development and production
- Enable 2FA on your Google and Facebook accounts
- Regularly rotate your secrets

---

## Optional: Add More Providers

NextAuth supports many providers. To add more:

1. Install the provider package (if needed)
2. Import the provider in `src/lib/auth.ts`
3. Add the provider configuration
4. Set environment variables
5. Add the button to login/register pages

Supported providers include:
- GitHub
- Twitter
- Discord
- LinkedIn
- Apple
- And many more!

See: https://next-auth.js.org/providers/

---

## Security Best Practices

1. **Use HTTPS in production**
2. **Set secure NEXTAUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```
3. **Limit OAuth scopes** to only what you need
4. **Monitor OAuth usage** in provider dashboards
5. **Enable MFA** for admin accounts
6. **Review third-party access** regularly

---

## Support

- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- Facebook Login: https://developers.facebook.com/docs/facebook-login
- NextAuth.js: https://next-auth.js.org/getting-started/introduction

---

**Last Updated**: 2025-10-26
