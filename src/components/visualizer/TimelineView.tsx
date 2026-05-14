'use client';

import { motion } from 'framer-motion';
import { RepoAnalysis } from '@/types';
import { GitCommit, GitPullRequest, GitBranch, ShieldCheck, Clock, Activity, Info } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

export function TimelineView({ data }: { data: RepoAnalysis }) {
    const events = [
        {
            date: 'Today',
            title: 'Repository Analyzed',
            description: `GetMyGit engine successfully parsed architecture for ${data.repo.owner}/${data.repo.name}.`,
            icon: ShieldCheck,
            color: 'text-emerald-400',
            glow: 'rgba(52, 211, 153, 0.5)',
            info: 'The moment structural analysis was performed. This snapshot captures the current architectural state and complexity metrics.'
        },
        {
            date: 'Recently',
            title: 'Major Architecture Refactor',
            description: `Detected ${data.fileTree.length} files modified across ${Object.keys(data.languages || {}).length} languages.`,
            icon: GitBranch,
            color: 'text-blue-400',
            glow: 'rgba(96, 165, 250, 0.5)',
            info: 'Identification of large-scale structural changes. This milestone tracks significant deviations from the original directory tree.'
        },
        {
            date: 'Previous Milestone',
            title: 'Feature Deployment',
            description: 'Significant changes to core modules and dependency updates.',
            icon: GitPullRequest,
            color: 'text-purple-400',
            glow: 'rgba(192, 132, 252, 0.5)',
            info: 'A historical point marking the merge of a significant feature set. Used to establish baseline performance and structural integrity.'
        },
        {
            date: 'Repository Creation',
            title: 'Initial Commit',
            description: 'Base project structure initialized.',
            icon: GitCommit,
            color: 'text-zinc-400',
            glow: 'rgba(161, 161, 170, 0.5)',
            info: 'The origin point of the repository. Establishes the foundational logic and tech-stack choices that drive current architecture.'
        }
    ];

    return (
        <div className="w-full h-full p-8 overflow-y-auto bg-[#050505] text-white selection:bg-primary/30" data-lenis-prevent>
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-display font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
                            EVOLUTION TIMELINE
                        </h2>
                        <p className="text-zinc-500 text-sm mt-2 font-light tracking-wide uppercase">Repository history and structural milestones</p>
                    </motion.div>
                    <Tooltip text="This timeline maps significant structural shifts and code-health milestones over the lifespan of the repository." position="left">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-help">
                            <Clock size={24} />
                        </div>
                    </Tooltip>
                </div>

                <div className="relative pl-12 border-l border-white/5 space-y-16">
                    {/* Floating Vertical Glow Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-20" />

                    {events.map((event, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group"
                        >
                            {/* Timeline Node with Glow */}
                            <div className="absolute -left-[64px] top-0 flex items-center justify-center">
                                <div className={`w-10 h-10 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center ${event.color} transition-all duration-500 group-hover:scale-110 group-hover:border-white/30`} 
                                     style={{ boxShadow: `0 0 20px ${event.glow}0.2` }}>
                                    <event.icon size={18} />
                                </div>
                            </div>

                            {/* Classy Obsidian Card */}
                            <div className="relative p-[1px] rounded-3xl overflow-hidden transition-all duration-500 group-hover:translate-x-2">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative bg-[#0a0a0a] backdrop-blur-3xl p-8 rounded-3xl border border-white/5 shadow-2xl transition-all group-hover:border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-[10px] font-mono font-bold text-zinc-500 tracking-[0.2em] uppercase">
                                            {event.date}
                                        </div>
                                        <Tooltip text={event.info} position="left">
                                            <Info size={14} className="text-zinc-600 hover:text-white cursor-help transition-colors" />
                                        </Tooltip>
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed font-light max-w-2xl">
                                        {event.description}
                                    </p>
                                    
                                    {/* Action Footnote */}
                                    <div className="mt-6 flex items-center gap-3">
                                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest">
                                            Status: Verified
                                        </div>
                                        <div className="h-[1px] flex-1 bg-white/5" />
                                        <Activity size={12} className="text-zinc-700" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
