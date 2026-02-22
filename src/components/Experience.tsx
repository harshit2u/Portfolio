"use client";

import { motion } from "framer-motion";
import { Briefcase, Award, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ParticleCanvas from "./ParticleCanvas";
import { experiences } from "@/data/content";

export default function Experience() {
    // Group experiences into rows of 2 for the snake desktop layout
    const rows = [];
    for (let i = 0; i < experiences.length; i += 2) {
        rows.push(experiences.slice(i, i + 2));
    }

    return (
        <section id="experience" className="py-24 lg:py-32 relative overflow-hidden">
            <ParticleCanvas />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <SectionHeading title="Experience" subtitle="My professional journey" />

                <div className="relative mt-8 md:mt-16 flex flex-col gap-4 md:gap-12 w-full">
                    {/* Snake Timeline Grid */}
                    {rows.map((row, rowIndex) => {
                        const isEvenRow = rowIndex % 2 === 0;

                        return (
                            <div
                                key={rowIndex}
                                className={`flex flex-row gap-3 md:gap-12 w-full relative ${!isEvenRow ? "flex-row-reverse" : ""
                                    }`}
                            >
                                {row.map((exp, colIndex) => {
                                    const absoluteIndex = rowIndex * 2 + colIndex;
                                    const isLastItem = absoluteIndex === experiences.length - 1;
                                    const isEvenIndex = absoluteIndex % 2 === 0;

                                    return (
                                        <div key={exp.id} className="flex-1 w-full relative flex group z-10">
                                            {/* Connection Lines */}
                                            {!isLastItem && (
                                                <>
                                                    {isEvenIndex ? (
                                                        // Horizontal connection connecting cards in the same row
                                                        <div className={`absolute top-[50%] h-[3px] -translate-y-1/2 -z-10 ${isEvenRow ? "left-full w-3 md:w-12" : "right-full w-3 md:w-12"}`}>
                                                            <motion.div
                                                                initial={{ scaleX: 0 }}
                                                                whileInView={{ scaleX: 1 }}
                                                                viewport={{ once: true, margin: "-100px" }}
                                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                                className={`w-full h-full rounded-full ${isEvenRow
                                                                    ? "origin-left bg-gradient-to-r from-indigo-500 to-cyan-400"
                                                                    : "origin-right bg-gradient-to-l from-indigo-500 to-cyan-400"
                                                                    }`}
                                                            />
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                whileInView={{ opacity: 1, scale: 1 }}
                                                                viewport={{ once: true, margin: "-100px" }}
                                                                transition={{ duration: 0.3, delay: 0.7 }}
                                                                className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] ${isEvenRow ? "-right-0.5 md:-right-1 bg-cyan-400" : "-left-0.5 md:-left-1 bg-cyan-400"
                                                                    }`}
                                                            />
                                                        </div>
                                                    ) : (
                                                        // Vertical connection connecting cards across rows downwards
                                                        <div className="absolute left-1/2 top-full w-[2px] md:w-[3px] h-4 md:h-12 -translate-x-1/2 -z-10">
                                                            <motion.div
                                                                initial={{ scaleY: 0 }}
                                                                whileInView={{ scaleY: 1 }}
                                                                viewport={{ once: true, margin: "-50px" }}
                                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                                className="w-full h-full origin-top rounded-full bg-gradient-to-b from-cyan-400 to-indigo-500"
                                                            />
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                whileInView={{ opacity: 1, scale: 1 }}
                                                                viewport={{ once: true, margin: "-50px" }}
                                                                transition={{ duration: 0.3, delay: 0.7 }}
                                                                className="absolute -bottom-0.5 md:-bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                                                            />
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {/* Card Content inside */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                className={`glass w-full rounded-2xl p-3 sm:p-6 md:p-8 glow-border relative overflow-hidden flex flex-col justify-between hover:z-20 ${exp.current ? "border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : ""}`}
                                            >
                                                {/* Hover shimmer */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                                <div className="relative z-10 w-full flex flex-col h-full bg-transparent">
                                                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 mb-2 sm:mb-4">
                                                        <motion.div
                                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0"
                                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                                        >
                                                            {exp.logo ? (
                                                                Array.isArray(exp.logo) ? (
                                                                    exp.logo.map((lg, idx) => (
                                                                        <img
                                                                            key={idx}
                                                                            src={lg}
                                                                            alt={exp.company}
                                                                            className="w-full h-full object-contain p-1.5 sm:p-1.5"
                                                                        />
                                                                    ))
                                                                ) : (
                                                                    <img
                                                                        src={exp.logo}
                                                                        alt={exp.company}
                                                                        className="w-full h-full object-contain p-2 sm:p-2"
                                                                    />
                                                                )
                                                            ) : exp.id === "hackathon" ? (
                                                                <Award size={18} className="text-yellow-400 sm:w-[20px] sm:h-[20px]" />
                                                            ) : (
                                                                <Briefcase size={18} className="text-indigo-400 sm:w-[20px] sm:h-[20px]" />
                                                            )}
                                                        </motion.div>
                                                        <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start justify-center">
                                                            <h3 className="font-bold text-white text-[12px] sm:text-lg leading-tight group-hover:gradient-text transition-all duration-300 line-clamp-2">
                                                                {exp.role}
                                                            </h3>
                                                            <p className="text-indigo-400 text-[10px] sm:text-sm flex items-center gap-1 mt-0.5 sm:mt-1 line-clamp-2">
                                                                <ChevronRight size={12} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0 hidden sm:block" />
                                                                {exp.company}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="text-slate-400 text-[9px] sm:text-sm leading-tight sm:leading-relaxed group-hover:text-slate-300 transition-colors flex-1 line-clamp-3 md:line-clamp-4">
                                                        {exp.description}
                                                    </p>

                                                    <div className="mt-3 sm:mt-5 flex items-center gap-1.5 sm:gap-2 pt-2 sm:pt-4 border-t border-slate-700/50">
                                                        {exp.current && (
                                                            <span className="relative flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] overflow-hidden group/badge">
                                                                <span className="absolute inset-0 bg-emerald-500/20 animate-pulse-glow" />
                                                                <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                                                                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                                                                    </span>
                                                                    Current
                                                                </span>
                                                            </span>
                                                        )}
                                                        <span className="text-[9px] sm:text-xs font-semibold text-slate-500 bg-slate-800/50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">{exp.period}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
