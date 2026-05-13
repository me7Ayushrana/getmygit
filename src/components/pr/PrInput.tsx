
import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface PrInputProps {
    onAnalyze: (url: string) => void;
    isLoading: boolean;
}

export const PrInput = ({ onAnalyze, isLoading }: PrInputProps) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onAnalyze(url.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
            <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg group-hover:bg-blue-500/30 transition-all duration-500" />
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste GitHub Pull Request URL (e.g., https://github.com/owner/repo/pull/123)"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-40 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50 relative z-10 transition-all shadow-xl"
                    disabled={isLoading}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 z-20 group-focus-within:text-blue-400 transition-colors" size={25} />

                <button
                    type="submit"
                    disabled={isLoading || !url}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-20 flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={16} />
                            Analyzing...
                        </>
                    ) : (
                        'Analyze PR'
                    )}
                </button>
            </div>
        </form>
    );
};
