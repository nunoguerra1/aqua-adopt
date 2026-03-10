import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.adoption.deleteMany()
    await prisma.statusUpdate.deleteMany()
    await prisma.marineAnimal.deleteMany()

    console.log('Semeando animais...')

    const a1 = await prisma.marineAnimal.create({
        data: {
            name: "Luna",
            species: "Tartaruga-Verde",
            image: "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/Revista_Tartaruga_facebook_1280x720_1013670979971.webp?w=546&h=308",
            description: "Luna foi resgatada com resíduos de plástico. Agora está em reabilitação e sendo monitorada via satélite.",
            status: "VULNERABLE",
            latitude: -23.5505,
            longitude: -46.6333,
        }
    })

    const a2 = await prisma.marineAnimal.create({
        data: {
            name: "Bento",
            species: "Baleia Jubarte",
            image: "https://123ecos.com.br/wp-content/uploads/2025/03/baleia-jubarte-megaptera-novaeangliae.jpg",
            description: "Bento é um macho jovem que migra anualmente para a costa da Bahia para reprodução.",
            status: "STABLE",
            latitude: -17.9633,
            longitude: -38.7033,
        }
    })

    console.log('✅ Banco de dados semeado com sucesso!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })