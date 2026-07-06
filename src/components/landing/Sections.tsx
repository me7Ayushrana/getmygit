'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Lightbulb, ArrowUpRight, Code, Briefcase, Users, Rocket, Zap, GitCompare, BarChart3, Sparkles } from 'lucide-react';

export function StorySection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="story" className="py-32 relative overflow-hidden flex flex-col items-center transition-colors duration-500">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-50 dark:opacity-100" />

            <div className="container max-w-6xl px-4 relative z-10">
                {/* Manifesto Header */}
                <div className="text-center mb-24 relative">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 0.05, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-white/10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none z-0"
                    >
                        MANIFESTO
                    </motion.h2>
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative text-5xl md:text-7xl font-display font-bold tracking-tight text-gray-900 dark:text-white mb-6 z-10"
                    >
                        WHY WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-neon-purple dark:to-neon-blue">EXIST</span>?
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="relative text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed z-10"
                    >
                        The codebase is a territory. We are the cartographers.
                    </motion.p>
                </div>

                {/* Data Blocks Grid */}
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <ManifestoCard
                        title="COMPLEXITY OVERLOAD"
                        number="01"
                        desc="Modern systems are vast labyrinths. Developers spend 70% of their time just navigating, trying to build a mental model that breaks the moment they switch context."
                        accent="purple"
                        delay={0.1}
                    />
                    <ManifestoCard
                        title="VISUAL COGNITION"
                        number="02"
                        desc="We evolved to see patterns, not regex. Text-based documentation is linear and slow. Visual graphs are parallel, instant, and reveal the hidden truth of dependencies."
                        accent="blue"
                        delay={0.2}
                    />
                    <ManifestoCard
                        title="INSTANT CLARITY"
                        number="03"
                        desc="Onboarding shouldn't take weeks. Debugging shouldn't require archaeology. We act as the lens that brings the chaotic reality of code into sharp, actionable focus."
                        accent="green"
                        delay={0.3}
                    />
                </motion.div>

                {/* Know More Interaction */}
                <div className="mt-16 text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-8 py-4 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-full overflow-hidden transition-all duration-300 shadow-sm dark:shadow-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative z-10 font-display font-bold tracking-widest text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-neon-blue transition-colors">
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
                            className="absolute inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="glass-card relative p-12 max-w-2xl rounded-[2rem] overflow-hidden transition-all duration-[250ms] ease-out"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500" />

                            <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-wide">
                                OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 dark:from-neon-blue dark:to-neon-green">MISSION</span>
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-light">
                                Understanding unfamiliar GitHub repositories is often slow and overwhelming. <span className="text-gray-900 dark:text-white font-medium">getmygit</span> was built to simplify that process by starting with visual clarity instead of raw code. It presents architecture, data flow, and component relationships in an interactive visual format, helping users understand the big picture before diving into details.
                            </p>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-8 text-sm font-mono text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors tracking-widest uppercase border-b border-transparent hover:border-black dark:hover:border-white"
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

function ManifestoCard({ title, number, desc, accent, delay }: { title: string, number: string, desc: string, accent: string, delay: number }) {
    const gradientColors = accent === 'purple' 
        ? 'from-purple-500 via-blue-500 to-purple-500' 
        : accent === 'blue' 
            ? 'from-blue-500 via-cyan-500 to-blue-500' 
            : 'from-green-500 via-emerald-500 to-green-500';
    
    const glowColor = accent === 'purple' 
        ? 'rgba(168,85,247,0.1)' 
        : accent === 'blue' 
            ? 'rgba(59,130,246,0.1)' 
            : 'rgba(34,197,94,0.1)';

    return (
        <motion.div 
            variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="relative rounded-2xl h-full"
        >
            {/* Card Inner */}
            <div className="glass-card relative h-full rounded-2xl p-8 overflow-hidden transition-all duration-[250ms] ease-out">
                
                {/* Ambient Glow */}
                <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${glowColor}, transparent)` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
                />

                {/* Shimmer Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.02] dark:via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out" />

                {/* Top Accent Line */}
                <motion.div 
                    className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r ${gradientColors}`}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Header */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-gray-200 tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors duration-300">{title}</h3>
                    <motion.span 
                        className="font-mono text-[10px] font-bold text-gray-400 dark:text-gray-600 tracking-widest px-2 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]"
                    >
                        {number}
                    </motion.span>
                </div>

                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-sans text-sm tracking-wide group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 relative z-10 font-light">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}

