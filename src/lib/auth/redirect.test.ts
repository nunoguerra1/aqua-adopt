import { describe, expect, it } from 'vitest'
import { safeRedirectPath } from './redirect'

describe('safeRedirectPath', () => {
  it('aceita caminhos internos, com query e hash', () => {
    expect(safeRedirectPath('/admin')).toBe('/admin')
    expect(safeRedirectPath('/admin?aba=1#topo')).toBe('/admin?aba=1#topo')
  })

  it('usa o padrão quando não há valor', () => {
    expect(safeRedirectPath(undefined)).toBe('/')
    expect(safeRedirectPath(null)).toBe('/')
    expect(safeRedirectPath('')).toBe('/')
  })

  it('rejeita endereços externos', () => {
    expect(safeRedirectPath('https://malicioso.com')).toBe('/')
    expect(safeRedirectPath('//malicioso.com')).toBe('/')
  })

  it('rejeita a variante com barra invertida', () => {
    expect(safeRedirectPath('/\\malicioso.com')).toBe('/')
  })

  it('rejeita caminho sem barra inicial', () => {
    expect(safeRedirectPath('admin')).toBe('/')
  })

  it('aceita um padrão diferente', () => {
    expect(safeRedirectPath(undefined, '/admin')).toBe('/admin')
  })
})
