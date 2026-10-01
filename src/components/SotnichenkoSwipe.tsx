import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Layers, ArrowLeft, ArrowRight } from 'lucide-react';

export interface SwipeCardItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tools?: string[];
  image: string;
  badge?: string;
  accentColor?: string;
}

interface SotnichenkoSwipeProps {
  cards: SwipeCardItem[];
  autoplay?: boolean;
  autoplayDelay?: number; // seconds
  className?: string;
}

const modulo = (value: number, length: number) => ((value % length) + length) % length;

function deterministicRotation(index: number, amount: number = 3.5): number {
  if (amount === 0) return 0;
  const raw = Math.sin((index + 1) * 12.9898) * 43758.5453;
  const normalized = (raw - Math.floor(raw)) * 2 - 1;
  return normalized * amount;
}

/**
 * SotnichenkoSwipe (Framer Reference Implementation)
 * https://framer.com/m/Sotnichenko-Swipe-NnQNPP.js@PxsFQTEZtiP8w8bDAVMc
 * 
 * Features:
 * - 3D Card Stack with organic rotation jitter, y-offset depth, scale steps, and opacity decay
 * - Gesture swipe physics: pull left or right with dynamic rotation, elastic drag & throw exit
 * - Full keyboard (ArrowLeft / ArrowRight) & arrow button navigation
 * - Counter badge & live indicator
 * - Dark executive slate-950 theme with luminous cyan/blue badges
 */
