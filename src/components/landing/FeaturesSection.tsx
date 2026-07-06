'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Network, ShieldAlert, Rocket, Users, FileSearch, LineChart } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Magnetic } from '../ui/Magnetic';

const features = [
    {
        title: 'Repository Intelligence',
        description: 'Instant visualization of architecture, dependencies, and file structures using AST parsing.',
        icon: Network,
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-500/10',
        borderColor: 'group-hover:border-blue-500/30'
    },
    {
        title: 'PR Risk Scoring',
        description: 'Automated analysis assigns a risk score based on blast radius, test coverage, and code complexity.',
        icon: ShieldAlert,
        color: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-500/10',
        borderColor: 'group-hover:border-rose-500/30'
    },
    {
        title: 'Deployment Readiness',
        description: 'Pre-flight checks ensure your PR is safe to merge without breaking production environments.',
        icon: Rocket,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-500/10',
        borderColor: 'group-hover:border-emerald-500/30'
    },
    {
        title: 'Reviewer Recommendation',
        description: 'Intelligent routing suggests the best engineers for review based on git history and expertise.',
        icon: Users,
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-500/10',
        borderColor: 'group-hover:border-purple-500/30'
    },
    {
        title: 'Structural Impact Analysis',
        description: 'Detects sensitive file modifications and highlights potential architectural drifts.',
        icon: FileSearch,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-500/10',
        borderColor: 'group-hover:border-amber-500/30'
    },
    {
        title: 'Governance Dashboard',
        description: 'A centralized portal for administrators to oversee PR health, review velocity, and security.',
        icon: LineChart,
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-500/10',
        borderColor: 'group-hover:border-indigo-500/30'
    },
];

function FeatureCard({ feature, idx }: { feature: any, idx: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: 'preserve-3d',
            }}
            className="group relative p-8 rounded-[2.5rem] bg-slate-100/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 transition-all duration-500 shadow-sm hover:shadow-2xl dark:shadow-none overflow-hidden cursor-default"
        >
            {/* Spotlight Glow Effect */}
            <motion.div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${isHovered ? 'rgba(124, 58, 237, 0.08)' : 'transparent'}, transparent 40%)`,
                    // We'll update CSS variables for mouse pos
                    WebkitMaskImage: 'radial-gradient(circle, white, transparent)'
                } as any}
            />
            
            {/* Dynamic Mouse Tracker for the gradient above */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none" 
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.parentElement?.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.parentElement?.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
            />

            <div className="relative z-10">
                <Magnetic strength={0.4}>
                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} border border-black/[0.05] dark:border-white/10 flex items-center justify-center mb-8 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500`}>
                        <feature.icon className={`${feature.color} transition-colors group-hover:scale-110 duration-500`} size={28} />
                    </div>
                </Magnetic>
                
                <h3 className="text-2xl font-display font-bold mb-4 text-gray-900 dark:text-white tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                    {feature.title}
                </h3>
                
                <p className="text-gray-500 dark:text-zinc-500 leading-relaxed text-base font-light group-hover:text-gray-600 dark:group-hover:text-zinc-400 transition-colors duration-500">
                    {feature.description}
                </p>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent`} />
            </div>
        </motion.div>
    );
}

export function FeaturesSection() {
    return (
        <section id="features" className="py-32 relative z-10 transition-colors duration-500 overflow-hidden">
            
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-blue-500/20"
                    >
                        Capabilities
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8 text-gray-900 dark:text-white"
                    >
                        Unparalleled Intelligence
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 dark:text-zinc-400 text-xl max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        GetMyGit dissects every commit and pull request to provide actionable insights, accelerating your deployment cycles while maintaining elite code quality.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} feature={feature} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
