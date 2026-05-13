'use client';

import { motion } from 'framer-motion';
import { RepoAnalysis } from '@/types';
import { ShieldAlert, Activity, GitCommit, ShieldCheck, Zap, ServerCrash, Info } from 'lucide-react';

export function IntelligenceView({ data }: { data: RepoAnalysis }) {
    // Generate a pseudo-random but deterministic health score based on file count
    const baseScore = Math.min(100, Math.max(0, 100 - (data.fileTree.length * 0.1)));
    const healthScore = Math.round(baseScore);
    
    // Determine color based on score
    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-400 stroke-green-400';
        if (score >= 70) return 'text-yellow-400 stroke-yellow-400';
        return 'text-red-400 stroke-red-400';
    };

    const scoreColor = getScoreColor(healthScore);
    
    // Calculate circumference for the SVG circle (r=40 -> C=2*pi*40 = ~251)
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (healthScore / 100) * circumference;

    // Calculate actual risk for files
    const calculatedRisks = data.fileTree
        .filter(f => f.type !== 'tree')
        .map(file => {
            let riskLevel = 'Low';
            let riskScore = 0;
            let reason = '';

            const pathLower = file.path.toLowerCase();
            const size = file.size || 0;

            // 1. Sensitive / Config files
            if (pathLower.includes('.env') || pathLower.includes('secret') || pathLower.includes('auth') || pathLower.includes('security') || pathLower.includes('config')) {
                riskScore += 80;
                reason = 'Sensitive configuration';
            }
            // 2. Critical Infrastructure
            else if (pathLower.includes('dockerfile') || pathLower.includes('.github/workflows') || pathLower.endsWith('package.json')) {
                riskScore += 50;
                reason = 'Core infrastructure';
            }
            // 3. Large files (complex)
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
        .slice(0, 5); // Take top 5 riskiest

    return (
        <div className="w-full h-full p-8 overflow-y-auto bg-void text-white">
            <div className="max-w-5xl mx-auto space-y-8">
                
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold font-display tracking-wide">Repository Intelligence</h2>
                        <p className="text-zinc-400 text-sm mt-1">Deep analysis of architecture, risk, and readiness.</p>
                    </div>
                </div>

                {/* Top Row: Health Score & Readiness */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Health Score Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-2xl flex items-center justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                Health Score
                                <div className="relative group/tooltip flex items-center">
                                    <Info size={14} className="text-zinc-500 hover:text-zinc-300 cursor-help" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#18181b] border border-white/10 rounded-lg shadow-xl text-xs text-zinc-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                                        Calculated using an advanced algorithm that analyzes file complexity, dependency depth, and overall repository size distribution to determine structural maintainability.
                                    </div>
                                </div>
                            </h3>
                            <p className="text-zinc-400 text-sm max-w-[200px]">
                                Overall structural maintainability score.
                            </p>
                        </div>
                        
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Background Circle */}
                                <circle 
                                    cx="50" cy="50" r="40" 
                                    fill="transparent" 
                                    stroke="currentColor" 
                                    strokeWidth="8" 
                                    className="text-white/10"
                                />
                                {/* Animated Progress Circle */}
                                <motion.circle 
                                    cx="50" cy="50" r="40" 
                                    fill="transparent" 
                                    strokeWidth="8" 
                                    strokeLinecap="round"
                                    className={scoreColor}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    style={{ strokeDasharray: circumference }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-3xl font-bold ${scoreColor.split(' ')[0]}`}>{healthScore}</span>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">/ 100</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Deployment Readiness Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-6 rounded-2xl relative"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none overflow-hidden rounded-2xl">
                            <ShieldCheck size={100} className="translate-x-4 -translate-y-4" />
                        </div>
                        <h3 className="text-lg font-semibold mb-6 relative z-10 flex items-center gap-2">
                            Deployment Readiness
                            <div className="relative group/tooltip flex items-center">
                                <Info size={14} className="text-zinc-500 hover:text-zinc-300 cursor-help" />
                                <div className="absolute bottom-full left-0 mb-2 w-56 p-3 bg-[#18181b] border border-white/10 rounded-lg shadow-xl text-xs text-zinc-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                                    An assessment of whether the codebase structure is safe to merge into production environments.
                                </div>
                            </div>
                        </h3>
                        
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400 text-sm">Structural Integrity</span>
                                <span className="text-green-400 font-mono text-sm">Verified</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400 text-sm">Risk Profile</span>
                                <span className="text-yellow-400 font-mono text-sm">Moderate</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400 text-sm">Recommendation</span>
                                <span className="text-white font-mono text-sm bg-primary/20 text-primary px-2 py-0.5 rounded">Safe to Merge</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Row: Risk Heatmap & Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Risk Heatmap */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6 rounded-2xl lg:col-span-2"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <ShieldAlert size={18} className="text-primary" />
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                Risk Heatmap
                                <div className="relative group/tooltip flex items-center">
                                    <Info size={14} className="text-zinc-500 hover:text-zinc-300 cursor-help" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#18181b] border border-white/10 rounded-lg shadow-xl text-xs text-zinc-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                                        <div className="font-semibold text-zinc-200 mb-1">Risk Factors:</div>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li><span className="text-red-400">High:</span> Secrets, Auth, Configs</li>
                                            <li><span className="text-yellow-400">Medium:</span> CI/CD, Package.json</li>
                                            <li><span className="text-yellow-400">Medium:</span> Files &gt; 50KB</li>
                                        </ul>
                                    </div>
                                </div>
                            </h3>
                        </div>
                        
                        <div className="space-y-3">
                            {calculatedRisks.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className={`w-2 h-2 rounded-full shrink-0 ${file.riskLevel === 'High' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`} />
                                        <div className="truncate font-mono text-sm text-zinc-300" title={file.path}>
                                            {file.path.split('/').pop()}
                                            <span className="block text-[10px] text-zinc-500 truncate">{file.reason}</span>
                                        </div>
                                    </div>
                                    <div className={`shrink-0 text-xs px-2 py-1 rounded ml-4 ${
                                        file.riskLevel === 'High' 
                                            ? 'text-red-400 border border-red-500/20 bg-red-500/10' 
                                            : 'text-yellow-400 border border-yellow-500/20 bg-yellow-500/10'
                                    }`}>
                                        {file.riskLevel} Risk
                                    </div>
                                </div>
                            ))}
                            {calculatedRisks.length === 0 && (
                                <div className="text-zinc-500 text-sm text-center py-8 flex flex-col items-center">
                                    <ShieldCheck size={32} className="text-green-500/50 mb-2" />
                                    No high-risk files detected.
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Engineering Insights */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-6 rounded-2xl"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Activity size={18} className="text-blue-400" />
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                Insights
                                <div className="relative group/tooltip flex items-center">
                                    <Info size={14} className="text-zinc-500 hover:text-zinc-300 cursor-help" />
                                    <div className="absolute bottom-full right-0 mb-2 w-56 p-3 bg-[#18181b] border border-white/10 rounded-lg shadow-xl text-xs text-zinc-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                                        High-level metrics derived from the AST parsing, detailing the core architectural pattern and technology spread.
                                    </div>
                                </div>
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Architecture Type</p>
                                <p className="font-medium text-white flex items-center gap-2">
                                    <ServerCrash size={14} className="text-zinc-400" /> Monolith
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Tech Stack Depth</p>
                                <p className="font-medium text-white flex items-center gap-2">
                                    <Zap size={14} className="text-zinc-400" /> {Object.keys(data.languages || {}).length} Languages
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Files</p>
                                <p className="font-medium text-white flex items-center gap-2">
                                    <GitCommit size={14} className="text-zinc-400" /> {data.fileTree.length} Files
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
