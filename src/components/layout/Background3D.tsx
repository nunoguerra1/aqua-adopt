'use client'
import { motion } from "framer-motion"

export function Background3D() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none optimize-gpu">

            <motion.div
                animate={{
                    y: [0, 80, 0],
                    x: [0, 40, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-blue-500/25 rounded-full blur-[70px] optimize-gpu"
            />

            <motion.div
                animate={{
                    y: [0, -100, 0],
                    x: [0, -60, 0],
                    scale: [1.1, 1, 1.1]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[25%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[60px] optimize-gpu"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.35, 0.15]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-5%] left-[15%] w-[400px] h-[400px] bg-rose-400/15 rounded-full blur-[80px] optimize-gpu"
            />
        </div>
    )
}