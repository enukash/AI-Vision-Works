import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { 
  Lightbulb, 
  Layout, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Clock,
  Check
} from 'lucide-react';
import { PageRoute } from '../types';

export interface TimelineStep {
  number: string;
  stepLabel: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  deliverableSnippet: string;
  durationHint: string;
}

export const PROCESS_STEPS: TimelineStep[] = [
  {
    number: '01',
    stepLabel: 'Phase 01',
    title: 'Discover',
    description: 'We discuss your idea, audience, business goals, requirements, and the problem you want to solve.',
    icon: Lightbulb,
    tags: ['Idea Exploration', 'Audience Goals', 'Problem Definition', 'Scope Discovery'],
    deliverableSnippet: 'Discovery Brief & Initial Feasibility Assessment',
    durationHint: 'Days 1 – 3',
  },
  {
    number: '02',
    stepLabel: 'Phase 02',
    title: 'Plan and Design',
    description: 'We define the project scope, user journey, visual direction, essential features, and proposed technology.',
    icon: Layout,
    tags: ['Scope Definition', 'User Journey', 'Visual Direction', 'Tech Architecture'],
    deliverableSnippet: 'Figma Visual Direction & System Specifications',
    durationHint: 'Week 1',
  },
  {
    number: '03',
    stepLabel: 'Phase 03',
    title: 'Create and Develop',
    description: 'We build the website, application, AI workflow, or creative assets in manageable stages, with opportunities for feedback.',
    icon: Code2,
    tags: ['Iterative Sprints', 'Clean Codebase', 'AI Workflow Integration', 'Live Previews'],
    deliverableSnippet: 'Working Full-Stack Application & Media Assets',
    durationHint: 'Weeks 2 – 4',
  },
  {
    number: '04',
    stepLabel: 'Phase 04',
    title: 'Test and Refine',
    description: 'We review the work for usability, functionality, content quality, and consistency with the agreed requirements.',
    icon: ShieldCheck,
    tags: ['Usability Review', 'Quality Assurance', 'Content Consistency', 'Safety Guardrails'],
    deliverableSnippet: 'Verification Audit & Fine-Tuned Polish',
    durationHint: 'Week 4 – 5',
  },
  {
    number: '05',
    stepLabel: 'Phase 05',
    title: 'Launch and Support',
    description: 'We prepare the agreed deliverables for launch and discuss any required maintenance, improvements, or future development.',
    icon: Rocket,
    tags: ['Production Launch', '100% Asset Handover', 'Team Runbook', 'Ongoing Growth'],
    deliverableSnippet: 'Live Production Deployment & Complete Source Code',
    durationHint: 'Launch Day & Beyond',
  },
];

interface ScrollStepTimelineProps {
  onNavigate?: (page: PageRoute, slug?: string) => void;
  className?: string;
}

export const ScrollStepTimeline: React.FC<ScrollStepTimelineProps> = ({ 
  onNavigate,
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 70%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate percentage indicator
  const progressPercent = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className={`relative max-w-6xl mx-auto ${className}`}>
      
      {/* Central Progress Line (Hidden on small mobile, visible on tablet & desktop) */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-12 w-[3px] -translate-x-1/2 bg-slate-200/90 dark:bg-slate-800 rounded-full overflow-hidden pointer-events-none">
        {/* Animated Fill Bar */}
        <motion.div 
          className="w-full bg-linear-to-b from-blue-600 via-sky-500 to-indigo-600 rounded-full origin-top shadow-sm shadow-blue-500/50"
          style={{ 
            height: progressPercent,
          }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-12 md:space-y-20 relative z-10">
        {PROCESS_STEPS.map((step, index) => {
          const isEven = index % 2 === 1;
          const StepIcon = step.icon;

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0"
            >
              {/* Left Column (Desktop) */}
              <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isEven ? 'md:order-2 md:pl-12 lg:pl-16' : 'md:pr-12 lg:pr-16 md:text-right'}`}>
                {/* Step Card */}
                <div className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden text-left">
                  
                  {/* Subtle Accent Glow on Hover */}
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100/60 transition-colors pointer-events-none" />

                  {/* Header Row of Card */}
                  <div className={`flex items-center justify-between gap-3 mb-3.5 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold text-blue-700">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span>{step.stepLabel}</span>
                    </div>

                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{step.durationHint}</span>
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors mb-3 flex items-center gap-2.5">
                    <span className="font-mono text-blue-600 text-xl sm:text-2xl font-extrabold">{step.number}.</span>
                    <span>{step.title}</span>
                  </h3>

                  {/* Step Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Deliverable Callout */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-4 flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Key Outcome: </span>
                      <span className="text-slate-600">{step.deliverableSnippet}</span>
                    </div>
                  </div>

                  {/* Tags Pill Row */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {step.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Timeline Node Marker */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 md:top-auto flex items-center justify-center z-20">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-12 h-12 rounded-2xl bg-white border-2 border-blue-600 shadow-md shadow-blue-500/20 flex flex-col items-center justify-center text-blue-600 group cursor-pointer transition-colors"
                >
                  <StepIcon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono font-black text-slate-900 mt-0.5">{step.number}</span>
                </motion.div>
              </div>

              {/* Right Column / Spacer for Alternating Balance */}
              <div className={`hidden md:block md:w-1/2 ${isEven ? 'md:order-1 md:pr-12 lg:pr-16 md:text-right' : 'md:pl-12 lg:pl-16'}`}>
                <div className="p-6 rounded-2xl border border-dashed border-slate-200/80 bg-slate-50/50 text-slate-400 text-xs font-mono space-y-2 max-w-sm">
                  <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Stage {step.number} Milestones</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">
                    Clear checkpoints, ongoing communication, and documented handovers ensure zero ambiguity.
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] text-blue-600 font-semibold font-sans">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    <span>Client feedback loop verified</span>
                  </div>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Bottom Completion Indicator Banner */}
      <div className="mt-16 md:mt-24 p-8 sm:p-10 rounded-3xl bg-linear-to-r from-blue-900 via-indigo-950 to-slate-950 text-white text-center shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-mono font-bold text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Smooth, Transparent Collaboration</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Ready to Take Step 01 with AI Vision Works?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Let's discuss your project, outline the best technical solution, and establish a clear timeline for your launch.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-white hover:bg-blue-400 hover:text-white transition-all duration-200 shadow-lg cursor-pointer"
            >
              <span>Start with Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
