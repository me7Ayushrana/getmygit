'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
    return (
        <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] -z-10" />

            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div className="space-y-8 text-center lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-6"
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
                        className="text-xl text-gray-300 max-w-xl mx-auto lg:mx-0"
                    >
                        Instantly generate interactive flowcharts, architecture maps, and component diagrams from any public GitHub codebase.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Link href="#analyze" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30">
                            Analyze a Repository <ArrowRight size={20} />
                        </Link>
                        <Link href="/facebook/react" className="px-8 py-4 glass-panel hover:bg-white/10 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                            View Example <Play size={18} fill="currentColor" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-gray-400 flex items-center justify-center lg:justify-start gap-4"
                    >
                        <span>No signup required</span>
                        <span>•</span>
                        <span>Public repositories</span>
                        <span>•</span>
                        <span>Fast visual insights</span>
                    </motion.div>
                </div>

                {/* Right Column - Animated Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className="glass-panel rounded-2xl p-6 relative z-10 border border-white/20 shadow-2xl bg-slate-900/80 aspect-video flex items-center justify-center overflow-hidden">
                        {/* Fake Graph Animation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full h-full">
                                {/* Nodes */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-1/4 left-1/4 w-24 h-12 glass-panel rounded-md flex items-center justify-center text-xs font-bold border-purple-500/50"
                                >
                                    Frontend
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-1/4 right-1/4 w-24 h-12 glass-panel rounded-md flex items-center justify-center text-xs font-bold border-pink-500/50"
                                >
                                    API Service
                                </motion.div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/10 animate-pulse"></div>

                                {/* Connecting Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <line x1="30%" y1="30%" x2="70%" y2="70%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
                                </svg>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded text-xs text-white/50 font-mono">
                            Live Preview
                        </div>
                    </div>

                    {/* Decorative elements behind */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                </motion.div>
            </div>
        </section>
    );
}
