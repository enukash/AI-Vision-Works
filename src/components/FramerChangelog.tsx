import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type ChangelogTag = 'Feature' | 'Improvement' | 'Fix' | 'Breaking';

export interface FramerChangelogEntry {
  version: string;
  date: string;
  tag: ChangelogTag;
  title: string;
  description: string;
  highlights?: string[];
  impactMetric?: string;
}

export interface FramerChangelogProps {
  entries?: FramerChangelogEntry[];
  accentColor?: string;
  lineColor?: string;
  bgColor?: string;
  textColor?: string;
  mutedColor?: string;
  featureColor?: string;
  fixColor?: string;
  improvementColor?: string;
  breakingColor?: string;
  fontFamily?: string;
  showFilters?: boolean;
  showLine?: boolean;
  showDots?: boolean;
  showVersion?: boolean;
  showDate?: boolean;
  showTag?: boolean;
  dotSize?: number;
  entrySpacing?: number;
  titleSize?: number | string;
  descriptionSize?: number | string;
  metaSize?: number | string;
  padding?: number | string;
  timelineOffset?: number;
  filterAllLabel?: string;
  filterFeatureLabel?: string;
  filterFixLabel?: string;
  filterImprovementLabel?: string;
  className?: string;
  maxHeight?: number | string;
}

