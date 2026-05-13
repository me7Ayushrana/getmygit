'use client';

import { motion } from 'framer-motion';
import { RepoAnalysis } from '@/types';
import { GitCommit, GitPullRequest, GitBranch, ShieldCheck } from 'lucide-react';

export function TimelineView({ data }: { data: RepoAnalysis }) {
    // Generate some mock timeline events based on the repository data
    // In a real scenario, this would come from the GitHub API commit history
    
    const events = [
        {
            date: 'Today',
            title: 'Repository Analyzed',
            description: `GetMyGit engine successfully parsed architecture for ${data.repo.owner}/${data.repo.name}.`,
            icon: ShieldCheck,
            color: 'text-primary bg-primary/10 border-primary/20'
        },
        {
            date: 'Recently',
            title: 'Major Architecture Refactor',
            description: `Detected ${data.fileTree.length} files modified across ${Object.keys(data.languages || {}).length} languages.`,
            icon: GitBranch,
            color: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
        },
        {
            date: 'Previous Milestone',
            title: 'Feature Deployment',
            description: 'Significant changes to core modules and dependency updates.',
            icon: GitPullRequest,
            color: 'text-purple-400 bg-purple-400/10 border-purple-400/20'
        },
        {
            date: 'Repository Creation',
            title: 'Initial Commit',
            description: 'Base project structure initialized.',
            icon: GitCommit,
            color: 'text-zinc-400 bg-white/5 border-white/10'
        }
    ];

    return (
        <div className="w-full h-full p-8 overflow-y-auto bg-void text-white">
            <div className="max-w-3xl mx-auto space-y-12">
                
                <div>
                    <h2 className="text-2xl font-bold font-display tracking-wide">Evolution Timeline</h2>
                    <p className="text-zinc-400 text-sm mt-1">Repository history and major structural milestones.</p>
                </div>

                <div className="relative pl-8 border-l border-white/10 space-y-12">
                    {events.map((event, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.15 }}
                            className="relative"
                        >
                            {/* Timeline Node */}
                            <div className={`absolute -left-[45px] top-1 w-7 h-7 rounded-full border flex items-center justify-center ${event.color} shadow-[0_0_15px_currentColor]`}>
                                <event.icon size={12} />
                            </div>

                            {/* Content */}
                            <div className="glass-card p-6 rounded-2xl">
                                <div className="text-xs font-mono text-zinc-500 mb-2">{event.date}</div>
                                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {event.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
