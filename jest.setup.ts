import '@testing-library/jest-dom'

// Mock environment variables for testing
process.env.NEXTAUTH_URL = 'http://localhost:3000'
process.env.NEXTAUTH_SECRET = 'test-secret'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db'

// Polyfill Web APIs for Node.js test environment
if (typeof global.Request === 'undefined') {
  global.Request = class Request {} as any
}
if (typeof global.Response === 'undefined') {
  global.Response = class Response {} as any
}
if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers {} as any
}

// Mock Next.js server imports
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status || 200,
      ...init,
    })),
  },
}))
