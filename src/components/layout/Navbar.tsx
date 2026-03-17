'use client'
import { motion } from "framer-motion"
import Link from "next/link"

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }} animate={{ y: 0 }}
            className="fixed top-0 w-full z-50 glass border-b border-white/20"
        >
            <div className="max-w-[1400px] mx-auto px-10 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black text-ocean-900 tracking-tighter">
                    AQUA<span className="text-ocean-500">ADOPT</span>
                </Link>

                <div className="hidden md:flex gap-10 text-xs font-black uppercase tracking-widest text-ocean-900">
                    <Link href="/#mapa" className="hover:text-ocean-500 transition-colors">Monitoramento</Link>
                    <Link href="/#sobre" className="hover:text-ocean-500 transition-colors">Nossa Missão</Link>
                    <Link href="/#animais" className="hover:text-ocean-500 transition-colors">Animais</Link>
                </div>

                <Link href="/#animais" className="bg-ocean-900 text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-ocean-800 transition-all">
                    Apoiar Agora
                </Link>
            </div>
        </motion.nav>
    )
}