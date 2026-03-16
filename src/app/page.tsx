import { getAnimals } from "@/services/animals";
import { AnimalCard } from "@/components/ui/AnimalCard";
import MapWrapper from "@/components/map/MapWrapper";
import { HeroSection } from "@/components/sections/HeroSection";
import { FadeIn } from "@/components/ui/FadeIn";

export default async function Home() {
  const animals = await getAnimals();

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 space-y-32">

      <HeroSection />

      <FadeIn>
        <section className="glass rounded-[3rem] p-4 shadow-2xl shadow-ocean-900/5 overflow-hidden">
          <div className="flex justify-between items-center mb-8 p-8">
            <div>
              <h2 className="text-3xl font-black text-ocean-900 tracking-tight">Vigilância Ativa</h2>
              <p className="text-gray-400 font-medium">Dados de telemetria atualizados em tempo real.</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-ocean-900`}>
                  Live Satellite Feed
                </span>
              </div>
            </div>
          </div>
          <div className="h-[600px] rounded-[2.5rem] overflow-hidden grayscale-[0.3] hover:grayscale-0 transition-all duration-700 shadow-inner">
            <MapWrapper animals={animals} />
          </div>
        </section>
      </FadeIn>

      <section className="space-y-16 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-5xl font-black text-ocean-900 tracking-tighter">Sentinelas</h2>
            <p className="text-gray-500 text-lg mt-2">Espécies vitais sob monitoramento constante.</p>
          </div>
          <button className="text-ocean-500 font-bold text-xs tracking-widest uppercase border-b-2 border-ocean-500/20 hover:border-ocean-500 transition-all pb-1">
            Explorar Todos os Registros
          </button>
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
    </main>
  );
}