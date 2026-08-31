"use client";

export function ProjectCardSkeleton() {
    return (
        <div className="bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden animate-pulse transition-colors duration-300">
            <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300/30 to-slate-200/10 dark:from-slate-700/30 dark:to-slate-800/10"></div>
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                    <div className="w-16 h-16 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                </div>
                <div className="absolute top-3 right-3 z-20">
                    <div className="w-20 h-6 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                </div>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"></div>
            </div>

            <div className="p-6">
                <div className="h-7 w-40 bg-slate-300 dark:bg-slate-700 rounded-md mb-3"></div>

                <div className="mb-4 space-y-2">
                    <div className="h-4 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-11/12 bg-slate-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-10/12 bg-slate-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-9/12 bg-slate-300 dark:bg-slate-700 rounded"></div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {[1, 2, 3, 4].map((tech) => (
                        <div
                            key={tech}
                            className="px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                        >
                            <div className="w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                            <div className="w-12 h-3 bg-slate-300 dark:bg-slate-700 rounded"></div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3">
                    <div className="flex-1 h-9 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                    <div className="flex-1 h-9 bg-slate-200 dark:bg-slate-700/50 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}

export default function ProjectsSkeleton() {
    const filterButtons = [
        { id: "all", label: "All Projects", icon: "🎯" },
        { id: "frontend", label: "Frontend", icon: "🎨" },
        { id: "backend", label: "Backend", icon: "⚙️" },
        { id: "fullstack", label: "Full Stack", icon: "🚀" },
    ];

    const skeletonProjects = [1, 2, 3];

    return (
        <section className="py-20 px-6 md:px-20 bg-transparent">
            <div className="text-center mb-6">
                <div className="h-10 md:h-12 w-48 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse mx-auto"></div>
            </div>

            <div className="text-center mb-10">
                <div className="h-5 w-64 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse mx-auto"></div>
            </div>

            <div className="flex justify-center gap-3 mb-10 flex-wrap">
                {filterButtons.map((type) => (
                    <div
                        key={type.id}
                        className="px-5 py-2 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-2 animate-pulse"
                    >
                        <div className="w-5 h-5 bg-slate-300 dark:bg-slate-700 rounded"></div>
                        <div className="h-5 w-24 bg-slate-300 dark:bg-slate-700 rounded"></div>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skeletonProjects.map((index) => (
                    <ProjectCardSkeleton key={index} />
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <div className="px-8 py-3 w-64 h-11 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse"></div>
            </div>

            <div className="text-center mt-6">
                <div className="h-4 w-48 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse mx-auto"></div>
            </div>
        </section>
    );
}