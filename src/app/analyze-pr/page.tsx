
'use client';

import { useState } from 'react';
import { PrAnalysis } from '@/services/prAnalyzer';
import { PrInput } from '@/components/pr/PrInput';
import { PrDashboard } from '@/components/pr/PrDashboard';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Save, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrAnalysisPage() {
    const [analysis, setAnalysis] = useState<PrAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [error, setError] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const { user } = useAuth();
    const router = useRouter();

    const handleAnalyze = async (url: string) => {
        setIsLoading(true);
        setError('');
        setAnalysis(null);

        try {
            const res = await fetch('/api/analyze-pr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Failed to analyze PR. Please check the URL.');
            }

            setAnalysis(data);
            setCurrentUrl(url);
        } catch (err: any) {
            setError(err.message || 'Failed to analyze PR. Please check the URL.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const res = await fetch('/api/pr/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ githubUrl: currentUrl }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to sync PR');
            router.push(`/pr/${data.id}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#050505] text-zinc-200 overflow-x-hidden relative">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-32 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
                        Pull Request Intelligence
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Analyze impact, detect risks, and find the perfect reviewers for your GitHub Pull Requests.
                    </p>
                </div>

                <div className="mb-12">
                    <PrInput onAnalyze={handleAnalyze} isLoading={isLoading} />
                </div>

                {error && (
                    <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
                        {error}
                    </div>
                )}

                <AnimatePresence>
                    {analysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            {user && (
                                <div className="max-w-6xl mx-auto mb-6 flex justify-end">
                                    <button
                                        onClick={handleSync}
                                        disabled={isSyncing}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-600/20 disabled:opacity-50"
                                    >
                                        {isSyncing ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                        {isSyncing ? 'Syncing...' : 'Sync to Management System'}
                                    </button>
                                </div>
                            )}
                            <PrDashboard analysis={analysis} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />

            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none -z-0" />
        </div>
    );
}
