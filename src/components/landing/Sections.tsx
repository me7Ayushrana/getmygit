'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Lightbulb } from 'lucide-react';

export function StorySection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="story" className="py-32 relative overflow-hidden flex flex-col items-center">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container max-w-6xl px-4 relative z-10">
                {/* Manifesto Header */}
                <div className="text-center mb-24">
                    <h2 className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 opacity-20 select-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none">
                        MANIFESTO
                    </h2>
                    <h2 className="relative text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6">
                        WHY WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">EXIST</span>?
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        The codebase is a territory. We are the cartographers.
                    </p>
                </div>

                {/* Data Blocks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ManifestoCard
                        title="COMPLEXITY OVERLOAD"
                        number="01"
                        desc="Modern systems are vast labyrinths. Developers spend 70% of their time just navigating, trying to build a mental model that breaks the moment they switch context."
                        accent="border-neon-purple/50"
                    />
                    <ManifestoCard
                        title="VISUAL COGNITION"
                        number="02"
                        desc="We evolved to see patterns, not regex. Text-based documentation is linear and slow. Visual graphs are parallel, instant, and reveal the hidden truth of dependencies."
                        accent="border-neon-blue/50"
                    />
                    <ManifestoCard
                        title="INSTANT CLARITY"
                        number="03"
                        desc="Onboarding shouldn't take weeks. Debugging shouldn't require archaeology. We act as the lens that brings the chaotic reality of code into sharp, actionable focus."
                        accent="border-neon-green/50"
                    />
                </div>

                {/* Know More Interaction */}
                <div className="mt-16 text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full overflow-hidden transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative z-10 font-display font-bold tracking-widest text-white group-hover:text-neon-blue transition-colors">
                            KNOW MORE
                        </span>
                    </button>
                </div>
            </div>

            {/* Mission Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-[#0a0a0a] border border-white/10 p-12 max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green" />

                            <h3 className="text-3xl font-display font-bold text-white mb-6 tracking-wide">
                                OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">MISSION</span>
                            </h3>

                            <p className="text-gray-300 leading-relaxed text-lg font-light">
                                Understanding unfamiliar GitHub repositories is often slow and overwhelming. <span className="text-white font-medium">getmygit</span> was built to simplify that process by starting with visual clarity instead of raw code. It presents architecture, data flow, and component relationships in an interactive visual format, helping users understand the big picture before diving into details.
                            </p>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-8 text-sm font-mono text-gray-500 hover:text-white transition-colors tracking-widest uppercase border-b border-transparent hover:border-white"
                            >
                                Close Transmission
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}

function ManifestoCard({ title, number, desc, accent }: { title: string, number: string, desc: string, accent: string }) {
    return (
        <div className={`group relative p-8 h-full bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden`}>
            {/* Hover Accent Line */}
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ${accent.replace('border-', 'bg-')}`} />

            <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-display font-bold text-gray-200 tracking-wide group-hover:text-white transition-colors">{title}</h3>
                <span className="font-mono text-xs font-bold text-gray-600 tracking-widest">{number}</span>
            </div>

            <p className="text-gray-400 leading-relaxed font-mono text-sm tracking-wide group-hover:text-gray-300 transition-colors">
                {desc}
            </p>

            {/* Decorative Tech Elements */}
            <div className="absolute bottom-4 right-4 flex gap-1">
                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                <div className="w-1 h-1 bg-gray-700 rounded-full" />
                <div className="w-1 h-1 bg-gray-700 rounded-full" />
            </div>
        </div>
    );
}

export function Timeline() {
    const events = [
        { year: 'Idea', title: 'The "What touches what?" Problem', desc: 'Realizing that understanding dependencies is the hardest part of onboarding.' },
        { year: 'Prototype', title: 'Text-based Scanners', desc: 'Early scripts to parse imports and print trees in the terminal.' },
        { year: 'Now', title: 'Visual First', desc: 'Interactive, glassmorphism-based UI that makes architecture beautiful.' },
        { year: 'Future', title: 'AI Insights', desc: 'Deep semantic understanding and automated documentation generation.' },
    ];

    return (
        <section id="history" className="py-24 bg-slate-950/30">
            <div className="container">
                <h2 className="text-3xl font-bold mb-12 text-center">History & Evolution</h2>

                <div className="relative">
                    {/* Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {events.map((event, i) => (
                            <div key={i} className="relative z-10 bg-slate-900/80 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="text-purple-500 font-bold text-sm uppercase tracking-wider mb-2">{event.year}</div>
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <p className="text-sm text-gray-400">{event.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Limitations() {
    return (
        <section id="limitations" className="py-16">
            <div className="container max-w-3xl mx-auto">
                <div className="glass-panel border-l-4 border-l-yellow-500 p-8 rounded-r-xl">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={24} />
                        <div>
                            <h3 className="text-xl font-bold mb-2">Transparency & Limitations</h3>
                            <ul className="space-y-2 text-gray-400 list-disc list-inside">
                                <li>Currently supports public repositories only.</li>
                                <li>Focuses on high-level architecture (services, components), not function-level logic.</li>
                                <li>Visualizations are generated via heuristic analysis and may be imperfect for complex monorepos.</li>
                                <li>This tool helps you understand structure, it does not replace reading code.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
