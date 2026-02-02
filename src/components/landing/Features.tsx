'use client';

import { Layout, GitBranch, Zap, Layers } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
    {
        icon: Layout,
        title: 'Visual Architecture',
        summary: 'Turn folder structures into logical diagrams automatically.',
        detail: 'Our parser reads the repository tree and intelligently groups files into meaningful architectural components like "Services", "UI", and "API".'
    },
    {
        icon: GitBranch,
        title: 'Interactive Nodes',
        summary: 'Click nodes to reveal file paths and dependencies.',
        detail: 'Every node in the graph is interactive. Clicking it reveals the underlying file path, technology detected, and potential connections to other parts of the system.'
    },
    {
        icon: Layers,
        title: 'Component Exploration',
        summary: 'Understand layers without reading code.',
        detail: 'Distinguish between your data layer, business logic, and presentation layer at a glance. Perfect for understanding the separation of concerns.'
    },
    {
        icon: Zap,
        title: 'Instant Onboarding',
        summary: 'Get up to speed with architecture in minutes.',
        detail: 'Skip the hours of reading READMEs and grepping for imports. Start with a visual mental model of the system.'
    }
];

export function Features() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section id="features" className="py-32">
            <div className="container max-w-5xl">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-4">Features</h2>
                    <p className="text-gray-400">Powerful tools for code understanding.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className={`glass-panel p-8 rounded-2xl cursor-pointer transition-all ${expandedIndex === i ? 'border-purple-500/50 bg-white/5' : 'hover:bg-white/5'}`}
                            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                                    <f.icon size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed font-medium">{f.summary}</p>

                                    <AnimatePresence>
                                        {expandedIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-sm text-gray-500 leading-relaxed pt-2 border-t border-white/10">
                                                    {f.detail}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
