// app/projects/[id]/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
// import ProjectDetailsSkeleton from "@/skeleton/projectsDetailsSkeleton";

export default function ProjectDetails() {
    const params = useParams();
    const [allProjects, setAllProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useRef(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await fetch("/data.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllProjects(data);

                // Find the specific project by matching id
                const foundProject = data.find((p) => String(p.id) === String(params.id));
                setProject(foundProject || null);
            } catch (err) {
                console.error("Failed to load project details:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchProjectData();
        }

        // Smooth scroll to top on load
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [params.id]);

    // Animation variants
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
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.6,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, x: -50 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.7,
            },
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
            },
        },
    };

    const contentVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.7,
            },
        },
    };

    const techTagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
        hover: {
            scale: 1.08,
            y: -3,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.4,
                duration: 0.5,
            },
        },
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    const relatedCardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
            },
        },
        hover: {
            y: -8,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    if (isLoading) {
        // Uncomment when skeleton is ready:
        // return <ProjectDetailsSkeleton />;
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-transparent transition-colors duration-300 flex items-center justify-center px-4">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="text-6xl mb-4"
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        😢
                    </motion.div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-[#F8FAFC] mb-2 transition-colors duration-300">
                        Project not found
                    </h2>
                    <p className="text-slate-600 dark:text-[#94A3B8] mb-6 transition-colors duration-300">
                        The project you're looking for doesn't exist.
                    </p>
                    <Link
                        href="/projects"
                        className="inline-block px-6 py-2 rounded-lg bg-sky-500 dark:bg-[#38BDF8] text-white hover:bg-sky-600 dark:hover:bg-[#0EA5E9] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        Back to Projects
                    </Link>
                </motion.div>
            </div>
        );
    }

    const relatedProjects = allProjects
        .filter((p) => p.category === project.category && String(p.id) !== String(project.id))
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-transparent backdrop-blur-sm transition-colors duration-300 relative overflow-hidden">
            {/* Background Glow Effects */}
            <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-300"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.2), transparent)" }}
            />
            <div
                className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[150px] opacity-0 dark:opacity-15 pointer-events-none transition-opacity duration-300"
                style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15), transparent)" }}
            />
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full blur-[200px] opacity-0 dark:opacity-10 pointer-events-none transition-opacity duration-300"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.1), transparent)" }}
            />

            <motion.div
                className="py-16 md:py-20 px-4 sm:px-6 md:px-20"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                ref={sectionRef}
            >
                {/* Back Button */}
                <motion.div className="max-w-6xl mx-auto mb-8" variants={itemVariants}>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 transition-all duration-300 group text-sky-500 dark:text-[#38BDF8] hover:text-sky-600 dark:hover:text-[#60A5FA]"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                        <span>Back to All Projects</span>
                    </Link>
                </motion.div>

                {/* Project Details */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Image Section */}
                        <motion.div
                            className="relative rounded-2xl overflow-hidden border-2 group bg-white/50 dark:bg-slate-800/30 border-slate-200 dark:border-sky-400/20 hover:border-sky-400 dark:hover:border-[#38BDF8] transition-all duration-300"
                            variants={imageVariants}
                            whileHover="hover"
                        >
                            <motion.div
                                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-0 dark:group-hover:opacity-100 transition duration-500 pointer-events-none"
                                style={{
                                    background: "radial-gradient(circle, rgba(56,189,248,0.3), transparent)",
                                    filter: "blur(20px)",
                                }}
                            />
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-96 bg-linear-to-br from-sky-400/20 dark:from-[#38BDF8]/20 to-sky-300/5 dark:to-[#60A5FA]/5 flex items-center justify-center">
                                    <span className="text-6xl opacity-50">
                                        {project.category === "frontend" && "🎨"}
                                        {project.category === "backend" && "⚙️"}
                                        {project.category === "fullstack" && "🚀"}
                                    </span>
                                </div>
                            )}
                        </motion.div>

                        {/* Info Section */}
                        <motion.div variants={contentVariants}>
                            {/* Category Badges */}
                            <motion.div className="mb-4 flex flex-wrap gap-2" variants={itemVariants}>
                                <span className="px-3 py-1 rounded-full text-xs font-medium capitalize backdrop-blur-sm bg-sky-100/80 dark:bg-[#38BDF8]/15 text-sky-600 dark:text-[#38BDF8] border border-sky-300 dark:border-[#38BDF8]/30">
                                    {project.category}
                                </span>
                                {project.featured && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-sky-100/80 dark:bg-[#38BDF8]/20 text-sky-600 dark:text-[#38BDF8] border border-sky-300 dark:border-[#38BDF8]/40">
                                        ⭐ Featured
                                    </span>
                                )}
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                className="text-3xl md:text-4xl font-bold mb-4"
                                variants={itemVariants}
                            >
                                <span className="bg-linear-to-r from-sky-500 to-sky-400 dark:from-[#38BDF8] dark:to-[#60A5FA] bg-clip-text text-transparent">
                                    {project.title}
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                className="text-slate-600 dark:text-[#94A3B8] leading-relaxed mb-6 text-base transition-colors duration-300"
                                variants={itemVariants}
                            >
                                {project.description}
                            </motion.p>

                            {/* Tech Stack */}
                            <motion.div className="mb-8" variants={itemVariants}>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-[#F8FAFC] mb-3 flex items-center gap-2 transition-colors duration-300">
                                    <span>⚡</span>
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech?.map((tech, index) => (
                                        <motion.span
                                            key={tech.name}
                                            variants={techTagVariants}
                                            whileHover="hover"
                                            custom={index}
                                            className="px-3 py-1.5 text-sm rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300 border border-slate-300 dark:border-sky-400/30 text-slate-600 dark:text-[#94A3B8] bg-slate-50/80 dark:bg-sky-400/5 hover:bg-sky-100 dark:hover:bg-sky-400/15 hover:text-sky-600 dark:hover:text-[#38BDF8] hover:border-sky-400 dark:hover:border-[#38BDF8]"
                                        >
                                            <motion.img
                                                src={tech.logo}
                                                alt={tech.name}
                                                className="w-4 h-4"
                                                whileHover={{ rotate: 360, scale: 1.2 }}
                                                transition={{ duration: 0.4 }}
                                            />
                                            {tech.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div className="flex gap-4 flex-wrap" variants={buttonVariants}>
                                {project.githubLink && (
                                    <motion.button
                                        onClick={() => window.open(project.githubLink, "_blank")}
                                        className="flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-sky-500 dark:bg-[#38BDF8] text-white hover:bg-sky-600 dark:hover:bg-[#0EA5E9] hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <span>📦</span> View Code on GitHub
                                    </motion.button>
                                )}

                                {project.liveLink && (
                                    <motion.button
                                        onClick={() => window.open(project.liveLink, "_blank")}
                                        className="flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 border-2 border-sky-500 dark:border-[#38BDF8] text-sky-600 dark:text-[#38BDF8] bg-transparent hover:bg-sky-50 dark:hover:bg-[#38BDF8]/10 hover:-translate-y-0.5"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <span>🔗</span> Live Demo
                                    </motion.button>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Related Projects Section */}
                    {relatedProjects.length > 0 && (
                        <motion.div
                            className="mt-20"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.7 }}
                        >
                            <motion.div className="text-center mb-10">
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                    <span className="bg-linear-to-r from-sky-500 to-sky-400 dark:from-[#38BDF8] dark:to-[#60A5FA] bg-clip-text text-transparent">
                                        Related Projects
                                    </span>
                                </h2>
                                <div className="w-20 h-0.5 mx-auto rounded-full bg-linear-to-r from-sky-500 to-sky-400 dark:from-[#38BDF8] dark:to-[#60A5FA]" />
                            </motion.div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedProjects.map((relatedProject, index) => (
                                    <motion.div
                                        key={relatedProject.id}
                                        variants={relatedCardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={`/projects/${relatedProject.id}`}
                                            className="group block rounded-xl overflow-hidden border-2 transition-all duration-300 h-full bg-white/50 dark:bg-slate-800/30 border-slate-200 dark:border-sky-400/20 hover:border-sky-400 dark:hover:border-[#38BDF8] hover:shadow-lg hover:shadow-sky-400/20 dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
                                        >
                                            <div className="relative h-40 overflow-hidden">
                                                {relatedProject.image ? (
                                                    <Image
                                                        src={relatedProject.image}
                                                        alt={relatedProject.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-linear-to-br from-sky-400/20 dark:from-[#38BDF8]/20 to-sky-300/5 dark:to-[#60A5FA]/5 flex items-center justify-center">
                                                        <span className="text-4xl opacity-50">
                                                            {relatedProject.category === "frontend" && "🎨"}
                                                            {relatedProject.category === "backend" && "⚙️"}
                                                            {relatedProject.category === "fullstack" && "🚀"}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-slate-800 dark:text-[#F8FAFC] group-hover:text-sky-500 dark:group-hover:text-[#38BDF8] transition-colors">
                                                    {relatedProject.title}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-[#94A3B8] mt-1 line-clamp-2 transition-colors duration-300">
                                                    {relatedProject.description.substring(0, 80)}...
                                                </p>
                                                <div className="mt-3 flex flex-wrap gap-1">
                                                    {relatedProject.tech?.slice(0, 3).map((tech) => (
                                                        <span
                                                            key={tech.name}
                                                            className="text-xs px-2 py-0.5 rounded-full bg-sky-100/80 dark:bg-[#38BDF8]/10 text-sky-600 dark:text-[#38BDF8]"
                                                        >
                                                            {tech.name}
                                                        </span>
                                                    ))}
                                                    {relatedProject.tech?.length > 3 && (
                                                        <span className="text-xs text-slate-500 dark:text-[#94A3B8]">
                                                            +{relatedProject.tech.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}