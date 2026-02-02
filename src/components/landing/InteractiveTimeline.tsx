'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Cpu, Grid, MousePointerClick } from 'lucide-react';

const steps = [
    { id: 0, icon: Link2, title: 'Paste Link', desc: 'Copy any public GitHub URL.' },
    { id: 1, icon: Cpu, title: 'Analysis', desc: 'We scan structure & metadata.' },
    { id: 2, icon: Grid, title: 'Mapping', desc: 'Generating visual nodes.' },
    { id: 3, icon: MousePointerClick, title: 'Explore', desc: 'Interact with the graph.' }
];

export function InteractiveTimeline() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section id="how-it-works" className="py-32 bg-black/20">
            <div className="container max-w-5xl">
                <h2 className="text-3xl font-bold mb-16 text-center text-gray-200">How It Works</h2>

                {/* Navigation Buttons (Tabs) */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
                    {steps.map((step) => (
                        <button
                            key={step.id}
                            onClick={() => setActiveStep(step.id)}
                            className={`group flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300 border ${activeStep === step.id
                                    ? 'bg-white/5 border-purple-500/30 text-white shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]'
                                    : 'bg-transparent border-white/5 text-gray-600 hover:border-white/10 hover:text-gray-400'
                                }`}
                        >
                            <step.icon size={20} className={`transition-colors ${activeStep === step.id ? 'text-purple-400' : 'text-gray-600 group-hover:text-gray-500'}`} />
                            <span className="font-semibold">{step.title}</span>
                        </button>
                    ))}
                </div>

                {/* Content Display */}
                <div className="glass-panel p-[1px] rounded-3xl relative max-w-3xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />

                    <div className="bg-[#050508]/80 backdrop-blur-xl rounded-3xl p-12 min-h-[350px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4 }}
                                className="relative z-10"
                            >
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-8 border border-white/5 mx-auto shadow-2xl">
                                    {(() => {
                                        const Icon = steps[activeStep].icon;
                                        return <Icon size={48} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />;
                                    })()}
                                </div>
                                <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">{steps[activeStep].title}</h3>
                                <p className="text-xl text-gray-400 leading-relaxed font-light max-w-md mx-auto">{steps[activeStep].desc}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}
