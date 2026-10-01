import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  ExternalLink,
  GitCommit,
  Clock,
  Layers,
  ChevronDown
} from 'lucide-react';

export type ChangelogTag = 'Feature' | 'Improvement' | 'Fix' | 'Breaking';

export interface ChangelogEntry {
  version: string;
  date: string;
  tag: ChangelogTag;
  title: string;
  description: string;
  highlights?: string[];
  impactMetric?: string;
}

interface ChangelogProps {
  onNavigate?: (page: PageRoute, slug?: string) => void;
  entries?: ChangelogEntry[];
}

export const DEFAULT_CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: '3.2.0',
    date: 'Sep 2026',
    tag: 'Feature',
    title: 'Multi-Agent Autonomous Orchestration Pipeline',
    description: 'Deployed enterprise-grade multi-agent coordination loops with self-correcting schema validators and human-in-the-loop escalation checkpoints.',
    highlights: ['Autonomous LLM subagent handoffs', 'Deterministic guardrail verification'],
    impactMetric: '74% reduction in manual triage time'
  },
  {
    version: '3.1.4',
    date: 'Aug 2026',
    tag: 'Improvement',
    title: 'Sub-200ms Streaming Inference & Mobile Latency',
    description: 'Optimized chunked token buffering and HTTP/2 multiplexing for ultra-fast streaming responses on low-bandwidth cellular networks.',
    highlights: ['Time-to-First-Token reduced by 58%', 'Client-side payload parsing refactor'],
    impactMetric: '185ms median time-to-first-token'
  },
  {
    version: '3.0.2',
    date: 'Jul 2026',
    tag: 'Fix',
    title: 'Schema Drift & Malformed JSON Fallback Guard',
    description: 'Resolved edge-case parser drops when extracting complex nested financial tables from OCR scans and multi-page technical documents.',
    highlights: ['Zero dropped tokens on malformed payloads', 'Automatic structural repair heuristics'],
    impactMetric: '99.98% parser accuracy rate'
  },
  {
    version: '3.0.0',
    date: 'Jun 2026',
    tag: 'Feature',
    title: 'Veritas Enterprise Prompt Suite & Evaluation Engine',
    description: 'Released full automated prompt regression harness with custom synthetic benchmark test suites and cost-per-call tracking telemetry.',
    highlights: ['Automated eval metrics across 500+ test fixtures', 'Pre-deployment cost auditing'],
    impactMetric: '42% lower recurring LLM API spend'
  },
  {
    version: '2.8.5',
    date: 'May 2026',
    tag: 'Improvement',
    title: 'Interactive 3D Playbook Engine with Mobile Viewport Adaptation',
    description: 'Integrated realistic physics-based 3D book page turning with seamless cascading resets, dual mobile reading modes, and touch swipe gestures.',
    highlights: ['CSS 3D perspective transforms', 'Zero horizontal viewport clipping'],
    impactMetric: '100% responsive across mobile & desktop'
  },
  {
    version: '2.7.0',
    date: 'Apr 2026',
    tag: 'Feature',
    title: 'Real-Time Multimodal Speech & Computer Vision Interface',
    description: 'Implemented bidirectional low-latency audio/video streaming allowing technicians to audit field warehouse inventory hands-free.',
    highlights: ['Live API websocket connectivity', 'On-device camera frame batching'],
    impactMetric: '3.5x faster warehouse audit cycle'
  },
  {
    version: '2.5.1',
    date: 'Mar 2026',
    tag: 'Fix',
    title: 'Context Window Caching & KV-Token Deduplication',
    description: 'Refactored system prompt initialization with server-side prefix caching, preventing redundant token billing on repetitive agent tasks.',
    highlights: ['System prompt caching enabled', 'Dynamic context trimming'],
    impactMetric: '65% token overhead reduction'
  }
];

