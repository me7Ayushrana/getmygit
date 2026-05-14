'use client';

import { motion } from 'framer-motion';
import { Star, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const trendingRepos = [
    { name: 'facebook/react', stars: '220k', risk: 'Low', color: 'text-blue-600 dark:text-blue-400' },
    { name: 'vercel/next.js', stars: '118k', risk: 'Low', color: 'text-gray-900 dark:text-zinc-200' },
    { name: 'tailwindlabs/tailwindcss', stars: '75k', risk: 'Medium', color: 'text-cyan-600 dark:text-cyan-400' },
    { name: 'microsoft/vscode', stars: '155k', risk: 'Low', color: 'text-blue-700 dark:text-blue-500' },
    { name: 'vuejs/vue', stars: '206k', risk: 'Low', color: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'remix-run/remix', stars: '26k', risk: 'Medium', color: 'text-indigo-600 dark:text-indigo-400' },
    { name: 'sveltejs/svelte', stars: '75k', risk: 'Low', color: 'text-orange-600 dark:text-orange-500' },
];

export function TrendingFeed() {
    const router = useRouter();

    return (
        <section className="py-12 relative z-10 overflow-hidden border-y border-black/[0.05] dark:border-white/5 bg-white/50 dark:bg-void/50 backdrop-blur-md transition-colors duration-500">
            <div className="flex items-center gap-4 mb-8 px-8 max-w-7xl mx-auto">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(225,29,72,0.4)]" />
                <h3 className="text-sm font-display tracking-widest text-gray-500 dark:text-zinc-400 uppercase font-bold">Trending Analysis</h3>
            </div>

            {/* Scrolling Marquee Container */}
            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Fades for edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-void to-transparent z-10 transition-colors duration-500" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-void to-transparent z-10 transition-colors duration-500" />

                <motion.div
                    className="flex whitespace-nowrap gap-6 py-2 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {/* Double the array for seamless infinite scrolling */}
                    {[...trendingRepos, ...trendingRepos, ...trendingRepos].map((repo, idx) => (
                        <div
                            key={idx}
                            onClick={() => router.push(`/${repo.name}`)}
                            className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl border border-black/[0.05] dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/[0.02] dark:hover:bg-white/10 transition-all cursor-pointer group/card shrink-0 shadow-sm dark:shadow-none"
                        >
                            <span className={`font-mono font-bold text-sm ${repo.color}`}>{repo.name}</span>
                            <div className="flex items-center gap-4 text-[11px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider font-medium">
                                <div className="flex items-center gap-1">
                                    <Star size={12} className="text-amber-500" /> {repo.stars}
                                </div>
                                <div className="flex items-center gap-1">
                                    <ShieldCheck size={12} className={repo.risk === 'Low' ? 'text-emerald-500' : 'text-amber-500'} /> 
                                    {repo.risk}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
