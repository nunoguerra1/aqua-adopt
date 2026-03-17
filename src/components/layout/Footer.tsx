import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-ocean-900 text-white/70 pt-20 pb-10 mt-32 relative z-10 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(15,23,42,0.1)]">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    <div className="space-y-4">
                        <h3 className="text-3xl font-black text-white tracking-tighter">Aqua<span className="text-ocean-500">Adopt</span></h3>
                        <p className="text-sm font-medium leading-relaxed max-w-xs">
                            Conectando pessoas à vida marinha através de tecnologia de ponta, dados abertos e conscientização ambiental.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-black tracking-widest uppercase text-white">Navegação</h4>
                        <ul className="space-y-3 font-medium text-sm">
                            <li><Link href="/#sobre" className="hover:text-ocean-500 transition-colors">Sobre o Projeto</Link></li>
                            <li><Link href="/#mapa" className="hover:text-ocean-500 transition-colors">Mapa de Monitoramento</Link></li>
                            <li><Link href="/#animais" className="hover:text-ocean-500 transition-colors">Animais Apoiados</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-black tracking-widest uppercase text-white">Conecte-se</h4>
                        <ul className="space-y-3 font-medium text-sm">
                            <li><a href="https://github.com/nunoguerra1" target="_blank" rel="noreferrer" className="hover:text-ocean-500 transition-colors">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/nunomguerra/" target="_blank" rel="noreferrer" className="hover:text-ocean-500 transition-colors">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-bold tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} Nuno Guerra. Todos os direitos reservados.
                    </p>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">
                        Desenvolvido com Next.js & Tailwind
                    </p>
                </div>
            </div>
        </footer>
    )
}