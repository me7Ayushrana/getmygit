'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
    );
}
