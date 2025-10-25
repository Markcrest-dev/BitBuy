# Docker Setup Guide for PostgreSQL

## Step 1: Install Docker

### On Ubuntu/Debian Linux

```bash
# Update package index
sudo apt update

# Install prerequisites
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add your user to docker group (to run docker without sudo)
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Log out and log back in for group changes to take effect
# Or run: newgrp docker
```

### Verify Docker Installation

```bash
docker --version
docker compose version
```

---

## Step 2: Start PostgreSQL with Docker Compose

### Using Docker Compose (Recommended)

We've already created a `docker-compose.yml` file in your project root.

```bash
# Start PostgreSQL container
docker compose up -d

# Check if container is running
docker compose ps

# View logs
docker compose logs postgres

# Check database is ready
docker compose exec postgres pg_isready -U ecommerce_user -d ecommerce_db
```

### OR Using Docker Command (Alternative)

```bash
docker run --name ecommerce-postgres \
  -e POSTGRES_DB=ecommerce_db \
  -e POSTGRES_USER=ecommerce_user \
  -e POSTGRES_PASSWORD=ecommerce_pass_2025 \
  -p 5432:5432 \
  -v ecommerce_postgres_data:/var/lib/postgresql/data \
  -d postgres:16-alpine
```

---

## Step 3: Update Environment Variables

The `.env` file has already been updated with the correct connection string:

```env
DATABASE_URL="postgresql://ecommerce_user:ecommerce_pass_2025@localhost:5432/ecommerce_db?schema=public"
```

If you need to change the password or database name, update both `docker-compose.yml` and `.env`.

---

## Step 4: Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (creates all tables)
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

---

## Step 5: Verify Setup

```bash
# Open Prisma Studio (database GUI)
npm run db:studio
```

This will open http://localhost:5555 where you can:
- ✅ See all tables
- ✅ View seeded data
- ✅ Edit records
- ✅ Browse relationships

---

## Docker Commands Reference

### Container Management

```bash
# Start the database
docker compose up -d

# Stop the database (keeps data)
docker compose stop

# Start stopped container
docker compose start

# Stop and remove container (keeps data in volume)
docker compose down

# Stop and remove container AND data (WARNING: deletes everything)
docker compose down -v

# Restart container
docker compose restart

# View container logs
docker compose logs -f postgres

# Check container status
docker compose ps
```

### Database Access

```bash
# Connect to PostgreSQL shell
docker compose exec postgres psql -U ecommerce_user -d ecommerce_db

# Run SQL commands
docker compose exec postgres psql -U ecommerce_user -d ecommerce_db -c "SELECT * FROM \"User\";"

# Backup database
docker compose exec postgres pg_dump -U ecommerce_user ecommerce_db > backup.sql

# Restore database
cat backup.sql | docker compose exec -T postgres psql -U ecommerce_user -d ecommerce_db
```

### Cleanup

```bash
# Remove container only (data persists)
docker compose down

# Remove container and volumes (deletes all data)
docker compose down -v

# Remove all unused Docker resources
docker system prune -a
```

---

## Troubleshooting

### Port 5432 already in use

```bash
# Check what's using port 5432
sudo lsof -i :5432

# If local PostgreSQL is running, stop it
sudo systemctl stop postgresql

# Or change port in docker-compose.yml to 5433:5432
```

### Permission denied when running docker

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in, or run:
newgrp docker

# Restart Docker service
sudo systemctl restart docker
```

### Container fails to start

```bash
# Check logs
docker compose logs postgres

# Remove and recreate
docker compose down
docker compose up -d

# Check Docker daemon is running
sudo systemctl status docker
```

### Can't connect to database

```bash
# Test connection
docker compose exec postgres pg_isready -U ecommerce_user -d ecommerce_db

# Check if port is accessible
nc -zv localhost 5432

# Verify environment variables
cat .env | grep DATABASE_URL
```

---

## Daily Workflow

### Starting your dev environment:

```bash
# 1. Start database
docker compose up -d

# 2. Start Next.js dev server (in another terminal)
npm run dev

# 3. (Optional) Open database GUI
npm run db:studio
```

### Ending your work session:

```bash
# Stop database (keeps data)
docker compose stop

# Or leave it running in the background
```

### Reset database (start fresh):

```bash
# Reset migrations and reseed
npm run db:reset

# Or manually:
docker compose down -v
docker compose up -d
npm run db:migrate
npm run db:seed
```

---

## Advantages of Docker Setup

✅ **Isolated** - Doesn't affect your system
✅ **Clean** - Easy to remove completely
✅ **Consistent** - Same setup on any machine
✅ **Fast** - Start/stop in seconds
✅ **Safe** - Easy to reset without affecting other projects
✅ **Portable** - Works the same on any OS

---

## Quick Installation Script

Run this to install Docker (Ubuntu/Debian):

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

Then log out and back in!

---

Once Docker is installed, come back and run:
```bash
docker compose up -d
npm run db:migrate
npm run db:seed
```

Ready to go! 🚀
