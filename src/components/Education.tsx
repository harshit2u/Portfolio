"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, Star } from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "./SectionHeading";
import { education } from "@/data/content";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconPerIndex = [GraduationCap, Trophy, Star];

export default function Education() {
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!lineRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && lineRef.current) {
                    gsap.fromTo(
                        lineRef.current,
                        { scaleY: 0 },
                        { scaleY: 1, duration: 1.5, ease: "power3.out" }
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
        <section id="education" className="py-24 lg:py-32 relative overflow-hidden">
            <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title="Education" subtitle="Academic background" />

                <div className="relative">
                    {/* Animated timeline line */}
                    <div
                        ref={lineRef}
                        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-indigo-500 to-cyan-400 origin-top"
                        style={{ transform: "scaleY(0)" }}
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="space-y-12"
                    >
                        {education.map((edu, i) => {
                            const Icon = iconPerIndex[i] ?? GraduationCap;
                            return (
                                <motion.div
                                    key={edu.degree}
                                    variants={itemVariants}
                                    className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
                                        }`}
                                >
                                    {/* Dot on timeline */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 300 }}
                                        className="absolute left-6 md:left-1/2 top-2 w-4 h-4 rounded-full border-2 border-cyan-400 bg-navy-950 -translate-x-1/2 z-10"
                                    >
                                        {i === 0 && (
                                            <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
                                        )}
                                    </motion.div>

                                    {/* Spacer */}
                                    <div className="hidden md:block md:w-1/2" />

                                    {/* Card */}
                                    <div className="ml-14 md:ml-0 md:w-1/2">
                                        <motion.div
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="glass rounded-2xl p-6 glow-border group relative overflow-hidden"
                                        >
                                            {/* Animated top accent */}
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                            {/* Hover shimmer */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                            <div className="relative z-10">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <motion.div
                                                        className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 overflow-hidden"
                                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                                    >
                                                        {edu.logo ? (
                                                            <img
                                                                src={edu.logo}
                                                                alt={edu.institution}
                                                                className="w-full h-full object-contain p-0.5"
                                                            />
                                                        ) : (
                                                            <Icon size={18} className="text-cyan-400" />
                                                        )}
                                                    </motion.div>
                                                    <div className={`${i % 2 === 0 ? "md:text-right md:ml-auto" : ""}`}>
                                                        <h3 className="font-bold text-white text-lg group-hover:gradient-text transition-all duration-300">
                                                            {edu.degree}
                                                        </h3>
                                                        <p className="text-indigo-400 text-sm">{edu.institution}</p>
                                                    </div>
                                                </div>

                                                <div className={`mt-3 flex items-center gap-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                                                    <motion.span
                                                        className="text-xl font-bold gradient-text-alt"
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ type: "spring", stiffness: 400 }}
                                                    >
                                                        {edu.score}
                                                    </motion.span>
                                                    <span className="text-xs text-slate-500 px-2.5 py-0.5 rounded-full bg-slate-800/50">
                                                        {edu.year}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
