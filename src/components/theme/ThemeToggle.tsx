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
        
        // Check if theme hint is permanently dismissed
        try {
            const dismissed = localStorage.getItem('theme-toggle-dismissed') === 'true';
            if (theme === 'dark' || dismissed) {
                return;
            }
        } catch (e) {
            // Silence localStorage issues in strict privacy settings
        }

        // Show hint after 3 seconds on first visit in light theme
        const timer = setTimeout(() => {
            setShowHint(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [theme]);

    if (!mounted) return <div className="w-14 h-8" />;

    const currentTheme = theme || 'light';

    const handleToggle = () => {
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(targetTheme);
        setShowHint(false);
        try {
            localStorage.setItem('theme-toggle-dismissed', 'true');
        } catch (e) {}
    };

    const handleDismiss = () => {
        setShowHint(false);
        try {
            localStorage.setItem('theme-toggle-dismissed', 'true');
        } catch (e) {}
    };

    return (
        <div className="relative flex items-center">
            {/* First-Visit Prompt Tooltip */}
            <AnimatePresence>
                {showHint && currentTheme !== 'dark' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full mt-3 right-0 whitespace-nowrap p-3.5 bg-zinc-950 text-white rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3.5 z-[100] pointer-events-auto"
                    >
                        {/* Little Arrow pointing up */}
                        <div className="absolute -top-1 right-6 w-2 h-2 bg-zinc-950 border-l border-t border-white/10 rotate-45" />
                        
                        <span className="text-[11px] font-semibold text-zinc-300">Switch to Dark Theme?</span>
                        
                        {/* Embedded Switch Toggle */}
                        <button
                            onClick={handleToggle}
                            className="w-8 h-4.5 bg-zinc-800 rounded-full p-[2px] flex items-center cursor-pointer transition-colors duration-200 hover:bg-zinc-700 relative"
                            aria-label="Activate Dark Mode"
                        >
                            <div className="w-3.5 h-3.5 bg-white rounded-full shadow-md transform translate-x-0" />
                        </button>

                        {/* Close Cross Button */}
                        <button 
                            onClick={handleDismiss}
                            className="p-1 text-zinc-400 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center justify-center cursor-pointer"
                            aria-label="Dismiss hint"
                        >
                            <X size={12} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Sliding Toggle Switch */}
            <button
                onClick={handleToggle}
                className="w-14 h-8 flex items-center rounded-full bg-black/[0.04] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] hover:border-blue-500/50 dark:hover:border-blue-400/50 p-1 relative transition-all duration-300 shadow-inner overflow-hidden cursor-pointer"
                aria-label="Toggle theme"
            >
                {/* Underlay icons */}
                <div className="absolute inset-x-2 flex justify-between items-center text-zinc-400 dark:text-zinc-500 pointer-events-none select-none">
                    <Sun size={12} className="opacity-40 dark:opacity-100 transition-opacity" />
                    <Moon size={12} className="opacity-100 dark:opacity-40 transition-opacity" />
                </div>
                
                {/* Sliding Knob */}
                <motion.div
                    className="w-6 h-6 bg-white dark:bg-zinc-900 rounded-full shadow-md flex items-center justify-center z-10"
                    animate={{
                        x: currentTheme === 'dark' ? 24 : 0
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                >
                    {currentTheme === 'dark' ? (
                        <Moon size={12} className="text-zinc-400" />
                    ) : (
                        <Sun size={12} className="text-amber-500 animate-spin-slow" />
                    )}
                </motion.div>
            </button>
        </div>
    );
}
