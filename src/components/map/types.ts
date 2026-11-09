import type { MarineAnimal } from '@prisma/client'

export type MapAnimal = Pick<MarineAnimal, 'id' | 'name' | 'species' | 'latitude' | 'longitude'>