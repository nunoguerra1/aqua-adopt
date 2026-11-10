import { describe, expect, it } from 'vitest'
import { parseSighting } from './schema'

const valido = {
  reporterName: 'Ana',
  speciesGroup: 'TURTLE',
  placeText: 'Praia do Perequê',
  latitude: '-23.8',
  longitude: '-45.4',
  description: 'Tartaruga na areia, parece ferida na nadadeira.',
}

describe('parseSighting', () => {
  it('aceita um relato válido e converte as coordenadas para número', () => {
    const resultado = parseSighting(valido)
    expect(resultado.ok).toBe(true)
    if (resultado.ok) {
      expect(resultado.data.latitude).toBe(-23.8)
      expect(resultado.data.longitude).toBe(-45.4)
    }
  })

  it('trata nome e local vazios como ausentes', () => {
    const resultado = parseSighting({ ...valido, reporterName: '', placeText: '  ' })
    expect(resultado.ok).toBe(true)
    if (resultado.ok) {
      expect(resultado.data.reporterName).toBeUndefined()
      expect(resultado.data.placeText).toBeUndefined()
    }
  })

  it('assume UNKNOWN quando o grupo não é informado', () => {
    const { speciesGroup, ...semGrupo } = valido
    void speciesGroup
    const resultado = parseSighting(semGrupo)
    expect(resultado.ok && resultado.data.speciesGroup).toBe('UNKNOWN')
  })

  it('rejeita coordenada vazia (vazio não pode virar 0)', () => {
    const resultado = parseSighting({ ...valido, latitude: '', longitude: '' })
    expect(resultado.ok).toBe(false)
    if (!resultado.ok) {
      expect(resultado.fieldErrors.latitude).toBeDefined()
      expect(resultado.fieldErrors.longitude).toBeDefined()
    }
  })

  it('rejeita latitude fora do intervalo', () => {
    const resultado = parseSighting({ ...valido, latitude: '91' })
    expect(resultado.ok).toBe(false)
  })

  it('rejeita texto no lugar de coordenada', () => {
    const resultado = parseSighting({ ...valido, longitude: 'abc' })
    expect(resultado.ok).toBe(false)
  })

  it('rejeita descrição curta demais', () => {
    const resultado = parseSighting({ ...valido, description: 'curto' })
    expect(resultado.ok).toBe(false)
    if (!resultado.ok) expect(resultado.fieldErrors.description).toBeDefined()
  })

  it('rejeita grupo de espécie inexistente', () => {
    const resultado = parseSighting({ ...valido, speciesGroup: 'DRAGAO' })
    expect(resultado.ok).toBe(false)
  })
})
