import { Conservation } from '@prisma/client'
import { describe, expect, it } from 'vitest'
import { STATUS_INFO } from './status'

describe('STATUS_INFO', () => {
  it('tem rótulo e classes para todo valor do enum Conservation', () => {
    for (const status of Object.values(Conservation)) {
      expect(STATUS_INFO[status].label).not.toBe('')
      expect(STATUS_INFO[status].classes).not.toBe('')
    }
  })

  it('usa rótulos distintos para cada status', () => {
    const rotulos = Object.values(STATUS_INFO).map((info) => info.label)
    expect(new Set(rotulos).size).toBe(rotulos.length)
  })
})
