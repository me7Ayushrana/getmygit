'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
// import { HeroBackground } from './HeroBackground';
import { HeroScene } from './HeroScene';

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-10">
            {/* Void Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px] -z-10 opacity-30 pointer-events-none" />
            <HeroBackground />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#030014_100%)] -z-10 pointer-events-none" />

            <div className="container px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/5 text-neon-green text-xs tracking-widest font-display mb-8"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_#00ff9d]" />
                    <span>VISUAL ENGINE READY</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-8 text-white"
                >
                    VISUALIZE <br />
                    <span className="shimmer-text">REPOS</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed border-l border-white/5 pl-6 italic"
                >
                    Transform complex GitHub repositories into interactive, node-based architecture maps.
                    <span className="text-neon-blue text-glow not-italic ml-2">Instantly.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link href="#analyze" className="group relative px-8 py-4 bg-white/5 border border-white/10 hover:border-neon-blue/50 text-white rounded-full transition-all overflow-hidden hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                        <span className="relative z-10 flex items-center gap-2 font-display tracking-widest text-sm">
                            INITIALIZE SCAN <ArrowRight size={16} className="text-neon-blue group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                </motion.div>
            </div>

            {/* Decorative vertical line */}
            <div className="absolute bottom-0 left-8 hidden md:block w-[1px] h-32 bg-gradient-to-t from-transparent via-neon-blue/50 to-transparent" />
            <div className="absolute bottom-8 left-10 hidden md:block text-[10px] text-neon-blue/50 font-display tracking-[0.3em] -rotate-90 origin-left">
                SYSTEM_ONLINE
            </div>
        </section>
    );
}
