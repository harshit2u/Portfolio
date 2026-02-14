"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, ExternalLink, Download } from "lucide-react";
import { siteConfig } from "@/data/content";
import ParticleCanvas from "./ParticleCanvas";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-indigo-600/10 to-navy-950 animate-gradient-shift" />

            {/* Floating blurred orbs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed" />
            <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-indigo-400/15 rounded-full blur-2xl animate-pulse-glow" />

            {/* Particle canvas */}
            <ParticleCanvas />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="text-indigo-400 text-sm sm:text-base tracking-widest uppercase mb-4 font-medium">
                        Welcome to my portfolio
                    </p>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-6">
                        <span className="gradient-text">
                            <TypeAnimation
                                sequence={siteConfig.heroTyping}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                                cursor={true}
                            />
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        {siteConfig.tagline}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
                        >
                            <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
                            View Projects
                        </motion.a>

                        <motion.a
                            href={siteConfig.resumeUrl}
                            download
                            whileHover={{ scale: 1.05, rotateX: -5, rotateY: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-indigo-500/30 text-slate-200 font-semibold hover:border-indigo-500/60 transition-colors"
                        >
                            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                            Download Resume
                        </motion.a>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2"
                >
                    <a
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex flex-col items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                        <span className="text-xs tracking-widest uppercase">Scroll</span>
                        <ArrowDown size={18} className="animate-scroll" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