export const FramerChangelog: React.FC<FramerChangelogProps> = ({
  entries = [
    {
      version: '3.2.0',
      date: 'Sep 2026',
      tag: 'Feature',
      title: 'Autonomous Multi-Agent Enterprise Workflows',
      description: 'Orchestrated hierarchical LangGraph sub-agent loops with automated self-correction, schema validation, and human-in-the-loop checkpoints.',
      impactMetric: '74% reduction in manual triage'
    },
    {
      version: '3.1.4',
      date: 'Aug 2026',
      tag: 'Improvement',
      title: 'Sub-200ms Vibe Coding Delivery Architecture',
      description: 'Built accelerated prototype-to-production pipeline leveraging Next.js, Vite, and Tailwind CSS with zero runtime layout shift.',
      impactMetric: '48hr MVP turnaround'
    },
    {
      version: '3.0.0',
      date: 'Jun 2026',
      tag: 'Feature',
      title: 'Multi-Modal Brand Film & Generative Production Engine',
      description: 'Unified AI visual direction bridging Midjourney v6/Flux branding systems with 4K Runway Gen-3 and ElevenLabs audio mixing.',
      impactMetric: '3.5x faster content velocity'
    },
    {
      version: '2.8.2',
      date: 'May 2026',
      tag: 'Fix',
      title: 'Deterministic JSON Parser & Schema Guardrails',
      description: 'Eliminated hallucinations and malformed nested objects through strict TypeScript compile-time contracts and runtime validation.',
      impactMetric: '99.98% parser accuracy'
    }
  ],
  accentColor = '#2563eb', // blue-600
  lineColor = '#e2e8f0',   // slate-200
  bgColor = 'transparent',
  textColor = '#0f172a',   // slate-900
  mutedColor = '#64748b',  // slate-500
  featureColor = '#2563eb',// blue-600
  fixColor = '#f59e0b',    // amber-500
  improvementColor = '#10b981', // emerald-500
  breakingColor = '#ef4444',    // red-500
  fontFamily = 'inherit',
  showFilters = true,
  showLine = true,
  showDots = true,
  showVersion = true,
  showDate = true,
  showTag = true,
  dotSize = 10,
  entrySpacing = 24,
  titleSize = '1rem',
  descriptionSize = '0.8125rem',
  metaSize = '0.75rem',
  padding = 0,
  timelineOffset = 22,
  filterAllLabel = 'All',
  filterFeatureLabel = 'Features',
  filterFixLabel = 'Fixes',
  filterImprovementLabel = 'Improvements',
  className = '',
  maxHeight = 360,
}) => {
  const [filter, setFilter] = useState<string>('All');

  const tagColorMap: Record<string, string> = {
    Feature: featureColor,
    Fix: fixColor,
    Improvement: improvementColor,
    Breaking: breakingColor,
  };

  const filters = [
    { key: 'All', label: filterAllLabel },
    { key: 'Feature', label: filterFeatureLabel },
    { key: 'Improvement', label: filterImprovementLabel },
    { key: 'Fix', label: filterFixLabel },
  ];

  const filtered = filter === 'All' 
    ? entries 
    : entries.filter(e => e.tag === filter);

  return (
    <div
      className={`w-full ${className}`}
      style={{
        fontFamily,
        color: textColor,
        background: bgColor,
        padding,
        boxSizing: 'border-box',
      }}
    >
      {/* Filter Tabs Header */}
      {showFilters && (
        <div className="flex items-center gap-1.5 mb-5 flex-wrap">
          {filters.map(f => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 border border-transparent'
                }`}
                style={{
                  color: isActive ? accentColor : undefined,
                  background: isActive ? `${accentColor}15` : undefined,
                  borderColor: isActive ? `${accentColor}35` : undefined,
                }}
              >
                {f.label}
              </button>
            );
          })}

          <span className="text-[11px] font-mono text-slate-400 ml-auto hidden sm:inline">
            Showing {filtered.length} of {entries.length}
          </span>
        </div>
      )}

      {/* Timeline Scrollable Container */}
      <div 
        className="relative overflow-y-auto pr-2 custom-scrollbar"
        style={{
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
          paddingLeft: showLine || showDots ? timelineOffset : 0,
        }}
      >
        {/* Continuous Timeline Vertical Line */}
        {showLine && (
          <div
            className="absolute"
            style={{
              left: Math.floor(dotSize / 2) - 1,
              top: 8,
              bottom: 8,
              width: 1.5,
              background: lineColor,
              borderRadius: 1,
            }}
          />
        )}

        {/* Entries List */}
        <AnimatePresence mode="popLayout">
          {filtered.map((entry, i) => {
            const color = tagColorMap[entry.tag] || accentColor;

            return (
              <motion.div
                key={`${entry.version}-${entry.tag}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="relative"
                style={{
                  marginBottom: i < filtered.length - 1 ? entrySpacing : 0,
                }}
              >
                {/* Glowing Node Dot on Timeline */}
                {showDots && (
                  <div
                    className="absolute"
                    style={{
                      left: -timelineOffset,
                      top: 6,
                      width: dotSize,
                      height: dotSize,
                      borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 8px ${color}60`,
                    }}
                  />
                )}

                {/* Meta Header: Version, Date, Tag Badge */}
                {(showVersion || showDate || showTag) && (
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    {showVersion && entry.version && (
                      <span
                        className="font-mono font-bold tracking-tight text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]"
                      >
                        v{entry.version}
                      </span>
                    )}

                    {showDate && entry.date && (
                      <span
                        className="text-[11px] text-slate-400 font-medium"
                      >
                        {entry.date}
                      </span>
                    )}

                    {showTag && entry.tag && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{
                          background: `${color}18`,
                          color: color,
                        }}
                      >
                        {entry.tag}
                      </span>
                    )}

                    {entry.impactMetric && (
                      <span className="text-[10px] font-mono font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded ml-auto hidden sm:inline">
                        {entry.impactMetric}
                      </span>
                    )}
                  </div>
                )}

                {/* Entry Title */}
                {entry.title && (
                  <h4
                    className="font-bold font-heading text-slate-900 tracking-tight leading-snug mb-1"
                    style={{ fontSize: titleSize }}
                  >
                    {entry.title}
                  </h4>
                )}

                {/* Entry Description */}
                {entry.description && (
                  <p
                    className="leading-relaxed text-slate-600 font-light"
                    style={{ fontSize: descriptionSize }}
                  >
                    {entry.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
