import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// IMPORTANT: This endpoint should be removed or protected after seeding
// Add a secret key check for basic security
const SEED_SECRET = process.env.SEED_SECRET || 'change-this-secret'

export async function POST(request: Request) {
  try {
    // Basic security check
    const { secret } = await request.json()

    if (secret !== SEED_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🌱 Starting database seed...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@bitbuy.com' },
      update: {},
      create: {
        email: 'admin@bitbuy.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
      },
    })
    console.log('✅ Created admin user:', admin.email)

    // Create test user
    const testPassword = await bcrypt.hash('password123', 10)
    const testUser = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        password: testPassword,
        name: 'Test User',
        phone: '+1234567890',
        role: 'USER',
      },
    })
    console.log('✅ Created test user:', testUser.email)

    // Create categories
    const categories = [
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Laptops, phones, tablets, and electronic accessories',
        image: '/images/categories/electronics.jpg',
      },
      {
        name: 'Clothing',
        slug: 'clothing',
        description: "Men's and women's fashion clothing",
        image: '/images/categories/clothing.jpg',
      },
      {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Furniture, decor, and garden supplies',
        image: '/images/categories/home-garden.jpg',
      },
    ]

    const createdCategories = []
    for (const cat of categories) {
      const category = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      })
      createdCategories.push(category)
      console.log('✅ Created category:', category.name)
    }

    // Create sample products (simplified version)
    const products = [
      {
        name: 'Premium Laptop',
        slug: 'premium-laptop',
        description: 'High-performance laptop for professionals',
        price: 1299.99,
        comparePrice: 1499.99,
        sku: 'LAPTOP-001',
        inventory: 50,
        images: ['/images/products/laptop.jpg'],
        categoryId: createdCategories[0].id,
        featured: true,
      },
      {
        name: 'Wireless Headphones',
        slug: 'wireless-headphones',
        description: 'Premium noise-cancelling headphones',
        price: 299.99,
        sku: 'HEADPHONES-001',
        inventory: 100,
        images: ['/images/products/headphones.jpg'],
        categoryId: createdCategories[0].id,
      },
      {
        name: 'Cotton T-Shirt',
        slug: 'cotton-tshirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 29.99,
        sku: 'TSHIRT-001',
        inventory: 200,
        images: ['/images/products/tshirt.jpg'],
        categoryId: createdCategories[1].id,
      },
    ]

    for (const prod of products) {
      const product = await prisma.product.upsert({
        where: { slug: prod.slug },
        update: {},
        create: prod,
      })
      console.log('✅ Created product:', product.name)
    }

    // Create currencies
    const currencies = [
      { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0 },
      { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.85 },
      { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.73 },
    ]

    for (const curr of currencies) {
      const currency = await prisma.currency.upsert({
        where: { code: curr.code },
        update: {},
        create: curr,
      })
      console.log('✅ Created currency:', currency.code)
    }

    console.log('✅ Database seeded successfully!')

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        users: 2,
        categories: createdCategories.length,
        products: products.length,
        currencies: currencies.length,
      },
    })
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
