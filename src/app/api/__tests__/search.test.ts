import { NextRequest } from 'next/server'
import { GET } from '../search/route'

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    product: {
      findMany: jest.fn(),
    },
    category: {
      findMany: jest.fn(),
    },
  },
}))

const prisma = require('@/lib/prisma').default

describe('GET /api/search', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return empty results when no query is provided', async () => {
    prisma.product.findMany.mockResolvedValue([])
    prisma.category.findMany.mockResolvedValue([])

    const request = new NextRequest('http://localhost:3000/api/search')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.results).toEqual([])
    expect(data.total).toBe(0)
  })

  it('should search products by name', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Wireless Headphones',
        slug: 'wireless-headphones',
        description: 'Premium headphones',
        price: 99.99,
        comparePrice: null,
        images: ['headphones.jpg'],
        category: { id: 'cat1', name: 'Electronics', slug: 'electronics' },
        featured: false,
        active: true,
        sku: 'WH-001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    prisma.product.findMany.mockResolvedValue(mockProducts)
    prisma.category.findMany.mockResolvedValue([])

    const request = new NextRequest(
      'http://localhost:3000/api/search?q=headphones'
    )
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.results).toEqual(mockProducts)
    expect(data.total).toBe(1)
    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          AND: expect.arrayContaining([
            { active: true },
            {
              OR: expect.arrayContaining([
                { name: { contains: 'headphones', mode: 'insensitive' } },
                { description: { contains: 'headphones', mode: 'insensitive' } },
                { sku: { contains: 'headphones', mode: 'insensitive' } },
              ]),
            },
          ]),
        }),
      })
    )
  })

  it('should search products case-insensitively', async () => {
    prisma.product.findMany.mockResolvedValue([])
    prisma.category.findMany.mockResolvedValue([])

    const request = new NextRequest(
      'http://localhost:3000/api/search?q=LAPTOP'
    )
    await GET(request)

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          AND: expect.arrayContaining([
            {
              OR: expect.arrayContaining([
                { name: { contains: 'LAPTOP', mode: 'insensitive' } },
              ]),
            },
          ]),
        }),
      })
    )
  })

  it('should return related categories', async () => {
    const mockCategories = [
      {
        id: 'cat1',
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices',
        image: 'electronics.jpg',
        featured: true,
        active: true,
      },
    ]

    prisma.product.findMany.mockResolvedValue([])
    prisma.category.findMany.mockResolvedValue(mockCategories)

    const request = new NextRequest(
      'http://localhost:3000/api/search?q=electronics'
    )
    const response = await GET(request)
    const data = await response.json()

    expect(data.categories).toEqual(mockCategories)
  })

  it('should limit results based on limit parameter', async () => {
    prisma.product.findMany.mockResolvedValue([])
    prisma.category.findMany.mockResolvedValue([])

    const request = new NextRequest(
      'http://localhost:3000/api/search?q=laptop&limit=5'
    )
    await GET(request)

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 5,
      })
    )
  })

  it('should prioritize featured products in results', async () => {
    prisma.product.findMany.mockResolvedValue([])
    prisma.category.findMany.mockResolvedValue([])

    const request = new NextRequest(
      'http://localhost:3000/api/search?q=laptop'
    )
    await GET(request)

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      })
    )
  })

  it('should generate search suggestions', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Laptop Pro',
        slug: 'laptop-pro',
        description: 'Professional laptop',
        price: 1299.99,
        comparePrice: null,
        images: ['laptop.jpg'],
        category: { id: 'cat1', name: 'Computers', slug: 'computers' },
        featured: true,
        active: true,
        sku: 'LAP-001',
      },
      {
        id: '2',
        name: 'Laptop Air',
        slug: 'laptop-air',
        description: 'Lightweight laptop',
        price: 999.99,
        comparePrice: null,
        images: ['laptop2.jpg'],
        category: { id: 'cat1', name: 'Computers', slug: 'computers' },
        featured: false,
        active: true,
        sku: 'LAP-002',
      },
    ]

    prisma.product.findMany.mockResolvedValue(mockProducts)
    prisma.category.findMany.mockResolvedValue([])

    const request = new NextRequest(
      'http://localhost:3000/api/search?q=laptop'
    )
    const response = await GET(request)
    const data = await response.json()

    expect(data.suggestions).toBeDefined()
    expect(Array.isArray(data.suggestions)).toBe(true)
    // Should include unique product names and categories
    expect(data.suggestions).toContain('Laptop Pro')
    expect(data.suggestions).toContain('Laptop Air')
  })

  it('should handle errors gracefully', async () => {
    prisma.product.findMany.mockRejectedValue(new Error('Database error'))

    const request = new NextRequest(
      'http://localhost:3000/api/search?q=test'
    )
    const response = await GET(request)

    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBeDefined()
  })

  it('should only return active products', async () => {
    prisma.product.findMany.mockResolvedValue([])
    prisma.category.findMany.mockResolvedValue([])

    const request = new NextRequest(
      'http://localhost:3000/api/search?q=test'
    )
    await GET(request)

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          AND: expect.arrayContaining([{ active: true }]),
        }),
      })
    )
  })
})
