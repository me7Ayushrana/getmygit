'use client';

import { motion } from 'framer-motion';
import { Network, ShieldAlert, Rocket, Users, FileSearch, LineChart } from 'lucide-react';

const features = [
    {
        title: 'Repository Intelligence',
        description: 'Instant visualization of architecture, dependencies, and file structures using AST parsing.',
        icon: Network,
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-500/10'
    },
    {
        title: 'PR Risk Scoring',
        description: 'Automated analysis assigns a risk score based on blast radius, test coverage, and code complexity.',
        icon: ShieldAlert,
        color: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-500/10'
    },
    {
        title: 'Deployment Readiness',
        description: 'Pre-flight checks ensure your PR is safe to merge without breaking production environments.',
        icon: Rocket,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-500/10'
    },
    {
        title: 'Reviewer Recommendation',
        description: 'Intelligent routing suggests the best engineers for review based on git history and expertise.',
        icon: Users,
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-500/10'
    },
    {
        title: 'Structural Impact Analysis',
        description: 'Detects sensitive file modifications and highlights potential architectural drifts.',
        icon: FileSearch,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-500/10'
    },
    {
        title: 'Governance Dashboard',
        description: 'A centralized portal for administrators to oversee PR health, review velocity, and security.',
        icon: LineChart,
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-500/10'
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-32 relative z-10 transition-colors duration-500">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white"
                    >
                        Unparalleled Intelligence
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        GetMyGit dissects every commit and pull request to provide actionable insights, accelerating your deployment cycles while maintaining elite code quality.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative p-8 rounded-[2rem] bg-white dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/10 hover:border-black/[0.1] dark:hover:border-white/20 transition-all duration-500 shadow-sm hover:shadow-xl dark:shadow-none"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${feature.bg} border border-black/[0.05] dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-sm dark:shadow-none`}>
                                <feature.icon className={`${feature.color} transition-colors`} size={24} />
                            </div>
                            <h3 className="text-xl font-display font-bold mb-3 text-gray-900 dark:text-white tracking-tight">{feature.title}</h3>
                            <p className="text-gray-500 dark:text-zinc-500 leading-relaxed text-sm font-light">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
