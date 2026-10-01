import React, { useState } from 'react';
import { Blog, PageRoute } from '../types';
import { 
  ArrowRight, 
  Clock, 
  Maximize2, 
  X, 
  Sparkles, 
  Palette, 
  BookOpen,
  Calendar,
  CheckCircle2,
  Play,
  Pause,
  Gauge
} from 'lucide-react';

interface CMSGreyCarouselProps {
  blogs: Blog[];
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const CMSGreyCarousel: React.FC<CMSGreyCarouselProps> = ({ blogs, onNavigate }) => {
  const [isGreyscaleMode, setIsGreyscaleMode] = useState<boolean>(true);
  const [isMarqueeActive, setIsMarqueeActive] = useState<boolean>(true);
  const [marqueeSpeed, setMarqueeSpeed] = useState<'normal' | 'slow' | 'fast'>('normal');
  const [lightboxBlog, setLightboxBlog] = useState<Blog | null>(null);

  const durationMap = {
    slow: '45s',
    normal: '30s',
    fast: '18s',
  };

  const handleCardClick = (slug: string) => {
    onNavigate('blog-slug', slug);
  };

  const cycleSpeed = () => {
    setMarqueeSpeed(curr => {
      if (curr === 'normal') return 'fast';
      if (curr === 'fast') return 'slow';
      return 'normal';
    });
  };

  const renderCard = (blog: Blog, idx: number, setKey: 'a' | 'b') => {
    return (
      <div
        key={`${blog.id}-${setKey}`}
        onClick={() => handleCardClick(blog.slug)}
        className="group shrink-0 w-[300px] sm:w-[350px] md:w-[380px] rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-500 flex flex-col cursor-pointer pointer-events-auto"
      >
        {/* Media Showcase with Monochromatic to Full Colour Bloom */}
        <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900">
          <img
            src={blog.coverImage}
            alt={blog.title}
            draggable={false}
            className={`w-full h-full object-cover transition-all duration-700 ease-out select-none group-hover:scale-105 ${
              isGreyscaleMode 
                ? 'filter grayscale contrast-[108%] brightness-95 group-hover:grayscale-0 group-hover:brightness-100' 
                : 'filter grayscale-0 brightness-100'
            }`}
            loading="lazy"
          />

          {/* Gradient Vignette */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-slate-200/80 shadow-2xs">
            {blog.category}
          </div>

          {/* Lightbox Quick View Button */}
          <button
            type="button"
            title="Quick preview in Lightbox"
            aria-label={`Preview ${blog.title}`}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxBlog(blog);
            }}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-md backdrop-blur-xs"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Publication Date Badge (Bottom Image) */}
          <div className="absolute bottom-3 left-3.5 text-[11px] font-semibold text-slate-200 flex items-center gap-1.5 drop-shadow-xs">
            <Calendar className="w-3 h-3 text-blue-400" />
            <span>{blog.publishedDate}</span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Read Time & Author */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2.5">
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3 h-3 text-blue-600" />
                {blog.readTime}
              </span>
              <span>·</span>
              <span className="text-slate-500 truncate max-w-[160px]">
                By {blog.author.name}
              </span>
            </div>

            {/* Article Title */}
            <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2 font-heading leading-snug">
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
              {blog.excerpt}
            </p>
          </div>

          {/* Card Bottom CTA & CMS Link */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
            <span className="text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
              Read Complete Article
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>

            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
              CMS #{idx + 1}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full select-none" id="cms-grey-carousel-wrapper">
      {/* 1. Top Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-1">
        {/* Editorial Badge & Greyscale Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 font-heading">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Curated Moving Marquee Stream</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse hidden sm:inline-block" />
          <span className="text-xs text-slate-500 hidden sm:inline-block">
            Continuous marquee glide · Hover card to pause & reveal full color
          </span>
        </div>

        {/* Action Controls Toolbar: Marquee Play/Pause, Speed, and Greyscale Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* Marquee Play/Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsMarqueeActive(prev => !prev)}
            aria-label={isMarqueeActive ? "Pause moving marquee" : "Resume moving marquee"}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            {isMarqueeActive ? (
              <>
                <Pause className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden xs:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span className="hidden xs:inline">Play</span>
              </>
            )}
          </button>

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={cycleSpeed}
            title="Adjust marquee scroll speed"
            className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Gauge className="w-3.5 h-3.5 text-slate-500" />
            <span className="capitalize">{marqueeSpeed}</span>
          </button>

          {/* Greyscale Mode Toggle Button */}
          <button
            type="button"
            onClick={() => setIsGreyscaleMode(prev => !prev)}
            aria-label={isGreyscaleMode ? "Switch to Full Colour Mode" : "Switch to Greyscale Mode"}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            {isGreyscaleMode ? (
              <>
                <Palette className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Show Full Colour</span>
                <span className="sm:hidden">Colour</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Greyscale Mode</span>
                <span className="sm:hidden">Grey</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Main Carousel Viewport with Edge Fade Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Child 1: Left Fade Mask */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-20 pointer-events-none bg-linear-to-r from-white via-white/80 to-transparent"
        />

        {/* Child 2: Right Fade Mask */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-20 pointer-events-none bg-linear-to-l from-white via-white/80 to-transparent"
        />

        {/* Child 3: MOVING MARQUEE ANIMATION TRACK */}
        <div
          className="animate-marquee flex items-stretch gap-6 py-4 px-1 select-none hover:[animation-play-state:paused]"
          style={{
            animationPlayState: isMarqueeActive ? 'running' : 'paused',
            animationDuration: durationMap[marqueeSpeed],
          }}
        >
          {/* Stream Set A */}
          {blogs.map((blog, idx) => renderCard(blog, idx, 'a'))}

          {/* Stream Set B (Seamless Infinite Loop Duplicate) */}
          {blogs.map((blog, idx) => renderCard(blog, idx, 'b'))}
        </div>
      </div>

      {/* 3. Bottom Status Bar with Marquee Indicator */}
      <div className="flex items-center justify-between gap-4 mt-4 px-1">
        {/* Marquee Status Indicator */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className={`w-2 h-2 rounded-full ${isMarqueeActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
          <span>
            {isMarqueeActive ? 'Continuous Marquee Glide Active' : 'Marquee Paused'}
          </span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="text-slate-400 hidden sm:inline">
            Speed: {marqueeSpeed} ({durationMap[marqueeSpeed]})
          </span>
        </div>

        {/* Articles Count */}
        <div className="text-xs font-mono font-semibold text-slate-500">
          <span className="text-slate-900 font-bold">{blogs.length}</span> Published Articles
        </div>
      </div>

      {/* 4. Lightbox Fullscreen Preview Modal */}
      {lightboxBlog && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxBlog(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxBlog(null)}
              aria-label="Close preview"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Image */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
              <img
                src={lightboxBlog.coverImage}
                alt={lightboxBlog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-slate-200/80">
                {lightboxBlog.category}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{lightboxBlog.publishedDate}</span>
                <span>·</span>
                <span>{lightboxBlog.readTime}</span>
                <span>·</span>
                <span>Author: {lightboxBlog.author.name} ({lightboxBlog.author.role})</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-heading leading-tight">
                {lightboxBlog.title}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                {lightboxBlog.excerpt}
              </p>

              {/* Key Takeaways Preview */}
              {lightboxBlog.keyTakeaways && lightboxBlog.keyTakeaways.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
                  <div className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Key Article Takeaway
                  </div>
                  <div className="text-xs text-slate-600 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{lightboxBlog.keyTakeaways[0]}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setLightboxBlog(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLightboxBlog(null);
                    onNavigate('blog-slug', lightboxBlog.slug);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
