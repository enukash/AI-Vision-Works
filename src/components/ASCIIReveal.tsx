import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { RotateCw, Terminal, Eye, Sparkles } from 'lucide-react';

interface ASCIIRevealProps {
  imageSrc: string;
  alt?: string;
  trigger?: 'auto' | 'hover' | 'click';
  method?: 'threshold' | 'dither';
  threshold?: number;
  invert?: boolean;
  columns?: number;
  backgroundColor?: string;
  textColor?: string;
  asciiChars?: string;
  fontSize?: number;
  cellAppearMs?: number;
  scrambleCount?: number;
  scrambleSpeedMs?: number;
  revealDelayMs?: number;
  showControls?: boolean;
  className?: string;
}

/**
 * ASCIIReveal
 * React implementation of Framer's ASCIIReveal component
 * https://framer.com/m/ASCIIReveal-Z2Ea7F.js@ELEfRu4D7Mt4uxsdegVn
 * 
 * Converts images into an animated matrix/ASCII art canvas representation,
 * scrambles characters with cyber/neural aesthetics, then smoothly reveals the full photo.
 */
export const ASCIIReveal: React.FC<ASCIIRevealProps> = ({
  imageSrc,
  alt = 'ASCII Reveal Portrait',
  trigger = 'auto',
  method = 'dither',
  threshold = 128,
  invert = false,
  columns = 42,
  backgroundColor = '#020617', // slate-950
  textColor = '#38bdf8',       // luminous sky-400
  asciiChars = '......:::=+xX#@',
  fontSize = 12,
  cellAppearMs = 1.5,
  scrambleCount = 7,
  scrambleSpeedMs = 50,
  revealDelayMs = 400,
  showControls = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animTimeoutRef = useRef<number | null>(null);
  const scrambleIntervalRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [mode, setMode] = useState<'ascii' | 'photo'>('photo');

  const stopAnimation = useCallback(() => {
    if (animTimeoutRef.current !== null) {
      clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = null;
    }
    if (scrambleIntervalRef.current !== null) {
      clearInterval(scrambleIntervalRef.current);
      scrambleIntervalRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const ASPECT_WIDTH = 4;
  const ASPECT_HEIGHT = 5;

  const asciiLayout = useMemo(() => {
    const charHeight = fontSize;
    let charWidth = 7.5;
    if (typeof document !== 'undefined') {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.font = `${fontSize}px monospace`;
        charWidth = Math.ceil(ctx.measureText('M').width) || 7.5;
      }
    }
    const ASCII_COLUMNS = columns;
    const ASCII_ROWS = Math.round(
      ASCII_COLUMNS * (ASPECT_HEIGHT / ASPECT_WIDTH) * (charWidth / charHeight)
    );
    return {
      charWidth,
      charHeight,
      rows: ASCII_ROWS,
      dispW: ASCII_COLUMNS * charWidth,
      dispH: ASCII_ROWS * charHeight,
    };
  }, [columns, fontSize]);

  const getLuma = useCallback((r: number, g: number, b: number) => {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }, []);

  const toBW = useCallback(
    (pixels: Uint8ClampedArray, W: number, H: number, thresh: number, inv: boolean) => {
      const out = new Uint8Array(W * H);
      for (let i = 0; i < pixels.length; i += 4) {
        const l = getLuma(pixels[i], pixels[i + 1], pixels[i + 2]);
        let v = l >= thresh ? 255 : 0;
        if (inv) v = 255 - v;
        out[i / 4] = v;
      }
      return out;
    },
    [getLuma]
  );

  const toDither = useCallback(
    (pixels: Uint8ClampedArray, W: number, H: number, thresh: number, inv: boolean) => {
      const buf = new Float32Array(W * H);
      for (let i = 0; i < pixels.length; i += 4) {
        buf[i / 4] = getLuma(pixels[i], pixels[i + 1], pixels[i + 2]);
      }
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const idx = y * W + x;
          const old = buf[idx];
          const nw = old < thresh ? 0 : 255;
          buf[idx] = nw;
          const e = old - nw;
          if (x + 1 < W) buf[idx + 1] += (e * 7) / 16;
          if (y + 1 < H) {
            if (x - 1 >= 0) buf[idx + W - 1] += (e * 3) / 16;
            buf[idx + W] += (e * 5) / 16;
            if (x + 1 < W) buf[idx + W + 1] += (e * 1) / 16;
          }
        }
      }
      const out = new Uint8Array(W * H);
      for (let i = 0; i < buf.length; i++) {
        let v = buf[i] >= 128 ? 255 : 0;
        if (inv) v = 255 - v;
        out[i] = v;
      }
      return out;
    },
    [getLuma]
  );

  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const drawCharacter = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      col: number,
      row: number,
      char: string,
      cw: number,
      ch: number,
      bgCol: string,
      fgCol: string
    ) => {
      ctx.fillStyle = bgCol;
      ctx.fillRect(col * cw, row * ch, cw, ch);
      ctx.fillStyle = fgCol;
      ctx.fillText(char, col * cw, row * ch);
    },
    []
  );

  const startEffect = useCallback(() => {
    if (!imgRef.current || !canvasRef.current || !imgLoaded) return;
    stopAnimation();

    setIsRevealed(false);
    setIsPlaying(true);
    setHasPlayedOnce(true);
    setMode('ascii');

    const srcImg = imgRef.current;
    const cv = canvasRef.current;
    const charWidth = asciiLayout.charWidth;
    const charHeight = asciiLayout.charHeight;
    const ASCII_COLUMNS = columns;
    const ASCII_ROWS = asciiLayout.rows;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 2 : 2;
    const dispW = asciiLayout.dispW;
    const dispH = asciiLayout.dispH;

    cv.width = dispW * dpr;
    cv.height = dispH * dpr;
    cv.style.width = '100%';
    cv.style.height = '100%';

    const BG = invert ? '#f8fafc' : backgroundColor;
    const FG = invert ? '#0f172a' : textColor;

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, dispW, dispH);
    ctx.font = `${charHeight}px monospace`;
    ctx.textBaseline = 'top';

    // Sample image crop matching aspect ratio
    const imgAR = srcImg.naturalWidth / (srcImg.naturalHeight || 1);
    const tgtAR = ASPECT_WIDTH / ASPECT_HEIGHT;
    let cx = 0,
      cy = 0,
      cw = srcImg.naturalWidth,
      ch = srcImg.naturalHeight;

    if (imgAR > tgtAR) {
      cw = ch * tgtAR;
      cx = (srcImg.naturalWidth - cw) / 2;
    } else {
      ch = cw / tgtAR;
      cy = (srcImg.naturalHeight - ch) / 2;
    }

    const sc = document.createElement('canvas');
    sc.width = ASCII_COLUMNS;
    sc.height = ASCII_ROWS;
    const sctx = sc.getContext('2d');
    if (!sctx) return;

    try {
      sctx.drawImage(srcImg, cx, cy, cw, ch, 0, 0, ASCII_COLUMNS, ASCII_ROWS);
      const rawPx = sctx.getImageData(0, 0, ASCII_COLUMNS, ASCII_ROWS).data;

      const bwPx =
        method === 'dither'
          ? toDither(rawPx, ASCII_COLUMNS, ASCII_ROWS, threshold, invert)
          : toBW(rawPx, ASCII_COLUMNS, ASCII_ROWS, threshold, invert);

      const LEN = asciiChars.length - 1;
      const asciiGrid: string[][] = [];
      const brightnessGrid: number[][] = [];

      for (let row = 0; row < ASCII_ROWS; row++) {
        const aRow: string[] = [];
        const bRow: number[] = [];
        for (let col = 0; col < ASCII_COLUMNS; col++) {
          const v = bwPx[row * ASCII_COLUMNS + col];
          const idx = Math.min(LEN, Math.floor((1 - v / 255) * asciiChars.length));
          aRow.push(asciiChars[idx]);
          bRow.push(idx);
        }
        asciiGrid.push(aRow);
        brightnessGrid.push(bRow);
      }

      const totalCells = ASCII_COLUMNS * ASCII_ROWS;
      const scrambleState: (number | null)[] = new Array(totalCells).fill(null);
      let settledCount = 0;
      let done = false;

      const denseCharIndex = Math.max(0, asciiChars.lastIndexOf('.'));
      const denseChars = asciiChars.slice(denseCharIndex + 1).split('');

      const scheduleReveal = () => {
        if (done) return;
        done = true;
        animTimeoutRef.current = window.setTimeout(() => {
          setIsRevealed(true);
          setIsPlaying(false);
          setMode('photo');
        }, revealDelayMs);
      };

      const cellOrder = shuffleArray(Array.from({ length: totalCells }, (_, i) => i));
      const startTime = performance.now();
      const cellRevealTimes = cellOrder.map((_, i) => i * cellAppearMs);
      const revealedCells = new Set<number>();

      const animateFrame = (currentTime: number) => {
        if (done) return;
        const elapsed = currentTime - startTime;

        cellOrder.forEach((cellIndex, i) => {
          if (revealedCells.has(cellIndex)) return;
          if (elapsed < cellRevealTimes[i]) return;
          revealedCells.add(cellIndex);

          const row = Math.floor(cellIndex / ASCII_COLUMNS);
          const col = cellIndex % ASCII_COLUMNS;
          const isDark = brightnessGrid[row][col] > denseCharIndex;

          if (!isDark) {
            drawCharacter(ctx, col, row, asciiGrid[row][col], charWidth, charHeight, BG, FG);
            scrambleState[cellIndex] = 0;
            settledCount++;
            if (settledCount === totalCells) scheduleReveal();
          } else {
            const randomChar = denseChars[Math.floor(Math.random() * denseChars.length)] || '#';
            drawCharacter(ctx, col, row, randomChar, charWidth, charHeight, BG, FG);
            scrambleState[cellIndex] = scrambleCount;
          }
        });

        if (revealedCells.size < totalCells) {
          rafRef.current = requestAnimationFrame(animateFrame);
        }
      };

      rafRef.current = requestAnimationFrame(animateFrame);

      scrambleIntervalRef.current = window.setInterval(() => {
        if (done) {
          if (scrambleIntervalRef.current !== null) {
            clearInterval(scrambleIntervalRef.current);
          }
          return;
        }

        let stillScrambling = false;
        for (let ci = 0; ci < totalCells; ci++) {
          const remaining = scrambleState[ci];
          if (remaining === null || remaining === 0) continue;
          stillScrambling = true;

          const row = Math.floor(ci / ASCII_COLUMNS);
          const col = ci % ASCII_COLUMNS;

          if (remaining === 1) {
            drawCharacter(ctx, col, row, asciiGrid[row][col], charWidth, charHeight, BG, FG);
            scrambleState[ci] = 0;
            settledCount++;
            if (settledCount === totalCells) {
              if (scrambleIntervalRef.current !== null) {
                clearInterval(scrambleIntervalRef.current);
              }
              scheduleReveal();
              return;
            }
          } else {
            const randomChar = denseChars[Math.floor(Math.random() * denseChars.length)] || '+';
            drawCharacter(ctx, col, row, randomChar, charWidth, charHeight, BG, FG);
            scrambleState[ci] = remaining - 1;
          }
        }

        if (!stillScrambling && settledCount === totalCells) {
          if (scrambleIntervalRef.current !== null) {
            clearInterval(scrambleIntervalRef.current);
          }
          scheduleReveal();
        }
      }, scrambleSpeedMs);
    } catch (err) {
      // In case canvas draw throws (e.g. cross-origin), gracefully fall back to photo
      setIsRevealed(true);
      setIsPlaying(false);
      setMode('photo');
    }
  }, [
    imgLoaded,
    columns,
    method,
    threshold,
    invert,
    backgroundColor,
    textColor,
    asciiChars,
    cellAppearMs,
    scrambleCount,
    scrambleSpeedMs,
    revealDelayMs,
    asciiLayout,
    toBW,
    toDither,
    shuffleArray,
    drawCharacter,
    stopAnimation,
  ]);

  useEffect(() => {
    return () => stopAnimation();
  }, [stopAnimation]);

  // Initial trigger
  useEffect(() => {
    if (imgLoaded && trigger === 'auto' && !hasPlayedOnce) {
      const timer = setTimeout(() => {
        startEffect();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [imgLoaded, trigger, hasPlayedOnce, startEffect]);

  const handleImageLoad = () => {
    setImgLoaded(true);
  };

  const handleClick = () => {
    if (!isPlaying) {
      startEffect();
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover' && !isPlaying) {
      startEffect();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full aspect-3/4 sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none border border-slate-200 shadow-lg group bg-slate-950 ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      title="Click to trigger ASCII Neural Reveal"
    >
      {/* 
        Background Canvas: Renders Matrix / ASCII raster art 
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: isRevealed ? 0 : 1,
        }}
      />

      {/* 
        Foreground Photo: Crossfades in once ASCII settles 
      */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        crossOrigin="anonymous"
        onLoad={handleImageLoad}
        className="absolute inset-0 w-full h-full object-cover object-top z-20 transition-all duration-800 pointer-events-none"
        style={{
          opacity: isRevealed ? 1 : 0,
          filter: isRevealed ? 'contrast(1.03) saturate(1.05)' : 'none',
        }}
      />

      {/* Subtle Vignette Gradient for Depth */}
      <div className="absolute inset-0 z-25 bg-linear-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

      {/* Top Left Status Badge */}
      <div className="absolute top-3.5 left-3.5 z-30 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white shadow-sm">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span>{isPlaying ? 'Computing ASCII...' : isRevealed ? 'Photo Active' : 'ASCII Neural'}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-sky-400 animate-ping' : 'bg-emerald-400'}`} />
        </div>
      </div>

      {/* Top Right Replay / Trigger Action */}
      {showControls && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            startEffect();
          }}
          className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          title="Re-run ASCII Reveal"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
        </button>
      )}

      {/* Bottom Floating Info Pill (Framer Team Card styling maintaining original theme) */}
      <div className="absolute inset-x-3 bottom-3 z-30 pointer-events-none">
        <div className="w-full p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl flex items-center justify-between gap-3 pointer-events-auto">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-black font-heading text-slate-950 leading-tight truncate">
              Renuka Sharma
            </h3>
            <p className="text-xs font-mono font-semibold text-blue-600 mt-0.5 truncate flex items-center gap-1.5">
              <span>Principal AI Generalist & Builder</span>
            </p>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-700">
            <Sparkles className="w-3 h-3 text-sky-500" />
            <span>ASCII</span>
          </div>
        </div>
      </div>
    </div>
  );
};
