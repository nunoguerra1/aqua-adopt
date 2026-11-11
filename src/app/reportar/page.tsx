import type { Metadata } from 'next'
import { Camera } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { SightingForm } from '@/components/sightings/SightingForm'

export const metadata: Metadata = {
  title: 'Reportar avistamento | AquaAdopt',
  description:
    'Registre o avistamento de um animal marinho. Os relatos são revisados antes de aparecerem no mapa.',
}

export default function ReportarPage() {
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
            Registre um avistamento. Os relatos são revisados antes de aparecerem no mapa.
          </p>
        </div>

        <div
          role="alert"
          className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-900"
        >
          <p className="font-bold mb-1">Viu um animal marinho ferido ou encalhado?</p>
          <p className="text-sm">
            Este formulário <strong>não aciona nenhuma equipe de resgate</strong>. Os relatos são
            revisados manualmente, sem prazo. Se o animal precisa de ajuda agora, procure os órgãos
            ambientais ou o projeto de monitoramento de praias da sua região.
          </p>
        </div>

        <div className="glass p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-ocean-900/10">
          <SightingForm />
        </div>
      </FadeIn>
    </main>
  )
}
