import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import type { AnimalInput } from '@/lib/animals/schema'

export async function getAnimals() {
  return prisma.marineAnimal.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getAnimalById(id: string) {
  return prisma.marineAnimal.findUnique({
    where: { id },
    include: {
      updates: { orderBy: { createdAt: 'desc' } },
      adoptions: {
        select: { id: true, adopterName: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}

export async function getAnimalsForAdmin() {
  return prisma.marineAnimal.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { updates: true, adoptions: true } } },
  })
}

export async function createAnimal(data: AnimalInput) {
  return prisma.marineAnimal.create({ data })
}

export async function updateAnimal(id: string, data: AnimalInput) {
  return prisma.marineAnimal.updateMany({ where: { id }, data })
}

export async function deleteAnimalIfUnadopted(id: string): Promise<boolean> {
  try {
    await prisma.marineAnimal.delete({ where: { id, adoptions: { none: {} } } })
    return true
  } catch (error) {
    const expected =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === 'P2025' || error.code === 'P2003')
    if (expected) return false
    throw error
  }
}
