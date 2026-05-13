
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Key, Mail, Lock, ShieldAlert, ArrowRight, Loader2, X } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');

            login(data.user.email, data.token, data.user);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#050505] text-zinc-200 overflow-x-hidden">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 py-32 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-[450px] bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative"
                >
                    {/* Decorative glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] -z-10" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px] -z-10" />

                    {/* Close Button */}
                    <Link 
                        href="/" 
                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-20"
                    >
                        <X size={16} />
                    </Link>

                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Key size={32} className="text-white" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">System Access</h1>
                    <p className="text-zinc-500 text-center mb-10 text-sm">Enter your administrative credentials</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Demo Credentials Alert */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-2xl relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <div className="flex gap-3 items-start relative z-10">
                                <ShieldAlert size={18} className="text-blue-400 mt-0.5 shrink-0" />
                                <div className="space-y-2">
                                    <h3 className="text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase">Operational Presets</h3>
                                    <div className="text-[11px] text-zinc-400 font-mono space-y-1">
                                        <p>Admin: <span className="text-blue-300">admin@getmygit.com</span> / <span className="text-blue-300">password123</span></p>
                                        <p>Dev: <span className="text-zinc-300">dev@getmygit.com</span> / <span className="text-zinc-300">password123</span></p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-4">
                            <div className="relative group">
                                <label className="block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2 ml-1">Terminal ID</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-sans placeholder:text-zinc-800"
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2 ml-1">Secure Passkey</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-sans placeholder:text-zinc-800"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative overflow-hidden bg-white text-black font-black py-5 rounded-[1.5rem] transition-all flex items-center justify-center gap-2 hover:bg-zinc-200 disabled:opacity-50"
                        >
                            <span className="relative z-10 flex items-center gap-3 uppercase tracking-[0.15em] text-xs">
                                {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Authenticate'}
                                {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-zinc-500 text-xs tracking-wider">
                            NEW OPERATIVE?{' '}
                            <Link href="/register" className="text-white font-bold hover:underline transition-all">
                                REQUEST ACCESS
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </main>

            <Footer />
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[#030014] -z-20" />
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none -z-10" />
        </div>
    );
}
