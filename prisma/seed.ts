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

    const a3 = await prisma.marineAnimal.create({
        data: {
            name: "Maya",
            species: "Tubarão-Baleia",
            image: "https://igui-ecologia.s3.amazonaws.com/wp-content/uploads/2018/12/Tubarão-baleia.jpg",
            description: "Fêmea adulta, possui um transmissor via satélite na barbatana dorsal para mapear rotas de alimentação.",
            status: "VULNERABLE",
            latitude: -0.6000,
            longitude: -90.3000,
        }
    })

    const a4 = await prisma.marineAnimal.create({
        data: {
            name: "Zeca",
            species: "Peixe-Boi Marinho",
            image: "https://conexaoplaneta.com.br/wp-content/uploads/2017/06/peixe-boi-marinho-monitorado-tecnologia-brasileira-inedita-conexao-planeta.jpg",
            description: "Devolvido à natureza após 2 anos em cativeiro para tratamento de ferimentos causados por barcos.",
            status: "VULNERABLE",
            latitude: -9.3000,
            longitude: -35.3000,
        }
    })

    const a5 = await prisma.marineAnimal.create({
        data: {
            name: "Coral",
            species: "Raia-Manta",
            image: "https://marsemfim.com.br/wp-content/uploads/2020/11/a-raia-manta-cópia.jpg",
            description: "Marcada acusticamente por mergulhadores para entender o uso do arquipélago como estação de limpeza.",
            status: "STABLE",
            latitude: -3.8000,
            longitude: -32.4000,
        }
    })

    const a6 = await prisma.marineAnimal.create({
        data: {
            name: "Koda",
            species: "Leão-Marinho",
            image: "https://i0.wp.com/segredosdomundo.r7.com/wp-content/uploads/2020/05/leao-marinho-caracteristicas-onde-vivem-e-especies.jpg?resize=640%2C360&quality=89&ssl=1",
            description: "Resgatado desnutrido. Hoje lidera um pequeno grupo na Península da Patagônia.",
            status: "STABLE",
            latitude: -42.7000,
            longitude: -63.9000,
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