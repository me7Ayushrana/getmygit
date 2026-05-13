'use client';

import { motion } from 'framer-motion';
import { Star, GitFork, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const trendingRepos = [
    { name: 'facebook/react', stars: '220k', risk: 'Low', color: 'text-blue-400' },
    { name: 'vercel/next.js', stars: '118k', risk: 'Low', color: 'text-zinc-200' },
    { name: 'tailwindlabs/tailwindcss', stars: '75k', risk: 'Medium', color: 'text-cyan-400' },
    { name: 'microsoft/vscode', stars: '155k', risk: 'Low', color: 'text-blue-500' },
    { name: 'vuejs/vue', stars: '206k', risk: 'Low', color: 'text-emerald-400' },
    { name: 'remix-run/remix', stars: '26k', risk: 'Medium', color: 'text-indigo-400' },
    { name: 'sveltejs/svelte', stars: '75k', risk: 'Low', color: 'text-orange-500' },
];

export function TrendingFeed() {
    const router = useRouter();

    return (
        <section className="py-12 relative z-10 overflow-hidden border-y border-white/5 bg-void/50 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-8 px-8 max-w-7xl mx-auto">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-sm font-display tracking-widest text-zinc-400 uppercase font-bold">Trending Analysis</h3>
            </div>

            {/* Scrolling Marquee Container */}
            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Fades for edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-void to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-void to-transparent z-10" />

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
                            className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/card shrink-0"
                        >
                            <span className={`font-mono font-bold ${repo.color}`}>{repo.name}</span>
                            <div className="flex items-center gap-4 text-xs text-zinc-500">
                                <div className="flex items-center gap-1">
                                    <Star size={12} /> {repo.stars}
                                </div>
                                <div className="flex items-center gap-1">
                                    <ShieldCheck size={12} className={repo.risk === 'Low' ? 'text-green-400' : 'text-yellow-400'} /> 
                                    Risk: {repo.risk}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
