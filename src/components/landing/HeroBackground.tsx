'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

function Node({ x, y, delay }: { x: number; y: number; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
            style={{ left: `${x}%`, top: `${y}%` }}
            className="absolute w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_10px_var(--color-neon-blue)]"
        />
    );
}

function Connection({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <motion.line
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 2, delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                stroke="url(#gradient-line)"
                strokeWidth="1"
            />
            <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0, 240, 255, 0)" />
                    <stop offset="50%" stopColor="rgba(0, 240, 255, 0.5)" />
                    <stop offset="100%" stopColor="rgba(216, 180, 254, 0.5)" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function HeroBackground() {
    // Generate random stable nodes
    const nodes = [
        { x: 20, y: 30 }, { x: 80, y: 20 },
        { x: 50, y: 50 },
        { x: 20, y: 70 }, { x: 80, y: 80 },
        { x: 35, y: 20 }, { x: 65, y: 70 }
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Nodes */}
            {nodes.map((n, i) => (
                <Node key={i} x={n.x} y={n.y} delay={i * 0.5} />
            ))}

            {/* Connections (Mesh) */}
            <Connection x1={20} y1={30} x2={50} y2={50} delay={0} />
            <Connection x1={80} y1={20} x2={50} y2={50} delay={0.5} />
            <Connection x1={20} y1={70} x2={50} y2={50} delay={1} />
            <Connection x1={80} y1={80} x2={50} y2={50} delay={1.5} />
            <Connection x1={35} y1={20} x2={80} y2={20} delay={2} />

            <div className="absolute inset-0 bg-void/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]" />
        </div>
    );
}
