import React from 'react';
import { PageRoute, ServiceItem } from '../types';
import { CMS_SERVICES } from '../data/cmsServices';
import { ScrollFadeIn } from '../components/ScrollFadeIn';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Sparkles, 
  Share2, 
  ArrowUpRight, 
  Quote, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Workflow 
} from 'lucide-react';

interface ServiceSlugPageProps {
  slug: string;
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const ServiceSlugPage: React.FC<ServiceSlugPageProps> = ({ slug, onNavigate }) => {
  const currentService = CMS_SERVICES.find((s) => s.slug === slug) || CMS_SERVICES[0];
  
  const currentIndex = CMS_SERVICES.findIndex((s) => s.slug === currentService.slug);
  const prevService = currentIndex > 0 ? CMS_SERVICES[currentIndex - 1] : CMS_SERVICES[CMS_SERVICES.length - 1];
  const nextService = currentIndex < CMS_SERVICES.length - 1 ? CMS_SERVICES[currentIndex + 1] : CMS_SERVICES[0];

  return (
    <div id="service-slug-page-container" className="py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Back Action */}
        <div className="flex items-center justify-between mb-8">
          <button
            id="back-to-services-btn"
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            Service #{currentIndex + 1} of {CMS_SERVICES.length}
          </span>
        </div>

        {/* Service Header Title & Category */}
        <ScrollFadeIn className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
              {currentService.category}
            </span>
            {currentService.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>{currentService.badge}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight leading-tight">
            {currentService.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {currentService.tagline}
          </p>

          {/* Metadata Ledger */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs">
            <div>
              <span className="text-slate-400 uppercase font-semibold">Typical Timeline</span>
              <div className="font-bold text-slate-900 mt-0.5">{currentService.typicalDuration}</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold">Category Focus</span>
              <div className="font-bold text-blue-600 mt-0.5">{currentService.category}</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold">Execution Style</span>
              <div className="font-bold text-slate-900 mt-0.5">Full AI Generalist</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold">Delivery Mode</span>
              <div className="font-bold text-slate-900 mt-0.5">Direct & Sprint-Based</div>
            </div>
          </div>
        </ScrollFadeIn>

        {/* Primary Showcase Image */}
        <ScrollFadeIn delay={0.1} className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 mb-12 bg-slate-100">
          <img
            src={currentService.coverImage}
            alt={currentService.title}
            className="w-full h-80 sm:h-[460px] object-cover"
          />
        </ScrollFadeIn>

        {/* Impact Metrics Banner */}
        {currentService.metrics && currentService.metrics.length > 0 && (
          <ScrollFadeIn delay={0.15} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {currentService.metrics.map((metric, i) => (
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
          </ScrollFadeIn>
        )}

        {/* Detailed Service Deep Dive Narrative */}
        <div className="space-y-12 mb-16 text-slate-700 leading-relaxed">
          
          {/* Executive Overview */}
          <ScrollFadeIn className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h2 className="text-xl font-bold text-slate-950 font-heading">Service Overview</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {currentService.description}
            </p>
          </ScrollFadeIn>

          {/* Challenge & Solution Grid */}
          {(currentService.theChallenge || currentService.theSolution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentService.theChallenge && (
                <ScrollFadeIn delay={0.08} className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">The Problem</span>
                  <h3 className="text-lg font-bold text-slate-950 font-heading">The Operational Bottleneck</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {currentService.theChallenge}
                  </p>
                </ScrollFadeIn>
              )}

              {currentService.theSolution && (
                <ScrollFadeIn delay={0.16} className="p-8 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">The Solution</span>
                  <h3 className="text-lg font-bold text-slate-950 font-heading">The AI-Native Approach</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {currentService.theSolution}
                  </p>
                </ScrollFadeIn>
              )}
            </div>
          )}

          {/* Secondary Visual Showcase if available */}
          {currentService.secondaryImage && (
            <ScrollFadeIn className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src={currentService.secondaryImage}
                alt={`${currentService.title} secondary showcase`}
                className="w-full h-72 sm:h-96 object-cover"
              />
            </ScrollFadeIn>
          )}

          {/* Methodology & Workflow */}
          {currentService.methodology && currentService.methodology.length > 0 && (
            <ScrollFadeIn className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4">
              <h3 className="text-xl font-bold text-slate-950 font-heading">Delivery Methodology & Process</h3>
              <ul className="space-y-3">
                {currentService.methodology.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </ScrollFadeIn>
          )}

          {/* Concrete Deliverables */}
          <ScrollFadeIn className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-950 font-heading">Guaranteed Deliverables</h3>
            
            {currentService.deliverablesDetails && currentService.deliverablesDetails.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {currentService.deliverablesDetails.map((del, i) => (
                  <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
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
            ) : (
              <ul className="space-y-2.5 pt-2">
                {currentService.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            )}
          </ScrollFadeIn>

          {/* Business ROI Box */}
          <ScrollFadeIn className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase font-bold text-blue-700 tracking-wider">Business Impact</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">{currentService.businessImpact}</div>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              Request Proposal
            </button>
          </ScrollFadeIn>

          {/* Tech Stack / Tools Deployed */}
          <ScrollFadeIn className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Toolchain & Frameworks Deployed</h4>
            <div className="flex flex-wrap gap-2">
              {currentService.toolsUsed.map((tool) => (
                <span key={tool} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-blue-300">
                  {tool}
                </span>
              ))}
            </div>
          </ScrollFadeIn>

          {/* Client Feedback Quote */}
          {currentService.clientQuote && (
            <ScrollFadeIn className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
              <Quote className="w-8 h-8 text-blue-200 absolute top-6 right-6" />
              <p className="text-slate-800 text-base sm:text-lg italic leading-relaxed mb-4">
                "{currentService.clientQuote.text}"
              </p>
              <div className="border-t border-slate-100 pt-3">
                <div className="font-bold text-slate-950 text-sm font-heading">{currentService.clientQuote.author}</div>
                <div className="text-xs text-slate-500">
                  {currentService.clientQuote.role} · {currentService.clientQuote.company}
                </div>
              </div>
            </ScrollFadeIn>
          )}

        </div>

        {/* Service Navigation (Previous / Next) */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <button
            onClick={() => onNavigate('service-slug', prevService.slug)}
            className="w-full sm:w-auto p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors flex items-center gap-3 text-left group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Previous Service</div>
              <div className="text-xs font-bold text-slate-900 line-clamp-1">{prevService.title}</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            All Services
          </button>

          <button
            onClick={() => onNavigate('service-slug', nextService.slug)}
            className="w-full sm:w-auto p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors flex items-center justify-end gap-3 text-right group cursor-pointer"
          >
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Next Service</div>
              <div className="text-xs font-bold text-slate-900 line-clamp-1">{nextService.title}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Call to action for this service type */}
        <ScrollFadeIn className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black font-heading">
            Need {currentService.title}?
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Let's discuss how we can execute this service within your required timelines and technical environment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-white hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer shadow-md"
            >
              Schedule Scoping Consultation
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-6 py-3.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              View Related Projects
            </button>
          </div>
        </ScrollFadeIn>

      </div>
    </div>
  );
};
