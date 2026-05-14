'use client';

import { motion } from 'framer-motion';
import { Rocket, Zap, GitCompare, BarChart3, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        icon: Rocket,
        title: "Hackathon Access & Team Formation",
        desc: "Discover hackathon-ready repositories and form balanced teams based on complementary tech stacks. Match developers by skill gaps and project interests automatically.",
        status: "In Research",
        accent: "from-orange-500 to-rose-500",
        glowColor: "rgba(249,115,22,0.15)",
        details: [
            "Auto-detect project complexity and team requirements",
            "Skill-gap matching across GitHub profiles",
            "Real-time team formation dashboard",
            "Integration with popular hackathon platforms",
        ],
    },
    {
        icon: Sparkles,
        title: "Portfolio Generator",
        desc: "One-click generation of a stunning developer portfolio page from all your analyzed repos. Showcase your architecture skills, not just commit counts.",
        status: "Planned",
        accent: "from-violet-500 to-fuchsia-500",
        glowColor: "rgba(139,92,246,0.15)",
        details: [
            "Auto-generated project showcase cards",
            "Architecture complexity scores & visual badges",
            "Shareable public profile links",
            "Custom themes and layout options",
        ],
    },
    {
        icon: BarChart3,
        title: "Commit Heatmap & Activity Insights",
        desc: "Deep analytics on coding patterns, contribution heatmaps, peak productivity hours, and language distribution over time.",
        status: "Planned",
        accent: "from-emerald-500 to-teal-500",
        glowColor: "rgba(16,185,129,0.15)",
        details: [
            "GitHub-style contribution heatmaps",
            "Peak productivity hour detection",
            "Language distribution timeline",
            "Collaboration network graphs",
        ],
    },
    {
        icon: GitCompare,
        title: "Cross-Repo Comparison",
        desc: "Compare architecture, tech stack, complexity scores, and structural patterns of two repositories side-by-side in a unified view.",
        status: "In Research",
        accent: "from-cyan-500 to-blue-500",
        glowColor: "rgba(6,182,212,0.15)",
        details: [
            "Side-by-side architecture diff view",
            "Tech stack compatibility scoring",
            "Complexity and health benchmarks",
            "Dependency overlap analysis",
        ],
    },
];

export default function FuturePage() {
    return (
        <div className="min-h-screen bg-[#020008] text-zinc-200 relative overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.12),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px]" />

            {/* Floating Orbs */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full blur-3xl pointer-events-none"
                    style={{
                        width: 150 + i * 50,
                        height: 150 + i * 50,
                        left: `${5 + i * 18}%`,
                        top: `${10 + (i % 3) * 30}%`,
                        background: i % 2 === 0
                            ? 'radial-gradient(circle, rgba(120,50,255,0.06), transparent)'
                            : 'radial-gradient(circle, rgba(0,200,255,0.04), transparent)',
                    }}
                    animate={{
                        y: [0, -25, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 6 + i * 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 1,
                    }}
                />
            ))}

            {/* Navigation */}
            <nav className="relative z-20 border-b border-white/5 bg-[#020008]/80 backdrop-blur-xl">
                <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                        GetMyGit Roadmap
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <div className="relative z-10 container max-w-6xl mx-auto px-4 pt-20 pb-16">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-8 uppercase tracking-widest"
                    >
                        <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                        Future Roadmap
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight"
                    >
                        THE{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-[gradient-shift_3s_ease_infinite] bg-[length:200%_200%]">
                            FUTURE
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
                    >
                        Where we&apos;re headed next. These are the features on our roadmap to transform GetMyGit into the ultimate developer intelligence platform.
                    </motion.p>
                </div>

                {/* Feature Cards */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
                        },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
                >
                    {features.map((feature, i) => (
                        <FutureCard key={i} {...feature} />
                    ))}
                </motion.div>

                {/* Bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center pb-12"
                >
                    <p className="text-sm text-gray-500 font-mono tracking-wider uppercase mb-8">
                        More features coming soon — stay tuned
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm text-gray-300 hover:text-white font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Return to Explorer
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

function FutureCard({ icon: Icon, title, desc, status, accent, glowColor, details }: {
    icon: any; title: string; desc: string; status: string; accent: string; glowColor: string; details: string[];
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl overflow-hidden"
        >
            {/* Glow */}
            <div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)` }}
            />

            {/* Card Body */}
            <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/8 rounded-2xl p-8 h-full transition-all duration-500 group-hover:border-white/20">
                {/* Shimmer */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                {/* Top Row */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} p-[1px] shadow-lg`}>
                        <div className="w-full h-full rounded-[11px] bg-[#0a0a0f] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white/80" />
                        </div>
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                        status === 'Planned'
                            ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
                            : 'border-amber-500/30 text-amber-400 bg-amber-500/5'
                    }`}>
                        {status}
                    </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-white mb-3 relative z-10">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light mb-6 relative z-10">
                    {desc}
                </p>

                {/* Feature Bullets */}
                <ul className="space-y-2 relative z-10">
                    {details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${accent} shrink-0`} />
                            {detail}
                        </li>
                    ))}
                </ul>

                {/* Bottom line */}
                <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />
            </div>
        </motion.div>
    );
}
