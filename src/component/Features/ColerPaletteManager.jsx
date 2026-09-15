'use client';

import { useState, useEffect } from 'react';

// Basic color palette dictionary to match color names
const NAMED_COLORS = {
    "#000000": "Black", "#ffffff": "White", "#ff0000": "Red", "#00ff00": "Lime",
    "#0000ff": "Blue", "#ffff00": "Yellow", "#00ffff": "Cyan", "#ff00ff": "Magenta",
    "#c0c0c0": "Silver", "#808080": "Gray", "#800000": "Maroon", "#808000": "Olive",
    "#008000": "Green", "#800080": "Purple", "#008080": "Teal", "#000080": "Navy",
    "#ffa500": "Orange", "#a52a2a": "Brown", "#ffc0cb": "Pink", "#ffd700": "Gold",
    "#4b0082": "Indigo", "#ee82ee": "Violet", "#f0e68c": "Khaki", "#e6e6fa": "Lavender"
};

// Convert any valid CSS color into an RGBA array via browser canvas
const parseColorToRgba = (colorStr) => {
    if (typeof window === 'undefined' || !colorStr?.trim()) return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#000000';
    ctx.fillStyle = colorStr.trim();

    const isValid =
        ctx.fillStyle !== '#000000' ||
        colorStr.trim().toLowerCase() === 'black' ||
        colorStr.trim().toLowerCase() === '#000' ||
        colorStr.trim().toLowerCase() === '#000000';

    if (!isValid) return null;

    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
};

// Find the closest named color using Euclidean distance in RGB space
const getClosestColorName = (colorStr) => {
    const rgba = parseColorToRgba(colorStr);
    if (!rgba) return 'Invalid / Unknown Color';

    const [r1, g1, b1] = rgba;
    let minDistance = Infinity;
    let closestName = 'Unknown';

    for (const [hex, name] of Object.entries(NAMED_COLORS)) {
        const r2 = parseInt(hex.slice(1, 3), 16);
        const g2 = parseInt(hex.slice(3, 5), 16);
        const b2 = parseInt(hex.slice(5, 7), 16);

        const distance = Math.sqrt(
            Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestName = name;
        }
    }

    return minDistance === 0 ? closestName : `~ ${closestName}`;
};

export default function ColorPaletteManager() {
    const [colors, setColors] = useState(['#3b82f6', 'rgba(239, 68, 68, 0.8)', 'hsl(142, 76%, 36%)']);
    const [isMounted, setIsMounted] = useState(false);

    // Prevents hydration mismatch by deferring canvas operations until mounted on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Extract valid color strings from clipboard data
    const extractColors = (text) => {
        const regex = /(#(?:[0-9a-fA-F]{3,8})|rgba?\([^)]+\)|hsla?\([^)]+\)|[a-zA-Z]+)/g;
        const matches = text.match(regex);
        return matches ? matches.map((c) => c.trim()) : [];
    };

    // Global or localized paste handler
    const handleBatchPaste = (e) => {
        const pastedText = e.clipboardData.getData('text');
        const parsedColors = extractColors(pastedText);

        if (parsedColors.length > 1) {
            e.preventDefault();
            setColors(parsedColors);
        }
    };

    const handleInputChange = (index, value) => {
        const updated = [...colors];
        updated[index] = value;
        setColors(updated);
    };

    const addInput = () => setColors([...colors, '']);
    const removeInput = (index) => setColors(colors.filter((_, i) => i !== index));
    const handleReset = () => setColors(['']);

    return (
        <div className="mt-10">
            <div className="w-full py-6 sm:py-12 px-3 sm:px-6 lg:px-8 transition-colors duration-200">
                <div
                    onPaste={handleBatchPaste}
                    className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-xl dark:shadow-none space-y-6"
                >
                    {/* Top Header & Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                                Color Palette Inputs
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Paste all colors together using{' '}
                                <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 font-mono text-xs">
                                    Ctrl + V
                                </kbd>
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={addInput}
                                className="flex-1 sm:flex-none px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                            >
                                + Add
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex-1 sm:flex-none px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-rose-600 dark:bg-rose-700 hover:bg-rose-700 dark:hover:bg-rose-600 rounded-lg shadow-sm transition"
                            >
                                Reset All
                            </button>
                        </div>
                    </div>

                    {/* Color Input List */}
                    <div className="space-y-4">
                        {colors.map((color, index) => {
                            const isValid = isMounted ? Boolean(parseColorToRgba(color)) : false;
                            const colorName = !isMounted
                                ? 'Checking...'
                                : color
                                    ? getClosestColorName(color)
                                    : 'No color entered';

                            return (
                                <div
                                    key={index}
                                    className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl transition"
                                >
                                    {/* Mobile Top Row / Desktop Left: Inputs & Info */}
                                    <div className="flex-1 space-y-2.5 pr-8 sm:pr-0">
                                        <input
                                            type="text"
                                            placeholder="e.g. #3b82f6, rgba(255,0,0,0.5), hsl(120, 100%, 50%)"
                                            value={color}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        />

                                        {/* Color Name Box */}
                                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs">
                                            <span className="text-slate-500 dark:text-slate-400 font-medium">
                                                Color Name:
                                            </span>
                                            <span
                                                className={`font-semibold tracking-wide ${isValid
                                                        ? 'text-slate-800 dark:text-slate-200'
                                                        : 'text-amber-600 dark:text-amber-400'
                                                    }`}
                                            >
                                                {colorName}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Desktop & Mobile Row: Preview swatch */}
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div
                                            className="relative w-full sm:w-16 h-10 sm:h-16 rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner flex items-center justify-center overflow-hidden shrink-0"
                                            style={{
                                                backgroundImage: `linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)`,
                                                backgroundSize: '10px 10px',
                                                backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
                                            }}
                                        >
                                            <div
                                                className="absolute inset-0 transition-colors"
                                                style={{ backgroundColor: isValid ? color : 'transparent' }}
                                            />
                                            {!isValid && (
                                                <span className="relative z-10 text-[11px] font-medium text-slate-400 dark:text-slate-500 px-1 select-none">
                                                    {color ? 'Invalid' : 'Empty'}
                                                </span>
                                            )}
                                        </div>

                                        {/* Remove Button for Desktop (Inline) */}
                                        {colors.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeInput(index)}
                                                className="hidden sm:inline-flex p-1.5 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-lg transition shrink-0"
                                                title="Remove color field"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    {/* Remove Button for Mobile (Top-Right Pin) */}
                                    {colors.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeInput(index)}
                                            className="sm:hidden absolute top-2.5 right-2.5 p-1.5 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 rounded-lg transition"
                                            title="Remove color field"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}