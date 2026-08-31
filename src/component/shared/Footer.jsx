
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    FaHome,
    FaUser,
    FaBriefcase,
    FaTools,
    FaLaptopCode,
    FaEnvelope,
} from "react-icons/fa";

// Static link data moved outside the component to prevent memory reallocations
const QUICK_LINKS = [
    { name: "Home", href: "/#home", icon: <FaHome /> },
    { name: "About", href: "/#about", icon: <FaUser /> },
    { name: "Experience", href: "/#experience", icon: <FaBriefcase /> },
    { name: "Skills", href: "/#skills", icon: <FaTools /> },
    { name: "Projects", href: "/#projects", icon: <FaLaptopCode /> },
    { name: "Contacts", href: "/#contacts", icon: <FaEnvelope /> },
];

const SOCIAL_LINKS = [
    {
        name: "GitHub",
        url: "https://github.com/CodeByMonir",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        username: "@CodeByMonir",
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/codebymonir",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
        username: "CodeByMonir",
    },
    {
        name: "Facebook",
        url: "https://facebook.com/moniratmeta",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
        username: "/MonirAtMeta",
    },
];

const SERVICES = [
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Solutions",
    "API Integration",
    "Database Design",
];

const TECH_STACK = [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind",
    "Framer Motion",
];

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.footer
            className="relative bg-transparent border-t border-sky-500/15"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-150 h-50 rounded-full blur-[120px] opacity-10 dark:opacity-20 bg-radial from-sky-400 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-500/15">
                                <Image
                                    src="/logo.webp"
                                    alt="CodeByMonir Logo"
                                    width={40}
                                    height={40}
                                    priority
                                />
                            </div>
                            <h2 className="text-2xl font-bold">
                                <span className="bg-linear-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                                    CodeBy
                                </span>
                                <span className="text-slate-800 dark:text-slate-50">
                                    Monir
                                </span>
                            </h2>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Full Stack Developer specializing in creating fast,
                            scalable, and responsive web applications with modern
                            technologies.
                        </p>

                        {/* Scroll to Top Button */}
                        <motion.button
                            onClick={handleScrollToTop}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-sky-500/30 text-sky-600 dark:text-sky-400 bg-sky-500/5 transition-all duration-300"
                            whileHover={{
                                scale: 1.05,
                                borderColor: "#38BDF8",
                                backgroundColor: "rgba(56, 189, 248, 0.15)",
                                y: -3,
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Back to Top</span>
                            <span className="text-lg">↑</span>
                        </motion.button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-50">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            →
                                        </span>
                                        <span className="text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                                            {link.icon}
                                        </span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-50">
                            Services
                        </h3>
                        <ul className="space-y-2">
                            {SERVICES.map((service) => (
                                <li key={service}>
                                    <span className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 dark:bg-sky-500" />
                                        {service}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-50">
                            Contact Info
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 group">
                                <span className="text-sky-500 dark:text-sky-400 text-lg group-hover:scale-110 transition-transform duration-300">
                                    📧
                                </span>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Email
                                    </p>
                                    <a
                                        href="mailto:codebymonir@gmail.com"
                                        className="text-sm text-slate-800 dark:text-slate-50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                                    >
                                        codebymonir@gmail.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <span className="text-sky-500 dark:text-sky-400 text-lg group-hover:scale-110 transition-transform duration-300">
                                    📍
                                </span>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Location
                                    </p>
                                    <p className="text-sm text-slate-800 dark:text-slate-50">
                                        Remote / Bangladesh
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <span className="text-sky-500 dark:text-sky-400 text-lg group-hover:scale-110 transition-transform duration-300">
                                    💬
                                </span>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Availability
                                    </p>
                                    <p className="text-sm text-slate-800 dark:text-slate-50">
                                        Open for work
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    className="my-8 h-px w-full bg-linear-to-r from-transparent via-sky-500/30 to-transparent"
                    variants={itemVariants}
                />

                {/* Bottom Section */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                    variants={itemVariants}
                >
                    {/* Copyright */}
                    <div className="text-center md:text-left">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            © {currentYear} CodeByMonir. All rights reserved.
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">
                            Built with Next.js, Tailwind CSS & Framer Motion
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3">
                        {SOCIAL_LINKS.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group"
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-sky-500/30 bg-sky-500/5 hover:border-sky-400 dark:hover:border-sky-400 hover:bg-sky-500/15 transition-all duration-300">
                                    <Image
                                        src={social.icon}
                                        alt={social.name}
                                        width={20}
                                        height={20}
                                        unoptimized
                                        className="w-5 h-5 transition-all duration-300 group-hover:scale-110 dark:invert-[0.1] dark:brightness-110"
                                    />
                                </div>
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none bg-slate-950 dark:bg-slate-900 text-sky-400 border border-sky-500/30">
                                    {social.username}
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Tech Stack Tags */}
                <motion.div
                    className="mt-8 flex flex-wrap justify-center gap-2"
                    variants={itemVariants}
                >
                    {TECH_STACK.map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 text-xs rounded-full border border-sky-500/10 text-slate-500 dark:text-slate-400 bg-sky-500/5 transition-all duration-300 hover:scale-105 hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-500/10"
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </div>
        </motion.footer>
    );
}