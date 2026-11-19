import { describe, expect, it } from 'vitest'
import { buildMagicLinkEmail } from './magic-link'

const url = 'https://exemplo.com/api/auth/magic-link/verify?token=abc&callbackURL=%2Fadmin'

describe('buildMagicLinkEmail', () => {
  it('inclui o link no texto puro', () => {
    expect(buildMagicLinkEmail(url).text).toContain(url)
  })

  it('escapa o & do link dentro do HTML', () => {
    const { html } = buildMagicLinkEmail(url)
    expect(html).toContain('token=abc&amp;callbackURL=%2Fadmin')
    expect(html).not.toContain('token=abc&callbackURL')
  })

  it('não deixa aspas do link fechar o atributo href', () => {
    const { html } = buildMagicLinkEmail('https://exemplo.com/" onmouseover="x')
    expect(html).not.toContain('" onmouseover="x')
    expect(html).toContain('&quot; onmouseover=&quot;x')
  })

  it('informa a validade de 5 minutos', () => {
    expect(buildMagicLinkEmail(url).text).toContain('5 minutos')
  })
})
