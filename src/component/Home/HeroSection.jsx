"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, Home, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaJs, FaReact } from "react-icons/fa";
import { FiDownload, FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiTailwindcss } from "react-icons/si";

export default function HeroSection() {
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const resumePath = "/Monir_Hossen_Mern_Resume.pdf";

    // Reference to target the border element directly with vanilla JS
    const borderRef = useRef(null);

    useEffect(() => {
        const element = borderRef.current;
        if (!element) return;

        // Native JS Animation API for smooth, high-performance rendering
        const animation = element.animate(
            [
                { transform: "translate(-50%, -50%) rotate(360deg)" },
                { transform: "translate(-50%, -50%) rotate(0deg)" } // 360 to 0 = Counter-Clockwise
            ],
            {
                duration: 4000,
                iterations: Infinity,
                easing: "linear"
            }
        );

        return () => animation.cancel();
    }, []);

    // Framer Motion Animations for layout entry
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 60, damping: 15 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <section className="w-full mt-20 flex flex-col items-center justify-center px-6 pb-12 overflow-hidden relative">
            <div className="mt-2 mb-4 md:mb-16">
                <motion.div
                    className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/20 dark:border-sky-500/30"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex items-center gap-2">
                        <Home className="w-4 h-4" /> Code By Monir
                    </div>
                </motion.div>
                <motion.div
                    className="mx-auto mt-4 h-1 w-20 sm:w-24 rounded-full bg-linear-to-r from-sky-400 to-blue-500 shadow-sm"
                />
            </div>

            <h1 className="hidden">Monir Hossen</h1>

            <div>
                {/* Container: Balanced 50/50 Desktop Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                >
                    {/* 🚀 Left Side: Profile Image with Moving RGB Gradient */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex justify-center order-1 md:order-1"
                    >
                        <div className="relative group p-0.75 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                            <div
                                ref={borderRef}
                                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] bg-[conic-gradient(#f00,#0f0,#00f,#f00)] opacity-80 group-hover:opacity-100 transition duration-500 rounded-2xl blur-[2px]"
                                style={{ transform: "translate(-50%, -50%)" }}
                            />

                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden dark:bg-gray-900 bg-indigo-50 shadow-2xl z-10">
                                <Image
                                    src="/profile.webp"
                                    alt="Monir Hossen | Code By Monir | MERN Stack Developer | Full Stack Web Developer"
                                    height={958}
                                    width={958}
                                    className="drop-shadow-2xl w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* 🚀 Right Side: Content */}
                    <motion.div
                        variants={containerVariants}
                        className="space-y-6 text-center md:text-left order-2 md:order-2"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 shadow-sm"
                        >
                            <div className="relative flex h-4 w-4 items-center justify-center">
                                <motion.span
                                    className="absolute inline-flex h-full w-full rounded-full bg-[#ff6b6b]"
                                    animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <span className="absolute h-3 w-3 rounded-full bg-[#ff6b6b] opacity-60"></span>
                                <span className="relative h-1.5 w-1.5 rounded-full bg-[#ff6b6b]"></span>
                            </div>

                            <motion.span
                                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase"
                                animate={{
                                    opacity: [1, 0.75, 1],
                                    textShadow: [
                                        "0 0 0px rgba(99,102,241,0)",
                                        "0 0 8px rgba(99,102,241,0.4)",
                                        "0 0 0px rgba(99,102,241,0)",
                                    ],
                                }}
                                transition={{
                                    duration: 2.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                Available for Full-Time Roles
                            </motion.span>
                        </motion.div>

                        {/* Heading */}
                        <div className="space-y-2">
                            <motion.h2 variants={fadeInUp} className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400">
                                Hi there, I am
                            </motion.h2>
                            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-800 dark:text-white">
                                Monir Hossen
                            </motion.h1>
                            <h1 className="hidden">Monir Hossen</h1>
                            <motion.h3 variants={fadeInUp} className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                                MERN Stack Developer
                            </motion.h3>
                            <h1 className="hidden">MERN Stack Developer</h1>
                        </div>

                        {/* Slogan & Description */}
                        <motion.p variants={fadeInUp} className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
                            Turning Ideas into Responsive Reality. Specialized in engineering high-performance user interfaces, clean modular architectures, and smooth interactive ecosystems.
                        </motion.p>

                        {/* Core Tech Stack Section */}
                        <motion.div variants={fadeInUp} className="space-y-3 pt-2">
                            <h4 className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Tech Stack Hierarchy</h4>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 font-medium text-sm">
                                    <FaReact className="text-[#61DAFB] text-lg animate-[spin_20s_linear_infinite]" /> React JS
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 font-medium text-sm">
                                    <FaJs className="text-[#F7DF1E] bg-black text-lg rounded-sm" /> JavaScript
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 font-medium text-sm">
                                    <SiTailwindcss className="text-[#38BDF8] text-lg" /> Tailwind CSS
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons & Socials */}
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 items-center pt-4 justify-center md:justify-start">
                            {/* Trigger Resume Options Modal */}
                            <button
                                type="button"
                                onClick={() => setIsResumeModalOpen(true)}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 dark:text-slate-300 text-slate-700 font-medium border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 transition-all hover:bg-slate-50 hover:text-indigo-600 hover:scale-105 dark:hover:bg-slate-800/50 dark:hover:text-indigo-400 active:scale-95 cursor-pointer shadow-sm"
                            >
                                Resume <FiDownload />
                            </button>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                <a href="https://github.com/CodeByMonir" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all hover:scale-110" title="GitHub">
                                    <FiGithub size={20} />
                                </a>
                                <a href="https://linkedin.com/in/codebymonir" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all hover:scale-110" title="LinkedIn">
                                    <FiLinkedin size={20} />
                                </a>
                                <a href="https://facebook.com/moniratmeta" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all hover:scale-110" title="Facebook">
                                    <FiFacebook size={20} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Glassmorphism Resume Modal */}
            {/* Glassmorphism Resume Modal */}
            <AnimatePresence>
                {isResumeModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsResumeModalOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-sm rounded-3xl p-6 overflow-hidden bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                        >
                            {/* Subtle Glass Highlight Flares */}
                            <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/20 blur-2xl" />
                            <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-sky-500/20 blur-2xl" />

                            {/* Close Button (z-20 ensures it stays above z-10 content) */}
                            <button
                                type="button"
                                onClick={() => setIsResumeModalOpen(false)}
                                className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-700 dark:text-slate-300 border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X className="w-4 h-4 pointer-events-none" />
                            </button>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                                    Resume Options
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300/80 mb-6">
                                    Preview directly in your browser or save a copy offline.
                                </p>

                                <div className="flex flex-col gap-3">
                                    {/* View Action */}
                                    <a
                                        href={resumePath}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => setIsResumeModalOpen(false)}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-white bg-linear-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-500 hover:to-purple-500 border border-white/30 shadow-lg shadow-indigo-500/20 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Eye className="w-4 h-4" /> View Resume
                                    </a>

                                    {/* Download Action */}
                                    <a
                                        href={resumePath}
                                        download="Monir_Hossen_Mern_Resume.pdf"
                                        onClick={() => setIsResumeModalOpen(false)}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-slate-800 dark:text-white bg-white/15 dark:bg-white/5 hover:bg-white/25 dark:hover:bg-white/10 border border-white/30 dark:border-white/15 backdrop-blur-md shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <FiDownload className="w-4 h-4" /> Download PDF
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}