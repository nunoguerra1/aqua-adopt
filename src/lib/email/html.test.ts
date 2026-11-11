import { describe, expect, it } from 'vitest'
import { escapeHtml } from './html'

describe('escapeHtml', () => {
  it('escapa os caracteres que quebram HTML', () => {
    expect(escapeHtml('<a href="x">&')).toBe('&lt;a href=&quot;x&quot;&gt;&amp;')
  })

  it('escapa aspas simples', () => {
    expect(escapeHtml("it's")).toBe('it&#39;s')
  })

  it('não altera texto simples', () => {
    expect(escapeHtml('texto simples')).toBe('texto simples')
  })
})
