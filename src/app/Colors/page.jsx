import ColorPaletteManager from '@/component/Features/ColerPaletteManager';
import React from 'react';

export const metadata = {
    title: "Color Palette Manager | CodeByMonir",
    description: "A simple React-based color palette manager that allows users to input, validate, and preview colors in various formats (Hex, RGB, HSL).",
};

const page = () => {
    return (
        <div>
            <ColorPaletteManager />
        </div>
    );
};

export default page;