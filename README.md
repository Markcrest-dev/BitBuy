# BitBuy - Modern E-Commerce Platform

A full-stack e-commerce platform built with Next.js 16, featuring a modern UI, robust backend, and production-ready deployment configuration.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.18-2D3748)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC)

## Features

✨ **Modern Tech Stack**
- Next.js 16 with App Router and Turbopack
- TypeScript for type safety
- Tailwind CSS v4 for styling
- Prisma ORM with PostgreSQL

🛍️ **E-Commerce Features**
- Product browsing and search
- Shopping cart management
- User authentication (NextAuth.js v5)
- Admin dashboard
- Order management
- Wishlist functionality

🎨 **UI/UX**
- Responsive design (mobile-first)
- Product image galleries
- Advanced search with autocomplete
- Loading skeletons
- Smooth animations

🔒 **Security**
- Secure authentication
- Password hashing (bcrypt)
- Protected API routes
- Environment variable management

📧 **Communications**
- Email notifications (Resend)
- Welcome emails
- Order confirmations
- Shipping notifications

☁️ **Cloud Services**
- Image storage (Cloudinary)
- Email delivery (Resend)
- Database (PostgreSQL)

🧪 **Testing**
- Unit tests (Jest)
- Component tests (React Testing Library)
- E2E tests (Playwright)
- 70% code coverage target

## Quick Start

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd ecommerce-platform
```

2. **Install dependencies**

```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for local)
- `CLOUDINARY_*`: Cloudinary credentials
- `RESEND_API_KEY`: Resend API key

4. **Set up the database**

```bash
# Run migrations
npx prisma migrate dev

# Seed the database with sample data
npm run db:seed
```

5. **Start the development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## Available Scripts

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database

```bash
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio (database GUI)
npm run db:reset     # Reset database (WARNING: deletes all data)
```

### Testing

```bash
npm test                  # Run unit/component tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
npm run test:e2e          # Run E2E tests
npm run test:e2e:ui       # Run E2E tests with UI
npm run test:e2e:debug    # Debug E2E tests
```

## Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide for production
- **[TESTING.md](./TESTING.md)** - Comprehensive testing documentation
- **Phase Documentation** - Detailed docs for each development phase

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v5
- **File Storage**: Cloudinary
- **Email**: Resend + React Email
- **Testing**: Jest, React Testing Library, Playwright
- **Deployment**: Vercel

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed deployment instructions.

Quick deploy to Vercel:

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy!

## License

This project is private and proprietary.

---

Made with ❤️ by your development team
