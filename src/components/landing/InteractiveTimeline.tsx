'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Cpu, Grid, MousePointerClick } from 'lucide-react';

const steps = [
    {
        id: 0,
        icon: Link2,
        title: 'Paste Link',
        desc: 'Copy any public GitHub URL.'
    },
    {
        id: 1,
        icon: Cpu,
        title: 'Analysis',
        desc: 'We scan structure & metadata.'
    },
    {
        id: 2,
        icon: Grid,
        title: 'Mapping',
        desc: 'Generating visual nodes.'
    },
    {
        id: 3,
        icon: MousePointerClick,
        title: 'Explore',
        desc: 'Interact with the graph.'
    }
];

export function InteractiveTimeline() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="py-24 bg-slate-950/50">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold mb-16 text-center">How It Works</h2>

                {/* Navigation Buttons (Tabs) */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {steps.map((step) => (
                        <button
                            key={step.id}
                            onClick={() => setActiveStep(step.id)}
                            className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 border ${activeStep === step.id
                                    ? 'bg-white/10 border-purple-500/50 text-white shadow-lg shadow-purple-500/10'
                                    : 'bg-transparent border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'
                                }`}
                        >
                            <step.icon size={20} className={activeStep === step.id ? 'text-purple-400' : 'text-gray-600'} />
                            <span className="font-bold">{step.title}</span>
                        </button>
                    ))}
                </div>

                {/* Content Display */}
                <div className="glass-panel p-1 border border-white/10 rounded-2xl overflow-hidden min-h-[300px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center p-12 text-center h-full"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-8 border border-white/10">
                                {(() => {
                                    const Icon = steps[activeStep].icon;
                                    return <Icon size={40} className="text-white" />;
                                })()}
                            </div>
                            <h3 className="text-4xl font-bold mb-4">{steps[activeStep].title}</h3>
                            <p className="text-xl text-gray-400 max-w-md">{steps[activeStep].desc}</p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                        style={{ width: `${(activeStep + 1) * 25}%` }}
                    />
                </div>
            </div>
        </section>
    );
}
