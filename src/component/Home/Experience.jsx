"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Experience() {
    const [activeTab, setActiveTab] = useState(0);
    const [hoveredProject, setHoveredProject] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const experiences = [
        {
            id: 0,
            title: "MediCare Connect",
            company: "Healthcare Platform",
            period: "June 2024 - Present",
            location: "Remote",
            type: "Full Stack Project",
            description: [
                "Developed a full-stack healthcare platform connecting patients, doctors, and clinic administrators.",
                "Implemented appointment scheduling and real-time doctor availability management.",
                "Created personalized dashboards for managing patient records, prescriptions, and visit histories.",
                "Built secure authentication and role-based access control for patients and medical staff.",
                "Designed a modern, responsive UI with Tailwind CSS optimized for desktop and mobile devices.",
            ],
            techStack: [
                { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#FFFFFF" },
                { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
                { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
            ],
            image: "https://i.ibb.co.com/5XHr5t74/Medi-Care-All.png",
            liveLink: "https://medi-care-client-6fx8.vercel.app/",
            githubLink: "https://github.com/CodeByMonir/medi_care_client",
            achievements: [
                "🩺 Multi-role appointment & doctor management system",
                "⚡ Seamless client-side transitions and fast SSR loads",
                "🔒 Secure patient record and profile handling",
            ],
        },
        {
            id: 1,
            title: "Rent Cars Web App",
            company: "Full Stack Development",
            period: "July 2024 - Present",
            location: "Remote",
            type: "Full Stack Project",
            description: [
                "Developed a comprehensive car rental platform with real-time availability tracking and booking system.",
                "Implemented secure user authentication using NextAuth.js with Google and email sign-in options.",
                "Built responsive UI with Tailwind CSS and Framer Motion for smooth animations and interactions.",
                "Integrated MongoDB database for managing car listings, user profiles, and booking history.",
                "Created admin dashboard for managing fleet, viewing bookings, and processing payments.",
                "Optimized performance with Next.js server-side rendering and image optimization.",
            ],
            techStack: [
                { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#FFFFFF" },
                { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
                { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
                { name: "NextAuth.js", logo: "https://next-auth.js.org/img/logo/logo-sm.png", color: "#000000" },
                { name: "Mongoose", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
            ],
            image: "https://i.ibb.co.com/Gv84Qhzq/Rent-ACar.png",
            liveLink: "https://car-rental-client-eight-opal.vercel.app/",
            githubLink: "https://github.com/CodeByMonir/carrental-client",
            achievements: [
                "🚀 500+ monthly active users",
                "⚡ 40% reduction in booking time",
                "📈 95% customer satisfaction rate",
            ],
        },
        {
            id: 2,
            title: "Sun Cart Mall Web App",
            company: "E-Commerce Development",
            period: "March 2024 - Present",
            location: "Remote",
            type: "Full Stack Project",
            description: [
                "Built modern e-commerce platform with advanced cart management and secure payment integration.",
                "Implemented product filtering, search functionality, and category-based browsing.",
                "Created responsive product cards with image optimization and quick view modal.",
                "Developed user dashboard for order tracking, wishlist management, and profile updates.",
                "Integrated Stripe payment gateway for secure checkout process.",
                "Added admin panel for product management, order processing, and analytics dashboard.",
            ],
            techStack: [
                { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#FFFFFF" },
                { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
                { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
                { name: "Stripe", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg", color: "#635BFF" },
                { name: "Redux Toolkit", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", color: "#764ABC" },
            ],
            image: "https://i.ibb.co.com/4ZT7KRH7/Suncart-Mall.png",
            liveLink: "https://suncart-mall.vercel.app/",
            githubLink: "https://github.com/CodeByMonir/suncart-mall",
            achievements: [
                "🛒 10,000+ products managed",
                "💰 30% increase in conversion rate",
                "⭐ 4.8/5 user rating",
            ],
        },
        
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300"
        >
            <div className="hidden">
                <h1>Professional Experience | Full Stack Developer Portfolio</h1>
                <h2>Web Development Projects and Achievements</h2>
            </div>

            {/* Background Glows */}
            <div
                className="hidden dark:block absolute top-12 left-1/2 -translate-x-1/2 w-96 md:w-xl h-72 rounded-full blur-[120px] opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent)" }}
            />
            <div
                className="hidden dark:block absolute bottom-12 right-0 w-80 h-80 rounded-full blur-[120px] opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(96,165,250,0.3), transparent)" }}
            />

            {/* Header Section */}
            <motion.div
                className="flex flex-col items-center text-center mb-12 md:mb-16 space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <motion.span
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/20 dark:border-sky-500/30 backdrop-blur-sm"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    Professional Journey
                </motion.span>

                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
                    variants={itemVariants}
                >
                    <span className="bg-linear-to-r from-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent">
                        Featured Projects
                    </span>
                    <span className="text-slate-900 dark:text-slate-100"> & Experience</span>
                </motion.h2>

                <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                    Transforming ideas into impactful digital solutions through innovative, scalable web development.
                </p>

                <div className="w-20 h-1 rounded-full bg-linear-to-r from-[#38BDF8] to-[#60A5FA] mt-2" />
            </motion.div>

            {/* Tab Navigation Controls */}
            <motion.div
                className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-10 md:mb-14"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {experiences.map((exp, index) => (
                    <motion.button
                        key={exp.id}
                        onClick={() => setActiveTab(index)}
                        className={`relative px-4 sm:px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 border cursor-pointer ${activeTab === index
                                ? "bg-sky-500/15 dark:bg-sky-500/20 border-[#38BDF8] text-[#0284C7] dark:text-[#38BDF8] shadow-sm shadow-sky-500/10"
                                : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                            }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>{exp.title}</span>

                        {activeTab === index && (
                            <motion.div
                                className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[#38BDF8] rounded-full"
                                layoutId="activeTab"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                    </motion.button>
                ))}
            </motion.div>

            {/* Active Tab Content Panel */}
            <AnimatePresence mode="wait">
                {experiences.map((exp, index) => (
                    activeTab === index && (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-6xl mx-auto"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                                {/* Left Column: Media Preview & Highlights */}
                                <motion.div
                                    className="lg:col-span-5 space-y-6"
                                    initial={{ opacity: 0, x: -25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15, duration: 0.5 }}
                                >
                                    {/* Image Card */}
                                    <div
                                        className="group relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-2 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all duration-300"
                                        onMouseEnter={() => setHoveredProject(exp.id)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        <div className="relative rounded-xl overflow-hidden aspect-16/10 bg-slate-100 dark:bg-slate-800/50">
                                            {exp.image ? (
                                                <Image
                                                    src={exp.image}
                                                    alt={`${exp.title} Project Screenshot`}
                                                    width={600}
                                                    height={375}
                                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#38BDF8]/20 to-[#60A5FA]/10">
                                                    <span className="text-5xl opacity-60">🚀</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Achievements Card */}
                                    <div className="rounded-2xl p-5 sm:p-6 bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                        <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                            <span>🏆</span> Key Achievements
                                        </h3>
                                        <div className="space-y-3">
                                            {exp.achievements.map((achievement, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex items-center gap-3 text-slate-700 dark:text-slate-300 text-sm font-medium"
                                                    whileHover={{ x: 6, color: "#38BDF8" }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <span className="text-base">{achievement.split(' ')[0]}</span>
                                                    <span>{achievement.substring(achievement.indexOf(' ') + 1)}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Right Column: Detailed Overview */}
                                <motion.div
                                    className="lg:col-span-7 space-y-6 sm:space-y-8 rounded-2xl p-6 sm:p-8 bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm"
                                    initial={{ opacity: 0, x: 25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    {/* Role Header */}
                                    <div>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                                    {exp.title}
                                                </h3>
                                                <p className="text-sky-600 dark:text-[#38BDF8] font-semibold text-sm sm:text-base mt-0.5">
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                                                    {exp.period}
                                                </p>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                                    {exp.location}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                                                {exp.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description List */}
                                    <div>
                                        <h4 className="text-sm font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-200 mb-3.5 flex items-center gap-2">
                                            <span>📋</span> Responsibilities & Impact
                                        </h4>
                                        <ul className="space-y-2.5">
                                            {exp.description.map((item, i) => (
                                                <motion.li
                                                    key={i}
                                                    className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + (i * 0.04) }}
                                                >
                                                    <span className="text-sky-600 dark:text-[#38BDF8] font-bold select-none leading-tight mt-0.5">▹</span>
                                                    <span>{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack Chips */}
                                    <div>
                                        <h4 className="text-sm font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-200 mb-3.5 flex items-center gap-2">
                                            <span>⚡</span> Technologies Used
                                        </h4>
                                        <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                            {exp.techStack.map((tech, i) => (
                                                <motion.span
                                                    key={tech.name}
                                                    className="group/tech inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        backgroundColor: "rgba(56, 189, 248, 0.12)",
                                                        borderColor: "#38BDF8",
                                                    }}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.35 + (i * 0.03) }}
                                                >
                                                    <img
                                                        src={tech.logo}
                                                        alt={`${tech.name} logo`}
                                                        className="w-3.5 h-3.5 object-contain transition-transform duration-300 group-hover/tech:rotate-6"
                                                    />
                                                    <span>{tech.name}</span>
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTAs */}
                                    <div className="flex flex-wrap items-center gap-3.5 pt-2">
                                        <motion.a
                                            href={exp.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <span>🔗</span> Live Demo
                                        </motion.a>

                                        <motion.a
                                            href={exp.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <span>📦</span> View Code
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>
        </section>
    );
}