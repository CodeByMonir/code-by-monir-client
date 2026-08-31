'use client';

import {
    Briefcase,
    Code2,
    FolderGit2,
    Home,
    Mail,
    Menu,
    Moon,
    Sun,
    User,
    X
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'About', id: 'about', icon: User },
    { name: 'Experience', id: 'experience', icon: Briefcase },
    { name: 'Skills', id: 'skills', icon: Code2 },
    { name: 'Projects', id: 'projects', icon: FolderGit2 },
    { name: 'Contacts', id: 'contacts', icon: Mail },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { theme, resolvedTheme, setTheme } = useTheme();

    const pathname = usePathname();
    const router = useRouter();

    // Scrollspy detection
    useEffect(() => {
        setMounted(true);

        // Only run scrollspy if we are on the homepage
        if (pathname !== '/') {
            setActiveSection('');
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const navHeight = 100;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            // 1. If at the top of the page, default to home
            if (scrollY < 100) {
                setActiveSection('home');
                return;
            }

            // 2. If scrolled near the bottom, highlight contacts
            if (scrollHeight > clientHeight && clientHeight + scrollY >= scrollHeight - 80) {
                setActiveSection(navItems[navItems.length - 1].id);
                return;
            }

            // 3. Iterate through sections to determine view
            let current = 'home';
            navItems.forEach((item) => {
                const el = document.getElementById(item.id);
                if (el) {
                    const top = el.offsetTop - navHeight;
                    const height = el.offsetHeight;
                    if (scrollY >= top && scrollY < top + height) {
                        current = item.id;
                    }
                }
            });

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // Handle intra-page scrolling or inter-page navigation
    const handleNavigation = (e, id) => {
        e.preventDefault();
        setIsOpen(false);

        if (pathname === '/') {
            // If already on homepage, scroll smoothly
            const element = document.getElementById(id);
            if (element) {
                const navHeight = 70;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
            setActiveSection(id);
        } else {
            // If on another route, navigate to the anchor on the homepage
            router.push(`/#${id}`);
        }
    };

    const toggleTheme = () => {
        const currentTheme = theme === 'system' ? resolvedTheme : theme;
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 transition-all">
            <div className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                    {/* Brand */}
                    <button
                        onClick={(e) => handleNavigation(e, 'home')}
                        className="flex items-center gap-2 group text-left cursor-pointer"
                    >
                        <div className="rounded-full border border-white/40 dark:border-white/10 shadow-sm group-hover:scale-105 transition-transform">
                            <Image
                                src="/logo.webp"
                                alt="CodeByMonir Logo"
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight md:hidden lg:inline-block drop-shadow-sm">
                            <span className="text-indigo-600 dark:text-indigo-400">CodeBy</span>
                            <span className="text-zinc-800 dark:text-zinc-100">Monir</span>
                        </span>
                    </button>

                    {/* Desktop / Tablet Nav */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-white/30 dark:bg-white/5 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.3)]">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;

                            return (
                                <button
                                    key={item.name}
                                    onClick={(e) => handleNavigation(e, item.id)}
                                    title={item.name}
                                    type="button"
                                    className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer ${isActive
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                                            : 'text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-white/10'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="sr-only">{item.name}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Theme Toggle & Mobile Trigger */}
                    <div className="flex items-center gap-2">
                        {!mounted ? (
                            <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 animate-pulse" />
                        ) : (
                            <button
                                onClick={toggleTheme}
                                type="button"
                                aria-label="Toggle Theme"
                                className="p-2.5 rounded-full bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-white/50 dark:hover:bg-white/10 shadow-sm transition-all cursor-pointer"
                            >
                                {resolvedTheme === 'dark' ? (
                                    <Sun className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                ) : (
                                    <Moon className="w-4 h-4 text-zinc-800" />
                                )}
                            </button>
                        )}

                        <button
                            onClick={() => setIsOpen(true)}
                            type="button"
                            aria-label="Open Navigation Menu"
                            className="p-2.5 rounded-xl bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-white/50 dark:hover:bg-white/10 md:hidden shadow-sm transition-all cursor-pointer"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md md:hidden animate-in fade-in duration-200">
                    <div className="w-full max-w-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl p-6 shadow-[0_16px_40px_rgba(0,0,0,0.2)] space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-white/20 dark:border-white/10">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/logo.webp"
                                    alt="CodeByMonir Logo"
                                    width={28}
                                    height={28}
                                    className="w-7 h-7 rounded-full object-contain"
                                />
                                <span className="font-bold text-lg">
                                    <span className="text-indigo-600 dark:text-indigo-400">CodeBy</span>
                                    <span className="text-zinc-800 dark:text-zinc-100">Monir</span>
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                type="button"
                                aria-label="Close Navigation Menu"
                                className="p-2 rounded-xl bg-white/30 dark:bg-white/5 border border-white/30 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-white/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;

                                return (
                                    <button
                                        key={item.name}
                                        onClick={(e) => handleNavigation(e, item.id)}
                                        type="button"
                                        className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-medium transition-all shadow-sm w-full text-left cursor-pointer ${isActive
                                                ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                                                : 'bg-white/20 dark:bg-white/5 hover:bg-white/40 dark:hover:bg-white/10 border border-white/20 dark:border-white/5 text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-indigo-500 dark:text-indigo-400'}`} />
                                        <span>{item.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}