'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
                    {features.map((f, i) => (
                        <TiltCard key={i} index={i} feature={f} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TiltCard({ feature, index }: { feature: any, index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, z: 100 }}
            whileHover={{ scale: 1.05, z: 50 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative h-96 w-full rounded-[2rem] bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8 shadow-2xl group cursor-pointer overflow-hidden transform-gpu"
        >
            {/* Dynamic Glow Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            <motion.div
                style={{ x: useTransform(x, [-100, 100], [-20, 20]), y: useTransform(y, [-100, 100], [-20, 20]) }}
                className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center transform-style-3d">
                <motion.div
                    style={{ z: 30 }}
                    className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 text-white shadow-[0_20px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/20`}
                >
                    <feature.icon size={32} />
                </motion.div>

                <motion.h3 style={{ z: 20 }} className="text-3xl font-display font-bold text-white mb-4 tracking-wide group-hover:text-neon-green transition-colors">{feature.title}</motion.h3>
                <motion.p style={{ z: 10 }} className="text-gray-400 text-base leading-relaxed max-w-xs font-light tracking-wide">{feature.desc}</motion.p>
            </div>

            {/* Cyber Corner Accents */}
            <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-neon-green group-hover:w-6 group-hover:h-6 transition-all duration-300" />
            <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-neon-blue group-hover:w-6 group-hover:h-6 transition-all duration-300" />
        </motion.div>
    );
}
