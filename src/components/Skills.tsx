"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiMongodb,
    SiExpress,
    SiReact,
    SiNodedotjs,
    SiPython,
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss3,
    SiMysql,
    SiFirebase,
    SiGit,
    SiGithub,
    SiFigma,
    SiTailwindcss,
    SiPostman,
    SiVercel,
    SiNetlify,
    SiSpringboot,
    SiPostgresql,
    SiDotnet,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa";
import { TbBrandCpp, TbBrandReactNative, TbLetterC } from "react-icons/tb";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/data/content";
import type { IconType } from "react-icons";

/* ── Icon + color mapping per skill ────────── */
const skillMeta: Record<string, { icon: IconType; color: string }> = {
    MongoDB: { icon: SiMongodb, color: "#47A248" },
    Express: { icon: SiExpress, color: "#FFFFFF" },
    React: { icon: SiReact, color: "#61DAFB" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    "React Native": { icon: TbBrandReactNative, color: "#61DAFB" },
    Python: { icon: SiPython, color: "#3776AB" },
    Java: { icon: FaJava, color: "#ED8B00" },
    C: { icon: TbLetterC, color: "#A8B9CC" },
    "C++": { icon: TbBrandCpp, color: "#00599C" },
    "C#": { icon: SiDotnet, color: "#512BD4" },
    HTML: { icon: SiHtml5, color: "#E34F26" },
    CSS: { icon: SiCss3, color: "#1572B6" },
    JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
    TypeScript: { icon: SiTypescript, color: "#3178C6" },
    MySQL: { icon: SiMysql, color: "#4479A1" },
    Firebase: { icon: SiFirebase, color: "#FFCA28" },
    PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
    "Spring Boot": { icon: SiSpringboot, color: "#6DB33F" },
    Git: { icon: SiGit, color: "#F05032" },
    GitHub: { icon: SiGithub, color: "#FFFFFF" },
    "VS Code": { icon: VscCode, color: "#007ACC" },
    Postman: { icon: SiPostman, color: "#FF6C37" },
    Compass: { icon: SiMongodb, color: "#47A248" },
    Vercel: { icon: SiVercel, color: "#FFFFFF" },
    Netlify: { icon: SiNetlify, color: "#00C7B7" },
    Figma: { icon: SiFigma, color: "#F24E1E" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
};

/* ── Animation variants ────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Skills() {
    const allCategories = ["All", ...skillCategories.map((c) => c.category)];
    const [active, setActive] = useState("All");

    const filtered =
        active === "All"
            ? skillCategories
            : skillCategories.filter((c) => c.category === active);

    return (
        <section id="skills" className="py-24 lg:py-32 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/4 left-0 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title="Skills" subtitle="Technologies I work with" />

                {/* Filter tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-14">
                    {allCategories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setActive(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${active === cat
                                ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
                                : "glass text-slate-300 hover:text-white hover:border-indigo-500/40"
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Skill grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filtered.map((category) => (
                            <motion.div
                                key={category.category}
                                variants={cardVariants}
                                whileHover={{ y: -5 }}
                                className="glass glow-border rounded-2xl p-6 space-y-5 transition-all duration-300"
                            >
                                <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-heading)] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                                    {category.category}
                                </h3>

                                {category.skills.map((skill) => {
                                    const meta = skillMeta[skill.name];
                                    const Icon = meta?.icon;
                                    const iconColor = meta?.color ?? "#818cf8";

                                    return (
                                        <motion.div
                                            key={skill.name}
                                            className="group cursor-default"
                                            whileHover={{ x: 4 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <div className="flex items-center gap-2.5">
                                                    {/* Tech icon */}
                                                    {Icon && (
                                                        <motion.div
                                                            whileHover={{ scale: 1.3, rotate: 10 }}
                                                            transition={{ type: "spring", stiffness: 400 }}
                                                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                                                            style={{
                                                                backgroundColor: `${iconColor}15`,
                                                            }}
                                                        >
                                                            <Icon
                                                                size={16}
                                                                style={{ color: iconColor }}
                                                                className="group-hover:drop-shadow-[0_0_6px_currentColor] transition-all duration-300"
                                                            />
                                                        </motion.div>
                                                    )}
                                                    <span className="text-slate-300 group-hover:text-white transition-colors duration-200 font-medium">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                                <motion.span
                                                    className="text-slate-500 text-xs tabular-nums"
                                                    initial={{ opacity: 0.6 }}
                                                    whileHover={{ opacity: 1, scale: 1.1 }}
                                                >
                                                    {skill.level}%
                                                </motion.span>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="h-2 bg-navy-800/80 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                                    className="h-full rounded-full relative overflow-hidden"
                                                    style={{
                                                        background: `linear-gradient(90deg, ${iconColor}AA, ${iconColor})`,
                                                    }}
                                                >
                                                    {/* Shimmer effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Floating icon marquee at bottom */}
                <div className="mt-16 overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-navy-950 to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-navy-950 to-transparent z-10" />
                    <motion.div
                        className="flex gap-8 items-center"
                        animate={{ x: [0, -800] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        {[...Object.entries(skillMeta), ...Object.entries(skillMeta)].map(
                            ([name, { icon: Icon, color }], i) => (
                                <motion.div
                                    key={`${name}-${i}`}
                                    whileHover={{ scale: 1.4, y: -5 }}
                                    className="flex flex-col items-center gap-1.5 shrink-0 cursor-default group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300"
                                        style={{ backgroundColor: `${color}15` }}
                                    >
                                        <Icon
                                            size={22}
                                            style={{ color }}
                                            className="group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300"
                                        />
                                    </div>
                                    <span className="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">
                                        {name}
                                    </span>
                                </motion.div>
                            )
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
