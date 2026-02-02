'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, Sparkles } from 'lucide-react';

export function RepoSearch() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleAnalyze = () => {
        setError('');

        // Parse URL
        let owner = '';
        let repo = '';

        try {
            const cleanUrl = url.trim();
            if (!cleanUrl) return;

            if (cleanUrl.startsWith('https://github.com/')) {
                const parts = cleanUrl.replace('https://github.com/', '').split('/');
                owner = parts[0];
                repo = parts[1];
            } else if (cleanUrl.split('/').length === 2) {
                const parts = cleanUrl.split('/');
                owner = parts[0];
                repo = parts[1];
            } else {
                throw new Error('Invalid format');
            }

            if (!owner || !repo) throw new Error('Invalid format');

            setIsLoading(true);
            router.push(`/${owner}/${repo}`);
        } catch (e) {
            setError('Please enter a valid GitHub URL (e.g., owner/repo or full link)');
        }
    };

    const setExample = (val: string) => {
        setUrl(val);
        setError('');
    };

    return (
        <div id="analyze" className="w-full max-w-2xl mx-auto py-8">
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                {/* Glow Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent opacity-50" />

                <div className="text-center mb-8">
                    <h3 className="text-xl font-display font-bold mb-2 tracking-wide flex items-center justify-center gap-2">
                        <Sparkles size={16} className="text-neon-blue" />
                        INITIATE ANALYSIS
                    </h3>
                    <p className="text-gray-400 text-xs tracking-widest uppercase">
                        Paste repository URL to generate map
                    </p>
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="text-gray-500" size={18} />
                    </div>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                        placeholder="https://github.com/owner/repository"
                        disabled={isLoading}
                        className="w-full bg-[#030014]/50 border border-white/10 rounded-xl py-4 pl-12 pr-32 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all font-mono text-sm"
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="absolute right-2 top-2 bottom-2 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/20 px-6 rounded-lg text-xs font-bold tracking-widest transition-all uppercase disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'SCAN'}
                    </button>
                </div>

                {error && (
                    <p className="text-red-400 text-xs mb-4 text-center font-mono bg-red-500/10 py-2 rounded border border-red-500/20">
                        {error}
                    </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 font-mono">
                    <span>EXAMPLES:</span>
                    <button onClick={() => setExample('facebook/react')} className="hover:text-neon-blue transition-colors">facebook/react</button>
                    <span className="text-white/10">|</span>
                    <button onClick={() => setExample('vercel/next.js')} className="hover:text-neon-blue transition-colors">vercel/next.js</button>
                </div>
            </div>
        </div>
    );
}
