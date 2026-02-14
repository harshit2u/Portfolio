"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Award, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "./SectionHeading";
import { experiences } from "@/data/content";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Experience() {
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!lineRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && lineRef.current) {
                    gsap.fromTo(
                        lineRef.current,
                        { scaleY: 0 },
                        { scaleY: 1, duration: 1.8, ease: "power3.out" }
                    );
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(lineRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" className="py-24 lg:py-32 relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title="Experience" subtitle="My professional journey" />

                <div className="relative">
                    {/* Animated line */}
                    <div
                        ref={lineRef}
                        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-500 origin-top"
                        style={{ transform: "scaleY(0)" }}
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="space-y-12"
                    >
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                variants={itemVariants}
                                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
                                    }`}
                            >
                                {/* Dot on timeline */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 300 }}
                                    className={`absolute left-6 md:left-1/2 top-2 w-4 h-4 rounded-full border-2 border-indigo-500 bg-navy-950 -translate-x-1/2 z-10 ${exp.current ? "shadow-[0_0_16px_rgba(99,102,241,0.6)]" : ""
                                        }`}
                                >
                                    {exp.current && (
                                        <span className="absolute inset-0 rounded-full bg-indigo-500/40 animate-ping" />
                                    )}
                                </motion.div>

                                {/* Spacer for layout */}
                                <div className="hidden md:block md:w-1/2" />

                                {/* Card */}
                                <div className="ml-14 md:ml-0 md:w-1/2">
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="glass rounded-2xl p-6 glow-border group relative overflow-hidden"
                                    >
                                        {/* Hover shimmer */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                        <div className="relative z-10">
                                            <div className="flex items-start gap-3 mb-3">
                                                <motion.div
                                                    className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0"
                                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                                >
                                                    {exp.logo ? (
                                                        <img
                                                            src={exp.logo}
                                                            alt={exp.company}
                                                            className="w-full h-full object-contain p-1"
                                                        />
                                                    ) : exp.id === "hackathon" ? (
                                                        <Award size={18} className="text-yellow-400" />
                                                    ) : (
                                                        <Briefcase size={18} className="text-indigo-400" />
                                                    )}
                                                </motion.div>
                                                <div className={`${i % 2 === 0 ? "md:text-right md:ml-auto" : ""}`}>
                                                    <h3 className="font-bold text-white text-lg group-hover:gradient-text transition-all duration-300">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-indigo-400 text-sm flex items-center gap-1">
                                                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        {exp.company}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className={`text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors ${i % 2 === 0 ? "md:text-right" : ""}`}>
                                                {exp.description}
                                            </p>

                                            <div className={`mt-3 flex items-center gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                                                {exp.current && (
                                                    <span className="px-2.5 py-0.5 text-[11px] rounded-full bg-green-500/15 text-green-400 border border-green-500/20 animate-pulse">
                                                        Current
                                                    </span>
                                                )}
                                                <span className="text-xs text-slate-500">{exp.period}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
