import React from 'react';
import { motion } from 'motion/react';

export const FloatingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gentle floating ambient blue gradient spheres */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 0.92, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-blue-600/5 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute -bottom-40 left-1/4 w-[32rem] h-[32rem] rounded-full bg-slate-400/10 blur-3xl"
      />

      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
};

export const FloatingBadge: React.FC<{
  icon?: React.ReactNode;
  text: string;
  subtext?: string;
  className?: string;
  delay?: number;
}> = ({ icon, text, subtext, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-medium text-slate-800 ${className}`}
    >
      {icon && <span className="text-blue-600">{icon}</span>}
      <div>
        <span className="font-semibold text-slate-900">{text}</span>
        {subtext && <span className="ml-1 text-slate-500 font-normal">· {subtext}</span>}
      </div>
    </motion.div>
  );
};
