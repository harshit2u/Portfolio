"use client";

import { useEffect, useRef } from "react";

export default function WaveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const styles = getComputedStyle(document.documentElement);
        const pRgb1 = styles.getPropertyValue("--particle-rgb-1").trim() || "14, 165, 233";
        const pRgb2 = styles.getPropertyValue("--particle-rgb-2").trim() || "45, 212, 191";
        const pRgb3 = styles.getPropertyValue("--particle-rgb-3").trim() || "99, 102, 241";

        const waves = [
            { amplitude: 30, frequency: 0.01, speed: 0.02, offset: 0, color: `rgba(${pRgb1}, 0.2)` },
            { amplitude: 50, frequency: 0.005, speed: 0.015, offset: 100, color: `rgba(${pRgb2}, 0.2)` },
            { amplitude: 40, frequency: 0.008, speed: 0.01, offset: 200, color: `rgba(${pRgb3}, 0.2)` },
        ];

        let animationId: number;
        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            waves.forEach((wave) => {
                ctx.beginPath();
                ctx.moveTo(0, height / 2);

                for (let x = 0; x < width; x++) {
                    const y = height / 2 +
                        wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed + wave.offset) +
                        (Math.sin(x * 0.002 + time * 0.005) * 50); // Add slow large wave
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                ctx.fillStyle = wave.color;
                ctx.fill();
            });

            time++;
            animationId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-[var(--theme-blend)]"
        />
    );
}
