'use client'
import { motion } from "framer-motion"

export function Background3D() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    y: [0, 100, 0],
                    x: [0, 50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[120px]"
            />

            <motion.div
                animate={{
                    y: [0, -150, 0],
                    x: [0, -100, 0],
                    scale: [1.2, 1, 1.2]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[-15%] w-[600px] h-[600px] bg-cyan-400/25 rounded-full blur-[100px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-rose-400/20 rounded-full blur-[150px]"
            />
        </div>
    )
}