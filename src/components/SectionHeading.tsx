"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] gradient-text inline-block">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
            <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
        </motion.div>
    );
}
