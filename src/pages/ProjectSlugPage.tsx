import React, { useState, useRef } from 'react';
import { PageRoute, Project } from '../types';
import { CMS_PROJECTS } from '../data/cmsProjects';
import { filterCoffeeCinematicVideo } from '../assets/video';
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
  Quote,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Video,
  Image as ImageIcon,
  Settings2,
  ExternalLink,
  Coffee,
  Check,
  Tag,
  Search,
  Globe
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

  // Dynamic media space states for cover image and video
  const defaultVideoAsset = currentProject.media?.videoUrl || (currentProject.slug === 'filter-coffee-video-creation' ? filterCoffeeCinematicVideo : '');
  const [customVideoUrl, setCustomVideoUrl] = useState(defaultVideoAsset);
  const [customCoverImage, setCustomCoverImage] = useState(currentProject.coverImage);
  const [showMediaSettings, setShowMediaSettings] = useState(false);
  const [mediaSettingsSaved, setMediaSettingsSaved] = useState(false);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeVideoUrl = customVideoUrl || defaultVideoAsset || '';

  const handleApplyMediaSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setMediaSettingsSaved(true);
    setTimeout(() => setMediaSettingsSaved(false), 2500);
    setShowMediaSettings(false);
  };

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
            Case Study #{currentIndex + 1} of {CMS_PROJECTS.length}
          </span>
        </div>

        {/* Project Header Title & Category */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            {currentProject.category === 'AI Video Creation' && <Film className="w-3.5 h-3.5 text-blue-600" />}
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
              <span className="text-slate-400 uppercase font-semibold">Client / Production</span>
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

        {/* ========================================================================= */}
        {/* DEDICATED MEDIA SHOWCASE: COVER IMAGE SPACE */}
        {/* ========================================================================= */}
        <div className="mb-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-950 font-heading">
                Master Cover Image Showcase
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              {activeVideoUrl && (
                <a
                  href="#video-asset-showcase"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5 text-blue-600" />
                  <span>Jump to Video Asset ↓</span>
                </a>
              )}

              {/* Media Customization Trigger */}
              <button
                onClick={() => setShowMediaSettings(!showMediaSettings)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors self-start sm:self-auto cursor-pointer"
                title="Configure video URL or cover image space"
              >
                <Settings2 className="w-3.5 h-3.5 text-slate-600" />
                <span>{showMediaSettings ? 'Close Config' : 'Media Settings'}</span>
              </button>
            </div>
          </div>

          {/* Collapsible Media Customization Form */}
          {showMediaSettings && (
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Live Media Space Customizer
                </span>
                <span className="text-[11px] text-slate-400">
                  Update live video stream URL and cover image
                </span>
              </div>
              <form onSubmit={handleApplyMediaSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Video Stream / Embed URL (MP4, WebM, or direct stream)
                  </label>
                  <input
                    type="text"
                    value={customVideoUrl}
                    onChange={(e) => setCustomVideoUrl(e.target.value)}
                    placeholder="Video asset URL or local asset import"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Direct video asset (e.g. bundled filter_coffee_cinematic.mp4)
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Master Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={customCoverImage}
                    onChange={(e) => setCustomCoverImage(e.target.value)}
                    placeholder="Image URL or local asset"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Defaults to generated 8K cinematic filter coffee photography
                  </span>
                </div>

                <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomVideoUrl(defaultVideoAsset);
                      setCustomCoverImage(currentProject.coverImage);
                    }}
                    className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    Reset Defaults
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer"
                  >
                    Apply To Media Space
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PRIMARY SHOWCASE: MASTER COVER IMAGE */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 aspect-video group">
            <div className="relative w-full h-full">
              <img
                src={customCoverImage}
                alt={currentProject.seo?.imageAltText || currentProject.media?.thumbnailAlt || currentProject.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />

              {/* Top Overlay Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-slate-700/80 shadow-md flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Master Cover Image</span>
                </div>
                <span className="bg-blue-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono font-bold text-white shadow-md">
                  16:9 • 4K UHD
                </span>
              </div>

              {/* Bottom Overlay Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white text-xs z-10 pointer-events-auto">
                <div className="space-y-1">
                  <div className="font-bold text-white text-base sm:text-lg font-heading">
                    {currentProject.title.split('|')[0].trim()}
                  </div>
                  <div className="text-xs text-slate-300 max-w-xl line-clamp-2">
                    {currentProject.seo?.imageAltText || currentProject.media?.thumbnailAlt || 'Macro bean texture, brass pour-over filter, warm golden rim lighting.'}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeVideoUrl && (
                    <a
                      href="#video-asset-showcase"
                      className="px-3.5 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 backdrop-blur-md text-white font-semibold transition-colors flex items-center gap-1.5 text-xs cursor-pointer shadow-sm"
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>Watch Video Asset ↓</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowImageZoom(true)}
                    className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold transition-colors flex items-center gap-1.5 text-xs cursor-pointer shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Full View</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ART DIRECTION & TECHNICAL SPECIFICATIONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Aspect Ratio</span>
              <div className="font-bold text-slate-900 font-mono text-sm">16:9 Landscape</div>
              <div className="text-[11px] text-slate-500">Master wide canvas</div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Resolution</span>
              <div className="font-bold text-slate-900 font-mono text-sm">3840 × 2160 (4K UHD)</div>
              <div className="text-[11px] text-slate-500">Ultra-high fidelity</div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Color Palette</span>
              <div className="font-bold text-amber-800 text-sm">Espresso & Amber</div>
              <div className="text-[11px] text-slate-500">Warm golden rim lighting</div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Texture Fidelity</span>
              <div className="font-bold text-emerald-700 text-sm">Photorealistic Macro</div>
              <div className="text-[11px] text-slate-500">Fine roast & aroma detail</div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DEDICATED CINEMATIC AI VIDEO ASSET SHOWCASE */}
          {/* ========================================================================= */}
          {activeVideoUrl && (
            <div id="video-asset-showcase" className="pt-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-950 font-heading">
                    Cinematic AI Video Asset
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                    Bundled Asset Active
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-slate-500 font-semibold">1080p Full HD • 30 FPS • H.264</span>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 aspect-video group">
                <video
                  ref={videoRef}
                  src={activeVideoUrl}
                  poster={customCoverImage}
                  controls
                  playsInline
                  loop
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  className="w-full h-full object-cover"
                />

                {/* Video Watermark / Corner Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
                  <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-slate-700/80 shadow-md flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                    <span>AI Video Commercial Asset</span>
                  </div>
                </div>
              </div>

              {/* Video Asset Technical Specifications Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-slate-900 text-white text-xs border border-slate-800 shadow-md">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Asset Location</span>
                  <div className="font-mono text-blue-400 font-bold truncate mt-0.5 text-[11px]" title="src/assets/video/filter_coffee_cinematic.mp4">
                    src/assets/video/filter_coffee_cinematic.mp4
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Codec & Profile</span>
                  <div className="text-slate-200 font-bold mt-0.5 text-[11px]">
                    H.264 High Profile (MP4)
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Motion Style</span>
                  <div className="text-amber-400 font-bold mt-0.5 text-[11px]">
                    Fluid Pour-Over Flow & Bean Macro
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Resolution & Ratio</span>
                  <div className="text-emerald-400 font-bold mt-0.5 text-[11px]">
                    1920 × 1080 (16:9 Full HD)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Screen Image Zoom Lightbox */}
          {showImageZoom && (
            <div 
              onClick={() => setShowImageZoom(false)}
              className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-in fade-in duration-200"
            >
              <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
                <img
                  src={customCoverImage}
                  alt={currentProject.title}
                  className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl"
                />
                <span className="text-xs text-slate-300 mt-3 font-semibold">
                  Click anywhere to close full preview
                </span>
              </div>
            </div>
          )}
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
          
          {/* Project Overview / Executive Summary */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h2 className="text-xl font-bold text-slate-950 font-heading">
              {currentProject.projectOverview ? 'Project Overview' : 'Executive Summary'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {currentProject.projectOverview || currentProject.summary}
            </p>
          </div>

          {/* Creative Concept Narrative */}
          {currentProject.creativeConcept && (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-950 font-heading">
                  Creative Concept & Aesthetic Vision
                </h3>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {currentProject.creativeConcept}
              </p>
            </div>
          )}

          {/* Video Highlights (User Provided Highlights) */}
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

          {/* Creative Process / Step-by-Step Production */}
          {currentProject.creativeProcess && currentProject.creativeProcess.length > 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 font-heading">
                    Step-by-Step Creative Process
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    From initial bean selection concept to final photorealistic render
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
          ) : (
            /* Fallback Engineering Methodology */
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

          {/* Challenge & Solution Grid (if finalResult not shown or for classic case studies) */}
          {!currentProject.finalResult && (
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
          )}

          {/* Commercial Applications & Distribution Channels */}
          {currentProject.applications && currentProject.applications.length > 0 && (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
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

          {/* Concrete Deliverables */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-950 font-heading">Deliverables & Assets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
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
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              AI Tools & Creative Technologies Deployed
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentProject.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-blue-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* SEO & Search Visibility Information */}
          {currentProject.seo && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>SEO & Content Optimization Tags</span>
              </div>
              <p className="text-slate-600 text-xs">
                {currentProject.seo.metaDescription}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-semibold text-[11px]">
                  Primary: {currentProject.seo.primaryKeyword}
                </span>
                {currentProject.seo.secondaryKeywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 text-[11px]">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

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
            className="w-full sm:w-auto p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors flex items-center gap-3 text-left group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Previous Project</div>
              <div className="text-xs font-bold text-slate-900 line-clamp-1">{prevProject.title}</div>
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
              <div className="text-xs font-bold text-slate-900 line-clamp-1">{nextProject.title}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Call to action for this project type */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black font-heading">
            {currentProject.callToAction?.heading || 'Need a Similar Real-World AI Solution?'}
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            {currentProject.callToAction?.description || "Let's discuss how to apply these methodologies and architectures to your organization's specific challenges."}
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
