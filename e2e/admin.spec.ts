import { expect, test } from '@playwright/test'

const rotas = ['/admin', '/admin/animais', '/admin/animais/novo']

for (const rota of rotas) {
  test(`visitante sem login é enviado para a entrada ao abrir ${rota}`, async ({ page }) => {
    await page.goto(rota)

    await expect(page).toHaveURL(new RegExp(`/entrar\\?next=${encodeURIComponent(rota)}$`))
    await expect(page.getByRole('heading', { name: 'Entrar', exact: true })).toBeVisible()
  })
}
