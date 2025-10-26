import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('💱 Seeding currencies...')

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0 },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.36 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 149.50 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.12 },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 1630.00 },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 18.75 },
  ]

  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { code: currency.code },
      update: { rate: currency.rate },
      create: currency,
    })
    console.log(`✅ ${currency.code} - ${currency.name}`)
  }

  console.log('\n✨ Currencies seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding currencies:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
