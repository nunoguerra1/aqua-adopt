import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', nome: 'página inicial' },
  { path: '/reportar', nome: 'formulário de reporte' },
  { path: '/animals/seed-luna', nome: 'perfil da Luna' },
]

for (const { path, nome } of routes) {
  test(`${nome} (${path}) carrega sem erros`, async ({ page }) => {
    const erros: string[] = []
    page.on('pageerror', (erro) => erros.push(erro.message))

    const resposta = await page.goto(path)

    expect(resposta?.status()).toBe(200)
    await expect(page.locator('body')).toBeVisible()
    expect(erros).toEqual([])
  })
}
