'use client';

import { motion } from 'framer-motion';
import { GitCommit, Activity, Search, UserPlus, CheckCircle2, Rocket } from 'lucide-react';

const steps = [
    { icon: GitCommit, title: 'PR Created', desc: 'Webhook triggers our visual engine instantly.' },
    { icon: Activity, title: 'Analysis', desc: 'AST parsing maps structural dependencies.' },
    { icon: Search, title: 'Risk Detection', desc: 'Algorithmic scoring evaluates deployment safety.' },
    { icon: UserPlus, title: 'Assignment', desc: 'Optimal reviewers are assigned automatically.' },
    { icon: CheckCircle2, title: 'Approval', desc: 'Collaborators sign off on changes.' },
    { icon: Rocket, title: 'Deployment', desc: 'Safe, verified code ships to production.' },
];

export function WorkflowTimeline() {
    return (
        <section id="how-it-works" className="py-32 relative z-10 border-t border-white/5 bg-zinc-900/20">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Seamless Pipeline</h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        From commit to deployment, GetMyGit automates intelligence at every step.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 hidden md:block" />
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-full bg-void border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-primary/50 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-transparent group-hover:shadow-[0_0_30px_rgba(225,29,72,0.4)] transition-all duration-500">
                                    <step.icon size={24} className="text-zinc-400 group-hover:text-primary transition-colors" />
                                </div>
                                <h4 className="font-bold text-white mb-2">{step.title}</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
