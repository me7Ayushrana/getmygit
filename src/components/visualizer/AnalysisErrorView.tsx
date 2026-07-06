'use client';

import React, { useState, useEffect } from 'react';
import { Key, AlertTriangle, ArrowLeft, RefreshCw, Eye, EyeOff, Check, HelpCircle } from 'lucide-react';

interface AnalysisErrorViewProps {
    owner: string;
    repo: string;
    errorMessage: string;
}

export function AnalysisErrorView({ owner, repo, errorMessage }: AnalysisErrorViewProps) {
    const [token, setToken] = useState('');
    const [showToken, setShowToken] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [hasExistingToken, setHasExistingToken] = useState(false);

    useEffect(() => {
        // Check if there is an existing custom token in cookies
        const cookies = document.cookie.split(';');
        const hasToken = cookies.some(item => item.trim().startsWith('github-token='));
        setHasExistingToken(hasToken);
    }, []);

    const handleSaveToken = (e: React.FormEvent) => {
        e.preventDefault();
        if (!token.trim()) return;

        setIsSaving(true);
        // Set cookie github-token (valid for 1 year)
        document.cookie = `github-token=${token.trim()}; path=/; max-age=31536000; SameSite=Lax`;
        
        // Also save to localStorage as backup
        localStorage.setItem('github-token', token.trim());

        setSaved(true);
        setIsSaving(false);
        
        // Reload page to trigger fresh server-side analysis
        setTimeout(() => {
            window.location.reload();
        }, 800);
    };

    const handleClearToken = () => {
        // Clear cookie
        document.cookie = 'github-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
        // Clear localStorage
        localStorage.removeItem('github-token');
        setHasExistingToken(false);
        setToken('');
        // Reload
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fafafa] dark:bg-void transition-colors duration-500">
            <div className="w-full max-w-xl">
                {/* Back Link */}
                <a 
                    href="/" 
                    className="inline-flex items-center gap-2 text-xs font-display tracking-widest text-gray-500 dark:text-zinc-500 hover:text-black dark:hover:text-white uppercase transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Search
                </a>

                {/* Error Card */}
                <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden mb-6 border-red-500/20 dark:border-red-500/30 transition-all duration-[250ms] ease-out">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/50 to-rose-600/50" />
                    
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500 shrink-0">
                            <AlertTriangle className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-1">
                                Analysis Failed
                            </h2>
                            <p className="text-xs text-gray-400 dark:text-zinc-500 font-mono mb-4 uppercase tracking-wider">
                                {owner} / {repo}
                            </p>
                            <div className="p-4 bg-red-500/[0.03] border border-red-500/10 rounded-xl text-sm text-red-600 dark:text-red-400 font-medium">
                                {errorMessage}
                            </div>
                        </div>
                    </div>
                </div>

                {/* GitHub Token Form */}
                <div className="glass-card rounded-3xl p-6 md:p-8 relative transition-all duration-[250ms] ease-out">
                    <h3 className="text-md font-semibold text-gray-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
                        <Key className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        Supply Personal Access Token (PAT)
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mb-6 leading-relaxed">
                        If the host's token is invalid or has hit the GitHub API rate limits (60/hr for unauthenticated), supplying a Personal Access Token bypasses this completely and grants up to 5,000 requests/hr.
                    </p>

                    <form onSubmit={handleSaveToken} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showToken ? 'text' : 'password'}
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder={hasExistingToken ? "••••••••••••••••••••••••••••••••" : "Paste your github_pat_... or ghp_..."}
                                className="w-full px-4 py-3 bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-400/50 transition-colors pr-12 font-mono"
                                required={!hasExistingToken}
                            />
                            <button
                                type="button"
                                onClick={() => setShowToken(!showToken)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                            >
                                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isSaving || saved}
                                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-semibold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 disabled:opacity-50 cursor-pointer"
                            >
                                {saved ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                        Token Saved!
                                    </>
                                ) : (
                                    <>
                                        {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Key className="w-3.5 h-3.5" />}
                                        Save Token & Retry
                                    </>
                                )}
                            </button>

                            {hasExistingToken && (
                                <button
                                    type="button"
                                    onClick={handleClearToken}
                                    className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/10 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                    Clear Stored Key
                                </button>
                            )}
                        </div>
                    </form>

                    {/* How to Guide */}
                    <div className="mt-8 pt-6 border-t border-black/[0.05] dark:border-white/[0.05]">
                        <h4 className="text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                            <HelpCircle className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                            How to generate a token
                        </h4>
                        <ol className="list-decimal list-inside text-[11px] text-gray-500 dark:text-zinc-400 space-y-2 leading-relaxed">
                            <li>Sign in to <a href="https://github.com" target="_blank" rel="noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline">GitHub</a>.</li>
                            <li>Go to <strong>Settings</strong> &gt; <strong>Developer settings</strong> (left sidebar bottom).</li>
                            <li>Under <strong>Personal access tokens</strong>, select <strong>Tokens (classic)</strong>.</li>
                            <li>Click <strong>Generate new token</strong> &gt; <strong>Generate new token (classic)</strong>.</li>
                            <li>Give it a description and tick the <strong><code>repo</code></strong> checkbox scope.</li>
                            <li>Click <strong>Generate token</strong> at the bottom, copy it, and paste it here.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
