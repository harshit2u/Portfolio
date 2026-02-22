"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Monitor, Smartphone, Code, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ParticleCanvas from "./ParticleCanvas";
import { siteConfig, highlights, stats } from "@/data/content";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Shield,
    Monitor,
    Smartphone,
    Code,
};

/* ── Animated Counter ──────────────────────── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    const started = useRef(false);

    useEffect(() => {
        if (!inView || started.current) return;
        started.current = true;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [inView, target]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

/* ── Stagger variants ──────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

export default function About() {
    return (
        <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
            {/* Interactive Particle Background */}
            <ParticleCanvas />

            {/* Subtle bg glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none animate-float-delayed" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title="About Me" subtitle="Get to know my background and experience" />

                <div className="grid lg:grid-cols-2 gap-12 items-center lg:gap-16">
                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-5"
                    >
                        {siteConfig.bio.map((paragraph, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className="text-slate-300 leading-relaxed text-base lg:text-lg"
                            >
                                {paragraph}
                            </motion.p>
                        ))}

                        {/* Decorative badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-2 pt-2"
                        >
                            {["MERN Stack", "Firebase", "React Native", "Security", "Full-Stack"].map((tag) => (
                                <motion.span
                                    key={tag}
                                    whileHover={{ scale: 1.08, y: -2 }}
                                    className="px-3 py-1.5 text-xs rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 cursor-default hover:border-indigo-500/40 hover:bg-indigo-500/15 transition-all"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Highlight cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {highlights.map((h) => {
                            const IconComponent = iconMap[h.icon] || Code;
                            return (
                                <motion.div
                                    key={h.title}
                                    variants={itemVariants}
                                    whileHover={{ y: -6, scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="glass glass-hover glow-border rounded-2xl p-5 text-center cursor-default group relative overflow-hidden"
                                >
                                    {/* Hover shimmer */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                    <motion.div
                                        className="mx-auto mb-3 w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center relative"
                                        whileHover={{ rotate: 10 }}
                                    >
                                        <IconComponent size={22} className="text-indigo-400 group-hover:text-cyan-400 transition-colors duration-300" />
                                        {/* Pulse ring on hover */}
                                        <div className="absolute inset-0 rounded-xl border-2 border-indigo-500/0 group-hover:border-indigo-500/30 group-hover:scale-125 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                                    </motion.div>
                                    <h3 className="font-semibold text-white text-sm group-hover:gradient-text transition-all duration-300">
                                        {h.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs mt-1">{h.subtitle}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.04 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="glass rounded-2xl p-6 text-center group relative overflow-hidden cursor-default"
                        >
                            {/* Top accent stripe */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                            <motion.div
                                className="text-3xl sm:text-4xl font-bold gradient-text font-[family-name:var(--font-heading)]"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Counter target={stat.value} suffix={stat.suffix} />
                            </motion.div>
                            <div className="mt-2 flex items-center justify-center gap-1.5">
                                <Sparkles size={12} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
