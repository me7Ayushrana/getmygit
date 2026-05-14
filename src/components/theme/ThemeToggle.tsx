'use client';

import * as React from 'react';
import { Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [showHint, setShowHint] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        // Show hint after 3 seconds if in light mode
        const timer = setTimeout(() => {
            if (theme !== 'dark') {
                setShowHint(true);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [theme]);

    if (!mounted) return <div className="w-10 h-10" />;

    return (
        <div className="relative flex items-center">
            <AnimatePresence>
                {showHint && theme !== 'dark' && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.8 }}
                        className="absolute right-full mr-4 whitespace-nowrap px-4 py-2 bg-zinc-900 text-white text-[11px] font-medium rounded-full shadow-2xl border border-white/10 flex items-center gap-3 z-[100]"
                    >
                        <span>Switch to Dark Mode for a cinematic experience</span>
                        <button 
                            onClick={() => setShowHint(false)}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={10} />
                        </button>
                        {/* Little Arrow */}
                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-r border-t border-white/10 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                    setShowHint(false);
                }}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-white/[0.03] border border-black/[0.1] dark:border-white/[0.1] hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 group overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-none"
                aria-label="Toggle theme"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                        <motion.div
                            key="moon"
                            initial={{ y: 10, opacity: 0, rotate: -45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -10, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Moon size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ y: 10, opacity: 0, rotate: -45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -10, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Sun size={18} className="text-amber-500 group-hover:scale-110 transition-transform" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
}
