'use client';

import { motion } from 'framer-motion';
import { Layout, GitBranch, Zap, Layers, ChevronRight } from 'lucide-react';

const features = [
    {
        icon: Layout,
        title: 'Visual Architecture',
        desc: 'Auto-generated system maps from your folder structure.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: GitBranch,
        title: 'Interactive Graph',
        desc: 'Click nodes to trace dependencies and see file paths.',
        color: 'from-purple-500 to-pink-500'
    },
    {
        icon: Layers,
        title: 'Deep Layers',
        desc: 'See the separation between API, UI, and Logic instantly.',
        color: 'from-orange-500 to-red-500'
    },
    {
        icon: Zap,
        title: 'Zero Config',
        desc: 'No setup files needed. Just paste a URL and go.',
        color: 'from-emerald-500 to-green-500'
    }
];

export function InteractiveBento() {
    return (
        <section id="features" className="py-24">
            <div className="container max-w-6xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                    Powerful Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="group relative h-64 rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 flex flex-col justify-between"
                        >
                            {/* Background Gradient Blob */}
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 text-white shadow-lg`}>
                                    <f.icon size={28} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-gray-400 text-lg">{f.desc}</p>
                            </div>

                            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <ChevronRight size={20} className="text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
