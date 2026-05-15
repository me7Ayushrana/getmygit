'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showText?: boolean;
}

export function Logo({ size = 'md', className = '', showText = true }: LogoProps) {
    const sizes = {
        sm: { icon: 'w-8 h-8', text: 'text-sm', ring: 'p-0.5' },
        md: { icon: 'w-10 h-10', text: 'text-lg', ring: 'p-0.5' },
        lg: { icon: 'w-16 h-16', text: 'text-3xl', ring: 'p-1' }
    };

    const currentSize = sizes[size];

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Iconic GG Circle */}
            <div className={`relative ${currentSize.icon} flex items-center justify-center rounded-full overflow-hidden group`}>
                {/* Outer Holographic Ring */}
                <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow opacity-80" />
                <div className="absolute inset-[1.5px] rounded-full bg-white dark:bg-[#030014]" />
                
                {/* Inner Glow Ring */}
                <div className="absolute inset-[3px] rounded-full p-[1px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 opacity-60" />
                <div className="absolute inset-[4px] rounded-full bg-white dark:bg-[#030014]" />

                {/* GG Letters */}
                <span className="relative z-10 font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-zinc-500 select-none" style={{ fontSize: size === 'lg' ? '1.5rem' : '0.8rem' }}>
                    GG
                </span>

                {/* Subtle Glitch Overlay */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -skew-x-12 translate-x-[-200%]"
                    animate={{ translateX: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                />
            </div>

            {/* getmygit Text */}
            {showText && (
                <span className={`font-display font-bold tracking-[0.1em] transition-all duration-500 ${currentSize.text} text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 dark:from-zinc-100 dark:via-zinc-400 dark:to-zinc-100 group-hover:from-indigo-400 group-hover:to-cyan-400`}>
                    getmygit
                </span>
            )}
        </div>
    );
}
