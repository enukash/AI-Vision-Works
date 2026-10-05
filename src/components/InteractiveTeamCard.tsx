import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Twitter, Mail, ArrowUpRight, Sparkles } from 'lucide-react';

interface InteractiveTeamCardProps {
  imageSrc?: string;
  name?: string;
  role?: string;
  tagline?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  emailUrl?: string;
  className?: string;
}

/**
 * InteractiveTeamCard
 * Direct implementation of Framer's Interactive Team Card
 * https://framer.com/m/Interactive-Team-Card-GxRZPD.js@vx9eZJkh98j8Q3IslVFS
 * 
 * Features:
 * - Idle state: elegant desaturated portrait with subtle vignette and minimal status pill
 * - Hover state: spring-accelerated color saturation + zoom with [0.15, 0.45, 0.15, 1.35] bounce
 * - Info Card: springs up smoothly from bottom revealing name, specialty title, and social links
 * - Mobile friendly: touch-to-toggle support
 */
export const InteractiveTeamCard: React.FC<InteractiveTeamCardProps> = ({
  imageSrc = '/assets/images/WhatsApp Image 2026-09-14 at 9.45.15 PM.jpeg',
  name = 'Renuka Sharma',
  role = 'AI Vision Works · Lead Builder',
  tagline = 'Available for Q3/Q4 Client Projects',
  linkedinUrl = 'https://linkedin.com',
  twitterUrl = 'https://x.com',
  emailUrl = 'mailto:renukash2490@gmail.com',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(prev => !prev)}
      className={`relative w-full aspect-3/4 sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none border border-slate-200 shadow-lg group bg-slate-950 ${className}`}
      style={{
        willChange: 'transform',
      }}
    >
      {/* Background Image with Framer hover zoom & desaturate transition */}
      <motion.img
        src={imageSrc}
        alt={`${name} - ${role}`}
        draggable={false}
        animate={{
          scale: isHovered ? 1.06 : 1.0,
          filter: isHovered ? 'saturate(1.05) contrast(1.02)' : 'saturate(0.25) contrast(0.95)',
        }}
        transition={{
          duration: 0.8,
          ease: [0.15, 0.45, 0.15, 1.35],
        }}
        className="w-full h-full object-cover object-top will-change-transform"
      />

      {/* Subtle Vignette Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.4 : 0.7 }}
      />

      {/* Top Left Live Status Pill */}
      <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-medium">{isHovered ? 'Active Now' : 'Available'}</span>
        </div>
      </div>

      {/* Top Right Hint Badge */}
      <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none transition-opacity duration-300">
        <div className={`w-7 h-7 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 transition-all duration-300 ${isHovered ? 'bg-blue-600 border-blue-500 text-white rotate-45' : ''}`}>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 
        Bottom Floating Info Card
        Matches Framer Interactive Team Card:
        Framer specs: background white, rounded-xl, y: 50 -> y: 0, scale: 0.5 -> 1.0,
        spring easing [0.15, 0.45, 0.15, 1.35]
      */}
      <div className="absolute inset-x-3 bottom-3 z-30 pointer-events-none">
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.94,
            y: isHovered ? 0 : 0,
            scale: isHovered ? 1 : 0.98,
          }}
          transition={{
            duration: 0.6,
            ease: [0.15, 0.45, 0.15, 1.35],
          }}
          className="w-full p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl flex items-center justify-between gap-3 pointer-events-auto"
        >
          {/* Left Details: Name and Role */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base sm:text-lg font-black font-heading text-slate-950 leading-tight truncate">
                {name}
              </h3>
            </div>
            <p className="text-xs font-mono font-semibold text-blue-600 mt-0.5 truncate">
              {role}
            </p>
          </div>

          {/* Right Social Connect Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white border border-slate-200/80 flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="LinkedIn profile"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-950 text-slate-600 hover:text-white border border-slate-200/80 flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="X (Twitter) profile"
              title="X (Twitter)"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>

            <a
              href={emailUrl}
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-600 text-slate-600 hover:text-white border border-slate-200/80 flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="Send Email"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
