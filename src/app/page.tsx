import { getAnimals } from "@/services/animals";
import { AnimalCard } from "@/components/ui/AnimalCard";
import MapWrapper from "@/components/map/MapWrapper";

export default async function Home() {
  const animals = await getAnimals();

  return (
    <main className="max-w-7xl mx-auto p-8 space-y-12">
      <header className="text-center">
        <h1 className="text-5xl font-black text-blue-900 tracking-tight">AquaAdopt</h1>
        <p className="text-blue-600 font-medium mt-2">Monitorando e protegendo a vida marinha em tempo real</p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Monitoramento Global</h2>
        <MapWrapper animals={animals} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Animais para Apadrinhamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              id={animal.id}
              name={animal.name}
              species={animal.species}
              image={animal.image}
              status={animal.status}
            />
          ))}
        </div>
      </section>
    </main>
  );
}