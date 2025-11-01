import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveTitle(/BitBuy/);
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });

  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/BitBuy/);
  });
});
