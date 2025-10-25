# Next Steps: Database Setup with Docker

## Current Status ✅

- ✅ Next.js project set up with TypeScript and Tailwind
- ✅ All dependencies installed
- ✅ Prisma schema created with 11 models
- ✅ Database seed script ready
- ✅ Docker Compose configuration created
- ✅ `.env` file configured for Docker PostgreSQL

## What You Need To Do Now

### Step 1: Install Docker

Run the installation script:

```bash
./install-docker.sh
```

**OR** Install manually:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**IMPORTANT:** After Docker installs, you MUST log out and log back in (or run `newgrp docker`) for the group permissions to take effect.

---

### Step 2: Verify Docker Installation

```bash
docker --version
docker compose version
```

You should see version numbers for both.

---

### Step 3: Start PostgreSQL Container

```bash
# Start the database (runs in background)
docker compose up -d

# Check if it's running
docker compose ps

# View logs (optional)
docker compose logs postgres
```

Expected output:
```
✔ Container ecommerce-postgres  Started
```

---

### Step 4: Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (creates all tables)
npm run db:migrate
```

When prompted for migration name, enter: `init`

---

### Step 5: Seed the Database

```bash
npm run db:seed
```

This will create:
- 2 test users (admin + regular user)
- 6 categories (Electronics, Clothing, Shoes, Home, Beauty, Sports)
- 14 sample products
- Test addresses and carts

---

### Step 6: Verify Everything Works

```bash
# Open Prisma Studio (database GUI)
npm run db:studio
```

This opens http://localhost:5555

**Check that you can see:**
- ✅ All tables (User, Product, Category, etc.)
- ✅ 2 users in User table
- ✅ 6 categories in Category table
- ✅ 14 products in Product table

---

### Step 7: Test Login Credentials

After seeding, you can use these test accounts:

**Admin Account:**
- Email: `admin@shophub.com`
- Password: `admin123`
- Role: ADMIN

**Regular User:**
- Email: `user@example.com`
- Password: `password123`
- Role: USER

---

## Daily Development Workflow

### Starting your day:

```bash
# Terminal 1: Start database
docker compose up -d

# Terminal 2: Start Next.js
npm run dev

# Terminal 3 (optional): Open database GUI
npm run db:studio
```

### Your app will be running at:
- **Frontend**: http://localhost:3000
- **Database GUI**: http://localhost:5555

### Ending your day:

```bash
# Stop database (keeps data)
docker compose stop

# Or leave it running - it uses minimal resources
```

---

## Useful Commands

### Docker & Database

```bash
# Start database
docker compose up -d

# Stop database
docker compose stop

# Restart database
docker compose restart

# View logs
docker compose logs -f postgres

# Stop and remove (keeps data)
docker compose down

# Stop and remove with data (WARNING: deletes everything)
docker compose down -v
```

### Prisma

```bash
# Open database GUI
npm run db:studio

# Create new migration
npm run db:migrate

# Push schema changes without migration
npm run db:push

# Reset database (deletes all data)
npm run db:reset

# Seed database
npm run db:seed

# Format schema file
npx prisma format
```

---

## Troubleshooting

### "Docker command not found"
- Make sure you logged out and back in after installation
- Or run: `newgrp docker`
- Check: `docker --version`

### "Permission denied" when running docker
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Port 5432 already in use
```bash
# Check what's using the port
sudo lsof -i :5432

# If local PostgreSQL is running
sudo systemctl stop postgresql
```

### Can't connect to database
```bash
# Check container is running
docker compose ps

# Check logs
docker compose logs postgres

# Test connection
docker compose exec postgres pg_isready -U ecommerce_user -d ecommerce_db
```

### Reset everything and start fresh
```bash
# Stop and remove everything
docker compose down -v

# Start again
docker compose up -d

# Run migrations
npm run db:migrate

# Seed data
npm run db:seed
```

---

## What's Next? (Phase 3)

Once your database is set up and seeded, we'll move to **Phase 3: Frontend Development**:

1. **Authentication Pages**
   - Login page
   - Register page
   - Protected routes

2. **Product Pages**
   - Product listing with filters
   - Product detail page
   - Product search

3. **Shopping Cart**
   - Add to cart functionality
   - Cart page
   - Cart persistence

4. **API Routes**
   - Product APIs
   - Cart APIs
   - User APIs

---

## Quick Reference

### Database Connection
```
Host: localhost
Port: 5432
Database: ecommerce_db
Username: ecommerce_user
Password: ecommerce_pass_2025
```

### Connection String
```
postgresql://ecommerce_user:ecommerce_pass_2025@localhost:5432/ecommerce_db?schema=public
```

---

## Need Help?

- **Docker Issues**: See `DOCKER_SETUP.md`
- **Database Setup**: See `DATABASE_SETUP.md`
- **SQLite Alternative**: See `QUICK_START_SQLITE.md`
- **Phase 2 Overview**: See `PHASE2_READY.md`

---

Ready to install Docker? Run:
```bash
./install-docker.sh
```

Then follow steps 2-6 above! 🚀
