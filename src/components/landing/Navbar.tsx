'use client';

import Link from 'next/link';
import { Github, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className={`
        transition-all duration-500 ease-out pointer-events-auto
        ${scrolled ? 'py-3 bg-[#030014]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'py-6 bg-transparent border border-transparent'}
        rounded-full px-8 flex items-center justify-between
        w-full max-w-7xl
      `}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full border border-neon-green/30 flex items-center justify-center relative overflow-hidden group-hover:border-neon-green/60 transition-colors">
                        <div className="absolute inset-0 bg-neon-green/20 blur-md" />
                        <span className="relative z-10 text-xs font-display font-bold text-neon-green">GG</span>
                    </div>
                    <span className="text-lg font-display font-bold tracking-widest text-white group-hover:text-neon-green transition-colors">
                        getmygit
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    <Link href="/analyze-pr" className="px-5 py-2 text-xs font-display tracking-widest text-blue-400 hover:text-white hover:bg-blue-500/10 rounded-full transition-all uppercase border border-blue-500/20">
                        PR Intelligence
                    </Link>
                    {user && (
                        <Link href="/dashboard" className="px-5 py-2 text-xs font-display tracking-widest text-purple-400 hover:text-white hover:bg-purple-500/10 rounded-full transition-all uppercase border border-purple-500/20">
                            Dashboard
                        </Link>
                    )}
                    {['Story', 'Features', 'How it Works'].map((item) => (
                        <Link key={item} href={`/#${item.toLowerCase().replace(/\s/g, '-')}`} className="px-5 py-2 text-xs font-display tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all uppercase">
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Action */}
                <div className="flex items-center gap-4">
                    <a href="https://github.com/me7Ayushrana/getmygit" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors">
                        <Github size={18} />
                    </a>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                <User size={12} className="text-neon-green" />
                                <span className="text-[10px] font-display tracking-widest text-zinc-400 uppercase">{user.role}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-full text-[10px] font-display font-bold tracking-widest transition-all"
                            >
                                <LogOut size={12} /> EXIT
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="px-6 py-2 bg-neon-blue/10 border border-neon-blue/20 hover:bg-neon-blue/20 hover:border-neon-blue/50 text-neon-blue rounded-full text-xs font-display font-bold tracking-wider transition-all text-glow">
                            SIGN IN
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}
