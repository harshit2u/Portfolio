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

        interface Particle {
            x: number;
            y: number;
            r: number;
            dx: number;
            dy: number;
            o: number;
        }

        const particles: Particle[] = Array.from({ length: 100 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.8,
            dy: (Math.random() - 0.5) * 0.8,
            o: Math.random() * 0.5 + 0.2,
        }));

        let animId: number;
        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.dx;
                p.y += p.dy;

                // Bounce off edges smoothly
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(129, 140, 248, ${p.o})`;
                ctx.fill();
            });

            // draw lines between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        // Dynamic opacity based on distance
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 140)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(tick);
        };
        tick();
        return () => cancelAnimationFrame(animId);
    }, []);

    useEffect(() => {
        const cleanup = draw();
        const handleResize = () => draw();
        window.addEventListener("resize", handleResize);
        return () => {
            cleanup?.();
            window.removeEventListener("resize", handleResize);
        };
    }, [draw]);

    return (
        <canvas
            ref={ref}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
}
