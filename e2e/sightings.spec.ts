import { expect, test } from '@playwright/test'

test('envia um relato e mostra a confirmação', async ({ page }) => {
  await page.goto('/reportar')

  await page.getByLabel('Latitude').fill('-24,1')
  await page.getByLabel('Longitude').fill('-45.5')
  await page
    .getByLabel('Detalhes da situação')
    .fill('Tartaruga marinha na linha da água, sem ferimentos visíveis.')
  await page.getByRole('button', { name: 'Enviar relato' }).click()

  await expect(page.getByRole('heading', { name: 'Relato recebido' })).toBeVisible()
})
