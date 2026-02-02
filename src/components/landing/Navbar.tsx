'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className={`
        transition-all duration-500 ease-out pointer-events-auto
        ${scrolled ? 'py-3 bg-[#030014]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'py-4 bg-transparent border border-transparent'}
        rounded-full px-8 flex items-center justify-between
        w-full max-w-5xl
      `}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full border border-neon-blue/30 flex items-center justify-center relative overflow-hidden group-hover:border-neon-blue/60 transition-colors">
                        <div className="absolute inset-0 bg-neon-blue/20 blur-md" />
                        <span className="relative z-10 text-xs font-display font-bold text-neon-blue">GG</span>
                    </div>
                    <span className="text-lg font-display font-bold tracking-widest text-white group-hover:text-neon-blue transition-colors">
                        getmygit
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {['Features', 'How it Works', 'Story'].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} className="px-5 py-2 text-xs font-display tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all uppercase">
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Action */}
                <div className="flex items-center gap-4">
                    <a href="https://github.com/me7Ayushrana/getmygit" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors">
                        <Github size={18} />
                    </a>
                    <a href="#analyze" className="hidden sm:flex px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-blue/30 text-white rounded-full text-xs font-display font-bold tracking-wider transition-all">
                        LAUNCH
                    </a>
                </div>
            </nav>
        </div>
    );
}
