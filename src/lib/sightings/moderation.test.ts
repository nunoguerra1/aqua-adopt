import { describe, expect, it } from 'vitest'
import { parseModeration, parseStatusFilter } from './moderation'

describe('parseModeration', () => {
  it('aceita um id e um status válidos', () => {
    expect(parseModeration({ id: 's1', status: 'APPROVED' })).toEqual({
      id: 's1',
      status: 'APPROVED',
    })
  })

  it('rejeita status desconhecido', () => {
    expect(parseModeration({ id: 's1', status: 'HACKEADO' })).toBeNull()
  })

  it('rejeita id ausente ou vazio', () => {
    expect(parseModeration({ id: '', status: 'APPROVED' })).toBeNull()
    expect(parseModeration({ id: null, status: 'APPROVED' })).toBeNull()
  })

  it('descarta campos extras', () => {
    const resultado = parseModeration({ id: 's1', status: 'REJECTED', reviewedById: 'x' })
    expect(resultado).toEqual({ id: 's1', status: 'REJECTED' })
  })
})

describe('parseStatusFilter', () => {
  it('aceita os três status', () => {
    expect(parseStatusFilter('APPROVED')).toBe('APPROVED')
    expect(parseStatusFilter('REJECTED')).toBe('REJECTED')
    expect(parseStatusFilter('PENDING')).toBe('PENDING')
  })

  it('volta para PENDING quando o valor é inválido ou ausente', () => {
    expect(parseStatusFilter('qualquer')).toBe('PENDING')
    expect(parseStatusFilter(undefined)).toBe('PENDING')
  })

  it('usa o primeiro valor quando vem uma lista', () => {
    expect(parseStatusFilter(['APPROVED', 'REJECTED'])).toBe('APPROVED')
  })
})
