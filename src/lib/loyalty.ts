import { prisma } from '@/lib/prisma'

// Loyalty tier configuration
export const LOYALTY_TIERS = {
  BRONZE: {
    name: 'Bronze',
    minPoints: 0,
    multiplier: 1,
    benefits: [
      '1 point per $1 spent',
      'Birthday bonus: 50 points',
      'Exclusive member-only sales',
    ],
  },
  SILVER: {
    name: 'Silver',
    minPoints: 500,
    multiplier: 1.25,
    benefits: [
      '1.25 points per $1 spent',
      'Free shipping on orders over $50',
      'Birthday bonus: 100 points',
      'Early access to sales',
    ],
  },
  GOLD: {
    name: 'Gold',
    minPoints: 1500,
    multiplier: 1.5,
    benefits: [
      '1.5 points per $1 spent',
      'Free shipping on all orders',
      'Birthday bonus: 200 points',
      'Priority customer support',
      'Exclusive products access',
    ],
  },
  PLATINUM: {
    name: 'Platinum',
    minPoints: 3000,
    multiplier: 2,
    benefits: [
      '2 points per $1 spent',
      'Free express shipping',
      'Birthday bonus: 500 points',
      'VIP customer support',
      'Exclusive platinum-only products',
      'Special gifts and surprises',
    ],
  },
}

// Calculate tier based on total earned points
export function calculateTier(totalEarned: number): 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' {
  if (totalEarned >= LOYALTY_TIERS.PLATINUM.minPoints) return 'PLATINUM'
  if (totalEarned >= LOYALTY_TIERS.GOLD.minPoints) return 'GOLD'
  if (totalEarned >= LOYALTY_TIERS.SILVER.minPoints) return 'SILVER'
  return 'BRONZE'
}

// Award points for a purchase
export async function awardPurchasePoints(
  userId: string,
  orderAmount: number,
  orderId: string
): Promise<void> {
  try {
    // Get or create loyalty account
    let account = await prisma.loyaltyAccount.findUnique({
      where: { userId },
    })

    if (!account) {
      account = await prisma.loyaltyAccount.create({
        data: {
          userId,
          points: 0,
          totalEarned: 0,
          totalRedeemed: 0,
          tier: 'BRONZE',
        },
      })
    }

    // Calculate points: 1 point per dollar by default
    const currentTier = LOYALTY_TIERS[account.tier]
    const basePoints = Math.floor(orderAmount)
    const pointsToAward = Math.floor(basePoints * currentTier.multiplier)

    // Update account and create transaction in a transaction
    await prisma.$transaction([
      prisma.loyaltyAccount.update({
        where: { id: account.id },
        data: {
          points: { increment: pointsToAward },
          totalEarned: { increment: pointsToAward },
        },
      }),
      prisma.loyaltyTransaction.create({
        data: {
          userId,
          accountId: account.id,
          type: 'EARNED',
          points: pointsToAward,
          description: `Earned ${pointsToAward} points from order`,
          orderId,
        },
      }),
    ])

    // Check if user should be upgraded to a new tier
    const newTotalEarned = account.totalEarned + pointsToAward
    const newTier = calculateTier(newTotalEarned)

    if (newTier !== account.tier) {
      await prisma.loyaltyAccount.update({
        where: { id: account.id },
        data: { tier: newTier },
      })
    }
  } catch (error) {
    console.error('Error awarding loyalty points:', error)
    // Don't throw error - loyalty points shouldn't break the order flow
  }
}

// Calculate points value in currency
export function pointsToCurrency(points: number, conversionRate: number = 0.01): number {
  return points * conversionRate // Default: 100 points = $1
}

// Calculate how many points needed for a currency amount
export function currencyToPoints(amount: number, conversionRate: number = 0.01): number {
  return Math.ceil(amount / conversionRate)
}
