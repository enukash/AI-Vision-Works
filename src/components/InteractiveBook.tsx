import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute } from '../types';
import { StatCounter } from './StatCounter';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Workflow, 
  TrendingUp, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Clock
} from 'lucide-react';

interface InteractiveBookProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const InteractiveBook: React.FC<InteractiveBookProps> = ({ onNavigate }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Desktop Book Dimensions (>= 768px)
  const [dimensions, setDimensions] = useState({
    width: 370,
    height: 530,
    borderRadius: 14,
  });

  // Desktop State (3 double-sided leaves: 0 = closed, 1 = spread 1, 2 = spread 2, 3 = back cover)
  const [flippedCount, setFlippedCount] = useState(0);
  const [isBookClosed, setIsBookClosed] = useState(true);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);
  const [isCascadingBack, setIsCascadingBack] = useState(false);

  // Mobile State (1 to 6 single pages)
  const [mobilePage, setMobilePage] = useState(1);
  const [mobileDirection, setMobileDirection] = useState<1 | -1>(1);

  // Touch swipe tracking for mobile
  const touchStartX = useRef<number | null>(null);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);

      if (w < 1024) {
        setDimensions({
          width: 320,
          height: 490,
          borderRadius: 12,
        });
      } else {
        setDimensions({
          width: 370,
          height: 530,
          borderRadius: 14,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalLeaves = 3;
  const isMobile = windowWidth < 768;

  // --- DESKTOP FLIP HANDLERS ---
  const flipNext = () => {
    if (isCascadingBack) return;

    // When on the last page (Back Cover), clicking once again flips all pages back to front cover!
    if (flippedCount >= totalLeaves) {
      flipCascadeBack();
      return;
    }

    if (flippedCount === 0) {
      setIsBookClosed(false);
    }

    const nextIndex = flippedCount;
    setFlippingIndex(nextIndex);
    setFlippedCount(prev => prev + 1);

    setTimeout(() => {
      setFlippingIndex(null);
    }, 700);
  };

  const flipPrev = () => {
    if (isCascadingBack || flippedCount <= 0) return;

    const target = flippedCount - 1;
    setFlippingIndex(target);
    setFlippedCount(target);

    if (target === 0) {
      setTimeout(() => {
        setIsBookClosed(true);
      }, 400);
    }

    setTimeout(() => {
      setFlippingIndex(null);
    }, 700);
  };

  // Cascading reverse flip: animates each page flipping backward in sequence to close back to the cover!
  const flipCascadeBack = async () => {
    if (isCascadingBack || flippedCount === 0) return;
    setIsCascadingBack(true);

    // Close the container position
    setIsBookClosed(true);

    // Staggered reverse flip of leaves: leaf 2 -> leaf 1 -> leaf 0
    for (let i = flippedCount; i > 0; i--) {
      setFlippingIndex(i - 1);
      setFlippedCount(i - 1);
      await new Promise(resolve => setTimeout(resolve, 190));
    }

    setFlippingIndex(null);
    setIsCascadingBack(false);
  };

  const resetDesktopBook = () => {
    flipCascadeBack();
  };

  const jumpToLeaf = (targetLeaf: number) => {
    if (isCascadingBack) return;
    if (targetLeaf === 0) {
      flipCascadeBack();
    } else {
      setIsBookClosed(false);
      setFlippingIndex(targetLeaf - 1);
      setFlippedCount(targetLeaf);
      setTimeout(() => setFlippingIndex(null), 700);
    }
  };

  // --- MOBILE FLIP HANDLERS (1 to 6) ---
  const mobileNext = () => {
    // When on the last page (Back Cover), clicking once again flips back to the cover page!
    if (mobilePage >= 6) {
      setMobileDirection(-1);
      setMobilePage(1);
    } else {
      setMobileDirection(1);
      setMobilePage(prev => prev + 1);
    }
  };

  const mobilePrev = () => {
    if (mobilePage <= 1) return;
    setMobileDirection(-1);
    setMobilePage(prev => prev - 1);
  };

  const mobileJump = (page: number) => {
    setMobileDirection(page > mobilePage ? 1 : -1);
    setMobilePage(page);
  };

  // Mobile Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;

    if (diff > 45) {
      mobileNext();
    } else if (diff < -45) {
      mobilePrev();
    }
  };

  // --- SHARED PAGE RENDERERS ---

  // Page 1: Front Cover with Embedded AI Artwork Image
  const renderFrontCover = (forMobile = false) => (
    <div className={`w-full h-full bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col justify-between relative overflow-hidden select-none border-l-4 border-l-blue-600 shadow-2xl ${
      forMobile ? 'p-5 rounded-2xl' : 'p-6 sm:p-7'
    }`}>
      {/* Decorative Book Foil Corner & Background Mesh */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-400 via-indigo-300 to-blue-500 opacity-60" />

      {/* Top Foil Header */}
      <div>
        <div className="flex items-center justify-between text-[11px] text-blue-400 font-mono uppercase tracking-widest pb-2.5 border-b border-white/10">
          <span className="flex items-center gap-1.5 font-bold">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            Vol. I · Executive Edition
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-semibold border border-blue-400/30">
            Interactive 3D
          </span>
        </div>

        {/* Embossed Book Title */}
        <div className="mt-3 sm:mt-4 space-y-1">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-blue-400 font-mono">
            Turning Problems Into Solutions
          </span>
          <h2 className="text-lg sm:text-xl font-black font-heading tracking-tight text-white leading-tight">
            THE AI GENERALIST PLAYBOOK
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 font-light leading-relaxed line-clamp-2">
            Why unified full-stack AI engineering outperforms fragmented specialized agencies.
          </p>
        </div>
      </div>

      {/* Inlaid Featured Cover Artwork Image */}
      <div className="relative my-2 sm:my-3 rounded-xl overflow-hidden border border-white/20 shadow-xl group/cover flex-1 max-h-[170px] sm:max-h-[190px] bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
          alt="The AI Generalist Architecture Blueprint"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/cover:scale-105"
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
        
        {/* Artwork Badge Overlay */}
        <div className="absolute top-2 left-2 bg-slate-950/75 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-bold text-blue-300 border border-white/10 flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span>Cognitive Systems Blueprint</span>
        </div>

        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-slate-200">
          <span className="font-mono text-slate-300 truncate text-[10px]">Multi-Modal AI Architecture</span>
          <span className="text-blue-400 font-bold text-[10px]">2025 Ed.</span>
        </div>
      </div>

      {/* Book Bottom Credential & Callout */}
      <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400">Author</div>
          <div className="text-xs font-bold text-white">Alex Mercer · AI Architect</div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-950 font-bold text-xs shadow-sm hover:bg-blue-400 transition-colors">
          <span>{forMobile ? 'Tap to Read' : 'Tap to Open'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
        </div>
      </div>
    </div>
  );

  // Page 2: Table of Contents & Preface
  const renderInsideCoverPreface = (forMobile = false) => (
    <div className={`w-full h-full bg-slate-50 text-slate-900 flex flex-col justify-between select-none border-r border-slate-200 ${
      forMobile ? 'p-6 rounded-2xl' : 'p-6 sm:p-7'
    }`}>
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 pb-2.5 border-b border-slate-200">
          <span>Table of Contents</span>
          <span>Inside Cover</span>
        </div>

        <h3 className="text-base sm:text-lg font-black font-heading text-slate-950 mt-4 mb-1.5">
          Unified Mindset vs. Agency Silos
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Traditional projects struggle because design, AI, frontend, and backend operate separately. Here is how unified engineering wins:
        </p>

        {/* Left to right pan Animation at this Component */}
        <div className="space-y-2.5 relative overflow-hidden rounded-2xl p-1 -m-1">
          {/* Continuous Left-to-Right Panning Shimmer Light Beam */}
          <div 
            className="absolute inset-y-0 w-2/3 bg-linear-to-r from-transparent via-blue-500/15 to-transparent pointer-events-none -skew-x-12 animate-pan-shimmer z-10"
            aria-hidden="true"
          />

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => { 
              e.stopPropagation(); 
              if (forMobile) mobileJump(3); 
              else jumpToLeaf(1); 
            }}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition-all duration-300 flex items-center justify-between cursor-pointer group hover:translate-x-1.5 hover:shadow-xs relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 font-mono text-xs font-bold flex items-center justify-center transition-transform group-hover:scale-105">01</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">One Unified Workflow</h4>
                <p className="text-[10px] text-slate-500">Zero hand-off dilution</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => { 
              e.stopPropagation(); 
              if (forMobile) mobileJump(4); 
              else jumpToLeaf(2); 
            }}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition-all duration-300 flex items-center justify-between cursor-pointer group hover:translate-x-1.5 hover:shadow-xs relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 font-mono text-xs font-bold flex items-center justify-center transition-transform group-hover:scale-105">02</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Days, Not Quarters</h4>
                <p className="text-[10px] text-slate-500">10x faster execution</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => { 
              e.stopPropagation(); 
              if (forMobile) mobileJump(5); 
              else jumpToLeaf(3); 
            }}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition-all duration-300 flex items-center justify-between cursor-pointer group hover:translate-x-1.5 hover:shadow-xs relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 font-mono text-xs font-bold flex items-center justify-center transition-transform group-hover:scale-105">03</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Deterministic Reliability</h4>
                <p className="text-[10px] text-slate-500">Enterprise guardrails</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
        <span className="text-blue-600 font-semibold">{forMobile ? 'Next: Chapter 1' : 'Tap right page for Chapter 1'}</span>
        <span>Page ii</span>
      </div>
    </div>
  );

  // Page 3: Chapter 1
  const renderChapter1 = (forMobile = false) => (
    <div className={`w-full h-full bg-white text-slate-900 flex flex-col justify-between select-none border-l border-slate-100 ${
      forMobile ? 'p-6 rounded-2xl' : 'p-6 sm:p-7'
    }`}>
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-blue-600 font-bold pb-2.5 border-b border-slate-100">
          <span className="flex items-center gap-1.5">
            <Workflow className="w-3.5 h-3.5" />
            Chapter 01
          </span>
          <span className="text-slate-400">Page 1</span>
        </div>

        <div className="mt-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3 border border-blue-100 shadow-2xs">
            <Workflow className="w-5 h-5" />
          </div>

          <h3 className="text-base sm:text-lg font-black font-heading text-slate-950 leading-snug">
            Everything Connected in One Workflow
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            No need to juggle separate design agencies, frontend contractors, and AI consultants. I bridge UI design, cognitive inference, API services, and schemas into one cohesive pipeline.
          </p>
        </div>

        <div className="mt-4 space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
          <div className="flex items-start gap-2 text-xs text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Zero Handoff Friction:</strong> What is envisioned in design is built in code without dilution.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Direct Execution:</strong> Rapid commits and functional prototypes every sprint.</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
        <span className="text-slate-400 font-normal">Workflow Advantage</span>
        <span className="flex items-center gap-1">
          {forMobile ? 'Next: Chapter 2' : 'Tap to turn page'}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );

  // Page 4: Chapter 2
  const renderChapter2 = (forMobile = false) => {
    const isChapter2Active = forMobile ? mobilePage === 4 : flippedCount >= 2;

    return (
    <div className={`w-full h-full bg-slate-50 text-slate-900 flex flex-col justify-between select-none border-r border-slate-200 ${
      forMobile ? 'p-6 rounded-2xl' : 'p-6 sm:p-7'
    }`}>
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-blue-600 font-bold pb-2.5 border-b border-slate-200">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Chapter 02
          </span>
          <span className="text-slate-400">Page 2</span>
        </div>

        <div className="mt-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold mb-3 shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </div>

          <h3 className="text-base sm:text-lg font-black font-heading text-slate-950 leading-snug">
            From Idea to Working Product, Fast
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Instead of spending months drafting speculative slide decks, I deliver functioning prototypes in days. This allows you to test hypotheses with live users immediately.
          </p>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Build Velocity</div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <StatCounter
              key={`stat-ch2-${forMobile ? mobilePage : flippedCount}`}
              active={isChapter2Active}
              value={10}
              startValue={0}
              step={1}
              suffix="x"
              duration={1.6}
              valueSize={28}
              valueColor="#0f172a"
              fontWeight={900}
              replayOnHover={true}
            />
            <span className="text-xl sm:text-2xl font-black font-heading text-slate-950">
              Faster Turnaround
            </span>
          </div>
          <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Functional MVP in 5–7 business days</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <span className="text-slate-400">Page 2</span>
        <span className="text-blue-600 font-semibold">{forMobile ? 'Next: Chapter 3' : 'Speed Advantage'}</span>
      </div>
    </div>
    );
  };

  // Page 5: Chapter 3
  const renderChapter3 = (forMobile = false) => (
    <div className={`w-full h-full bg-white text-slate-900 flex flex-col justify-between select-none border-l border-slate-100 ${
      forMobile ? 'p-6 rounded-2xl' : 'p-6 sm:p-7'
    }`}>
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-blue-600 font-bold pb-2.5 border-b border-slate-100">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Chapter 03
          </span>
          <span className="text-slate-400">Page 3</span>
        </div>

        <div className="mt-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3 border border-blue-100 shadow-2xs">
            <ShieldCheck className="w-5 h-5" />
          </div>

          <h3 className="text-base sm:text-lg font-black font-heading text-slate-950 leading-snug">
            Reliable AI That You Can Trust
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            I build AI architectures with deterministic boundaries, strict schema validation, type safety, and fallbacks. Your system behaves predictably in production.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="font-bold text-slate-900 text-xs">Type-Safe LLM</div>
            <div className="text-[10px] text-slate-500">Schema Enforcement</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="font-bold text-slate-900 text-xs">Zero Drift</div>
            <div className="text-[10px] text-slate-500">Grounded Domain Context</div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
        <span className="text-slate-400 font-normal">Reliability Advantage</span>
        <span className="flex items-center gap-1">
          {forMobile ? 'Next: Back Cover' : 'Turn to Back Cover'}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );

  // Page 6: Back Cover
  const renderBackCover = (forMobile = false) => (
    <div className={`w-full h-full bg-linear-to-bl from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col justify-between relative overflow-hidden select-none border-r-4 border-r-blue-600 shadow-2xl ${
      forMobile ? 'p-6 rounded-2xl' : 'p-7 sm:p-8'
    }`}>
      <div className="absolute top-0 left-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-blue-400 pb-2.5 border-b border-white/10 flex items-center justify-between">
          <span>Back Cover</span>
          <span>Next Steps</span>
        </div>

        <div className="mt-5 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
            Ready to Build?
          </span>
          <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight text-white">
            Let's Architect Your AI Solution
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Connect directly with an engineer who transforms your strategic roadmap into scalable software.
          </p>
        </div>

        <div className="mt-5 space-y-2.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('projects');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer pointer-events-auto"
          >
            <span>Explore Case Studies</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('contact');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer pointer-events-auto"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
        <div className="font-mono text-[9px] text-slate-400">
          ISBN 978-0-AI-GEN-2025
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (forMobile) mobileJump(1);
            else flipCascadeBack();
          }}
          className="text-blue-400 hover:text-white flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors px-2 py-1 rounded bg-white/10"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Flip to Front Cover</span>
        </button>
      </div>
    </div>
  );

  // Desktop leaf structure
  const leaves = [
    { front: () => renderFrontCover(false), back: () => renderInsideCoverPreface(false) },
    { front: () => renderChapter1(false), back: () => renderChapter2(false) },
    { front: () => renderChapter3(false), back: () => renderBackCover(false) },
  ];

  // Mobile page list
  const mobilePages = [
    { id: 1, title: 'Cover', render: () => renderFrontCover(true) },
    { id: 2, title: 'Contents', render: () => renderInsideCoverPreface(true) },
    { id: 3, title: 'Workflow', render: () => renderChapter1(true) },
    { id: 4, title: 'Velocity', render: () => renderChapter2(true) },
    { id: 5, title: 'Reliability', render: () => renderChapter3(true) },
    { id: 6, title: 'Back Cover', render: () => renderBackCover(true) },
  ];

  const closedBookShadow = "0 22px 38px -10px rgba(15, 23, 42, 0.45), 0 8px 16px -6px rgba(15, 23, 42, 0.3)";

  return (
    <div className="relative w-full flex flex-col items-center select-none overflow-x-clip" id="interactive-book-section-wrapper">
      
      {/* ──────────────────────────────────────────────────────────
          MOBILE PRESENTATION (< 768px):
          Dedicated Single-Page 3D Flipbook — 100% full-width, zero clipping, zero horizontal overflow!
      ─────────────────────────────────────────────────────────── */}
      {isMobile ? (
        <div className="w-full max-w-sm mx-auto flex flex-col items-center px-2">
          {/* Mobile Toolbar */}
          <div className="w-full flex items-center justify-between gap-2 mb-4 bg-slate-100/90 p-2 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {mobilePage}
              </span>
              <div className="leading-tight">
                <div className="text-xs font-bold text-slate-900 font-heading">
                  {mobilePages[mobilePage - 1].title}
                </div>
                <div className="text-[10px] text-slate-500">
                  Page {mobilePage} of 6 {mobilePage === 6 ? '· Tap to flip back' : ''}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={mobilePrev}
                disabled={mobilePage === 1}
                aria-label="Previous Page"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-30 active:scale-95 shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={mobileNext}
                aria-label={mobilePage === 6 ? "Flip Back to Cover" : "Next Page"}
                className={`w-8 h-8 rounded-full text-white flex items-center justify-center active:scale-95 shadow-2xs cursor-pointer ${
                  mobilePage === 6 ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                title={mobilePage === 6 ? "Flip Back to Cover" : "Next Page"}
              >
                {mobilePage === 6 ? <RotateCcw className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => mobileJump(1)}
                title="Reset to Cover"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center active:scale-95 shadow-2xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile Reading Progress Bar */}
          <div className="w-full h-1 bg-slate-200 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(mobilePage / 6) * 100}%` }}
            />
          </div>

          {/* Mobile 3D Page Viewport */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('button') || target.closest('a')) return;
              // If on last page (page 6), clicking it flips back to cover!
              if (mobilePage === 6) {
                mobileNext();
                return;
              }
              // Otherwise: tap right side = next, tap left side = prev
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              if (clickX > rect.width * 0.45) {
                mobileNext();
              } else {
                mobilePrev();
              }
            }}
            className="w-full relative cursor-pointer"
            style={{
              height: 490,
              perspective: 1200,
            }}
          >
            <AnimatePresence mode="wait" custom={mobileDirection}>
              <motion.div
                key={mobilePage}
                custom={mobileDirection}
                variants={{
                  enter: (dir: number) => ({
                    rotateY: dir > 0 ? 80 : -80,
                    opacity: 0,
                    scale: 0.94,
                    transformOrigin: dir > 0 ? 'right center' : 'left center',
                  }),
                  center: {
                    rotateY: 0,
                    opacity: 1,
                    scale: 1,
                    transformOrigin: 'center center',
                    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  },
                  exit: (dir: number) => ({
                    rotateY: dir > 0 ? -80 : 80,
                    opacity: 0,
                    scale: 0.94,
                    transformOrigin: dir > 0 ? 'left center' : 'right center',
                    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  inset: 0,
                  transformStyle: 'preserve-3d',
                }}
              >
                {mobilePages[mobilePage - 1].render()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Bottom Navigation Pills & Tap Indicator */}
          <div className="w-full flex items-center justify-between mt-4 px-1 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              {mobilePage === 6 ? 'Tap to flip back to Cover' : 'Swipe or tap edge to turn'}
            </span>

            {/* Quick Page Jump Dots */}
            <div className="flex items-center gap-1.5">
              {mobilePages.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => mobileJump(p.id)}
                  aria-label={`Jump to ${p.title}`}
                  className={`rounded-full transition-all cursor-pointer ${
                    mobilePage === p.id 
                      ? 'w-5 h-2 bg-blue-600' 
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ──────────────────────────────────────────────────────────
            DESKTOP / TABLET PRESENTATION (>= 768px):
            Full 2-Page 3D Interactive Open Book Spread with Framer Mechanics
        ─────────────────────────────────────────────────────────── */
        <div className="w-full flex flex-col items-center">
          {/* Desktop Toolbar */}
          <div className="w-full max-w-4xl flex items-center justify-between gap-3 mb-6 px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 font-heading">
                  {flippedCount === 0 
                    ? 'Front Cover (Closed)' 
                    : flippedCount === 1 
                      ? 'Spread 1 · Contents & Ch. 1' 
                      : flippedCount === 2 
                        ? 'Spread 2 · Ch. 2 & Ch. 3' 
                        : 'Spread 3 · Back Cover (End)'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {flippedCount === 0 
                    ? 'Click cover to open' 
                    : flippedCount === totalLeaves 
                      ? 'Click anywhere to flip all pages back to front cover'
                      : 'Click right page to turn next · Click left page to turn back'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => jumpToLeaf(0)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    flippedCount === 0 ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cover
                </button>
                <button
                  type="button"
                  onClick={() => jumpToLeaf(1)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    flippedCount === 1 ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ch. 1
                </button>
                <button
                  type="button"
                  onClick={() => jumpToLeaf(2)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    flippedCount === 2 ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ch. 2 & 3
                </button>
                <button
                  type="button"
                  onClick={() => jumpToLeaf(3)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    flippedCount === 3 ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Back
                </button>
              </div>

              <button
                type="button"
                onClick={flipPrev}
                disabled={flippedCount === 0 || isCascadingBack}
                aria-label="Previous Page"
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-30 disabled:pointer-events-none active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={flipNext}
                disabled={isCascadingBack}
                aria-label={flippedCount === totalLeaves ? "Flip back to cover" : "Next Page"}
                className={`w-9 h-9 rounded-full border transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95 ${
                  flippedCount === totalLeaves
                    ? 'bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-blue-600'
                }`}
                title={flippedCount === totalLeaves ? "Flip back to cover" : "Next Page"}
              >
                {flippedCount === totalLeaves ? (
                  <RotateCcw className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={resetDesktopBook}
                disabled={isCascadingBack}
                title="Reset & flip back to cover"
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Desktop 3D Viewport Stage */}
          <div
            className="w-full flex justify-center items-center py-6 sm:py-8"
            style={{
              perspective: 2500,
              minHeight: dimensions.height + 40,
            }}
          >
            <motion.div
              animate={{
                x: isBookClosed ? 0 : dimensions.width / 2,
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('button') || target.closest('a')) return;
                // If on last page (all leaves flipped to left), clicking anywhere on the book flips back to cover!
                if (flippedCount === totalLeaves) {
                  flipCascadeBack();
                }
              }}
              className="relative transition-shadow cursor-pointer"
              style={{
                width: dimensions.width,
                height: dimensions.height,
                transformStyle: 'preserve-3d',
                boxShadow: isBookClosed ? closedBookShadow : '0 15px 30px rgba(0,0,0,0.15)',
              }}
            >
              {/* Drop Shadow underneath open book spread */}
              {!isBookClosed && (
                <div 
                  className="absolute -inset-x-full bottom-[-20px] h-12 bg-black/15 blur-xl rounded-full pointer-events-none"
                  style={{ transform: `translateX(${dimensions.width / 4}px)` }}
                />
              )}

              {/* Spine Binding Effect */}
              {!isBookClosed && (
                <div 
                  className="absolute left-0 top-0 bottom-0 w-[4px] bg-slate-300 z-50 shadow-inner"
                  style={{ transform: 'translateX(-2px)' }}
                />
              )}

              {/* Render Desktop Leaves */}
              {leaves.map((leaf, index) => {
                const isFlipped = index < flippedCount;
                const isFlipping = index === flippingIndex;

                const zOffset = isFlipped ? index * 0.5 : (totalLeaves - index) * 0.5;
                const zIndex = isFlipping ? 100 : isFlipped ? index + 1 : totalLeaves - index;

                return (
                  <motion.div
                    key={`leaf-${index}`}
                    animate={{
                      rotateY: isFlipped ? -180 : 0,
                    }}
                    transition={{
                      duration: 0.65,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transformOrigin: 'left center',
                      transformStyle: 'preserve-3d',
                      zIndex: zIndex,
                      transform: `translateZ(${zOffset}px)`,
                      willChange: 'transform',
                    }}
                  >
                    {/* Front Face (Right Page) */}
                    <div
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.closest('button') || target.closest('a')) return;
                        e.stopPropagation();

                        if (isBookClosed) {
                          flipNext();
                        } else if (flippedCount < totalLeaves) {
                          flipNext();
                        } else {
                          // Last page: flip all pages back to cover!
                          flipCascadeBack();
                        }
                      }}
                      className="cursor-pointer"
                      title={flippedCount >= totalLeaves ? "Click to flip back to cover" : "Click to turn forward"}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        borderRadius: `0px ${dimensions.borderRadius}px ${dimensions.borderRadius}px 0px`,
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {leaf.front()}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '12%',
                          background: 'linear-gradient(to right, rgba(0,0,0,0.12), transparent)',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>

                    {/* Back Face (Left Page) */}
                    <div
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.closest('button') || target.closest('a')) return;
                        e.stopPropagation();

                        // If on the last page (Back Cover), clicking it flips all pages back to front cover!
                        if (flippedCount === totalLeaves) {
                          flipCascadeBack();
                        } else {
                          flipPrev();
                        }
                      }}
                      className="cursor-pointer"
                      title={flippedCount === totalLeaves ? "Click to flip back to front cover" : "Click to turn back"}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        transform: 'rotateY(180deg) translateZ(0.01px)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        borderRadius: `${dimensions.borderRadius}px 0px 0px ${dimensions.borderRadius}px`,
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {leaf.back()}
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: '12%',
                          background: 'linear-gradient(to left, rgba(0,0,0,0.12), transparent)',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Desktop Bottom Status Tip */}
          <div className="flex items-center justify-between w-full max-w-4xl gap-2 mt-4 px-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>
                {flippedCount === totalLeaves 
                  ? 'At the end: Click the book or "Next" to flip all pages back to the Front Cover' 
                  : 'Click the Right Page to turn forward · Click the Left Page to turn backward'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={flipPrev}
                disabled={flippedCount === 0 || isCascadingBack}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 font-semibold cursor-pointer transition-colors"
              >
                ← Previous
              </button>
              <span className="font-mono text-slate-400">
                {flippedCount} / {totalLeaves}
              </span>
              <button
                type="button"
                onClick={flipNext}
                disabled={isCascadingBack}
                className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                  flippedCount === totalLeaves
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {flippedCount === totalLeaves ? 'Flip Back ↺' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
