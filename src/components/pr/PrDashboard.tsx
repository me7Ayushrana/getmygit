
import { PrAnalysis } from '@/services/prAnalyzer';
import { AlertTriangle, CheckCircle, FileText, ShieldAlert, Users, GitPullRequest, Search, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

interface PrDashboardProps {
    analysis: PrAnalysis;
}

export const PrDashboard = ({ analysis }: PrDashboardProps) => {
    if (!analysis) {
        return (
            <div className="bg-[#09090b] border border-[#27272a] border-dashed rounded-xl p-12 text-center text-zinc-500">
                <ShieldAlert className="mx-auto mb-4 opacity-20" size={48} />
                <p>No analysis data available for this pull request.</p>
            </div>
        );
    }
    const { details, impact, riskScore, readinessScore, readinessMessage, suggestedReviewers } = analysis;

    const riskColor = riskScore > 70 ? 'text-red-500' : riskScore > 30 ? 'text-yellow-500' : 'text-green-500';
    const readinessColor = readinessScore > 80 ? 'text-green-500' : readinessScore > 50 ? 'text-yellow-500' : 'text-red-500';

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 text-zinc-200">
            {/* Header Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 shadow-xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <GitPullRequest size={120} />
                </div>
                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${details.state === 'open' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                                {details.state.toUpperCase()}
                            </span>
                            <span className="text-zinc-500 text-sm">#{details.number}</span>
                            <span className="text-zinc-500 text-sm">by {details.author}</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">{details.title}</h1>
                        <a href={details.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                            View on GitHub <Search size={12} />
                        </a>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-zinc-400">Created</div>
                        <div className="font-mono text-zinc-200">{new Date(details.created_at).toLocaleDateString()}</div>
                    </div>
                </div>
            </motion.div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ShieldAlert className={`mb-4 ${riskColor}`} size={40} />
                    <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Risk Score</h3>
                    <div className={`text-5xl font-bold mt-2 ${riskColor}`}>{riskScore}/100</div>
                    <p className="text-zinc-500 text-xs mt-2 max-w-xs">{impact.riskLevel} Risk Detected based on file changes and sensitivity.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-bl from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CheckCircle className={`mb-4 ${readinessColor}`} size={40} />
                    <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Deployment Readiness</h3>
                    <div className={`text-5xl font-bold mt-2 ${readinessColor}`}>{readinessScore}%</div>
                    <p className="text-zinc-500 text-xs mt-2 max-w-xs">{readinessMessage}</p>
                </motion.div>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Impact Analysis */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-[#09090b] border border-[#27272a] rounded-xl p-6 shadow-lg"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FileText size={18} className="text-blue-400" /> Impact Analysis
                    </h3>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#18181b] p-3 rounded-lg border border-[#27272a]">
                            <div className="text-zinc-500 text-xs">Files Changed</div>
                            <div className="text-xl font-mono text-white">{impact.totalFiles}</div>
                        </div>
                        <div className="bg-[#18181b] p-3 rounded-lg border border-[#27272a]">
                            <div className="text-zinc-500 text-xs">Additions</div>
                            <div className="text-xl font-mono text-green-400">+{impact.totalAdditions}</div>
                        </div>
                        <div className="bg-[#18181b] p-3 rounded-lg border border-[#27272a]">
                            <div className="text-zinc-500 text-xs">Deletions</div>
                            <div className="text-xl font-mono text-red-400">-{impact.totalDeletions}</div>
                        </div>
                    </div>

                    {impact.sensitiveFiles.length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                            <h4 className="text-red-400 text-sm font-semibold flex items-center gap-2 mb-2">
                                <AlertOctagon size={14} /> Sensitive Files Detected
                            </h4>
                            <ul className="space-y-1">
                                {impact.sensitiveFiles.map(file => (
                                    <li key={file} className="text-sm text-red-300/80 font-mono">{file}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-6">
                        <h4 className="text-zinc-400 text-sm font-semibold mb-3">Modified Files</h4>
                        <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-2">
                            {analysis.files.map((file, i) => (
                                <div key={i} className="flex items-center justify-between text-sm py-2 px-3 hover:bg-[#18181b] rounded transition-colors">
                                    <span className="font-mono text-zinc-300 truncate max-w-[70%]">{file.filename}</span>
                                    <div className="flex gap-3 text-xs font-mono">
                                        <span className="text-green-500">+{file.additions}</span>
                                        <span className="text-red-500">-{file.deletions}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Reviewer Suggestions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 shadow-lg"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Users size={18} className="text-purple-400" /> Suggested Reviewers
                    </h3>

                    {suggestedReviewers.length > 0 ? (
                        <div className="space-y-3">
                            {suggestedReviewers.map((reviewer, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-[#18181b] rounded-lg border border-[#27272a]">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold border border-purple-500/30">
                                        {reviewer[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white">{reviewer}</div>
                                        <div className="text-xs text-zinc-500">Top Contributor</div>
                                    </div>
                                    <a
                                        href={`https://github.com/${reviewer}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-400 hover:text-blue-300"
                                    >
                                        Profile
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-zinc-500 text-sm">No specific reviewers found based on file history.</p>
                    )}

                    <div className="mt-6 bg-blue-500/5 border border-blue-500/10 rounded-lg p-4">
                        <h4 className="text-blue-400 text-sm font-semibold mb-2">AI Tip</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            These suggestions are based on commit history of the modified files. Involving these experts can reduce review time by 20%.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
