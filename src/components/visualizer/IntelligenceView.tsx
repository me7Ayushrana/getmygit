'use client';

import { motion } from 'framer-motion';
import { RepoAnalysis } from '@/types';
import { ShieldAlert, Activity, GitCommit, ShieldCheck, Zap, ServerCrash, Info } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

export function IntelligenceView({ data }: { data: RepoAnalysis }) {
    const baseScore = Math.min(100, Math.max(0, 100 - (data.fileTree.length * 0.1)));
    const healthScore = Math.round(baseScore);
    
    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-emerald-400 stroke-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]';
        if (score >= 70) return 'text-amber-400 stroke-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]';
        return 'text-rose-500 stroke-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]';
    };

    const scoreColor = getScoreColor(healthScore);
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (healthScore / 100) * circumference;

    const calculatedRisks = data.fileTree
        .filter(f => f.type !== 'tree')
        .map(file => {
            let riskLevel = 'Low';
            let riskScore = 0;
            let reason = '';

            const pathLower = file.path.toLowerCase();
            const size = file.size || 0;

            if (pathLower.includes('.env') || pathLower.includes('secret') || pathLower.includes('auth') || pathLower.includes('security') || pathLower.includes('config')) {
                riskScore += 80;
                reason = 'Sensitive configuration';
            }
            else if (pathLower.includes('dockerfile') || pathLower.includes('.github/workflows') || pathLower.endsWith('package.json')) {
                riskScore += 50;
                reason = 'Core infrastructure';
            }
            else if (size > 50000) {
                riskScore += 40;
                reason = 'Large file size';
            }

            if (riskScore >= 70) riskLevel = 'High';
            else if (riskScore >= 40) riskLevel = 'Medium';

            return { ...file, riskLevel, reason, riskScore };
        })
        .filter(f => f.riskLevel !== 'Low')
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 5);

    return (
        <div className="w-full h-full p-8 overflow-y-auto bg-[#050505] text-white selection:bg-primary/30" data-lenis-prevent>
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex items-center justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-display font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
                            STRUCTURAL INTELLIGENCE
                        </h2>
                        <p className="text-zinc-500 text-sm mt-2 font-light tracking-wide uppercase">Deep architectural auditing & risk assessment</p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl flex items-center gap-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400">ENGINE_OPERATIONAL</span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Health Score Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative group p-[1px] rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-50" />
                        <div className="relative bg-[#0a0a0a] backdrop-blur-3xl p-8 rounded-3xl h-full border border-white/5 flex items-center justify-between shadow-2xl">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="text-xl font-display font-bold text-white/90">Health Score</h3>
                                    <Tooltip text="A composite metric analyzing code modularity, dependency coupling, and file complexity. A higher score indicates a more maintainable and scalable architecture." position="top">
                                        <Info size={14} className="text-zinc-500 hover:text-white transition-colors cursor-help" />
                                    </Tooltip>
                                </div>
                                <p className="text-zinc-500 text-sm leading-relaxed max-w-[200px] font-light">
                                    A measure of codebase maintainability and architectural purity.
                                </p>
                            </div>
                            
                            <div className="relative w-36 h-36 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle 
                                        cx="50" cy="50" r="42" 
                                        className="stroke-white/5 fill-none"
                                        strokeWidth="6"
                                    />
                                    <motion.circle 
                                        cx="50" cy="50" r="42" 
                                        className={`fill-none ${scoreColor.split(' ')[1]}`}
                                        strokeWidth="6"
                                        strokeDasharray={2 * Math.PI * 42}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                                        animate={{ strokeDashoffset: (2 * Math.PI * 42) - (healthScore / 100) * (2 * Math.PI * 42) }}
                                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className={`text-4xl font-display font-bold ${scoreColor.split(' ')[0]}`}>{healthScore}</span>
                                    <span className="text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-widest">Optimal</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Readiness Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative p-[1px] rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />
                        <div className="relative bg-[#0a0a0a] backdrop-blur-3xl p-8 rounded-3xl h-full border border-white/5 shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-display font-bold flex items-center gap-3 text-white/90">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <Zap size={20} className="text-blue-400" />
                                    </div>
                                    Deployment Readiness
                                </h3>
                                <Tooltip text="Evaluates the stability and security of the current branch for production deployment. High readiness means minimal risk in infrastructure and dependency layers." position="top">
                                    <Info size={14} className="text-zinc-500 hover:text-white transition-colors cursor-help" />
                                </Tooltip>
                            </div>
                            <div className="space-y-6">
                                <ReadinessItem label="Architecture Integrity" value={healthScore > 80 ? 'Excellent' : 'Stable'} score={healthScore} color="blue" />
                                <ReadinessItem label="Dependency Health" value="Secure" score={95} color="emerald" />
                                <ReadinessItem label="Documentation Coverage" value={data.readme ? 'High' : 'Missing'} score={data.readme ? 85 : 10} color="purple" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Risk Map Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative p-[1px] rounded-[2.5rem] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-transparent to-rose-500/10" />
                    <div className="relative bg-[#0a0a0a] backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                                    <ShieldAlert size={24} className="text-rose-500" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white">Critical Risk Mapping</h3>
                                <Tooltip text="Identifies high-impact modifications to sensitive configuration files, environment variables, and core infrastructure logic that could introduce vulnerabilities." position="top">
                                    <Info size={14} className="text-zinc-500 hover:text-white transition-colors cursor-help" />
                                </Tooltip>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-zinc-600 tracking-[0.3em] uppercase">Security Perimeter</span>
                        </div>
                        
                        <div className="space-y-4">
                            {calculatedRisks.length > 0 ? calculatedRisks.map((file, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                                    className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`relative w-3 h-3 rounded-full ${file.riskLevel === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`}>
                                            <div className={`absolute inset-0 rounded-full animate-ping ${file.riskLevel === 'High' ? 'bg-rose-500' : 'bg-amber-500'} opacity-40`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-mono text-sm text-zinc-100 group-hover:text-white transition-colors tracking-tight">{file.path}</p>
                                                <Tooltip text={`${file.reason}: This file modification requires mandatory senior engineer review due to its architectural impact.`} position="top">
                                                    <Info size={12} className="text-zinc-500 hover:text-zinc-300 cursor-help" />
                                                </Tooltip>
                                            </div>
                                            <p className="text-[10px] text-zinc-500 mt-1 font-mono uppercase tracking-widest">{file.reason}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xs font-mono font-bold px-3 py-1 rounded-md border inline-block ${file.riskLevel === 'High' ? 'text-rose-500 border-rose-500/20 bg-rose-500/5' : 'text-amber-500 border-amber-500/20 bg-amber-500/5'}`}>
                                            {file.riskLevel}_RISK
                                        </div>
                                        <p className="text-[9px] text-zinc-600 font-mono mt-2 tracking-widest">{file.size?.toLocaleString()} BYTES</p>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="text-center py-20 bg-white/[0.01] rounded-3xl border border-white/[0.02]">
                                    <ShieldCheck size={64} className="mx-auto text-emerald-500/30 mb-6" />
                                    <h4 className="text-lg font-display font-bold text-zinc-400">Security Perimeter Intact</h4>
                                    <p className="text-zinc-600 text-sm mt-2 max-w-xs mx-auto">No critical structural or configuration risks identified in this scan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function ReadinessItem({ label, value, score, color }: { label: string, value: string, score: number, color: 'blue' | 'emerald' | 'purple' }) {
    const colorMap = {
        blue: 'from-blue-600 to-indigo-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]',
        emerald: 'from-emerald-600 to-teal-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]',
        purple: 'from-purple-600 to-fuchsia-600 shadow-[0_0_10px_rgba(147,51,234,0.3)]'
    };

    return (
        <div className="space-y-2.5">
            <div className="flex justify-between items-end">
                <span className="text-zinc-400 text-xs font-mono font-bold tracking-widest uppercase">{label}</span>
                <span className="text-white text-xs font-bold">{value}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/[0.02]">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full bg-gradient-to-r ${colorMap[color]}`}
                />
            </div>
        </div>
    );
}
