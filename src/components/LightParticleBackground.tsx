"use client";

import { motion } from "framer-motion";

export default function LightParticleBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Solid dark base background so the glowing gradients pop */}
            <div className="absolute inset-0 bg-slate-950" />

            {/* Glowing moving orbs */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, 50, 100, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 -left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 1.1, 1.3, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] -right-20 w-[30rem] h-[30rem] bg-teal-500/20 rounded-full blur-[120px] mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: [0, 50, -100, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.3, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-32 left-[20%] w-[35rem] h-[35rem] bg-indigo-500/30 rounded-full blur-[120px] mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: [0, -50, 50, 0],
                    y: [0, -50, -100, 0],
                    scale: [1, 1.2, 1, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-[20%] w-[25rem] h-[25rem] bg-sky-500/20 rounded-full blur-[100px] mix-blend-screen"
            />

            {/* Subtle floating particles in the foreground */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [-20, -100, -20],
                        x: Math.sin(i) * 50,
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    className="absolute bg-white rounded-full"
                    style={{
                        width: Math.random() * 4 + 1 + "px",
                        height: Math.random() * 4 + 1 + "px",
                        left: Math.random() * 100 + "%",
                        top: Math.random() * 100 + "%",
                    }}
                />
            ))}
        </div>
    );
}
