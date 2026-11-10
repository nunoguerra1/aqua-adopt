import { prisma } from '@/lib/prisma'

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
