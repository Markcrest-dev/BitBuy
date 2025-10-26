import { prisma } from '../src/lib/prisma'

async function checkDuplicates() {
  console.log('🔍 Checking for duplicate products...\n')

  // Check for duplicate names
  const duplicateNames = await prisma.product.groupBy({
    by: ['name'],
    _count: {
      name: true,
    },
    having: {
      name: {
        _count: {
          gt: 1,
        },
      },
    },
  })

  if (duplicateNames.length > 0) {
    console.log('❌ Found duplicate product names:')
    for (const dup of duplicateNames) {
      const products = await prisma.product.findMany({
        where: { name: dup.name },
        select: { id: true, name: true, slug: true, sku: true },
      })
      console.log(`\n  "${dup.name}" (${dup._count.name} times):`)
      products.forEach((p) => {
        console.log(`    - ID: ${p.id}, SKU: ${p.sku}, Slug: ${p.slug}`)
      })
    }
  } else {
    console.log('✅ No duplicate product names found')
  }

  // Check for products with missing images
  const productsWithNoImages = await prisma.product.findMany({
    where: {
      OR: [
        { images: { isEmpty: true } },
        { images: { equals: [] } },
      ],
    },
    select: { id: true, name: true, sku: true },
  })

  if (productsWithNoImages.length > 0) {
    console.log(`\n❌ Found ${productsWithNoImages.length} products with no images:`)
    productsWithNoImages.forEach((p) => {
      console.log(`  - ${p.name} (SKU: ${p.sku})`)
    })
  } else {
    console.log('\n✅ All products have images')
  }

  // Get total product count
  const totalProducts = await prisma.product.count()
  console.log(`\n📊 Total products in database: ${totalProducts}`)

  await prisma.$disconnect()
}

checkDuplicates().catch((e) => {
  console.error('Error:', e)
  process.exit(1)
})
