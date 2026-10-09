import React from 'react';
import { PageRoute } from '../types';
import { CORE_SKILLS } from '../data/skills';
import { 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Workflow, 
  Sparkles, 
  Award, 
  Layers, 
  Code2, 
  Palette, 
  Video, 
  Film, 
  Compass, 
  Server, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollFadeIn } from '../components/ScrollFadeIn';
import { TextRevealScroll } from '../components/TextRevealScroll';
import { ASCIIReveal } from '../components/ASCIIReveal';
import { CardShowcase, CardShowcaseItem } from '../components/CardShowcase';
import { SotnichenkoSwipe, SwipeCardItem } from '../components/SotnichenkoSwipe';

interface AboutPageProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Prompt Engineering': <Code2 className="w-5 h-5 text-blue-600" />,
    'Branding': <Palette className="w-5 h-5 text-blue-600" />,
    'Story Boarding': <Film className="w-5 h-5 text-blue-600" />,
    'Video Creation and Editing': <Video className="w-5 h-5 text-blue-600" />,
    'Vibe Coding': <Zap className="w-5 h-5 text-blue-600" />,
    'Visual Art': <Sparkles className="w-5 h-5 text-blue-600" />,
    'Agent Development': <Cpu className="w-5 h-5 text-blue-600" />,
  };

  const skillImages: Record<string, string> = {
    'skill-prompt-eng': '/assets/images/robot_thinking_wide_1789365436523.jpg',
    'skill-branding': '/assets/images/robot_turning_bulb_1789365471785.jpg',
    'skill-storyboarding': '/assets/images/robot_idea_landscape_1789365418011.jpg',
    'skill-video-creation': '/assets/images/robot_ai_hologram_1789209021516.jpg',
    'skill-vibe-coding': '/assets/images/robot_ai_solutions_1789208998741.jpg',
    'skill-visual-art': 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    'skill-agent-dev': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  };

  const skillTags: Record<string, string> = {
    'skill-prompt-eng': 'Architect',
    'skill-branding': 'Brand Design',
    'skill-storyboarding': 'Visual Story',
    'skill-video-creation': 'Cinematic Video',
    'skill-vibe-coding': 'Vibe Coding',
    'skill-visual-art': 'Visual Art',
    'skill-agent-dev': 'Agent Systems',
  };

  const showcaseCards: CardShowcaseItem[] = CORE_SKILLS.map((skill, idx) => ({
    id: skill.id,
    number: `0${idx + 1}`,
    title: skill.name,
    tagline: skill.tagline,
    description: skill.description,
    tag: skillTags[skill.id] || skill.level,
    image: skillImages[skill.id] || '/assets/images/robot_ai_solutions_1789208998741.jpg',
    level: skill.level,
    practicalApplications: skill.practicalApplications,
    toolsAndFrameworks: skill.toolsAndFrameworks,
    businessValue: skill.businessValue,
  }));

  const techStackCards: SwipeCardItem[] = [
    {
      id: 'tech-frontend',
      eyebrow: '01 · Frontend & Web Apps',
      title: 'Modern Web Apps & Responsive Interfaces',
      description: 'Built with React 19, TypeScript, and modern Tailwind CSS. Fast, accessible, and mobile-friendly layouts crafted with Figma precision and smooth interactive animations.',
      tools: ['React 19', 'TypeScript', 'Tailwind CSS', 'Figma', 'Vite', 'HTML5/CSS3'],
      image: '/assets/images/robot_ai_solutions_1789208998741.jpg',
    },
    {
      id: 'tech-cognitive',
      eyebrow: '02 · AI Prompts & Agents',
      title: 'Prompt Engineering & Autonomous Agents',
      description: 'Custom system prompts, LangGraph agent workflows, and structured data validation (JSON schemas) designed to prevent hallucinations and deliver accurate, reliable answers.',
      tools: ['Claude 3.7', 'GPT-4o', 'Gemini 2.5', 'LangGraph', 'JSON Schema', 'Prompt Evals'],
      image: '/assets/images/robot_thinking_wide_1789365436523.jpg',
    },
    {
      id: 'tech-media',
      eyebrow: '03 · AI Video & Media Production',
      title: 'Cinematic AI Videos & Storyboards',
      description: 'Cinema-quality video creation using Runway Gen-3 and Luma, combined with studio voice narration in ElevenLabs, dynamic sound design, and master editing in DaVinci Resolve.',
      tools: ['Runway Gen-3', 'Luma Dream', 'DaVinci Resolve', 'ElevenLabs', 'Premiere Pro'],
      image: '/assets/images/robot_ai_hologram_1789209021516.jpg',
    },
    {
      id: 'tech-backend',
      eyebrow: '04 · APIs & Backend Workflows',
      title: 'Connected APIs & Reliable Data Workflows',
      description: 'Lightweight, dependable microservices connecting AI tools to your existing databases, CRMs, and email systems using Node.js, Python, and secure webhooks.',
      tools: ['Node.js', 'Python', 'PostgreSQL', 'Express', 'Docker', 'REST Webhooks'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div id="about-page-container" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Intro */}
        <ScrollFadeIn className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>Hi, I'm Renuka Sharma</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight">
            Turning Powerful AI into Practical, Everyday Solutions.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            I help founders and businesses build real-world AI solutions—from smart automation agents and modern web applications to brand identity and cinematic video—all in one seamless flow.
          </p>
        </ScrollFadeIn>

        {/* Core Philosophy Section with Framer Text Reveal Scroll Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Profile Card & Verified Standards */}
          <div className="lg:col-span-5 space-y-6 relative z-10">
            {/* Framer ASCII Reveal Component */}
            <ASCIIReveal
              imageSrc="/assets/images/WhatsApp Image 2026-09-14 at 9.45.15 PM.jpeg"
              alt="Renuka Sharma - AI Vision Works"
              trigger="auto"
              method="dither"
              columns={40}
              fontSize={11}
              textColor="#DFB6B2"
              backgroundColor="#190019"
            />

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Real-World Quality & Reliability</span>
              </div>
              <p className="leading-relaxed">
                Every project is built to work in production—with clean code, reliable AI responses, and thoughtful design that real people enjoy using.
              </p>
            </div>
          </div>

          {/* Right Column: Framer Text Reveal Scroll Headline & Philosophy */}
          <div className="lg:col-span-7 space-y-8 relative z-10">
            {/* Eyebrow with Live Scroll Hint */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Core Philosophy · Scroll to Reveal</span>
              </span>
            </div>

            {/* Large Scroll-Driven Reveal Statement */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">
                The AI Vision Works Advantage
              </h2>

              {/* Framer Text Reveal Scroll Component */}
              <TextRevealScroll
                text="When businesses build with AI, they often juggle separate teams—a developer for code, a designer for visuals, and a video editor for marketing. Managing all those handoffs takes time, costs more, and dilutes your vision."
                revealMode="words"
                startOffset={85}
                endOffset={30}
                dimOpacity={0.25}
                className="text-lg sm:text-xl font-medium text-slate-950 leading-relaxed"
              />

              <TextRevealScroll
                text="AI Vision Works brings all these disciplines together into one smooth workflow: turning ideas into full-stack web apps, brand systems, and automated AI agents."
                revealMode="words"
                startOffset={75}
                endOffset={20}
                dimOpacity={0.25}
                className="text-base sm:text-lg font-bold text-blue-900 leading-relaxed"
              />
            </div>

            {/* 4 Pillars Grid (Preserving Theme & Content) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
                <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <Workflow className="w-4 h-4 text-blue-600" />
                  <span>End-to-End Delivery</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  From initial concept and visual design to full-stack code and live deployment—managed by one person who sees the complete picture.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
                <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>Fast AI-Powered Development</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Rapid prototyping and vibe coding help deliver working web apps and digital assets in days rather than waiting months.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
                <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>Reliable AI Systems</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Carefully engineered prompts, guardrails, and validation rules to ensure your AI behaves accurately and safely.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
                <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-blue-600" />
                  <span>Creative & Cinematic Content</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  High-impact brand systems, promotional videos, storyboard planning, and clean responsive user interfaces.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive into the 7 Skills */}
        <div className="mb-24">
          <ScrollFadeIn className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
              Skills Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
              The 7 Core Capabilities of My Practice
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Click any card to explore what I build, the tools I use, and the value it brings to your business.
            </p>
          </ScrollFadeIn>

          {/* Framer CardShowcase: Interactive Progress-Based Expanding Showcase */}
          <CardShowcase 
            cards={showcaseCards} 
            animationSpeed={5.5} 
            loop={true} 
          />
        </div>

        {/* Tech Stack & Integration Architecture */}
        <ScrollFadeIn className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white shadow-xl mb-24">
          <div className="max-w-3xl mb-8 space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-900/50 border border-blue-800 px-3 py-1 rounded-full">
              Full-Stack Tooling Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Built on Battle-Tested Modern Web & AI Systems
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every deliverable is crafted with strict engineering discipline—from semantic HTML5, React 19, and modern Tailwind CSS layouts to LangGraph multi-agent runtimes, PostgreSQL persistence, and strict JSON Schema contracts.
            </p>
          </div>

          {/* Framer Sotnichenko Swipe: Interactive 3D Stack with Gesture Physics */}
          <SotnichenkoSwipe cards={techStackCards} />
        </ScrollFadeIn>

        {/* Next Step Call to Action */}
        <ScrollFadeIn className="text-center bg-blue-50 border border-blue-200/80 rounded-3xl p-8 sm:p-12 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
            Need a Versatile AI Partner for Your Next Initiative?
          </h3>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Explore the full services menu or schedule a direct discovery consultation to discuss your specific business challenge.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('services')}
              className="px-6 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
            >
              Explore Services
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full text-sm font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors cursor-pointer"
            >
              Contact AI Vision Works
            </button>
          </div>
        </ScrollFadeIn>

      </div>
    </div>
  );
};
