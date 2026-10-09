import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute, ServiceItem } from '../types';
import { CMS_SERVICES } from '../data/cmsServices';
import { 
  ArrowRight, 
  Workflow, 
  Code2, 
  Palette, 
  Video, 
  Zap, 
  Clock, 
  ExternalLink,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ServicesArcFocusCarouselProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
  services?: ServiceItem[];
}

export const ServicesTabsCard: React.FC<ServicesArcFocusCarouselProps> = ({ 
  onNavigate, 
  services = CMS_SERVICES 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1100);

  const INITIAL_CARD_INDEX = 2; // Start card index

  // Infinite continuous float position
    const targetFloatRef = useRef<number>(INITIAL_CARD_INDEX);
  const [currentFloat, setCurrentFloat] = useState<number>(INITIAL_CARD_INDEX);
  const [activeIndex, setActiveIndex] = useState<number>(INITIAL_CARD_INDEX);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartFloatRef = useRef<number>(INITIAL_CARD_INDEX);

  // ResizeObserver & window resize listener for responsive geometry
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            setContainerWidth(entry.contentRect.width);
          }
        }
      });
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  const count = services.length;

  // Infinite circular auto-loop animation
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // When auto-playing and user is not actively hovering or dragging, advance the loop
      if (isPlaying && !isHovered && !isDraggingRef.current) {
        targetFloatRef.current += dt * 0.28; // Complete cycle smoothly
      }

      setCurrentFloat(prev => {
        const diff = targetFloatRef.current - prev;
        if (Math.abs(diff) < 0.0001) return targetFloatRef.current;
        return prev + diff * 0.12; // Smooth easing factor
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isHovered]);

  // Synchronize normalized active index in circular space [0 ... count-1]
  useEffect(() => {
    const normalized = ((Math.round(currentFloat) % count) + count) % count;
    if (normalized !== activeIndex) {
      setActiveIndex(normalized);
    }
  }, [currentFloat, count, activeIndex]);

  const activeService = services[activeIndex] || services[0];

  // Helper to jump to a specific index using the shortest path in circular loop
  const rotateTo = useCallback((targetIndex: number) => {
    const normCurrent = ((targetFloatRef.current % count) + count) % count;
    let diff = targetIndex - normCurrent;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    targetFloatRef.current += diff;
  }, [count]);

  const handleNext = useCallback(() => {
    targetFloatRef.current = Math.round(targetFloatRef.current) + 1;
  }, []);

  const handlePrev = useCallback(() => {
    targetFloatRef.current = Math.round(targetFloatRef.current) - 1;
  }, []);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartFloatRef.current = targetFloatRef.current;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    const containerW = containerRef.current.clientWidth || 360;
    const indexDelta = -(deltaX / (containerW * 0.35));
    targetFloatRef.current = dragStartFloatRef.current + indexDelta;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setIsHovered(false);
  };

  // Pointer drag & steering handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag on primary button
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartFloatRef.current = targetFloatRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartXRef.current;
      const sensitivity = isMobile ? 120 : 180;
      targetFloatRef.current = dragStartFloatRef.current - deltaX / sensitivity;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    isDraggingRef.current = false;
    setIsHovered(false);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Responsive Arc Parameters
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;
  const isDesktop = containerWidth >= 1024 && containerWidth < 1440;
  const isWide = containerWidth >= 1440;

  const cardWidth = isMobile ? 124 : isTablet ? 154 : isDesktop ? 184 : 216;
  const cardHeight = isMobile ? 172 : isTablet ? 216 : isDesktop ? 256 : 296;
  const arcRadius = isMobile 
    ? Math.max(280, containerWidth * 0.72) 
    : isTablet 
    ? Math.max(420, containerWidth * 0.52) 
    : isDesktop 
    ? Math.max(540, containerWidth * 0.46) 
    : Math.max(680, containerWidth * 0.42);
  const stepAngleDeg = isMobile ? 26 : isTablet ? 22 : isDesktop ? 19 : 17;
  const arcTop = isMobile ? 44 : isTablet ? 64 : isDesktop ? 76 : 88;

  return (
    <div className="w-full" id="services-tabs-card-section">
      {/* 
        Outer Arc Focus Carousel Frame
        Infinite looping circular arc with interactive steering & auto-play
      */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing group"
        style={{
          minHeight: isMobile ? 570 : isTablet ? 640 : isWide ? 760 : 700,
          touchAction: 'pan-y'
        }}
      >
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] sm:w-[760px] xl:w-[1020px] h-[320px] sm:h-[460px] rounded-full bg-blue-600/10 blur-[110px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

        {/* ──────────────────────────────────────────────────────────
            1. THE CURVED ARC OF CARDS (Continuous Seamless Infinite Loop)
            Each card wraps modulo 'count' so cards loop forever
        ─────────────────────────────────────────────────────────── */}
        <div 
          className="relative w-full overflow-hidden pointer-events-auto"
          style={{ height: cardHeight * 1.38 + arcTop + 20 }}
        >
          {/* Quick Navigation Arrow Buttons */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous service"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-slate-900/80 hover:bg-blue-600 border border-slate-700/80 hover:border-blue-500 text-white flex items-center justify-center transition-all z-40 shadow-lg cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next service"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-slate-900/80 hover:bg-blue-600 border border-slate-700/80 hover:border-blue-500 text-white flex items-center justify-center transition-all z-40 shadow-lg cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>

          {services.map((service, index) => {
            // Distance from current continuous float in an infinite circular loop:
            const normFloat = ((currentFloat % count) + count) % count;
            let diff = index - normFloat;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;
            const absDiff = Math.abs(diff);

            // Compute arc geometry using circular trigonometry
            const angleDeg = diff * stepAngleDeg;
            const angleRad = (angleDeg * Math.PI) / 180;

            const centerX = containerWidth / 2;
            const posX = centerX + Math.sin(angleRad) * arcRadius - cardWidth / 2;
            const posY = arcTop + (1 - Math.cos(angleRad)) * (arcRadius * 0.44);

            // Focus scale and opacity: apex card expands smoothly near center
            const isNearCenter = absDiff < 0.5;
            const scale = Math.max(0.76, 1.22 - absDiff * 0.16);
            const opacity = Math.max(0.4, 1.0 - absDiff * 0.25);
            const zIndex = Math.round(100 - absDiff * 10);

            // Don't render cards that are rotated out of viewport
            if (absDiff > 3.4) return null;

            return (
              <div
                key={service.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (absDiff < 0.35) {
                    onNavigate('service-slug', service.slug);
                  } else {
                    rotateTo(index);
                  }
                }}
                className={`absolute top-0 left-0 cursor-pointer group transition-all duration-75 will-change-transform ${
                  isNearCenter ? 'ring-2 ring-blue-500/80 shadow-2xl' : 'hover:opacity-100'
                }`}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transform: `translate3d(${posX}px, ${posY}px, 0px) rotate(${angleDeg * 0.42}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformOrigin: '50% 50%'
                }}
              >
                {/* Individual Card Body */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-xl flex flex-col justify-between p-3 group-hover:border-blue-400 transition-colors">
                  {/* Background Image / Cover */}
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = service.secondaryImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                  {/* Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />

                  {/* Top Floating Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[9px] font-mono font-bold text-sky-300">
                      #{index + 1}
                    </span>
                    {service.badge && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-blue-600/90 text-[8px] font-bold text-white uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Title on Card */}
                  <div className="relative z-10 pointer-events-none">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                      {service.category}
                    </div>
                    <div className="text-[11px] font-bold text-white leading-tight line-clamp-1">
                      {service.title}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ──────────────────────────────────────────────────────────
            2. EDITORIAL CENTER FOCUS SECTION (Clean & Synced with Loop)
            Title, Subtitle, Key Metrics & CTAs smoothly updated by the loop
        ─────────────────────────────────────────────────────────── */}
        <div className="relative z-20 px-4 sm:px-8 pb-10 max-w-4xl mx-auto flex flex-col items-center text-center pointer-events-auto">
          
          {/* Dynamic Animated Title */}
          <div className="w-full max-w-3xl px-2 mb-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div className="text-xs font-mono uppercase font-bold tracking-wider text-blue-400 mb-1 flex items-center justify-center gap-2">
                  <span>{activeService.category}</span>
                  <span className="text-slate-500">·</span>
                  <span>0{activeIndex + 1} of 0{count}</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading text-white tracking-tight leading-snug">
                  {activeService.title}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtitle & Impact Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`sub-${activeService.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed line-clamp-2">
                {activeService.tagline || activeService.description}
              </p>

              {/* Delivery Window & Impact Metric Badges */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{activeService.typicalDuration}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/70 text-[11px] font-semibold text-emerald-300">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeService.businessImpact}</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action CTAs Row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('service-slug', activeService.slug)}
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/30 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Explore Scope & Deliverables</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Book Consultation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ──────────────────────────────────────────────────────────
              3. PAGINATION DOTS ROW (Infinite Loop Navigation)
              Clicking any dot smoothly rotates the loop via the shortest path
          ─────────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-2 mt-7">
            {services.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => rotateTo(idx)}
                  aria-label={`Jump to ${item.title}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'w-7 h-2 bg-blue-500 shadow-sm shadow-blue-500/50' 
                      : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
