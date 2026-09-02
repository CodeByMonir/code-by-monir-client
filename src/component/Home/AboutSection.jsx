"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function About() {
    const [activeSkill, setActiveSkill] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const root = window.document.documentElement;
        const syncTheme = () => setIsDarkMode(root.classList.contains("dark"));

        syncTheme();

        const observer = new MutationObserver(syncTheme);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    const techStack = [
        {
            name: "React",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            proficiency: 90,
            category: "Frontend",
        },
        {
            name: "Next.js",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
            proficiency: 88,
            category: "Frontend",
        },
        {
            name: "Node.js",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            proficiency: 85,
            category: "Backend",
        },
        {
            name: "Express",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
            proficiency: 85,
            category: "Backend",
        },
        {
            name: "MongoDB",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
            proficiency: 88,
            category: "Database",
        },
        {
            name: "Tailwind",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
            proficiency: 92,
            category: "Frontend",
        },
        {
            name: "Git",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
            proficiency: 85,
            category: "Tools",
        },
    ];

    const personalInfo = {
        name: "Monir Hossen",
        role: "Full Stack Web Developer",
        location: "Bangladesh",
        experience: "3+ years",
        specialization: "MERN Stack Development",
    };

    const coreValues = [
        {
            icon: "⚡",
            title: "Fast Performance",
            description: "Optimized applications with 90+ Lighthouse scores",
        },
        {
            icon: "🔒",
            title: "Secure Solutions",
            description: "Implementing best security practices and authentication",
        },
        {
            icon: "📱",
            title: "Responsive Design",
            description: "Pixel-perfect interfaces for all devices",
        },
        {
            icon: "🚀",
            title: "Scalable Architecture",
            description: "Future-proof code structure and patterns",
        },
    ];

    const skillCategories = [
        { icon: "🎨", title: "Frontend", skills: ["React", "Next.js", "Tailwind CSS"] },
        { icon: "⚙️", title: "Backend", skills: ["Node.js", "Express.js", "REST APIs"] },
        { icon: "🗄️", title: "Database", skills: ["MongoDB", "Mongoose", "NoSQL"] },
        { icon: "🛠️", title: "Tools", skills: ["Git", "GitHub", "Vercel"] },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.92, x: -40 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    };

    const contentVariants = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    };

    const techStackVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3,
            },
        },
    };

    const techItemVariants = {
        hidden: { opacity: 0, scale: 0.85, y: 15 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
            },
        },
        hover: {
            scale: 1.04,
            y: -4,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
            },
        },
    };

    return (
        <motion.section
            id="about"
            ref={sectionRef}
            className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            {/* Hidden for SEO */}
            <div className="sr-only">
                <h1>About Monir Hossen | Full Stack Web Developer Portfolio</h1>
                <h2>MERN Stack Developer specializing in React, Next.js, Node.js, Express, MongoDB</h2>
            </div>

            {/* Ambient Background Glows */}
            <div
                className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-72 w-72 sm:h-96 sm:w-96 rounded-full blur-3xl opacity-50 dark:opacity-30 bg-sky-400/40"
                style={
                    isDarkMode
                        ? { background: "radial-gradient(circle, rgba(56,189,248,0.35), transparent 70%)" }
                        : {}
                }
            />
            <div
                className="pointer-events-none absolute top-1/2 -right-20 -z-10 h-80 w-80 sm:h-[450px] sm:w-[450px] rounded-full blur-3xl opacity-40 dark:opacity-20 bg-blue-400/30"
                style={
                    isDarkMode
                        ? { background: "radial-gradient(circle, rgba(96,165,250,0.3), transparent 70%)" }
                        : {}
                }
            />

            {/* Section Header */}
            <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20">
                <motion.div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/20 dark:border-sky-500/30 mb-4 shadow-sm backdrop-blur-sm"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span>✨</span> Get to Know Me
                </motion.div>

                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
                    variants={itemVariants}
                >
                    <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 bg-clip-text text-transparent">
                        About
                    </span>
                    <span className="text-slate-900 dark:text-slate-100"> Me</span>
                </motion.h2>

                <motion.h3
                    className="mt-3 text-sm sm:text-base md:text-lg font-medium text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
                    variants={itemVariants}
                >
                    {personalInfo.role} <span className="text-sky-500 font-normal">|</span> {personalInfo.specialization}
                </motion.h3>

                <motion.div
                    variants={itemVariants}
                    className="mx-auto mt-4 h-1 w-20 sm:w-24 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 shadow-sm"
                />
            </div>

            {/* Main Content - Two Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

                {/* Left Column: Image & Tech Stack (5 Columns) */}
                <motion.div
                    className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-8 sm:space-y-10"
                    variants={imageVariants}
                >
                    {/* Profile Card Container */}
                    <div className="relative group w-full max-w-sm sm:max-w-md mx-auto lg:mx-0">
                        {/* Ambient Image Glow */}
                        <div
                            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-400 to-blue-500 opacity-30 blur-xl transition-all duration-500 group-hover:opacity-50"
                            style={
                                isDarkMode
                                    ? { background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)" }
                                    : {}
                            }
                        />

                        {/* Stable Dashed Border Backdrop */}
                        <div className="absolute -inset-2 rounded-3xl border border-dashed border-sky-400/40 dark:border-sky-400/25 pointer-events-none" />

                        {/* Profile Image Frame */}
                        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-sky-400/20 bg-white/70 dark:bg-slate-900/80 shadow-xl backdrop-blur-md">
                            <Image
                                src="/about-image.webp"
                                alt="Monir Hossen - Full Stack Web Developer"
                                width={800}
                                height={800}
                                className="w-full h-auto object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                priority
                            />
                        </div>

                        {/* Floating Experience Badge */}
                        <div className="absolute -bottom-4 -right-2 sm:-right-4 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-sky-400/30 shadow-lg shadow-sky-500/10 backdrop-blur-md flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-500 font-bold text-lg">
                                3+
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">
                                    {personalInfo.experience}
                                </p>
                                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                                    Experience
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack Arsenal */}
                    <motion.div
                        className="w-full pt-4"
                        variants={techStackVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Tech Header */}
                        <motion.div className="mb-4 text-center lg:text-left" variants={itemVariants}>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                                My{" "}
                                <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                                    Tech Arsenal
                                </span>
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Technologies I work with daily
                            </p>
                        </motion.div>

                        {/* Tech Cards Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3">
                            {techStack.map((tech) => (
                                <motion.div
                                    key={tech.name}
                                    variants={techItemVariants}
                                    whileHover="hover"
                                    className="group relative"
                                >
                                    <div
                                        className="relative flex flex-col justify-between p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm backdrop-blur-md transition-colors duration-200 hover:border-sky-400/50 dark:hover:border-sky-400/40"
                                    >
                                        <div className="flex items-center gap-2.5 mb-2.5">
                                            <motion.img
                                                src={tech.url}
                                                alt={`${tech.name} logo`}
                                                className="h-7 w-7 rounded-lg p-1 border border-sky-400/20 bg-sky-400/5 dark:bg-sky-400/10 object-contain"
                                                whileHover={{
                                                    rotate: 360,
                                                    scale: 1.15,
                                                    transition: { duration: 0.5, ease: "easeInOut" },
                                                }}
                                            />
                                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                                                {tech.name}
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full">
                                            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                                                <span>Proficiency</span>
                                                <span className="font-semibold text-sky-500">{tech.proficiency}%</span>
                                            </div>
                                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                                <motion.div
                                                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${tech.proficiency}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Bio & Core Values (7 Columns) */}
                <motion.div
                    className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8"
                    variants={contentVariants}
                >
                    {/* Bio Description Box */}
                    <motion.div
                        variants={itemVariants}
                        className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm backdrop-blur-md space-y-4"
                    >
                        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                            I&apos;m{" "}
                            <span className="font-bold text-sky-600 dark:text-sky-400">
                                {personalInfo.name}
                            </span>
                            , a dedicated{" "}
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {personalInfo.role}
                            </span>{" "}
                            committed to architecting fast, accessible, and high-impact digital solutions.
                        </p>

                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            With <span className="font-medium text-sky-600 dark:text-sky-400">{personalInfo.experience}</span> of focused industry experience, I specialize in full-lifecycle development with the{" "}
                            <span className="font-medium text-slate-800 dark:text-slate-200">MERN Stack</span> (MongoDB, Express.js, React, Node.js) and modern production frameworks like{" "}
                            <span className="font-medium text-slate-800 dark:text-slate-200">Next.js</span>.
                        </p>

                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            My engineering approach centers around{" "}
                            <span className="font-medium text-sky-600 dark:text-sky-400">clean code architecture</span>,{" "}
                            <span className="font-medium text-sky-600 dark:text-sky-400">responsive fluidity</span>, and{" "}
                            <span className="font-medium text-sky-600 dark:text-sky-400">SEO & Core Web Vitals optimization</span>.
                        </p>
                    </motion.div>

                    {/* Core Values / Strengths Grid */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500">
                            Core Principles
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {coreValues.map((value, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm transition-all duration-300 cursor-default"
                                    whileHover={{
                                        x: 4,
                                        borderColor: "rgba(56, 189, 248, 0.4)",
                                    }}
                                    onMouseEnter={() => setActiveSkill(index)}
                                    onMouseLeave={() => setActiveSkill(null)}
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-xl">
                                        {value.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {value.title}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                                            {value.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Categorized Skills Breakdown */}
                    <motion.div
                        className="p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-sm backdrop-blur-md space-y-3"
                        variants={itemVariants}
                    >
                        <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-2">
                            Domain Expertise
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                            {skillCategories.map((category, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/60 transition-colors hover:border-sky-400/40"
                                    whileHover={{ x: 4 }}
                                >
                                    <span className="text-lg shrink-0">{category.icon}</span>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                                            {category.title}
                                        </span>
                                        <span className="text-xs text-slate-600 dark:text-slate-400 truncate font-medium mt-0.5">
                                            {category.skills.join(" • ")}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </motion.section>
    );
}