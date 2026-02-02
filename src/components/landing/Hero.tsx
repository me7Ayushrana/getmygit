'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
    return (
        <section id="hero" className="relative pt-32 pb-32 overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

            <div className="container max-w-4xl px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8"
                >
                    Visualize Any <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        GitHub Repository
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Instantly generate interactive flowcharts and architecture maps from any public codebase. Clear, concise, and visual.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <Link href="#analyze" className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20">
                        Analyze Repository <ArrowRight size={20} />
                    </Link>
                    <Link href="/facebook/react" className="px-10 py-4 glass-panel hover:bg-white/10 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
                        View Example <Play size={18} fill="currentColor" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
