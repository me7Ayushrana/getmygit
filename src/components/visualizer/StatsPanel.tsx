import React from 'react';
import { PieChart, BarChart2, Star, GitFork, Eye, Disc, Info } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';
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
        <div className="h-full overflow-y-auto p-4 space-y-6 text-gray-600 dark:text-zinc-300 transition-colors duration-500" data-lenis-prevent>
            {/* Repo Stats */}
            <div className="grid grid-cols-3 gap-2">
                <StatCard icon={Star} label="Stars" value={repo.stars} tooltip="Total stargazers for this repository on GitHub." />
                <StatCard icon={GitFork} label="Forks" value={repo.forks_count} tooltip="Number of times this repository has been forked." />
                <StatCard icon={Eye} label="Watchers" value={repo.watchers_count} tooltip="Users actively watching this repository for updates." />
            </div>

            {/* Language Breakdown */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                        <PieChart size={16} /> Languages
                    </h3>
                    <Tooltip text="The distribution of programming languages used in the codebase, calculated by total byte count per file." position="bottom">
                        <Info size={14} className="text-zinc-500 hover:text-white cursor-help" />
                    </Tooltip>
                </div>

                {/* Progress Bar */}
                <div className="flex h-3 rounded-full overflow-hidden bg-black/[0.05] dark:bg-zinc-800">
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
                            <span className="font-medium text-gray-800 dark:text-zinc-200">{lang.name}</span>
                            <span className="text-gray-400 dark:text-zinc-500 ml-auto">{lang.percent}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Facts */}
            <div className="space-y-2 pt-4 border-t border-black/[0.05] dark:border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Details</h3>
                    <Tooltip text="Key metadata and synchronization details retrieved from the GitHub API." position="bottom">
                        <Info size={14} className="text-zinc-500 hover:text-white cursor-help" />
                    </Tooltip>
                </div>
                <div className="text-xs space-y-2">
                    <div className="flex justify-between">
                        <span>Default Branch</span>
                        <span className="font-mono text-gray-500 dark:text-zinc-400">{repo.default_branch}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Created</span>
                        <span className="font-mono text-gray-500 dark:text-zinc-400">{new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Open Issues</span>
                        <span className="font-mono text-gray-500 dark:text-zinc-400">{repo.open_issues_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, tooltip }: any) => (
    <Tooltip text={tooltip} position="bottom">
        <div className="bg-gray-50 dark:bg-[#18181b] border border-black/[0.05] dark:border-[#27272a] p-3 rounded-lg flex flex-col items-center justify-center text-center transition-colors hover:border-blue-500/30">
            <Icon size={16} className="text-gray-400 dark:text-zinc-400 mb-1" />
            <span className="text-lg font-bold text-gray-900 dark:text-zinc-100">{value}</span>
            <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider">{label}</span>
        </div>
    </Tooltip>
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
