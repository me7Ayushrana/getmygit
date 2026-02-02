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

    const navLinks = [
        { name: 'How it Works', href: '#how-it-works' },
        { name: 'Features', href: '#features' },
        { name: 'Use Cases', href: '#use-cases' },
        { name: 'History', href: '#history' },
        { name: 'Roadmap', href: '#roadmap' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel border-b border-white/10 py-3' : 'py-5 bg-transparent'}`}>
            <div className="container flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">getmygit</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <Link key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <a href="https://github.com/me7Ayushrana/getmygit" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="#hero" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-colors">
                        Analyze Repo
                    </a>
                </div>
            </div>
        </nav>
    );
}
