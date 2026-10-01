import React, { useState, useRef } from 'react';
import { PageRoute, Project } from '../types';
import { CMS_PROJECTS } from '../data/cmsProjects';
import { CMS_BLOGS } from '../data/cmsBlogs';
import { CMS_SERVICES } from '../data/cmsServices';
import { CORE_SKILLS } from '../data/skills';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Play,
  Pause,
  Bot,
  Sliders,
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight,
  ExternalLink,
  Code2,
  Workflow,
  Clock,
  Compass
} from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollFadeIn } from '../components/ScrollFadeIn';
import { Draggable3DCarousel } from '../components/Draggable3DCarousel';
import { CMSGreyCarousel } from '../components/CMSGreyCarousel';
import { InteractiveBook } from '../components/InteractiveBook';
import { ServicesTabsCard } from '../components/ServicesTabsCard';
import { SotnichenkoSoftRotate } from '../components/SotnichenkoSoftRotate';
import { RotatingScrollGallery } from '../components/RotatingScrollGallery';
import { SoftRotateScenesHero } from '../components/SoftRotateScenesHero';
import { InfiniteScrollTunnel } from '../components/InfiniteScrollTunnel';

interface HomePageProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div id="home-page-container" className="relative">
      {/* 1. HERO SECTION WITH SOFT ROTATE SCENES (Full Screen Width) */}
      <section className="relative pt-0 pb-8 sm:pb-12 overflow-hidden w-full">
        <div className="w-full">
          <SoftRotateScenesHero onNavigate={onNavigate} />
        </div>
      </section>

      {/* 2. MOVING SKILLS MARQUEE (7 Skills per prompt) */}
      <ScrollFadeIn as="section" direction="none" duration={0.5} className="py-6 bg-blue-600 text-white overflow-hidden border-y border-blue-550">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...CORE_SKILLS, ...CORE_SKILLS].map((skill, index) => (
            <div key={`${skill.id}-${index}`} className="flex items-center gap-6 mx-6">
              <span className="text-sm font-bold tracking-wider uppercase font-heading text-white">
                {skill.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white-800" />
            </div>
          ))}
        </div>
      </ScrollFadeIn>

      {/* 3. THE AI GENERALIST ADVANTAGE (Why Generalist vs. Fragmented Agency) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
              Turning Problems into Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
              Why Choose an AI Generalist Instead of Hiring Multiple Specialists?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Many software projects slow down because design, AI, coding, and marketing are handled separately. As an AI Generalist, I bring all these pieces together to create faster, smarter, and more complete solutions.
            </p>
          </ScrollFadeIn>

          <InteractiveBook onNavigate={onNavigate} />
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SHOWCASE (CMS) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-100/70 px-3 py-1.5 rounded-full">
                Real-World Client Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading mt-3">
                Featured Case Studies
              </h2>
              <p className="text-slate-600 text-base max-w-xl mt-2">
                Explore real projects spanning UI/UX design, poster campaigns, brand identities, cinematic video, and autonomous enterprise agents.
              </p>
            </div>

            <button
              id="home-view-all-projects-btn"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors self-start md:self-auto"
            >
              <span>View All Projects ({CMS_PROJECTS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollFadeIn>
          
          <Draggable3DCarousel projects={CMS_PROJECTS.slice(0, 5)} onNavigate={onNavigate} />
        </div>
      </section>

      {/* 5. 3D INFINITE SCROLL TUNNEL (Framer HeroTunnel Reference Component) */}
      <section className="relative py-8 sm:py-10 bg-slate-950 text-white overflow-hidden border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider bg-sky-950/60 border border-sky-800 px-3 py-1 rounded-full">
                3D Infinite Scroll
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white mt-2.5">
                Infinite AI Dimensional Architecture
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1.5 leading-relaxed">
                Scroll through this infinite perspective wireframe tunnel featuring generative artwork, neural state graphs, and autonomous system nodes.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              Scroll page to traverse tunnel in 3D ↕
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InfiniteScrollTunnel height="460px" isDarkMode={true} />
        </div>
      </section>

      {/* 6. CORE SERVICES & ARCHITECTURAL OFFERINGS (Framer Tabs Card Layout) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                Core Capabilities & Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading mt-3">
                Full-Stack AI Engineering & Creative Production
              </h2>
              <p className="text-slate-600 text-base max-w-2xl mt-2 leading-relaxed">
                End-to-end capabilities spanning autonomous cognitive agent collectives, rapid full-stack web applications, generative design systems, and cinematic video.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors self-start md:self-auto shrink-0 cursor-pointer"
            >
              <span>Explore All Services ({CMS_SERVICES.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <ServicesTabsCard onNavigate={onNavigate} />
          </ScrollFadeIn>
        </div>
      </section>

      {/* 6. LATEST ARTICLES & RESEARCH (CMS Blog) */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
                Thought Leadership & Analysis
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading mt-3">
                Latest Insights on AI Solutions
              </h2>
              <p className="text-slate-600 text-base max-w-xl mt-2">
                In-depth articles exploring Generative AI, Prompt Engineering, AI in Finance, Agent Development, and Vibe Coding.
              </p>
            </div>

            <button
              id="home-view-all-blogs-btn"
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors self-start md:self-auto"
            >
              <span>Explore All 5 Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollFadeIn>

          <CMSGreyCarousel blogs={CMS_BLOGS} onNavigate={onNavigate} />
        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
      <section className="py-20 bg-slate-950 text-white text-center relative overflow-hidden">
        <ScrollFadeIn className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-900/60 border border-blue-700/50 px-3.5 py-1.5 rounded-full">
            Let's Collaborate
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Ready to Solve Your Real-World Problem with AI?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need an autonomous agent collective, a comprehensive brand identity, or a rapid functional MVP built in days, let's architect a solution that drives measurable enterprise ROI.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              id="cta-schedule-consult-btn"
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full text-base font-bold text-slate-950 bg-white hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl"
            >
              Book an AI Solution Consultation
            </button>
            <button
              id="cta-browse-services-btn"
              onClick={() => onNavigate('services')}
              className="px-8 py-4 rounded-full text-base font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all duration-300"
            >
              Explore All Services
            </button>
          </div>
        </ScrollFadeIn>
      </section>
    </div>
  );
};
