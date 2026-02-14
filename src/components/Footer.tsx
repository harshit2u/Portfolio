"use client";

import { Heart } from "lucide-react";
import { siteConfig, navLinks } from "@/data/content";

export default function Footer() {
    return (
        <footer className="border-t border-slate-800/50 py-10 mt-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <a href="#home" className="text-lg font-bold font-[family-name:var(--font-heading)]">
                        <span className="gradient-text">{siteConfig.name.split(" ")[0]}</span>
                        <span className="text-slate-500">
                            .{siteConfig.name.split(" ")[1]?.toLowerCase() ?? "dev"}
                        </span>
                    </a>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {navLinks.slice(0, 5).map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-slate-600">
                        © 2025 {siteConfig.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
