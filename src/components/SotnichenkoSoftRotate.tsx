import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SoftRotateCardItem {
  id: string;
  image: string;
  title: string;
  tag: string;
  badge?: string;
}

interface SotnichenkoSoftRotateProps {
  intensity?: number;
  opacity?: number;
  isPlaying?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: SoftRotateCardItem[] = [
  {
    id: 'card-1',
    image: 'src/assets/images/robot_turning_bulb_1789365471785.jpg',
    title: 'AGI Creative Intelligence',
    tag: 'Idea Synthesis',
    badge: 'Active Neural',
  },
  {
    id: 'card-2',
    image: 'src/assets/images/robot_ai_solutions_1789208998741.jpg',
    title: 'Autonomous AI Workflows',
    tag: 'Vibe Code & Systems',
    badge: 'Enterprise AGI',
  },
  {
    id: 'card-3',
    image: 'src/assets/images/robot_thinking_wide_1789365436523.jpg',
    title: 'Cognitive Architecture',
    tag: 'Deep Reasoning',
    badge: 'LLM Control',
  },
  {
    id: 'card-4',
    image: 'src/assets/images/robot_ai_hologram_1789209021516.jpg',
    title: 'Cinematic Storytelling',
    tag: 'Video & Visual Art',
    badge: 'Media Studio',
  },
  {
    id: 'card-5',
    image: 'src/assets/images/robot_idea_landscape_1789365418011.jpg',
    title: 'Generative Design Systems',
    tag: 'Brand & Motion',
    badge: 'Brand Engine',
  },
];

const MARQUEE_WORDS = [
  'AI VISION WORKS',
  'AGI ROBOT SYSTEMS',
  'CREATIVE CODE',
  'NEURAL ARCHITECTURE',
  'RAPID PROTOTYPING',
  'ENTERPRISE AI',
  'VIBE CODING',
  'AUTONOMOUS AGENTS',
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

// Exact seeded math from Framer reference
function seededUnit(seed: number, index: number, channel: number): number {
  let value = (seed | 0) ^ Math.imul(index + 1, 2654435761) ^ channel;
  value = Math.imul(value ^ (value >>> 16), 569420461);
  value = Math.imul(value ^ (value >>> 15), 1935289751);
  return ((value ^ (value >>> 15)) >>> 0) / 4294967295;
}

function seededRange(seed: number, index: number, channel: number, min: number, max: number): number {
  return lerp(min, max, seededUnit(seed, index, channel));
}

// Exact softRotateTransform algorithm from Framer reference
function softRotateTransform(
  progress: number,
  index: number,
  seed: number,
  intensity: number,
  depth: number
): string {
  const p = clamp(progress);
  const wave = Math.sin(p * Math.PI);
  const baseX = seededRange(seed, index, 11, 70, 120) * intensity;
  const baseY = seededRange(seed, index, 12, -20, 20) * intensity;
  const baseZ = seededRange(seed, index, 13, -20, 20) * intensity;
  const rx = lerp(baseX, -baseX, p);
  const ry = lerp(baseY, -baseY, p);
  const rz = lerp(baseZ, -baseZ, p);
  const z = -wave * depth * 0.18;
  return `translate3d(0, 0, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
}

export const SotnichenkoSoftRotate: React.FC<SotnichenkoSoftRotateProps> = ({
  intensity = 1.0,
  opacity = 1.0,
  isPlaying = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const seed = 17;
  const depth = 760;

  // Track cursor movement across container for smooth 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // RAF loop combining page scroll progress + soft ambient wave motion (exact Framer physics)
  useLayoutEffect(() => {
    let frame = 0;
    let destroyed = false;
    let startTime = performance.now();

    const update = () => {
      frame = 0;
      if (destroyed || !containerRef.current) return;

      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const waveOffset = isPlaying ? Math.sin(elapsed * 0.75) * 0.18 : 0;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const startTop = viewportHeight * 1.2;
      const endTop = -rect.height - viewportHeight * 0.2;
      const scrollProgress = clamp((startTop - rect.top) / Math.max(startTop - endTop, 1));

      // Effective progress combines scroll position with gentle breathing wave
      const effectiveProgress = clamp(scrollProgress + waveOffset, 0, 1);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const transform = softRotateTransform(
          effectiveProgress,
          index,
          seed,
          intensity,
          depth
        );

        // Add subtle mouse parallax tilt
        const tiltX = -mousePos.y * 10 * intensity;
        const tiltY = mousePos.x * 12 * intensity;

        card.style.transform = `${transform} rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });

