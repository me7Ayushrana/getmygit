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
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav className={`
        transition-all duration-300 ease-in-out
        ${scrolled ? 'py-3 bg-black/50 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/50' : 'py-4 bg-transparent border border-transparent'}
        rounded-full px-8 flex items-center justify-between
        w-full max-w-5xl
      `}>
                {/* Logo */}
                <Link href="/" className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold shadow-lg shadow-purple-500/20">
                        GG
                    </div>
                    <span className="text-lg font-medium tracking-tight">getmygit</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {['Features', 'How it Works', 'Story'].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Action */}
                <div className="flex items-center gap-4">
                    <a href="https://github.com/me7Ayushrana/getmygit" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="#analyze" className="hidden sm:flex px-5 py-2 bg-white text-black hover:bg-gray-200 rounded-full text-sm font-semibold transition-all">
                        Start
                    </a>
                </div>
            </nav>
        </div>
    );
}
