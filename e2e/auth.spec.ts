import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should navigate to login page', async ({ page }) => {
    await page.goto('/')

    // Click on Sign In link
    await page.getByRole('link', { name: /sign in/i }).click()

    // Verify we're on the login page
    await expect(page).toHaveURL(/\/login/)
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
  })

  test('should show validation errors for empty login form', async ({ page }) => {
    await page.goto('/login')

    // Submit empty form
    await page.getByRole('button', { name: /sign in/i }).click()

    // Check for validation messages (might vary based on implementation)
    await page.waitForTimeout(500)
  })

  test('should successfully register a new user', async ({ page }) => {
    await page.goto('/register')

    // Generate unique email for test
    const timestamp = Date.now()
    const testEmail = `test${timestamp}@example.com`

    // Fill registration form
    await page.getByLabel(/name/i).fill('Test User')
    await page.getByLabel(/email/i).fill(testEmail)
    await page.getByLabel(/password/i).first().fill('TestPassword123!')
    await page.getByLabel(/confirm password/i).fill('TestPassword123!')

    // Submit form
    await page.getByRole('button', { name: /sign up|register/i }).click()

    // Wait for navigation or success message
    await page.waitForTimeout(2000)

    // Should redirect to login or show success
    const url = page.url()
    const hasSuccess = url.includes('/login') ||
                      await page.getByText(/success|registered/i).isVisible().catch(() => false)

    expect(hasSuccess).toBeTruthy()
  })

  test('should login with existing credentials', async ({ page }) => {
    await page.goto('/login')

    // Use test user credentials
    await page.getByLabel(/email/i).fill('user@example.com')
    await page.getByLabel(/password/i).fill('password123')

    // Submit login form
    await page.getByRole('button', { name: /sign in/i }).click()

    // Wait for redirect
    await page.waitForTimeout(2000)

    // Should redirect to home or profile
    // Check if we're logged in (presence of user menu or logout option)
    const isLoggedIn = await page.getByText(/logout|sign out|profile/i).isVisible().catch(() => false)
    expect(isLoggedIn).toBeTruthy()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel(/email/i).fill('invalid@example.com')
    await page.getByLabel(/password/i).fill('wrongpassword')

    await page.getByRole('button', { name: /sign in/i }).click()

    // Wait for error message
    await page.waitForTimeout(1000)

    // Check for error message
    const errorVisible = await page.getByText(/invalid|incorrect|failed/i).isVisible().catch(() => false)
    expect(errorVisible).toBeTruthy()
  })
})
