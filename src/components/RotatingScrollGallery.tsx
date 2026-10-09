import React, { useEffect, useRef, useState, useLayoutEffect, useId } from 'react';

export interface GalleryItem {
  image: string;
  alt?: string;
  title?: string;
  tag?: string;
  link?: string;
}

interface RotatingScrollGalleryProps {
  items?: GalleryItem[];
  marquee?: string;
  separator?: string;
  marqueeColor?: string;
  marqueeSize?: number;
  blend?: 'difference' | 'normal' | 'lighter';
  background?: string;
  cardWidth?: number;
  gap?: number;
  radius?: number;
  intensity?: number;
  depth?: number;
  spread?: number;
  perspective?: number;
  className?: string;
}

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    image: '/assets/images/robot_ai_solutions_1789208998741.jpg',
    alt: 'AGI Robot Solutions & Workflows',
    title: 'Autonomous AGI Solutions',
    tag: 'Enterprise Workflow',
  },
  {
    image: '/assets/images/robot_turning_bulb_1789365471785.jpg',
    alt: 'Idea Synthesis & Lighting Bulb Robot',
    title: 'Idea Synthesis & Creative AI',
    tag: 'Innovation Engine',
  },
  {
    image: '/assets/images/robot_thinking_wide_1789365436523.jpg',
    alt: 'Cognitive Architecture Robot',
    title: 'Cognitive Architecture',
    tag: 'LLM Reasoning',
  },
  {
    image: '/assets/images/robot_ai_hologram_1789209021516.jpg',
    alt: 'Cinematic Storytelling & Hologram',
    title: 'Cinematic Storytelling',
    tag: 'Visual Media',
  },
  {
    image: '/assets/images/robot_idea_landscape_1789365418011.jpg',
    alt: 'Generative Brand Systems',
    title: 'Generative Brand Systems',
    tag: 'Design Engineering',
  },
  {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    alt: 'Neural State Graphs',
    title: 'Multi-Agent State Graphs',
    tag: 'LangGraph & Docker',
  },
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    alt: 'Distributed Cloud Systems',
    title: 'Scalable Microservices',
    tag: 'Backend Infrastructure',
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

// Seeded pseudorandom functions from Framer reference
function seededUnit(seed: number, index: number, channel: number): number {
  let value = (seed | 0) ^ Math.imul(index + 1, 2654435761) ^ channel;
  value = Math.imul(value ^ (value >>> 16), 569420461);
  value = Math.imul(value ^ (value >>> 15), 1935289751);
  return ((value ^ (value >>> 15)) >>> 0) / 4294967295;
}

function seededRange(seed: number, index: number, channel: number, min: number, max: number): number {
  return lerp(min, max, seededUnit(seed, index, channel));
}

// Exact Sotnichenko soft 3D rotation transform from Framer reference
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

function repeatedMarquee(text: string, separator: string): string[] {
  const clean = text.trim();
  if (!clean) return [];
  const parts = clean.split(/\r?\n|\s*\|\s*/).map(p => p.trim()).filter(Boolean);
  const source = parts.length ? parts : [clean];
  return Array.from({ length: Math.max(8, source.length * 4) }, (_, index) =>
    index % 2 === 0 ? source[Math.floor(index / 2) % source.length] : separator || '/'
  );
}

/**
 * RotatingScrollGallery
 * Direct implementation of Framer reference component:
 * https://framer.com/m/Sotnichenko-softrotate-back-new-Xsrecz.js@gkmNpoKcxwDUVe19frSY
 * 
 * Features:
 * - Authentic Sotnichenko soft 3D rotation driven by scroll
 * - Seeded mathematical rotation & depth translation
 * - Pinned sticky marquee window gliding behind cards
 * - Cascading overlapping cards with perspective projection
 * - Maintains brand styling with rich lighting and smooth 60fps RAF animations
 */
