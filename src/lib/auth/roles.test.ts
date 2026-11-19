import { describe, expect, it } from 'vitest'
import { isAdminEmail, isAdminRole, parseAdminEmails } from './roles'

describe('parseAdminEmails', () => {
  it('separa por vírgula, ignora espaços e normaliza maiúsculas', () => {
    expect(parseAdminEmails(' Ana@Exemplo.com , bia@exemplo.com ,, ')).toEqual([
      'ana@exemplo.com',
      'bia@exemplo.com',
    ])
  })

  it('devolve lista vazia quando a variável não existe', () => {
    expect(parseAdminEmails(undefined)).toEqual([])
    expect(parseAdminEmails('')).toEqual([])
  })
})

describe('isAdminEmail', () => {
  it('reconhece um e-mail da lista, sem diferenciar maiúsculas', () => {
    expect(isAdminEmail('ANA@exemplo.com', 'ana@exemplo.com')).toBe(true)
  })

  it('rejeita e-mail fora da lista', () => {
    expect(isAdminEmail('carla@exemplo.com', 'ana@exemplo.com')).toBe(false)
  })

  it('não confunde um e-mail que contém outro', () => {
    expect(isAdminEmail('banana@exemplo.com', 'ana@exemplo.com')).toBe(false)
  })

  it('ninguém é admin quando a lista está vazia', () => {
    expect(isAdminEmail('ana@exemplo.com', undefined)).toBe(false)
  })
})

describe('isAdminRole', () => {
  it('só aceita exatamente ADMIN', () => {
    expect(isAdminRole('ADMIN')).toBe(true)
    expect(isAdminRole('admin')).toBe(false)
    expect(isAdminRole('USER')).toBe(false)
    expect(isAdminRole(undefined)).toBe(false)
    expect(isAdminRole(null)).toBe(false)
  })
})
