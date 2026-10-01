import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Zap,
  Maximize2,
  Minimize2,
  X,
  CheckCircle2
} from 'lucide-react';

export interface CardShowcaseItem {
  id: string;
  number: string;
  title: string;
  tagline?: string;
  description: string;
  tag: string;
  image: string;
  level?: string;
  practicalApplications?: string[];
  toolsAndFrameworks?: string[];
  businessValue?: string;
}

interface CardShowcaseProps {
  cards: CardShowcaseItem[];
  animationSpeed?: number; // duration in seconds per card (e.g. 5.5)
  loop?: boolean;
  progressColor?: string;
  className?: string;
}

/**
 * CardShowcase
 * Unified Full-Screen Responsive Card Layout with In-Place Full Info Expansion
 * 
 * Features:
 * - Hover / Cursor reach activates and previews card
 * - Click on any card increases its size and shows complete untruncated info in-place (no slug page)
 * - Click again or click "Collapse" to return to normal carousel size
 * - Progress pauses during hover or when a card is expanded
 * - Displays all deliverables, tools, and business value when expanded
 */
export const CardShowcase: React.FC<CardShowcaseProps> = ({
  cards,
  animationSpeed = 5.5,
  loop = true,
  progressColor = '#2563eb', // blue-600
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const progressIntervalRef = useRef<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCards = cards.length;
  const activeCard = cards[activeIndex] || cards[0];

  // Auto-scroll active card into view on small/medium screens
  useEffect(() => {
    const el = cardRefs.current[activeIndex];
    if (el && containerRef.current) {
      const container = containerRef.current;
      const isMobileOrTablet = window.innerWidth < 1024;
      if (isMobileOrTablet) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeIndex, isCardExpanded]);

  // Auto-advance progress timer: continues automatically and pauses whenever cursor is on cards or expanded
  useEffect(() => {
    if (isCardHovered || isCardExpanded) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalMs = 20;
    const increment = (100 / (animationSpeed * 1000)) * intervalMs;

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    progressIntervalRef.current = window.setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + increment;
        if (nextProgress >= 100) {
          const nextIndex = activeIndex + 1;
          if (nextIndex >= totalCards) {
            if (loop) {
              setActiveIndex(0);
              return 0;
            } else {
              if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
              return 100;
            }
          } else {
            setActiveIndex(nextIndex);
            return 0;
          }
        }
        return nextProgress;
      });
    }, intervalMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeIndex, animationSpeed, totalCards, loop, isCardHovered, isCardExpanded]);

  // When cursor reaches / hovers a card, immediately show and expand that card
  const handleCardReach = (index: number) => {
    if (!isCardExpanded) {
      if (index !== activeIndex) {
        setActiveIndex(index);
        setProgress(0);
      }
      setIsCardHovered(true);
    }
  };

  // When user clicks a card: increase card size and reveal all info in-place (no slug page)
  const handleCardClick = (index: number) => {
    if (activeIndex === index) {
      setIsCardExpanded(prev => !prev);
    } else {
      setActiveIndex(index);
      setIsCardExpanded(true);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? totalCards - 1 : prev - 1));
    setProgress(0);
    setIsCardExpanded(false);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === totalCards - 1 ? 0 : prev + 1));
    setProgress(0);
    setIsCardExpanded(false);
  };

  return (
    <div className={`w-full select-none ${className}`}>
      {/* ──────────────────────────────────────────────────────────
          UNIFIED ALL-SCREEN HORIZONTAL EXPANDING ACCORDION
          Matches the exact card layout from screenshot across all screens
          Hover to activate + Click to expand full info in-place
      ─────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        onPointerLeave={() => {
          if (!isCardExpanded) setIsCardHovered(false);
        }}
        className="w-full flex gap-3 sm:gap-3.5 overflow-x-auto pb-2 scrollbar-none items-stretch min-h-[460px] sm:min-h-[485px] lg:min-h-[500px] max-h-[530px] snap-x snap-mandatory"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          const isThisCardExpanded = isActive && isCardExpanded;

          return (
            <motion.div
              key={card.id}
              ref={el => (cardRefs.current[index] = el)}
              onClick={() => handleCardClick(index)}
              onPointerEnter={() => handleCardReach(index)}
              onMouseEnter={() => handleCardReach(index)}
              layout
              transition={{
                layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                flex: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{
                flex: isThisCardExpanded ? 7 : isActive ? 4.2 : 1,
              }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col p-4 sm:p-5 border snap-center ${
                isActive
                  ? isThisCardExpanded
                    ? 'bg-white border-blue-600 shadow-2xl ring-2 ring-blue-500/25 min-w-[340px] sm:min-w-[540px] lg:min-w-[620px] max-w-[720px]'
                    : 'bg-white border-blue-500/80 shadow-xl ring-1 ring-blue-500/20 min-w-[300px] sm:min-w-[360px] lg:min-w-[400px] max-w-[460px]'
                  : 'bg-white/85 hover:bg-white border-slate-200 hover:border-blue-300 shadow-sm min-w-[62px] sm:min-w-[70px] lg:min-w-[76px]'
              }`}
            >
              {/* Vertical Edge Progress Bar */}
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-slate-100 overflow-hidden">
                {isActive && (
                  <motion.div
                    className="w-full bg-blue-600 rounded-full"
                    style={{
                      height: `${progress}%`,
                      backgroundColor: progressColor,
                    }}
                    transition={{ duration: 0 }}
                  />
                )}
              </div>

              {/* ──────────────────────────────────────────────────
                  INACTIVE CARD STATE (Collapsed preview)
              ─────────────────────────────────────────────────── */}
              {!isActive && (
                <div className="flex flex-col items-center justify-between h-full py-1">
                  <span className="font-mono text-sm font-black text-slate-400">
                    {card.number}
                  </span>

                  {/* Vertical Rotated Tag */}
                  <div className="my-auto py-3">
                    <span 
                      className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase block whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────
                  ACTIVE CARD STATE:
                  Case A: EXPANDED FULL INFO (When clicked, card size increases & shows all info in-place)
                  Case B: STANDARD PREVIEW (Matching screenshot)
              ─────────────────────────────────────────────────── */}
              {isActive && isThisCardExpanded && (
                <div className="flex flex-col h-full pl-1">
                  {/* Top Header: Number, Tag, Full-Info Badge & Collapse Action */}
                  <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-blue-600">
                        {card.number}
                      </span>
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                        {card.tag}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Full Info</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCardExpanded(false);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
                      title="Collapse to compact view"
                    >
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>Collapse</span>
                    </button>
                  </div>

                  {/* Scrollable Inner Body for Complete Un-truncated Content */}
                  <div className="overflow-y-auto max-h-[390px] sm:max-h-[420px] pr-2 space-y-3.5 scrollbar-thin">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-950 tracking-tight leading-snug">
                        {card.title}
                      </h3>
                      {card.tagline && (
                        <p className="text-xs font-mono font-bold text-blue-600 mt-0.5">
                          {card.tagline}
                        </p>
                      )}
                    </div>

                    {/* Complete Un-truncated Description */}
                    <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {card.description}
                    </div>

                    {/* Image with Level Badge */}
                    <div className="relative rounded-xl overflow-hidden shadow-xs border border-slate-200/80 h-32 sm:h-36 w-full bg-slate-100 shrink-0">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none text-white">
                        <span className="font-heading font-bold text-xs tracking-wide text-white drop-shadow-sm">
                          {card.level || 'Mastery'}
                        </span>
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-sm shadow-emerald-400/80" />
                        </span>
                      </div>
                    </div>

                    {/* Complete Deliverables List (All Items) */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="font-mono text-[11px] uppercase tracking-wider font-extrabold text-slate-900 flex items-center justify-between">
                        <span>FULL DELIVERABLES & PRACTICE AREAS</span>
                        <span className="text-blue-600 font-mono text-[10px]">
                          {(card.practicalApplications || []).length} Deliverables
                        </span>
                      </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {(card.practicalApplications || []).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {card.toolsAndFrameworks && card.toolsAndFrameworks.length > 0 && (
                        <div className="pt-2.5 border-t border-slate-200 flex flex-wrap gap-1.5 items-center">
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase mr-1">Tools & Stack:</span>
                          {card.toolsAndFrameworks.map((tool, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-medium text-slate-800 shadow-2xs"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Business Value & Impact */}
                    {card.businessValue && (
                      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-950">
                        <Zap className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold font-mono text-[10px] uppercase block text-blue-800">
                            Business Impact & Value
                          </span>
                          <p className="mt-0.5 leading-relaxed text-slate-700">{card.businessValue}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────
                  ACTIVE CARD STATE: Case B: STANDARD PREVIEW
                  (Compact matching image (1).png + Click to Expand hint)
              ─────────────────────────────────────────────────── */}
              {isActive && !isThisCardExpanded && (
                <div className="flex flex-col h-full pl-1">
                  {/* Top Header: Number and Pill Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-base font-black text-blue-600">
                      {card.number}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-blue-50/80 border border-blue-200/90 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 shadow-2xs">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  {/* Large Bold Heading */}
                  <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-950 tracking-tight leading-snug mb-1.5 line-clamp-2">
                    {card.title}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {card.description}
                  </p>

                  {/* 3D Visual Hero Image with Corner Badges */}
                  <div className="relative rounded-xl overflow-hidden shadow-xs border border-slate-200/80 h-28 sm:h-32 w-full mb-3 bg-slate-100 shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none text-white">
                      <span className="font-heading font-bold text-xs tracking-wide text-white drop-shadow-sm">
                        {card.level || 'Mastery'}
                      </span>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-sm shadow-emerald-400/80" />
                      </span>
                    </div>
                  </div>

                  {/* Key Deliverables Box (Matching Screenshot Exactly) */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-2 mt-auto">
                    <div className="font-mono text-[10px] uppercase tracking-wider font-extrabold text-slate-900 flex items-center justify-between">
                      <span>KEY DELIVERABLES</span>
                      <span className="text-blue-600 font-bold text-[9px] flex items-center gap-0.5">
                        <Maximize2 className="w-2.5 h-2.5" /> Click card for all info
                      </span>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-700">
                      {(card.practicalApplications || []).slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-2 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 shadow-xs shadow-blue-500/50" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {card.toolsAndFrameworks && card.toolsAndFrameworks.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/80 flex flex-wrap gap-1.5">
                        {card.toolsAndFrameworks.slice(0, 4).map((tool, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-medium text-slate-800 shadow-2xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ──────────────────────────────────────────────────────────
          BOTTOM STATUS & ARROW NAVIGATION CONTROLS
      ─────────────────────────────────────────────────────────── */}
      <div className="mt-6 flex items-center justify-between px-2 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              isCardExpanded
                ? 'bg-blue-600'
                : isCardHovered
                ? 'bg-amber-500 animate-pulse'
                : 'bg-emerald-500'
            }`}
          />
          <span className="font-medium text-slate-600">
            {isCardExpanded ? (
              <span className="text-blue-700 font-bold">
                Card {activeIndex + 1} expanded · Showing full info (Click card or 'Collapse' to minimize)
              </span>
            ) : isCardHovered ? (
              <span className="text-amber-700 font-bold">
                Cursor on card · Progress paused (Click card to expand full info)
              </span>
            ) : (
              <span>
                Pillar {activeIndex + 1} of {totalCards} · Auto-advancing (Click any card to expand full info)
              </span>
            )}
          </span>
        </div>

        {/* Manual Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous skill card"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next skill card"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

