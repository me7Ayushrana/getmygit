'use client';

import { motion } from 'framer-motion';
import { Network, ShieldAlert, Rocket, Users, FileSearch, LineChart } from 'lucide-react';

const features = [
    {
        title: 'Repository Intelligence',
        description: 'Instant visualization of architecture, dependencies, and file structures using AST parsing.',
        icon: Network,
    },
    {
        title: 'PR Risk Scoring',
        description: 'Automated analysis assigns a risk score based on blast radius, test coverage, and code complexity.',
        icon: ShieldAlert,
    },
    {
        title: 'Deployment Readiness',
        description: 'Pre-flight checks ensure your PR is safe to merge without breaking production environments.',
        icon: Rocket,
    },
    {
        title: 'Reviewer Recommendation',
        description: 'Intelligent routing suggests the best engineers for review based on git history and expertise.',
        icon: Users,
    },
    {
        title: 'Structural Impact Analysis',
        description: 'Detects sensitive file modifications and highlights potential architectural drifts.',
        icon: FileSearch,
    },
    {
        title: 'Governance Dashboard',
        description: 'A centralized portal for administrators to oversee PR health, review velocity, and security.',
        icon: LineChart,
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-32 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Unparalleled Intelligence</h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        GetMyGit dissects every commit and pull request to provide actionable insights, accelerating your deployment cycles while maintaining elite code quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-card p-8 rounded-3xl group border-white/10 hover:border-primary/50 transition-all duration-500"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all duration-500">
                                <feature.icon className="text-zinc-300 group-hover:text-primary transition-colors" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
