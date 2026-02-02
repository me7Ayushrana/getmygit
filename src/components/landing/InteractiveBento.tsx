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
        color: 'from-neon-green to-neon-blue'
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
        color: 'from-neon-green to-emerald-500'
    }
];

export function InteractiveBento() {
    return (
        <section id="features" className="py-32 relative">
            <div className="container max-w-7xl px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white tracking-widest leading-tight">
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">CAPABILITIES</span>
                    </h2>
                    <p className="text-gray-400 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-mono uppercase px-4">
                        Advanced Repository Parsing Engine
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02, translateY: -5 }}
                            className="group relative h-80 rounded-[2rem] overflow-hidden glass-panel p-10 flex flex-col items-center justify-center text-center border-white/5 hover:border-neon-blue/30 transition-all duration-500"
                        >
                            {/* Background Gradient Blob */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br ${f.color} opacity-5 blur-[80px] group-hover:opacity-20 transition-opacity duration-700`} />

                            <div className="relative z-10 flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-8 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-500`}>
                                    <f.icon size={28} />
                                </div>

                                <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-wide">{f.title}</h3>
                                <p className="text-gray-400 text-base leading-relaxed max-w-sm font-light">{f.desc}</p>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-green/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
