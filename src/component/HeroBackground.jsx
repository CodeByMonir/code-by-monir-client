"use client";

import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 0.1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const letterVariants = {
    hidden: (shouldReduceMotion) => ({
        opacity: 0,
        x: shouldReduceMotion ? 0 : 150,
    }),
    visible: (shouldReduceMotion) => ({
        opacity: 1,
        x: 0,
        transition: shouldReduceMotion
            ? { duration: 0.3 }
            : { type: "spring", damping: 15, stiffness: 60 },
    }),
};

export default function HeroBackgroundOnlyText({
    text = "CodeByMonir",
    className = "",
}) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div
            className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-500 bg-slate-100 dark:bg-slate-900 px-4 sm:px-6 ${className}`}
        >
            {/* Ambient Gradient & Orbs */}
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
                {/* Light / Dark Gradients */}
                <div className="absolute inset-0 opacity-100 dark:opacity-0 bg-linear-to-br from-slate-100 via-indigo-50 to-purple-100 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 transition-opacity duration-500" />

                {/* Ambient Glows */}
                <div className="absolute top-[-15%] left-[-15%] h-48 w-48 sm:h-72 sm:w-72 md:h-96 md:w-96 lg:h-128 lg:w-lg rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-3xl lg:blur-[130px] transform-gpu" />
                <div className="absolute bottom-[-15%] right-[-15%] h-48 w-48 sm:h-72 sm:w-72 md:h-96 md:w-96 lg:h-128 lg:w-lg rounded-full bg-purple-600/10 dark:bg-purple-600/15 blur-3xl lg:blur-[130px] transform-gpu" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 sm:hidden rounded-full bg-indigo-500/5 dark:bg-indigo-400/5 blur-2xl transform-gpu" />
            </div>

            {/* Decorative Watermark Text */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                aria-hidden="true"
                className="w-full flex justify-center items-center select-none pointer-events-none blur-[2px] z-10 px-4"
            >
                <span className="text-[clamp(2rem,11vw,3.5rem)] sm:text-[8vw] lg:text-[8.5vw] font-black tracking-tight text-center whitespace-nowrap text-slate-900 dark:text-white leading-[1.1]">
                    {Array.from(text).map((char, index) => (
                        <motion.span
                            key={`${char}-${index}`}
                            custom={shouldReduceMotion}
                            variants={letterVariants}
                            className="inline-block will-change-transform"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </span>
            </motion.div>
        </div>
    );
}