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

export default function Skills() {
    const allCategories = ["All", ...skillCategories.map((c) => c.category)];
    const [active, setActive] = useState("All");

    const skillsToDisplay = active === "All"
        ? skillCategories.flatMap((c) => c.skills)
        : skillCategories.find((c) => c.category === active)?.skills || [];

    // Deduplicate skills by name
    const uniqueSkills = Array.from(new Set(skillsToDisplay.map((s) => s.name)))
        .map((name) => skillsToDisplay.find((s) => s.name === name)!);

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
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${active === cat
                                ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
                                : "glass text-slate-300 hover:text-white hover:border-indigo-500/40"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Skill grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                        {uniqueSkills.map((skill) => {
                            const meta = skillMeta[skill.name];
                            const Icon = meta?.icon;
                            const iconColor = meta?.color ?? "#818cf8";

                            return (
                                <motion.div
                                    key={skill.name}
                                    whileHover={{ y: -5, borderColor: iconColor }}
                                    className="glass glow-border rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 group border border-transparent hover:bg-slate-800/50"
                                >

                                    <span className="text-slate-300 font-medium text-sm text-center group-hover:text-white transition-colors duration-300">
                                        {skill.name}
                                    </span>
                                </motion.div>
                            );
                        })}
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
