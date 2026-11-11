import { describe, expect, it } from 'vitest'
import { toPublicSighting } from './public'

const linha = {
  id: 's1',
  speciesGroup: 'TURTLE' as const,
  description: 'Tartaruga na linha da água.',
  observedAt: new Date('2026-11-10T12:00:00.000Z'),
  latitude: -23.98765,
  longitude: -45.43219,
}

describe('toPublicSighting', () => {
  it('arredonda as coordenadas para cerca de 11 km', () => {
    const publico = toPublicSighting(linha)
    expect(publico.latitude).toBe(-24)
    expect(publico.longitude).toBe(-45.4)
  })

  it('serializa a data como texto ISO', () => {
    expect(toPublicSighting(linha).observedAt).toBe('2026-11-10T12:00:00.000Z')
  })

  it('expõe apenas os campos públicos, mesmo que a linha traga mais', () => {
    const comDadosPrivados = { ...linha, reporterName: 'Ana', placeText: 'Praia do Perequê' }
    const chaves = Object.keys(toPublicSighting(comDadosPrivados)).sort()
    expect(chaves).toEqual([
      'description',
      'id',
      'latitude',
      'longitude',
      'observedAt',
      'speciesGroup',
    ])
  })
})
