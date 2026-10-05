import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  ArrowRight, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Cpu, 
  Zap, 
  Layers, 
  Code2, 
  Palette, 
  CheckCircle2,
  Workflow
} from 'lucide-react';
import { PageRoute } from '../types';
import { GlowButton } from './GlowButton';
import { EyeFollowButton } from './EyeFollowButton';

export interface SceneTheme {
  id: string;
  name: string;
  tag: string;
  headlinePrefix: string;
  headlineHighlight: string;
  description: string;
  bgImage: string;
  cardImage: string;
  accentColor: string;
  glowColor: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  telemetry: {
    label: string;
    value: string;
    sublabel: string;
  };
  tags: string[];
}

export const SCENE_THEMES: SceneTheme[] = [
  {
    id: 'scene-automation',
    name: 'AI Automation',
    tag: 'SMART AI WORKFLOWS',
    headlinePrefix: 'Automate everyday business tasks with',
    headlineHighlight: 'Autonomous AI Agents',
    description: 'I build smart AI agents that handle repetitive tasks, connect to your existing software, and work 24/7 without costly human delays.',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85',
    cardImage: '/assets/images/robot_ai_solutions_1789208998741.jpg',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    badge: '01 · Autonomous AI Agents',
    icon: Workflow,
    telemetry: {
      label: 'Active Automations',
      value: '14 Workflows',
      sublabel: 'Fast & Reliable Execution',
    },
    tags: ['AI Agents', 'Task Automation', 'API Integrations', 'Smart Workflows'],
  },
  {
    id: 'scene-graphics',
    name: 'Brand & Design',
    tag: 'MODERN BRAND DESIGN',
    headlinePrefix: 'Build a memorable visual identity with',
    headlineHighlight: 'Modern Brand Systems',
    description: 'From logos and color palettes to website design systems, I help companies look polished, trustworthy, and ready to win customers.',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=85',
    cardImage: '/assets/images/robot_turning_bulb_1789365471785.jpg',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    badge: '02 · Brand & Design Systems',
    icon: Palette,
    telemetry: {
      label: 'Brand Consistency',
      value: 'Complete Systems',
      sublabel: 'Logos, Fonts & Guidelines',
    },
    tags: ['Logo Design', 'Brand Identity', 'Figma Systems', 'Visual Design'],
  },
  {
    id: 'scene-cognitive',
    name: 'Prompt Engineering',
    tag: 'PRECISE AI PROMPTS',
    headlinePrefix: 'Get reliable, accurate answers from',
    headlineHighlight: 'Expert Prompt Design',
    description: 'I craft custom prompts, instructions, and guardrails so your AI gives consistent, high-quality answers without making mistakes.',
    bgImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1920&q=85',
    cardImage: '/assets/images/robot_thinking_wide_1789365436523.jpg',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    badge: '03 · Prompt Engineering',
    icon: Cpu,
    telemetry: {
      label: 'Answer Quality',
      value: 'High Accuracy',
      sublabel: 'Clear Rules & Guardrails',
    },
    tags: ['Prompt Engineering', 'ChatGPT & Claude', 'AI Testing', 'Safe AI Guardrails'],
  },
  {
    id: 'scene-prototyping',
    name: 'Vibe Coding',
    tag: 'FAST WEB DEVELOPMENT',
    headlinePrefix: 'Turn ideas into working websites &',
    headlineHighlight: 'Apps in Just Days',
    description: 'Using modern AI-assisted coding and React, I quickly build clean, responsive websites, web apps, and MVPs so you can launch fast.',
    bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=85',
    cardImage: '/assets/images/robot_ai_hologram_1789209021516.jpg',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    badge: '04 · Vibe Coding & Web Apps',
    icon: Code2,
    telemetry: {
      label: 'Launch Speed',
      value: 'Days, Not Months',
      sublabel: 'Fast, Working Prototypes',
    },
    tags: ['React & Tailwind', 'Fast Web Apps', 'MVP Prototyping', 'Vibe Coding'],
  },
];

interface SoftRotateScenesHeroProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
  className?: string;
}

/**
 * SoftRotateScenesHero
 * AI Tech & Automation Graphics Theme with Soft 3D Rotation Scenes
 * 
 * Features:
 * - Autoplay enabled by default (smoothly transitions every 5.5s, no toggle button needed)
 * - Whenever user swipes up, scrolls, or timer triggers, a new image appears and the background changes to that AI tech theme
 * - Fully responsive for all screen sizes: Mobile, Tablet, Laptop, and Desktop
 * - High-tech automation and graphic design imagery with telemetry indicators
 * - Preserves branding, dark cinematic contrast, and clear typography
 */
export const SoftRotateScenesHero: React.FC<SoftRotateScenesHeroProps> = ({
  onNavigate,
  className = '',
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const lastScrollTime = useRef<number>(0);
  const autoplayTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const currentScene = SCENE_THEMES[activeIdx];
  const totalScenes = SCENE_THEMES.length;
  const AUTOPLAY_DURATION_MS = 5500;

  // Advance to next scene (swipe up / scroll down / autoplay)
  const nextScene = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('up');
    setActiveIdx(prev => (prev + 1) % totalScenes);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, totalScenes]);

  // Go to previous scene (swipe down / scroll up)
  const prevScene = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('down');
    setActiveIdx(prev => (prev === 0 ? totalScenes - 1 : prev - 1));
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, totalScenes]);

  const selectScene = (idx: number) => {
    if (idx === activeIdx || isAnimating) return;
    setIsAnimating(true);
    setDirection(idx > activeIdx ? 'up' : 'down');
    setActiveIdx(idx);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Autoplay enabled by default without any toggle button
  useEffect(() => {
    if (isHovered) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalMs = 25;
    const increment = (100 / AUTOPLAY_DURATION_MS) * intervalMs;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          nextScene();
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isHovered, nextScene]);

  // Wheel handler: scrolling down triggers swipe up (next scene)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 650) return;

      if (e.deltaY > 25) {
        lastScrollTime.current = now;
        nextScene();
      } else if (e.deltaY < -25) {
        lastScrollTime.current = now;
        prevScene();
      }
    },
    [nextScene, prevScene]
  );

  // Touch handlers for mobile swipe up / down
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    // Swiped up -> next scene
    if (diff > 40) {
      nextScene();
    } else if (diff < -40) {
      prevScene();
    }
    touchStartY.current = null;
  };

  // Cursor tracking for gentle 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x: nx, y: ny });
  };

  const SceneIcon = currentScene.icon;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className={`relative w-full overflow-hidden border-b border-slate-800/80 bg-slate-950 text-white select-none transition-all duration-700 min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between ${className}`}
      style={{
        perspective: '1000px',
      }}
    >
      {/* ──────────────────────────────────────────────────────────
          1. FULL BLEED AI TECH AUTOMATION BACKGROUND SCENES
          Smooth cross-fade syncing with active scene
      ─────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {SCENE_THEMES.map((scene, idx) => {
          const isActive = idx === activeIdx;
          return (
            <motion.div
              key={scene.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.06,
              }}
              transition={{
                opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 1.5, ease: 'easeOut' },
              }}
              className="absolute inset-0 will-change-transform"
            >
              <img
                src={scene.bgImage}
                alt={scene.name}
                draggable={false}
                className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-125 saturate-120"
              />
              <div 
                className="absolute inset-0 mix-blend-color"
                style={{ backgroundColor: scene.accentColor, opacity: 0.15 }}
              />
            </motion.div>
          );
        })}

        {/* High-Tech Circuit & Neural Grid Overlay Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Vignette Overlay for focus & typography contrast */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 75% 45%, rgba(0,0,0,0.1) 15%, rgba(2, 6, 23, 0.92) 85%)',
          }}
        />

        {/* Directional scrims ensuring 100% readable text on mobile and desktop */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/80 sm:via-slate-950/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Dynamic Theme Glow Spheres */}
        <div 
          className="absolute -top-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: currentScene.glowColor }}
        />
        <div 
          className="absolute -bottom-32 right-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: currentScene.glowColor }}
        />
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. RESPONSIVE HERO BODY
          Desktop: 2-column layout (Left text, Right 3D soft rotate card)
          Mobile & Tablet: Stacked layout with centered 3D card
      ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 flex-1 flex flex-col justify-between max-w-[1680px] mx-auto">
        
        {/* Top Header Row: Status Pills & Live Autoplay Sync Meter */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-mono font-bold text-white border shadow-xs transition-colors duration-500"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                borderColor: currentScene.accentColor,
              }}
            >
              <Bot className="w-4 h-4" style={{ color: currentScene.accentColor }} />
              <span>AI Vision Works · Autonomous Studio</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/80 text-[11px] font-mono text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Automation Live</span>
            </span>
          </div>

          {/* Autoplay Progress Pill (No Button Required) */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              {isHovered ? 'Paused on hover' : 'Autoplaying scenes'}
            </span>
            <div className="w-20 sm:w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-75"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: currentScene.accentColor 
                }}
              />
            </div>
            <span className="font-bold text-[11px]" style={{ color: currentScene.accentColor }}>
              0{activeIdx + 1}/0{totalScenes}
            </span>
          </div>
        </div>

        {/* Main Content Area: Responsive Grid on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto py-2">
          
          {/* Left Column: Headlines, Narrative, & Action Buttons */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                {/* Scene Tag Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/15">
                  <SceneIcon className="w-3.5 h-3.5" />
                  <span style={{ color: currentScene.accentColor }}>{currentScene.tag}</span>
                </div>

                {/* Hero Headline */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-6xl font-black text-white tracking-tight leading-[1.12] font-heading drop-shadow-md">
                  {currentScene.headlinePrefix}{' '}
                  <span 
                    className="transition-colors duration-500 underline decoration-2 decoration-offset-4"
                    style={{ 
                      color: currentScene.accentColor,
                      textDecorationColor: currentScene.accentColor 
                    }}
                  >
                    {currentScene.headlineHighlight}
                  </span>.
                </h1>

                {/* Narrative Description */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-xl drop-shadow-xs">
                  {currentScene.description}
                </p>

                {/* Telemetry Graphic Badge */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-sm flex items-center gap-3 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentScene.accentColor }} />
                    <span className="text-slate-400">{currentScene.telemetry.label}:</span>
                    <span className="font-bold text-white">{currentScene.telemetry.value}</span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">({currentScene.telemetry.sublabel})</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <GlowButton
                variant="primary"
                onClick={() => onNavigate('projects')}
                accentColor={currentScene.accentColor}
                textColor={currentScene.id === 'scene-graphics' ? '#0f172a' : '#ffffff'}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                <span>Explore Project Work</span>
              </GlowButton>

              <EyeFollowButton
                text="View Services"
                onClick={() => onNavigate('services')}
                accentColor={currentScene.accentColor}
              />
            </div>
          </div>

          {/* Right Column: 3D Soft Rotate Card (Responsive for all screens with Mirror Reflection) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end mt-4 lg:mt-0 pb-10 sm:pb-14 lg:pb-16">
            <div 
              className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[440px] aspect-4/5 sm:aspect-14/11"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={currentScene.id}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    y: direction === 'up' ? 140 : -140,
                    rotateX: direction === 'up' ? -38 : 38,
                    rotateY: direction === 'up' ? 18 : -18,
                    rotateZ: direction === 'up' ? -10 : 10,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: mousePos.y * -8,
                    rotateY: mousePos.x * 12,
                    rotateZ: mousePos.x * 3,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: direction === 'up' ? -180 : 180,
                    rotateX: direction === 'up' ? 44 : -44,
                    rotateY: direction === 'up' ? -18 : 18,
                    rotateZ: direction === 'up' ? 12 : -12,
                    scale: 0.88,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 will-change-transform cursor-pointer group"
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={nextScene}
                  title="Click or swipe up to reveal next AI scene"
                >
                  {/* Main Foreground 3D Card */}
                  <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                    {/* Foreground AI Tech Artwork Image */}
                    <img
                      src={currentScene.cardImage}
                      alt={currentScene.name}
                      draggable={false}
                      className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-104 transition-transform duration-700"
                    />

                    {/* Gradient Scrim for text overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/30 to-transparent pointer-events-none" />

                    {/* Top Badge on Card */}
                    <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-10">
                      <span 
                        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md text-[11px] sm:text-xs font-mono font-bold text-white shadow-sm border"
                        style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.8)',
                          borderColor: currentScene.accentColor,
                        }}
                      >
                        <Sparkles className="w-3 h-3" style={{ color: currentScene.accentColor }} />
                        <span>{currentScene.badge}</span>
                      </span>

                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/80" />
                    </div>

                    {/* Bottom Card Copy & Tech Tags */}
                    <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 pointer-events-none z-10 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span 
                          className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-extrabold"
                          style={{ color: currentScene.accentColor }}
                        >
                          {currentScene.tag}
                        </span>
                        <span className="text-[10px] font-mono text-slate-300 bg-slate-950/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                          Swipe up ⇅
                        </span>
                      </div>

                      <div className="text-sm sm:text-base font-bold font-heading text-white line-clamp-1">
                        {currentScene.name}
                      </div>

                      {/* Tool Badges */}
                      <div className="pt-1 flex flex-wrap gap-1">
                        {currentScene.tags.slice(0, 3).map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs border border-white/10 text-[10px] font-mono text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Surface Horizon Glow Line */}
                  <div 
                    className="absolute -bottom-1 inset-x-6 h-[2px] rounded-full blur-[1px] opacity-75 pointer-events-none transition-colors duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${currentScene.accentColor} 50%, transparent 100%)`,
                    }}
                  />

                  {/* Real Mirror Reflection of the Swiped Image */}
                  <div 
                    className="absolute top-[calc(100%+6px)] sm:top-[calc(100%+8px)] inset-x-0 h-[45%] sm:h-[50%] pointer-events-none rounded-2xl sm:rounded-3xl overflow-hidden opacity-60 sm:opacity-70 select-none will-change-transform"
                    style={{
                      transform: 'scaleY(-1)',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 45%, transparent 85%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 45%, transparent 85%)',
                    }}
                    aria-hidden="true"
                  >
                    <img
                      src={currentScene.cardImage}
                      alt=""
                      draggable={false}
                      className="w-full h-full object-cover object-center filter brightness-90 contrast-110 blur-[0.4px]"
                    />
                    {/* Atmospheric color tint on the reflection */}
                    <div 
                      className="absolute inset-0 mix-blend-color opacity-30"
                      style={{ backgroundColor: currentScene.accentColor }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Theme Navigation Toolbar */}
        <div className="pt-4 sm:pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 mt-4">
          
          {/* Scene Switcher Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {SCENE_THEMES.map((scene, idx) => {
              const isSelected = idx === activeIdx;
              const Icon = scene.icon;
              return (
                <button
                  key={scene.id}
                  onClick={() => selectScene(idx)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-white text-slate-950 shadow-md ring-2'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
                  }`}
                  style={isSelected ? { ringColor: scene.accentColor } : {}}
                >
                  <Icon className="w-3 h-3" />
                  <span>0{idx + 1} {scene.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Swipe Up/Down Controls & Prompt */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 hidden md:inline-block">
              Swipe up or scroll to change AI scene
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevScene}
                aria-label="Previous AI scene"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextScene}
                aria-label="Next AI scene (swipe up)"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
