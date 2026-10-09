import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Project, PageRoute } from '../types';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Sparkles,
  Repeat
} from 'lucide-react';

interface Draggable3DCarouselProps {
  projects: Project[];
  onNavigate: (page: PageRoute, slug?: string) => void;
}

/**
 * Draggable3DCarousel
 * 3D Coverflow carousel with infinite continuous circular looping,
 * smooth momentum dragging, quintic deceleration easing, and auto-looping.
 */
export const Draggable3DCarousel: React.FC<Draggable3DCarouselProps> = ({ projects, onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRafRef = useRef<number | null>(null);

  const baseCount = projects.length;
  // Default to 3rd project (index 2: 0-indexed)
  const INITIAL_PROJECT_INDEX = Math.min(2, Math.max(0, baseCount - 1));

  // Triple set (prefix clones, active set, suffix clones) for seamless infinite looping
  const REPEAT_SETS = 3;
  const totalSlides = baseCount * REPEAT_SETS;
  const loopProjects = useMemo(() => {
    return Array.from({ length: REPEAT_SETS }, (_, setIdx) => 
      projects.map(p => ({
        ...p,
        loopKey: `${p.id}-loop-${setIdx}`,
        originalIndex: projects.indexOf(p)
      }))
    ).flat();
  }, [projects]);

  // Initial index sits in the middle set
  const INITIAL_INDEX = baseCount + INITIAL_PROJECT_INDEX;
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const indexRef = useRef(INITIAL_INDEX);
  const trackX = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const pointerDownPos = useRef<{ x: number; y: number; time: number } | null>(null);

  // Responsive slide layout
  const [layout, setLayout] = useState({
    slideWidth: 340,
    slideHeight: 455,
    gap: 24,
    perspective: 1000,
    rotateY: 42,
    depth: 140,
    activeScale: 1.0,
    inactiveScale: 0.84,
    inactiveOpacity: 0.48,
  });

  const drag = useRef({
    active: false,
    captured: false,
    startX: 0,
    startTrackX: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const step = layout.slideWidth + layout.gap;

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setLayout({
          slideWidth: 270,
          slideHeight: 410,
          gap: 16,
          perspective: 850,
          rotateY: 34,
          depth: 95,
          activeScale: 1.0,
          inactiveScale: 0.86,
          inactiveOpacity: 0.5,
        });
      } else if (w < 1024) {
        setLayout({
          slideWidth: 305,
          slideHeight: 435,
          gap: 20,
          perspective: 950,
          rotateY: 38,
          depth: 120,
          activeScale: 1.0,
          inactiveScale: 0.85,
          inactiveOpacity: 0.5,
        });
      } else {
        setLayout({
          slideWidth: 340,
          slideHeight: 455,
          gap: 24,
          perspective: 1000,
          rotateY: 42,
          depth: 140,
          activeScale: 1.0,
          inactiveScale: 0.84,
          inactiveOpacity: 0.48,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const centerXFor = useCallback((i: number) => {
    const el = containerRef.current;
    if (!el) return -i * step;
    return el.offsetWidth / 2 - i * step - layout.slideWidth / 2;
  }, [step, layout.slideWidth]);

  // Core 3D Coverflow rendering: rotateY, translateZ, scale, opacity based on distance from center
  const render = useCallback(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    track.style.transform = `translateX(${trackX.current}px)`;
    const center = el.offsetWidth / 2;

    slidesRef.current.forEach((slide, i) => {
      if (!slide) return;
      const slideCenter = i * step + layout.slideWidth / 2 + trackX.current;
      const norm = (slideCenter - center) / step;
      const abs = Math.abs(norm);

      // Cull slides that are far outside the viewport to maximize rendering performance
      if (abs > 4.5) {
        slide.style.visibility = 'hidden';
        return;
      }
      slide.style.visibility = 'visible';

      // Clamp rotation for extreme edges to preserve aesthetic integrity
      const ry = Math.max(-layout.rotateY * 1.25, Math.min(layout.rotateY * 1.25, norm * layout.rotateY));
      const tz = -Math.min(layout.depth * 2, abs * layout.depth);
      const sc = Math.max(layout.inactiveScale, layout.activeScale - abs * (layout.activeScale - layout.inactiveScale));
      const op = Math.max(layout.inactiveOpacity, 1 - abs * (1 - layout.inactiveOpacity));

      slide.style.transform = `perspective(${layout.perspective}px) rotateY(${ry}deg) translateZ(${tz}px) scale(${sc})`;
      slide.style.opacity = `${op}`;
      slide.style.zIndex = `${100 - Math.round(abs * 10)}`;

      // Dynamic depth shadow based on center proximity
      const shadowBlur = Math.max(10, 24 - abs * 8);
      const shadowAlpha = Math.max(0.06, 0.16 - abs * 0.05);
      slide.style.boxShadow = `0 12px ${shadowBlur}px rgba(15, 23, 42, ${shadowAlpha})`;
    });
  }, [step, layout]);

  // Re-center seamless wrap helper to ensure index stays within middle set
  const normalizeLoopIndex = useCallback((idx: number) => {
    let newIdx = idx;
    let shiftCount = 0;

    while (newIdx < baseCount) {
      newIdx += baseCount;
      shiftCount += 1;
    }
    while (newIdx >= 2 * baseCount) {
      newIdx -= baseCount;
      shiftCount -= 1;
    }

    if (shiftCount !== 0) {
      indexRef.current = newIdx;
      trackX.current -= shiftCount * baseCount * step;
      setActiveIndex(newIdx);
      render();
    }
    return newIdx;
  }, [baseCount, step, render]);

  // Custom smooth tween for snapping with infinite loop wrap-around
  const snapTo = useCallback((i: number, instant = false) => {
    let target = i;
    const targetX = centerXFor(target);

    if (tweenRafRef.current) {
      cancelAnimationFrame(tweenRafRef.current);
      tweenRafRef.current = null;
    }

    indexRef.current = target;
    setActiveIndex(target);

    if (instant) {
      trackX.current = targetX;
      normalizeLoopIndex(target);
      render();
      return;
    }

    const startX = trackX.current;
    const distance = targetX - startX;
    const duration = 640; // ms smooth cinematic duration
    const startTime = performance.now();

    const animateTween = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smoother Quintic Out ease curve: liquid smooth deceleration
      const ease = 1 - Math.pow(1 - progress, 4.5);
      trackX.current = startX + distance * ease;
      render();

      if (progress < 1) {
        tweenRafRef.current = requestAnimationFrame(animateTween);
      } else {
        trackX.current = targetX;
        normalizeLoopIndex(target);
        render();
        tweenRafRef.current = null;
      }
    };

    tweenRafRef.current = requestAnimationFrame(animateTween);
  }, [centerXFor, normalizeLoopIndex, render]);

  // Initial centering on the Third Card in the middle set
  useEffect(() => {
    slidesRef.current = (slidesRef.current || []).slice(0, totalSlides);

    // Initial snap to the Third Card in middle set
    snapTo(INITIAL_INDEX, true);

    const timer = setTimeout(() => {
      snapTo(INITIAL_INDEX, true);
    }, 40);

    const raf = requestAnimationFrame(() => {
      snapTo(INITIAL_INDEX, true);
    });

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [totalSlides, layout.slideWidth, layout.gap, snapTo, INITIAL_INDEX]);

  // Continuous auto-loop timer: seamlessly cycles to next slide every 4.2 seconds
  useEffect(() => {
    if (isHovered || drag.current.active) return;

    const interval = window.setInterval(() => {
      snapTo(indexRef.current + 1);
    }, 4200);

    return () => {
      clearInterval(interval);
    };
  }, [isHovered, snapTo]);

  // Pointer drag interaction with seamless infinite wrapping
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (tweenRafRef.current) {
      cancelAnimationFrame(tweenRafRef.current);
      tweenRafRef.current = null;
    }

    drag.current.active = true;
    drag.current.captured = false;
    isDraggingRef.current = false;
    pointerDownPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };

    const x = e.clientX;
    drag.current.startX = x;
    drag.current.startTrackX = trackX.current;
    drag.current.lastX = x;
    drag.current.lastTime = performance.now();
    drag.current.velocity = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const x = e.clientX;
    const dx = x - drag.current.startX;

    // Only initiate actual drag if movement exceeds 8px threshold
    if (!isDraggingRef.current && Math.abs(dx) > 8) {
      isDraggingRef.current = true;
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
        try {
          containerRef.current.setPointerCapture(e.pointerId);
          drag.current.captured = true;
        } catch {}
      }
    }

    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dt = now - drag.current.lastTime;
    if (dt > 0 && dt < 120) {
      const instantV = ((x - drag.current.lastX) / dt) * 1000;
      // Exponential moving average for liquid-smooth momentum without spikes
      drag.current.velocity = drag.current.velocity * 0.55 + instantV * 0.45;
    }
    drag.current.lastX = x;
    drag.current.lastTime = now;

    trackX.current = drag.current.startTrackX + dx;

    // Infinite loop drag wrap check during dragging
    const loopSpan = baseCount * step;
    const midMinX = centerXFor(2 * baseCount);
    const midMaxX = centerXFor(baseCount - 1);

    if (trackX.current < midMinX) {
      trackX.current += loopSpan;
      drag.current.startTrackX += loopSpan;
    } else if (trackX.current > midMaxX) {
      trackX.current -= loopSpan;
      drag.current.startTrackX -= loopSpan;
    }

    render();
  };

  const handlePointerUp = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      if (drag.current.captured && e) {
        try {
          containerRef.current.releasePointerCapture(e.pointerId);
        } catch {}
      }
    }

    // If it was a real drag, project velocity with natural momentum and snap
    if (isDraggingRef.current) {
      const projected = trackX.current + drag.current.velocity * 0.16;
      const center = (containerRef.current?.offsetWidth || window.innerWidth) / 2;
      let best = 0;
      let bestDist = Infinity;

      for (let i = 0; i < totalSlides; i++) {
        const sc = i * step + layout.slideWidth / 2 + projected;
        const d = Math.abs(sc - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }

      snapTo(best);

      // Reset drag flag after small delay to avoid misfiring click handlers
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 50);
    } else {
      isDraggingRef.current = false;
    }
  };

  // Infinite Prev & Next loop navigation (never disabled!)
  const goPrev = () => snapTo(indexRef.current - 1);
  const goNext = () => snapTo(indexRef.current + 1);

  // Directly open project slug page when user clicks ANY card
  const handleCardClick = (slug: string) => {
    // If user was actively dragging, do not navigate
    if (isDraggingRef.current) return;

    // Check pointer movement distance
    if (pointerDownPos.current) {
      const elapsed = Date.now() - pointerDownPos.current.time;
      if (elapsed > 600) return; // long press, not a click
    }

    // Open project slug page
    onNavigate('project-slug', slug);
  };

  // Normalized 0-based active project index for dots & pill
  const normalizedActiveIndex = ((activeIndex % baseCount) + baseCount) % baseCount;
  const activeProject = projects[normalizedActiveIndex] || projects[0];

  return (
    <div 
      className="relative w-full select-none" 
      id="draggable-3d-carousel-wrapper"
      onMouseEnter={() => {
        isHoveredRef.current = true;
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        setIsHovered(false);
      }}
    >
      {/* 3D Coverflow Container with Infinite Circular Looping */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => handlePointerUp()}
        className="relative w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-linear-to-b from-white via-slate-50/80 to-slate-100/90 py-10 outline-none cursor-grab flex items-center justify-start select-none"
        style={{
          height: layout.slideHeight + 90,
          perspective: `${layout.perspective}px`,
          touchAction: 'pan-y',
          transformStyle: 'preserve-3d',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {/* Subtle Ambient Background Accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />
        </div>

        {/* Sliding Track */}
        <div
          ref={trackRef}
          className="flex items-center"
          style={{
            gap: `${layout.gap}px`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {loopProjects.map((project, i) => {
            const isCurrentActive = ((i % baseCount) === normalizedActiveIndex);

            return (
              <div
                key={project.loopKey}
                ref={(el) => {
                  slidesRef.current[i] = el;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(project.slug);
                }}
                className={`group relative rounded-2xl bg-white border shrink-0 overflow-hidden cursor-pointer transition-colors duration-200 hover:shadow-xl ${
                  isCurrentActive 
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' 
                    : 'border-slate-200 hover:border-blue-400'
                }`}
                style={{
                  width: `${layout.slideWidth}px`,
                  height: `${layout.slideHeight}px`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'transform, opacity, box-shadow',
                }}
              >
                {/* Project Image Showcase */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-500 select-none group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Category Pill Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-900 border border-slate-200/90 shadow-2xs">
                    {project.category}
                  </div>

                  {/* Corner Arrow Indicator */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 text-slate-800 flex items-center justify-center shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Body with Portfolio Details */}
                <div 
                  className="p-5 flex flex-col justify-between" 
                  style={{ height: `calc(${layout.slideHeight}px - ${layout.slideHeight > 430 ? 192 : 176}px)` }}
                >
                  <div>
                    {/* Client & Year */}
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-950 font-heading leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Tags & Case Study CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {(project.techStack || []).slice(0, 2).map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
                      <span>Case Study</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Infinite Navigation Prev Button (Never disabled) */}
        {baseCount > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide in loop"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-800 hover:text-blue-600 shadow-md backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Infinite Navigation Next Button (Never disabled) */}
        {baseCount > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide in loop"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-800 hover:text-blue-600 shadow-md backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Center Bottom Active Project Glance Pill with Loop Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 shadow-sm flex items-center gap-3 max-w-[90%]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 font-mono">
            <Repeat className="w-3 h-3 text-blue-500 animate-spin" style={{ animationDuration: '10s' }} />
            <span>{String(normalizedActiveIndex + 1).padStart(2, '0')} / {String(baseCount).padStart(2, '0')}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-xs font-semibold text-slate-800 truncate max-w-[180px] sm:max-w-xs">
            {activeProject?.title}
          </span>
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate('project-slug', activeProject.slug);
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
          >
            <span>Open Case Study</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Pagination Dots Row with Shortest Loop Routing */}
      {baseCount > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              onClick={() => {
                const currentNorm = ((indexRef.current % baseCount) + baseCount) % baseCount;
                let diff = idx - currentNorm;
                if (diff > baseCount / 2) diff -= baseCount;
                if (diff < -baseCount / 2) diff += baseCount;
                snapTo(indexRef.current + diff);
              }}
              aria-label={`Go to slide ${idx + 1}: ${proj.title}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                normalizedActiveIndex === idx 
                  ? 'w-7 h-2 bg-blue-600' 
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
