'use client';

import React, { useEffect, useRef, useState } from 'react';

export function CyberGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();

        const drawGrid = () => {
            ctx.clearRect(0, 0, width, height);
            
            const gridSize = 50;
            const dashSize = 1;
            const color = 'rgba(124, 58, 237, 0.05)'; // Deep purple theme
            const darkColor = 'rgba(124, 58, 237, 0.15)';

            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5;

            // Draw vertical lines
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                
                // Mouse distance effect
                const dist = Math.abs(x - mousePos.x);
                if (dist < 200) {
                    ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - dist / 200)})`;
                } else {
                    ctx.strokeStyle = color;
                }
                ctx.stroke();
            }

            // Draw horizontal lines
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);

                const dist = Math.abs(y - mousePos.y);
                if (dist < 200) {
                    ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - dist / 200)})`;
                } else {
                    ctx.strokeStyle = color;
                }
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(drawGrid);
        };

        drawGrid();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePos]);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 pointer-events-none opacity-50 dark:opacity-30 z-[-5]"
        />
    );
}
