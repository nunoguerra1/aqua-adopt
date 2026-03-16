import { prisma } from "@/lib/prisma";

export async function getAnimals() {
    try {
        const animals = await prisma.marineAnimal.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return animals;
    } catch (error) {
        console.error("Erro ao buscar animais:", error);
        return [];
    }
}

export async function getAnimalById(id: string) {
    try {
        return await prisma.marineAnimal.findUnique({
            where: { id },
            include: {
                updates: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
    } catch (error) {
        return null;
    }
}