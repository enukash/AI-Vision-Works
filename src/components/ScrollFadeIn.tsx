import React from 'react';
import { motion, MotionProps } from 'motion/react';

export interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
  id?: string;
  as?: 'div' | 'section' | 'article';
}

export const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.72,
  direction = 'up',
  distance = 28,
  amount = 0.12,
  once = true,
  id,
  as = 'div',
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();

  const motionProps: MotionProps = {
    initial: {
      opacity: 0,
      ...initialOffset,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    viewport: {
      once,
      amount,
      margin: '0px 0px -40px 0px',
    },
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  };

  if (as === 'section') {
    return (
      <motion.section id={id} className={className} {...motionProps}>
        {children}
      </motion.section>
    );
  }

  if (as === 'article') {
    return (
      <motion.article id={id} className={className} {...motionProps}>
        {children}
      </motion.article>
    );
  }

  return (
    <motion.div id={id} className={className} {...motionProps}>
      {children}
    </motion.div>
  );
};