export const RotatingScrollGallery: React.FC<RotatingScrollGalleryProps> = ({
  items = DEFAULT_GALLERY_ITEMS,
  marquee = 'AI VISION WORKS | AGI ROBOT SOLUTIONS | CREATIVE CODE | AUTONOMOUS AGENTS | SCROLL GALLERY',
  separator = '/',
  marqueeColor = '#DFB6B2',
  marqueeSize = 104,
  blend = 'difference',
  background = 'transparent',
  cardWidth = 520,
  gap = -52,
  radius = 24,
  intensity = 1.0,
  depth = 760,
  spread = 20,
  perspective = 900,
  className = '',
}) => {
  const rawId = useId();
  const instanceId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const scopedClass = `rsg-${instanceId}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [containerWidth, setContainerWidth] = useState(1440);

  const marqueeParts = repeatedMarquee(marquee, separator);
  const seed = 17;

  // Measure container dimensions
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const width = root.getBoundingClientRect().width;
      if (width > 0) setContainerWidth(width);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Scroll-driven 3D animation loop matching Framer reference exactly
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    let destroyed = false;

    const update = () => {
      frame = 0;
      if (destroyed) return;

      const viewportHeight = Math.max(window.innerHeight, 1);
      const rootWidth = Math.max(root.clientWidth, 1);
      const compact = rootWidth <= 640;
      const responsiveEffect = compact ? 0.72 : 1;
      const appliedIntensity = intensity * responsiveEffect;
      const appliedDepth = depth * responsiveEffect;
      const appliedSpread = spread * (compact ? 0.55 : 1);

      // 1. Update 3D card rotation and horizontal sway
      items.forEach((_, index) => {
        const card = cardRefs.current[index];
        const wrap = wrapRefs.current[index];
        if (!card || !wrap) return;

        const rect = wrap.getBoundingClientRect();
        const startTop = viewportHeight * 1.2;
        const endTop = -rect.height - viewportHeight * 0.2;
        const progress = clamp((startTop - rect.top) / Math.max(startTop - endTop, 1));

        const transform = softRotateTransform(progress, index, seed, appliedIntensity, appliedDepth);
        const angle = index * 0.45;
        const amplitude = rootWidth * (appliedSpread / 100);

        wrap.style.transform = `translate3d(${Math.sin(angle) * amplitude}px, 0, 0)`;
        card.style.transform = transform;
      });

      // 2. Update sticky marquee scroll progress
      const rootRect = root.getBoundingClientRect();
      const track = trackRef.current;
      if (track) {
        const rootProgress = clamp(
          (viewportHeight - rootRect.top) / Math.max(viewportHeight + rootRect.height, 1)
        );
        const from = rootWidth;
        const to = -track.scrollWidth;
        track.style.transform = `translate3d(${lerp(from, to, rootProgress)}px, 0, 0)`;
      }
    };

    const schedule = () => {
      if (destroyed) return;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();

    return () => {
      destroyed = true;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [items, intensity, depth, spread]);

  const effectiveCardWidth = Math.min(cardWidth, containerWidth - 40);
  const mobileCardWidth = Math.min(360, containerWidth - 24);

  return (
    <div
      ref={rootRef}
      className={`${scopedClass} ${className}`}
      style={
        {
          '--rsg-card-width': `${effectiveCardWidth}px`,
          '--rsg-mobile-card-width': `${mobileCardWidth}px`,
          '--rsg-gap': `${gap}px`,
          '--rsg-radius': `${radius}px`,
          '--rsg-perspective': `${perspective}px`,
          '--rsg-marquee-size': `${marqueeSize}px`,
          position: 'relative',
          width: '100%',
          background,
          isolation: 'isolate',
        } as React.CSSProperties
      }
    >
      {/* Scoped CSS from Framer Component */}
      <style>{`
        .${scopedClass} {
          box-sizing: border-box;
          color: white;
          width: 100%;
        }
        .${scopedClass} .rsg-marquee-pin {
          position: sticky;
          top: 50vh;
          z-index: 1;
          height: 0;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .${scopedClass} .rsg-marquee-window {
          width: 100%;
          overflow: hidden;
        }
        .${scopedClass} .rsg-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: clamp(20px, 3vw, 48px);
          will-change: transform;
        }
        .${scopedClass} .rsg-marquee-track span {
          flex: none;
          color: ${marqueeColor};
          font: 900 clamp(32px, 8vw, var(--rsg-marquee-size)) / 0.86 var(--font-heading, Arial, sans-serif);
          letter-spacing: -0.055em;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0.85;
        }
        .${scopedClass} .rsg-gallery {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding-top: 60px;
          padding-bottom: 80px;
          overflow: clip;
        }
        .${scopedClass} .rsg-wrap {
          width: min(var(--rsg-card-width), calc(100% - 40px));
          margin-bottom: var(--rsg-gap);
          perspective: var(--rsg-perspective);
          transform-style: preserve-3d;
          will-change: transform;
        }
        .${scopedClass} .rsg-wrap:last-child {
          margin-bottom: 0;
        }
        .${scopedClass} .rsg-card {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 14 / 9;
          border-radius: var(--rsg-radius);
          overflow: hidden;
          transform-style: preserve-3d;
          backface-visibility: visible;
          will-change: transform;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: #0A0B0D;
        }
        .${scopedClass} .rsg-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
          user-select: none;
        }
        .${scopedClass} .rsg-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 -40px 80px rgba(0, 0, 0, 0.35);
          pointer-events: none;
        }
        @container (max-width: 640px) {
          .${scopedClass} .rsg-wrap {
            width: min(var(--rsg-mobile-card-width), calc(100% - 24px));
            margin-bottom: calc(var(--rsg-gap) * 0.7);
            perspective: calc(var(--rsg-perspective) * 0.82);
          }
          .${scopedClass} .rsg-marquee-track span {
            font-size: clamp(28px, 12vw, calc(var(--rsg-marquee-size) * 0.7));
          }
        }
      `}</style>

      {/* Pinned Sticky Marquee Track (Signature Sotnichenko SoftRotate feature) */}
      <div className="rsg-marquee-pin" aria-hidden="true">
        <div className="rsg-marquee-window" style={{ mixBlendMode: blend }}>
          <div ref={trackRef} className="rsg-marquee-track">
            {marqueeParts.map((part, index) => (
              <span key={`${part}-${index}`}>{part}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Rotating Cards Gallery Stack */}
      <div className="rsg-gallery">
        {items.map((item, index) => (
          <div
            key={index}
            ref={el => (wrapRefs.current[index] = el)}
            className="rsg-wrap"
          >
            <div
              ref={el => (cardRefs.current[index] = el)}
              className="rsg-card group transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Media Image */}
              <img
                src={item.image}
                alt={item.alt || item.title || `Gallery image ${index + 1}`}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="rsg-media filter brightness-95 contrast-105"
              />

              {/* Shaded Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Card Label and Title */}
              {(item.title || item.tag) && (
                <div className="absolute bottom-4 left-5 right-5 z-10 text-white pointer-events-none">
                  {item.tag && (
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-300 block mb-1">
                      {item.tag}
                    </span>
                  )}
                  {item.title && (
                    <h4 className="text-lg sm:text-xl font-bold font-heading text-white truncate drop-shadow-sm">
                      {item.title}
                    </h4>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
