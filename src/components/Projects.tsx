"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ExternalLink,
    X,
    ArrowUpRight,
    Hospital,
    Ticket,
    Heart,
    Globe,
    GraduationCap,
    ShieldAlert,
} from "lucide-react";
import {
    SiReact,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiFirebase,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiTailwindcss,
    SiPython,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import SectionHeading from "./SectionHeading";
import ParticleCanvas from "./ParticleCanvas";
import { projects, Project } from "@/data/content";
import type { IconType } from "react-icons";

/* ── Icon maps ─────────────────────────────── */
const projectIconMap: Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
> = {
    Hospital,
    Ticket,
    Heart,
    Globe,
    GraduationCap,
    ShieldAlert,
};

const techMeta: Record<string, { icon: IconType; color: string }> = {
    React: { icon: SiReact, color: "#61DAFB" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    Express: { icon: SiExpress, color: "#FFFFFF" },
    MongoDB: { icon: SiMongodb, color: "#47A248" },
    MySQL: { icon: SiMysql, color: "#4479A1" },
    Firebase: { icon: SiFirebase, color: "#FFCA28" },
    HTML: { icon: SiHtml5, color: "#E34F26" },
    CSS: { icon: SiCss3, color: "#1572B6" },
    JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
    "React Native": { icon: TbBrandReactNative, color: "#61DAFB" },
    Python: { icon: SiPython, color: "#3776AB" },
};

/* ── Stagger variants ──────────────────────── */
const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0 },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, damping: 20, stiffness: 150 },
    },
};

