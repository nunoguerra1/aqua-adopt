import { getAnimalById } from "@/services/animals";
import { notFound } from "next/navigation";
import { AdoptionForm } from "@/components/ui/AdoptionForm";
import { AdoptersList } from "@/components/ui/AdoptersList";

export default async function AnimalDetails({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const animal = await getAnimalById(id);

    if (!animal) notFound();

    return (
        <main className="max-w-4xl mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img src={animal.image} alt={animal.name} className="rounded-2xl shadow-lg w-full h-[400px] object-cover" />

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-blue-900">{animal.name}</h1>
                    <p className="text-xl text-blue-600">{animal.species}</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-sm">
                        Status: {animal.status}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{animal.description}</p>
                    <div className="mt-8">
                        <AdoptionForm animalId={animal.id} animalName={animal.name} />

                        <AdoptersList adoptions={animal.adoptions} />
                    </div>
                </div>
            </div>

            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Diário de Bordo</h2>
                <div className="space-y-4">
                    {animal.updates.length > 0 ? (
                        animal.updates.map((update) => (
                            <div key={update.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                <h3 className="font-bold text-lg">{update.title}</h3>
                                <p className="text-gray-600">{update.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Nenhuma atualização recente para este animal.</p>
                    )}
                </div>
            </section>
        </main>
    );
}