import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Project, PageRoute } from '../types';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Dna,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface DNACarouselProps {
  projects: Project[];
  onNavigate: (page: PageRoute, slug?: string) => void;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function wrap(value: number, length: number): number {
  if (length <= 0) return 0;
  const result = value % length;
  return result < 0 ? result + length : result;
}

function shortestDistance(index: number, position: number, count: number): number {
  let distance = index - position;
  if (distance > count / 2) {
    distance -= count;
  }
  if (distance < -count / 2) {
    distance += count;
  }
  return distance;
}

function easeOutCubic(value: number): number {
  const t = clamp(value, 0, 1);
  return 1 - Math.pow(1 - t, 3);
}

export const DNACarousel: React.FC<DNACarouselProps> = ({ projects, onNavigate }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Animation state refs for 60/120fps direct DOM manipulation
  const positionRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const draggingRef = useRef<boolean>(false);
  const pointerIdRef = useRef<number | null>(null);
  const startPointerXRef = useRef<number>(0);
  const startPointerYRef = useRef<number>(0);
  const startPositionRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const lastPointerTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const movedRef = useRef<boolean>(false);

  // Responsive carousel dimensions
  const [dimensions, setDimensions] = useState({
    cardWidth: 340,
    cardHeight: 460,
    curveDepth: 180,
    curveHeight: 52,
    helixSpread: 75,
    perspective: 1200,
    gap: 30,
  });

  // State for UI controls
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

  const count = projects.length;

  // Sync settings ref for requestAnimationFrame
  const settingsRef = useRef({
    cardWidth: dimensions.cardWidth,
    cardHeight: dimensions.cardHeight,
    gap: dimensions.gap,
    curveDepth: dimensions.curveDepth,
    curveHeight: dimensions.curveHeight,
    helixSpread: dimensions.helixSpread,
    perspective: dimensions.perspective,
    activeScale: 1.0,
    inactiveScale: 0.82,
    rotation: 28,
    tilt: 9,
    inactiveOpacity: 0.45,
    dragSensitivity: 1.25,
    inertia: 0.92,
    snapStrength: 0.16,
    autoPlay: true,
    autoSpeed: 0.2,
    shadowStrength: 0.22,
  });

  useEffect(() => {
    settingsRef.current = {
      ...settingsRef.current,
      cardWidth: dimensions.cardWidth,
      cardHeight: dimensions.cardHeight,
      gap: dimensions.gap,
      curveDepth: dimensions.curveDepth,
      curveHeight: dimensions.curveHeight,
      helixSpread: dimensions.helixSpread,
      perspective: dimensions.perspective,
      autoPlay: isAutoPlaying,
    };
  }, [dimensions, isAutoPlaying]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({
          cardWidth: 270,
          cardHeight: 410,
          curveDepth: 110,
          curveHeight: 32,
          helixSpread: 45,
          perspective: 850,
          gap: 20,
        });
      } else if (w < 1024) {
        setDimensions({
          cardWidth: 300,
          cardHeight: 440,
          curveDepth: 150,
          curveHeight: 42,
          helixSpread: 60,
          perspective: 1000,
          gap: 24,
        });
      } else {
        setDimensions({
          cardWidth: 340,
          cardHeight: 460,
          curveDepth: 190,
          curveHeight: 52,
          helixSpread: 75,
          perspective: 1100,
          gap: 30,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update DOM card transforms according to DNA double-helix geometry
  const renderCards = useCallback(() => {
    if (!rootRef.current || !count) return;
    const settings = settingsRef.current;
    const position = wrap(positionRef.current, count);
    const centerWidth = settings.cardWidth + settings.gap;
    const maxVisibleDistance = Math.max(3, Math.ceil(count / 2));

    // Update active project index for UI controls
    const roundedPos = wrap(Math.round(positionRef.current), count);
    setActiveIdx(roundedPos);

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const distance = shortestDistance(index, position, count);
      const absoluteDistance = Math.abs(distance);
      const normalizedDistance = clamp(absoluteDistance / maxVisibleDistance, 0, 1);

      // DNA Helix Phase and sinusoidal parameters
      const phase = distance * Math.PI * 0.48;
      const wave = Math.sin(phase);
      const depthWave = Math.cos(phase);
      
      // Dual interlocking strands (even index = strand 1, odd index = strand 2)
      const strand = index % 2 === 0 ? 1 : -1;
      const x = distance * centerWidth * 0.72;
      const y = wave * settings.curveHeight * strand;
      const z = depthWave * settings.curveDepth;
      const strandY = strand * settings.helixSpread * Math.cos(phase * 0.5) * 0.5;

      // 3D rotations based on DNA depth curve
      const rotateY = depthWave * settings.rotation * strand;
      const rotateZ = wave * settings.tilt * strand;
      const rotateX = wave * settings.tilt * 0.35;

      const activeAmount = clamp(1 - absoluteDistance, 0, 1);
      const smoothActive = easeOutCubic(activeAmount);
      const scale = settings.inactiveScale + (settings.activeScale - settings.inactiveScale) * smoothActive;
      const opacity = settings.inactiveOpacity + (1 - settings.inactiveOpacity) * smoothActive;
      
      const depthNormalized = clamp((z + settings.curveDepth) / (settings.curveDepth * 2), 0, 1);
      const zScale = 0.88 + depthNormalized * 0.12;
      const finalScale = scale * zScale;

      const zIndex = Math.round(100 - absoluteDistance * 10 + depthWave * 4);

      card.style.transform = `translate3d(${x}px, ${y + strandY}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${finalScale})`;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(zIndex);
      
      // Dynamic depth shadow & elevation
      const shadowY = 8 + smoothActive * 14;
      const shadowBlur = 20 + smoothActive * 18;
      const shadowAlpha = 0.08 + smoothActive * 0.14;
      card.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(15, 23, 42, ${shadowAlpha})`;
    });
  }, [count]);

  // Animation frame loop with momentum and automatic snapping
  useEffect(() => {
    let mounted = true;

    const animate = (time: number) => {
      if (!mounted) return;
      const previous = lastFrameTimeRef.current ?? time;
      let delta = (time - previous) / 1000;
      lastFrameTimeRef.current = time;
      delta = clamp(delta, 0, 0.05);

      const settings = settingsRef.current;

      if (!draggingRef.current) {
        // Continuous auto-glide
        if (settings.autoPlay) {
          positionRef.current += settings.autoSpeed * delta;
        }

        // Inertia decay
        if (Math.abs(velocityRef.current) > 1e-4) {
          positionRef.current += velocityRef.current * delta;
          velocityRef.current *= Math.pow(settings.inertia, delta * 60);
        }

        // Snap to nearest integer slot when auto-play is paused and velocity is low
        if (!settings.autoPlay && Math.abs(velocityRef.current) < 0.025) {
          const target = Math.round(positionRef.current);
          const difference = target - positionRef.current;
          const snapAmount = 1 - Math.exp(-settings.snapStrength * 60 * delta);
          positionRef.current += difference * snapAmount;
          if (Math.abs(difference) < 5e-4) {
            positionRef.current = target;
            velocityRef.current = 0;
          }
        }
      }

      renderCards();
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mounted = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [renderCards]);

  // Pointer Drag handlers
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }

    const root = rootRef.current;
    if (!root) return;
    draggingRef.current = true;
    movedRef.current = false;
    pointerIdRef.current = event.pointerId;
    startPointerXRef.current = event.clientX;
    startPointerYRef.current = event.clientY;
    startPositionRef.current = positionRef.current;
    lastPointerXRef.current = event.clientX;
    lastPointerTimeRef.current = performance.now();
    velocityRef.current = 0;
    setIsGrabbing(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    if (pointerIdRef.current !== null && event.pointerId !== pointerIdRef.current) return;

    const dx = event.clientX - startPointerXRef.current;
    const dy = event.clientY - startPointerYRef.current;
    if (Math.sqrt(dx * dx + dy * dy) > 5) {
      if (!movedRef.current && pointerIdRef.current !== null && rootRef.current) {
        try {
          rootRef.current.setPointerCapture(pointerIdRef.current);
        } catch {}
      }
      movedRef.current = true;
    }

    const settings = settingsRef.current;
    const now = performance.now();
    const travel = Math.max(1, settings.cardWidth + settings.gap);
    positionRef.current = startPositionRef.current - (dx / travel) * settings.dragSensitivity;

    const lastX = lastPointerXRef.current;
    const lastTime = lastPointerTimeRef.current;
    const deltaX = event.clientX - lastX;
    const deltaTime = Math.max(1, now - lastTime);
    const deltaSeconds = deltaTime / 1000;
    const instantVelocity = -(deltaX / travel) / deltaSeconds * settings.dragSensitivity;

    velocityRef.current = velocityRef.current * 0.72 + instantVelocity * 0.28;
    lastPointerXRef.current = event.clientX;
    lastPointerTimeRef.current = now;

    renderCards();
  };

  const handlePointerUp = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsGrabbing(false);

    const root = rootRef.current;
    if (pointerIdRef.current !== null) {
      try {
        root?.releasePointerCapture(pointerIdRef.current);
      } catch {}
    }
    pointerIdRef.current = null;
    velocityRef.current = clamp(velocityRef.current, -2.5, 2.5);
  };

  // Wheel horizontal swipe support without blocking vertical page scroll
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    // Only capture horizontal gestures; allow vertical scroll to pass through smoothly
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > 4) {
      const settings = settingsRef.current;
      positionRef.current += event.deltaX * 0.002 * settings.dragSensitivity;
      velocityRef.current += event.deltaX * 0.0004 * settings.dragSensitivity;
      velocityRef.current = clamp(velocityRef.current, -1.8, 1.8);
      renderCards();
      event.preventDefault();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      positionRef.current += 1;
      velocityRef.current = 0;
      renderCards();
      event.preventDefault();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      positionRef.current -= 1;
      velocityRef.current = 0;
      renderCards();
      event.preventDefault();
    }
  };

  // Navigation button controls
  const handlePrev = () => {
    positionRef.current = Math.round(positionRef.current) - 1;
    velocityRef.current = 0;
    renderCards();
  };

  const handleNext = () => {
    positionRef.current = Math.round(positionRef.current) + 1;
    velocityRef.current = 0;
    renderCards();
  };

  const handleCardClick = (projectSlug: string) => {
    // If the user was dragging/swiping, do not trigger navigation
    if (movedRef.current) return;
    onNavigate('project-slug', projectSlug);
  };

  const activeProject = projects[activeIdx] || projects[0];

  return (
    <div className="relative w-full select-none" id="dna-carousel-wrapper">
      {/* Top DNA Controls & Interactive Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-1">
        
        {/* Carousel Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Autoplay Toggle */}
          <button
            type="button"
            onClick={() => setIsAutoPlaying(prev => !prev)}
            aria-label={isAutoPlaying ? "Pause carousel movement" : "Play carousel movement"}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-slate-600" />
                <span>Pause Auto-Helix</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-blue-600 fill-blue-600" />
                <span>Resume Auto-Helix</span>
              </>
            )}
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3D DNA Carousel Stage */}
      <div
        ref={rootRef}
        tabIndex={0}
        role="region"
        aria-label="DNA 3D project carousel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => handlePointerUp()}
        onPointerLeave={(e) => {
          if (draggingRef.current) handlePointerMove(e);
        }}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        className={`relative w-full rounded-3xl border border-slate-200/90 bg-linear-to-b from-white via-slate-50/70 to-slate-100/90 overflow-hidden outline-none ${
          isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          height: dimensions.cardHeight + 110,
          perspective: `${dimensions.perspective}px`,
          perspectiveOrigin: '50% 50%',
          touchAction: 'pan-y',
          contain: 'layout paint'
        }}
      >
        {/* Subtle DNA background depth glow & decorative double-helix track guides */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Dual subtle radial light pulses */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-400/5 blur-3xl" />
          
          {/* Subtle center helix strand line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-200/40 to-transparent -translate-y-1/2" />
        </div>

        {/* 3D Preserved Space */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((project, index) => {
            const isStrandA = index % 2 === 0;
            const isCurrentActive = activeIdx === index;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => handleCardClick(project.slug)}
                className={`absolute left-1/2 top-1/2 rounded-2xl bg-white border overflow-hidden pointer-events-auto cursor-pointer transition-colors duration-200 ${
                  isCurrentActive 
                    ? 'border-blue-400 ring-2 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  marginLeft: `-${dimensions.cardWidth / 2}px`,
                  marginTop: `-${dimensions.cardHeight / 2}px`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'transform, opacity, filter, box-shadow',
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 0,
                }}
              >
                {/* Strand Origin Node Tag (Top Right Strand Marker) */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-full shadow-2xs">
                  <span className={`w-1.5 h-1.5 rounded-full ${isStrandA ? 'bg-blue-400' : 'bg-cyan-400'}`} />
                  <span>Strand {isStrandA ? 'α' : 'β'}</span>
                </div>

                {/* Project Image Showcase */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-500 select-none"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-900 border border-slate-200/90 shadow-2xs">
                    {project.category}
                  </div>

                  {/* Corner Expand Indicator */}
                  <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/95 text-slate-800 flex items-center justify-center shadow-xs">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Body - Retaining Original Portfolio Theme */}
                <div className="p-5 flex flex-col justify-between" style={{ height: `calc(${dimensions.cardHeight}px - ${dimensions.cardHeight > 430 ? 192 : 176}px)` }}>
                  <div>
                    {/* Metadata Header */}
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-950 font-heading leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-slate-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Card Footer with Impact Metric and Action Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 font-medium block">Key Impact</span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/60 truncate inline-block max-w-[170px]">
                        {project.metrics[0].value} {project.metrics[0].label}
                      </span>
                    </div>

                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavigate('project-slug', project.slug);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 transition-colors flex items-center gap-1 shadow-2xs shrink-0 cursor-pointer pointer-events-auto"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Bottom Active Project Glance Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 shadow-sm flex items-center gap-3 max-w-[90%]">
          <span className="text-xs font-bold text-blue-600 font-mono">
            {String(activeIdx + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-xs font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-xs">
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

      {/* Pagination Dot Strand Map */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => {
              const diff = shortestDistance(idx, positionRef.current, count);
              positionRef.current += diff;
              velocityRef.current = 0;
              renderCards();
            }}
            aria-label={`Jump to project ${idx + 1}: ${proj.title}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIdx === idx 
                ? 'w-7 h-2 bg-blue-600' 
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
