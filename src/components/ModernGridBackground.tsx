"use client";

import { useEffect, useRef } from "react";

export default function ModernGridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;
        let mouseX = -100;
        let mouseY = -100;

        // Configuration
        const gridSize = 50;
        const baseColor = "rgba(56, 189, 248, 0.03)"; // Very subtle grid
        const activeColor = "rgba(14, 165, 233, 0.4)"; // Bright Sky Blue
        const highlightColor = "rgba(45, 212, 191, 0.3)"; // Teal

        interface Square {
            x: number;
            y: number;
            life: number;
            maxLife: number;
            color: string;
        }

        const activeSquares: Square[] = [];

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const drawGrid = () => {
            ctx.beginPath();
            ctx.strokeStyle = baseColor;
            ctx.lineWidth = 1;

            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.stroke();
        };

        const updateAndDrawSquares = () => {
            // Spawn random squares
            if (Math.random() < 0.05) {
                const x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
                const y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
                activeSquares.push({
                    x,
                    y,
                    life: 0,
                    maxLife: Math.random() * 50 + 50,
                    color: activeColor
                });
            }

            // Mouse interaction
            if (mouseX > 0 && mouseY > 0) {
                const gridX = Math.floor(mouseX / gridSize) * gridSize;
                const gridY = Math.floor(mouseY / gridSize) * gridSize;

                // If not already active at this spot
                if (!activeSquares.some((s) => s.x === gridX && s.y === gridY)) {
                    activeSquares.push({
                        x: gridX,
                        y: gridY,
                        life: 0,
                        maxLife: 30,
                        color: highlightColor
                    });
                }
            }

            // Update & Draw
            for (let i = activeSquares.length - 1; i >= 0; i--) {
                const sq = activeSquares[i];
                sq.life++;

                // Fade in then out
                let alpha = 0;
                if (sq.life < sq.maxLife * 0.2) {
                    alpha = sq.life / (sq.maxLife * 0.2);
                } else if (sq.life > sq.maxLife * 0.8) {
                    alpha = (sq.maxLife - sq.life) / (sq.maxLife * 0.2);
                } else {
                    alpha = 1;
                }

                // Apply alpha to the rgba string (simple string manipulation for perf)
                // Assuming color format is "rgba(r, g, b, a)"
                const colorBase = sq.color.substring(0, sq.color.lastIndexOf(","));
                const originalAlpha = parseFloat(sq.color.split(",")[3]);
                ctx.fillStyle = `${colorBase}, ${originalAlpha * alpha})`;

                ctx.fillRect(sq.x + 1, sq.y + 1, gridSize - 2, gridSize - 2);

                if (sq.life >= sq.maxLife) {
                    activeSquares.splice(i, 1);
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            drawGrid();
            updateAndDrawSquares();
            animationFrameId = requestAnimationFrame(animate);
        };

        handleResize(); // Init size
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
}
