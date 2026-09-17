import ColorPaletteManager from '@/component/Features/ColerPaletteManager';
import React from 'react';

const metadata = {
    title: 'Colors Palette',
    description: 'You can check the colors codes and copy them to use in your projects.',
};

const page = () => {
    return (
        <div>
            <ColorPaletteManager />
        </div>
    );
};

export default page;