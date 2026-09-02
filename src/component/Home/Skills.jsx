// app/skills/page.jsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SkillsPage() {
    const skillCategories = [
        {
            id: "frontend",
            name: "Frontend Development",
            icon: "🎨",
            color: "#38BDF8",
            skills: [
                { id: "fe-react", name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 90, color: "#61DAFB", description: "Hooks, Context API, Redux" },
                { id: "fe-nextjs", name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", level: 88, color: "#38BDF8", description: "SSR, SSG, App Router" },
                { id: "fe-js", name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 92, color: "#F7DF1E", description: "ES6+, Async/Await" },
                { id: "fe-ts", name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: 85, color: "#3178C6", description: "Types, Interfaces, Generics" },
                { id: "fe-tailwind", name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: 95, color: "#06B6D4", description: "Responsive, Dark Mode" },
                { id: "fe-html", name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 95, color: "#E34F26", description: "Semantic, SEO Friendly" },
                { id: "fe-css", name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: 90, color: "#1572B6", description: "Flexbox, Grid, Animations" },
                { id: "fe-framer", name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg", level: 85, color: "#0055FF", description: "Animations, Gestures" },
            ]
        },
        {
            id: "backend",
            name: "Backend Development",
            icon: "⚙️",
            color: "#10B981",
            skills: [
                { id: "be-node", name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: 88, color: "#339933", description: "REST APIs, Microservices" },
                { id: "be-express", name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", level: 87, color: "#38BDF8", description: "Middleware, Routing" },
                { id: "be-jwt", name: "JWT", logo: "https://jwt.io/img/pic_logo.svg", level: 85, color: "#000000", description: "Authentication, Authorization" },
                { id: "be-rest", name: "REST APIs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", level: 90, color: "#FF6C37", description: "API Design, Documentation" },
            ]
        },
        {
            id: "database",
            name: "Database",
            icon: "🗄️",
            color: "#8B5CF6",
            skills: [
                { id: "db-mongo", name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 88, color: "#47A248", description: "Aggregation, Indexing" },
                { id: "db-mongoose", name: "Mongoose", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 85, color: "#880000", description: "Schemas, Models" },
                { id: "db-nosql", name: "NoSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 85, color: "#47A248", description: "Document Databases, Modeling" },
            ]
        },
        {
            id: "tools",
            name: "DevOps & Tools",
            icon: "🛠️",
            color: "#F59E0B",
            skills: [
                { id: "tool-git", name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 90, color: "#F05032", description: "Version Control, Branching" },
                { id: "tool-github", name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: 92, color: "#38BDF8", description: "Actions, Pages" },
                { id: "tool-vercel", name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", level: 88, color: "#38BDF8", description: "Deployment, CI/CD" },
                { id: "tool-netlify", name: "Netlify", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", level: 85, color: "#00C7B7", description: "Hosting, Serverless Functions" },
                { id: "tool-vscode", name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", level: 95, color: "#007ACC", description: "Extensions, Debugging" },
                { id: "tool-npm", name: "npm", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", level: 90, color: "#CB3837", description: "Package Management" },
            ]
        }
    ];

    const [activeCategory, setActiveCategory] = useState("all");
    const [hoveredSkillId, setHoveredSkillId] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        setMounted(true);
        const generatedParticles = [...Array(15)].map((_, i) => ({
            id: i,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: Math.random() * 5 + 3,
            delay: Math.random() * 5,
        }));
        setParticles(generatedParticles);
    }, []);

    const allSkills = skillCategories.flatMap(cat => cat.skills);
    const filteredSkills = activeCategory === "all"
        ? allSkills
        : skillCategories.find(cat => cat.id === activeCategory)?.skills || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.1,
            },
        },
    };

    const skillCardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 15 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 250,
                damping: 20,
            },
        },
        hover: {
            scale: 1.02,
            y: -4,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
            },
        },
    };

    const categoryVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 20 },
        },
        hover: {
            scale: 1.03,
            transition: { duration: 0.2 },
        },
    };

    return (
        <section className="relative py-16 md:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-transparent text-slate-700 dark:text-slate-100 transition-colors duration-300">
            {/* Ambient Background Particles */}
            {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute rounded-full bg-sky-500 dark:bg-sky-400"
                            style={{
                                width: p.width,
                                height: p.height,
                                opacity: 0.12,
                                left: p.left,
                                top: p.top,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.05, 0.15, 0.05],
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                delay: p.delay,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Background Glows */}
            <div
                className="hidden dark:block absolute top-12 left-1/2 -translate-x-1/2 w-96 md:max-w-xl h-72 rounded-full blur-[120px] opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.3), transparent)" }}
            />
            <div
                className="hidden dark:block absolute bottom-12 right-0 w-80 h-80 rounded-full blur-[120px] opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(96,165,250,0.2), transparent)" }}
            />

            <div className="relative z-10 space-y-10 sm:space-y-14">
                {/* Header */}
                <motion.div
                    className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/20 dark:border-sky-500/30 backdrop-blur-sm">
                        Technical Expertise
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent">
                            My Skills
                        </span>
                        <span className="text-slate-900 dark:text-slate-100"> & Arsenal</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl px-2">
                        Comprehensive technical toolkit for building modern, scalable, and responsive full-stack applications.
                    </p>

                    <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#60A5FA] mt-1" />
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.button
                        onClick={() => setActiveCategory("all")}
                        variants={categoryVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 border cursor-pointer ${activeCategory === "all"
                            ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white border-transparent shadow-md shadow-sky-500/20"
                            : "bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700 backdrop-blur-sm"
                            }`}
                    >
                        <span className="text-sm md:text-base">✨</span>
                        <span>All Skills</span>
                    </motion.button>

                    {skillCategories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            variants={categoryVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 border font-medium text-xs sm:text-sm cursor-pointer ${activeCategory === category.id
                                ? "text-white border-transparent shadow-md"
                                : "bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700 backdrop-blur-sm"
                                }`}
                            style={
                                activeCategory === category.id
                                    ? {
                                        background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`,
                                        boxShadow: `0 4px 14px 0 ${category.color}40`
                                    }
                                    : undefined
                            }
                        >
                            <span className="text-sm md:text-base">{category.icon}</span>
                            <span>{category.name}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid: Minimum 3 columns on all screen sizes */}
                <motion.div
                    className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill) => {
                            const isHovered = hoveredSkillId === skill.id;
                            const isSpecialLogo = ["Next.js", "Express.js", "GitHub", "Vercel"].includes(skill.name);

                            return (
                                <motion.div
                                    key={skill.id}
                                    variants={skillCardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    whileHover="hover"
                                    className="group relative cursor-pointer"
                                    onMouseEnter={() => setHoveredSkillId(skill.id)}
                                    onMouseLeave={() => setHoveredSkillId(null)}
                                >
                                    <div
                                        className="h-full flex flex-col justify-between p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-lg"
                                        style={{
                                            borderColor: isHovered ? skill.color : undefined,
                                            boxShadow: isHovered ? `0 10px 25px -5px ${skill.color}25` : undefined,
                                        }}
                                    >
                                        <div className="space-y-2 sm:space-y-3">
                                            {/* Skill Header */}
                                            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3">
                                                <div
                                                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center p-1.5 sm:p-2 shrink-0 transition-transform duration-300 group-hover:scale-105"
                                                    style={{
                                                        background: `${skill.color}15`,
                                                        border: `1px solid ${skill.color}30`,
                                                    }}
                                                >
                                                    <img
                                                        src={skill.logo}
                                                        alt={skill.name}
                                                        className={`w-full h-full object-contain ${isSpecialLogo ? "dark:invert" : ""}`}
                                                        loading="lazy"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1 w-full">
                                                    <h3
                                                        className="font-bold text-xs sm:text-base text-slate-800 dark:text-slate-100 truncate transition-colors"
                                                        style={{ color: isHovered ? skill.color : undefined }}
                                                    >
                                                        {skill.name}
                                                    </h3>
                                                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                                        {skill.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Proficiency & Percentage */}
                                            <div className="space-y-1 sm:space-y-1.5 pt-0.5 sm:pt-1">
                                                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                                                    <span className="font-medium text-slate-500 dark:text-slate-400 hidden xs:inline">Proficiency</span>
                                                    <span style={{ color: skill.color }} className="font-bold text-[10px] sm:text-xs ml-auto">
                                                        {skill.level}%
                                                    </span>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="w-full h-1 sm:h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                                    <motion.div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                                                        }}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.level}%` }}
                                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rank Badge */}
                                        <div className="mt-2.5 sm:mt-3.5 pt-1.5 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[9px] sm:text-[11px]">
                                            <span className="text-slate-400">Level</span>
                                            <span className="font-semibold" style={{ color: skill.color }}>
                                                {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : "Intermediate"}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 pt-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {[
                        { number: "20+", label: "Projects", icon: "🚀" },
                        { number: "15+", label: "Technologies", icon: "💻" },
                        { number: "3+", label: "Years Experience", icon: "📅" },
                        { number: "100%", label: "Satisfaction", icon: "⭐" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm shadow-sm transition-all"
                            whileHover={{ scale: 1.03, borderColor: "#38BDF8" }}
                        >
                            <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
                            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                                {stat.number}
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}