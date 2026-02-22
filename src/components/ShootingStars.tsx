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

        // Shooting stars array
        const createShootingStar = (): ShootingStar => ({
            x: Math.random() * canvas.width * 1.5, // Spread them out more
            y: Math.random() * -100, // Start slightly above screen
            len: Math.random() * 80 + 10,
            speed: Math.random() * 10 + 6,
            size: Math.random() * 1 + 0.1,
            waitTime: Math.random() * 150, // Stagger their appearances
            active: false,
        });

        const numShootingStars = 15;
        let shootingStars: ShootingStar[] = Array.from({ length: numShootingStars }, createShootingStar);

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

            // Handle shooting stars
            shootingStars.forEach((star, index) => {
                if (star.active) {
                    star.x -= star.speed;
                    star.y += star.speed;

                    // Draw trail
                    const gradient = ctx.createLinearGradient(
                        star.x,
                        star.y,
                        star.x + star.len,
                        star.y - star.len
                    );
                    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                    ctx.lineWidth = star.size;
                    ctx.strokeStyle = gradient;
                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(
                        star.x + star.len,
                        star.y - star.len
                    );
                    ctx.stroke();

                    // Reset if out of bounds
                    if (star.x < -200 || star.y > canvas.height + 200) {
                        shootingStars[index] = createShootingStar();
                    }
                } else {
                    if (star.waitTime > 0) {
                        star.waitTime--;
                    } else {
                        star.active = true;
                    }
                }
            });

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
