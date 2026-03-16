'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function adoptAnimal(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const animalId = formData.get('animalId') as string

    if (!name || !email || !animalId) {
        return { error: "Todos os campos são obrigatórios." }
    }

    try {
        await prisma.adoption.create({
            data: {
                adopterName: name,
                adopterEmail: email,
                animalId: animalId,
            },
        })

        revalidatePath(`/animal/${animalId}`)

        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Erro ao processar o apadrinhamento." }
    }
}