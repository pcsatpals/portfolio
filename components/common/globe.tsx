"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const markers = [
        { id: "india", location: [20.5937, 78.9629], label: "India", flag: "🇮🇳" },
        { id: "spain", location: [42.5751, -8.1339], label: "Spain", flag: "🇪🇸" },
        { id: "france", location: [46.6034, 1.8883], label: "France", flag: "🇫🇷" },
        { id: "japan", location: [36.2048, 138.2529], label: "Japan", flag: "🇯🇵" },
        { id: "uk", location: [51.5074, -0.1278], label: "United Kingdom", flag: "🇬🇧" },
        { id: "china", location: [35.8617, 104.1954], label: "China", flag: "🇨🇳" },
        { id: "saudi-arabia", location: [23.8859, 45.0792], label: "Saudi Arabia", flag: "🇸🇦" },
        { id: "greenland", location: [71.7069, -42.6043], label: "Greenland", flag: "🇬🇱" },
        { id: "finland", location: [61.9241, 25.7482], label: "Finland", flag: "🇫🇮" },
    ];

    useEffect(() => {
        if (!canvasRef.current) return;
        let phi = 0;
        let theta = 0.2;

        let isDragging = false;
        let lastX = 0;
        let lastY = 0;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi,
            theta,
            dark: 1,
            diffuse: 0.0,
            mapSamples: 20000,
            mapBrightness: 35,
            baseColor: [0.078, 0.078, 0.102],
            glowColor: [0.5, 0.5, 0.5],
            opacity: 1,
            markerColor: [0, 0, 0],
            markers: markers.map((m) => ({
                location: m.location as [number, number],
                size: 0.03,
                id: m.id,
                label: m.label,
            })),
        });

        const canvas = canvasRef.current;

        const onMouseDown = (e: MouseEvent) => {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const deltaX = e.clientX - lastX;
            const deltaY = e.clientY - lastY;

            // rotate horizontally
            phi += deltaX * 0.005;

            theta += deltaY * 0.005;
            theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, theta));

            lastX = e.clientX;
            lastY = e.clientY;
        };

        const onMouseUp = () => {
            isDragging = false;
        };

        canvas.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        let raf: number;
        const animate = () => {
            if (!isDragging) phi += 0.003;

            globe.update({ phi, theta });
            raf = requestAnimationFrame(animate);
        };


        animate();

        return () => {
            cancelAnimationFrame(raf);
            canvas.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            globe.destroy();
        };
    }, []);
    {
        markers.map(m => (
            <div
                key={m.id}
                className="marker-label"
                style={{
                    positionAnchor: `--cobe-${m.id}`,
                    opacity: `var(--cobe-visible-${m.id}, 0)`
                }}
            >
                {m.label}
            </div>
        ))
    }

    return (
        <div
            className='w-full flex flex-col '
        >
            <div style={{
                width: '100%',
                maxWidth: 500,
                aspectRatio: 1,
                margin: '0 auto',
                position: 'relative',
            }}>
                <canvas
                    ref={canvasRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        contain: "layout paint size",
                        zIndex: "999",
                        opacity: 1,
                        // filter:
                        //   "drop-shadow(0 0 40px rgba(255, 255, 255, 0.16)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.12))",
                    }}
                />

                {markers.map((m) => (
                    <div
                        key={m.id}
                        style={{
                            position: "absolute",
                            positionAnchor: `--cobe-${m.id}`,
                            opacity: `var(--cobe-visible-${m.id}, 0)`,
                            left: "anchor(center)",
                            bottom: "anchor(top)",
                            transform: "translate(-90%, -8px)",
                            pointerEvents: "none",
                            transition: "opacity 0.3s",
                            zIndex: 50,
                            fontFamily: 'inter, sans-serif'

                        }}
                        className={`flex items-center gap-2 bg-white/[0.08] backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap `}

                    >
                        <span className="text-sm leading-none">{m.flag}</span>
                        <span className="text-[13px] text-white/90 tracking-wide">
                            {m.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}