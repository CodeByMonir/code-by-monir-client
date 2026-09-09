import ProjectsPage from '@/component/projects/page';
import React from 'react';

export const metadata = {
    title: "Projects | Monir Hossen",
    description: "A collection of projects showcasing various web development skills and technologies.",
};

const page = () => {
    return (
        <div>
            <ProjectsPage />
        </div>
    );
};

export default page;