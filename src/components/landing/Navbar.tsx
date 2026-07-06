'use client';

import Link from 'next/link';
import { Github, LogOut, User, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { TokenSettings } from '@/components/theme/TokenSettings';
import { Logo } from '@/components/ui/Logo';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const isLanding = pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showGlass = scrolled || !isLanding;

    return (
        <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
            <nav className={`
                transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto
                ${showGlass 
                    ? 'py-2.5 bg-white/70 dark:bg-[#0a0814]/60 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
                    : 'py-4 bg-transparent border border-transparent shadow-none'
                }
                rounded-2xl px-6 flex items-center justify-between
                w-full max-w-6xl
            `}>
                {/* Logo */}
                <Link href="/" className="group">
                    <Logo size="md" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-0.5 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl border border-black/[0.05] dark:border-white/[0.05] px-1.5 py-1">
                    <Link href="/analyze-pr" className="px-4 py-2 text-[11px] font-display tracking-[0.15em] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 rounded-lg transition-all duration-200 uppercase">
                        PR Intel
                    </Link>
                    {user && (
                        <Link href="/dashboard" className="px-4 py-2 text-[11px] font-display tracking-[0.15em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-lg transition-all duration-200 uppercase">
                            Dashboard
                        </Link>
                    )}
                    {['Story', 'Features'].map((item) => (
                        <Link key={item} href={`/#${item.toLowerCase()}`} className="px-4 py-2 text-[11px] font-display tracking-[0.15em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-lg transition-all duration-200 uppercase">
                            {item}
                        </Link>
                    ))}
                    <Link href="/#how-it-works" className="px-4 py-2 text-[11px] font-display tracking-[0.15em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-lg transition-all duration-200 uppercase">
                        How it Works
                    </Link>

                    {/* Divider */}
                    <div className="w-px h-5 bg-black/[0.08] dark:bg-white/[0.08] mx-1" />

                    <Link href="/#prospects" className="px-4 py-2 text-[11px] font-display tracking-[0.15em] text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-500/5 dark:hover:bg-purple-500/10 rounded-lg transition-all duration-200 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Prospects
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <TokenSettings />
                    <ThemeToggle />
                    
                    <a 
                        href="https://github.com/me7Ayushrana/getmygit" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.06] hover:bg-black/5 dark:hover:bg-white/[0.08] hover:border-black/20 dark:hover:border-white/[0.12] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                    >
                        <Github size={15} />
                    </a>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] rounded-lg">
                                <User size={12} className="text-emerald-600 dark:text-emerald-400" />
                                <span className="text-[10px] font-display tracking-[0.15em] text-gray-500 dark:text-gray-400 uppercase">{user.role}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/[0.06] border border-red-500/15 hover:bg-red-500/[0.12] text-red-600 dark:text-red-400 rounded-lg text-[10px] font-display font-bold tracking-[0.15em] transition-all duration-200"
                            >
                                <LogOut size={11} /> EXIT
                            </button>
                        </div>
                    ) : (
                        <Link 
                            href="/login" 
                            className="px-5 py-2 bg-black/90 dark:bg-white/[0.06] border border-black/10 dark:border-white/[0.1] hover:bg-black dark:hover:bg-white/[0.1] text-white rounded-lg text-[11px] font-display font-bold tracking-[0.15em] transition-all duration-200 uppercase"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}
