'use client';

import { motion } from 'framer-motion';
import { Layout, GitBranch, Zap, Layers, ChevronRight } from 'lucide-react';

const features = [
    {
        icon: Layout,
        title: 'Visual Architecture',
        desc: 'Auto-generated system maps from your folder structure.',
        color: 'from-blue-600 to-indigo-600'
    },
    {
        icon: GitBranch,
        title: 'Interactive Graph',
        desc: 'Click nodes to trace dependencies and see file paths.',
        color: 'from-purple-600 to-pink-600'
    },
    {
        icon: Layers,
        title: 'Deep Layers',
        desc: 'See the separation between API, UI, and Logic instantly.',
        color: 'from-orange-500 to-amber-600'
    },
    {
        icon: Zap,
        title: 'Zero Config',
        desc: 'No setup files needed. Just paste a URL and go.',
        color: 'from-emerald-500 to-teal-500'
    }
];

export function InteractiveBento() {
    return (
        <section id="features" className="py-32 relative">
            <div className="container max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">
                        Powerful Capabilities
                    </h2>
                    <p className="text-gray-400 text-lg">Everything you need to understand code faster.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="group relative h-72 rounded-3xl overflow-hidden glass-panel border border-white/5 p-8 flex flex-col justify-between"
                        >
                            {/* Background Gradient Blob */}
                            <div className={`absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br ${f.color} opacity-20 blur-[60px] group-hover:opacity-30 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 text-white shadow-lg ring-1 ring-white/20`}>
                                    <f.icon size={26} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-sm">{f.desc}</p>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="h-1 w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full group-hover:w-full transition-all duration-700" />

                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:border-white/30 transition-all">
                                    <ChevronRight size={18} className="text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
