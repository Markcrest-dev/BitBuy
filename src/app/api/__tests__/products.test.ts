import { NextRequest } from 'next/server'
import { GET } from '../products/route'

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    product: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}))

const prisma = require('@/lib/prisma').default

describe('GET /api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return products with default pagination', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Product 1',
        slug: 'product-1',
        description: 'Description 1',
        price: 99.99,
        comparePrice: null,
        images: ['image1.jpg'],
        category: { id: 'cat1', name: 'Category 1', slug: 'category-1' },
        featured: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    prisma.product.findMany.mockResolvedValue(mockProducts)
    prisma.product.count.mockResolvedValue(1)

    const request = new NextRequest('http://localhost:3000/api/products')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.products).toEqual(mockProducts)
    expect(data.pagination).toMatchObject({
      page: 1,
      pageSize: 12,
      total: 1,
      totalPages: 1,
    })
  })

  it('should filter products by category', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Laptop',
        slug: 'laptop',
        description: 'A laptop',
        price: 999.99,
        comparePrice: null,
        images: ['laptop.jpg'],
        category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
        featured: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    prisma.product.findMany.mockResolvedValue(mockProducts)
    prisma.product.count.mockResolvedValue(1)

    const request = new NextRequest(
      'http://localhost:3000/api/products?category=electronics'
    )
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.products).toEqual(mockProducts)
    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          category: { slug: 'electronics' },
        }),
      })
    )
  })

  it('should filter products by price range', async () => {
    prisma.product.findMany.mockResolvedValue([])
    prisma.product.count.mockResolvedValue(0)

    const request = new NextRequest(
      'http://localhost:3000/api/products?minPrice=100&maxPrice=500'
    )
    await GET(request)

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          price: {
            gte: 100,
            lte: 500,
          },
        }),
      })
    )
  })

  it('should return only featured products when featured=true', async () => {
    prisma.product.findMany.mockResolvedValue([])
    prisma.product.count.mockResolvedValue(0)

    const request = new NextRequest(
      'http://localhost:3000/api/products?featured=true'
    )
    await GET(request)

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          featured: true,
        }),
      })
    )
  })

  it('should handle pagination correctly', async () => {
    prisma.product.findMany.mockResolvedValue([])
    prisma.product.count.mockResolvedValue(100)

    const request = new NextRequest(
      'http://localhost:3000/api/products?page=2&pageSize=20'
    )
    const response = await GET(request)
    const data = await response.json()

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 20, // (page 2 - 1) * pageSize 20
        take: 20,
      })
    )
    expect(data.pagination).toMatchObject({
      page: 2,
      pageSize: 20,
      total: 100,
      totalPages: 5,
    })
  })

  it('should sort products by different criteria', async () => {
    prisma.product.findMany.mockResolvedValue([])
    prisma.product.count.mockResolvedValue(0)

    const request = new NextRequest(
      'http://localhost:3000/api/products?sortBy=price&order=asc'
    )
    await GET(request)

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { price: 'asc' },
      })
    )
  })

  it('should handle errors gracefully', async () => {
    prisma.product.findMany.mockRejectedValue(new Error('Database error'))

    const request = new NextRequest('http://localhost:3000/api/products')
    const response = await GET(request)

    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBeDefined()
  })
})
