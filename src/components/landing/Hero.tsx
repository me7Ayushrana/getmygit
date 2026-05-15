'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TerminalLoader } from './TerminalLoader';

export function Hero() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
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
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: (e.clientX - rect.left) / rect.width - 0.5,
                y: (e.clientY - rect.top) / rect.height - 0.5
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    return (
        <section ref={containerRef} className="relative min-h-[140vh] flex flex-col items-center pt-32 overflow-hidden z-10 transition-colors duration-500">
            
            {/* Background Layer */}
            <div className="absolute inset-0 bg-[#fafafa] dark:bg-void -z-30 transition-colors duration-500" />

            {/* Premium Shimmer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-25">
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: '-100%' }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-purple-500/5 dark:via-purple-500/10 to-transparent blur-[120px] skew-x-12"
                />
            </div>

            {/* Massive Multi-color Aura Glow with Mouse Parallax */}
            <motion.div 
                style={{ 
                    y, 
                    opacity,
                    translateX: mousePos.x * 50,
                    translateY: mousePos.y * 50
                }} 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] -z-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-70 transition-opacity"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-tertiary rounded-full blur-[140px] animate-pulse-slow" />
            </motion.div>
            
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,250,250,0.8)_70%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#030008_70%)] -z-10 pointer-events-none transition-colors duration-500" />

            <div className="container px-4 z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                
                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 cursor-default shadow-sm group mb-8 backdrop-blur-md ${
                        isOnline 
                        ? 'border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10' 
                        : 'border-rose-500/30 bg-rose-500/10 dark:bg-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    }`}
                >
                    <span className={`flex h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-rose-600 shadow-[0_0_12px_#e11d48] animate-pulse'}`} />
                    <span className={`text-xs font-semibold tracking-wide ${isOnline ? 'text-gray-600 dark:text-zinc-300' : 'text-rose-600 dark:text-rose-400'}`}>
                        {isOnline ? 'GetMyGit Cinematic Engine is live' : 'oops! GetMyGit Engine is offline.'}
                    </span>
                    <ArrowRight size={14} className={`text-gray-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform ${!isOnline && 'hidden'}`} />
                </motion.div>

                {/* Main Headline with Split Text Effect */}
                <div className="overflow-hidden mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center leading-[1.1] max-w-5xl"
                    >
                        <span className="prism-text">Intelligent</span> <br className="hidden md:block" />
                        <span className="cinematic-text">GitHub Intelligence</span>
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-gray-500 dark:text-zinc-400 text-center max-w-2xl mb-12 leading-relaxed font-light"
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
                    <div className="relative w-full group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition-opacity" />
                        <input
                            type="text"
                            placeholder="Paste GitHub Repository or PR URL..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                            disabled={isLoading}
                            className="relative w-full bg-white/80 dark:bg-black/60 border border-black/10 dark:border-white/10 rounded-2xl pl-6 pr-4 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary/30 dark:focus:border-primary/50 transition-all font-sans placeholder:text-gray-400 dark:placeholder:text-zinc-500 shadow-xl dark:shadow-inner backdrop-blur-2xl disabled:opacity-50"
                        />
                    </div>
                    
                    <motion.button 
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            x: mousePos.x * 10,
                            y: mousePos.y * 10
                        }}
                        className="whitespace-nowrap group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:bg-black dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-2xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)] disabled:opacity-50"
                    >
                        {isLoading ? 'Scanning...' : 'Analyze'} {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </motion.button>
                </motion.div>

                {/* Dashboard Mockup with Mouse Parallax */}
                <motion.div 
                    style={{ 
                        scale,
                        rotateX: mousePos.y * -15,
                        rotateY: mousePos.x * 15,
                    }}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 relative w-full perspective-[2000px]"
                >
                    <div className="relative mx-auto max-w-5xl">
                        <div className="relative rounded-2xl border border-black/[0.05] dark:border-white/10 shadow-2xl dark:shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-hidden bg-white dark:bg-[#030008] transition-colors duration-500">
                            {/* Mac Window Header */}
                            <div className="h-11 bg-gray-50/80 dark:bg-[#18181b]/80 backdrop-blur-md border-b border-black/[0.05] dark:border-white/5 flex items-center px-4 gap-2 transition-colors">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                
                                <div className="ml-4 flex-1 max-w-md h-6 bg-black/[0.03] dark:bg-black/40 rounded-lg border border-black/[0.05] dark:border-white/5 flex items-center px-3">
                                    <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">getmygit.com/analysis</span>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="w-full aspect-video relative overflow-hidden bg-gray-100 dark:bg-void">
                                <img 
                                    src="/hero-dashboard.jpg" 
                                    alt="GetMyGit Intelligence Dashboard"
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/10 dark:from-black/60 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Fade out bottom */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#fafafa] dark:from-void to-transparent pointer-events-none transition-colors duration-500" />
            
            <TerminalLoader isVisible={isLoading} repoName={url || 'repository'} />
        </section>
    );
}
