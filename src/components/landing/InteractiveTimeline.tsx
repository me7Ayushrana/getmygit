'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Cpu, Grid, MousePointerClick } from 'lucide-react';

const steps = [
    { id: 0, icon: Link2, title: 'TARGET', desc: 'Copy any public GitHub URL.' },
    { id: 1, icon: Cpu, title: 'SCAN', desc: 'Engine parses structure & metadata.' },
    { id: 2, icon: Grid, title: 'MAP', desc: 'Constructing visual node graph.' },
    { id: 3, icon: MousePointerClick, title: 'ENGAGE', desc: 'Interact with the architecture.' }
];

export function InteractiveTimeline() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section id="how-it-works" className="py-32 relative">
            <div className="absolute inset-0 bg-neon-blue/5 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_100%)] pointer-events-none" />
            <div className="container max-w-7xl px-4 relative z-10">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-20 text-center text-white tracking-widest">
                    OPERATIONAL <span className="text-gray-600">FLOW</span>
                </h2>

                {/* Navigation Buttons (Tabs) */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {steps.map((step) => (
                        <button
                            key={step.id}
                            onClick={() => setActiveStep(step.id)}
                            className={`group flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 border ${activeStep === step.id
                                ? 'bg-neon-blue/10 border-neon-blue/50 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                                : 'bg-transparent border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'
                                }`}
                        >
                            <span className={`font-mono text-xs font-bold tracking-widest ${activeStep === step.id ? 'text-neon-blue' : ''}`}>0{step.id + 1}</span>
                            <span className="font-display font-bold text-xs tracking-wider">{step.title}</span>
                        </button>
                    ))}
                </div>

                {/* Content Display */}
                <div className="glass-panel p-[1px] rounded-3xl relative max-w-3xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />

                    <div className="bg-[#030014]/50 backdrop-blur-xl rounded-3xl p-12 min-h-[300px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4 }}
                                className="relative z-10"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-neon-blue/10 to-purple-500/10 flex items-center justify-center mb-8 border border-white/5 mx-auto shadow-2xl relative">
                                    <div className="absolute inset-0 bg-neon-blue/20 blur-xl opacity-20" />
                                    {(() => {
                                        const Icon = steps[activeStep].icon;
                                        return <Icon size={32} className="text-white relative z-10" />;
                                    })()}
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-4 text-white tracking-widest">{steps[activeStep].title}</h3>
                                <p className="text-lg text-gray-400 font-light max-w-md mx-auto">{steps[activeStep].desc}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
