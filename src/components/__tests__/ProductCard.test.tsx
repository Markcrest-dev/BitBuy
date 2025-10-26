import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../product/ProductCard'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

// Mock cart store
jest.mock('@/store/cartStore', () => ({
  useCartStore: () => ({
    addItem: jest.fn(),
  }),
}))

const mockProduct = {
  id: '1',
  name: 'Wireless Headphones',
  slug: 'wireless-headphones',
  description: 'Premium noise-canceling headphones',
  price: 99.99,
  comparePrice: 129.99,
  images: ['https://example.com/headphones.jpg'],
  category: {
    id: 'cat1',
    name: 'Electronics',
    slug: 'electronics',
  },
  featured: true,
  active: true,
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('$129.99')).toBeInTheDocument()
  })

  it('displays product image', () => {
    render(<ProductCard product={mockProduct} />)

    const image = screen.getByAltText('Wireless Headphones')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/headphones.jpg')
  })

  it('shows discount percentage when compare price exists', () => {
    render(<ProductCard product={mockProduct} />)

    // Calculate expected discount: ((129.99 - 99.99) / 129.99) * 100 ≈ 23%
    // The text might be "Save 23%" instead of "23% OFF"
    expect(screen.getByText(/save 23%|23% off/i)).toBeInTheDocument()
  })

  it('links to product detail page', () => {
    render(<ProductCard product={mockProduct} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/products/wireless-headphones')
  })

  it('does not show compare price when not provided', () => {
    const productWithoutCompare = { ...mockProduct, comparePrice: null }
    render(<ProductCard product={productWithoutCompare} />)

    expect(screen.queryByText('$129.99')).not.toBeInTheDocument()
  })
})
