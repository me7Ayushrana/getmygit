
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Users, CheckCircle2, ArrowRight } from 'lucide-react';

const ROLES = [
    {
        id: 'DEVELOPER',
        title: 'Developer',
        description: 'Analyze your code, sync PRs to the management system, and request expert reviews.',
        icon: User,
        color: 'blue'
    },
    {
        id: 'REVIEWER',
        title: 'Reviewer',
        description: 'Perform deep-dives into assigned code changes, provide feedback, and give approvals.',
        icon: Shield,
        color: 'purple'
    },
    {
        id: 'ADMIN',
        title: 'Administrator',
        description: 'Orchestrate teams, assign reviewers, monitor system risks, and oversee audit logs.',
        icon: Users,
        color: 'green'
    }
];

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('DEVELOPER');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name, role }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');

            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#050505] text-zinc-200 overflow-x-hidden">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center px-4 py-32 relative z-10 w-full max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/50">
                        Join the Intelligence Network
                    </h1>
                    <p className="text-zinc-400 max-w-xl mx-auto italic">
                        Select your specialized role and start managing GitHub Pull Requests with data-driven precision.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
                    {/* Role Selection Info */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">Select Your Identity</h2>
                        <div className="grid gap-4">
                            {ROLES.map((r) => (
                                <motion.div
                                    key={r.id}
                                    onClick={() => setRole(r.id)}
                                    whileHover={{ scale: 1.02 }}
                                    className={`relative p-6 rounded-2xl border transition-all cursor-pointer group ${role === r.id
                                            ? 'bg-zinc-900 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                                            : 'bg-black/40 border-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${role === r.id ? 'bg-white/10 text-white' : 'bg-zinc-900 text-zinc-600'
                                            }`}>
                                            <r.icon size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-lg">{r.title}</h3>
                                                {role === r.id && (
                                                    <motion.div layoutId="check-icon">
                                                        <CheckCircle2 size={16} className="text-neon-green" />
                                                    </motion.div>
                                                )}
                                            </div>
                                            <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                                {r.description}
                                            </p>
                                        </div>
                                    </div>
                                    {role === r.id && (
                                        <motion.div
                                            layoutId="active-border"
                                            className="absolute inset-0 border-2 border-white/20 rounded-2xl pointer-events-none"
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Registration Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-sans placeholder:text-zinc-700"
                                        placeholder="Ayush Rana"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2 ml-1">Operational Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-sans placeholder:text-zinc-700"
                                        placeholder="dev@getmygit.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2 ml-1">Access Key</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-sans placeholder:text-zinc-700"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 py-2 rounded-lg"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full group relative overflow-hidden bg-white text-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-zinc-200"
                            >
                                <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.1em] text-xs">
                                    {isLoading ? 'Processing Authorization...' : `Initialize as ${role}`}
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-white/5 text-center">
                            <p className="text-zinc-500 text-xs tracking-wider">
                                ALREADY IN THE SYSTEM?{' '}
                                <Link href="/login" className="text-white hover:underline transition-all">
                                    ACCESS PORTAL
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_0,rgba(3,0,20,1)_100%)] pointer-events-none -z-10" />
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none -z-0" />
        </div>
    );
}
