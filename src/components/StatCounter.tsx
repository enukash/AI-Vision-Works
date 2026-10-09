import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'motion/react';

interface StatCounterProps {
  value: number;
  startValue?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  duration?: number;
  decimals?: number;
  valueColor?: string;
  labelColor?: string;
  valueSize?: number | string;
  labelSize?: number | string;
  fontWeight?: number;
  className?: string;
  active?: boolean;
  replayOnHover?: boolean;
}

function formatValue(value: number, decimals: number): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * StatCounter
 * Smooth, reactive numeric counting animation component.
 * Features:
 * - Reactive trigger: Animates when page/card becomes active, scrolls into view, or on hover
 * - High-precision requestAnimationFrame loop with Quintic-Out easing curve
 * - Micro-interaction completion pulse and interactive replay on click/hover
 * - Tabular numbers with zero layout jitter
 */
export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  startValue = 0,
  step = 1,
  prefix = '',
  suffix = '',
  label,
  duration = 1.4,
  decimals = 0,
  valueColor = '#2A0800',
  labelColor = '#7E706D',
  valueSize = 32,
  labelSize = 12,
  fontWeight = 900,
  className = '',
  active = true,
  replayOnHover = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-10px' });
  const rafRef = useRef<number | null>(null);

  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}${formatValue(startValue, decimals)}${suffix}`
  );
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [pulse, setPulse] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    setIsCounting(true);
    setPulse(false);

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Smooth Quintic Out ease curve: rapid start, gentle silky deceleration
      const ease = 1 - Math.pow(1 - progress, 4.2);
      const current = startValue + (value - startValue) * ease;
      const stepped = step && step > 0 ? Math.round(current / step) * step : current;

      setDisplayValue(`${prefix}${formatValue(stepped, decimals)}${suffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayValue(`${prefix}${formatValue(value, decimals)}${suffix}`);
        setIsCounting(false);
        setPulse(true);
        setTimeout(() => setPulse(false), 500);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [value, startValue, step, prefix, suffix, duration, decimals]);

  // Trigger animation whenever active becomes true or element enters view
  useEffect(() => {
    if (active && inView) {
      startAnimation();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [active, inView, startAnimation]);

  const handleMouseEnter = () => {
    if (replayOnHover && !isCounting) {
      startAnimation();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    startAnimation();
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      title="Click or hover to replay count"
      className={`inline-flex flex-col gap-1 cursor-pointer select-none group/counter ${className}`}
    >
      <motion.div
        animate={pulse ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex items-center gap-1"
        style={{
          color: valueColor,
          fontSize: typeof valueSize === 'number' ? `${valueSize}px` : valueSize,
          fontWeight,
          lineHeight: 1.1,
          fontVariantNumeric: 'tabular-nums',
          fontFamily: 'var(--font-heading, inherit)',
        }}
      >
        <span>{displayValue}</span>
        {isCounting && (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping inline-block ml-0.5" />
        )}
      </motion.div>

      {label && (
        <div
          style={{
            color: labelColor,
            fontSize: typeof labelSize === 'number' ? `${labelSize}px` : labelSize,
            opacity: 0.85,
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default StatCounter;
