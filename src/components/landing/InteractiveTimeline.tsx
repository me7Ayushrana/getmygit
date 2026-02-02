'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link2, Cpu, Grid, MousePointerClick } from 'lucide-react';

const steps = [
    { id: 0, icon: Link2, title: 'TARGET', desc: 'Copy any public GitHub URL.' },
    { id: 1, icon: Cpu, title: 'SCAN', desc: 'Engine parses structure & metadata.' },
    { id: 2, icon: Grid, title: 'MAP', desc: 'Constructing visual node graph.' },
    { id: 3, icon: MousePointerClick, title: 'ENGAGE', desc: 'Interact with the architecture.' }
];

export function InteractiveTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section id="how-it-works" ref={containerRef} className="py-32 relative min-h-[200vh]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-neon-blue/5 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_100%)] pointer-events-none" />

            <div className="container max-w-5xl px-4 relative z-10">
                <div className="text-center mb-32">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white tracking-widest leading-tight">
                        OPERATIONAL <span className="text-gray-600">FLOW</span>
                    </h2>
                    <p className="text-sm font-mono text-neon-green/80 tracking-widest">NEURAL GIT GRAPH</p>
                </div>

                <div className="relative">
                    {/* Living Line (The Commit History) */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2">
                        <motion.div
                            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-blue via-neon-green to-neon-purple shadow-[0_0_15px_#00f0ff]"
                        />
                    </div>

                    <div className="space-y-32">
                        {steps.map((step, index) => (
                            <TimelineNode key={step.id} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineNode({ step, index }: { step: any, index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative flex items-center md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} pl-16 md:pl-0`}
        >
            {/* The Node Point */}
            <div className="absolute left-[9px] md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-20">
                <div className="relative w-6 h-6 rounded-full bg-[#030014] border-2 border-white/20 shadow-[0_0_20px_rgba(0,0,0,1)] flex items-center justify-center group">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-2.5 h-2.5 rounded-full bg-neon-green shadow-[0_0_10px_#00ff9d]"
                    />
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 rounded-full animate-ping bg-neon-green/20" />
                </div>
            </div>

            {/* Content Card */}
            <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-neon-blue/30 transition-all duration-500 group relative overflow-hidden backdrop-blur-xl bg-[#0a0a0a]/60">
                    {/* Glow Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className={`relative z-10 flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} items-start`}>
                        <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit border border-white/10 text-neon-blue">
                            <step.icon size={24} />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400 font-light text-sm tracking-wide leading-relaxed max-w-sm">
                            {step.desc}
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-neon-green/60 uppercase">
                            <span>Hash: 0x7F...{3 + index}9</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer for alignment */}
            <div className="flex-1 hidden md:block" />
        </motion.div>
    );
}
