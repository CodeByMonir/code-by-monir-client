"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaJs, FaReact } from "react-icons/fa";
import { FiDownload, FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiTailwindcss } from "react-icons/si";

export default function HeroSection() {
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
                duration: 4000, // 4 seconds per full loop
                iterations: Infinity,
                easing: "linear"
            }
        );

        return () => animation.cancel(); // Clean up animation on unmount
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
        <section className="w-full mt-20 flex flex-col items-center justify-center px-6 pb-12">


            <motion.div
                className="inline-block px-4 py-1 rounded-full mt-2 mb-4 md:mb-16 text-sm font-medium bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/20 dark:border-sky-500/30"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Code By Monir
            </motion.div>

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

                            {/* 🔄 JavaScript Driven RGB Light Effect (Centered & Spinning) */}
                            <div
                                ref={borderRef}
                                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] bg-[conic-gradient(#f00,#0f0,#00f,#f00)] opacity-80 group-hover:opacity-100 transition duration-500 rounded-2xl blur-[2px]"
                                style={{ transform: "translate(-50%, -50%)" }}
                            />

                            {/* The Actual Image Frame */}
                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden dark:bg-gray-900 bg-indigo-50 shadow-2xl z-10">
                                <Image
                                    src="/profile.webp"
                                    alt="Monir Hossen"
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
                            {/* Pulsing Status Dot */}
                            <div className="relative flex h-4 w-4 items-center justify-center">
                                <motion.span
                                    className="absolute inline-flex h-full w-full rounded-full bg-[#ff6b6b]"
                                    animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <span className="absolute h-3 w-3 rounded-full bg-[#ff6b6b] opacity-60"></span>
                                <span className="relative h-1.5 w-1.5 rounded-full bg-[#ff6b6b]"></span>
                            </div>

                            {/* Subtle Glowing & Breathing Badge Text */}
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
                            {/* Download Resume Button */}
                            <a
                                href="/Monir_Hossen_Mern_Resume.pdf"
                                download="Monir_Hossen_Mern_Resume.pdf"
                                className="w-full sm:w-auto px-6 py-3 rounded-xl  bg-slate-50 dark:bg-slate-900/60 dark:text-slate-300 text-slate-700 font-medium border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 transition-all hover:bg-slate-50 hover:text-indigo-600 hover:scale-110 dark:hover:bg-slate-800/50 dark:hover:text-indigo-400 active:scale-95 cursor-pointer shadow-sm"
                            >Resume <FiDownload />
                            </a>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                <a href="https://github.com/CodeByMonir" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all hover:scale-110" title="GitHub">
                                    <FiGithub size={20} />
                                </a>
                                <a href="https://linkedin.com/in/codebymonir" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all hover:scale-110" title="LinkedIn">
                                    <FiLinkedin size={20} />
                                </a>
                                <a href="https://facebook.com/moniratmeta" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all hover:scale-110" title="Facebook">
                                    <FiFacebook size={20} />
                                </a>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}