import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Sparkles, Workflow, Bot, Database, TrendingUp, Cpu, FileText, Brain, Layers } from 'lucide-react';
import { PageRoute } from '../types';

export interface ExpandOnHoverItem {
  number: string;
  title: string;
  description: string;
  image?: string;
}

interface ExpandOnHoverListProps {
  items: ExpandOnHoverItem[];
  onNavigate?: (page: PageRoute, slug?: string) => void;
  className?: string;
}

// Visual icons matched gracefully to each agent capability
const getAgentVisual = (number: string) => {
  switch (number) {
    case '01':
      return { icon: <Workflow className="w-6 h-6 text-blue-500" />, badge: 'Operations', color: 'from-blue-500/10 to-indigo-500/5' };
    case '02':
      return { icon: <Bot className="w-6 h-6 text-indigo-500" />, badge: 'Customer Experience', color: 'from-indigo-500/10 to-purple-500/5' };
    case '03':
      return { icon: <Database className="w-6 h-6 text-emerald-500" />, badge: 'Analytics', color: 'from-emerald-500/10 to-teal-500/5' };
    case '04':
      return { icon: <TrendingUp className="w-6 h-6 text-amber-500" />, badge: 'Sales Growth', color: 'from-amber-500/10 to-orange-500/5' };
    case '05':
      return { icon: <Sparkles className="w-6 h-6 text-pink-500" />, badge: 'Marketing', color: 'from-pink-500/10 to-rose-500/5' };
    case '06':
      return { icon: <Cpu className="w-6 h-6 text-cyan-500" />, badge: 'Integration', color: 'from-cyan-500/10 to-blue-500/5' };
    case '07':
      return { icon: <FileText className="w-6 h-6 text-purple-500" />, badge: 'Knowledge Base', color: 'from-purple-500/10 to-indigo-500/5' };
    case '08':
    default:
      return { icon: <Brain className="w-6 h-6 text-blue-600" />, badge: 'Bespoke AI', color: 'from-blue-600/10 to-slate-900/5' };
  }
};

/**
 * ExpandOnHoverList
 * Recreates the Framer Expand-OnHover-List component:
 * - Numbered stacked list with full-width dividers
 * - Smooth spring-driven height expansion on hover/tap
 * - Title color shifts from muted closeColor to bold openColor
 * - Circular arrow button dynamically transforms and highlights
 * - Expanded area reveals the detailed description, preview visual, and action CTA
 */
export const ExpandOnHoverList: React.FC<ExpandOnHoverListProps> = ({
  items,
  onNavigate,
  className = ''
}) => {
  // Initially expand the first item (standard Framer default variant behavior)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={`w-full divide-y divide-slate-200/90 border-t border-b border-slate-200/90 ${className}`}>
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        const visual = getAgentVisual(item.number);

        return (
          <div
            key={item.number}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className={`group relative transition-colors duration-300 cursor-pointer overflow-hidden ${
              isOpen ? 'bg-slate-50/80' : 'bg-transparent hover:bg-slate-50/40'
            }`}
          >
            {/* Active Left Indicator Bar */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* List Row Header */}
            <div className="py-5 sm:py-6 px-4 sm:px-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
                {/* Serial Number */}
                <span
                  className={`font-mono font-bold text-xs sm:text-sm tracking-wider transition-colors duration-200 shrink-0 ${
                    isOpen ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  {item.number}
                </span>

                {/* Service Title */}
                <h4
                  className={`text-lg sm:text-xl lg:text-2xl font-bold font-heading tracking-tight transition-colors duration-200 truncate ${
                    isOpen ? 'text-slate-950 font-black' : 'text-slate-500 group-hover:text-slate-800'
                  }`}
                >
                  {item.title}
                </h4>
              </div>

              {/* Circular Action Button */}
              <div
                className={`w-9 sm:w-11 h-9 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  isOpen
                    ? 'bg-slate-950 text-white shadow-md shadow-slate-900/20 rotate-45'
                    : 'bg-white text-slate-400 border border-slate-200 group-hover:border-slate-300 group-hover:text-slate-700'
                }`}
              >
                <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300" />
              </div>
            </div>

            {/* Expandable Body Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: 'auto', 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.28, delay: 0.08 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.15 }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-8 pb-6 sm:pb-8 pt-0 pl-11 sm:pl-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                      
                      {/* Left: Detailed Text & CTA */}
                      <div className="md:col-span-8 space-y-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                            {visual.badge}
                          </span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs font-semibold text-slate-500">Autonomous Workflow</span>
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate?.('contact');
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer active:scale-95"
                          >
                            <span>Build This Agent</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const target = document.getElementById('capabilities-section');
                              target?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            <span>View Capabilities</span>
                          </button>
                        </div>
                      </div>

                      {/* Right: Visual Preview Card */}
                      <div className="md:col-span-4 flex items-center justify-center">
                        <div className={`w-full h-32 sm:h-36 rounded-xl bg-linear-to-br ${visual.color} border border-slate-200/80 p-4 flex flex-col justify-between relative overflow-hidden group/card`}>
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-slate-100 flex items-center justify-center">
                              {visual.icon}
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              MODULE #{item.number}
                            </span>
                          </div>

                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-slate-900 truncate">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              Ready for production integration
                            </div>
                          </div>

                          {/* Subtle ambient blur */}
                          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
