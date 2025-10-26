import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should display the homepage correctly', async ({ page }) => {
    await page.goto('/')

    // Check page title
    await expect(page).toHaveTitle(/BitBuy/)

    // Check header is visible
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Check logo/brand name
    await expect(page.getByText('BitBuy')).toBeVisible()

    // Check navigation links
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'All Products' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Electronics' })).toBeVisible()
  })

  test('should have search functionality', async ({ page }) => {
    await page.goto('/')

    // Check search bar is visible
    const searchInput = page.getByPlaceholder(/search/i)
    await expect(searchInput).toBeVisible()

    // Type in search box
    await searchInput.fill('laptop')

    // Wait for autocomplete dropdown (if it appears)
    await page.waitForTimeout(500)
  })

  test('should display featured products', async ({ page }) => {
    await page.goto('/')

    // Check for featured products section
    await expect(page.getByText(/featured products/i)).toBeVisible()

    // Check that at least one product card is visible
    const productCards = page.locator('[data-testid="product-card"]').or(
      page.locator('a[href^="/products/"]')
    )
    await expect(productCards.first()).toBeVisible()
  })

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/')

    // Click on "All Products" link
    await page.getByRole('link', { name: 'All Products' }).click()

    // Verify navigation
    await expect(page).toHaveURL(/\/products/)
  })

  test('should open cart page', async ({ page }) => {
    await page.goto('/')

    // Click on cart icon/link
    await page.getByRole('link', { name: /cart/i }).click()

    // Verify navigation to cart
    await expect(page).toHaveURL(/\/cart/)
  })
})
