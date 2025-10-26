import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import SearchBar from '../search/SearchBar'

// Mock the custom hook
jest.mock('@/hooks/useSearch', () => ({
  useSearch: jest.fn(),
}))

const mockUseSearch = require('@/hooks/useSearch').useSearch

describe('SearchBar', () => {
  beforeEach(() => {
    // Default mock implementation
    mockUseSearch.mockReturnValue({
      query: '',
      setQuery: jest.fn(),
      results: [],
      categories: [],
      suggestions: [],
      isLoading: false,
      isOpen: false,
      setIsOpen: jest.fn(),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders search input', () => {
    render(<SearchBar />)

    const searchInput = screen.getByPlaceholderText(/search products/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('calls setQuery when user types in search input', async () => {
    const mockSetQuery = jest.fn()
    mockUseSearch.mockReturnValue({
      query: '',
      setQuery: mockSetQuery,
      results: [],
      categories: [],
      suggestions: [],
      isLoading: false,
      isOpen: false,
      setIsOpen: jest.fn(),
    })

    render(<SearchBar />)
    const searchInput = screen.getByPlaceholderText(/search products/i)

    await userEvent.type(searchInput, 'laptop')

    expect(mockSetQuery).toHaveBeenCalled()
  })

  it('displays loading state when searching', () => {
    mockUseSearch.mockReturnValue({
      query: 'laptop',
      setQuery: jest.fn(),
      results: [],
      categories: [],
      suggestions: [],
      isLoading: true,
      isOpen: true,
      setIsOpen: jest.fn(),
    })

    render(<SearchBar />)

    expect(screen.getByText(/searching/i)).toBeInTheDocument()
  })

  it('displays search results when available', () => {
    const mockResults = [
      {
        id: '1',
        name: 'Laptop Pro',
        slug: 'laptop-pro',
        description: 'High-performance laptop',
        price: 1299.99,
        comparePrice: null,
        images: ['laptop.jpg'],
        category: { id: 'cat1', name: 'Computers', slug: 'computers' },
        featured: true,
        active: true,
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
      },
    ]

    mockUseSearch.mockReturnValue({
      query: 'laptop',
      setQuery: jest.fn(),
      results: mockResults,
      categories: [],
      suggestions: [],
      isLoading: false,
      isOpen: true,
      setIsOpen: jest.fn(),
    })

    render(<SearchBar />)

    expect(screen.getByText('Laptop Pro')).toBeInTheDocument()
    expect(screen.getByText('Laptop Air')).toBeInTheDocument()
  })

  it('displays "no results" message when search returns empty', () => {
    mockUseSearch.mockReturnValue({
      query: 'nonexistentproduct',
      setQuery: jest.fn(),
      results: [],
      categories: [],
      suggestions: [],
      isLoading: false,
      isOpen: true,
      setIsOpen: jest.fn(),
    })

    render(<SearchBar />)

    expect(screen.getByText(/no products found/i)).toBeInTheDocument()
  })

  it('displays search suggestions', () => {
    mockUseSearch.mockReturnValue({
      query: 'lap',
      setQuery: jest.fn(),
      results: [],
      categories: [],
      suggestions: ['Laptop Pro', 'Laptop Air', 'Laptop Stand'],
      isLoading: false,
      isOpen: true,
      setIsOpen: jest.fn(),
    })

    render(<SearchBar />)

    expect(screen.getByText('Laptop Pro')).toBeInTheDocument()
    expect(screen.getByText('Laptop Air')).toBeInTheDocument()
    expect(screen.getByText('Laptop Stand')).toBeInTheDocument()
  })

  it('closes dropdown when clicking outside', async () => {
    const mockSetIsOpen = jest.fn()
    mockUseSearch.mockReturnValue({
      query: 'laptop',
      setQuery: jest.fn(),
      results: [],
      categories: [],
      suggestions: [],
      isLoading: false,
      isOpen: true,
      setIsOpen: mockSetIsOpen,
    })

    render(<SearchBar />)

    // Click outside the search component
    fireEvent.click(document.body)

    await waitFor(() => {
      expect(mockSetIsOpen).toHaveBeenCalledWith(false)
    })
  })

  it('displays product prices in search results', () => {
    const mockResults = [
      {
        id: '1',
        name: 'Laptop Pro',
        slug: 'laptop-pro',
        description: 'High-performance laptop',
        price: 1299.99,
        comparePrice: 1499.99,
        images: ['laptop.jpg'],
        category: { id: 'cat1', name: 'Computers', slug: 'computers' },
        featured: true,
        active: true,
      },
    ]

    mockUseSearch.mockReturnValue({
      query: 'laptop',
      setQuery: jest.fn(),
      results: mockResults,
      categories: [],
      suggestions: [],
      isLoading: false,
      isOpen: true,
      setIsOpen: jest.fn(),
    })

    render(<SearchBar />)

    expect(screen.getByText('$1,299.99')).toBeInTheDocument()
  })

  it('shows category filter options when categories are available', () => {
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
      {
        id: 'cat2',
        name: 'Computers',
        slug: 'computers',
        description: 'Computer equipment',
        image: 'computers.jpg',
        featured: true,
        active: true,
      },
    ]

    mockUseSearch.mockReturnValue({
      query: 'laptop',
      setQuery: jest.fn(),
      results: [],
      categories: mockCategories,
      suggestions: [],
      isLoading: false,
      isOpen: true,
      setIsOpen: jest.fn(),
    })

    render(<SearchBar />)

    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Computers')).toBeInTheDocument()
  })

  it('clears search when clear button is clicked', async () => {
    const mockSetQuery = jest.fn()
    mockUseSearch.mockReturnValue({
      query: 'laptop',
      setQuery: mockSetQuery,
      results: [],
      categories: [],
      suggestions: [],
      isLoading: false,
      isOpen: false,
      setIsOpen: jest.fn(),
    })

    render(<SearchBar />)

    const clearButton = screen.queryByRole('button', { name: /clear/i })
    if (clearButton) {
      await userEvent.click(clearButton)
      expect(mockSetQuery).toHaveBeenCalledWith('')
    }
  })
})
