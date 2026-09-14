"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProjectsSkeleton, { ProjectCardSkeleton } from "../skeleton/projectsSkeleton";
import { FolderGit2 } from "lucide-react";

export default function Projects() {
    const router = useRouter();
    const pathname = usePathname();

    // State
    const [allProjects, setAllProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [visibleProjects, setVisibleProjects] = useState(3);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    const isAllProjectsPage = pathname === "/projects";

    // Fetch projects from public/data.json
    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            try {
                const response = await fetch("/data.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (isMounted) {
                    setAllProjects(Array.isArray(data) ? data : []);
                    if (isAllProjectsPage) {
                        setVisibleProjects(data.length);
                    }
                }
            } catch (err) {
                console.error("Failed to load projects:", err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchProjects();

        return () => {
            isMounted = false;
        };
    }, [isAllProjectsPage]);

    const toggleDescription = (projectTitle) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [projectTitle]: !prev[projectTitle],
        }));
    };

    const needsTruncation = (description) => {
        return description && description.length > 120;
    };

    const filteredProjects =
        filter === "all"
            ? allProjects
            : allProjects.filter((p) => p.category?.toLowerCase() === filter.toLowerCase());

    const displayedProjects = isAllProjectsPage
        ? filteredProjects
        : filteredProjects.slice(0, visibleProjects);

    const hasMoreProjects = !isAllProjectsPage && visibleProjects < filteredProjects.length;
    const hasLessProjects = !isAllProjectsPage && visibleProjects > 3;
    const hasShowAll = !isAllProjectsPage && filteredProjects.length > 3;

    const calculateCardsToRemove = (currentCount) => {
        const remainder = currentCount % 3;
        return remainder === 0 ? 3 : remainder;
    };

    const handleViewMore = async () => {
        setIsLoadingMore(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length));
        setIsLoadingMore(false);
    };

    const handleViewLess = () => {
        setVisibleProjects((prev) => {
            const cardsToRemove = calculateCardsToRemove(prev);
            const newCount = prev - cardsToRemove;
            return newCount >= 3 ? newCount : 3;
        });

        setExpandedDescriptions({});

        setTimeout(() => {
            if (gridRef.current) {
                gridRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }, 100);
    };

    const handleShowAll = () => {
        router.push("/projects");
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        if (!isAllProjectsPage) {
            setVisibleProjects(3);
        }
        setExpandedDescriptions({});
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 18,
            },
        },
        hover: {
            y: -6,
            transition: {
                type: "spring",
                stiffness: 350,
                damping: 12,
            },
        },
    };

    if (isLoading) {
        return <ProjectsSkeleton />;
    }

    return (
        <motion.section
            ref={sectionRef}
            id="projects-section"
            className="py-16 md:py-20 px-4 sm:px-6 md:px-20 bg-transparent text-slate-900 dark:text-slate-100 relative min-h-screen transition-colors duration-300 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
        >
            {/* Background Ambient Glows */}
            <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10 dark:opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.25), transparent)" }}
            />
            <div
                className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[150px] opacity-10 dark:opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(96,165,250,0.2), transparent)" }}
            />

            <div className="flex justify-center">
                <motion.div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/20 dark:border-sky-500/30 mb-4 shadow-sm backdrop-blur-sm"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FolderGit2 className="w-4 h-4" /> Projects Showcase
                </motion.div>
            </div>

            <div className="mb-10 ">
                <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-4" variants={itemVariants}>
                    <span className="bg-linear-to-r from-sky-600 to-blue-600 dark:from-[#38BDF8] dark:to-[#60A5FA] bg-clip-text text-transparent">
                        My Projects
                    </span>
                </motion.h2>

                <motion.p
                    className="text-center text-slate-500 dark:text-slate-400 transition-colors duration-300"
                    variants={itemVariants}
                >
                    A collection of things I&apos;ve built ✨
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="mx-auto mt-4 h-1 w-20 sm:w-24 rounded-full bg-linear-to-r from-sky-400 to-blue-500 shadow-sm"
                />
            </div>

            {/* Category Filter Buttons */}
            <motion.div className="flex justify-center gap-3 mb-12 flex-wrap" variants={itemVariants}>
                {[
                    { id: "all", label: "All Projects", icon: "🎯" },
                    { id: "frontend", label: "Frontend", icon: "🎨" },
                    { id: "backend", label: "Backend", icon: "⚙️" },
                    { id: "fullstack", label: "Full Stack", icon: "🚀" },
                ].map((type) => (
                    <motion.button
                        key={type.id}
                        onClick={() => handleFilterChange(type.id)}
                        className={`px-5 py-2 rounded-full border-2 transition-all duration-300 flex items-center gap-2 font-medium ${filter === type.id
                                ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20 scale-105"
                                : "bg-transparent border-sky-500/30 text-slate-600 dark:text-slate-400 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-500 hover:scale-105"
                            }`}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-lg">{type.icon}</span>
                        <span className="capitalize">{type.label}</span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Projects Grid */}
            <div ref={gridRef} className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayedProjects.map((project, index) => (
                    <motion.div
                        key={project.id || `${project.title}-${index}`}
                        variants={cardVariants}
                        whileHover="hover"
                        className="group relative"
                        layout
                    >
                        <motion.div
                            className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
                            style={{
                                background: "radial-gradient(circle, rgba(56,189,248,0.25), transparent)",
                                filter: "blur(15px)",
                            }}
                        />

                        <div className="relative rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 overflow-hidden h-full border-sky-500/10 dark:border-sky-500/20 bg-white/80 dark:bg-slate-900/60 hover:border-sky-500 hover:bg-sky-500/5 dark:hover:bg-sky-500/5 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col justify-between">
                            <div>
                                {/* Project Thumbnail */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title || "Project preview"}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-sky-500/20 to-blue-500/5 flex items-center justify-center">
                                            <span className="text-6xl opacity-50">
                                                {project.category === "frontend" && "🎨"}
                                                {project.category === "backend" && "⚙️"}
                                                {project.category === "fullstack" && "🚀"}
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute top-3 right-3 z-20">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium capitalize backdrop-blur-md shadow-lg bg-slate-950/80 dark:bg-slate-900/80 text-sky-400 border border-sky-500/30 dark:border-sky-500/50">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-[#F8FAFC] hover:text-sky-500 dark:hover:text-[#38BDF8] transition-colors duration-300">
                                        {project.title}
                                    </h3>

                                    {/* Description with Expand/Collapse */}
                                    <div className="mb-4">
                                        {!expandedDescriptions[project.title] && needsTruncation(project.description) ? (
                                            <p className="text-slate-600 dark:text-slate-400 min-h-[70px] text-sm leading-relaxed">
                                                {project.description.substring(0, 120)}...{" "}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleDescription(project.title)}
                                                    className="text-xs text-sky-500 hover:text-sky-600 dark:text-[#38BDF8] dark:hover:text-[#60A5FA] transition-colors inline-flex items-center gap-1 mt-1 font-medium cursor-pointer"
                                                >
                                                    <span>See More</span>
                                                    <span>▼</span>
                                                </button>
                                            </p>
                                        ) : (
                                            <p className="text-slate-600 dark:text-slate-400 min-h-[70px] text-sm leading-relaxed">
                                                {project.description}{" "}
                                                {needsTruncation(project.description) && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDescription(project.title)}
                                                        className="text-xs text-sky-500 hover:text-sky-600 dark:text-[#38BDF8] dark:hover:text-[#60A5FA] transition-colors inline-flex items-center gap-1 mt-1 font-medium cursor-pointer"
                                                    >
                                                        <span>See Less</span>
                                                        <span>▲</span>
                                                    </button>
                                                )}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech?.map((tech) => (
                                            <span
                                                key={tech.name}
                                                className="group/tech px-2.5 py-1 text-xs rounded-full flex items-center gap-1.5 border border-sky-500/20 dark:border-sky-500/30 text-slate-600 dark:text-slate-300 bg-sky-500/5 hover:bg-sky-500/15 hover:text-sky-600 dark:hover:text-[#38BDF8] hover:border-sky-500 transition-all duration-200"
                                            >
                                                {tech.logo && (
                                                    <img
                                                        src={tech.logo}
                                                        alt={tech.name}
                                                        className="w-3.5 h-3.5 object-contain transition-transform duration-200 group-hover/tech:scale-110"
                                                    />
                                                )}
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Card Action Buttons */}
                            <div className="p-6 pt-0 flex gap-3">
                                {project.githubLink && (
                                    <motion.a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2 text-sm font-medium rounded-lg text-white bg-sky-500 hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                        whileHover={{
                                            scale: 1.03,
                                            y: -2,
                                            boxShadow: "0 8px 18px -4px rgba(56,189,248,0.35)",
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span>📦</span> Code
                                    </motion.a>
                                )}

                                {project.liveLink && (
                                    <motion.a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2 text-sm font-medium rounded-lg border border-sky-500 text-sky-600 dark:text-[#38BDF8] bg-transparent hover:bg-sky-500/10 transition-colors flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span>🔗</span> Live Demo
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isLoadingMore && (
                    <>
                        {[...Array(3)].map((_, index) => (
                            <ProjectCardSkeleton key={`skeleton-${index}`} />
                        ))}
                    </>
                )}
            </div>

            {/* Pagination Controls */}
            {!isAllProjectsPage && filteredProjects.length > 3 && (
                <motion.div
                    key={`pagination-${filter}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center gap-4 mt-12 flex-wrap"
                >
                    {hasMoreProjects && (
                        <button
                            type="button"
                            onClick={handleViewMore}
                            disabled={isLoadingMore}
                            className="group px-8 py-3 rounded-full font-semibold bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.4)] active:scale-98 cursor-pointer"
                        >
                            {isLoadingMore ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <>
                                    <span>Show More</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    <span className="text-sm opacity-80">(+3)</span>
                                </>
                            )}
                        </button>
                    )}

                    {hasLessProjects && (
                        <motion.button
                            type="button"
                            onClick={handleViewLess}
                            className="group px-8 py-3 rounded-full font-semibold border-2 border-sky-500 text-sky-600 dark:text-sky-400 bg-transparent hover:bg-sky-500/10 flex items-center gap-2 transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                            <span>Show Less</span>
                            <span className="text-sm opacity-80">
                                ({visibleProjects % 3 === 0 ? "-3" : `-${visibleProjects % 3}`})
                            </span>
                        </motion.button>
                    )}

                    {hasShowAll && (
                        <button
                            type="button"
                            onClick={handleShowAll}
                            className="group px-8 py-3 rounded-full font-semibold border-2 border-slate-300 dark:border-sky-500/30 text-slate-600 dark:text-slate-300 bg-slate-100/50 dark:bg-sky-500/5 hover:border-sky-500 dark:hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-500/10 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-98 cursor-pointer"
                        >
                            <span>Show All Projects</span>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </button>
                    )}
                </motion.div>
            )}

            {/* Results Count Footer */}
            {!isAllProjectsPage && filteredProjects.length > 3 && (
                <div className="text-center mt-6">
                    <span className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                        Showing {displayedProjects.length} of {filteredProjects.length} projects
                    </span>
                </div>
            )}

            {isAllProjectsPage && (
                <div className="text-center mt-8">
                    <span className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                        Total {filteredProjects.length} projects found
                    </span>
                </div>
            )}
        </motion.section>
    );
}