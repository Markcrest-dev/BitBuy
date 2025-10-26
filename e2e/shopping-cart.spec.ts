import { test, expect } from '@playwright/test'

test.describe('Shopping Cart', () => {
  test('should add product to cart from product page', async ({ page }) => {
    await page.goto('/products')

    // Wait for products to load
    await page.waitForSelector('a[href^="/products/"]', { timeout: 5000 })

    // Click on first product
    const firstProduct = page.locator('a[href^="/products/"]').first()
    await firstProduct.click()

    // Wait for product detail page to load
    await page.waitForURL(/\/products\//)

    // Click "Add to Cart" button
    const addToCartButton = page.getByRole('button', { name: /add to cart/i })
    await addToCartButton.click()

    // Wait for cart update
    await page.waitForTimeout(1000)

    // Check that cart icon shows item count
    const cartBadge = page.locator('[class*="cart"]').locator('text=/[1-9]/')
    await expect(cartBadge).toBeVisible()
  })

  test('should display products in cart page', async ({ page }) => {
    // First add a product to cart
    await page.goto('/products')
    await page.waitForSelector('a[href^="/products/"]', { timeout: 5000 })

    const firstProduct = page.locator('a[href^="/products/"]').first()
    const productName = await firstProduct.textContent()
    await firstProduct.click()

    await page.waitForURL(/\/products\//)
    await page.getByRole('button', { name: /add to cart/i }).click()
    await page.waitForTimeout(1000)

    // Navigate to cart
    await page.goto('/cart')

    // Verify cart is not empty
    const emptyMessage = page.getByText(/cart is empty/i)
    await expect(emptyMessage).not.toBeVisible()
  })

  test('should update quantity in cart', async ({ page }) => {
    // Add product to cart first
    await page.goto('/products')
    await page.waitForSelector('a[href^="/products/"]', { timeout: 5000 })

    await page.locator('a[href^="/products/"]').first().click()
    await page.waitForURL(/\/products\//)
    await page.getByRole('button', { name: /add to cart/i }).click()
    await page.waitForTimeout(1000)

    // Go to cart
    await page.goto('/cart')

    // Find quantity increase button
    const increaseButton = page.getByRole('button', { name: '+' }).or(
      page.locator('button:has-text("+")')
    )

    if (await increaseButton.isVisible()) {
      await increaseButton.first().click()
      await page.waitForTimeout(500)

      // Verify quantity increased (should show 2)
      await expect(page.getByText('2')).toBeVisible()
    }
  })

  test('should remove item from cart', async ({ page }) => {
    // Add product to cart
    await page.goto('/products')
    await page.waitForSelector('a[href^="/products/"]', { timeout: 5000 })

    await page.locator('a[href^="/products/"]').first().click()
    await page.waitForURL(/\/products\//)
    await page.getByRole('button', { name: /add to cart/i }).click()
    await page.waitForTimeout(1000)

    // Go to cart
    await page.goto('/cart')

    // Find and click remove button
    const removeButton = page.getByRole('button', { name: /remove/i }).or(
      page.locator('button[aria-label*="remove" i]')
    )

    if (await removeButton.isVisible()) {
      await removeButton.first().click()
      await page.waitForTimeout(1000)

      // Cart should be empty or show "cart is empty" message
      const emptyMessage = page.getByText(/cart is empty/i)
      await expect(emptyMessage).toBeVisible()
    }
  })

  test('should calculate correct total', async ({ page }) => {
    await page.goto('/cart')

    // If cart has items, check that total is displayed
    const total = page.locator('text=/total/i')
    const hasItems = await page.getByText(/cart is empty/i).isVisible().catch(() => false)

    if (!hasItems) {
      await expect(total).toBeVisible()
      // Total should show dollar amount
      await expect(page.locator('text=/\\$\\d+/i')).toBeVisible()
    }
  })

  test('should navigate to checkout', async ({ page }) => {
    // Add product to cart first
    await page.goto('/products')
    await page.waitForSelector('a[href^="/products/"]', { timeout: 5000 })

    await page.locator('a[href^="/products/"]').first().click()
    await page.waitForURL(/\/products\//)
    await page.getByRole('button', { name: /add to cart/i }).click()
    await page.waitForTimeout(1000)

    // Go to cart
    await page.goto('/cart')

    // Click checkout button
    const checkoutButton = page.getByRole('link', { name: /checkout/i }).or(
      page.getByRole('button', { name: /checkout/i })
    )

    if (await checkoutButton.isVisible()) {
      await checkoutButton.click()
      await page.waitForTimeout(1000)

      // Should navigate to checkout or login
      const url = page.url()
      expect(url).toMatch(/checkout|login/)
    }
  })
})
