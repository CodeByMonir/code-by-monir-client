// skeleton/HeaderSkeleton.jsx
import React from "react";

export default function HeaderSkeleton() {
    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-10 lg:px-20 h-14 sm:h-16 md:h-20 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                        <div className="h-6 w-28 sm:h-7 sm:w-32 md:h-8 md:w-36 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
                    </div>

                    <div className="hidden md:flex bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/60 py-2.5 px-6 rounded-full items-center gap-6 lg:gap-8 backdrop-blur-sm">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse"
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 animate-pulse" />
                    </div>

                </div>
            </header>
        </>
    );
}