export const SotnichenkoSwipe: React.FC<SotnichenkoSwipeProps> = ({
  cards,
  autoplay = false,
  autoplayDelay = 4.5,
  className = '',
}) => {
  const itemCount = cards.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [exitingCard, setExitingCard] = useState<{
    item: SwipeCardItem;
    direction: number;
    startX: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for top card
  const x = useMotionValue(0);
  const baseRotation = deterministicRotation(currentIndex, 3.5);
  const rotate = useTransform(x, [-240, 0, 240], [baseRotation - 15, baseRotation, baseRotation + 15]);

  const commitSwipe = useCallback(
    (direction: number, startX: number = 0) => {
      if (isLocked || itemCount < 2) return;
      setIsLocked(true);

      const currentItem = cards[currentIndex];
      setExitingCard({
        item: currentItem,
        direction,
        startX,
      });

      setCurrentIndex(prev => modulo(prev + 1, itemCount));
      x.set(0);

      // Release lock after exit transition finishes
      setTimeout(() => {
        setExitingCard(null);
        setIsLocked(false);
      }, 420);
    },
    [cards, currentIndex, isLocked, itemCount, x]
  );

  const handleDragEnd = (_: any, info: any) => {
    if (isLocked) return;
    const swipeThreshold = 90;
    const velocityThreshold = 550;

    const passedDistance = Math.abs(info.offset.x) >= swipeThreshold;
    const passedVelocity = Math.abs(info.velocity.x) >= velocityThreshold;

    if (passedDistance || passedVelocity) {
      const direction = info.offset.x < 0 || info.velocity.x < -velocityThreshold ? -1 : 1;
      commitSwipe(direction, x.get());
    } else {
      animate(x, 0, {
        type: 'spring',
        stiffness: 420,
        damping: 35,
      });
    }
  };

  const handlePrev = () => {
    if (isLocked || itemCount < 2) return;
    commitSwipe(-1, 0);
  };

  const handleNext = () => {
    if (isLocked || itemCount < 2) return;
    commitSwipe(1, 0);
  };

  // Keyboard navigation
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
  }, [handlePrev, handleNext]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isHovered || isLocked || itemCount < 2) return;

    const timer = setTimeout(() => {
      commitSwipe(1, 0);
    }, autoplayDelay * 1000);

    return () => clearTimeout(timer);
  }, [autoplay, autoplayDelay, commitSwipe, isHovered, isLocked, itemCount]);

  // Build ordered stack items (up to 4 visible layers)
  const visibleLayers = useMemo(() => {
    const layers = [];
    const maxVisible = Math.min(itemCount, 4);

    for (let depth = maxVisible - 1; depth >= 0; depth--) {
      const cardIndex = modulo(currentIndex + depth, itemCount);
      layers.push({
        card: cards[cardIndex],
        depth,
        sourceIndex: cardIndex,
      });
    }
    return layers;
  }, [cards, currentIndex, itemCount]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full flex flex-col items-center select-none ${className}`}
    >
      {/* ──────────────────────────────────────────────────────────
          3D STACKED CARD CONTAINER
      ─────────────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-xl aspect-16/10 sm:aspect-16/9 h-[380px] sm:h-[420px] flex items-center justify-center">
        {visibleLayers.map(({ card, depth, sourceIndex }) => {
          const isTopCard = depth === 0;

          // Depth styling (Sotnichenko Stack Formula - enhanced visibility)
          const offsetY = depth * 14;
          const scale = Math.max(0.72, 1 - depth * 0.05);
          const opacity = Math.max(0.5, 1 - depth * 0.15);
          const cardRotation = deterministicRotation(sourceIndex, 3.5);

          if (isTopCard) {
            return (
              <motion.div
                key={card.id}
                role="group"
                aria-label={`Card ${sourceIndex + 1}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
                style={{
                  x,
                  rotate,
                  scale: 1,
                  opacity: 1,
                  zIndex: 40,
                }}
                className="absolute inset-0 m-auto w-[92%] sm:w-[94%] h-[90%] sm:h-[92%] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-600/80 shadow-2xl bg-slate-900 group"
              >
                {/* Background Image - High Visibility, Black Gradient Completely Removed */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    draggable={false}
                    className="w-full h-full object-cover object-center filter brightness-105 contrast-105 saturate-110"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between z-10 pointer-events-none">
                  {/* Top Bar: Eyebrow Tag & Drag Indicator */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-blue-400/40 text-xs font-mono font-bold text-blue-300 shadow-md">
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      <span>{card.eyebrow}</span>
                    </span>

                    <span className="text-[11px] font-mono text-slate-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                      Swipe or drag ⇄
                    </span>
                  </div>

                  {/* Bottom Text & Tools Badges in Frosted High-Contrast Container */}
                  <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/15 shadow-xl">
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg line-clamp-3">
                      {card.description}
                    </p>

                    {card.tools && card.tools.length > 0 && (
                      <div className="pt-1.5 flex flex-wrap gap-1.5">
                        {card.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono font-medium text-slate-200 shadow-2xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          }

          // Inactive stacked background cards with enhanced visibility
          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                y: offsetY,
                scale,
                opacity,
                rotate: cardRotation,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 32,
              }}
              style={{
                zIndex: 40 - depth * 10,
              }}
              className="absolute inset-0 m-auto w-[92%] sm:w-[94%] h-[90%] sm:h-[92%] rounded-3xl overflow-hidden border border-slate-700 shadow-xl bg-slate-900 pointer-events-none"
            >
              <img
                src={card.image}
                alt={card.title}
                draggable={false}
                className="w-full h-full object-cover filter brightness-95"
              />
            </motion.div>
          );
        })}

        {/* ──────────────────────────────────────────────────────────
            EXITING FLYING CARD ANIMATION
        ─────────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {exitingCard && (
            <motion.div
              key={`exiting-${exitingCard.item.id}`}
              initial={{
                x: exitingCard.startX,
                y: 0,
                scale: 1,
                opacity: 1,
                rotate: baseRotation,
              }}
              animate={{
                x: exitingCard.direction * 1200,
                y: 40,
                scale: 0.95,
                opacity: 0,
                rotate: baseRotation + exitingCard.direction * 35,
              }}
              transition={{
                duration: 0.42,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              style={{ zIndex: 60 }}
              className="absolute inset-0 m-auto w-[92%] sm:w-[94%] h-[90%] sm:h-[92%] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 pointer-events-none"
            >
              <img
                src={exitingCard.item.image}
                alt={exitingCard.item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/80" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ──────────────────────────────────────────────────────────
          BOTTOM CONTROL TOOLBAR: Counter + Arrow Navigation
      ─────────────────────────────────────────────────────────── */}
      <div className="mt-6 flex items-center justify-between w-full max-w-xl px-4">
        {/* Left Side: Counter Pill */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 font-bold">
            0{currentIndex + 1} / 0{itemCount}
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
            {cards[currentIndex]?.eyebrow}
          </span>
        </div>

        {/* Right Side: Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isLocked}
            aria-label="Previous card in stack"
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-95 disabled:opacity-50 border border-slate-700/80 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isLocked}
            aria-label="Next card in stack"
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-50 border border-blue-500 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
