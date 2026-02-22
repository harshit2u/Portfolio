"use client";

import { useEffect, useRef, useCallback } from "react";

export default function ParticleCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);

    const draw = useCallback(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let mouse = { x: -1000, y: -1000, active: false };

        interface Particle {
            x: number;
            y: number;
            r: number;
            dx: number;
            dy: number;
            o: number;
        }

        const numParticles = Math.floor((canvas.width * canvas.height) / 10000);
        const maxParticles = Math.min(Math.max(numParticles, 40), 120);

        const particles: Particle[] = Array.from({ length: maxParticles }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.5 + 0.5,
            dx: (Math.random() - 0.5) * 1.2,
            dy: (Math.random() - 0.5) * 1.2,
            o: Math.random() * 0.5 + 0.3,
        }));

        let animId: number;
        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.dx;
                p.y += p.dy;

                // Mouse interaction - repel and connect
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 200;

                    if (dist < maxDist) {
                        const force = (maxDist - dist) / maxDist;
                        const pushX = (dx / dist) * force * 1.5;
                        const pushY = (dy / dist) * force * 1.5;

                        p.x -= pushX;
                        p.y -= pushY;

                        // Interactive Glowing connect lines to mouse
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.5 * force})`;
                        ctx.lineWidth = 1.2 * force;
                        ctx.stroke();
                    }
                }

                // Bounce off edges smoothly
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

                // Keeps them in bounds
                if (p.x < 0) p.x = 0;
                if (p.x > canvas.width) p.x = canvas.width;
                if (p.y < 0) p.y = 0;
                if (p.y > canvas.height) p.y = canvas.height;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(129, 140, 248, ${p.o})`;
                ctx.fill();
            }

            // draw lines between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.3 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(tick);
        };
        tick();

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Only act active if mouse is within the general canvas area
            if (x >= -50 && x <= canvas.width + 50 && y >= -50 && y <= canvas.height + 50) {
                mouse.x = x;
                mouse.y = y;
                mouse.active = true;
            } else {
                mouse.active = false;
            }
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    useEffect(() => {
        let cleanup: (() => void) | undefined;
        // Delay drawing slightly to ensure proper dimensions if rendered dynamically
        const timer = setTimeout(() => {
            cleanup = draw();
        }, 50);

        const handleResize = () => {
            if (cleanup) cleanup();
            cleanup = draw();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            clearTimeout(timer);
            cleanup?.();
            window.removeEventListener("resize", handleResize);
        };
    }, [draw]);

    return (
        <canvas
            ref={ref}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen"
        />
    );
}
