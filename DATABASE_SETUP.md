# Database Setup Guide - Phase 2

## Option 1: Install PostgreSQL Locally (Recommended for Development)

### Install PostgreSQL on Linux (Ubuntu/Debian)
```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Check PostgreSQL status
sudo systemctl status postgresql
```

### Create Database and User
```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt, run:
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
ALTER DATABASE ecommerce_db OWNER TO ecommerce_user;
\q
```

### Update .env File
```env
DATABASE_URL="postgresql://ecommerce_user:your_secure_password@localhost:5432/ecommerce_db?schema=public"
```

---

## Option 2: Use Docker (Quick Setup)

### Install Docker (if not installed)
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

### Run PostgreSQL Container
```bash
# Run PostgreSQL in Docker
docker run --name ecommerce-postgres \
  -e POSTGRES_DB=ecommerce_db \
  -e POSTGRES_USER=ecommerce_user \
  -e POSTGRES_PASSWORD=your_secure_password \
  -p 5432:5432 \
  -d postgres:16

# Check if container is running
docker ps
```

### Update .env File
```env
DATABASE_URL="postgresql://ecommerce_user:your_secure_password@localhost:5432/ecommerce_db?schema=public"
```

### Docker Commands
```bash
# Stop the container
docker stop ecommerce-postgres

# Start the container
docker start ecommerce-postgres

# Remove the container
docker rm ecommerce-postgres
```

---

## Option 3: Use Cloud Database (Neon, Supabase, Railway)

### Neon (Free Tier Available)
1. Go to https://neon.tech
2. Sign up for a free account
3. Create a new project
4. Copy the connection string
5. Update `.env` with the connection string

### Supabase (Free Tier Available)
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string (Direct connection)
5. Update `.env` with the connection string

### Railway (Free Tier Available)
1. Go to https://railway.app
2. Create a new project
3. Add PostgreSQL service
4. Copy the connection string
5. Update `.env` with the connection string

---

## After Setting Up Database

### Run Prisma Migrations
```bash
# Generate Prisma Client
npx prisma generate

# Create and run migration
npx prisma migrate dev --name init

# Check migration status
npx prisma migrate status
```

### Open Prisma Studio (Database GUI)
```bash
npx prisma studio
```
This will open a browser interface at http://localhost:5555 where you can view and edit your database.

---

## Troubleshooting

### Connection Issues
```bash
# Test PostgreSQL connection
psql -U ecommerce_user -d ecommerce_db -h localhost

# Check if PostgreSQL is running
sudo systemctl status postgresql

# View PostgreSQL logs
sudo journalctl -u postgresql -n 50
```

### Reset Database
```bash
# Reset database (WARNING: This deletes all data)
npx prisma migrate reset

# Or manually drop and recreate
sudo -u postgres psql
DROP DATABASE ecommerce_db;
CREATE DATABASE ecommerce_db;
\q
```

---

## Next Steps After Database Setup

1. Run migrations: `npx prisma migrate dev --name init`
2. Generate Prisma Client: `npx prisma generate`
3. Create seed script with sample data
4. Run seed script: `npm run seed`
5. Verify data in Prisma Studio

---

## Recommended for This Project

For **development**: Use **Docker** (Option 2) - Quick and clean setup
For **production**: Use **Neon or Supabase** (Option 3) - Free tier available, no maintenance

Choose the option that works best for your setup and let me know once you've configured the database!
