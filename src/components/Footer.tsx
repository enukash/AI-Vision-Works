import React from 'react';
import { PageRoute } from '../types';
import { 
  ArrowUpRight, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Cpu 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageRoute, slug?: string) => {
    onNavigate(page, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer-section" className="bg-linear-to-b from-blue-950 via-[#071330] to-slate-950 text-slate-200 pt-16 pb-12 border-t border-blue-900/60 relative overflow-hidden">
      {/* Ambient Blue Gradient Glows */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-blue-900/50">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md font-heading">
                AVW
              </div>
              <span className="text-xl font-bold text-white tracking-tight font-heading">AI VISION WORKS</span>
            </div>
            
            <p className="text-sm text-slate-300/90 leading-relaxed max-w-sm">
              AI Vision Works architects real-world generative solutions, autonomous agents, high-impact branding, UI/UX systems, and cinematic video workflows. Bridging cutting-edge models into tangible enterprise ROI.
            </p>

            {/* Availability Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/80 text-xs font-medium text-blue-200 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Q3/Q4 Client Engagements</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-300 hover:text-white hover:border-blue-400 hover:bg-blue-900/60 transition-all shadow-xs"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-300 hover:text-white hover:border-blue-400 hover:bg-blue-900/60 transition-all shadow-xs"
                aria-label="X Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-300 hover:text-white hover:border-blue-400 hover:bg-blue-900/60 transition-all shadow-xs"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <button 
                onClick={() => handleNav('contact')} 
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-colors"
                aria-label="Contact Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Pages</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="text-slate-400 hover:text-white transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="text-slate-400 hover:text-white transition-colors">
                  About AI Vision Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="text-slate-400 hover:text-white transition-colors">
                  Solutions & Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="text-slate-400 hover:text-white transition-colors">
                  Projects Showcase (CMS)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="text-slate-400 hover:text-white transition-colors">
                  Articles & Research (5)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="text-slate-400 hover:text-white transition-colors">
                  Contact & Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services Column */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('service-slug', 'autonomous-ai-agents')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Autonomous AI Agents
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-slug', 'vibe-coding-prototyping')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  UI/UX & Design Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-slug', 'brand-identity-design-systems')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Brand Identity & Logos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-slug', 'video-creation-editing')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Promotional Video Creation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-slug', 'digital-visual-art-posters')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  Digital Art & Posters
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-slug', 'youtube-thumbnail-packaging')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  YouTube Thumbnail Strategy
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & Engineering Standards */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Skill Matrix</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Prompt Engineering</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Branding & Logo Design</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Story Boarding & Pacing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Video Creation & Editing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Vibe Coding & Rapid MVPs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Fine Digital & Visual Art</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Autonomous Agent Systems</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AI Vision Works. All rights reserved. Real-World AI Solutions.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-blue-950/70 border border-blue-900/60 text-[11px] font-mono text-blue-300">
              Stack: HTML5 · CSS3 · JS/TS · Bootstrap Rules · JSON Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
