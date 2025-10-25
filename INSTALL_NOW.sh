#!/bin/bash

# Docker Installation and Database Setup Script
# Run this with: bash INSTALL_NOW.sh

set -e

echo "🚀 Starting Docker Installation and Database Setup..."
echo ""

# Install Docker
echo "📦 Step 1/6: Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
rm get-docker.sh

# Add user to docker group
echo "👤 Step 2/6: Adding user to docker group..."
sudo usermod -aG docker $USER

# Start Docker service
echo "🐳 Step 3/6: Starting Docker service..."
sudo systemctl start docker
sudo systemctl enable docker

echo ""
echo "⚠️  IMPORTANT: Applying group changes..."
echo ""

# Apply group changes in current shell
newgrp docker <<EONG

echo "✅ Docker installed successfully!"
echo ""

# Start PostgreSQL
echo "🗄️  Step 4/6: Starting PostgreSQL container..."
cd /home/mark/Desktop/Bitbuy/ecommerce-platform
docker compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Generate Prisma Client
echo "📝 Step 5/6: Generating Prisma Client and running migrations..."
npx prisma generate
npx prisma migrate dev --name init

# Seed database
echo "🌱 Step 6/6: Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ ✅ ✅  DATABASE SETUP COMPLETE! ✅ ✅ ✅"
echo ""
echo "📊 Your database is ready with:"
echo "   - 2 test users (admin + regular user)"
echo "   - 6 categories"
echo "   - 14 sample products"
echo ""
echo "🔐 Test Credentials:"
echo "   Admin: admin@shophub.com / admin123"
echo "   User:  user@example.com / password123"
echo ""
echo "🎯 Next steps:"
echo "   1. Open Prisma Studio: npm run db:studio"
echo "   2. View your app: http://localhost:3000"
echo "   3. Database GUI: http://localhost:5555"
echo ""
echo "💡 Useful commands:"
echo "   docker compose ps      - Check database status"
echo "   docker compose logs    - View database logs"
echo "   npm run db:studio      - Open database GUI"
echo ""

EONG

echo ""
echo "🎉 All done! Your database is running and seeded!"
echo ""
