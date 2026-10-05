import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CMS_BLOGS } from '../data/cmsBlogs';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  BookOpen, 
  Sparkles, 
  Code2, 
  FileText 
} from 'lucide-react';

interface BlogSlugPageProps {
  slug: string;
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const BlogSlugPage: React.FC<BlogSlugPageProps> = ({ slug, onNavigate }) => {
  const currentBlog = CMS_BLOGS.find((b) => b.slug === slug) || CMS_BLOGS[0];
  const [copiedLink, setCopiedLink] = useState(false);

  const relatedBlogs = CMS_BLOGS
    .filter((b) => b.slug !== currentBlog.slug)
    .slice(0, 2);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div id="blog-slug-page-container" className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            id="back-to-blogs-btn"
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <button
            onClick={handleCopyShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share Article'}</span>
          </button>
        </div>

        {/* Header Title Area */}
        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>{currentBlog.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight leading-tight">
            {currentBlog.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            {currentBlog.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <img
                src={currentBlog.author.avatar}
                alt={currentBlog.author.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="font-bold text-slate-950 text-sm font-heading">{currentBlog.author.name}</div>
                <div>{currentBlog.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {currentBlog.publishedDate}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentBlog.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 mb-10 bg-slate-100">
          <img
            src={currentBlog.coverImage}
            alt={currentBlog.title}
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>

        {/* Executive Key Takeaways Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 border border-blue-200 mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Executive Summary & Key Takeaways</span>
          </div>
          <ul className="space-y-2.5 pt-1">
            {currentBlog.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 leading-relaxed font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Content */}
        <article className="space-y-10 text-slate-700 leading-relaxed text-base sm:text-lg mb-16">
          {currentBlog.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading pt-4">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-slate-600 leading-relaxed text-base">
                  {para}
                </p>
              ))}

              {section.codeBlock && (
                <div className="my-6 rounded-2xl bg-slate-950 p-5 text-slate-100 border border-slate-800 overflow-x-auto font-mono text-xs shadow-md">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                    <span>{section.codeBlock.language.toUpperCase()} PATTERN</span>
                    <span>Deterministic Contract</span>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed">
                    {section.codeBlock.code}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </article>

        {/* Article Tags */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 mb-14 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Article Topics:</span>
            {currentBlog.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleCopyShare}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>

        {/* Author Bio Card */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentBlog.author.avatar}
            alt={currentBlog.author.name}
            className="w-20 h-20 rounded-2xl object-cover shadow-sm"
          />
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-bold text-slate-950 text-lg font-heading">
              Written by {currentBlog.author.name}
            </h3>
            <p className="text-xs text-blue-600 font-semibold">{currentBlog.author.role}</p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Renuka Sharma is the Founder of AI Vision Works, helping startups and established businesses build real-world AI agents, rapid web applications, modern brand identities, and high-impact digital experiences.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-slate-950 font-heading mb-6">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedBlogs.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  onNavigate('blog-slug', b.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs hover:shadow-md"
              >
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  {b.category}
                </span>
                <h4 className="font-bold text-slate-950 text-base group-hover:text-blue-600 transition-colors mt-1 font-heading line-clamp-2">
                  {b.title}
                </h4>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-blue-600 mt-4 transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white text-center space-y-4">
          <h3 className="text-2xl font-black font-heading">
            Need Expert Advisory on These Architectures?
          </h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Book a 45-minute technical discovery session to evaluate your team's AI roadmap and architecture.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-white hover:bg-blue-500 hover:text-white transition-all duration-200"
          >
            Contact AI Vision Works
          </button>
        </div>

      </div>
    </div>
  );
};
