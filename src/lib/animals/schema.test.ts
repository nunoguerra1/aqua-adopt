import { describe, expect, it } from 'vitest'
import { parseAnimal } from './schema'

const valido = {
  name: 'Luna',
  species: 'Tartaruga-Verde',
  image: 'https://exemplo.com/luna.jpg',
  description: 'Resgatada e em reabilitação.',
  status: 'VULNERABLE',
  latitude: '-24,1',
  longitude: '-45.5',
}

describe('parseAnimal', () => {
  it('aceita um animal válido e converte as coordenadas', () => {
    const resultado = parseAnimal(valido)
    expect(resultado.ok).toBe(true)
    if (resultado.ok) {
      expect(resultado.data.latitude).toBe(-24.1)
      expect(resultado.data.longitude).toBe(-45.5)
    }
  })

  it('rejeita imagem com esquema perigoso', () => {
    expect(parseAnimal({ ...valido, image: 'javascript:alert(1)' }).ok).toBe(false)
  })

  it('rejeita imagem que não é uma URL', () => {
    expect(parseAnimal({ ...valido, image: 'luna.jpg' }).ok).toBe(false)
  })

  it('rejeita status fora do enum', () => {
    expect(parseAnimal({ ...valido, status: 'EXTINTO' }).ok).toBe(false)
  })

  it('rejeita descrição curta e devolve mensagem no campo certo', () => {
    const resultado = parseAnimal({ ...valido, description: 'curta' })
    expect(resultado.ok).toBe(false)
    if (!resultado.ok) expect(resultado.fieldErrors.description).toBeDefined()
  })

  it('rejeita coordenada vazia', () => {
    const resultado = parseAnimal({ ...valido, latitude: '', longitude: '' })
    expect(resultado.ok).toBe(false)
  })
})
