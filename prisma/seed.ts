import { PrismaClient, Conservation } from '@prisma/client'
import { getDatabaseHost, isLocalDatabaseUrl } from '../src/lib/db-guard'

const prisma = new PrismaClient()

function assertSafeTarget() {
    if (isLocalDatabaseUrl(process.env.DATABASE_URL)) return
    if (process.env.ALLOW_REMOTE_SEED === 'true') return

    throw new Error(
        `Seed bloqueado: "${getDatabaseHost(process.env.DATABASE_URL)}" não é um banco local. ` +
        'Se tiver certeza, rode com ALLOW_REMOTE_SEED=true.',
    )
}

type SeedAnimal = {
    id: string
    name: string
    species: string
    image: string
    description: string
    status: Conservation
    latitude: number
    longitude: number
}

const animals: SeedAnimal[] = [
    {
        id: 'seed-luna',
        name: 'Luna',
        species: 'Tartaruga-Verde',
        image:
            'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/Revista_Tartaruga_facebook_1280x720_1013670979971.webp?w=546&h=308',
        description:
            'Luna foi resgatada com resíduos de plástico. Agora está em reabilitação e sendo monitorada via satélite.',
        status: 'VULNERABLE',
        latitude: -24.1,
        longitude: -45.5,
    },
    {
        id: 'seed-bento',
        name: 'Bento',
        species: 'Baleia Jubarte',
        image:
            'https://123ecos.com.br/wp-content/uploads/2025/03/baleia-jubarte-megaptera-novaeangliae.jpg',
        description:
            'Bento é um macho jovem que migra anualmente para a costa da Bahia para reprodução.',
        status: 'STABLE',
        latitude: -17.9633,
        longitude: -38.7033,
    },
    {
        id: 'seed-maya',
        name: 'Maya',
        species: 'Tubarão-Baleia',
        image: 'https://igui-ecologia.s3.amazonaws.com/wp-content/uploads/2018/12/Tubarão-baleia.jpg',
        description:
            'Fêmea adulta, possui um transmissor via satélite na barbatana dorsal para mapear rotas de alimentação.',
        status: 'VULNERABLE',
        latitude: -0.6,
        longitude: -90.3,
    },
    {
        id: 'seed-zeca',
        name: 'Zeca',
        species: 'Peixe-Boi Marinho',
        image:
            'https://conexaoplaneta.com.br/wp-content/uploads/2017/06/peixe-boi-marinho-monitorado-tecnologia-brasileira-inedita-conexao-planeta.jpg',
        description:
            'Devolvido à natureza após 2 anos em cativeiro para tratamento de ferimentos causados por barcos.',
        status: 'VULNERABLE',
        latitude: -9.3,
        longitude: -35.3,
    },
    {
        id: 'seed-coral',
        name: 'Coral',
        species: 'Raia-Manta',
        image: 'https://marsemfim.com.br/wp-content/uploads/2020/11/a-raia-manta-cópia.jpg',
        description:
            'Marcada acusticamente por mergulhadores para entender o uso do arquipélago como estação de limpeza.',
        status: 'STABLE',
        latitude: -3.8,
        longitude: -32.4,
    },
    {
        id: 'seed-koda',
        name: 'Koda',
        species: 'Leão-Marinho',
        image:
            'https://i0.wp.com/segredosdomundo.r7.com/wp-content/uploads/2020/05/leao-marinho-caracteristicas-onde-vivem-e-especies.jpg?resize=640%2C360&quality=89&ssl=1',
        description: 'Resgatado desnutrido. Hoje lidera um pequeno grupo na Península da Patagônia.',
        status: 'STABLE',
        latitude: -42.7,
        longitude: -63.9,
    },
]

async function main() {
    assertSafeTarget()

    console.log('Semeando animais...')

    for (const { id, ...data } of animals) {
        await prisma.marineAnimal.upsert({
            where: { id },
            update: data,
            create: { id, ...data },
        })
    }

    console.log(`✅ ${animals.length} animais semeados (idempotente).`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
