"use client";

import { assets } from "@/lib/preloadAssets";
import { useEffect, useState, useRef } from "react";

const phrases = [
    "Crafting pixels...",
    "Warming up...",
    "Almost there...",
    "Ready to inspire!",
];

export default function Preloader({ onFinish }) {
    const [progress, setProgress] = useState(0);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const onFinishRef = useRef(onFinish);

    // Keep latest onFinish without causing useEffect to re-run
    useEffect(() => {
        onFinishRef.current = onFinish;
    }, [onFinish]);

    useEffect(() => {
        const totalAssets = assets.length;

        if (totalAssets === 0) {
            if (onFinishRef.current) onFinishRef.current();
            return;
        }

        let loadedCount = 0;
        let isFinished = false;

        // Prevent garbage collection on mobile WebKit/Blink
        const imageHolder = [];

        const handleComplete = () => {
            if (isFinished) return;
            isFinished = true;
            imageHolder.length = 0; // Release references
            if (onFinishRef.current) onFinishRef.current();
        };

        const updateProgress = () => {
            if (isFinished) return;

            loadedCount += 1;
            const currentProgress = Math.min(
                100,
                Math.round((loadedCount / totalAssets) * 100)
            );
            setProgress(currentProgress);

            const nextPhraseIndex = Math.min(
                Math.floor((loadedCount / totalAssets) * phrases.length),
                phrases.length - 1
            );
            setPhraseIndex(nextPhraseIndex);

            if (loadedCount >= totalAssets) {
                setTimeout(handleComplete, 400);
            }
        };

        // Global fallback: Ensure mobile users are never stuck indefinitely
        const globalTimeout = setTimeout(() => {
            setProgress(100);
            handleComplete();
        }, 7000); // 7-second fallback

        assets.forEach((src) => {
            const isImage = /\.(webp|jpg|jpeg|png|gif|svg)(\?.*)?$/i.test(src);

            if (isImage) {
                const img = new Image();
                imageHolder.push(img);

                img.onload = updateProgress;
                img.onerror = updateProgress;
                img.src = src;

                // If the browser already has it cached, complete immediately
                if (img.complete) {
                    updateProgress();
                }
            } else {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 4000);

                fetch(src, { method: "HEAD", signal: controller.signal })
                    .then(() => {
                        clearTimeout(timeoutId);
                        updateProgress();
                    })
                    .catch(() => {
                        clearTimeout(timeoutId);
                        updateProgress();
                    });
            }
        });

        return () => {
            clearTimeout(globalTimeout);
            imageHolder.length = 0;
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-900 px-6 py-12 text-slate-100">
            {/* Top Header */}
            <div className="w-full text-center">
                <span className="text-xs uppercase tracking-widest text-slate-400">
                    Portfolio
                </span>
            </div>

            {/* Main Center Area */}
            <div className="flex w-full max-w-sm flex-col items-center space-y-6 text-center">
                <div className="space-y-1">
                    <p className="text-xl font-medium tracking-tight transition-all duration-300">
                        {phrases[phraseIndex]}
                    </p>
                    <p className="text-4xl font-extrabold text-blue-400">{progress}%</p>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Footer Branding */}
            <div className="w-full text-center">
                <p className="text-sm font-light tracking-wide text-slate-400">
                    Code By <span className="font-semibold text-slate-200">Monir</span>
                </p>
            </div>
        </div>
    );
}