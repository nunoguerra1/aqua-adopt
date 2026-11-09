import { describe, expect, it } from 'vitest'
import { getDatabaseHost, isLocalDatabaseUrl } from './db-guard'

describe('isLocalDatabaseUrl', () => {
    it('aceita localhost', () => {
        expect(isLocalDatabaseUrl('postgresql://aqua:aqua@localhost:5432/aqua_adopt')).toBe(true)
    })

    it('aceita 127.0.0.1', () => {
        expect(isLocalDatabaseUrl('postgresql://aqua:aqua@127.0.0.1:5432/aqua_adopt')).toBe(true)
    })

    it('aceita ::1 (IPv6)', () => {
        expect(isLocalDatabaseUrl('postgresql://aqua:aqua@[::1]:5432/aqua_adopt')).toBe(true)
    })

    it('rejeita um host remoto do Neon', () => {
        const url = 'postgresql://u:p@ep-teste-pooler.sa-east-1.aws.neon.tech/db?sslmode=require'
        expect(isLocalDatabaseUrl(url)).toBe(false)
    })

    it('rejeita um domínio que apenas começa com localhost', () => {
        expect(isLocalDatabaseUrl('postgresql://u:p@localhost.exemplo.com:5432/db')).toBe(false)
    })

    it('lança erro quando a URL está ausente', () => {
        expect(() => isLocalDatabaseUrl(undefined)).toThrow('DATABASE_URL ausente ou inválida.')
    })
})

describe('getDatabaseHost', () => {
    it('extrai o host sem porta, usuário ou senha', () => {
        expect(getDatabaseHost('postgresql://aqua:aqua@localhost:5432/aqua_adopt')).toBe('localhost')
    })
})