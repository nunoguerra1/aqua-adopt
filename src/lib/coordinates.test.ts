import { describe, expect, it } from 'vitest'
import { formatCoordinates } from './coordinates'

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
