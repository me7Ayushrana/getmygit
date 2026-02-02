'use client';

import { motion } from 'framer-motion';
import { Layout, GitBranch, Zap, Layers, ChevronRight } from 'lucide-react';

const features = [
    {
        icon: Layout,
        title: 'Visual Architecture',
        desc: 'Auto-generated system maps from your folder structure.',
        color: 'from-neon-blue to-purple-500'
    },
    {
        icon: GitBranch,
        title: 'Interactive Nodes',
        desc: 'trace dependencies and reveal file paths with a click.',
        color: 'from-purple-500 to-pink-500'
    },
    {
        icon: Layers,
        title: 'Deep Layer Analysis',
        desc: 'Separate API, UI, and Logic layers instantly.',
        color: 'from-orange-500 to-red-500'
    },
    {
        icon: Zap,
        title: 'Zero Configuration',
        desc: 'No setup files needed. Just paste a URL and scan.',
        color: 'from-emerald-500 to-teal-500'
    }
];

export function InteractiveBento() {
    return (
        <section id="features" className="py-32 relative">
            <div className="container max-w-6xl px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">CAPABILITIES</span>
                    </h2>
                    <p className="text-gray-400 text-sm tracking-widest font-mono">
                        ADVANCED REPOSITORY PARSING ENGINE
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            className="group relative h-64 rounded-3xl overflow-hidden glass-panel p-8 flex flex-col justify-between"
                        >
                            {/* Background Gradient Blob */}
                            <div className={`absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br ${f.color} opacity-10 blur-[60px] group-hover:opacity-20 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 text-white shadow-lg ring-1 ring-white/10`}>
                                    <f.icon size={20} />
                                </div>

                                <h3 className="text-xl font-display font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">{f.desc}</p>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:w-full transition-all duration-700" />

                                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/30 group-hover:text-neon-blue transition-colors">
                                    <span>DETAILS</span>
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
