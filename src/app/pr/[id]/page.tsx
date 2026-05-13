
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PrAnalyzerService } from '@/services/prAnalyzer';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { PrDashboard } from '@/components/pr/PrDashboard';
import {
    Users,
    ShieldCheck,
    ShieldAlert,
    MessageSquare,
    UserPlus,
    ChevronRight,
    Loader2,
    CheckCircle2,
    XCircle,
    Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrDetailPage() {
    const { id } = useParams();
    const { user, token } = useAuth();
    const router = useRouter();

    const [prData, setPrData] = useState<any>(null);
    const [analysis, setAnalysis] = useState<any>(null);
    const [reviewers, setReviewers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchInitialData();
        }
    }, [id]);

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch PR details from DB with ID
            const res = await fetch(`/api/pr/${id}`);
            if (!res.ok) throw new Error('PR not found in system');
            const pr = await res.json();
            setPrData(pr);

            // 2. Fetch Analysis (re-run client side for UI consistency)
            const analysisResult = await PrAnalyzerService.analyze(pr.githubUrl);
            setAnalysis(analysisResult);

            // 3. Fetch potential reviewers (all users with role REVIEWER)
            const usersRes = await fetch('/api/users?role=REVIEWER');
            const reviewUsers = await usersRes.json();
            setReviewers(reviewUsers);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAssign = async (reviewerId: string) => {
        setIsActionLoading(true);
        try {
            const res = await fetch(`/api/pr/${id}/assign`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviewerId, analystId: user?.id }),
            });
            if (!res.ok) throw new Error('Assignment failed');
            fetchInitialData(); // Refresh
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleReview = async (status: 'APPROVED' | 'REJECTED') => {
        setIsActionLoading(true);
        try {
            const res = await fetch(`/api/pr/${id}/review`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviewerId: user?.id, status, comment }),
            });
            if (!res.ok) throw new Error('Review submission failed');
            fetchInitialData(); // Refresh
            setComment('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const isAssignedToMe = useMemo(() => {
        return prData?.assignments?.some((a: any) => a.reviewerId === user?.id);
    }, [prData, user]);

    const canAssign = useMemo(() => {
        return user?.role === 'ADMIN' || user?.role === 'DEVELOPER';
    }, [user]);

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">Initializing PR Management View...</div>;

    return (
        <div className="min-h-screen flex flex-col bg-[#050505] text-zinc-200">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-32 relative z-10">
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
                    <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
                    <ChevronRight size={14} />
                    <span className="text-zinc-300">#{prData?.pullNumber}</span>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3"
                    >
                        <ShieldAlert size={18} />
                        {error}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Analysis Column */}
                    <div className="lg:col-span-3 space-y-8">
                        {analysis ? <PrDashboard analysis={analysis} /> : (
                            <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-24 text-center">
                                <Loader2 className="animate-spin mx-auto text-blue-500 mb-4" size={32} />
                                <p className="text-zinc-500">Awaiting analysis synchronization...</p>
                            </div>
                        )}
                    </div>

                    {/* Management Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 shadow-lg">
                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Current Status</h3>
                            <div className="flex items-center gap-3">
                                {prData?.status === 'APPROVED' ? (
                                    <div className="flex items-center gap-2 text-green-500 font-bold">
                                        <CheckCircle2 size={24} /> APPROVED
                                    </div>
                                ) : prData?.status === 'REJECTED' ? (
                                    <div className="flex items-center gap-2 text-red-500 font-bold">
                                        <XCircle size={24} /> REJECTED
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-yellow-500 font-bold animate-pulse">
                                        <Clock size={24} /> PENDING
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reviewer Assignment */}
                        {canAssign && (
                            <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 shadow-lg">
                                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <UserPlus size={16} /> Assign Reviewer
                                </h3>
                                <div className="space-y-2">
                                    {reviewers.map((rev) => (
                                        <button
                                            key={rev.id}
                                            onClick={() => handleAssign(rev.id)}
                                            disabled={isActionLoading || prData?.assignments?.some((a: any) => a.reviewerId === rev.id)}
                                            className="w-full text-left px-3 py-2 rounded bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 text-sm transition-all flex items-center justify-between group disabled:opacity-50"
                                        >
                                            <span>{rev.name || rev.email}</span>
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Perform Review */}
                        {isAssignedToMe && prData.status === 'PENDING' && (
                            <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 shadow-lg shadow-blue-500/10 border-blue-500/30">
                                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <ShieldCheck size={16} /> Perform Review
                                </h3>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add review comments..."
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500/50 min-h-[100px] mb-4"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleReview('APPROVED')}
                                        className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-green-600/20"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReview('REJECTED')}
                                        className="bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg text-sm font-bold transition-all"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Activity History */}
                        <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 shadow-lg">
                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Activity size={16} /> Audit Trail
                            </h3>
                            <div className="space-y-4">
                                {prData?.reviews?.map((review: any) => (
                                    <div key={review.id} className="border-l-2 border-zinc-800 pl-4 py-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${review.status === 'APPROVED' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {review.status}
                                            </span>
                                            <span className="text-xs text-zinc-500">{review.reviewer.name}</span>
                                        </div>
                                        {review.comment && <p className="text-xs text-zinc-400 italic">"{review.comment}"</p>}
                                        <div className="text-[10px] text-zinc-600 mt-1">{new Date(review.createdAt).toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none -z-0" />
        </div>
    );
}

function Clock({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
