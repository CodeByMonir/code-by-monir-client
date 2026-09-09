"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProjectsSkeleton from "@/component/skeleton/projectsSkeleton";

function ProjectsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [allProjects, setAllProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const projectsPerPage = 12;
    const sectionRef = useRef(null);

    // Fetch projects data from public/data.json
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/data.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllProjects(data);
            } catch (err) {
                console.error("Failed to load project data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Sync URL search params with local state
    useEffect(() => {
        const categoryParam = searchParams.get("category");
        if (categoryParam && ["all", "frontend", "backend", "fullstack"].includes(categoryParam)) {
            setFilter(categoryParam);
        }

        const searchParam = searchParams.get("search");
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [searchParams]);

    const toggleDescription = (projectId) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [projectId]: !prev[projectId],
        }));
    };

    const needsTruncation = (description) => {
        return Boolean(description && description.length > 120);
    };

    // Filter projects based on category and search
    const filteredProjects = allProjects.filter((project) => {
        const matchesCategory = filter === "all" || project.category === filter;
        const matchesSearch =
            project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tech?.some((tech) => tech.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Pagination
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
        const params = new URLSearchParams(searchParams.toString());
        if (newFilter !== "all") {
            params.set("category", newFilter);
        } else {
            params.delete("category");
        }
        router.push(`/projects?${params.toString()}`, { scroll: false });
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setCurrentPage(1);
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set("search", query);
        } else {
            params.delete("search");
        }
        router.push(`/projects?${params.toString()}`, { scroll: false });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setTimeout(() => {
            document.querySelector(".projects-grid")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
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
            scale: 1.03,
            y: -8,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    if (isLoading) {
        return <ProjectsSkeleton />;
    }

    return (
        <div className="min-h-screen bg-transparent transition-colors duration-300">
            <motion.section
                ref={sectionRef}
                className="py-16 md:py-20 px-4 sm:px-6 md:px-20 bg-transparent relative overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Background Glow Effects */}
                <div
                    className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-300"
                    style={{ background: "radial-gradient(circle, rgba(56,189,248,0.2), transparent)" }}
                />
                <div
                    className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[150px] opacity-0 dark:opacity-15 pointer-events-none transition-opacity duration-300"
                    style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15), transparent)" }}
                />

                {/* Header Section */}
                <div className="text-center mb-12">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-sky-500 dark:text-[#38BDF8] hover:text-sky-600 dark:hover:text-[#60A5FA] transition-colors mb-4"
                    >
                        <span>←</span>
                        <span>Back to Home</span>
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-linear-to-r from-sky-500 to-sky-400 dark:from-[#38BDF8] dark:to-[#60A5FA] bg-clip-text text-transparent">
                            All Projects
                        </span>
                    </h1>

                    <p className="text-slate-600 dark:text-[#94A3B8] text-lg max-w-2xl mx-auto transition-colors duration-300">
                        Explore my complete collection of web development projects
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search projects by title, description, or tech stack..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-3 pl-12 rounded-xl transition-all duration-300 focus:outline-none bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-sky-400/20 text-slate-800 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-[#94A3B8] focus:border-sky-400 dark:focus:border-[#38BDF8] focus:shadow-lg focus:shadow-sky-400/20 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                            />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button
                                    onClick={() => handleSearchChange({ target: { value: "" } })}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-[#94A3B8] hover:text-sky-500 dark:hover:text-[#38BDF8] transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex justify-center gap-3 flex-wrap">
                        {[
                            { id: "all", label: "All Projects", icon: "🎯", count: allProjects.length },
                            { id: "frontend", label: "Frontend", icon: "🎨", count: allProjects.filter((p) => p.category === "frontend").length },
                            { id: "backend", label: "Backend", icon: "⚙️", count: allProjects.filter((p) => p.category === "backend").length },
                            { id: "fullstack", label: "Full Stack", icon: "🚀", count: allProjects.filter((p) => p.category === "fullstack").length },
                        ].map((type) => (
                            <motion.button
                                key={type.id}
                                onClick={() => handleFilterChange(type.id)}
                                className={`group px-5 py-2 rounded-full border-2 transition-all duration-300 flex items-center gap-2 ${filter === type.id
                                        ? "bg-sky-500 dark:bg-[#38BDF8] text-white border-sky-500 dark:border-[#38BDF8] shadow-lg shadow-sky-500/30 dark:shadow-[0_0_20px_rgba(56,189,248,0.3)] scale-105"
                                        : "border-slate-300 dark:border-sky-400/40 text-slate-600 dark:text-[#94A3B8] bg-white/50 dark:bg-transparent hover:border-sky-400 dark:hover:border-[#38BDF8] hover:text-sky-500 dark:hover:text-[#38BDF8] hover:scale-105"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-lg">{type.icon}</span>
                                <span className="capitalize">{type.label}</span>
                                <span className={`text-xs opacity-80 ${filter === type.id ? "text-white" : "text-slate-500 dark:text-[#94A3B8]"}`}>
                                    ({type.count})
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-center mb-6">
                    <span className="text-sm text-slate-500 dark:text-[#94A3B8]">
                        Found {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
                        {searchQuery && ` matching "${searchQuery}"`}
                    </span>
                </div>

                {/* Projects Grid */}
                {currentProjects.length > 0 ? (
                    <>
                        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            <AnimatePresence mode="sync">
                                {currentProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        variants={cardVariants}
                                        whileHover="hover"
                                        custom={index}
                                        className="group relative"
                                        layout
                                    >
                                        {/* Glow effect */}
                                        <motion.div
                                            className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-0 dark:group-hover:opacity-100 transition duration-300 pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle, rgba(56,189,248,0.25), transparent)",
                                                filter: "blur(15px)",
                                            }}
                                        />

                                        <div className="relative rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 overflow-hidden h-full bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-sky-400/20 hover:border-sky-400 dark:hover:border-[#38BDF8] hover:shadow-lg hover:shadow-sky-400/20 dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] dark:hover:bg-sky-400/5 flex flex-col justify-between">
                                            <div>
                                                {/* Image Section */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent z-10"></div>

                                                    {project.image ? (
                                                        <Image
                                                            src={project.image}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-linear-to-br from-sky-400/20 dark:from-[#38BDF8]/20 to-sky-300/5 dark:to-[#60A5FA]/5 flex items-center justify-center">
                                                            <span className="text-6xl opacity-50">
                                                                {project.category === "frontend" && "🎨"}
                                                                {project.category === "backend" && "⚙️"}
                                                                {project.category === "fullstack" && "🚀"}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Category Badge */}
                                                    <div className="absolute top-3 right-3 z-20">
                                                        <span className="px-3 py-1 rounded-full text-xs font-medium capitalize backdrop-blur-md shadow-lg bg-white/90 dark:bg-slate-900/90 text-sky-600 dark:text-[#38BDF8] border border-sky-300 dark:border-sky-400/50">
                                                            {project.category}
                                                        </span>
                                                    </div>

                                                    {/* Featured Badge */}
                                                    {project.featured && (
                                                        <div className="absolute top-3 left-3 z-20">
                                                            <span className="px-2 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow-lg bg-sky-400/20 dark:bg-[#38BDF8]/20 text-sky-600 dark:text-[#38BDF8] border border-sky-400 dark:border-[#38BDF8]/50">
                                                                ⭐ Featured
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-6">
                                                    <h3 className="text-xl font-semibold mb-2 transition-colors text-slate-800 dark:text-[#F8FAFC] hover:text-sky-600 dark:hover:text-[#38BDF8]">
                                                        {project.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <div className="mb-4">
                                                        {!expandedDescriptions[project.id] && needsTruncation(project.description) ? (
                                                            <p className="text-slate-600 dark:text-[#94A3B8] min-h-17.5 text-sm leading-relaxed">
                                                                {project.description.substring(0, 120)}...{" "}
                                                                <button
                                                                    onClick={() => toggleDescription(project.id)}
                                                                    className="text-xs transition-colors duration-300 inline-flex items-center gap-1 mt-1 font-medium text-sky-600 dark:text-[#38BDF8] hover:text-sky-700 dark:hover:text-[#60A5FA]"
                                                                >
                                                                    <span>See More</span>
                                                                    <span>▼</span>
                                                                </button>
                                                            </p>
                                                        ) : (
                                                            <p className="text-slate-600 dark:text-[#94A3B8] min-h-17.5 text-sm leading-relaxed">
                                                                {project.description}{" "}
                                                                {needsTruncation(project.description) && (
                                                                    <button
                                                                        onClick={() => toggleDescription(project.id)}
                                                                        className="text-xs transition-colors duration-300 inline-flex items-center gap-1 mt-1 font-medium text-sky-600 dark:text-[#38BDF8] hover:text-sky-700 dark:hover:text-[#60A5FA]"
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
                                                        {project.tech?.slice(0, 4).map((tech) => (
                                                            <span
                                                                key={tech.name}
                                                                className="group/tech px-2 py-1 text-xs rounded-full flex items-center gap-1 transition-all duration-300 cursor-pointer border border-slate-300 dark:border-sky-400/30 text-slate-600 dark:text-[#94A3B8] bg-slate-50 dark:bg-sky-400/5 hover:bg-sky-100 dark:hover:bg-sky-400/15 hover:text-sky-600 dark:hover:text-[#38BDF8] hover:border-sky-400 dark:hover:border-[#38BDF8]"
                                                            >
                                                                <img
                                                                    src={tech.logo}
                                                                    alt={tech.name}
                                                                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover/tech:scale-110"
                                                                />
                                                                {tech.name}
                                                            </span>
                                                        ))}
                                                        {project.tech?.length > 4 && (
                                                            <span className="text-xs text-slate-500 dark:text-[#94A3B8]">
                                                                +{project.tech.length - 4} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="p-6 pt-0 flex gap-3">
                                                <Link
                                                    href={`/projects/${project.id}`}
                                                    className="flex-1 py-2 text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 bg-sky-500 dark:bg-[#38BDF8] text-white hover:bg-sky-600 dark:hover:bg-[#0EA5E9] hover:-translate-y-0.5"
                                                >
                                                    <span>🔍</span> Details
                                                </Link>

                                                {project.liveLink && (
                                                    <button
                                                        onClick={() => window.open(project.liveLink, "_blank")}
                                                        className="flex-1 py-2 text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-sky-500 dark:border-[#38BDF8] text-sky-600 dark:text-[#38BDF8] bg-transparent hover:bg-sky-50 dark:hover:bg-[#38BDF8]/10 hover:-translate-y-0.5"
                                                    >
                                                        <span>🔗</span> Live Demo
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-300 dark:border-sky-400/30 text-slate-600 dark:text-[#94A3B8] bg-white/50 dark:bg-slate-800/50 hover:border-sky-400 dark:hover:border-[#38BDF8] hover:text-sky-600 dark:hover:text-[#38BDF8]"
                                    >
                                        ← Previous
                                    </button>

                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        if (
                                            pageNumber === 1 ||
                                            pageNumber === totalPages ||
                                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => handlePageChange(pageNumber)}
                                                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${currentPage === pageNumber
                                                            ? "bg-sky-500 dark:bg-[#38BDF8] text-white border border-sky-500 dark:border-[#38BDF8]"
                                                            : "border border-slate-300 dark:border-sky-400/30 text-slate-600 dark:text-[#94A3B8] bg-white/50 dark:bg-slate-800/50 hover:border-sky-400 dark:hover:border-[#38BDF8] hover:text-sky-600 dark:hover:text-[#38BDF8]"
                                                        }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        }
                                        if (
                                            (pageNumber === 2 && currentPage > 3) ||
                                            (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                                        ) {
                                            return (
                                                <span key={pageNumber} className="px-2 text-slate-500 dark:text-[#94A3B8]">
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-300 dark:border-sky-400/30 text-slate-600 dark:text-[#94A3B8] bg-white/50 dark:bg-slate-800/50 hover:border-sky-400 dark:hover:border-[#38BDF8] hover:text-sky-600 dark:hover:text-[#38BDF8]"
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Page Info */}
                        <div className="text-center mt-4">
                            <span className="text-sm text-slate-500 dark:text-[#94A3B8]">
                                Page {currentPage} of {totalPages} • Showing {indexOfFirstProject + 1}-
                                {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
                            </span>
                        </div>
                    </>
                ) : (
                    /* No Results Found */
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-semibold text-slate-800 dark:text-[#F8FAFC] mb-2">No projects found</h3>
                        <p className="text-slate-600 dark:text-[#94A3B8] mb-6">
                            {searchQuery ? `No projects matching "${searchQuery}"` : "No projects in this category yet"}
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setFilter("all");
                                router.push("/projects");
                            }}
                            className="px-6 py-2 rounded-lg bg-sky-500 dark:bg-[#38BDF8] text-white hover:bg-sky-600 dark:hover:bg-[#0EA5E9] transition-all duration-300"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </motion.section>
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectsContent />
        </Suspense>
    );
}