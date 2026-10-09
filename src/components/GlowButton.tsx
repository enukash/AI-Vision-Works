import React, { useState } from 'react';
import { motion } from 'motion/react';

interface GlowButtonProps {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  accentColor?: string;
  glowColor?: string;
  backgroundColor?: string;
  textColor?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

/**
 * GlowButton (Aura Button)
 * Complete implementation of the Framer reference component:
 * https://framer.com/m/Glow-Button-d8tNFR.js@hgVroAyHRozNmd0ybkUn
 * 
 * Features:
 * - Multi-tier radiant aura glow box-shadow physics
 * - Smooth spring physics with spring transition (bounce: 0.2, duration: 0.6)
 * - Supports primary theme (vibrant accent fill) & secondary theme (dark slate)
 */
export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  text,
  onClick,
  accentColor = '#DFB6B2',
  glowColor,
  backgroundColor,
  textColor,
  variant = 'secondary',
  className = '',
  style = {},
  icon,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Active glow color (dynamic theme accent or provided glow)
  const activeGlow = glowColor || accentColor;

  // Multi-tier radiant aura shadow calculation from Framer reference
  const auraGlowShadow = `
    0px 0px 96px 0px ${activeGlow}44,
    0px 0px 56px 0px ${activeGlow}55,
    0px 0px 32px 0px ${activeGlow}77,
    0px 6px 20px 0px ${activeGlow}99,
    0px 0px 9px 0px ${activeGlow}cc,
    0px 0px 4px 0px ${activeGlow}
  `;

  const isPrimary = variant === 'primary';
  const defaultBg = isPrimary ? (backgroundColor || activeGlow) : (backgroundColor || 'rgba(10, 11, 13, 0.96)');
  const defaultText = textColor || (isPrimary ? '#ffffff' : '#ffffff');

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        boxShadow: isHovered 
          ? auraGlowShadow 
          : isPrimary 
            ? `0px 4px 16px ${activeGlow}50` 
            : '0px 2px 8px rgba(0, 0, 0, 0.4)',
        scale: isHovered ? 1.03 : 1,
        borderColor: isHovered ? activeGlow : isPrimary ? 'transparent' : 'rgba(51, 65, 85, 0.8)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={`group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-bold border transition-colors duration-300 cursor-pointer select-none overflow-visible will-change-transform ${className}`}
      style={{
        backgroundColor: defaultBg,
        color: defaultText,
        ...style,
      }}
    >
      {/* Subtle radial sheen on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, #ffffff, transparent 70%)`,
        }}
      />

      {/* Button Content */}
      <span className="relative z-10 font-heading tracking-tight flex items-center gap-2.5 transition-colors">
        {text || children}
        {icon}
      </span>
    </motion.button>
  );
};

export default GlowButton;
