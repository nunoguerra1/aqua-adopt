'use client'

import { useState } from "react";
import { Camera, MapPin, Send, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

export default function ReportarPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);


        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    return (
        <main className="max-w-[800px] mx-auto px-6 py-32 min-h-screen">
            <FadeIn>
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Camera className="w-8 h-8 text-ocean-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-ocean-900 tracking-tighter mb-4">
                        Cidadão <span className="text-accent">Cientista</span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Registre um avistamento de demonstração do Aqua Adopt.
                    </p>
                </div>

                <div
                    role="alert"
                    className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-900"
                >
                    <p className="font-bold mb-1">Viu um animal marinho ferido ou encalhado?</p>
                    <p className="text-sm">
                        Este formulário é uma demonstração e <strong>não envia o relato a ninguém</strong>.
                        Procure agora os órgãos ambientais ou o projeto de monitoramento de praias da sua região.
                    </p>
                </div>

                <div className="glass p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-ocean-900/10">
                    {isSuccess ? (
                        <div className="text-center py-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                            <CheckCircle2 className="w-20 h-20 text-ocean-600 mb-6" />
                            <h2 className="text-3xl font-black text-ocean-900 mb-2">Demonstração concluída</h2>
                            <p className="text-gray-500 mb-8 max-w-md">
                                Nada foi enviado: esta página é uma demonstração e nenhuma equipe foi notificada.
                                Se o animal precisa de ajuda, procure os órgãos ambientais da sua região.
                            </p>
                            <Link
                                href="/"
                                className="bg-ocean-900 text-white px-8 py-4 rounded-full font-bold hover:bg-ocean-800 transition-all shadow-lg"
                            >
                                Voltar ao Mapa
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-ocean-900 ml-2">Seu Nome</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Como podemos te chamar?"
                                        className="w-full bg-white/50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-ocean-900 ml-2">Espécie (se souber)</label>
                                    <select className="w-full bg-white/50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all text-gray-700">
                                        <option value="">Não tenho certeza</option>
                                        <option value="tartaruga">Tartaruga Marinha</option>
                                        <option value="baleia">Baleia / Golfinho</option>
                                        <option value="lobo">Lobo / Leão-Marinho</option>
                                        <option value="ave">Ave Marinha</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-ocean-900 ml-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-accent" /> Localização do Avistamento
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Praia, cidade, ou ponto de referência..."
                                    className="w-full bg-white/50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-ocean-900 ml-2">Detalhes da Situação</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Descreva o que você viu. O animal está ferido? Preso em rede?"
                                    className="w-full bg-white/50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-accent text-white px-8 py-5 rounded-2xl font-black tracking-wide hover:bg-accent/90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                            >
                                {isSubmitting ? (
                                    <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" /> Enviar relato de demonstração
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </FadeIn>
        </main>
    );
}