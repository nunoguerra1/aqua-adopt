'use client'
import { motion } from "framer-motion"

export function HeroSection() {
    return (
        <section className="relative text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-accent font-black tracking-[0.3em] uppercase text-[10px] bg-accent/10 px-4 py-2 rounded-full">
                    Ocean Telemetry Research
                </span>
                <h1 className="text-7xl md:text-9xl font-black text-ocean-900 tracking-tighter leading-[0.85] mt-8">
                    Oceano <br />
                    <span className="text-ocean-500">Soberano.</span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto font-medium leading-relaxed mt-8">
                    Monitoramento de alta precisão e proteção ativa. Conectamos dados científicos à preservação do azul profundo.
                </p>
            </motion.div>
        </section>
    )
}