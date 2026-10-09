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
import { ScrollStepTimeline } from '../components/ScrollStepTimeline';

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
      <ScrollFadeIn as="section" direction="none" duration={0.5} className="py-6 bg-[#2A0800] text-[#F4D8D8] overflow-hidden border-y border-[#775144]/40 shadow-sm">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...CORE_SKILLS, ...CORE_SKILLS].map((skill, index) => (
            <div key={`${skill.id}-${index}`} className="flex items-center gap-6 mx-6">
              <span className="text-sm font-bold tracking-wider uppercase font-heading text-[#F4D8D8]">
                {skill.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#BEA8A7]" />
            </div>
          ))}
        </div>
      </ScrollFadeIn>

      {/* 3. THE AI VISION WORKS ADVANTAGE (Why AI Vision Works vs. Fragmented Agency) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
              One Partner, Complete Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
              Why Work with AI Vision Works Instead of Juggling Multiple Agencies?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              When you hire separate teams for design, coding, AI prompts, and marketing, projects slow down and ideas get lost in handoffs. At AI Vision Works, I handle the entire build—from initial concept to working code and video—faster and more seamlessly.
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
                Real Client Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading mt-3">
                Featured Case Studies
              </h2>
              <p className="text-slate-600 text-base max-w-xl mt-2 leading-relaxed">
                Explore real projects I’ve built for clients, including automated AI workflows, modern web apps, brand systems, and promotional videos.
              </p>
            </div>

            <button
              id="home-view-all-projects-btn"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>View Projects ({CMS_PROJECTS.length})</span>
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
                Interactive 3D Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white mt-2.5">
                Infinite AI Dimensional Gallery
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1.5 leading-relaxed">
                Scroll through this interactive 3D perspective tunnel featuring generative artwork, neural workflows, and system architectures.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              Scroll page to move through the tunnel in 3D ↕
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InfiniteScrollTunnel height="460px" isDarkMode={true} />
        </div>
      </section>

      {/* 6. CORE SERVICES & ARCHITECTURAL OFFERINGS (Framer Tabs Card Layout) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80 overflow-hidden">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <ScrollFadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading mt-3">
                Full-Stack AI Solutions & Creative Services
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mt-2 leading-relaxed">
                Everything you need to turn AI ideas into real products: autonomous agents, rapid web apps, branding, and promotional video.
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

          <ScrollFadeIn className="w-full">
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
                Guides & Articles
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading mt-3">
                Practical Insights on AI & Web Tech
              </h2>
              <p className="text-slate-600 text-base max-w-xl mt-2 leading-relaxed">
                Clear, easy-to-read articles exploring AI agents, prompt engineering, vibe coding, and building modern digital products.
              </p>
            </div>

            <button
              id="home-view-all-blogs-btn"
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>Read All Articles ({CMS_BLOGS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollFadeIn>

          <CMSGreyCarousel blogs={CMS_BLOGS} onNavigate={onNavigate} />
        </div>
      </section>

      {/* 8. OUR PROCESS - FROM FIRST IDEA TO FINAL DELIVERY (Framer Scroll Step Timeline) */}
      <section id="home-process-timeline-section" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/80 relative overflow-hidden">
        {/* Subtle ambient light blur background */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollFadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-100/70 border border-blue-200/60 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Our Process</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight">
              From First Idea to Final Delivery
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              A transparent, step-by-step collaboration journey designed to bring your vision to life smoothly, on time, and with zero guesswork.
            </p>
          </ScrollFadeIn>

          <ScrollStepTimeline onNavigate={onNavigate} />
        </div>
      </section>

      {/* 9. CALL TO ACTION SECTION */}
      <section className="py-20 bg-slate-950 text-white text-center relative overflow-hidden">
        <ScrollFadeIn className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-900/60 border border-blue-700/50 px-3.5 py-1.5 rounded-full">
            Let's Build Together
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Have a Business Idea or Problem to Solve with AI?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need a custom AI agent, a full-stack web MVP in days, or a fresh brand identity, let’s talk and build something great.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              id="cta-schedule-consult-btn"
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full text-base font-bold text-slate-950 bg-white hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl cursor-pointer"
            >
              Book a Free Discovery Call
            </button>
            <button
              id="cta-browse-services-btn"
              onClick={() => onNavigate('services')}
              className="px-8 py-4 rounded-full text-base font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all duration-300 cursor-pointer"
            >
              Explore All Services
            </button>
          </div>
        </ScrollFadeIn>
      </section>
    </div>
  );
};
