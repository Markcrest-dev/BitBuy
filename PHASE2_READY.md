# Phase 2: Database Schema Design - READY ✅

## What Has Been Completed

### 1. ✅ Database Schema Created
Complete Prisma schema with 11 models:
- **User** - User accounts with roles (USER/ADMIN)
- **Account, Session, VerificationToken** - NextAuth authentication
- **Address** - User shipping addresses
- **Category** - Product categories (Electronics, Clothing, etc.)
- **Product** - Product catalog with pricing, inventory, images
- **Cart & CartItem** - Shopping cart functionality
- **Order & OrderItem** - Order management with status tracking
- **Review** - Product reviews and ratings (1-5 stars)
- **Wishlist** - Save products for later

### 2. ✅ Database Seed Script Created
Location: `prisma/seed.ts`

**Seed Data Includes:**
- 2 test users (admin and regular user)
  - Admin: `admin@shophub.com` / `admin123`
  - User: `user@example.com` / `password123`
- 6 categories (Electronics, Clothing, Shoes, Home, Beauty, Sports)
- 14 sample products across all categories
- Test address for user
- Empty cart for user

### 3. ✅ NPM Scripts Added
```bash
# Database commands
npm run db:migrate    # Run database migrations
npm run db:push       # Push schema changes without migration
npm run db:seed       # Seed database with sample data
npm run db:studio     # Open Prisma Studio GUI
npm run db:reset      # Reset database (WARNING: deletes all data)
```

### 4. ✅ Database Setup Guides Created
- **DATABASE_SETUP.md** - Full guide for PostgreSQL, Docker, or Cloud
- **QUICK_START_SQLITE.md** - Quick SQLite setup for local testing

---

## Choose Your Database Option

### Option 1: PostgreSQL (Recommended for Production-like Development)

**Install PostgreSQL:**
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql
```

**Create Database:**
```sql
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
\q
```

**Update .env:**
```env
DATABASE_URL="postgresql://ecommerce_user:your_password@localhost:5432/ecommerce_db?schema=public"
```

**Run Migration:**
```bash
npm run db:migrate
npm run db:seed
```

---

### Option 2: Docker PostgreSQL (Quick & Clean)

```bash
# Run PostgreSQL container
docker run --name ecommerce-postgres \
  -e POSTGRES_DB=ecommerce_db \
  -e POSTGRES_USER=ecommerce_user \
  -e POSTGRES_PASSWORD=yourpassword \
  -p 5432:5432 \
  -d postgres:16

# Update .env
DATABASE_URL="postgresql://ecommerce_user:yourpassword@localhost:5432/ecommerce_db?schema=public"

# Run migration and seed
npm run db:migrate
npm run db:seed
```

---

### Option 3: Cloud Database (Free Tier, No Installation)

**Neon (Recommended - Fast & Free):**
1. Go to https://neon.tech
2. Create project
3. Copy connection string
4. Update `.env` with connection string
5. Run: `npm run db:migrate && npm run db:seed`

**Supabase:**
1. Go to https://supabase.com
2. Create project
3. Settings > Database > Direct connection
4. Copy connection string
5. Update `.env` and run migrations

**Railway:**
1. Go to https://railway.app
2. New project > Add PostgreSQL
3. Copy connection string
4. Update `.env` and run migrations

---

### Option 4: SQLite (Instant Setup, Development Only)

**Modify** `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

**Update .env:**
```env
DATABASE_URL="file:./dev.db"
```

**Run:**
```bash
npm run db:migrate
npm run db:seed
```

**Note:** See `QUICK_START_SQLITE.md` for SQLite-specific schema changes needed.

---

## After Database Setup

### 1. Run Migrations
```bash
npm run db:migrate
```
This creates all tables in your database.

### 2. Seed Sample Data
```bash
npm run db:seed
```
This populates your database with:
- Test users
- 6 categories
- 14 products
- Sample addresses

### 3. View Data (Prisma Studio)
```bash
npm run db:studio
```
Opens http://localhost:5555 - a GUI to view and edit database data.

### 4. Verify Setup
Check that you can:
- ✅ See all tables in Prisma Studio
- ✅ See seeded data (users, categories, products)
- ✅ Browse products by category
- ✅ Check user accounts

---

## Test User Credentials

After seeding, you can use these credentials:

**Admin Account:**
- Email: `admin@shophub.com`
- Password: `admin123`
- Role: ADMIN

**Regular User:**
- Email: `user@example.com`
- Password: `password123`
- Role: USER

---

## Database Schema Highlights

### Key Features:
- ✅ **Authentication**: NextAuth integration ready
- ✅ **Roles**: USER and ADMIN roles
- ✅ **Relationships**: Proper foreign keys and cascading deletes
- ✅ **Enums**: Role (USER, ADMIN) and OrderStatus (PENDING, PROCESSING, etc.)
- ✅ **Indexes**: Unique constraints on emails, slugs, SKUs
- ✅ **Timestamps**: createdAt and updatedAt on all models
- ✅ **Soft Deletes**: Products can be marked inactive
- ✅ **Featured Products**: Flag for homepage display
- ✅ **Product Images**: Array of image URLs
- ✅ **Inventory Tracking**: Stock levels per product
- ✅ **Cart Management**: Per-user shopping carts
- ✅ **Order History**: Complete order tracking with status
- ✅ **Reviews**: Product reviews with ratings
- ✅ **Wishlist**: Save products for later

---

## Common Commands

```bash
# View database schema
npx prisma db pull

# Generate Prisma Client (after schema changes)
npx prisma generate

# Create a new migration
npx prisma migrate dev --name description_of_changes

# Reset database (DANGER: deletes all data)
npm run db:reset

# Open database GUI
npm run db:studio

# Check migration status
npx prisma migrate status

# Format schema file
npx prisma format
```

---

## Troubleshooting

### Can't connect to database
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection string
echo $DATABASE_URL
```

### Migration fails
```bash
# Reset and try again
npm run db:reset

# Or manually:
npx prisma migrate reset --force
```

### Prisma Client errors
```bash
# Regenerate client
npx prisma generate
```

---

## Next Steps (Phase 3)

Once your database is set up and seeded:

1. ✅ **Authentication System**
   - Set up NextAuth.js
   - Create login/register pages
   - Implement protected routes

2. ✅ **Product Listing Page**
   - Fetch products from database
   - Display in grid layout
   - Add filtering and sorting

3. ✅ **Product Detail Page**
   - Show individual product
   - Display reviews
   - Add to cart functionality

4. ✅ **API Routes**
   - Product APIs
   - Cart APIs
   - User APIs

---

## Database is Ready! 🎉

Choose one of the database options above, run the migration and seed, then you'll be ready to move to Phase 3: Frontend Development.

**Recommended for Quick Start:** Use **Neon** (cloud, free) or **Docker** (local, clean)

Let me know which option you'd like to proceed with!
