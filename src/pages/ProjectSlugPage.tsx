import React, { useState, useRef } from 'react';
import { PageRoute } from '../types';
import { CMS_PROJECTS } from '../data/cmsProjects';
import { filterCoffeeCinematicVideo, lemonate_drink_commercial } from '../assets/video';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Film,
  Video,
  Maximize2
} from 'lucide-react';

interface ProjectSlugPageProps {
  slug: string;
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const ProjectSlugPage: React.FC<ProjectSlugPageProps> = ({ slug, onNavigate }) => {
  const currentProject = CMS_PROJECTS.find((p) => p.slug === slug) || CMS_PROJECTS[0];
  
  // Synchronize document title and metadata
  useDocumentMetadata('project-slug', currentProject.slug, {
    title: currentProject.seo?.metaTitle || currentProject.title,
    description: currentProject.seo?.metaDescription || currentProject.subtitle,
    image: currentProject.coverImage,
    keywords: currentProject.seo?.secondaryKeywords,
  });

  const currentIndex = CMS_PROJECTS.findIndex((p) => p.slug === currentProject.slug);
  const prevProject = currentIndex > 0 ? CMS_PROJECTS[currentIndex - 1] : CMS_PROJECTS[CMS_PROJECTS.length - 1];
  const nextProject = currentIndex < CMS_PROJECTS.length - 1 ? CMS_PROJECTS[currentIndex + 1] : CMS_PROJECTS[0];

  const defaultVideoAsset = currentProject.media?.videoUrl || 
    (currentProject.slug === 'filter-coffee-video-creation' ? filterCoffeeCinematicVideo : 
     currentProject.slug === 'lemonate-drink-commercial' ? lemonate_drink_commercial : '');
  
  const [videoFit, setVideoFit] = useState<'contain' | 'cover'>('contain');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeVideoUrl = defaultVideoAsset || '';

  return (
    <div id="project-slug-page-container" className="py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Back Action */}
        <div className="flex items-center justify-between mb-8">
          <button
            id="back-to-projects-btn"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            {CMS_PROJECTS.length > 1 ? `Case Study #${currentIndex + 1} of ${CMS_PROJECTS.length}` : 'Featured Showcase Case Study'}
          </span>
        </div>

        {/* 1. MASTER COVER IMAGE AT THE TOP */}
        <div className="mb-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 aspect-video group">
            <img
              src={currentProject.coverImage}
              alt={currentProject.seo?.imageAltText || currentProject.media?.thumbnailAlt || currentProject.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 2. PROJECT HEADING & SUBHEADING (AFTER COVER IMAGE) */}
        <div className="space-y-4 mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight leading-tight">
            {currentProject.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {currentProject.subtitle || currentProject.summary}
          </p>
        </div>

        {/* 3. DEDICATED CINEMATIC AI VIDEO ASSET SHOWCASE */}
        {activeVideoUrl && (
          <div id="video-asset-showcase" className="mb-14 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-950 font-heading">
                  Cinematic AI Video Asset
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  Master Commercial Asset
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-slate-500 font-semibold">1080p Full HD • 30 FPS • H.264</span>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 aspect-video group flex items-center justify-center">
              <video
                ref={videoRef}
                src={activeVideoUrl}
                poster={currentProject.coverImage}
                controls
                playsInline
                loop
                className={`w-full h-full ${videoFit === 'contain' ? 'object-contain' : 'object-cover'} bg-slate-950 transition-all duration-300`}
              />

              {/* Video Watermark / Corner Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
                <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-slate-700/80 shadow-md flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-blue-400" />
                  <span>AI Video Commercial Asset</span>
                </div>
              </div>

              {/* Fit / Fill Switcher Control */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button
                  type="button"
                  onClick={() => setVideoFit(videoFit === 'contain' ? 'cover' : 'contain')}
                  className="bg-slate-950/85 hover:bg-slate-900 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 border border-slate-700/80 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Toggle Fit to Frame (Contain) vs Fill Frame (Cover)"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{videoFit === 'contain' ? 'Fit to Frame' : 'Fill Frame'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. CASE STUDY DEEP DIVE NARRATIVE */}
        <div className="space-y-10 mb-16 text-slate-700 leading-relaxed">
          
          {/* Project Overview */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <h2 className="text-xl font-bold text-slate-950 font-heading">
              Project Overview
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {currentProject.projectOverview || currentProject.summary}
            </p>
          </div>

          {/* Creative Concept */}
          {currentProject.creativeConcept && (
            <div className="p-8 rounded-3xl bg-linear-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-950 font-heading">
                  Creative Concept & Aesthetic Vision
                </h3>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {currentProject.creativeConcept}
              </p>
            </div>
          )}

          {/* Video Highlights */}
          {currentProject.videoHighlights && currentProject.videoHighlights.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-950 font-heading">
                  Cinematic Video Highlights
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProject.videoHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-colors space-y-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h4 className="text-sm font-bold text-slate-950 font-heading">
                      {highlight.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Creative Process */}
          {currentProject.creativeProcess && currentProject.creativeProcess.length > 0 && (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 font-heading">
                    Step-by-Step Creative Process
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    From initial concept development to final photorealistic commercial presentation
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {currentProject.creativeProcess.length} Milestones
                </span>
              </div>

              <div className="space-y-4">
                {currentProject.creativeProcess.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4 transition-all hover:bg-blue-50/40 hover:border-blue-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {step.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-950 font-heading">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Result / Conclusion Section */}
          {currentProject.finalResult && (
            <div className="p-8 rounded-3xl bg-slate-950 text-white space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Production Outcome</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                The Final Cinematic Result
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentProject.finalResult}
              </p>
            </div>
          )}

          {/* Commercial Applications & Distribution Channels */}
          {currentProject.applications && currentProject.applications.length > 0 && (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <h3 className="text-xl font-bold text-slate-950 font-heading">
                Ideal Commercial Applications & Formats
              </h3>
              <p className="text-xs text-slate-500">
                Strategic channels where this visual storytelling format drives highest conversion and audience engagement:
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {currentProject.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-semibold text-slate-800 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{app}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Project Navigation (Previous / Next) */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          {CMS_PROJECTS.length > 1 ? (
            <>
              <button
                onClick={() => onNavigate('project-slug', prevProject.slug)}
                className="w-full sm:w-auto p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors flex items-center gap-3 text-left group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Previous Project</div>
                  <div className="text-xs font-bold text-slate-950 line-clamp-1">{prevProject.title}</div>
                </div>
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                All Projects
              </button>

              <button
                onClick={() => onNavigate('project-slug', nextProject.slug)}
                className="w-full sm:w-auto p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors flex items-center justify-end gap-3 text-right group cursor-pointer"
              >
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Next Project</div>
                  <div className="text-xs font-bold text-slate-950 line-clamp-1">{nextProject.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Projects Gallery</span>
              </button>
            </div>
          )}
        </div>

        {/* Call to action for this project */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black font-heading">
            {currentProject.callToAction?.heading || 'Create Your Next AI-Powered Commercial'}
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            {currentProject.callToAction?.description || "At VisionWorks AI, creative ideas are transformed into engaging visual experiences through AI-powered storytelling and video production."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('services', 'video-creation-editing')}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-white hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer shadow-lg"
            >
              {currentProject.callToAction?.buttonText || 'Explore Our Services'}
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-full text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
