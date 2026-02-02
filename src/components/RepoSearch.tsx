'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';

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
        <div id="analyze" className="w-full max-w-2xl mx-auto py-12">
            <div className="bg-slate-900/80 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />

                <h3 className="text-2xl font-bold mb-2 text-center">Analyze a Repository</h3>
                <p className="text-gray-400 text-center mb-8 text-sm">
                    Paste a URL below to generate an interactive visual map.
                </p>

                <div className="glass-panel p-2 rounded-lg flex items-center mb-4 border-2 border-transparent focus-within:border-purple-500/50 transition-colors bg-black/40">
                    <Search className="text-gray-500 ml-3" size={20} />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                        placeholder="https://github.com/owner/repository"
                        disabled={isLoading}
                        className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder-gray-600 w-full"
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Analyze'}
                    </button>
                </div>

                {error && (
                    <p className="text-red-400 text-sm mb-4 text-center bg-red-500/10 py-2 rounded border border-red-500/20">
                        {error}
                    </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400">
                    <span>Try:</span>
                    <button onClick={() => setExample('facebook/react')} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-colors text-purple-400">facebook/react</button>
                    <button onClick={() => setExample('vercel/next.js')} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-colors text-purple-400">vercel/next.js</button>
                    <button onClick={() => setExample('tailwindlabs/tailwindcss')} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-colors text-purple-400">tailwindlabs/tailwindcss</button>
                </div>

                {isLoading && (
                    <div className="mt-4 text-center text-sm text-purple-300 animate-pulse">
                        Connecting to GitHub API...
                    </div>
                )}
            </div>
        </div>
    );
}
