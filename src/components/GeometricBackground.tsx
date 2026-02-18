"use client";

import { useEffect, useRef } from "react";

export default function GeometricBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let mouseX = -1000;
        let mouseY = -1000;

        const shapes: Shape[] = [];
        const shapeCount = 50;

        interface Shape {
            x: number;
            y: number;
            size: number;
            color: string;
            angle: number;
            spinSpeed: number;
            vx: number;
            vy: number;
            type: 'square' | 'triangle' | 'circle';
        }

        const colors = [
            "rgba(99, 102, 241, 0.4)", // Indigo
            "rgba(236, 72, 153, 0.4)", // Pink
            "rgba(34, 211, 238, 0.4)", // Cyan
            "rgba(139, 92, 246, 0.4)", // Violet
        ];

        // Init
        for (let i = 0; i < shapeCount; i++) {
            shapes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 20 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                angle: Math.random() * Math.PI * 2,
                spinSpeed: (Math.random() - 0.5) * 0.05,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                type: Math.random() > 0.6 ? 'square' : Math.random() > 0.3 ? 'triangle' : 'circle'
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const drawShape = (s: Shape) => {
            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.angle);
            ctx.fillStyle = s.color;
            ctx.beginPath();

            if (s.type === 'square') {
                ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
            } else if (s.type === 'circle') {
                ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (s.type === 'triangle') {
                ctx.moveTo(0, -s.size / 2);
                ctx.lineTo(s.size / 2, s.size / 2);
                ctx.lineTo(-s.size / 2, s.size / 2);
                ctx.fill();
            }

            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            shapes.forEach(s => {
                // Move
                s.x += s.vx;
                s.y += s.vy;
                s.angle += s.spinSpeed;

                // Bounce walls
                if (s.x < 0 || s.x > width) s.vx *= -1;
                if (s.y < 0 || s.y > height) s.vy *= -1;

                // Mouse Interaction (Repulsion)
                const dx = s.x - mouseX;
                const dy = s.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    const angle = Math.atan2(dy, dx);
                    s.vx -= Math.cos(angle) * force * 2; // Repel strongly
                    s.vy -= Math.sin(angle) * force * 2;
                    s.spinSpeed += 0.02;
                }

                // Friction
                s.vx *= 0.95;
                s.vy *= 0.95;
                s.spinSpeed *= 0.98;

                drawShape(s);
            });

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none bg-slate-900"
        />
    );
}
