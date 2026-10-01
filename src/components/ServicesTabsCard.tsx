import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute, ServiceItem } from '../types';
import { CMS_SERVICES } from '../data/cmsServices';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Workflow, 
  Code2, 
  Palette, 
  Video, 
  Zap, 
  Clock, 
  ExternalLink,
  MoveHorizontal,
  MousePointer2
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

  const INITIAL_CARD_INDEX = 2; // Always display the Third Card on reload

  // Continuous cursor float position (0.0 to count - 1) initialized to 3rd card
  const targetFloatRef = useRef<number>(INITIAL_CARD_INDEX);
  const [currentFloat, setCurrentFloat] = useState<number>(INITIAL_CARD_INDEX);
  const [activeIndex, setActiveIndex] = useState<number>(INITIAL_CARD_INDEX);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Resize listener for responsive geometry
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const count = services.length;
  const activeService = services[activeIndex] || services[INITIAL_CARD_INDEX] || services[0];

  // Silky smooth LERP animation loop: tracks cursor position with inertia
  useEffect(() => {
    let animId: number;
    const loop = () => {
      setCurrentFloat(prev => {
        const diff = targetFloatRef.current - prev;
        if (Math.abs(diff) < 0.001) return targetFloatRef.current;
        return prev + diff * 0.14; // smooth easing factor
      });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Synchronize integer active index when floating cursor position changes
  useEffect(() => {
    const rounded = Math.max(0, Math.min(count - 1, Math.round(currentFloat)));
    if (rounded !== activeIndex) {
      setActiveIndex(rounded);
    }
  }, [currentFloat, count, activeIndex]);

  // Cursor movement handler: maps horizontal cursor coordinate directly to card arc
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    // Map ratio [0, 1] to index space [0, count - 1]
    const clampedX = Math.max(0, Math.min(1, relX));
    targetFloatRef.current = clampedX * (count - 1);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    // When cursor leaves, gently snap to the nearest card
    targetFloatRef.current = Math.round(targetFloatRef.current);
  };

  // Keyboard navigation as accessibility backup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        targetFloatRef.current = Math.max(0, Math.round(targetFloatRef.current) - 1);
      } else if (e.key === 'ArrowRight') {
        targetFloatRef.current = Math.min(count - 1, Math.round(targetFloatRef.current) + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [count]);

  // Responsive Arc Parameters
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;

  const cardWidth = isMobile ? 120 : isTablet ? 148 : 172;
  const cardHeight = isMobile ? 165 : isTablet ? 205 : 238;
  const arcRadius = isMobile ? 320 : isTablet ? 440 : 540;
  const stepAngleDeg = isMobile ? 26 : isTablet ? 23 : 21;
  const arcTop = isMobile ? 18 : 28;

  const getServiceIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <Workflow className="w-3.5 h-3.5" />;
      case 1:
        return <Code2 className="w-3.5 h-3.5" />;
      case 2:
        return <Palette className="w-3.5 h-3.5" />;
      case 3:
        return <Video className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  // Cursor progress percentage for visual scrubber bar
  const cursorProgressPercent = (currentFloat / (count - 1)) * 100;

  return (
    <div className="w-full" id="services-tabs-card-section">
      {/* 
        Outer Arc Focus Carousel Frame
        Cursor moves left/right to continuously steer the arc cards without buttons
      */}
      <div 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="relative w-full rounded-3xl border border-slate-800/80 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl overflow-hidden select-none cursor-ew-resize group"
        style={{
          minHeight: isMobile ? 540 : 620,
          touchAction: 'pan-y'
        }}
      >
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none" />

        {/* Top Eyebrow & Interactive Cursor Indicator */}
        <div className="relative z-10 pt-6 sm:pt-8 px-6 flex flex-col items-center gap-2.5 text-center pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/80 text-[11px] font-mono font-bold uppercase tracking-wider text-blue-300 shadow-sm">
            <MoveHorizontal className={`w-3.5 h-3.5 text-blue-400 ${isHovered ? 'animate-pulse' : ''}`} />
            <span>Move cursor left ↔ right to explore</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-0.5" />
          </div>

          {/* Interactive Horizontal Cursor Track Scrubber */}
          <div className="w-48 sm:w-64 h-1.5 bg-slate-800/90 rounded-full overflow-hidden relative border border-slate-700/60 mt-1">
            <div 
              className="absolute top-0 bottom-0 w-8 sm:w-10 bg-linear-to-r from-blue-500 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-75"
              style={{
                left: `calc(${cursorProgressPercent}% - ${cursorProgressPercent * 0.08}px)`
              }}
            />
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            1. THE CURVED ARC OF CARDS (Driven by Cursor Position)
            Moving cursor left/right dynamically rotates cards across the arc
        ─────────────────────────────────────────────────────────── */}
        <div 
          className="relative w-full overflow-hidden pointer-events-auto"
          style={{ height: cardHeight * 1.52 + arcTop + 10 }}
        >
          {services.map((service, index) => {
            // Distance from current continuous cursor float position
            const diff = index - currentFloat;
            const absDiff = Math.abs(diff);

            // Compute arc geometry using trigonometry
            const angleDeg = diff * stepAngleDeg;
            const angleRad = (angleDeg * Math.PI) / 180;

            const centerX = containerWidth / 2;
            const posX = centerX + Math.sin(angleRad) * arcRadius - cardWidth / 2;
            const posY = arcTop + (1 - Math.cos(angleRad)) * (arcRadius * 0.44);

            // Focus scale and opacity: apex card expands smoothly as cursor nears it
            const isNearCenter = absDiff < 0.5;
            const scale = Math.max(0.74, 1.35 - absDiff * 0.2);
            const opacity = Math.max(0.35, 1.0 - absDiff * 0.28);
            const zIndex = Math.round(100 - absDiff * 10);

            // Don't render cards that are rotated out of viewport
            if (absDiff > 3.2) return null;

            return (
              <div
                key={service.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (absDiff < 0.35) {
                    onNavigate('service-slug', service.slug);
                  } else {
                    targetFloatRef.current = index;
                  }
                }}
                className={`absolute top-0 left-0 cursor-pointer group transition-all duration-75 will-change-transform ${
                  isNearCenter ? 'ring-2 ring-blue-500/80 shadow-2xl' : 'hover:opacity-100'
                }`}
                style={{
                  transform: `translate3d(${posX}px, ${posY}px, 0) rotate(${angleDeg}deg) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transformOrigin: '50% 50%',
                  borderRadius: isMobile ? '16px' : '20px',
                }}
                title={isNearCenter ? `Click to explore ${service.title}` : `Click to center ${service.title}`}
              >
                {/* Card Inner Container with Rounded Corner Mask */}
                <div 
                  className="relative w-full h-full overflow-hidden bg-slate-900 border border-white/15 shadow-xl transition-shadow duration-300"
                  style={{ borderRadius: isMobile ? '16px' : '20px' }}
                >
                  {/* Card Cover Image */}
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Vignette Overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Top Badge: Category & Index */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[9px] font-mono font-bold text-blue-300 border border-white/10 flex items-center gap-1">
                      {getServiceIcon(index)}
                      <span>0{index + 1}</span>
                    </span>

                    {isNearCenter && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Bottom Title on Card */}
                  <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
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
            2. EDITORIAL CENTER FOCUS SECTION (Clean, without buttons)
            Title, Subtitle, Key Metrics & CTAs smoothly updated by cursor
        ─────────────────────────────────────────────────────────── */}
        <div className="relative z-20 px-4 sm:px-8 pb-10 max-w-3xl mx-auto flex flex-col items-center text-center pointer-events-auto">
          
          {/* Dynamic Animated Title (No buttons, pure cursor control) */}
          <div className="w-full max-w-2xl px-2 mb-3">
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
              className="max-w-xl mx-auto"
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
              3. PAGINATION DOTS ROW
              Visual indicators synchronized with continuous cursor position
          ─────────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-2 mt-7">
            {services.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    targetFloatRef.current = idx;
                  }}
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
