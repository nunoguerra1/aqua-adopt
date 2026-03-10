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