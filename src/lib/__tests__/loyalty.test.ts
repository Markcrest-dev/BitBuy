import { calculateTier, pointsToCurrency, currencyToPoints, LOYALTY_TIERS } from '../loyalty'

describe('Loyalty System', () => {
  describe('calculateTier', () => {
    it('should return BRONZE for 0 points', () => {
      expect(calculateTier(0)).toBe('BRONZE')
    })

    it('should return BRONZE for points below 500', () => {
      expect(calculateTier(499)).toBe('BRONZE')
    })

    it('should return SILVER for 500 points', () => {
      expect(calculateTier(500)).toBe('SILVER')
    })

    it('should return SILVER for points between 500 and 1499', () => {
      expect(calculateTier(1000)).toBe('SILVER')
    })

    it('should return GOLD for 1500 points', () => {
      expect(calculateTier(1500)).toBe('GOLD')
    })

    it('should return GOLD for points between 1500 and 2999', () => {
      expect(calculateTier(2000)).toBe('GOLD')
    })

    it('should return PLATINUM for 3000 points', () => {
      expect(calculateTier(3000)).toBe('PLATINUM')
    })

    it('should return PLATINUM for points above 3000', () => {
      expect(calculateTier(10000)).toBe('PLATINUM')
    })
  })

  describe('pointsToCurrency', () => {
    it('should convert 100 points to $1 with default rate', () => {
      expect(pointsToCurrency(100)).toBe(1)
    })

    it('should convert 250 points to $2.50 with default rate', () => {
      expect(pointsToCurrency(250)).toBe(2.5)
    })

    it('should convert 0 points to $0', () => {
      expect(pointsToCurrency(0)).toBe(0)
    })

    it('should handle custom conversion rate', () => {
      expect(pointsToCurrency(100, 0.02)).toBe(2)
    })
  })

  describe('currencyToPoints', () => {
    it('should convert $1 to 100 points with default rate', () => {
      expect(currencyToPoints(1)).toBe(100)
    })

    it('should convert $10 to 1000 points with default rate', () => {
      expect(currencyToPoints(10)).toBe(1000)
    })

    it('should round up fractional points', () => {
      expect(currencyToPoints(1.5)).toBe(150)
    })

    it('should handle custom conversion rate', () => {
      expect(currencyToPoints(1, 0.02)).toBe(50)
    })
  })

  describe('LOYALTY_TIERS', () => {
    it('should have all tier configurations', () => {
      expect(LOYALTY_TIERS).toHaveProperty('BRONZE')
      expect(LOYALTY_TIERS).toHaveProperty('SILVER')
      expect(LOYALTY_TIERS).toHaveProperty('GOLD')
      expect(LOYALTY_TIERS).toHaveProperty('PLATINUM')
    })

    it('should have correct multipliers', () => {
      expect(LOYALTY_TIERS.BRONZE.multiplier).toBe(1)
      expect(LOYALTY_TIERS.SILVER.multiplier).toBe(1.25)
      expect(LOYALTY_TIERS.GOLD.multiplier).toBe(1.5)
      expect(LOYALTY_TIERS.PLATINUM.multiplier).toBe(2)
    })

    it('should have correct thresholds', () => {
      expect(LOYALTY_TIERS.BRONZE.minPoints).toBe(0)
      expect(LOYALTY_TIERS.SILVER.minPoints).toBe(500)
      expect(LOYALTY_TIERS.GOLD.minPoints).toBe(1500)
      expect(LOYALTY_TIERS.PLATINUM.minPoints).toBe(3000)
    })

    it('should have benefits for each tier', () => {
      Object.values(LOYALTY_TIERS).forEach(tier => {
        expect(tier.benefits).toBeDefined()
        expect(Array.isArray(tier.benefits)).toBe(true)
        expect(tier.benefits.length).toBeGreaterThan(0)
      })
    })
  })
})
