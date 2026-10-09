import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';

interface EyeFollowButtonProps {
  text?: string;
  onClick?: () => void;
  eyeCount?: 'one' | 'two';
  eyeSize?: number;
  pupilSize?: number;
  eyeColor?: string;
  pupilColor?: string;
  enableBlinking?: boolean;
  blinkInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
}

/**
 * EyeFollowButton
 * Complete implementation of the Framer Eye Follow Button reference component:
 * https://framer.com/m/Eye-Follow-Button-yMBK.js@UiZdcXLPs68fBczUfQ27
 * 
 * Features:
 * - Reactive pupils that dynamically track the mouse position across the screen
 * - Natural autonomous blinking loop
 * - Spring physics for fluid pupil velocity
 * - Styled to seamlessly match the original dark-slate executive theme
 */
export const EyeFollowButton: React.FC<EyeFollowButtonProps> = ({
  text = 'View Services',
  onClick,
  eyeCount = 'two',
  eyeSize = 24,
  pupilSize: rawPupilSize = 9,
  eyeColor = '#ffffff',
  pupilColor = '#0A0B0D',
  enableBlinking = true,
  blinkInterval = 3400,
  className = '',
  style = {},
  accentColor
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftPupilPos, setLeftPupilPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rightPupilPos, setRightPupilPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [centerPupilPos, setCenterPupilPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  const pupilSize = useMemo(() => Math.min(rawPupilSize, eyeSize * 0.75), [rawPupilSize, eyeSize]);
  const eyeSpacing = 4;
  const maxDistance = useMemo(() => ((eyeSize - pupilSize) / 2) * 0.88, [eyeSize, pupilSize]);

  // Autonomous Blinking Loop
  useEffect(() => {
    if (!enableBlinking) return;
    const blinkDuration = 180;
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, blinkDuration);
    }, blinkInterval);

    return () => clearInterval(interval);
  }, [enableBlinking, blinkInterval]);

  // Window-wide Mouse Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      if (eyeCount === 'one') {
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        if (distance === 0) {
          setCenterPupilPos({ x: 0, y: 0 });
          return;
        }
        const clampedDistance = Math.min(distance, maxDistance);
        const angle = Math.atan2(mouseY, mouseX);
        setCenterPupilPos({
          x: Math.cos(angle) * clampedDistance,
          y: Math.sin(angle) * clampedDistance,
        });
      } else {
        const leftEyeOffsetX = -eyeSpacing / 2 - eyeSize / 2;
        const rightEyeOffsetX = eyeSpacing / 2 + eyeSize / 2;

        const calculatePupilPosition = (eyeOffsetX: number) => {
          const relativeX = mouseX - eyeOffsetX;
          const relativeY = mouseY;
          const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
          if (distance === 0) return { x: 0, y: 0 };
          const clampedDistance = Math.min(distance, maxDistance);
          const angle = Math.atan2(relativeY, relativeX);
          return {
            x: Math.cos(angle) * clampedDistance,
            y: Math.sin(angle) * clampedDistance,
          };
        };

        setLeftPupilPos(calculatePupilPosition(leftEyeOffsetX));
        setRightPupilPos(calculatePupilPosition(rightEyeOffsetX));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [eyeSpacing, eyeSize, maxDistance, eyeCount]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3.5 pl-6 pr-4 sm:pl-7 sm:pr-4.5 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer active:scale-98 select-none ${className}`}
      style={{
        ...style,
      }}
    >
      {/* Button Text */}
      <span className="font-heading font-bold tracking-tight text-white group-hover:text-slate-100 transition-colors">
        {text}
      </span>

      {/* Follow Eyes Container */}
      <div
        ref={containerRef}
        className="flex items-center justify-center p-1 rounded-full bg-slate-950/80 border border-slate-800 shadow-inner"
        style={{
          gap: eyeCount === 'two' ? `${eyeSpacing}px` : '0px',
        }}
      >
        {eyeCount === 'one' ? (
          <div
            className="overflow-hidden rounded-full flex items-center justify-center shadow-xs"
            style={{ width: `${eyeSize}px`, height: `${eyeSize}px` }}
          >
            <motion.div
              animate={{ scaleY: isBlinking ? 0.15 : 1 }}
              transition={{ duration: 0.12, ease: 'easeInOut' }}
              className="rounded-full flex items-center justify-center origin-center"
              style={{
                width: `${eyeSize}px`,
                height: `${eyeSize}px`,
                backgroundColor: eyeColor,
              }}
            >
              <motion.div
                animate={{ x: centerPupilPos.x, y: centerPupilPos.y }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                className="rounded-full"
                style={{
                  width: `${pupilSize}px`,
                  height: `${pupilSize}px`,
                  backgroundColor: pupilColor,
                  opacity: isBlinking ? 0 : 1,
                }}
              />
            </motion.div>
          </div>
        ) : (
          <>
            {/* Left Eye */}
            <div
              className="overflow-hidden rounded-full flex items-center justify-center shadow-xs"
              style={{ width: `${eyeSize}px`, height: `${eyeSize}px` }}
            >
              <motion.div
                animate={{ scaleY: isBlinking ? 0.15 : 1 }}
                transition={{ duration: 0.12, ease: 'easeInOut' }}
                className="rounded-full flex items-center justify-center origin-center"
                style={{
                  width: `${eyeSize}px`,
                  height: `${eyeSize}px`,
                  backgroundColor: eyeColor,
                }}
              >
                <motion.div
                  animate={{ x: leftPupilPos.x, y: leftPupilPos.y }}
                  transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  className="rounded-full"
                  style={{
                    width: `${pupilSize}px`,
                    height: `${pupilSize}px`,
                    backgroundColor: pupilColor,
                    opacity: isBlinking ? 0 : 1,
                  }}
                />
              </motion.div>
            </div>

            {/* Right Eye */}
            <div
              className="overflow-hidden rounded-full flex items-center justify-center shadow-xs"
              style={{ width: `${eyeSize}px`, height: `${eyeSize}px` }}
            >
              <motion.div
                animate={{ scaleY: isBlinking ? 0.15 : 1 }}
                transition={{ duration: 0.12, ease: 'easeInOut' }}
                className="rounded-full flex items-center justify-center origin-center"
                style={{
                  width: `${eyeSize}px`,
                  height: `${eyeSize}px`,
                  backgroundColor: eyeColor,
                }}
              >
                <motion.div
                  animate={{ x: rightPupilPos.x, y: rightPupilPos.y }}
                  transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  className="rounded-full"
                  style={{
                    width: `${pupilSize}px`,
                    height: `${pupilSize}px`,
                    backgroundColor: pupilColor,
                    opacity: isBlinking ? 0 : 1,
                  }}
                />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </button>
  );
};

export default EyeFollowButton;
