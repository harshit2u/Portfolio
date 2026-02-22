"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Download } from "lucide-react";
import { siteConfig } from "@/data/content";
import ParticleCanvas from "./ParticleCanvas";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-16"
        >
            {/* Standard uniform background matching other sections */}
            <ParticleCanvas />
            {/* Glowing orbs matching the theme */}
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 px-4 max-w-7xl mx-auto w-full">
                {/* Left side: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-cyan-400 text-lg sm:text-xl tracking-[0.2em] uppercase mb-6 font-semibold"
                    >
                        Welcome to my portfolio
                    </motion.p>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-4 text-white tracking-tight">
                        Harshit Upadhyay
                    </h1>

                    <motion.h2
                        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                        animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-slate-300 mb-8 leading-snug"
                    >
                        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold block sm:inline">
                            Full-Stack Developer
                        </span>
                        <span className="mx-3 text-slate-500 hidden sm:inline">|</span>
                        <span className="text-slate-400 block sm:inline mt-2 sm:mt-0 text-lg sm:text-2xl lg:text-3xl xl:text-4xl">
                            MERN & Firebase Specialist
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                    >
                        I build secure, scalable systems with clean architecture and high-performance user interfaces.
                    </motion.p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                        <motion.a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            whileHover={{ scale: 1.05, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-cyan-500/40 transition-all duration-300"
                        >
                            <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                            View Projects
                        </motion.a>

                        <motion.a
                            href={siteConfig.resumeUrl}
                            download
                            whileHover={{ scale: 1.05, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-lg hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                        >
                            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                            Download Resume
                        </motion.a>
                    </div>
                </motion.div>

                {/* Right side: Image with lightweight floating animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 30 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                    }}
                    transition={{
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 },
                        x: { duration: 0.5 }
                    }}
                    className="flex-shrink-0 relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mx-auto lg:mx-0"
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="w-full h-full rounded-full p-1 bg-gradient-to-tr from-sky-400 to-teal-400 shadow-xl shadow-cyan-500/20"
                    >
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-slate-900 relative group">
                            <img
                                src="/Harshit_Pic.webp"
                                alt="Harshit Upadhyay"
                                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute -bottom-24 left-1/2 -translate-x-1/2"
                >
                    <a
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                    >
                        <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll Down</span>
                        <ArrowDown size={20} className="animate-bounce" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
