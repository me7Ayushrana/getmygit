'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface TooltipProps {
    children: React.ReactNode;
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    width?: string;
}

export function Tooltip({ children, text, position = 'top', width = 'w-64' }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const updateCoords = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height
            });
        }
    };

    const handleMouseEnter = () => {
        updateCoords();
        setIsVisible(true);
    };

    const getTooltipStyles = () => {
        // We use absolute positioning within a portal that covers the entire document
        // Or simply fixed positioning if the portal is fixed.
        const offset = 8;
        switch (position) {
            case 'top':
                return {
                    top: coords.top - offset,
                    left: coords.left + coords.width / 2,
                    transform: 'translate(-50%, -100%)'
                };
            case 'bottom':
                return {
                    top: coords.top + coords.height + offset,
                    left: coords.left + coords.width / 2,
                    transform: 'translate(-50%, 0)'
                };
            case 'left':
                return {
                    top: coords.top + coords.height / 2,
                    left: coords.left - offset,
                    transform: 'translate(-100%, -50%)'
                };
            case 'right':
                return {
                    top: coords.top + coords.height / 2,
                    left: coords.left + coords.width + offset,
                    transform: 'translate(0, -50%)'
                };
            default:
                return {};
        }
    };

    return (
        <>
            <div 
                ref={triggerRef}
                className="inline-flex items-center justify-center cursor-help"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            {mounted && isVisible && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        style={{
                            position: 'fixed',
                            ...getTooltipStyles(),
                            zIndex: 10000,
                        }}
                        className={`${width} p-3 bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl pointer-events-none`}
                    >
                        <div className="text-[11px] text-zinc-300 leading-relaxed font-sans tracking-wide text-center">
                            {text}
                        </div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
