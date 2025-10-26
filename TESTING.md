# Testing Guide - BitBuy E-Commerce Platform

This document provides a comprehensive guide to testing the BitBuy e-commerce platform. The application uses a multi-layered testing strategy combining unit tests, component tests, and end-to-end (E2E) tests.

## Table of Contents

1. [Testing Stack](#testing-stack)
2. [Running Tests](#running-tests)
3. [Test Structure](#test-structure)
4. [Writing Tests](#writing-tests)
5. [Code Coverage](#code-coverage)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Testing Stack

### Unit & Component Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation

### End-to-End Testing
- **Playwright**: Browser automation and E2E testing
- Supports: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari

## Running Tests

### Unit and Component Tests

```bash
# Run all unit/component tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- path/to/test.file.ts

# Run tests matching a pattern
npm test -- --testNamePattern="ProductCard"
```

### End-to-End Tests

```bash
# Run all E2E tests headlessly
npm run test:e2e

# Run E2E tests with UI mode (visual test runner)
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug

# Run specific E2E test file
npx playwright test e2e/homepage.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Structure

```
ecommerce-platform/
├── src/
│   ├── app/
│   │   └── api/
│   │       └── __tests__/          # API route tests
│   │           ├── products.test.ts
│   │           └── search.test.ts
│   ├── components/
│   │   └── __tests__/              # Component tests
│   │       ├── ProductCard.test.tsx
│   │       ├── Header.test.tsx
│   │       └── SearchBar.test.tsx
│   └── lib/
│       └── __tests__/              # Utility function tests
│           └── utils.test.ts
├── e2e/                            # End-to-end tests
│   ├── homepage.spec.ts
│   ├── auth.spec.ts
│   └── shopping-cart.spec.ts
├── jest.config.ts                  # Jest configuration
├── jest.setup.ts                   # Jest setup and global mocks
└── playwright.config.ts            # Playwright configuration
```

## Writing Tests

### Unit Tests

Unit tests focus on testing individual functions and utilities in isolation.

**Example: Testing a utility function**

```typescript
// src/lib/__tests__/utils.test.ts
import { formatPrice } from '../utils'

describe('formatPrice', () => {
  it('should format price with dollar sign and two decimals', () => {
    expect(formatPrice(99.99)).toBe('$99.99')
    expect(formatPrice(100)).toBe('$100.00')
  })

  it('should handle large numbers with commas', () => {
    expect(formatPrice(1234567.89)).toBe('$1,234,567.89')
  })
})
```

### Component Tests

Component tests verify that React components render correctly and respond to user interactions.

**Example: Testing a component**

```typescript
// src/components/__tests__/ProductCard.test.tsx
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../product/ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    slug: 'test-product',
    price: 99.99,
    images: ['test.jpg'],
    // ... other required fields
  }

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  it('links to product detail page', () => {
    render(<ProductCard product={mockProduct} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/products/test-product')
  })
})
```

### API Route Tests

API tests verify that backend endpoints work correctly and handle various scenarios.

**Example: Testing an API route**

```typescript
// src/app/api/__tests__/products.test.ts
import { NextRequest } from 'next/server'
import { GET } from '../products/route'

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    product: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}))

describe('GET /api/products', () => {
  it('should return products with default pagination', async () => {
    const mockProducts = [/* mock data */]

    prisma.product.findMany.mockResolvedValue(mockProducts)
    prisma.product.count.mockResolvedValue(1)

    const request = new NextRequest('http://localhost:3000/api/products')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.products).toEqual(mockProducts)
  })
})
```

### End-to-End Tests

E2E tests simulate real user workflows and verify the entire application stack.

**Example: E2E test**

```typescript
// e2e/shopping-cart.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Shopping Cart', () => {
  test('should add product to cart from product page', async ({ page }) => {
    await page.goto('/products')

    // Wait for products to load
    await page.waitForSelector('a[href^="/products/"]')

    // Click on first product
    await page.locator('a[href^="/products/"]').first().click()

    // Add to cart
    await page.getByRole('button', { name: /add to cart/i }).click()

    // Verify cart badge shows item count
    const cartBadge = page.locator('[class*="cart"]').locator('text=/[1-9]/')
    await expect(cartBadge).toBeVisible()
  })
})
```

## Code Coverage

### Coverage Thresholds

The project maintains the following minimum coverage thresholds:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Viewing Coverage Report

```bash
# Generate and view coverage report
npm run test:coverage

