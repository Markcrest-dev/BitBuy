import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@shophub.com' },
    update: {},
    create: {
      email: 'admin@shophub.com',
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
      images: ['/images/products/headphones-1.jpg', '/images/products/headphones-2.jpg'],
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
      images: ['/images/products/phone-1.jpg', '/images/products/phone-2.jpg'],
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
      images: ['/images/products/laptop-1.jpg'],
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
      images: ['/images/products/tshirt-1.jpg'],
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
      images: ['/images/products/jeans-1.jpg'],
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
      images: ['/images/products/jacket-1.jpg'],
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
      images: ['/images/products/sneakers-1.jpg'],
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
      images: ['/images/products/canvas-shoes-1.jpg'],
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
      images: ['/images/products/lamp-1.jpg'],
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
      images: ['/images/products/pillows-1.jpg'],
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
      images: ['/images/products/face-cream-1.jpg'],
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
      images: ['/images/products/brushes-1.jpg'],
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
      images: ['/images/products/yoga-mat-1.jpg'],
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
      images: ['/images/products/dumbbells-1.jpg'],
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
