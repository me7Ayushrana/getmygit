import React from 'react';
import { PieChart, BarChart2, Star, GitFork, Eye, Disc } from 'lucide-react';
import { GitHubRepo } from '@/types';

interface StatsPanelProps {
    languages: Record<string, number>;
    repo: GitHubRepo;
}

export const StatsPanel = ({ languages, repo }: StatsPanelProps) => {
    const totalBytes = Object.values(languages).reduce((acc, val) => acc + val, 0);

    const languagesList = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .map(([lang, bytes]) => ({
            name: lang,
            bytes,
            percent: ((bytes / totalBytes) * 100).toFixed(1),
            color: getLanguageColor(lang)
        }));

    return (
        <div className="h-full overflow-y-auto p-4 space-y-6 text-zinc-300">
            {/* Repo Stats */}
            <div className="grid grid-cols-3 gap-2">
                <StatCard icon={Star} label="Stars" value={repo.stars} />
                <StatCard icon={GitFork} label="Forks" value={repo.forks_count} />
                <StatCard icon={Eye} label="Watchers" value={repo.watchers_count} />
            </div>

            {/* Language Breakdown */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                    <PieChart size={16} /> Languages
                </h3>

                {/* Progress Bar */}
                <div className="flex h-3 rounded-full overflow-hidden bg-zinc-800">
                    {languagesList.map((lang) => (
                        <div
                            key={lang.name}
                            style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                            title={`${lang.name}: ${lang.percent}%`}
                        />
                    ))}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {languagesList.map((lang) => (
                        <div key={lang.name} className="flex items-center gap-2 text-xs">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                            <span className="font-medium text-zinc-200">{lang.name}</span>
                            <span className="text-zinc-500 ml-auto">{lang.percent}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Facts */}
            <div className="space-y-2 pt-4 border-t border-zinc-800">
                <h3 className="text-sm font-semibold text-zinc-100">Details</h3>
                <div className="text-xs space-y-2">
                    <div className="flex justify-between">
                        <span>Default Branch</span>
                        <span className="font-mono text-zinc-400">{repo.default_branch}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Created</span>
                        <span className="font-mono text-zinc-400">{new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Open Issues</span>
                        <span className="font-mono text-zinc-400">{repo.open_issues_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value }: any) => (
    <div className="bg-[#18181b] border border-[#27272a] p-3 rounded-lg flex flex-col items-center justify-center text-center">
        <Icon size={16} className="text-zinc-400 mb-1" />
        <span className="text-lg font-bold text-zinc-100">{value}</span>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</span>
    </div>
);

function getLanguageColor(lang: string) {
    const map: Record<string, string> = {
        TypeScript: '#3178c6',
        JavaScript: '#f1e05a',
        CSS: '#563d7c',
        HTML: '#e34c26',
        Python: '#3572A5',
        Java: '#b07219',
        Go: '#00ADD8',
        Rust: '#dea584',
        Vue: '#41b883',
        Shell: '#89e051',
    };
    return map[lang] || '#8b949e';
}
