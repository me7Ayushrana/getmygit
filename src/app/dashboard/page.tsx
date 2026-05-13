'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    LayoutDashboard, GitPullRequest, Settings, Search, Bell, 
    User, FolderGit2, ShieldAlert, Zap, Activity, Clock, LogOut 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

// Mock Data for demonstration
const mockPrs = [
    { id: '1', title: 'Refactor core authentication service', author: 'alice_dev', status: 'PENDING', riskScore: 85, additions: 450, deletions: 120, time: '2h ago' },
    { id: '2', title: 'Update dependency: React to 19', author: 'bob_ops', status: 'APPROVED', riskScore: 12, additions: 45, deletions: 45, time: '5h ago' },
    { id: '3', title: 'Fix memory leak in websocket connection', author: 'charlie_eng', status: 'PENDING', riskScore: 45, additions: 89, deletions: 12, time: '1d ago' },
];

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'prs' | 'admin'>('overview');

    return (
        <div className="flex h-screen bg-void text-zinc-200 overflow-hidden font-sans">
            
            {/* Sidebar */}
            <aside className="w-20 lg:w-64 border-r border-white/5 bg-zinc-900/20 backdrop-blur-3xl flex flex-col items-center lg:items-stretch py-6 transition-all duration-300 z-20">
                <div className="px-4 mb-10 flex justify-center lg:justify-start items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <FolderGit2 className="text-primary" size={20} />
                    </div>
                    <span className="font-bold text-xl hidden lg:block tracking-tight">GetMyGit</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 w-full">
                    <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <SidebarItem icon={GitPullRequest} label="PR Intelligence" active={activeTab === 'prs'} onClick={() => setActiveTab('prs')} />
                    <SidebarItem icon={ShieldAlert} label="Admin Portal" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} />
                </nav>

                <div className="px-4 mt-auto w-full">
                    <SidebarItem icon={Settings} label="Settings" />
                    <button onClick={logout} className="w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors group">
                        <LogOut size={20} />
                        <span className="hidden lg:block text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative z-10">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

                {/* Top Navbar */}
                <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-zinc-900/10 backdrop-blur-md">
                    <div className="relative w-64 lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search repositories, PRs..." 
                            className="w-full bg-black/40 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-zinc-600"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors relative">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-blue-500/20 border border-white/10 flex items-center justify-center cursor-pointer">
                            <User size={18} className="text-white" />
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {activeTab === 'overview' && <OverviewTab />}
                    {activeTab === 'prs' && <PRIntelligenceTab />}
                    {activeTab === 'admin' && <AdminTab />}
                </div>
            </main>
        </div>
    );
}

function SidebarItem({ icon: Icon, label, active, onClick }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl transition-all group ${
                active ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(139,255,77,0.05)]' : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
        >
            <Icon size={20} className={active ? 'text-primary' : 'text-zinc-500 group-hover:text-white transition-colors'} />
            <span className={`hidden lg:block text-sm font-medium ${active ? 'text-primary' : ''}`}>{label}</span>
        </button>
    );
}

function OverviewTab() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <h1 className="text-2xl font-bold tracking-tight">Repository Intelligence</h1>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Repositories" value="24" icon={FolderGit2} trend="+3 this week" />
                <StatCard title="Active PRs" value="12" icon={GitPullRequest} trend="4 high risk" />
                <StatCard title="Review Velocity" value="2.4 days" icon={Activity} trend="-0.5 days" />
            </div>

            {/* Architecture Preview (Mock) */}
            <div className="glass-card rounded-3xl p-8 border border-white/5 bg-zinc-900/30">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-lg">Architecture Visualization</h2>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-400 border border-white/10">frontend-core</span>
                </div>
                <div className="h-64 w-full rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                    <div className="text-center z-10">
                        <FolderGit2 size={48} className="text-zinc-600 mx-auto mb-4 group-hover:text-primary transition-colors duration-500" />
                        <p className="text-zinc-500 text-sm">Interactive tree rendering...</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PRIntelligenceTab() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
             <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-2">PR Intelligence</h1>
                    <p className="text-zinc-500 text-sm">Automated risk scoring and impact analysis.</p>
                </div>
                <button className="glass-button px-6 py-2 rounded-xl text-sm border-primary/30 hover:border-primary/50 hover:bg-primary/10 text-primary">
                    Analyze New PR
                </button>
            </div>

            <div className="grid gap-4">
                {mockPrs.map(pr => (
                    <div key={pr.id} className="glass-card p-6 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all cursor-pointer">
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                {pr.status === 'APPROVED' ? (
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><GitPullRequest size={16}/></div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500"><GitPullRequest size={16}/></div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{pr.title}</h3>
                                <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500 font-medium">
                                    <span className="flex items-center gap-1"><User size={12}/> {pr.author}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 text-green-400"><span className="text-green-500 font-mono">+{pr.additions}</span></span>
                                    <span className="flex items-center gap-1 text-red-400"><span className="text-red-500 font-mono">-{pr.deletions}</span></span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Clock size={12}/> {pr.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider font-bold">Risk Score</div>
                                <div className={`text-lg font-bold font-mono ${pr.riskScore > 50 ? 'text-orange-500' : 'text-green-500'}`}>
                                    {pr.riskScore}/100
                                </div>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className={`px-3 py-1 text-xs font-bold rounded-full border ${pr.status === 'APPROVED' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-orange-500/10 border-orange-500/20 text-orange-500'}`}>
                                {pr.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function AdminTab() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
            <div className="glass-card rounded-3xl border border-white/5 bg-zinc-900/30 p-8 flex flex-col items-center justify-center h-96 text-center">
                <ShieldAlert size={48} className="text-zinc-600 mb-4" />
                <h3 className="text-lg font-bold mb-2">Governance Controls</h3>
                <p className="text-zinc-500 text-sm max-w-md">Global tracking, reviewer assignments, and audit logs are accessible here for platform administrators.</p>
            </div>
        </motion.div>
    );
}

function StatCard({ title, value, icon: Icon, trend }: any) {
    return (
        <div className="glass-card p-6 rounded-3xl flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                    <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-zinc-500 bg-white/5 px-2 py-1 rounded-full border border-white/5">{trend}</span>
            </div>
            <div>
                <div className="text-3xl font-bold tracking-tight mb-1">{value}</div>
                <div className="text-sm text-zinc-500 font-medium">{title}</div>
            </div>
        </div>
    );
}
