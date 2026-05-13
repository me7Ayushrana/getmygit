'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const logs = [
    "initializing repository scan...",
    "establishing secure connection to GitHub API...",
    "fetching repository metadata and language statistics...",
    "parsing Abstract Syntax Tree (AST)...",
    "analyzing architectural dependencies...",
    "detecting structural vulnerabilities and risks...",
    "calculating repository intelligence score...",
    "generating interactive visualization models...",
    "deployment readiness confirmed."
];

export function TerminalLoader({ isVisible, repoName = "repository" }: { isVisible: boolean, repoName?: string }) {
    const [currentLogIndex, setCurrentLogIndex] = useState(0);

    useEffect(() => {
        if (!isVisible) {
            setCurrentLogIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setCurrentLogIndex((prev) => {
                if (prev < logs.length - 1) return prev + 1;
                return prev; // Stop at the last log
            });
        }, 800); // 800ms per log line

        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 backdrop-blur-xl p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="w-full max-w-2xl bg-[#030014] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(225,29,72,0.15)] overflow-hidden flex flex-col"
                    >
                        {/* Terminal Header */}
                        <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Terminal size={16} className="text-zinc-400" />
                                <span className="text-xs font-mono text-zinc-400 font-medium tracking-wider">
                                    GETMYGIT_TERMINAL_v2.0
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 h-[300px] overflow-hidden flex flex-col justify-end">
                            <div className="space-y-2 font-mono text-sm">
                                <div className="text-zinc-500 mb-6">
                                    <span className="text-primary font-bold">system</span>@getmygit:~$ analyze {repoName}
                                </div>
                                
                                {logs.slice(0, currentLogIndex + 1).map((log, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="text-zinc-600 shrink-0">{'>'}</span>
                                        <span className={
                                            idx === logs.length - 1 
                                                ? "text-green-400 font-bold" 
                                                : "text-zinc-300"
                                        }>
                                            {log}
                                        </span>
                                    </motion.div>
                                ))}
                                
                                <motion.div 
                                    animate={{ opacity: [1, 0, 1] }} 
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-2 h-4 bg-primary mt-2 ml-4"
                                />
                            </div>
                        </div>
                        
                        {/* Footer Status */}
                        <div className="bg-[#050505] border-t border-white/5 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                <ShieldCheck size={14} className="text-primary" />
                                Analyzing architecture integrity...
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                <Zap size={14} className="text-yellow-500 animate-pulse" />
                                PROCESSING
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
