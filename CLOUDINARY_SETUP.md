# Cloudinary Setup for BitBuy

This guide will help you set up Cloudinary for image uploads in the BitBuy e-commerce platform.

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your Credentials

After logging in to your Cloudinary dashboard:

1. Go to **Dashboard** (default page after login)
2. You'll see your credentials in the **Account Details** section:
   - **Cloud Name**: Your unique cloud name
   - **API Key**: Your API key
   - **API Secret**: Click "Reveal" to see your API secret

## Step 3: Configure Environment Variables

1. Open your `.env` file in the root directory
2. Uncomment and fill in the Cloudinary variables:

```env
# File Upload (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace:
- `your_cloud_name_here` with your Cloud Name
- `your_api_key_here` with your API Key
- `your_api_secret_here` with your API Secret

## Step 4: Folder Structure (Optional)

By default, images will be uploaded to `bitbuy/products` folder in your Cloudinary account. This helps organize your images.

You can customize the folder path in `src/lib/cloudinary.ts` if needed.

## Step 5: Test the Upload

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Log in as an admin user (admin@bitbuy.com / admin123)
3. Go to the admin product management page
4. Try uploading an image using the ImageUpload component

## Features

- **Automatic optimization**: Images are automatically optimized for web
- **Responsive delivery**: Images are served in the best format for each browser
- **Transformations**: Images are resized to max 1000x1000px
- **Security**: Only admin users can upload images
- **File validation**: Only JPEG, PNG, and WebP formats, max 5MB

## Troubleshooting

### "Unauthorized" error
- Check that your API credentials are correct
- Make sure you're logged in as an admin user

### Upload fails
- Check file size (must be under 5MB)
- Verify file format (JPEG, PNG, or WebP only)
- Check your Cloudinary dashboard for any restrictions

### Images not displaying
- Verify the URL is correct
- Check browser console for CORS errors
- Ensure your cloud name is set in `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

## Free Tier Limits

Cloudinary free tier includes:
- 25 credits/month (covers ~25,000 transformations)
- 25GB storage
- 25GB bandwidth

This should be more than enough for development and small production deployments.