/* ── Modal ────────────────────────────────── */
function ProjectModal({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    const ProjectIcon = projectIconMap[project.icon];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-3xl max-w-lg w-full relative border border-indigo-500/20 overflow-hidden"
            >
                {/* Header: collage, single image, or gradient fallback */}
                <div
                    className={`relative h-64 ${project.image && project.image.length > 0 ? '' : `bg-gradient-to-br ${project.gradient}`} flex items-center justify-center overflow-hidden`}
                >
                    {project.image && project.image.length > 0 ? (
                        <div className="absolute inset-0 flex gap-px">
                            {project.image.map((src, idx) => (
                                <div key={idx} className="relative flex-1 overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={`${project.title} screenshot ${idx + 1}`}
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 left-4 w-20 h-20 border border-white/40 rounded-xl rotate-12" />
                                <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/40 rounded-full" />
                                <div className="absolute top-1/2 right-1/4 w-12 h-12 border border-white/30 rounded-lg -rotate-6" />
                            </div>
                            {ProjectIcon && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                >
                                    <ProjectIcon size={48} className="text-white relative z-10 drop-shadow-lg" />
                                </motion.div>
                            )}
                        </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className="p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-lg bg-black/30 hover:bg-black/50 text-white transition-all z-10"
                    >
                        <X size={18} />
                    </button>

                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-indigo-400 uppercase tracking-wider font-medium"
                    >
                        {project.category}
                    </motion.span>

                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] mt-2 mb-4"
                    >
                        {project.title}
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 leading-relaxed"
                    >
                        {project.description}
                    </motion.p>

                    {/* Tech with icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 flex flex-wrap gap-2.5"
                    >
                        {project.techStack.map((t) => {
                            const meta = techMeta[t];
                            const Icon = meta?.icon;
                            return (
                                <span
                                    key={t}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border"
                                    style={{
                                        backgroundColor: `${meta?.color ?? "#6366f1"}10`,
                                        borderColor: `${meta?.color ?? "#6366f1"}30`,
                                        color: meta?.color ?? "#818cf8",
                                    }}
                                >
                                    {Icon && <Icon size={12} />}
                                    {t}
                                </span>
                            );
                        })}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 flex gap-3"
                    >
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                            >
                                <ExternalLink size={15} /> Live
                            </a>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}


export default function Projects() {
    const categories = [
        "All",
        ...Array.from(new Set(projects.map((p) => p.category))),
    ];
    const [filter, setFilter] = useState("All");
    const [selected, setSelected] = useState<Project | null>(null);

    const filtered =
        filter === "All" ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-indigo-600/5 to-navy-950 animate-gradient-shift pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-float" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none animate-float-delayed" />
            <ParticleCanvas />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
                <SectionHeading
                    title="Projects"
                    subtitle="A selection of my recent work"
                />

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-14">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
                                : "glass text-slate-300 hover:text-white"
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        variants={gridVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"
                    >
                        {filtered.map((project) => {
                            const ProjectIcon = projectIconMap[project.icon];

                            return (
                                <motion.div
                                    key={project.id}
                                    variants={cardVariants}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    onClick={() => setSelected(project)}
                                    className="glass rounded-2xl cursor-pointer group relative overflow-hidden border border-slate-700/50 hover:border-indigo-500/30 transition-colors"
                                >
                                    {/* ── Image/Gradient Header ── */}
                                    <div
                                        className={`relative h-28 sm:h-56 ${project.image && project.image.length > 0 ? '' : `bg-gradient-to-br ${project.gradient}`} overflow-hidden`}
                                    >
                                        {project.image && project.image.length > 0 ? (
                                            <div className="absolute inset-0 flex gap-px">
                                                {project.image.map((src, idx) => (
                                                    <div key={idx} className="relative flex-1 overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                                                        <Image
                                                            src={src}
                                                            alt={`${project.title} screenshot ${idx + 1}`}
                                                            fill
                                                            className="object-cover object-top"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                                                {/* Decorative geometric shapes */}
                                                <div className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500">
                                                    <div className="absolute top-3 left-3 w-16 h-16 border-2 border-white rounded-xl rotate-12 group-hover:rotate-[25deg] transition-transform duration-700" />
                                                    <div className="absolute bottom-3 right-3 w-12 h-12 border-2 border-white rounded-full group-hover:scale-125 transition-transform duration-700" />
                                                    <div className="absolute top-1/2 right-1/3 w-10 h-10 border-2 border-white rounded-lg -rotate-6 group-hover:rotate-6 transition-transform duration-700" />
                                                    <div className="absolute bottom-1/3 left-1/4 w-8 h-8 border-2 border-white rounded-md rotate-45 group-hover:scale-110 transition-transform duration-700" />
                                                </div>

                                                {/* Center icon */}
                                                {ProjectIcon && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <motion.div
                                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                                            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300"
                                                        >
                                                            <ProjectIcon
                                                                size={32}
                                                                className="text-white drop-shadow-lg"
                                                            />
                                                        </motion.div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* Bottom gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                        {/* Category pill */}
                                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 hidden sm:block">
                                            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] rounded-full bg-black/40 backdrop-blur-sm text-white font-medium uppercase tracking-wider">
                                                {project.category}
                                            </span>
                                        </div>

                                        {/* Hover arrow */}
                                        <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <ArrowUpRight size={16} className="text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── Card Body ── */}
                                    <div className="p-3 md:p-5">
                                        <h3 className="text-sm md:text-lg font-bold text-white font-[family-name:var(--font-heading)] group-hover:gradient-text transition-all duration-300 line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <p className="mt-1 md:mt-2 text-slate-400 text-[10px] md:text-sm line-clamp-2 md:line-clamp-2 leading-relaxed group-hover:text-slate-300 transition-colors">
                                            {project.description}
                                        </p>

                                        {/* Tech badges with icons */}
                                        <div className="mt-2 md:mt-4 flex flex-wrap gap-1 md:gap-1.5">
                                            {project.techStack.map((t) => {
                                                const meta = techMeta[t];
                                                const Icon = meta?.icon;
                                                return (
                                                    <motion.span
                                                        key={t}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 text-[8px] md:text-[10px] rounded-full border cursor-default"
                                                        style={{
                                                            backgroundColor: `${meta?.color ?? "#6366f1"}08`,
                                                            borderColor: `${meta?.color ?? "#6366f1"}25`,
                                                            color: meta?.color ?? "#818cf8",
                                                        }}
                                                    >
                                                        {Icon && <Icon size={9} />}
                                                        {t}
                                                    </motion.span>
                                                );
                                            })}
                                        </div>

                                        {/* Bottom action row */}
                                        <div className="mt-2 md:mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2 md:gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 md:translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-indigo-400 hover:text-cyan-400 transition-colors flex items-center gap-1 text-xs"
                                                    >
                                                        <ExternalLink size={12} /> Live
                                                    </a>
                                                )}
                                            </div>
                                            <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">
                                                Click to expand
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <ProjectModal project={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