      // Update marquee track translation based on scroll
      if (trackRef.current) {
        const rootProgress = clamp(
          (viewportHeight - rect.top) / Math.max(viewportHeight + rect.height, 1)
        );
        const rootWidth = containerRef.current.clientWidth;
        const from = rootWidth;
        const to = -trackRef.current.scrollWidth;
        trackRef.current.style.transform = `translate3d(${lerp(from, to, rootProgress)}px, 0, 0)`;
      }

      if (isPlaying) {
        frame = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    return () => {
      destroyed = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isPlaying, intensity, depth, mousePos]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`absolute inset-0 overflow-hidden pointer-events-none rounded-3xl select-none transition-opacity duration-500 ${className}`}
      style={{
        opacity,
        perspective: '900px',
        contain: 'layout paint',
      }}
      aria-hidden="true"
    >
      {/* ──────────────────────────────────────────────────────────
          1. BACKGROUND MARQUEE TRACK (Framer SoftRotate Signature)
      ─────────────────────────────────────────────────────────── */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <div
          ref={trackRef}
          className="flex whitespace-nowrap gap-8 text-[48px] sm:text-[72px] lg:text-[96px] font-black font-heading tracking-widest text-blue-900/60 uppercase select-none will-change-transform"
        >
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>{word}</span>
              <span className="text-blue-500/40">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. 3D SOFT ROTATING CARDS DECK
          Calculated using the exact softRotateTransform algorithm
      ─────────────────────────────────────────────────────────── */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {DEFAULT_ITEMS.map((item, index) => {
          // Staggered positioning biased towards center-right to leave text readable on the left
          const positions = [
            { top: '8%', right: '8%', width: '310px', height: '220px', zIndex: 14 },
            { top: '48%', right: '2%', width: '340px', height: '235px', zIndex: 18 },
            { top: '18%', right: '28%', width: '270px', height: '190px', zIndex: 12 },
            { top: '56%', right: '24%', width: '290px', height: '205px', zIndex: 16 },
            { top: '3%', right: '45%', width: '240px', height: '170px', zIndex: 10 },
          ];

          const pos = positions[index % positions.length];

          return (
            <div
              key={item.id}
              ref={el => (cardRefs.current[index] = el)}
              className="absolute hidden sm:block will-change-transform transition-all duration-150 pointer-events-auto"
              style={{
                top: pos.top,
                right: pos.right,
                width: pos.width,
                height: pos.height,
                zIndex: pos.zIndex,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card Surface with 3D Depth */}
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden border border-white/80 shadow-2xl bg-white/95 group transition-transform duration-500 hover:scale-105">
                {/* Visual Imagery */}
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-102 group-hover:scale-108 transition-transform duration-700"
                />

                {/* Shaded vignette gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white shadow-xs">
                    <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                    <span>{item.badge}</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/80" />
                </div>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-2.5 inset-x-2.5 text-white pointer-events-none">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold">
                    {item.tag}
                  </div>
                  <div className="text-xs sm:text-sm font-heading font-extrabold text-white truncate drop-shadow-sm">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ──────────────────────────────────────────────────────────
          3. DIRECTIONAL SCRIM GRADIENTS
          Preserves original theme: keeps headline & text on left 100% crisp
      ─────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-50 via-slate-50/85 sm:via-slate-50/65 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-0 bg-linear-to-t from-white/90 via-transparent to-white/40 pointer-events-none z-20" />
    </div>
  );
};
