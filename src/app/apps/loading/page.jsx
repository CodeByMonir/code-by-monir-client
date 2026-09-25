// app/loading.jsx
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      
      {/* Background Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-32 -left-32 sm:-top-40 sm:-left-40 w-96 h-96 sm:w-lg sm:h-lg rounded-full bg-indigo-600/15 dark:bg-indigo-600/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 sm:-bottom-40 sm:-right-40 w-96 h-96 sm:w-lg sm:h-lg rounded-full bg-purple-600/15 dark:bg-purple-600/20 blur-3xl" />
      </div>

      {/* Center Preloader Container */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        
        {/* Scaled-up Animated Brand Icon Ring */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute w-36 h-36 rounded-full bg-linear-to-tr from-[#38BDF8] to-[#60A5FA] opacity-25 blur-xl animate-pulse" />
          
          {/* Spinning Ring */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-300/40 dark:border-slate-800 border-t-[#38BDF8] dark:border-t-[#38BDF8] animate-spin" />
          
          {/* Centered Logo Preview */}
          <div className="absolute p-3 rounded-full bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md">
            <Image
              src="/logo.webp"
              alt="CodeByMonir Loading"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Larger Brand Typographic Label */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-2xl sm:text-3xl font-black tracking-tight">
            <span className="text-indigo-600 dark:text-indigo-400">CodeBy</span>
            <span className="text-slate-800 dark:text-slate-100">Monir</span>
          </div>

          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}
