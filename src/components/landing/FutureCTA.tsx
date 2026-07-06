'use client';

import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FutureCTA() {
    return (
        <section id="prospects" className="py-24 relative overflow-hidden transition-colors duration-500">
            {/* Background */}
            <div className="absolute inset-0 bg-white dark:bg-[#020010] transition-colors duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.04),transparent)] dark:bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(120,50,255,0.08),transparent)]" />

            <div className="container max-w-4xl relative z-10 px-4 text-center mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Glassmorphism Card */}
                    <div className="glass-card relative rounded-3xl p-12 md:p-16 overflow-hidden transition-all duration-[250ms] ease-out">
                        {/* Shimmer sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.01] dark:via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                        
                        {/* Accent glow */}
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative z-10"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-black/[0.05] dark:border-white/10 flex items-center justify-center shadow-sm">
                                <Rocket className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                            </div>

                            <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                                Future{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-cyan-400">
                                    & Planning
                                </span>
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base font-light leading-relaxed mb-10 font-sans">
                                Explore what&apos;s next for GetMyGit — from hackathon team formation to AI-powered portfolio generation. See the tools we&apos;re building to redefine developer intelligence.
                            </p>

                            <Link
                                href="/future"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-900 dark:bg-gradient-to-r dark:from-purple-600/20 dark:to-cyan-600/20 border border-black dark:border-purple-500/30 hover:bg-black dark:hover:border-purple-400/50 text-white font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-xl dark:shadow-[0_0_30px_rgba(168,85,247,0.2)] group/btn"
                            >
                                Explore the Roadmap
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
