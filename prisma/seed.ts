import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
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
      description: 'Men\'s and women\'s fashion clothing',
      image: '/images/categories/clothing.jpg',
    },
    {
      name: 'Shoes',
      slug: 'shoes',
      description: 'Sneakers, boots, sandals, and footwear',
      image: '/images/categories/shoes.jpg',
    },
    {
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Furniture, decor, and home essentials',
      image: '/images/categories/home.jpg',
    },
    {
      name: 'Beauty',
      slug: 'beauty',
      description: 'Cosmetics, skincare, and beauty products',
      image: '/images/categories/beauty.jpg',
    },
    {
      name: 'Sports',
      slug: 'sports',
      description: 'Sports equipment, gym gear, and athletic wear',
      image: '/images/categories/sports.jpg',
    },
  ]

  const createdCategories = []
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
    createdCategories.push(created)
    console.log(`✅ Created category: ${created.name}`)
  }

  // Create products
  const products = [
    // Electronics
    {
      name: 'Wireless Bluetooth Headphones',
      slug: 'wireless-bluetooth-headphones',
      description: 'Premium noise-canceling wireless headphones with 30-hour battery life and superior sound quality.',
      price: 79.99,
      comparePrice: 129.99,
      sku: 'ELEC-HEAD-001',
      inventory: 50,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'],
      categoryId: createdCategories[0].id,
      featured: true,
    },
    {
      name: 'Smartphone 5G 128GB',
      slug: 'smartphone-5g-128gb',
      description: '6.5-inch display, triple camera system, 128GB storage, 5G connectivity.',
      price: 599.99,
      comparePrice: 799.99,
      sku: 'ELEC-PHONE-001',
      inventory: 30,
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80', 'https://images.unsplash.com/photo-1592286927505-b6b13197633c?w=800&q=80'],
      categoryId: createdCategories[0].id,
      featured: true,
    },
    {
      name: 'Laptop 15.6" Intel i7',
      slug: 'laptop-156-intel-i7',
      description: 'Powerful laptop with Intel i7 processor, 16GB RAM, 512GB SSD, perfect for work and entertainment.',
      price: 899.99,
      comparePrice: 1199.99,
      sku: 'ELEC-LAP-001',
      inventory: 20,
      images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'],
      categoryId: createdCategories[0].id,
      featured: true,
    },
    // Clothing
    {
      name: 'Classic Cotton T-Shirt',
      slug: 'classic-cotton-tshirt',
      description: 'Comfortable 100% cotton t-shirt, available in multiple colors.',
      price: 19.99,
      comparePrice: 29.99,
      sku: 'CLO-TSHIRT-001',
      inventory: 100,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
      categoryId: createdCategories[1].id,
      featured: false,
    },
    {
      name: 'Denim Jeans - Slim Fit',
      slug: 'denim-jeans-slim-fit',
      description: 'Classic slim-fit denim jeans with stretch comfort.',
      price: 49.99,
      comparePrice: 79.99,
      sku: 'CLO-JEANS-001',
      inventory: 75,
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'],
      categoryId: createdCategories[1].id,
      featured: false,
    },
    {
      name: 'Winter Jacket - Waterproof',
      slug: 'winter-jacket-waterproof',
      description: 'Warm, waterproof winter jacket with insulated lining.',
      price: 129.99,
      comparePrice: 199.99,
      sku: 'CLO-JACKET-001',
      inventory: 40,
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'],
      categoryId: createdCategories[1].id,
      featured: true,
    },
    // Shoes
    {
      name: 'Running Sneakers Pro',
      slug: 'running-sneakers-pro',
      description: 'Professional running sneakers with advanced cushioning and breathable mesh.',
      price: 89.99,
      comparePrice: 129.99,
      sku: 'SHOE-RUN-001',
      inventory: 60,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
      categoryId: createdCategories[2].id,
      featured: true,
    },
    {
      name: 'Casual Canvas Shoes',
      slug: 'casual-canvas-shoes',
      description: 'Comfortable canvas shoes perfect for everyday wear.',
      price: 39.99,
      comparePrice: 59.99,
      sku: 'SHOE-CAN-001',
      inventory: 80,
      images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80'],
      categoryId: createdCategories[2].id,
      featured: false,
    },
    // Home & Living
    {
      name: 'Modern Table Lamp',
      slug: 'modern-table-lamp',
      description: 'Contemporary LED table lamp with adjustable brightness.',
      price: 34.99,
      comparePrice: 49.99,
      sku: 'HOME-LAMP-001',
      inventory: 45,
      images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
      categoryId: createdCategories[3].id,
      featured: false,
    },
    {
      name: 'Throw Pillow Set (4-Pack)',
      slug: 'throw-pillow-set-4pack',
      description: 'Decorative throw pillows, set of 4, various colors available.',
      price: 29.99,
      comparePrice: 44.99,
      sku: 'HOME-PILL-001',
      inventory: 100,
      images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80'],
      categoryId: createdCategories[3].id,
      featured: false,
    },
    // Beauty
    {
      name: 'Moisturizing Face Cream',
      slug: 'moisturizing-face-cream',
      description: 'Hydrating face cream with SPF 30, suitable for all skin types.',
      price: 24.99,
      comparePrice: 39.99,
      sku: 'BEAUTY-CREAM-001',
      inventory: 150,
      images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80'],
      categoryId: createdCategories[4].id,
      featured: false,
    },
    {
      name: 'Makeup Brush Set',
      slug: 'makeup-brush-set',
      description: 'Professional 12-piece makeup brush set with carrying case.',
      price: 34.99,
      comparePrice: 54.99,
      sku: 'BEAUTY-BRUSH-001',
      inventory: 70,
      images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80'],
      categoryId: createdCategories[4].id,
      featured: true,
    },
    // Sports
    {
      name: 'Yoga Mat Premium',
      slug: 'yoga-mat-premium',
      description: 'Extra thick yoga mat with carrying strap, non-slip surface.',
      price: 29.99,
      comparePrice: 49.99,
      sku: 'SPORT-YOGA-001',
      inventory: 90,
      images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'],
      categoryId: createdCategories[5].id,
      featured: false,
    },
    {
      name: 'Adjustable Dumbbells Set',
      slug: 'adjustable-dumbbells-set',
      description: 'Space-saving adjustable dumbbell set, 5-25 lbs per hand.',
      price: 149.99,
      comparePrice: 249.99,
      sku: 'SPORT-DUMB-001',
      inventory: 25,
      images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80'],
      categoryId: createdCategories[5].id,
      featured: true,
    },
  ]

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
    console.log(`✅ Created product: ${created.name}`)
  }

  // Create test address for test user
  await prisma.address.create({
    data: {
      userId: testUser.id,
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001',
      isDefault: true,
    },
  })
  console.log('✅ Created test address')

  // Create cart for test user
  await prisma.cart.create({
    data: {
      userId: testUser.id,
    },
  })
  console.log('✅ Created test cart')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
