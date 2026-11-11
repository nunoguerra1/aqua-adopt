import { getAnimals } from '@/services/animals'
import { getPublicSightings } from '@/services/sightings'
import { AnimalCard } from '@/components/ui/AnimalCard'
import MapWrapper from '@/components/map/MapWrapper'
import { HeroSection } from '@/components/sections/HeroSection'
import { FadeIn } from '@/components/ui/FadeIn'
import { Satellite, Heart, Waves } from 'lucide-react'

export const revalidate = 60

export default async function Home() {
  const [animals, sightings] = await Promise.all([getAnimals(), getPublicSightings()])

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 space-y-32">
      <HeroSection />

      <FadeIn>
        <section
          id="mapa"
          className="glass rounded-[3rem] p-4 shadow-2xl shadow-ocean-900/5 overflow-hidden scroll-mt-32"
        >
          <div className="flex justify-between items-center mb-8 p-8">
            <div>
              <h2 className="text-3xl font-black text-ocean-900 tracking-tight">
                Mapa dos Animais
              </h2>
              <p className="text-gray-400 font-medium">
                Marcadores: animais de demonstração. Círculos: relatos de usuários já revisados, com
                posição aproximada.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ocean-900">
                  Dados de demonstração
                </span>
              </div>
            </div>
          </div>
          <div className="h-[600px] rounded-[2.5rem] overflow-hidden grayscale-[0.3] hover:grayscale-0 transition-all duration-700 shadow-inner">
            <MapWrapper animals={animals} sightings={sightings} />
          </div>
        </section>
      </FadeIn>

      <section id="animais" className="space-y-16 pb-20 scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-5xl font-black text-ocean-900 tracking-tighter">Sentinelas</h2>
            <p className="text-gray-500 text-lg mt-2">
              Espécies marinhas ameaçadas que você pode conhecer e apadrinhar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {animals.map((animal, index) => (
            <FadeIn key={animal.id} delay={index * 0.1}>
              <AnimalCard
                id={animal.id}
                name={animal.name}
                species={animal.species}
                image={animal.image}
                status={animal.status}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="sobre" className="max-w-[1400px] mx-auto px-6 py-32 scroll-mt-32 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-ocean-500 tracking-[0.2em] uppercase mb-4">
              Nossa Missão
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-ocean-900 tracking-tighter leading-tight mb-6">
              Tecnologia a favor da <br /> <span className="text-accent">vida marinha.</span>
            </h3>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              O AquaAdopt nasceu com um propósito claro: conscientizar e engajar a sociedade na
              preservação dos oceanos. Queremos usar dados abertos e tecnologia para criar uma ponte
              entre você e as espécies mais vulneráveis do planeta.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0.1}>
            <div className="glass p-10 rounded-[3rem] h-full hover:-translate-y-2 transition-transform duration-500">
              <div className="w-14 h-14 bg-ocean-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Satellite className="w-7 h-7 text-ocean-600" strokeWidth={2.5} />
              </div>
              <h4 className="text-xl font-black text-ocean-900 tracking-tighter mb-3">
                Acompanhe os Animais
              </h4>
              <p className="text-gray-500 font-medium leading-relaxed">
                Veja onde cada animal está no mapa e leia o diário de bordo de cada um. Nesta
                demonstração as posições são fictícias; a próxima etapa é conectar dados científicos
                abertos.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass p-10 rounded-[3rem] h-full hover:-translate-y-2 transition-transform duration-500">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Heart className="w-7 h-7 text-accent" strokeWidth={2.5} />
              </div>
              <h4 className="text-xl font-black text-ocean-900 tracking-tighter mb-3">
                Apadrinhamento
              </h4>
              <p className="text-gray-500 font-medium leading-relaxed">
                O apadrinhamento é simbólico: você escolhe um animal e seu nome entra no mural de
                padrinhos. Nenhum pagamento é processado.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="glass p-10 rounded-[3rem] h-full hover:-translate-y-2 transition-transform duration-500">
              <div className="w-14 h-14 bg-ocean-900 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Waves className="w-7 h-7 text-ocean-100" strokeWidth={2.5} />
              </div>
              <h4 className="text-xl font-black text-ocean-900 tracking-tighter mb-3">
                Conscientização
              </h4>
              <p className="text-gray-500 font-medium leading-relaxed">
                Transformamos informação sobre a vida marinha em uma experiência visual para educar
                novas gerações.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
