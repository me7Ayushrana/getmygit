'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function RepoSearch() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleAnalyze = () => {
        setError('');

        // Parse URL
        // Supports: https://github.com/owner/repo or owner/repo
        let owner = '';
        let repo = '';

        try {
            const cleanUrl = url.trim();
            if (cleanUrl.startsWith('https://github.com/')) {
                const parts = cleanUrl.replace('https://github.com/', '').split('/');
                owner = parts[0];
                repo = parts[1];
            } else if (cleanUrl.split('/').length === 2) {
                const parts = cleanUrl.split('/');
                owner = parts[0];
                repo = parts[1];
            } else {
                throw new Error('Invalid GitHub URL format');
            }

            if (!owner || !repo) throw new Error('Invalid GitHub URL format');

            router.push(`/${owner}/${repo}`);
        } catch (e) {
            setError('Please enter a valid GitHub URL (e.g., owner/repo)');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="glass-panel p-2 rounded-lg flex items-center mb-2">
                <Search className="text-gray-500 ml-2" size={20} />
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                    placeholder="https://github.com/facebook/react"
                    className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-white placeholder-gray-500"
                />
                <button
                    onClick={handleAnalyze}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
                    style={{ backgroundColor: 'var(--primary)' }}
                >
                    Analyze
                </button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
    );
}
