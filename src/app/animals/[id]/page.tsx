import { getAnimalById } from "@/services/animals";
import { notFound } from "next/navigation";
import { AdoptionForm } from "@/components/ui/AdoptionForm";
import { AdoptersList } from "@/components/ui/AdoptersList";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

export default async function AnimalDetails({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const animal = await getAnimalById(id);

    if (!animal) notFound();

    const getStatusColor = (status: string) => {
        if (status.toLowerCase().includes('crítico')) return 'text-accent bg-accent/10 border-accent/20';
        if (status.toLowerCase().includes('vulnerável')) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
        return 'text-ocean-500 bg-ocean-500/10 border-ocean-500/20';
    };

    return (
        <main className="min-h-screen pb-24">
            <section className="relative h-[60vh] min-h-[500px] w-full">
                <img
                    src={animal.image}
                    alt={animal.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f0f7ff] via-ocean-900/40 to-ocean-900/10" />

                <div className="absolute inset-0 flex flex-col justify-end max-w-[1400px] mx-auto px-6 pb-16">
                    <FadeIn>
                        <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-xs tracking-widest uppercase mb-8 transition-colors">
                            ← Voltar ao Mapa
                        </Link>
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <span className={`px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border backdrop-blur-md ${getStatusColor(animal.status)}`}>
                                Status: {animal.status}
                            </span>
                            <span className="glass px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-white border-white/20">
                                Sinal Ativo
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-2">
                            {animal.name}
                        </h1>
                        <p className="text-xl md:text-2xl font-medium text-white/80 tracking-widest uppercase">
                            {animal.species}
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative -mt-8 z-10">

                <div className="lg:col-span-7 space-y-16">

                    <FadeIn delay={0.1}>
                        <div className="glass rounded-3xl p-6 grid grid-cols-3 gap-4 border-ocean-900/5 shadow-xl">
                            <div>
                                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Última Posição</p>
                                <p className="text-lg font-black text-ocean-900 mt-1">Pacífico Sul</p>
                            </div>
                            <div className="border-l border-ocean-900/10 pl-4">
                                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Profundidade</p>
                                <p className="text-lg font-black text-ocean-900 mt-1">45m</p>
                            </div>
                            <div className="border-l border-ocean-900/10 pl-4">
                                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Temperatura</p>
                                <p className="text-lg font-black text-ocean-900 mt-1">22°C</p>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl font-black text-ocean-900 tracking-tighter mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-ocean-500 rounded-full inline-block"></span>
                            Dossiê Científico
                        </h2>
                        <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed font-medium">
                            <p>{animal.description}</p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <h2 className="text-3xl font-black text-ocean-900 tracking-tighter mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-accent rounded-full inline-block"></span>
                            Diário de Bordo
                        </h2>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                            {animal.updates.length > 0 ? (
                                animal.updates.map((update, index) => (
                                    <div key={update.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-ocean-100 text-ocean-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            <div className="w-2 h-2 bg-ocean-500 rounded-full animate-pulse"></div>
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-3xl shadow-sm border border-white/50 group-hover:shadow-md transition-all">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-black text-ocean-900 text-lg">{update.title}</h3>
                                            </div>
                                            <p className="text-gray-500 text-sm font-medium leading-relaxed">{update.content}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 font-medium italic pl-12">Monitoramento recém-iniciado. Aguardando os primeiros pacotes de dados do transmissor.</p>
                            )}
                        </div>
                    </FadeIn>
                </div>

                <div className="lg:col-span-5 relative">
                    <div className="sticky top-32 space-y-8">

                        <FadeIn delay={0.4}>
                            <div className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-ocean-900/10 border border-gray-50">
                                <AdoptionForm animalId={animal.id} animalName={animal.name} />
                            </div>
                        </FadeIn>

                        {animal.adoptions && animal.adoptions.length > 0 && (
                            <FadeIn delay={0.5}>
                                <div className="glass rounded-[3rem] p-8">
                                    <h3 className="text-sm font-black text-ocean-900 tracking-[0.2em] uppercase mb-6 text-center">
                                        Mural de Padrinhos
                                    </h3>
                                    <AdoptersList adoptions={animal.adoptions} />
                                </div>
                            </FadeIn>
                        )}

                    </div>
                </div>

            </section>
        </main>
    );
}