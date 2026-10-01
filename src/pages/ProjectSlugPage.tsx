import React from 'react';
import { PageRoute, Project } from '../types';
import { CMS_PROJECTS } from '../data/cmsProjects';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  Layers, 
  Sparkles, 
  Share2, 
  ArrowUpRight, 
  Quote 
} from 'lucide-react';

interface ProjectSlugPageProps {
  slug: string;
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const ProjectSlugPage: React.FC<ProjectSlugPageProps> = ({ slug, onNavigate }) => {
  const currentProject = CMS_PROJECTS.find((p) => p.slug === slug) || CMS_PROJECTS[0];
  
  const currentIndex = CMS_PROJECTS.findIndex((p) => p.slug === currentProject.slug);
  const prevProject = currentIndex > 0 ? CMS_PROJECTS[currentIndex - 1] : CMS_PROJECTS[CMS_PROJECTS.length - 1];
  const nextProject = currentIndex < CMS_PROJECTS.length - 1 ? CMS_PROJECTS[currentIndex + 1] : CMS_PROJECTS[0];

  const relatedProjects = CMS_PROJECTS
    .filter((p) => p.slug !== currentProject.slug)
    .slice(0, 2);

  return (
    <div id="project-slug-page-container" className="py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Back Action */}
        <div className="flex items-center justify-between mb-8">
          <button
            id="back-to-projects-btn"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            Case Study #{currentIndex + 1} of {CMS_PROJECTS.length}
          </span>
        </div>

        {/* Project Header Title & Category */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>{currentProject.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight leading-tight">
            {currentProject.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {currentProject.subtitle}
          </p>

          {/* Metadata Ledger */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs">
            <div>
              <span className="text-slate-400 uppercase font-semibold">Client</span>
              <div className="font-bold text-slate-900 mt-0.5">{currentProject.client}</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold">Timeline</span>
              <div className="font-bold text-slate-900 mt-0.5">{currentProject.duration}</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold">Year</span>
              <div className="font-bold text-slate-900 mt-0.5">{currentProject.year}</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold">Primary Focus</span>
              <div className="font-bold text-blue-600 mt-0.5">{currentProject.category}</div>
            </div>
          </div>
        </div>

        {/* Primary Showcase Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 mb-12 bg-slate-100">
          <img
            src={currentProject.coverImage}
            alt={currentProject.title}
            className="w-full h-80 sm:h-[460px] object-cover"
          />
        </div>

        {/* Impact Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {currentProject.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-xs"
            >
              <div className="text-3xl sm:text-4xl font-black text-blue-600 font-heading">
                {metric.value}
              </div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
                {metric.label}
              </div>
              {metric.change && (
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  {metric.change}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Case Study Deep Dive Narrative */}
        <div className="space-y-12 mb-16 text-slate-700 leading-relaxed">
          
          {/* Executive Summary */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h2 className="text-xl font-bold text-slate-950 font-heading">Executive Summary</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {currentProject.summary}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">The Problem</span>
              <h3 className="text-lg font-bold text-slate-950 font-heading">The Real-World Challenge</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {currentProject.theChallenge}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">The Solution</span>
              <h3 className="text-lg font-bold text-slate-950 font-heading">The AI-Native Architecture</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {currentProject.theSolution}
              </p>
            </div>
          </div>

          {/* Secondary Visual Showcase if available */}
          {currentProject.secondaryImage && (
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src={currentProject.secondaryImage}
                alt={`${currentProject.title} secondary showcase`}
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>
          )}

          {/* Methodology & Process */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-950 font-heading">Engineering Methodology</h3>
            <ul className="space-y-3">
              {currentProject.methodology.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concrete Deliverables */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-950 font-heading">Final Deliverables</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {currentProject.deliverables.map((del, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{del.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {del.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Technologies & Frameworks Deployed</h4>
            <div className="flex flex-wrap gap-2">
              {currentProject.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-blue-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Client Feedback Quote */}
          {currentProject.clientQuote && (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
              <Quote className="w-8 h-8 text-blue-200 absolute top-6 right-6" />
              <p className="text-slate-800 text-base sm:text-lg italic leading-relaxed mb-4">
                "{currentProject.clientQuote.text}"
              </p>
              <div className="border-t border-slate-100 pt-3">
                <div className="font-bold text-slate-950 text-sm font-heading">{currentProject.clientQuote.author}</div>
                <div className="text-xs text-slate-500">
                  {currentProject.clientQuote.role} · {currentProject.clientQuote.company}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Project Navigation (Previous / Next) */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <button
            onClick={() => onNavigate('project-slug', prevProject.slug)}
            className="w-full sm:w-auto p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors flex items-center gap-3 text-left group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Previous Project</div>
              <div className="text-xs font-bold text-slate-900 line-clamp-1">{prevProject.title}</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            All Projects
          </button>

          <button
            onClick={() => onNavigate('project-slug', nextProject.slug)}
            className="w-full sm:w-auto p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors flex items-center justify-end gap-3 text-right group"
          >
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Next Project</div>
              <div className="text-xs font-bold text-slate-900 line-clamp-1">{nextProject.title}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Call to action for this project type */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black font-heading">
            Need a Similar Real-World AI Solution?
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Let's discuss how to apply these methodologies and architectures to your organization's specific challenges.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-white hover:bg-blue-500 hover:text-white transition-all duration-200"
          >
            Schedule Consultation with AI Vision Works
          </button>
        </div>

      </div>
    </div>
  );
};