export function TargetAudienceSection() {
    return (
        <section className="py-28 relative overflow-hidden bg-white dark:bg-[#0d0b18] transition-colors duration-500">
            {/* Distinct grid */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#00000005_1px,transparent_1px),linear-gradient(-45deg,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(45deg,#ffffff06_1px,transparent_1px),linear-gradient(-45deg,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
            
            {/* Soft gradient orbs */}
            <motion.div
                className="absolute top-20 -left-20 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"
                animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 -right-20 w-[350px] h-[350px] bg-blue-500/5 dark:bg-blue-600/12 rounded-full blur-[120px] pointer-events-none"
                animate={{ scale: [1.1, 1, 1.1], y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container relative z-20 px-4 max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-widest"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Who is this for?
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight flex items-center justify-center gap-4 flex-wrap"
                    >
                        BUILT
                        <span className="relative inline-flex items-center justify-center text-5xl md:text-6xl lg:text-7xl px-4 py-1 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-xl dark:shadow-[0_0_30px_rgba(168,85,247,0.15)] text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-300 dark:via-blue-300 dark:to-cyan-300 animate-[gradient-shift_3s_ease_infinite] bg-[length:200%_200%]">
                            &amp;
                        </span>
                        DESIGNED
                    </motion.h2>
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 animate-[gradient-shift_3s_ease_infinite] bg-[length:200%_200%]"
                    >
                        FOR:
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
                    >
                        Whether you write code or oversee the teams that do, getmygit helps you see the structure and flow.
                    </motion.p>
                </div>

                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <PersonaCard
                        role="DEVELOPERS"
                        desc="Stop grepping through thousands of files. Visualize the architecture instantly and onboard 10x faster."
                        accent="blue"
                        icon={Code}
                    />
                    <PersonaCard
                        role="MANAGERS"
                        desc="Understand technical debt and dependency complexity without needing to read a single line of code."
                        accent="purple"
                        icon={Briefcase}
                    />
                    <PersonaCard
                        role="HR & RECRUITERS"
                        desc="Assess candidate take-home assignments or portfolio projects with a glance at their architectural decisions."
                        accent="rose"
                        icon={Users}
                    />
                </motion.div>
            </div>
        </section>
    );
}

function PersonaCard({ role, desc, accent, icon: Icon }: { role: string, desc: string, accent: string, icon: any }) {
    const accentMap: Record<string, { gradient: string, text: string, border: string, glow: string, iconBg: string, textDark: string }> = {
        blue:   { gradient: 'from-blue-600 to-cyan-600', text: 'text-blue-600', textDark: 'text-blue-400', border: 'border-blue-500/20', glow: 'rgba(59,130,246,0.1)', iconBg: 'bg-blue-500/10' },
        purple: { gradient: 'from-purple-600 to-violet-600', text: 'text-purple-600', textDark: 'text-purple-400', border: 'border-purple-500/20', glow: 'rgba(139,92,246,0.1)', iconBg: 'bg-purple-500/10' },
        rose:   { gradient: 'from-rose-600 to-pink-600', text: 'text-rose-600', textDark: 'text-rose-400', border: 'border-rose-500/20', glow: 'rgba(244,63,94,0.1)', iconBg: 'bg-rose-500/10' },
    };
    const a = accentMap[accent] || accentMap.blue;

    return (
        <motion.div 
            variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="relative rounded-3xl h-full"
        >
            {/* Glassmorphism Card */}
            <div className="glass-card relative h-full rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-[250ms] ease-out">
                
                {/* Shimmer sweep */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-black/[0.02] dark:via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out pointer-events-none" />

                {/* Top accent line */}
                <motion.div 
                    className={`absolute top-0 left-0 h-[3px] rounded-full bg-gradient-to-r ${a.gradient}`}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Icon */}
                <motion.div 
                    className={`w-16 h-16 rounded-2xl ${a.iconBg} flex items-center justify-center mb-8 border border-black/[0.05] dark:border-white/10 relative overflow-hidden backdrop-blur-md`}
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Icon className={`w-7 h-7 ${a.text} dark:${a.textDark} relative z-10`} />
                </motion.div>

                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-wide">{role}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10 flex-1 text-sm font-light">
                    {desc}
                </p>

                {/* Access Tools Button */}
                <a 
                    href="/#hero"
                    className={`relative w-full py-4 overflow-hidden rounded-xl border border-black/[0.08] dark:${a.border} group-hover:border-black/[0.15] dark:group-hover:${a.border} transition-all duration-300 bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] backdrop-blur-md flex items-center justify-center gap-3 cursor-pointer shadow-sm dark:shadow-none`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-r ${a.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 rounded-xl`} />
                    <span className={`font-bold tracking-[0.2em] text-xs text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:${a.textDark} transition-colors uppercase relative z-10`}>Access Tools</span>
                    <ArrowUpRight className={`w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:${a.textDark} transition-colors relative z-10`} />
                </a>

                {/* Corner brackets on hover */}
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-black/[0.05] dark:border-white/[0.06] rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-black/[0.05] dark:border-white/[0.06] rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
}

// ... FuturePlansSection and FutureCard stay mostly same but with theme classes ...
// I will truncate here for brevity but implement them with same pattern.

export function FuturePlansSection() {
    const features = [
        {
            icon: Rocket,
            title: "Hackathon Access & Team Formation",
            desc: "Discover hackathon-ready repositories and form balanced teams based on complementary tech stacks. Match developers by skill gaps and project interests.",
            status: "In Research",
            accent: "from-orange-500 to-rose-500",
            glowColor: "rgba(249,115,22,0.1)",
        },
        {
            icon: Sparkles,
            title: "Portfolio Generator",
            desc: "One-click generation of a stunning developer portfolio page from all your analyzed repos. Showcase your architecture skills, not just commit counts.",
            status: "Planned",
            accent: "from-violet-500 to-fuchsia-500",
            glowColor: "rgba(139,92,246,0.1)",
        },
        {
            icon: BarChart3,
            title: "Commit Heatmap & Activity Insights",
            desc: "Deep analytics on coding patterns, contribution heatmaps, peak productivity hours, and language distribution over time.",
            status: "Planned",
            accent: "from-emerald-500 to-teal-500",
            glowColor: "rgba(16,185,129,0.1)",
        },
        {
            icon: GitCompare,
            title: "Cross-Repo Comparison",
            desc: "Compare architecture, tech stack, complexity scores, and structural patterns of two repositories side-by-side in a unified view.",
            status: "In Research",
            accent: "from-cyan-500 to-blue-500",
            glowColor: "rgba(6,182,212,0.1)",
        },
    ];

    return (
        <section id="future" className="py-32 relative overflow-hidden bg-gray-50 dark:bg-[#020008] transition-colors duration-500">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.05),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.12),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px]" />

            <div className="container max-w-6xl relative z-10 px-4 mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-widest"
                    >
                        <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
                        Roadmap
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
                    >
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 animate-[gradient-shift_3s_ease_infinite] bg-[length:200%_200%]">FUTURE</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
                    >
                        Where we&apos;re headed next. These features are on our roadmap to make GetMyGit the ultimate developer intelligence platform.
                    </motion.p>
                </div>

                {/* Feature Cards Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {features.map((feature, i) => (
                        <FutureCard key={i} {...feature} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function FutureCard({ icon: Icon, title, desc, status, accent, glowColor }: {
    icon: any; title: string; desc: string; status: string; accent: string; glowColor: string; index: number;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="relative rounded-2xl h-full"
        >
            <div className="glass-card relative rounded-2xl p-8 h-full transition-all duration-[250ms] ease-out">
                <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} p-[1px] shadow-lg`}>
                        <div className="w-full h-full rounded-[11px] bg-slate-50 dark:bg-[#0a0a0f] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gray-900 dark:text-white/80" />
                        </div>
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                        status === 'Planned'
                            ? 'border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5'
                            : 'border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/5'
                    }`}>
                        {status}
                    </span>
                </div>

                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3 tracking-wide">
                    {title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-light font-sans">
                    {desc}
                </p>

                <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />
            </div>
        </motion.div>
    );
}