export const Changelog: React.FC<ChangelogProps> = ({ 
  onNavigate, 
  entries = DEFAULT_CHANGELOG_ENTRIES 
}) => {
  const [filter, setFilter] = useState<'All' | ChangelogTag>('All');

  const tagColorMap: Record<ChangelogTag, { 
    dot: string; 
    badgeBg: string; 
    badgeText: string; 
    badgeBorder: string; 
    glow: string;
  }> = {
    Feature: {
      dot: 'bg-emerald-400',
      badgeBg: 'bg-emerald-500/15',
      badgeText: 'text-emerald-300',
      badgeBorder: 'border-emerald-500/30',
      glow: 'shadow-[0_0_12px_rgba(52,211,153,0.6)]'
    },
    Improvement: {
      dot: 'bg-blue-400',
      badgeBg: 'bg-blue-500/15',
      badgeText: 'text-blue-300',
      badgeBorder: 'border-blue-500/30',
      glow: 'shadow-[0_0_12px_rgba(96,165,250,0.6)]'
    },
    Fix: {
      dot: 'bg-amber-400',
      badgeBg: 'bg-amber-500/15',
      badgeText: 'text-amber-300',
      badgeBorder: 'border-amber-500/30',
      glow: 'shadow-[0_0_12px_rgba(251,191,36,0.6)]'
    },
    Breaking: {
      dot: 'bg-rose-400',
      badgeBg: 'bg-rose-500/15',
      badgeText: 'text-rose-300',
      badgeBorder: 'border-rose-500/30',
      glow: 'shadow-[0_0_12px_rgba(251,113,133,0.6)]'
    }
  };

  const filteredEntries = filter === 'All' 
    ? entries 
    : entries.filter(e => e.tag === filter);

  const counts = {
    All: entries.length,
    Feature: entries.filter(e => e.tag === 'Feature').length,
    Improvement: entries.filter(e => e.tag === 'Improvement').length,
    Fix: entries.filter(e => e.tag === 'Fix').length,
  };

  const filterOptions: { key: 'All' | ChangelogTag; label: string; count: number }[] = [
    { key: 'All', label: 'All Updates', count: counts.All },
    { key: 'Feature', label: 'Features', count: counts.Feature },
    { key: 'Improvement', label: 'Improvements', count: counts.Improvement },
    { key: 'Fix', label: 'Fixes & Resilience', count: counts.Fix },
  ];

  return (
    <div className="bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800/80">
      {/* Decorative Background Gradient Orbs */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 via-indigo-400 to-blue-600 opacity-70" />

      {/* 1. Header Section */}
      <div className="relative z-10 max-w-3xl mb-8 sm:mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/90 border border-blue-800/80 px-3 py-1 rounded-full flex items-center gap-1.5 font-mono">
            <GitCommit className="w-3.5 h-3.5 text-blue-400" />
            Live Engineering Changelog
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-400 hidden sm:inline-block font-mono">
            Continuous Shipping · Updated Monthly
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
          System Releases, Architectural Upgrades & Client Deliverables
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
          Explore production milestones across autonomous AI agents, streaming inference pipelines, deterministic guardrails, and enterprise deployments.
        </p>
      </div>

      {/* 2. Interactive Filter Tabs Bar */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/80">
        {filterOptions.map(opt => {
          const isActive = filter === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => setFilter(opt.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-500'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{opt.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-blue-700/80 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {opt.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Continuous Vertical Timeline with Scroll Reveal */}
      <div className="relative z-10 pl-6 sm:pl-9">
        {/* Continuous vertical timeline connector line with smooth gradient */}
        <div 
          className="absolute left-[7px] sm:left-[11px] top-2 bottom-3 w-[2px] bg-linear-to-b from-blue-500 via-indigo-500/50 to-slate-800 rounded-full" 
        />

        {/* Timeline Entries List */}
        <div className="space-y-8 sm:space-y-10" key={filter}>
          {filteredEntries.map((entry, index) => {
            const tagStyle = tagColorMap[entry.tag] || tagColorMap.Feature;
            const isInitialPoint = index < 2;

            return (
              <React.Fragment key={`${entry.version}-${index}`}>
                <motion.div 
                  initial={{ opacity: 0, y: isInitialPoint ? 20 : 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ 
                    once: true, 
                    amount: isInitialPoint ? 0.05 : 0.25,
                    margin: isInitialPoint ? "0px" : "0px 0px -70px 0px" 
                  }}
                  transition={{ 
                    duration: 0.55, 
                    delay: isInitialPoint ? index * 0.18 : 0.05,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="relative group transition-all duration-300"
                >
                  {/* Glowing Animated Timeline Dot */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ 
                      once: true,
                      margin: isInitialPoint ? "0px" : "0px 0px -70px 0px"
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: isInitialPoint ? index * 0.18 + 0.1 : 0.08 
                    }}
                    className={`absolute -left-[23px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${tagStyle.dot} ${tagStyle.glow} border-2 border-slate-950 transition-transform duration-300 group-hover:scale-125`} 
                  />

                  {/* Release Meta Bar: Version, Date, Tag Badge */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <span className="font-mono text-xs sm:text-sm font-bold text-white bg-slate-900/90 border border-slate-700/80 px-2.5 py-0.5 rounded-md shadow-2xs">
                      v{entry.version}
                    </span>

                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {entry.date}
                    </span>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagStyle.badgeBg} ${tagStyle.badgeText} ${tagStyle.badgeBorder}`}>
                      {entry.tag}
                    </span>

                    {entry.impactMetric && (
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2 py-0.5 rounded-md hidden md:inline-flex items-center gap-1">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        {entry.impactMetric}
                      </span>
                    )}
                  </div>

                  {/* Entry Card Content with Hover Elevation */}
                  <div className="bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-lg">
                    <h3 className="text-base sm:text-lg font-bold text-white font-heading tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                      {entry.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {entry.description}
                    </p>

                    {/* Highlights Bullet List */}
                    {entry.highlights && entry.highlights.length > 0 && (
                      <div className="mt-3.5 flex flex-wrap gap-2 pt-3 border-t border-slate-800/80">
                        {entry.highlights.map((item, hIdx) => (
                          <span 
                            key={hIdx}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded-md"
                          >
                            <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Mobile Impact Metric Badge */}
                    {entry.impactMetric && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 md:hidden flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Impact Metric:</span>
                        <span className="font-bold text-emerald-400 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {entry.impactMetric}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Subtle Scroll Cue after first 2 items */}
                {index === 1 && filteredEntries.length > 2 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex items-center gap-2 py-1 text-slate-400 text-xs font-mono select-none"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping shrink-0" />
                    <span>Scroll to reveal previous releases ({filteredEntries.length - 2} more)</span>
                    <ChevronDown className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Call-to-Action Footer Bar */}
      <div className="relative z-10 mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          <span className="text-white font-semibold">Have a specific feature or model integration in mind?</span>
          <span className="block text-slate-500 mt-0.5">Let's discuss architecture requirements, benchmark tests, and delivery sprints.</span>
        </div>

        {onNavigate && (
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <span>Scope Your Solution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors border border-slate-700/80 flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
