"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    CheckCircle,
    Linkedin,
    Github,
    Mail,
    Phone,
    Loader2,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import emailjs from "@emailjs/browser";
import ShootingStars from "./ShootingStars";
import { siteConfig } from "@/data/content";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                formRef.current!,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            setStatus("success");
            setForm({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 4000);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    const socials = [
        { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
        { icon: Github, href: siteConfig.github, label: "GitHub" },
        { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
        { icon: Phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}`, label: "Phone" },
    ];

    return (
        <section id="contact" className="py-24 lg:py-32 relative">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <ShootingStars />

            <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title="Get In Touch" subtitle="Let's work together" />

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <motion.form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass rounded-2xl p-8 space-y-6"
                    >
                        {/* Name */}
                        <div className="relative group">
                            <input
                                type="text"
                                id="name"
                                name="user_name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                placeholder=" "
                                className="peer w-full bg-transparent border border-slate-700 rounded-xl px-4 pt-6 pb-2 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-4 top-2 text-xs text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all"
                            >
                                Name
                            </label>
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <input
                                type="email"
                                id="email"
                                name="user_email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                placeholder=" "
                                className="peer w-full bg-transparent border border-slate-700 rounded-xl px-4 pt-6 pb-2 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-2 text-xs text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all"
                            >
                                Email
                            </label>
                        </div>

                        {/* Message */}
                        <div className="relative group">
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                required
                                placeholder=" "
                                className="peer w-full bg-transparent border border-slate-700 rounded-xl px-4 pt-6 pb-2 text-white focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                            />
                            <label
                                htmlFor="message"
                                className="absolute left-4 top-2 text-xs text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all"
                            >
                                Message
                            </label>
                        </div>

                        {/* Submit */}
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 text-green-400 font-medium py-3"
                                >
                                    <CheckCircle size={20} />
                                    Message sent successfully!
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="submit"
                                    type="submit"
                                    disabled={status === "sending"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow disabled:opacity-50"
                                >
                                    {status === "sending" ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                    {status === "sending" ? "Sending..." : "Send Message"}
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </motion.form>

                    {/* Contact info & socials */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
                                Let&apos;s Connect
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                I&apos;m always open to new opportunities, collaborations, and
                                interesting projects. Whether you have a question or just want to
                                say hi — feel free to reach out!
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="flex items-center gap-4 glass rounded-xl p-4 hover:border-indigo-500/40 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                    <Mail size={18} className="text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Email</p>
                                    <p className="text-white text-sm group-hover:text-indigo-300 transition-colors">
                                        {siteConfig.email}
                                    </p>
                                </div>
                            </a>

                            <a
                                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                                className="flex items-center gap-4 glass rounded-xl p-4 hover:border-indigo-500/40 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                    <Phone size={18} className="text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Phone</p>
                                    <p className="text-white text-sm group-hover:text-indigo-300 transition-colors">
                                        {siteConfig.phone}
                                    </p>
                                </div>
                            </a>
                        </div>

                        {/* Social links */}
                        <div className="flex gap-3">
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                                    aria-label={s.label}
                                >
                                    <s.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
