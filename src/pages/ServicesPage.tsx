import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CMS_SERVICES, SERVICE_CATEGORIES } from '../data/cmsServices';
import { ScrollFadeIn } from '../components/ScrollFadeIn';
import { OrbitServicesHero } from '../components/OrbitServicesHero';
import { 
  Search, 
  ArrowRight, 
  ArrowUpRight, 
  Code2, 
  Download, 
  Check, 
  Layers, 
  Clock, 
  Sparkles, 
  Calculator,
  CheckCircle2,
  Workflow,
  Cpu,
  ShieldCheck
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Interactive Solution Estimator state
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'srv-agents',
    'srv-vibe-coding-uiux'
  ]);

  const filteredServices = CMS_SERVICES.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchesSearch = 
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.deliverables.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      srv.toolsUsed.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(CMS_SERVICES, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Calculate estimated total timeline
  const calculateTotalWeeks = () => {
    let minWeeks = 0;
    let maxWeeks = 0;
    selectedServices.forEach((id) => {
      const srv = CMS_SERVICES.find((s) => s.id === id);
      if (srv) {
        if (srv.typicalDuration.includes('3 - 6')) {
          minWeeks += 3;
          maxWeeks += 6;
        } else if (srv.typicalDuration.includes('1 - 3')) {
          minWeeks += 1;
          maxWeeks += 3;
        } else if (srv.typicalDuration.includes('2 - 4')) {
          minWeeks += 2;
          maxWeeks += 4;
        } else {
          minWeeks += 1;
          maxWeeks += 2;
        }
      }
    });
    // With AI Vision Works synergy, concurrent execution saves 35% time
    const concurrentMin = Math.max(1, Math.round(minWeeks * 0.65));
    const concurrentMax = Math.max(2, Math.round(maxWeeks * 0.7));
    return `${concurrentMin} - ${concurrentMax} Weeks`;
  };

  return (
    <div id="services-page-container">
      {/* Framer OrbitProject Reference Hero Section */}
      <OrbitServicesHero 
        services={CMS_SERVICES} 
        onNavigate={onNavigate}
        onExploreClick={() => {
          const el = document.getElementById('services-catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <div id="services-catalog-section" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <ScrollFadeIn className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
              <span>Services & Capabilities</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight">
              Real-World AI Solutions for Your Business.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              From building autonomous AI agents and fast web apps to designing complete brand identities and promotional video—explore services designed to deliver real business results.
            </p>
          </ScrollFadeIn>

          {/* CMS JSON Data Inspector Button */}
          <ScrollFadeIn delay={0.1} className="flex items-center gap-3">
            <button
              id="view-services-json-btn"
              onClick={() => setShowJsonModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs cursor-pointer"
              title="Inspect headless services JSON schema"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Inspect Services JSON</span>
            </button>
          </ScrollFadeIn>
        </div>

        {/* Filter and Search Bar (matching Projects Page) */}
        <ScrollFadeIn delay={0.05} className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="services-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, tools, or deliverables..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium self-start md:self-auto">
              Showing <span className="font-bold text-slate-900">{filteredServices.length}</span> of {CMS_SERVICES.length} services
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`service-category-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat === 'all' ? 'All Services' : cat}
              </button>
            ))}
          </div>
        </ScrollFadeIn>

        {/* Services Grid (Layout similar to Projects Page) */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-4 mb-20">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 font-heading">No services found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or switching categories to find related services, deliverables, or frameworks.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {filteredServices.map((srv, idx) => (
              <ScrollFadeIn
                key={srv.id}
                delay={(idx % 3) * 0.08}
                id={`service-card-${srv.slug}`}
                className="h-full flex"
              >
                <div 
                  onClick={() => onNavigate('service-slug', srv.slug)} 
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-blue-600/15 hover:border-blue-400 hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 ease-out flex-1 flex flex-col cursor-pointer will-change-transform"
                >
                  {/* Visual Cover Header */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={srv.coverImage}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = srv.secondaryImage;
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-slate-200/80 shadow-2xs group-hover:border-blue-300 transition-colors">
                      {srv.category}
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {srv.typicalDuration}
                        </span>
                        {srv.badge && (
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {srv.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors font-heading line-clamp-1">
                        {srv.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                        {srv.tagline}
                      </p>
                    </div>

                    {/* Impact Metric & Tools Badges */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">Outcome:</span>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded line-clamp-1 max-w-[200px] text-right">
                          {srv.metrics && srv.metrics.length > 0
                            ? `${srv.metrics[0].value} ${srv.metrics[0].label}`
                            : srv.typicalDuration}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-wrap gap-1">
                          {srv.toolsUsed.slice(0, 2).map((tool) => (
                            <span key={tool} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                              {tool}
                            </span>
                          ))}
                          {srv.toolsUsed.length > 2 && (
                            <span className="text-[10px] text-slate-400 font-mono py-0.5">
                              +{srv.toolsUsed.length - 2}
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          Service Details
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        )}

        {/* INTERACTIVE SOLUTION ESTIMATOR */}
        <ScrollFadeIn className="mb-24 p-8 sm:p-12 rounded-3xl bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Package Configurator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Build Your Custom AI Vision Works Scope
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Select the capabilities required for your project to estimate typical delivery timelines with multi-skill concurrency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 relative z-10">
            {CMS_SERVICES.map((srv) => {
              const isSelected = selectedServices.includes(srv.id);
              return (
                <div
                  key={srv.id}
                  onClick={() => toggleService(srv.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 hover:scale-[1.02] hover:shadow-lg active:scale-[0.99] ${
                    isSelected
                      ? 'bg-blue-600/25 border-blue-400 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80 hover:border-slate-700 hover:shadow-black/40'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'border border-slate-700 bg-slate-950'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">{srv.title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{srv.tagline}</p>
                    <span className="text-[11px] text-blue-300 font-mono mt-1 inline-block">
                      {srv.typicalDuration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Result Bar */}
          <div className="relative z-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Estimated Project Delivery</span>
              <div className="text-2xl font-black text-white font-heading mt-0.5">
                {selectedServices.length === 0 ? 'Select services above' : calculateTotalWeeks()}
                <span className="text-xs font-normal text-slate-400 ml-2">
                  (with parallel AI Vision Works execution)
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              disabled={selectedServices.length === 0}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-white hover:bg-blue-500 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              Request Custom Proposal
            </button>
          </div>
        </ScrollFadeIn>

        {/* STRUCTURED METHODOLOGY */}
        <ScrollFadeIn className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 mb-20">
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-100/60 px-3 py-1.5 rounded-full">
              Structured Methodology
            </span>
            <h2 className="text-3xl font-black text-slate-950 font-heading">
              How We Work Together
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A transparent, 4-stage delivery framework designed to guarantee alignment, speed, and production safety.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="font-bold text-slate-950 text-base font-heading">Discovery & Strategy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We discuss your goals, uncover the best opportunities for AI and automation, and agree on a clear, realistic project plan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="font-bold text-slate-950 text-base font-heading">Working Prototype</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We quickly create clickable web layouts, prompt drafts, visual storyboards, or test agents within days to gather early feedback.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="font-bold text-slate-950 text-base font-heading">Build & Integration</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connecting your software tools, databases, and APIs, thoroughly testing for accuracy, and perfecting the design details.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h4 className="font-bold text-slate-950 text-base font-heading">Launch & Handover</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We launch your solution live, hand over 100% of master files and code, and provide straightforward guides for your team.
              </p>
            </div>
          </div>
        </ScrollFadeIn>

        {/* BOTTOM CALL TO ACTION */}
        <ScrollFadeIn className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black font-heading">
            Ready to Turn Your AI Idea into a Working Solution?
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
            Whether you need a custom AI agent, a full-stack web MVP in days, a fresh brand identity, or a promotional video, let’s schedule a free discovery call.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-white hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer shadow-md"
            >
              Book a Free Discovery Call
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-6 py-3.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              Explore Case Studies
            </button>
          </div>
        </ScrollFadeIn>

        {/* Services CMS JSON Data Inspector Modal (matching Projects Page) */}
        {showJsonModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg font-heading">
                    Services CMS JSON Structure
                  </h3>
                  <p className="text-xs text-slate-500">
                    Structured data feed for headless API, microservice endpoints, or static consumption.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100 flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={() => setShowJsonModal(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed">
                <pre>{JSON.stringify(CMS_SERVICES, null, 2)}</pre>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>Schema compliant · Ready for PHP/Node/REST microservice ingestion</span>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-950 text-white font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};
