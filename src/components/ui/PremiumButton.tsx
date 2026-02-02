'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'glass';
    className?: string;
    icon?: ReactNode;
}

export function PremiumButton({ children, onClick, variant = 'primary', className = '', icon }: PremiumButtonProps) {
    const baseStyles = "relative px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group";

    const variants = {
        primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]",
        secondary: "bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10 hover:scale-[1.02]",
        glass: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-md"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {/* Shine effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />

            <span className="relative z-10 flex items-center gap-2">
                {children}
                {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
            </span>
        </button>
    );
}