# Coverage report will be generated in ./coverage/
# Open ./coverage/lcov-report/index.html in a browser for detailed view
```

### Coverage Exclusions

The following files are excluded from coverage:
- Type definition files (`*.d.ts`)
- Story files (`*.stories.{js,jsx,ts,tsx}`)
- Test files themselves (`__tests__/**`)

## Best Practices

### General Testing Principles

1. **Write tests first (TDD)**: Consider writing tests before implementation when possible
2. **Test behavior, not implementation**: Focus on what the code does, not how it does it
3. **Keep tests simple and focused**: Each test should verify one specific behavior
4. **Use descriptive test names**: Test names should clearly describe what is being tested
5. **Avoid test interdependence**: Each test should be able to run independently
6. **Mock external dependencies**: Isolate the code under test from external systems

### Component Testing Best Practices

1. **Query by accessibility**: Prefer `getByRole`, `getByLabelText`, `getByPlaceholderText`
2. **Test user interactions**: Simulate real user behavior with `userEvent`
3. **Avoid implementation details**: Don't test CSS classes or internal state directly
4. **Mock external hooks**: Mock Next.js router, authentication, etc.

```typescript
// Good
expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()

// Avoid
expect(container.querySelector('.add-to-cart-button')).toBeTruthy()
```

### E2E Testing Best Practices

1. **Use data-testid sparingly**: Prefer accessible selectors
2. **Wait for elements**: Use `waitForSelector` instead of arbitrary timeouts
3. **Test critical user flows**: Focus on high-value user journeys
4. **Keep tests independent**: Each test should set up its own data
5. **Use page object models**: For complex pages, create reusable page objects

```typescript
// Good
await page.waitForSelector('a[href^="/products/"]', { timeout: 5000 })

// Avoid
await page.waitForTimeout(3000) // Arbitrary wait
```

### API Testing Best Practices

1. **Mock database calls**: Don't hit real database in unit tests
2. **Test error scenarios**: Verify error handling and edge cases
3. **Test query parameters**: Verify filtering, pagination, sorting
4. **Verify response structure**: Check both success and error responses

## Troubleshooting

### Common Issues

#### Issue: "Cannot find module @testing-library/dom"
**Solution**: Install missing dependency
```bash
npm install -D @testing-library/dom --legacy-peer-deps
```

#### Issue: "Request is not defined" in API tests
**Solution**: Ensure `jest.setup.ts` includes Web API polyfills
```typescript
if (typeof global.Request === 'undefined') {
  global.Request = class Request {} as any
}
```

#### Issue: Component tests fail with Next.js router errors
**Solution**: Mock Next.js router in your test
```typescript
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
}))
```

#### Issue: E2E tests timeout
**Solution**:
1. Ensure dev server is running: `npm run dev`
2. Increase timeout in playwright.config.ts
3. Check for slow database queries or network requests

#### Issue: Flaky E2E tests
**Solution**:
1. Replace `waitForTimeout` with `waitForSelector`
2. Ensure proper test isolation (reset database state)
3. Use `toBeVisible()` instead of checking existence alone

### Running Tests Before Deployment

Always run the full test suite before deploying:

```bash
# Run all tests
npm run test:coverage
npm run test:e2e

# Verify no failing tests
# Coverage should meet minimum thresholds
# All E2E tests should pass
```

## Test Environment Setup

### Environment Variables

Tests use mock environment variables defined in `jest.setup.ts`:

```typescript
process.env.NEXTAUTH_URL = 'http://localhost:3000'
process.env.NEXTAUTH_SECRET = 'test-secret'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db'
```

For E2E tests, create `.env.test` if needed with real test database credentials.

### Database Setup for E2E Tests

E2E tests require a running database. Options:

1. **Use development database** (easiest for local testing)
2. **Dedicated test database**: Create separate test database
3. **In-memory SQLite**: For faster, isolated tests (requires schema changes)

## Continuous Integration

### Running Tests in CI/CD

Example GitHub Actions workflow:

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci --legacy-peer-deps

      - name: Run unit tests
        run: npm run test:coverage

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e
```

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Summary

This testing guide provides a comprehensive foundation for maintaining high-quality code in the BitBuy platform. Remember:

- **Unit tests** verify individual functions work correctly
- **Component tests** ensure UI components render and behave properly
- **E2E tests** validate complete user workflows

Always write tests for new features and maintain existing tests as the codebase evolves.
