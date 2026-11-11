import type { SpeciesGroup } from '@prisma/client'

export const SPECIES_GROUP_LABELS: Record<SpeciesGroup, string> = {
  UNKNOWN: 'Não tenho certeza',
  TURTLE: 'Tartaruga marinha',
  CETACEAN: 'Baleia / golfinho',
  PINNIPED: 'Lobo-marinho / leão-marinho',
  SEABIRD: 'Ave marinha',
  OTHER: 'Outro',
}
