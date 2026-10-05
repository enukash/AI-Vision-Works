import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CMS_BLOGS } from '../data/cmsBlogs';
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Mail, 
  TrendingUp, 
  Check 
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['all', 'Generative AI', 'Prompt Engineering', 'AI & Finance', 'Agent Development', 'Vibe Coding'];

  const filteredBlogs = CMS_BLOGS.filter((blog) => {
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = CMS_BLOGS[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div id="blog-page-container" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>Guides & Articles</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight">
            Practical AI Guides & Insights.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Straightforward, practical articles explaining autonomous AI agents, prompt engineering, vibe coding, and how modern businesses build with AI.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat === 'all' ? 'All Topics' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research topics..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600"
            />
          </div>
        </div>

        {/* Featured Article Card (When no active search filter) */}
        {selectedCategory === 'all' && !searchQuery && (
          <div
            id={`featured-lead-article-${featuredBlog.slug}`}
            onClick={() => onNavigate('blog-slug', featuredBlog.slug)}
            className="mb-14 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-7 h-64 lg:h-auto overflow-hidden relative bg-slate-100">
              <img
                src={featuredBlog.coverImage}
                alt={featuredBlog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-2xs">
                Featured Lead Article
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-bold text-blue-600">{featuredBlog.category}</span>
                  <span>·</span>
                  <span>{featuredBlog.publishedDate}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredBlog.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 group-hover:text-blue-600 transition-colors font-heading leading-snug">
                  {featuredBlog.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {featuredBlog.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {featuredBlog.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredBlog.author.avatar}
                    alt={featuredBlog.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <div className="font-bold text-slate-900">{featuredBlog.author.name}</div>
                    <div className="text-slate-400">{featuredBlog.author.role}</div>
                  </div>
                </div>

                <div className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Read Post</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              id={`blog-card-${blog.slug}`}
              onClick={() => onNavigate('blog-slug', blog.slug)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-slate-200/80">
                  {blog.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span>{blog.publishedDate}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors font-heading line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription Box */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4 shadow-xl">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-900/60 border border-blue-800 px-3 py-1 rounded-full">
            Practical AI Dispatch
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Get Practical AI Guides & Real-World Case Studies
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Straightforward insights on building autonomous AI agents, prompt engineering, vibe coding, and launching web apps fast. Zero fluff.
          </p>

          <form onSubmit={handleSubscribe} className="pt-3 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your work email address"
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500 flex-1"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors shrink-0"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          {subscribed && (
            <div className="text-xs text-emerald-400 flex items-center justify-center gap-1.5 pt-1">
              <Check className="w-3.5 h-3.5" />
              <span>Thank you! You have been added to the private dispatch.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
