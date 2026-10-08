import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CMS_SERVICES } from '../data/cmsServices';
import { ScrollFadeIn } from '../components/ScrollFadeIn';
import { ExpandOnHoverList } from '../components/ExpandOnHoverList';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Sparkles, 
  Quote, 
  ShieldCheck, 
  Zap, 
  Workflow,
  ChevronDown,
  Check,
  Bot,
  Building2,
  TrendingUp,
  Users,
  Brain,
  Wrench,
  HelpCircle,
  Globe
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

  const rich = currentService.richContent;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const explainer = rich?.whatIsSocialMediaPostDesign
    ? {
        heading: rich.whatIsSocialMediaPostDesign.heading,
        description: rich.whatIsSocialMediaPostDesign.description,
        body: rich.whatIsSocialMediaPostDesign.body,
        workflow: rich.whatIsSocialMediaPostDesign.elements,
        badgeLabel: 'Social Media Framework',
        pipelineLabel: 'Key Design Elements'
      }
    : rich?.whatIsThumbnailPackaging
    ? {
        heading: rich.whatIsThumbnailPackaging.heading,
        description: rich.whatIsThumbnailPackaging.description,
        body: rich.whatIsThumbnailPackaging.body,
        workflow: rich.whatIsThumbnailPackaging.elements,
        badgeLabel: 'Thumbnail Architecture',
        pipelineLabel: 'Packaging Core Elements'
      }
    : rich?.whatIsDigitalVisualArt
    ? {
        heading: rich.whatIsDigitalVisualArt.heading,
        description: rich.whatIsDigitalVisualArt.description,
        body: rich.whatIsDigitalVisualArt.body,
        workflow: rich.whatIsDigitalVisualArt.elements,
        badgeLabel: 'Visual Art Framework',
        pipelineLabel: 'Core Visual Elements'
      }
    : rich?.whatIsAIvideoCreation
    ? {
        heading: rich.whatIsAIvideoCreation.heading,
        description: rich.whatIsAIvideoCreation.description,
        body: rich.whatIsAIvideoCreation.body,
        workflow: rich.whatIsAIvideoCreation.workflow,
        badgeLabel: 'AI Video Framework',
        pipelineLabel: 'Visual Production Workflow'
      }
    : rich?.whatIsBrandIdentity
    ? {
        heading: rich.whatIsBrandIdentity.heading,
        description: rich.whatIsBrandIdentity.description,
        body: rich.whatIsBrandIdentity.body,
        workflow: rich.whatIsBrandIdentity.elements,
        badgeLabel: 'Brand Architecture',
        pipelineLabel: 'Core Visual Identity Elements'
      }
    : rich?.whatIsVibeCoding
    ? {
        heading: rich.whatIsVibeCoding.heading,
        description: rich.whatIsVibeCoding.description,
        body: rich.whatIsVibeCoding.body,
        workflow: rich.whatIsVibeCoding.workflow,
        badgeLabel: 'Core Framework',
        pipelineLabel: 'Rapid Iteration Cycle'
      }
    : rich?.whatAreAutonomousAIAgents
    ? {
        heading: rich.whatAreAutonomousAIAgents.heading,
        description: rich.whatAreAutonomousAIAgents.description,
        body: rich.whatAreAutonomousAIAgents.body,
        workflow: rich.whatAreAutonomousAIAgents.workflow,
        badgeLabel: 'Core Framework',
        pipelineLabel: 'Execution Flow Pipeline'
      }
    : null;

  const comparison = rich?.genericVsStrategic
    ? {
        heading: rich.genericVsStrategic.heading,
        leftTitle: rich.genericVsStrategic.genericDesign.title,
        leftFeatures: rich.genericVsStrategic.genericDesign.features,
        rightTitle: rich.genericVsStrategic.strategicDesign.title,
        rightFeatures: rich.genericVsStrategic.strategicDesign.features,
        conclusion: rich.genericVsStrategic.conclusion,
        badge: 'Strategic Design'
      }
    : rich?.traditionalVsAI
    ? {
        heading: rich.traditionalVsAI.heading,
        leftTitle: rich.traditionalVsAI.traditionalDesign?.title || rich.traditionalVsAI.traditionalProduction?.title || 'Traditional Approach',
        leftFeatures: rich.traditionalVsAI.traditionalDesign?.features || rich.traditionalVsAI.traditionalProduction?.features || [],
        rightTitle: rich.traditionalVsAI.aiVisualCreation?.title || rich.traditionalVsAI.aiVideoCreation?.title || 'AI-Assisted Creation',
        rightFeatures: rich.traditionalVsAI.aiVisualCreation?.features || rich.traditionalVsAI.aiVideoCreation?.features || [],
        conclusion: rich.traditionalVsAI.conclusion,
        badge: 'AI-Enhanced'
      }
    : rich?.brandVsRandomDesign
    ? {
        heading: rich.brandVsRandomDesign.heading,
        leftTitle: rich.brandVsRandomDesign.randomDesign.title,
        leftFeatures: rich.brandVsRandomDesign.randomDesign.features,
        rightTitle: rich.brandVsRandomDesign.strategicBrandSystem.title,
        rightFeatures: rich.brandVsRandomDesign.strategicBrandSystem.features,
        conclusion: rich.brandVsRandomDesign.conclusion,
        badge: 'Strategic System'
      }
    : rich?.traditionalVsVibeCoding
    ? {
        heading: rich.traditionalVsVibeCoding.heading,
        leftTitle: rich.traditionalVsVibeCoding.traditionalDevelopment.title,
        leftFeatures: rich.traditionalVsVibeCoding.traditionalDevelopment.features,
        rightTitle: rich.traditionalVsVibeCoding.vibeCoding.title,
        rightFeatures: rich.traditionalVsVibeCoding.vibeCoding.features,
        conclusion: rich.traditionalVsVibeCoding.conclusion,
        badge: 'AI-Native'
      }
    : rich?.comparison
    ? {
        heading: rich.comparison.heading,
        leftTitle: rich.comparison.traditionalAutomation.title,
        leftFeatures: rich.comparison.traditionalAutomation.features,
        rightTitle: rich.comparison.autonomousAIAgents.title,
        rightFeatures: rich.comparison.autonomousAIAgents.features,
        conclusion: rich.comparison.conclusion,
        badge: 'Next-Gen'
      }
    : null;

  const capabilities = rich?.postTypes
    ? {
        badge: 'Content Formats & Post Types',
        heading: rich.postTypes.heading,
        description: rich.postTypes.description,
        items: rich.postTypes.items,
        highlight: rich.postTypes.highlight
      }
    : rich?.thumbnailTypes
    ? {
        badge: 'Thumbnail Types & Formats',
        heading: rich.thumbnailTypes.heading,
        description: rich.thumbnailTypes.description,
        items: rich.thumbnailTypes.items,
        highlight: rich.thumbnailTypes.highlight
      }
    : rich?.visualTypes
    ? {
        badge: 'Visual Artwork Types',
        heading: rich.visualTypes.heading,
        description: rich.visualTypes.description,
        items: rich.visualTypes.items,
        highlight: rich.visualTypes.highlight
      }
    : rich?.videoTypes
    ? {
        badge: 'Video Formats & Types',
        heading: rich.videoTypes.heading,
        description: rich.videoTypes.description,
        items: rich.videoTypes.items,
        highlight: rich.videoTypes.highlight
      }
    : rich?.designSystem
    ? {
        badge: 'Design System',
        heading: rich.designSystem.heading,
        description: rich.designSystem.description,
        items: rich.designSystem.items,
        highlight: rich.designSystem.highlight
      }
    : rich?.capabilities
    ? {
        badge: 'Capabilities',
        heading: rich.capabilities.heading,
        description: rich.capabilities.description,
        items: rich.capabilities.items,
        highlight: rich.capabilities.highlight
      }
    : null;

  const creativePillars = rich?.creativeCapabilities
    ? {
        badge: 'Creative Depth',
        heading: rich.creativeCapabilities.heading,
        description: rich.creativeCapabilities.description,
        items: rich.creativeCapabilities.items
      }
    : rich?.brandElements
    ? {
        badge: 'Design Foundations',
        heading: rich.brandElements.heading,
        description: rich.brandElements.description,
        items: rich.brandElements.items
      }
    : null;

  const techOrIntegrations = rich?.technology
    ? {
        badge: 'Modern Tech Stack',
        heading: rich.technology.heading,
        description: rich.technology.description,
        items: rich.technology.areas,
        cta: 'Build With Modern Tech'
      }
    : rich?.integrations
    ? {
        badge: 'Ecosystem',
        heading: rich.integrations.heading,
        description: rich.integrations.description,
        items: rich.integrations.items,
        cta: rich.integrations.cta
      }
    : null;

  return (
    <div id="service-slug-page-container" className="py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* =========================================================================
            1. HERO & INTRODUCTION
        ========================================================================= */}
        <ScrollFadeIn className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
              {rich?.hero?.eyebrow || currentService.category}
            </span>
            {currentService.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>{currentService.badge}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight leading-tight">
            {rich?.hero?.heading || currentService.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            {rich?.hero?.description || currentService.tagline}
          </p>

          {/* Hero CTAs */}
          {rich?.hero && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{rich.hero.primaryCTA}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById('capabilities-section') || document.getElementById('deep-dive-section');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
              >
                {rich.hero.secondaryCTA}
              </button>
            </div>
          )}

          {/* Metadata Ledger */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs mt-4">
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
              <div className="font-bold text-slate-900 mt-0.5">AI Vision Works</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold">Delivery Mode</span>
              <div className="font-bold text-slate-900 mt-0.5">Direct & Sprint-Based</div>
            </div>
          </div>
        </ScrollFadeIn>

        {/* Primary Showcase Image */}
        <ScrollFadeIn delay={0.1} className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 mb-12 bg-slate-900">
          <img
            src={currentService.coverImage}
            alt={currentService.title}
            className="w-full h-80 sm:h-[480px] object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = currentService.secondaryImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
            }}
          />
        </ScrollFadeIn>

        {/* Impact Metrics Banner */}
        {currentService.metrics && currentService.metrics.length > 0 && (
          <ScrollFadeIn delay={0.12} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
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

        {/* =========================================================================
            RICH CONTENT SECTIONS (Rendered when richContent is provided)
        ========================================================================= */}
        {rich ? (
          <div id="deep-dive-section" className="space-y-16 mb-20 text-slate-700 leading-relaxed">
            
            {/* 1. INTRODUCTION & HIGHLIGHTS */}
            {rich.introduction && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Overview
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.introduction.heading}
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-2">
                    {rich.introduction.description}
                  </p>
                  {rich.introduction.supportingText && (
                    <p className="text-slate-500 text-sm leading-relaxed mt-2">
                      {rich.introduction.supportingText}
                    </p>
                  )}
                </div>

                {rich.introduction.highlights && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    {rich.introduction.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-800"
                      >
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollFadeIn>
            )}

            {/* 2. EXPLAINER & WORKFLOW / ELEMENTS */}
            {explainer && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white shadow-xl space-y-6 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-xs font-bold text-blue-300">
                    <Brain className="w-3.5 h-3.5 text-blue-400" />
                    <span>{explainer.badgeLabel}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-heading mt-3">
                    {explainer.heading}
                  </h3>
                  <p className="text-slate-300 text-base sm:text-lg mt-2 leading-relaxed max-w-3xl">
                    {explainer.description}
                  </p>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed max-w-3xl">
                    {explainer.body}
                  </p>
                </div>

                {/* Workflow or elements pipeline track */}
                {explainer.workflow && (
                  <div className="pt-4 border-t border-slate-800">
                    <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-4">
                      {explainer.pipelineLabel}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-2">
                      {explainer.workflow.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                        >
                          <span className="text-[10px] font-mono text-blue-400 font-bold">0{idx + 1}</span>
                          <span className="text-xs font-semibold text-white mt-1 leading-snug">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollFadeIn>
            )}

            {/* CREATIVE PILLARS / BRAND ELEMENTS */}
            {creativePillars && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {creativePillars.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {creativePillars.heading}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed max-w-3xl">
                    {creativePillars.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {creativePillars.items.map((elem, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          0{idx + 1}
                        </div>
                        <h4 className="text-base font-bold text-slate-950 font-heading">{elem.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{elem.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollFadeIn>
            )}

            {/* 3. SERVICES (Expand-OnHover List Layout) */}
            {rich.services && (
              <ScrollFadeIn className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Service Catalog
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.services.heading}
                  </h3>
                </div>

                <ExpandOnHoverList
                  items={rich.services.items}
                  onNavigate={onNavigate}
                />
              </ScrollFadeIn>
            )}

            {/* 4. CAPABILITIES / DESIGN SYSTEM */}
            {capabilities && (
              <ScrollFadeIn id="capabilities-section" className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {capabilities.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {capabilities.heading}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed max-w-3xl">
                    {capabilities.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {capabilities.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {capabilities.highlight && (
                  <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 font-bold text-sm flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{capabilities.highlight}</span>
                  </div>
                )}
              </ScrollFadeIn>
            )}

            {/* 5. HOW IT WORKS (From Goal to Action) */}
            {rich.howItWorks && (
              <ScrollFadeIn className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Execution
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.howItWorks.heading}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rich.howItWorks.steps.map((step) => (
                    <div
                      key={step.number}
                      className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 hover:border-blue-300 transition-colors"
                    >
                      <span className="text-xs font-mono font-bold text-blue-600">STEP {step.number}</span>
                      <h4 className="text-lg font-bold text-slate-950 font-heading">{step.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollFadeIn>
            )}

            {/* 6. USE CASES ACROSS DEPARTMENTS */}
            {rich.useCases && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Applications
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.useCases.heading}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rich.useCases.items.map((useCase, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <h4 className="text-sm font-bold text-slate-900 font-heading">{useCase.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{useCase.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollFadeIn>
            )}

            {/* PLATFORM FORMATS */}
            {rich.formats && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Platform Delivery
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.formats.heading}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed max-w-3xl">
                    {rich.formats.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rich.formats.items.map((fmt, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <h4 className="text-sm font-bold text-slate-900 font-heading">{fmt.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{fmt.description}</p>
                    </div>
                  ))}
                </div>

                {rich.formats.technicalNote && (
                  <div className="p-4 rounded-2xl bg-white border border-blue-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider shrink-0 mt-0.5">
                      Spec
                    </span>
                    <p>{rich.formats.technicalNote}</p>
                  </div>
                )}
              </ScrollFadeIn>
            )}

            {/* 7. BENEFITS */}
            {rich.benefits && (
              <ScrollFadeIn className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Measurable Value
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.benefits.heading}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rich.benefits.items.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 hover:shadow-sm transition-shadow"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Zap className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-bold text-slate-950 font-heading">{benefit.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollFadeIn>
            )}

            {/* 8. COMPARISON MATRIX */}
            {comparison && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Comparison
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {comparison.heading}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Traditional Approach */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="text-lg font-bold text-slate-800 font-heading">
                      {comparison.leftTitle}
                    </h4>
                    <ul className="space-y-2.5">
                      {comparison.leftFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Modern Approach */}
                  <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-blue-950 font-heading">
                        {comparison.rightTitle}
                      </h4>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                        {comparison.badge}
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {comparison.rightFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-blue-950 font-medium">
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {comparison.conclusion && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center italic pt-2">
                    {comparison.conclusion}
                  </p>
                )}
              </ScrollFadeIn>
            )}

            {/* 9. DEVELOPMENT PROCESS (7 Steps) */}
            {rich.developmentProcess && (
              <ScrollFadeIn className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Roadmap
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.developmentProcess.heading}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {rich.developmentProcess.steps.map((step) => (
                    <div
                      key={step.number}
                      className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center">
                        {step.number}
                      </div>
                      <h4 className="text-base font-bold text-slate-950 font-heading">{step.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollFadeIn>
            )}

            {/* 10. TECHNOLOGY & INTEGRATIONS */}
            {techOrIntegrations && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white space-y-6 shadow-xl">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800">
                    {techOrIntegrations.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-heading mt-3">
                    {techOrIntegrations.heading}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed max-w-2xl">
                    {techOrIntegrations.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {techOrIntegrations.items.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {techOrIntegrations.cta && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-blue-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {techOrIntegrations.cta}
                    </button>
                  </div>
                )}
              </ScrollFadeIn>
            )}

            {/* 11. WHY AI VISION WORKS */}
            {rich.whyAIvisionWorks && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Core Philosophy
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.whyAIvisionWorks.heading}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed max-w-2xl">
                    {rich.whyAIvisionWorks.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rich.whyAIvisionWorks.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                    >
                      <h4 className="text-base font-bold text-slate-950 font-heading">{pillar.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollFadeIn>
            )}

            {/* 12. TARGET AUDIENCE */}
            {rich.targetAudience && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Who This Is For
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.targetAudience.heading}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    {rich.targetAudience.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {rich.targetAudience.items.map((aud, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
                    >
                      {aud}
                    </span>
                  ))}
                </div>
              </ScrollFadeIn>
            )}

            {/* 13. FREQUENTLY ASKED QUESTIONS */}
            {rich.faq && (
              <ScrollFadeIn className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    FAQ
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading mt-3">
                    {rich.faq.heading}
                  </h3>
                </div>

                <div className="space-y-3">
                  {rich.faq.items.map((item, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                          <span>{item.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                              isOpen ? 'rotate-180 text-blue-600' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollFadeIn>
            )}

            {/* 14. FINAL CALL TO ACTION */}
            {rich.finalCTA && (
              <ScrollFadeIn className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center space-y-4 shadow-xl">
                <h3 className="text-2xl sm:text-4xl font-black font-heading">
                  {rich.finalCTA.heading}
                </h3>
                <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                  {rich.finalCTA.description}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="px-8 py-3.5 rounded-full text-sm font-bold text-blue-700 bg-white hover:bg-slate-100 transition-all shadow-md cursor-pointer"
                  >
                    {rich.finalCTA.primaryCTA}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-3.5 rounded-full text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {rich.finalCTA.secondaryCTA}
                  </button>
                </div>
              </ScrollFadeIn>
            )}

          </div>
        ) : (
          /* =========================================================================
              STANDARD SERVICE TEMPLATE (Fallback for other services)
          ========================================================================= */
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
        )}

        {/* =========================================================================
            SERVICE NAVIGATION (Previous / Next)
        ========================================================================= */}
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

        {/* Closing Global CTA */}
        {!rich && (
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
        )}

      </div>
    </div>
  );
};
