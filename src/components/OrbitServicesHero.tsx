import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { PageRoute, ServiceItem } from '../types';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  RotateCw, 
  Compass, 
  Play, 
  Pause,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface OrbitServicesHeroProps {
  services: ServiceItem[];
  onNavigate: (page: PageRoute, slug?: string) => void;
  onExploreClick?: () => void;
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(Math.max(value, min), max);
}

function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

/**
 * OrbitServicesHero
 * Fully responsive 3D Orbit & Capability Galaxy.
 * - Mobile (<640px): Dedicated touch-swipe 3D card stage with zero visual overlap, clear typography, and tactile pagination.
 * - Tablet (640-1023px): Proportional 3D elliptical orbit framed cleanly.
 * - Laptop (1024-1439px): Sleek 3D orbit fitted within 500px height.
 * - Desktop (>=1440px): High-impact 3D perspective galaxy with kinetic split titles.
 */
export const OrbitServicesHero: React.FC<OrbitServicesHeroProps> = ({
  services,
  onNavigate,
  onExploreClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitAngleRef = useRef<number>(0);
  const targetAngleRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  // Mobile-specific state
  const [mobileIndex, setMobileIndex] = useState<number>(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Desktop drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartAngleRef = useRef<number>(0);

  // Responsive device classification & dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: 520,
    curveWidth: 440,
    curveHeight: 115,
    depth: 350,
    cardWidth: 280,
    cardHeight: 190,
    perspective: 1150,
    isMobile: false
  });

  // Calculate layout parameters based on viewport size
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const isMobile = w < 640;

      if (isMobile) {
        // PHONE (<640px)
        setDimensions({
          width: w,
          height: 480,
          curveWidth: 140,
          curveHeight: 50,
          depth: 180,
          cardWidth: Math.min(270, w - 50),
          cardHeight: 190,
          perspective: 800,
          isMobile: true
        });
      } else if (w < 1024) {
        // TABLET (640px - 1023px)
        setDimensions({
          width: w,
          height: 480,
          curveWidth: 320,
          curveHeight: 85,
          depth: 280,
          cardWidth: 240,
          cardHeight: 165,
          perspective: 950,
          isMobile: false
        });
      } else if (w < 1440) {
        // LAPTOP (1024px - 1439px)
        setDimensions({
          width: w,
          height: 510,
          curveWidth: 410,
          curveHeight: 105,
          depth: 330,
          cardWidth: 270,
          cardHeight: 185,
          perspective: 1100,
          isMobile: false
        });
      } else {
        // DESKTOP (>=1440px)
        setDimensions({
          width: w,
          height: 550,
          curveWidth: 470,
          curveHeight: 120,
          depth: 370,
          cardWidth: 295,
          cardHeight: 200,
          perspective: 1200,
          isMobile: false
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Top 6 CMS services for the orbit
  const orbitItems = useMemo(() => {
    return services.slice(0, 6);
  }, [services]);

  const itemCount = orbitItems.length;

  // Desktop / Tablet continuous 3D orbit animation
  useEffect(() => {
    if (dimensions.isMobile) return;

    const animate = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Auto drift angle when playing and not dragging
      if (isPlaying && !isDraggingRef.current && activeHoverIndex === null) {
        targetAngleRef.current += dt * 14; // 14 degrees/sec
      }

      // Smooth damping interpolation (Lerp to targetAngle)
      const current = orbitAngleRef.current;
      const target = targetAngleRef.current;
      const diff = target - current;
      orbitAngleRef.current = current + diff * (1 - Math.exp(-9 * dt));

      setRerenderCount(c => (c + 1) % 100000);
      rafRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, activeHoverIndex, dimensions.isMobile]);

  // Mobile auto-advance interval
  useEffect(() => {
    if (!dimensions.isMobile || !isPlaying) return;

    const timer = setInterval(() => {
      setMobileIndex(prev => (prev + 1) % itemCount);
    }, 4000);

    return () => clearInterval(timer);
  }, [dimensions.isMobile, isPlaying, itemCount]);

  const [, setRerenderCount] = useState(0);

  // Desktop pointer drag interaction for 3D manual orbit tilt
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dimensions.isMobile) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = targetAngleRef.current;

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
      try {
        containerRef.current.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dimensions.isMobile || !isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    targetAngleRef.current = dragStartAngleRef.current + dx * 0.35;
  };

  const handlePointerUp = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (dimensions.isMobile || !isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      if (e) {
        try {
          containerRef.current.releasePointerCapture(e.pointerId);
        } catch {}
      }
    }
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return;
    const delta = touchDeltaXRef.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        // Swipe right -> Previous
        setMobileIndex(prev => (prev - 1 + itemCount) % itemCount);
      } else {
        // Swipe left -> Next
        setMobileIndex(prev => (prev + 1) % itemCount);
      }
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  // Desktop / Tablet 3D Orbit transform calculation
  const getDesktopCardTransform = (index: number) => {
    const baseAngle = (index / Math.max(itemCount, 1)) * 360 - 90;
    const angle = baseAngle + orbitAngleRef.current;
    const radians = (angle * Math.PI) / 180;

    const x = Math.sin(radians) * dimensions.curveWidth;
    const y = Math.cos(radians + 0.45) * dimensions.curveHeight;
    const z = Math.cos(radians) * dimensions.depth;

    const normalizedDepth = clamp((z + dimensions.depth) / Math.max(dimensions.depth * 2, 1));

    const scale = lerp(0.74, 1.04, normalizedDepth);
    const opacity = lerp(0.40, 1.0, normalizedDepth);
    const rotateY = -Math.sin(radians) * 40;
    const rotateZ = -Math.sin(radians) * 5;
    const zIndex = Math.round(100 + normalizedDepth * 800);

    return {
      x,
      y,
      z,
      scale,
      opacity,
      rotateY,
      rotateZ,
      zIndex,
      normalizedDepth
    };
  };

  // Mobile-specific 3D Stage Transform
  const getMobileCardTransform = (index: number) => {
    let offset = index - mobileIndex;
    if (offset > itemCount / 2) offset -= itemCount;
    if (offset < -itemCount / 2) offset += itemCount;

    if (offset === 0) {
      // Active card: front & center
      return {
        x: 0,
        y: 0,
        z: 40,
        scale: 1.0,
        opacity: 1.0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 200,
        visible: true
      };
    } else if (offset === -1 || (mobileIndex === 0 && index === itemCount - 1)) {
      // Previous card: peeking to the left
      return {
        x: -dimensions.cardWidth * 0.88,
        y: 8,
        z: -120,
        scale: 0.82,
        opacity: 0.35,
        rotateY: 22,
        rotateZ: 2,
        zIndex: 50,
        visible: true
      };
    } else if (offset === 1 || (mobileIndex === itemCount - 1 && index === 0)) {
      // Next card: peeking to the right
      return {
        x: dimensions.cardWidth * 0.88,
        y: 8,
        z: -120,
        scale: 0.82,
        opacity: 0.35,
        rotateY: -22,
        rotateZ: -2,
        zIndex: 50,
        visible: true
      };
    } else {
      // Other cards hidden off-stage
      return {
        x: offset * 320,
        y: 0,
        z: -300,
        scale: 0.6,
        opacity: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 10,
        visible: false
      };
    }
  };

  return (
    <section 
      id="orbit-services-hero" 
      className="relative w-full overflow-hidden bg-[#190019] text-white border-b border-[#2B124C] select-none flex flex-col justify-between"
      style={{ minHeight: dimensions.isMobile ? 'calc(470px + 3cm)' : `calc(${dimensions.height}px + 3cm)` }}
    >
      {/* Background Gradients & Ambient Glow in Uploaded Theme (#2B124C, #522B5B, #854F6C) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[680px] h-[300px] sm:h-[360px] bg-[#2B124C]/35 rounded-full blur-[120px]" />
        <div className="absolute bottom-6 left-1/4 w-[300px] sm:w-[480px] h-[220px] sm:h-[260px] bg-[#522B5B]/25 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-[280px] sm:w-[400px] h-[200px] sm:h-[240px] bg-[#854F6C]/20 rounded-full blur-[110px]" />
      </div>

      {/* MOBILE-ONLY CLEAN HEADER (Zero Overlap) */}
      <div className="sm:hidden block text-center px-4 pt-4 pb-1 z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2B124C]/90 border border-[#522B5B] text-[10px] font-mono text-[#FBE4D8] font-bold mb-1">
          <Sparkles className="w-3 h-3 text-[#DFB6B2]" />
          <span>AI VISION WORKS · GALAXY</span>
        </div>
        <h1 className="text-xl font-black font-heading text-white tracking-tight">
          Enterprise AI in Orbit
        </h1>
        <p className="text-[11px] text-[#DFB6B2]/80 font-mono mt-0.5">
          Swipe to explore {services.length} core capability nodes
        </p>
      </div>

      {/* DESKTOP/TABLET KINETIC SPLIT TYPOGRAPHY (Hidden on Mobile to prevent overlap) */}
      <div className="hidden sm:flex absolute inset-0 flex-col justify-between p-4 sm:p-6 md:p-8 pointer-events-none z-0">
        <div className="max-w-md sm:max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2B124C]/80 border border-[#522B5B] text-[10px] sm:text-xs font-mono font-bold text-[#FBE4D8] mb-1 sm:mb-1.5">
            <Sparkles className="w-3 h-3 text-[#DFB6B2]" />
            <span>AI VISION WORKS · ARCHITECTURE MATRIX</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-heading tracking-tighter text-white/95 leading-none drop-shadow-md">
            ENTERPRISE AI
          </h1>
        </div>

        <div className="self-end text-right max-w-sm sm:max-w-md pb-12 sm:pb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-heading tracking-tighter text-[#DFB6B2] leading-none drop-shadow-md">
            SERVICES IN ORBIT
          </h2>
          <p className="text-[10px] sm:text-xs text-[#DFB6B2]/70 font-mono mt-1 hidden sm:block">
            Interactive 3D Solution Architecture & Capability Galaxy
          </p>
        </div>
      </div>

      {/* DESKTOP/TABLET FLOATING CENTER HUD (Hidden on Mobile) */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 max-w-xs md:max-w-sm px-2">
        <div className="backdrop-blur-md bg-[#190019]/90 p-3.5 rounded-2xl border border-[#522B5B]/50 shadow-2xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2B124C]/90 border border-[#854F6C]/40 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#FBE4D8] font-bold">
            <Compass className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#DFB6B2] animate-spin" style={{ animationDuration: '12s' }} />
            <span>Interactive 3D Galaxy</span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold font-heading text-white">
            Full-Spectrum AI Capabilities
          </h3>

          <p className="text-[10px] sm:text-[11px] text-[#DFB6B2]/90 leading-snug line-clamp-2">
            Drag to rotate orbit. Select any service node to inspect deliverables and ROI metrics.
          </p>

          <div className="pt-0.5 flex items-center justify-center gap-1.5">
            <span className="text-[9px] font-mono text-[#FBE4D8] bg-[#2B124C]/80 border border-[#522B5B]/50 px-2 py-0.5 rounded-md">
              Drag to Orbit ↔
            </span>
            <span className="text-[9px] font-mono text-[#FBE4D8] bg-[#2B124C]/80 border border-[#522B5B]/50 px-2 py-0.5 rounded-md">
              Click to Open ↗
            </span>
          </div>
        </div>
      </div>

      {/* 3D ORBIT / STAGE VIEWPORT (Responsive for Mobile, Tablet, Laptop, Desktop) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => handlePointerUp()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full flex-1 overflow-hidden cursor-grab flex items-center justify-center"
        style={{
          minHeight: 'calc(260px + 3cm)',
          perspective: `${dimensions.perspective}px`,
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          touchAction: 'pan-y'
        }}
      >
        {/* Desktop Orbit Path Visual Guide Ring */}
        {!dimensions.isMobile && (
          <div 
            className="absolute rounded-full border border-[#DFB6B2]/25 pointer-events-none"
            style={{
              width: dimensions.curveWidth * 2,
              height: dimensions.depth * 1.4,
              transform: 'rotateX(72deg) translateY(-14px)',
              transformStyle: 'preserve-3d',
              opacity: 0.35
            }}
          />
        )}

        {/* Orbiting / Stage 3D Service Cards */}
        <div 
          className="relative w-0 h-0"
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          {orbitItems.map((service, index) => {
            const transform = dimensions.isMobile 
              ? getMobileCardTransform(index) 
              : getDesktopCardTransform(index);

            if (dimensions.isMobile && !(transform as any).visible) {
              return null;
            }

            const isHovered = activeHoverIndex === index;
            const isCurrentActive = dimensions.isMobile ? mobileIndex === index : (transform as any).normalizedDepth > 0.65;

            return (
              <div
                key={service.id}
                onMouseEnter={() => !dimensions.isMobile && setActiveHoverIndex(index)}
                onMouseLeave={() => !dimensions.isMobile && setActiveHoverIndex(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('service-slug', service.slug);
                }}
                className={`absolute rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-[#190019]/95 border transition-all duration-300 group ${
                  isCurrentActive
                    ? 'border-[#DFB6B2] shadow-[0_16px_40px_rgba(25,0,25,0.85)] ring-1 ring-[#FBE4D8]/60'
                    : 'border-[#522B5B]/60 hover:border-[#DFB6B2] shadow-xl'
                }`}
                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  left: `${-dimensions.cardWidth / 2}px`,
                  top: `${-dimensions.cardHeight / 2}px`,
                  transform: `
                    translate3d(${transform.x}px, ${transform.y}px, ${transform.z}px)
                    rotateY(${transform.rotateY}deg)
                    rotateZ(${transform.rotateZ}deg)
                    scale(${isHovered ? transform.scale * 1.05 : transform.scale})
                  `,
                  opacity: transform.opacity,
                  zIndex: transform.zIndex,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'transform, opacity'
                }}
              >
                {/* Card Background Image with Gradient Overlay */}
                <div className="absolute inset-0 bg-[#190019]">
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    draggable={false}
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#190019] via-[#190019]/70 to-transparent" />
                </div>

                {/* Card Content & Badge Overlay */}
                <div className="relative h-full p-3 sm:p-4 flex flex-col justify-between z-10">
                  {/* Top Bar: Category Pill & Corner CTA */}
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#190019]/90 backdrop-blur-md border border-[#854F6C]/50 text-[9px] sm:text-[10px] font-mono font-bold text-[#FBE4D8] shadow-xs truncate max-w-[140px] sm:max-w-[180px]">
                      {service.category}
                    </span>

                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2B124C]/90 text-[#FBE4D8] group-hover:bg-[#DFB6B2] group-hover:text-[#190019] flex items-center justify-center transition-colors border border-[#854F6C]/40 shrink-0">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Bottom Bar: Title, Metric & Turnaround */}
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-[10px] font-mono text-[#DFB6B2] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FBE4D8] animate-pulse" />
                      <span>{service.typicalDuration}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold font-heading text-white line-clamp-1 group-hover:text-[#FBE4D8] transition-colors">
                      {service.title}
                    </h4>

                    <p className="text-[10px] text-[#FBE4D8]/80 line-clamp-2 leading-normal">
                      {service.tagline}
                    </p>

                    <div className="pt-1.5 border-t border-[#522B5B]/40 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#DFB6B2] font-bold truncate max-w-[120px] sm:max-w-[150px]">{service.badge}</span>
                      <span className="text-[#DFB6B2]/80 group-hover:text-[#FBE4D8] flex items-center gap-1 transition-colors shrink-0">
                        <span>Details</span>
                        <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE BOTTOM CONTROLS (<640px) */}
      <div className="sm:hidden flex items-center justify-between px-4 pb-3 pt-1 z-20 w-full bg-[#190019]/90 backdrop-blur-xs border-t border-[#2B124C]/50">
        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {orbitItems.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMobileIndex(i)}
              aria-label={`Jump to service node ${i + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                mobileIndex === i ? 'w-5 bg-[#DFB6B2]' : 'w-1.5 bg-[#522B5B]/80 hover:bg-[#854F6C]'
              }`}
            />
          ))}
        </div>

        {/* Prev, Next & Catalog CTA */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMobileIndex(prev => (prev - 1 + itemCount) % itemCount)}
            aria-label="Previous service"
            className="w-7 h-7 rounded-full bg-[#2B124C] border border-[#522B5B] text-[#FBE4D8] hover:text-white flex items-center justify-center cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileIndex(prev => (prev + 1) % itemCount)}
            aria-label="Next service"
            className="w-7 h-7 rounded-full bg-[#2B124C] border border-[#522B5B] text-[#FBE4D8] hover:text-white flex items-center justify-center cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (onExploreClick) {
                onExploreClick();
              } else {
                const el = document.getElementById('services-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2B124C] hover:bg-[#522B5B] border border-[#854F6C] text-[#FBE4D8] font-bold text-[10px] shadow-sm cursor-pointer ml-1"
          >
            <span>Catalog</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* DESKTOP/TABLET BOTTOM FLOATING CONTROL BAR (>=640px) */}
      <div className="hidden sm:flex absolute bottom-3 inset-x-3 sm:inset-x-6 items-center justify-between pointer-events-none z-20">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-[#190019]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#2B124C] text-xs shadow-md">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause 3D Orbit' : 'Play 3D Orbit'}
            className="flex items-center gap-1 text-[#DFB6B2] hover:text-white transition-colors cursor-pointer px-1 py-0.5 rounded"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#DFB6B2]" />
                <span className="text-[10px] font-mono">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#DFB6B2]" />
                <span className="text-[10px] font-mono">Resume</span>
              </>
            )}
          </button>

          <span className="w-0.5 h-2.5 bg-[#522B5B] rounded-full" />

          <button
            type="button"
            onClick={() => {
              targetAngleRef.current -= 60;
            }}
            aria-label="Previous service node"
            className="p-1 hover:text-[#FBE4D8] text-[#DFB6B2]/80 transition-colors cursor-pointer"
            title="Rotate previous node"
          >
            <RotateCw className="w-3 h-3 -scale-x-100" />
          </button>

          <button
            type="button"
            onClick={() => {
              targetAngleRef.current += 60;
            }}
            aria-label="Next service node"
            className="p-1 hover:text-[#FBE4D8] text-[#DFB6B2]/80 transition-colors cursor-pointer"
            title="Rotate next node"
          >
            <RotateCw className="w-3 h-3" />
          </button>
        </div>

        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              if (onExploreClick) {
                onExploreClick();
              } else {
                const el = document.getElementById('services-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#2B124C] hover:bg-[#522B5B] border border-[#854F6C] text-[#FBE4D8] font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
          >
            <span>Catalog ({services.length})</span>
            <ChevronDown className="w-3 h-3 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
