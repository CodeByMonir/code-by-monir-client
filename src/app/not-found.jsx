// app/not-found.jsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* Background Ambient Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[130px]" />
                <div className="absolute top-1/3 left-1/4 w-60 h-60 rounded-full bg-sky-500/10 dark:bg-sky-500/15 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-xl mx-auto text-center space-y-6 sm:space-y-8">

                {/* 404 Large Numeric Badge with Glassmorphism pill badge */}
                <div className="relative flex flex-col items-center justify-center select-none">
                    <span className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tight leading-none bg-linear-to-b from-indigo-600 via-sky-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                        404
                    </span>

                    {/* Frosted Glassmorphism Badge */}
                    <div className="mt-5 px-5 py-1.5 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.3)]">
                        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-slate-800 dark:text-slate-200">
                            Page Not Found
                        </span>
                    </div>
                </div>

                {/* Copy Text */}
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                        Lost in Cyberspace?
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-md shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer"
                    >
                        <Home className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-white/40 dark:border-white/10 backdrop-blur-xl shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Go Back</span>
                    </button>
                </div>
            </div>
        </section>
    );
}