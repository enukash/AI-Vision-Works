import React, { useEffect, useRef, useState } from 'react';

interface TextRevealScrollProps {
  children?: React.ReactNode;
  text?: string;
  revealMode?: 'words' | 'chars';
  startOffset?: number; // % of viewport height when reveal begins (e.g. 90)
  endOffset?: number;   // % of viewport height when reveal completes (e.g. 30)
  dimOpacity?: number;  // Initial dimmed opacity (e.g. 0.2)
  className?: string;
  style?: React.CSSProperties;
}

function createCharSpan(char: string, dimOpacity: number): HTMLSpanElement {
  const span = document.createElement('span');
  span.textContent = char;
  span.style.display = 'inline';
  span.style.opacity = String(dimOpacity);
  span.style.willChange = 'opacity';
  span.style.transition = 'opacity 0.04s linear';
  return span;
}

function createWordSpan(word: string, dimOpacity: number): HTMLSpanElement {
  const span = document.createElement('span');
  span.textContent = word;
  span.style.display = 'inline-block';
  span.style.opacity = String(dimOpacity);
  span.style.willChange = 'opacity';
  span.style.transition = 'opacity 0.04s linear';
  return span;
}

function processNodeRecursively(
  el: Node,
  revealMode: 'words' | 'chars' | string,
  dimOpacity: number,
  segments: HTMLElement[]
) {
  const originalChildren = Array.from(el.childNodes);
  for (const node of originalChildren) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      if (!text.length) continue;
      const frag = document.createDocumentFragment();

      if (revealMode === 'chars') {
        for (const char of text) {
          if (char === ' ') {
            frag.appendChild(document.createTextNode(' '));
          } else {
            const span = createCharSpan(char, dimOpacity);
            frag.appendChild(span);
            segments.push(span);
          }
        }
      } else {
        // Words mode
        const parts = text.split(/(\s+)/);
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = createWordSpan(part, dimOpacity);
            frag.appendChild(span);
            segments.push(span);
          }
        }
      }

      node.parentNode?.replaceChild(frag, node);
      continue;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const childEl = node as HTMLElement;

    if (childEl.tagName === 'BR') {
      childEl.style.display = 'inline';
      childEl.style.opacity = String(dimOpacity);
      childEl.style.willChange = 'opacity';
      segments.push(childEl);
      continue;
    }

    processNodeRecursively(childEl, revealMode, dimOpacity, segments);
  }
}

/**
 * TextRevealScroll
 * Full native implementation of Framer's text-reveal-scroll-helper
 * Reference: https://framer.com/m/text-reveal-scroll-helper-16vc5F.js@7Bke0DBIx7GpaBFlIp2X
 */
export const TextRevealScroll: React.FC<TextRevealScrollProps> = ({
  children,
  text,
  revealMode = 'words',
  startOffset = 90,
  endOffset = 30,
  dimOpacity = 0.2,
  className = '',
  style = {},
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const segmentsRef = useRef<HTMLElement[]>([]);
  const isVisibleRef = useRef<boolean>(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const root = rootRef.current;
    const textRoot = textRef.current;
    if (!root || !textRoot) return;

    // Process nodes recursively preserving all DOM children, tags, and CSS classes
    const allSegments: HTMLElement[] = [];
    processNodeRecursively(textRoot, revealMode, dimOpacity, allSegments);

    if (allSegments.length === 0) return;
    segmentsRef.current = allSegments;

    const computeReveal = () => {
      if (!isVisibleRef.current || !root) return;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const startPx = vh * (startOffset / 100);
      const endPx = vh * (endOffset / 100);
      const totalRange = rect.height + (startPx - endPx);
      const scrolled = startPx - rect.top;
      const progress = Math.min(Math.max(scrolled / totalRange, 0), 1);

      const total = segmentsRef.current.length;
      if (total === 0) return;

      const litCount = Math.floor(progress * total);

      for (let i = 0; i < total; i++) {
        const seg = segmentsRef.current[i];
        if (i < litCount) {
          seg.style.opacity = '1';
        } else if (i === litCount) {
          const frac = progress * total - litCount;
          seg.style.opacity = String(dimOpacity + frac * (1 - dimOpacity));
        } else {
          seg.style.opacity = String(dimOpacity);
        }
      }
    };

    const scheduleReveal = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeReveal);
    };

    const intersectionObserver = new IntersectionObserver(
      entries => {
        isVisibleRef.current = entries[0].isIntersecting;
        if (isVisibleRef.current) scheduleReveal();
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0 }
    );

    intersectionObserver.observe(root);
    window.addEventListener('scroll', scheduleReveal, { passive: true });
    window.addEventListener('resize', scheduleReveal, { passive: true });

    // Initial calculation
    scheduleReveal();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', scheduleReveal);
      window.removeEventListener('resize', scheduleReveal);
      intersectionObserver.disconnect();
      segmentsRef.current = [];
    };
  }, [revealMode, startOffset, endOffset, dimOpacity]);

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${className}`}
      style={style}
    >
      <div ref={textRef} className="w-full">
        {text ? <span>{text}</span> : children}
      </div>
    </div>
  );
};
