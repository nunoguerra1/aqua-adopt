import { describe, expect, it } from 'vitest'
import {
  formatCoordinates,
  parseCoordinate,
  roundCoordinate,
  toPublicCoordinates,
} from './coordinates'

describe('formatCoordinates', () => {
  it('usa S e O no hemisfério sul e oeste', () => {
    expect(formatCoordinates(-24.1, -45.5)).toBe('24,1° S, 45,5° O')
  })

  it('usa N e L no hemisfério norte e leste', () => {
    expect(formatCoordinates(10.04, 20.06)).toBe('10,0° N, 20,1° L')
  })

  it('arredonda para uma casa decimal (cerca de 11 km)', () => {
    expect(formatCoordinates(-17.9633, -38.7033)).toBe('18,0° S, 38,7° O')
  })
})

describe('roundCoordinate', () => {
  it('arredonda para uma casa decimal por padrão', () => {
    expect(roundCoordinate(-24.14)).toBe(-24.1)
    expect(roundCoordinate(45.56)).toBe(45.6)
  })

  it('respeita o número de casas informado', () => {
    expect(roundCoordinate(-24.1234, 2)).toBe(-24.12)
  })

  it('não devolve -0', () => {
    expect(roundCoordinate(-0.04)).toBe(0)
  })
})

describe('toPublicCoordinates', () => {
  it('arredonda latitude e longitude (cerca de 11 km)', () => {
    expect(toPublicCoordinates(-23.9876, -45.4321)).toEqual({
      latitude: -24,
      longitude: -45.4,
    })
  })
})

describe('parseCoordinate', () => {
  it('aceita ponto ou vírgula como separador decimal', () => {
    expect(parseCoordinate('-24.1', -90, 90)).toBe(-24.1)
    expect(parseCoordinate('-24,1', -90, 90)).toBe(-24.1)
  })

  it('devolve null para vazio, texto e valores fora do intervalo', () => {
    expect(parseCoordinate('', -90, 90)).toBeNull()
    expect(parseCoordinate('abc', -90, 90)).toBeNull()
    expect(parseCoordinate('91', -90, 90)).toBeNull()
  })
})
