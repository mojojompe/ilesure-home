import { useRef, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
    dots?: Array<{
        start: { lat: number; lng: number; label?: string };
        end: { lat: number; lng: number; label?: string };
    }>;
    lineColor?: string;
}

export default function NigerianMap({
    dots = [
        { start: { lat: 7.3775, lng: 3.9470 }, end: { lat: 6.5244, lng: 3.3792 } }, // Nigeria to Lagos
        { start: { lat: 7.3775, lng: 3.9470 }, end: { lat: 9.0579, lng: 7.4951 } }, // Nigeria to Abuja
        { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: 4.8156, lng: 7.0498 } }, // Lagos to Port Harcourt
        { start: { lat: 9.0579, lng: 7.4951 }, end: { lat: 12.0022, lng: 8.5920 } }, // Abuja to Kano
        { start: { lat: 7.3775, lng: 3.9470 }, end: { lat: 6.3350, lng: 5.6275 } }, // Nigeria to Benin
    ],
    lineColor = "#9ca3af", // Neutral gray default instead of green
}: MapProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Only render SVG content once it's in the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { 
                if (entry.isIntersecting) { 
                    setIsVisible(true); 
                    observer.disconnect(); 
                } 
            },
            { rootMargin: '200px' }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Memoize DottedMap generation — this is expensive CPU work
    const svgMap = useMemo(() => {
        if (!isVisible) return '';
        const map = new DottedMap({ height: 100, grid: "diagonal" });
        return map.getSVG({
            radius: 0.15,
            color: "#e5e7eb", // Neutral dot color
            shape: "circle",
            backgroundColor: "transparent",
        });
    }, [isVisible]);

    const projectPoint = (lat: number, lng: number) => {
        const x = (lng + 180) * (800 / 360);
        const y = ((-1 * lat + 90) * (400 / 180));
        return { x, y };
    };

    const createCurvedPath = (
        start: { x: number; y: number },
        end: { x: number; y: number }
    ) => {
        const midX = (start.x + end.x) / 2;
        // Adjust curve height dynamically based on distance, but since we are zoomed in, make it subtle
        const midY = Math.min(start.y, end.y) - 5; 
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };

    return (
        <div ref={containerRef} className="w-full aspect-[2/1] bg-transparent relative font-sans overflow-hidden rounded-clay">
            {/* The scaled container that focuses on Nigeria */}
            <div 
                className="absolute w-[800px] h-[400px] left-1/2 top-1/2" 
                style={{
                    transform: "translate(-50%, -50%) scale(10)",
                    transformOrigin: "418px 180px", // Roughly the center of Nigeria
                }}
            >
                {isVisible && (
                    <>
                        <img
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                            className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none opacity-80"
                            alt="world map"
                        />
                        <svg
                            ref={svgRef}
                            viewBox="0 0 800 400"
                            className="w-full h-full absolute top-0 left-0 pointer-events-none select-none"
                        >
                            {dots.map((dot, i) => {
                                const startPoint = projectPoint(dot.start.lat, dot.start.lng);
                                const endPoint = projectPoint(dot.end.lat, dot.end.lng);
                                return (
                                    <g key={`path-group-${i}`}>
                                        <motion.path
                                            d={createCurvedPath(startPoint, endPoint)}
                                            fill="none"
                                            stroke="url(#path-gradient)"
                                            strokeWidth="0.2" // very thin because we scale x10
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{
                                                duration: 2.5, // Slower for premium feel
                                                delay: 0.5 * i,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                repeatDelay: 1,
                                                ease: "linear",
                                            }}
                                        />
                                        <defs>
                                            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="white" stopOpacity="0" />
                                                <stop offset="5%" stopColor={lineColor} stopOpacity="0.8" />
                                                <stop offset="95%" stopColor={lineColor} stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </g>
                                );
                            })}
                        </svg>
                    </>
                )}
            </div>
            {/* Fade overlays to blend edges */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_20px_#fff]" />
        </div>
    );
}
