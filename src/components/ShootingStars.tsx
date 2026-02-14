"use client";

import { useEffect, useRef, useCallback } from "react";

export default function ShootingStars() {
    const ref = useRef<HTMLCanvasElement>(null);

    const draw = useCallback(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        interface Star {
            x: number;
            y: number;
            r: number;
            o: number;
        }

        interface ShootingStar {
            x: number;
            y: number;
            len: number;
            speed: number;
            size: number;
            waitTime: number;
            active: boolean;
        }

        // Static stars
        const stars: Star[] = Array.from({ length: 100 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            o: Math.random() * 0.5 + 0.3, // Brighter stars
        }));

        // Shooting star
        let shootingStar: ShootingStar = {
            x: 0,
            y: 0,
            len: 0,
            speed: 0,
            size: 0,
            waitTime: 0,
            active: false,
        };

        const resetShootingStar = () => {
            shootingStar = {
                x: Math.random() * canvas.width,
                y: 0,
                len: Math.random() * 80 + 10,
                speed: Math.random() * 10 + 6,
                size: Math.random() * 1 + 0.1,
                waitTime: Math.random() * 50, // More frequent shots
                active: false,
            };
        };

        resetShootingStar();

        let animId: number;
        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw static stars
            stars.forEach((s) => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.o})`;
                ctx.fill();
            });

            // Handle shooting star
            if (shootingStar.active) {
                shootingStar.x -= shootingStar.speed;
                shootingStar.y += shootingStar.speed;

                // Draw trail
                const gradient = ctx.createLinearGradient(
                    shootingStar.x,
                    shootingStar.y,
                    shootingStar.x + shootingStar.len,
                    shootingStar.y - shootingStar.len
                );
                gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                ctx.lineWidth = shootingStar.size;
                ctx.strokeStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(shootingStar.x, shootingStar.y);
                ctx.lineTo(
                    shootingStar.x + shootingStar.len,
                    shootingStar.y - shootingStar.len
                );
                ctx.stroke();

                // Reset if out of bounds
                if (shootingStar.x < -100 || shootingStar.y > canvas.height + 100) {
                    resetShootingStar();
                }
            } else {
                if (shootingStar.waitTime > 0) {
                    shootingStar.waitTime--;
                } else {
                    shootingStar.active = true;
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
