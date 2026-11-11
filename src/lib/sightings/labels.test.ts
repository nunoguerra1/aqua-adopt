import { SpeciesGroup } from '@prisma/client'
import { describe, expect, it } from 'vitest'
import { SPECIES_GROUP_LABELS } from './labels'

describe('SPECIES_GROUP_LABELS', () => {
  it('tem rótulo para todo valor do enum SpeciesGroup', () => {
    for (const grupo of Object.values(SpeciesGroup)) {
      expect(SPECIES_GROUP_LABELS[grupo]).not.toBe('')
    }
  })
})
