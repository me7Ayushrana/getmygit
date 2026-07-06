'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Key, X, Check, Trash2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TokenSettings() {
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState('');
    const [hasToken, setHasToken] = useState(false);
    const [saved, setSaved] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if there is an existing custom token in cookies
        const updateTokenStatus = () => {
            const cookies = document.cookie.split(';');
            const tokenExists = cookies.some(item => item.trim().startsWith('github-token='));
            setHasToken(tokenExists);
        };
        updateTokenStatus();

        // Listen for clicks outside the container to close the modal
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!token.trim()) return;

        // Set cookie github-token (valid for 1 year)
        document.cookie = `github-token=${token.trim()}; path=/; max-age=31536000; SameSite=Lax`;
        
        // Also save to localStorage as backup
        localStorage.setItem('github-token', token.trim());

        setHasToken(true);
        setSaved(true);
        setToken('');

        setTimeout(() => {
            setSaved(false);
            setIsOpen(false);
            // Reload page to re-trigger server analysis with new token
            window.location.reload();
        }, 800);
    };

    const handleClear = () => {
        // Clear cookie
        document.cookie = 'github-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
        // Clear localStorage
        localStorage.removeItem('github-token');

        setHasToken(false);
        setToken('');
        setIsOpen(false);
        
        // Reload
        window.location.reload();
    };

    return (
        <div ref={containerRef} className="relative flex items-center">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 group shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-none cursor-pointer
                    ${isOpen || hasToken
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400 border'
                        : 'bg-white dark:bg-white/[0.03] border border-black/[0.1] dark:border-white/[0.1] text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                    }
                `}
                aria-label="GitHub Token Settings"
                title="GitHub Token Settings"
            >
                <Key size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                
                {/* Active Indicator Dot */}
                {hasToken && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 border-2 border-white dark:border-[#0a0814] rounded-full animate-pulse" />
                )}
            </button>

            {/* Dropdown Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full mt-3 right-0 w-80 bg-zinc-950 text-white p-5 rounded-2xl shadow-2xl border border-white/10 z-[100] pointer-events-auto"
                    >
                        {/* Little Arrow pointing up */}
                        <div className="absolute -top-1 right-4 w-2 h-2 bg-zinc-950 border-l border-t border-white/10 rotate-45" />

                        {/* Title Row */}
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-1.5">
                                <Key className="w-3.5 h-3.5 text-blue-400" />
                                GitHub Token
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            >
                                <X size={12} />
                            </button>
                        </div>

                        <p className="text-[10px] text-zinc-400 leading-relaxed mb-4">
                            Set your Personal Access Token to avoid hitting API rate limits and view private repos.
                        </p>

                        {/* Current Status */}
                        <div className="mb-4 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-medium text-zinc-400 uppercase">Status</span>
                            <div className="flex items-center gap-1.5">
                                {hasToken ? (
                                    <>
                                        <Check className="w-3 h-3 text-emerald-400" />
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Configured</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Not Set</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSave} className="space-y-3">
                            <input
                                type="password"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder={hasToken ? "••••••••••••••••••••••••" : "Paste token (ghp_...)"}
                                className="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-blue-400/50 transition-colors font-mono"
                                required={!hasToken}
                            />

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={saved}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-zinc-100 text-zinc-950 font-bold rounded-xl text-[10px] uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {saved ? (
                                        <>
                                            <Check className="w-3 h-3 text-emerald-600" />
                                            Saved!
                                        </>
                                    ) : (
                                        'Save'
                                    )}
                                </button>

                                {hasToken && (
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/10 transition-colors flex items-center justify-center cursor-pointer"
                                        title="Clear Stored Key"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="mt-4 pt-4 border-t border-white/[0.05] text-[9px] text-zinc-500 flex items-center gap-1 leading-normal">
                            <HelpCircle className="w-3 h-3 text-zinc-400 shrink-0" />
                            <span>Classic token with <code>repo</code> scope is required.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
