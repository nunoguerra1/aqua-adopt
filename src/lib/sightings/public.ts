import type { SpeciesGroup } from '@prisma/client'
import { toPublicCoordinates } from '@/lib/coordinates'

type SightingRow = {
  id: string
  speciesGroup: SpeciesGroup
  description: string
  observedAt: Date
  latitude: number
  longitude: number
}

export type PublicSighting = {
  id: string
  speciesGroup: SpeciesGroup
  description: string
  observedAt: string
  latitude: number
  longitude: number
}

export function toPublicSighting(row: SightingRow): PublicSighting {
  const { latitude, longitude } = toPublicCoordinates(row.latitude, row.longitude)

  return {
    id: row.id,
    speciesGroup: row.speciesGroup,
    description: row.description,
    observedAt: row.observedAt.toISOString(),
    latitude,
    longitude,
  }
}
