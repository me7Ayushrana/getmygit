'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer className="relative border-t border-black/[0.05] dark:border-white/5 bg-white dark:bg-[#030014] pt-32 pb-12 overflow-hidden transition-colors duration-500">
            {/* Giant Watermark */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
                <h1 className="text-[15vw] md:text-[20vw] font-bold text-black/[0.02] dark:text-white/[0.02] tracking-tighter leading-none">
                    getmygit
                </h1>
            </div>

            <div className="container relative z-10 px-6 mx-auto">
                {/* Pre-Footer CTA */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-24 border-b border-black/[0.05] dark:border-white/5 pb-24">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                            Ready to explore?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md text-lg font-light">
                            Turn complex codebases into interactive maps. Start visualizing in seconds.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="#analyze"
                            className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold tracking-wide hover:bg-black dark:hover:bg-zinc-200 transition-all duration-300 shadow-xl dark:shadow-none"
                        >
                            <span className="relative z-10 flex items-center gap-2 uppercase text-xs tracking-widest font-display">
                                START ANALYZING <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-24">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400">
                                getmygit
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-500 mb-8 max-w-sm font-mono text-sm leading-relaxed">
                            The visual layer for the world&apos;s code. Built for developers who value clarity over complexity.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={Github} />
                            <SocialIcon icon={Twitter} />
                            <SocialIcon icon={Mail} />
                        </div>
                    </div>

                    <FooterColumn title="PRODUCT">
                        <FooterLink href="#features">Features</FooterLink>
                        <FooterLink href="#use-cases">Use Cases</FooterLink>
                        <FooterLink href="#roadmap">Roadmap</FooterLink>
                        <FooterLink href="#changelog">Changelog</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="RESOURCES">
                        <FooterLink href="#">Documentation</FooterLink>
                        <FooterLink href="#">API Reference</FooterLink>
                        <FooterLink href="#">Community Guide</FooterLink>
                        <FooterLink href="#">Blog</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="LEGAL">
                        <FooterLink href="#">Privacy Policy</FooterLink>
                        <FooterLink href="#">Terms of Service</FooterLink>
                        <FooterLink href="#">Cookie Policy</FooterLink>
                    </FooterColumn>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/[0.05] dark:border-white/5 text-xs font-mono text-gray-400 dark:text-gray-600">
                    <p>&copy; {new Date().getFullYear()} getmygit. All systems operational.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <span>EST. 2024</span>
                        <span>EARTH, SOL SYSTEM</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs font-bold text-gray-400 dark:text-white/40 tracking-[0.2em]">{title}</h4>
            <ul className="flex flex-col gap-4">
                {children}
            </ul>
        </div>
    );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-blue-400 transition-colors duration-300 text-sm font-medium tracking-wide"
            >
                {children}
            </Link>
        </li>
    );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <a
            href="#"
            className="w-10 h-10 rounded-full border border-black/[0.08] dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black/[0.2] dark:hover:border-white/30 hover:bg-black/[0.02] dark:hover:bg-white/5 transition-all duration-300"
        >
            <Icon size={18} />
        </a>
    );
}
