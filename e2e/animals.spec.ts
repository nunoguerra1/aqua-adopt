import { expect, test } from '@playwright/test'

test('animal inexistente responde 404 com a página em português', async ({ page }) => {
  const resposta = await page.goto('/animals/nao-existe')

  expect(resposta?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible()
})
