import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../layout/Header'

// Mock Next.js components
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock cart store
jest.mock('@/store/cartStore', () => ({
  useCartStore: () => ({
    items: [],
    getTotalItems: jest.fn(() => 0),
  }),
}))

// Mock auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
}))

describe('Header', () => {
  it('renders the BitBuy logo/brand', () => {
    render(<Header />)

    expect(screen.getByText('BitBuy')).toBeInTheDocument()
  })

  it('renders main navigation links', () => {
    render(<Header />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('All Products')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Fashion')).toBeInTheDocument()
  })

  it('renders cart link', () => {
    render(<Header />)

    const cartLink = screen.getByRole('link', { name: /cart/i })
    expect(cartLink).toBeInTheDocument()
  })

  it('renders search functionality', () => {
    render(<Header />)

    // Search bar should be present (either visible or in mobile menu)
    const searchInputs = screen.getAllByPlaceholderText(/search/i)
    expect(searchInputs.length).toBeGreaterThan(0)
  })

  it('renders sign in link when not authenticated', () => {
    render(<Header />)

    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('displays correct navigation structure', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    // Should have navigation element
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})

describe('Header with authenticated user', () => {
  beforeEach(() => {
    // Mock authenticated session
    jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValue({
      data: {
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'USER',
        },
      },
      status: 'authenticated',
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders user profile link when authenticated', () => {
    render(<Header />)

    // Should show user name or profile link
    const profileLink = screen.queryByText(/profile|account/i)
    expect(profileLink).toBeInTheDocument()
  })

  it('renders sign out option when authenticated', () => {
    render(<Header />)

    // Should have sign out button or link
    const signOutButton = screen.queryByText(/sign out|logout/i)
    expect(signOutButton).toBeInTheDocument()
  })
})

describe('Header with items in cart', () => {
  beforeEach(() => {
    // Mock cart with items
    jest.spyOn(require('@/store/cartStore'), 'useCartStore').mockReturnValue({
      items: [
        { id: '1', productId: 'p1', quantity: 2 },
        { id: '2', productId: 'p2', quantity: 1 },
      ],
      getTotalItems: jest.fn(() => 3),
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('displays cart item count badge', () => {
    render(<Header />)

    // Should show cart badge with count
    const cartBadge = screen.queryByText('3')
    expect(cartBadge).toBeInTheDocument()
  })
})
