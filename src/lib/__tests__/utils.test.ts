import { formatPrice } from '../utils'

describe('formatPrice', () => {
  it('should format price with dollar sign and two decimals', () => {
    expect(formatPrice(99.99)).toBe('$99.99')
    expect(formatPrice(100)).toBe('$100.00')
    expect(formatPrice(0.99)).toBe('$0.99')
  })

  it('should handle zero price', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('should handle large numbers', () => {
    expect(formatPrice(1234567.89)).toBe('$1,234,567.89')
  })

  it('should round to two decimal places', () => {
    expect(formatPrice(99.999)).toBe('$100.00')
    expect(formatPrice(99.991)).toBe('$99.99')
  })

  it('should handle negative numbers', () => {
    expect(formatPrice(-10.50)).toBe('-$10.50')
  })
})
