import React, { useState, useMemo } from 'react';
import { PageRoute, ProjectCategory } from '../types';
import { CMS_PROJECTS } from '../data/cmsProjects';
import { ScrollFadeIn } from '../components/ScrollFadeIn';
import { 
  Search, 
  ArrowRight, 
  ArrowUpRight, 
  Filter, 
  Sparkles, 
  Code2, 
  Download, 
  Check, 
  Layers,
  Play,
  Film
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const categories = useMemo(() => {
    const projectCategories = Array.from(new Set(CMS_PROJECTS.map((p) => p.category)));
    return ['all', ...projectCategories] as (ProjectCategory | 'all')[];
  }, []);

  const filteredProjects = CMS_PROJECTS.filter((proj) => {
    const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(CMS_PROJECTS, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  return (
    <div id="projects-page-container" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
              <span>Client Work & Case Studies</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight">
              Real Projects, Proven Results.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore real-world client solutions across automated AI workflows, modern web apps, brand systems, and promotional video creation.
            </p>
          </div>

          {/* CMS JSON Data Inspector Button */}
          <div className="flex items-center gap-3">
            <button
              id="view-cms-json-btn"
              onClick={() => setShowJsonModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs"
              title="Inspect headless JSON data schema"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Inspect CMS JSON</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="projects-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, client, or tech..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium self-start md:self-auto">
              Showing <span className="font-bold text-slate-900">{filteredProjects.length}</span> of {CMS_PROJECTS.length} projects
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`category-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-4">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 font-heading">No projects found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or selecting a different project category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-blue-600 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ScrollFadeIn
                key={project.id}
                delay={(idx % 3) * 0.08}
                id={`project-card-${project.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div onClick={() => onNavigate('project-slug', project.slug)} className="flex-1 flex flex-col">
                  {/* Visual Cover */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
                      {(project.category === 'AI Video Creation' || project.category === 'Video Creation & Editing') && (
                        <Film className="w-3 h-3 text-blue-600" />
                      )}
                      <span>{project.category}</span>
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    {(project.category === 'AI Video Creation' || project.category === 'Video Creation & Editing' || project.media) && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-slate-950/60 text-white backdrop-blur-xs flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 shadow-md">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
                        <span>{project.client}</span>
                        <span>{project.year} · {project.duration}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors font-heading line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Impact Metric & Tech Badges */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">Outcome:</span>
                        {project.metrics && project.metrics.length > 0 && (
                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {project.metrics[0].value} {project.metrics[0].label}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-wrap gap-1">
                          {(project.techStack || []).slice(0, 2).map((tech) => (
                            <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                              {tech}
                            </span>
                          ))}
                          {(project.techStack || []).length > 2 && (
                            <span className="text-[10px] text-slate-400 font-mono py-0.5">
                              +{(project.techStack || []).length - 2}
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          Case Study
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

        {/* JSON CMS Inspection Modal */}
        {showJsonModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg font-heading">
                    Project CMS JSON Structure
                  </h3>
                  <p className="text-xs text-slate-500">
                    Structured data feed for headless API, PHP endpoints, or static consumption.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100 flex items-center gap-1.5"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={() => setShowJsonModal(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed">
                <pre>{JSON.stringify(CMS_PROJECTS, null, 2)}</pre>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>Schema compliant · Ready for PHP/Node/REST microservice ingestion</span>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-950 text-white font-semibold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
