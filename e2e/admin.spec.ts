import { expect, test } from '@playwright/test'

test('visitante sem login é enviado para a entrada ao abrir /admin', async ({ page }) => {
  await page.goto('/admin')

  await expect(page).toHaveURL(/\/entrar\?next=%2Fadmin$/)
  await expect(page.getByRole('heading', { name: 'Entrar', exact: true })).toBeVisible()
})
