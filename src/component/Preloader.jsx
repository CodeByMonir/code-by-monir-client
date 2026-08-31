"use client";

import { useEffect, useState } from "react";

export const assets = [
    "/about-image.webp",
    "/logo.webp",
    "/og-image.webp",
    "/profile.webp",
    "/robots.txt",
    "/sitemap-0.xml",
    "/sitemap.xml",
    "/Monir_Hossen_Mern_Resume.pdf",
];

const phrases = [
    "Crafting pixels...",
    "Warming up...",
    "Almost there...",
    "Ready to inspire!",
];

export default function Preloader({ onFinish }) {
    const [progress, setProgress] = useState(0);
    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        let loadedCount = 0;
        const totalAssets = assets.length;

        if (totalAssets === 0) {
            if (onFinish) onFinish();
            return;
        }

        const updateProgress = () => {
            loadedCount += 1;
            const currentProgress = Math.round((loadedCount / totalAssets) * 100);
            setProgress(currentProgress);

            const nextPhraseIndex = Math.min(
                Math.floor((loadedCount / totalAssets) * phrases.length),
                phrases.length - 1
            );
            setPhraseIndex(nextPhraseIndex);

            if (loadedCount === totalAssets) {
                setTimeout(() => {
                    if (onFinish) onFinish();
                }, 600);
            }
        };

        assets.forEach((src) => {
            const isImage = /\.(webp|jpg|jpeg|png|gif|svg)$/i.test(src);

            if (isImage) {
                const img = new Image();
                img.src = src;
                img.onload = updateProgress;
                img.onerror = updateProgress;
            } else {
                fetch(src, { method: "HEAD" })
                    .then(updateProgress)
                    .catch(updateProgress);
            }
        });
    }, [onFinish]);

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