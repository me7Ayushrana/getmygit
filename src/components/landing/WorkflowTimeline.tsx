'use client';

import { motion } from 'framer-motion';
import { GitCommit, Activity, Search, UserPlus, CheckCircle2, Rocket } from 'lucide-react';

const steps = [
    { icon: GitCommit, title: 'PR Created', desc: 'Webhook triggers our visual engine instantly.', color: 'from-emerald-500 to-green-500', glow: 'rgba(16,185,129,0.15)' },
    { icon: Activity, title: 'Analysis', desc: 'AST parsing maps structural dependencies.', color: 'from-blue-500 to-cyan-500', glow: 'rgba(59,130,246,0.15)' },
    { icon: Search, title: 'Risk Detection', desc: 'Algorithmic scoring evaluates deployment safety.', color: 'from-amber-500 to-orange-500', glow: 'rgba(245,158,11,0.15)' },
    { icon: UserPlus, title: 'Assignment', desc: 'Optimal reviewers are assigned automatically.', color: 'from-purple-500 to-violet-500', glow: 'rgba(139,92,246,0.15)' },
    { icon: CheckCircle2, title: 'Approval', desc: 'Collaborators sign off on changes.', color: 'from-cyan-500 to-teal-500', glow: 'rgba(6,182,212,0.15)' },
    { icon: Rocket, title: 'Deployment', desc: 'Safe, verified code ships to production.', color: 'from-rose-500 to-pink-500', glow: 'rgba(244,63,94,0.15)' },
];

export function WorkflowTimeline() {
    return (
        <section id="how-it-works" className="py-32 relative z-10 overflow-hidden transition-colors duration-500">
            {/* Background */}
            <div className="absolute inset-0 bg-white dark:bg-[#020010] transition-colors duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(100,50,255,0.03),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(100,50,255,0.06),transparent)]" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-widest"
                    >
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        Workflow
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white"
                    >
                        Seamless Pipeline
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto font-light"
                    >
                        From commit to deployment, GetMyGit automates intelligence at every step.
                    </motion.p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Connecting Line — electric pulse */}
                    <div className="absolute top-8 left-[8%] right-[8%] hidden md:block" style={{ height: '3px' }}>
                        {/* Base line */}
                        <div className="absolute inset-0 bg-black/[0.05] dark:bg-white/[0.03] rounded-full" />
                        
                        {/* Primary electric pulse */}
                        <motion.div
                            className="absolute top-0 h-full w-20 rounded-full dark:!bg-white" // Overwrite for dark mode to be bright white
                            style={{ 
                                background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(59,130,246,0.6), rgba(124,58,237,0.4), transparent)',
                            }}
                            animate={{ left: ['-10%', '110%'] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                        />

                        {/* Spark dots at each step node */}
                        {steps.map((_, idx) => (
                            <motion.div
                                key={`spark-${idx}`}
                                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 dark:bg-white/60"
                                style={{ 
                                    left: `${idx * 20}%`,
                                }}
                                animate={{ 
                                    scale: [0.5, 1.2, 0.5], 
                                    opacity: [0.2, 0.8, 0.2],
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    ease: "easeInOut", 
                                    delay: idx * 0.3,
                                }}
                            />
                        ))}
                    </div>

                    {/* Steps */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                        }}
                        className="grid grid-cols-2 md:grid-cols-6 gap-6"
                    >
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                whileHover={{ y: -8 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Icon Container */}
                                <div className="relative mb-6">
                                    <motion.div 
                                        className="absolute -inset-3 rounded-2xl blur-xl pointer-events-none"
                                        style={{ background: `radial-gradient(circle, ${step.glow}, transparent 70%)` }}
                                        animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                                    />

                                    <div className="relative w-16 h-16 rounded-2xl p-[1px] overflow-hidden z-10">
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl`}
                                            style={{ opacity: 0.3 }}
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/[0.05] dark:from-white/[0.08] to-transparent rounded-2xl" />

                                        <motion.div 
                                            className="relative w-full h-full rounded-[15px] bg-slate-50 dark:bg-[#161424] backdrop-blur-xl flex items-center justify-center overflow-hidden border border-black/[0.06] dark:border-white/[0.08]"
                                            animate={{ rotate: [0, 1.5, -1.5, 0] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.02] dark:via-white/[0.08] to-transparent"
                                                animate={{ x: ['-100%', '200%'] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 + idx, delay: idx * 0.5 }}
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500`} />
                                            <step.icon size={22} className="text-gray-500 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 relative z-10" />
                                        </motion.div>
                                    </div>

                                    {/* Pulse ring */}
                                    <motion.div
                                        className={`absolute inset-0 rounded-2xl border border-black/5 dark:border-white/10 z-0`}
                                        animate={{ scale: [1, 1.3, 1.3], opacity: [0.3, 0, 0] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: idx * 0.4 }}
                                    />

                                    {/* Step number badge */}
                                    <motion.div
                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-md bg-slate-50 dark:bg-[#161424] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center z-20 backdrop-blur-md shadow-sm"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                                    >
                                        <span className="text-[9px] font-mono font-bold text-gray-500 dark:text-gray-400">{String(idx + 1).padStart(2, '0')}</span>
                                    </motion.div>
                                </div>

                                <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm mb-2 tracking-wide">{step.title}</h4>
                                <p className="text-[11px] text-gray-500 leading-relaxed font-light group-hover:text-gray-700 dark:group-hover:text-gray-400 transition-colors">{step.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
