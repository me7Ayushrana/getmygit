'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, ShieldCheck, Zap, Code2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TerminalLoader } from './TerminalLoader';

export function Hero() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleAnalyze = () => {
        let owner = '';
        let repo = '';

        try {
            const cleanUrl = url.trim();
            if (!cleanUrl) return;

            if (cleanUrl.startsWith('https://github.com/')) {
                const parts = cleanUrl.replace('https://github.com/', '').split('/');
                owner = parts[0];
                repo = parts[1];
            } else if (cleanUrl.split('/').length === 2) {
                const parts = cleanUrl.split('/');
                owner = parts[0];
                repo = parts[1];
            } else {
                alert('Invalid format. Use owner/repo or full github URL.');
                return;
            }

            if (!owner || !repo) {
                alert('Invalid format. Use owner/repo or full github URL.');
                return;
            }

            setIsLoading(true);
            router.push(`/${owner}/${repo}`);
        } catch (e) {
            alert('Please enter a valid GitHub URL (e.g., owner/repo or full link)');
        }
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    return (
        <section ref={containerRef} className="relative min-h-[140vh] flex flex-col items-center pt-32 overflow-hidden z-10">
            
            {/* Cinematic Netflix/Vercel Background */}
            <div className="absolute inset-0 bg-void -z-30" />

            {/* Premium Purple Glassmorphism Shimmer (Moving Right to Left) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-25">
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: '-100%' }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-[120px] skew-x-12"
                />
            </div>

            {/* Premium Right Border Animation (Data Flow) */}
            <div className="absolute right-0 top-0 w-32 h-full pointer-events-none hidden xl:block z-0 mix-blend-screen opacity-60">
                {/* Subtle Grid Lines */}
                <div className="absolute right-8 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute right-16 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                
                {/* Glowing Data Packets moving down */}
                <motion.div 
                    animate={{ top: ['-20%', '120%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute right-[31px] w-[3px] h-40 bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_15px_#E11D48]"
                />
                {/* Glowing Data Packets moving up */}
                <motion.div 
                    animate={{ top: ['120%', '-20%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1.5 }}
                    className="absolute right-[63px] w-[3px] h-64 bg-gradient-to-b from-transparent via-secondary to-transparent shadow-[0_0_15px_#7C3AED]"
                />
            </div>
            
            {/* Massive Multi-color Aura Glow */}
            <motion.div style={{ y, opacity }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] -z-20 pointer-events-none mix-blend-screen opacity-70">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-tertiary rounded-full blur-[140px] animate-pulse-slow" />
            </motion.div>
            
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030008_70%)] -z-10 pointer-events-none" />

            <div className="container px-4 z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                
                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-pointer"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#E11D48]" />
                    <span className="text-xs font-semibold tracking-wide text-zinc-300">GetMyGit Cinematic Engine is live</span>
                    <ArrowRight size={14} className="text-zinc-500" />
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center leading-[1.1] mb-6 max-w-5xl"
                >
                    <span className="golden-shimmer-text">Intelligent</span> <span className="cinematic-text">GitHub PR &</span> <br className="hidden md:block" />
                    <span className="cinematic-text">Repository Intelligence</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-zinc-400 text-center max-w-2xl mb-12 leading-relaxed"
                >
                    Elevate your engineering workflows with deep structural analysis, automated PR risk scoring, and intelligent reviewer assignments.
                </motion.p>

                {/* Input and CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 justify-center items-center relative z-20"
                >
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Paste GitHub Repository or PR URL..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                            disabled={isLoading}
                            className="w-full bg-black/60 border border-white/10 rounded-2xl pl-6 pr-4 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-sans placeholder:text-zinc-500 shadow-inner backdrop-blur-2xl disabled:opacity-50"
                        />
                    </div>
                    
                    <button 
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="whitespace-nowrap group relative px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.1)] disabled:opacity-50"
                    >
                        {isLoading ? 'Scanning...' : 'Analyze'} {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </motion.div>

                {/* Dashboard Mockup (The "Movie Poster") */}
                <motion.div 
                    style={{ scale }}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 relative w-full"
                >
                    <motion.div 
                    className="relative mx-auto max-w-5xl perspective-[2000px]"
                    animate={{ 
                        y: [-10, 10, -10],
                        rotateX: [2, -2, 2],
                        rotateY: [-1, 1, -1]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                >
                    <div className="glass-card rounded-xl border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-hidden relative bg-[#030008]">
                        {/* Mac Window Header */}
                        <div className="h-10 bg-[#18181b]/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            
                            {/* Fake URL Bar */}
                            <div className="ml-4 flex-1 max-w-md h-6 bg-black/40 rounded-md border border-white/5 flex items-center px-3">
                                <span className="text-[10px] text-zinc-500 font-mono">getmygit.com/analysis</span>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="w-full relative overflow-hidden bg-void">
                            <img 
                                src="/hero-dashboard.jpg" 
                                alt="GetMyGit Intelligence Dashboard"
                                className="w-full h-auto block"
                            />
                        </div>

                        {/* Elegant Gradient overlay for depth inside the window */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                </motion.div>
                </motion.div>
            </div>
            
            {/* Fade out bottom to blend with next section */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-void to-transparent pointer-events-none" />
            
            <TerminalLoader isVisible={isLoading} repoName={url || 'repository'} />
        </section>
    );
}
