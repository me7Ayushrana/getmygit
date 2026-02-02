'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
    return (
        <section id="hero" className="relative h-screen min-h-[800px] overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Dynamic Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#030014] to-[#030014] -z-20" />

            {/* Orb Effects */}
            <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-float" />
            <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

            {/* Content */}
            <div className="container max-w-5xl px-4 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8 backdrop-blur-md"
                >
                    <Sparkles size={14} className="text-purple-400" />
                    <span>The New Standard for Code Visualization</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-8 leading-[0.9]"
                >
                    See Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-purple-400">
                        Codebase
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    Transform complex repositories into elegant, interactive architecture maps. <br className="hidden md:block" /> No configuration required.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link href="#analyze" className="group relative px-8 py-4 bg-white text-black text-lg font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                        <span className="relative z-10 flex items-center gap-2">
                            Analyze Repository <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm font-medium px-4 py-2">
                        How it works
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-500 to-transparent" />
                <span>SCROLL</span>
            </motion.div>
        </section>
    );
}
