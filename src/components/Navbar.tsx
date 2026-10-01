import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Compass, 
  Briefcase, 
  BookOpen, 
  Mail, 
  UserCheck 
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, slug?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageRoute; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'about', label: 'About', icon: UserCheck },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'blog', label: 'Blog', icon: BookOpen },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-navigation-bar"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3' 
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 group text-left focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors duration-300 relative overflow-hidden shrink-0">
              <span className="font-bold text-sm tracking-tight font-heading">AVW</span>
              {/* Subtle animated light sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-950 text-base sm:text-lg tracking-tight font-heading">AI VISION WORKS</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">Real-World AI Solutions</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {navItems.map((item) => {
              const isActive = currentPage === item.id || 
                (currentPage === 'project-slug' && item.id === 'projects') ||
                (currentPage === 'service-slug' && item.id === 'services') ||
                (currentPage === 'blog-slug' && item.id === 'blog');

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Let's Talk CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="header-cta-button"
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200 group active:scale-95"
            >
              <span>Consult AI Generalist</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="header-mobile-contact-btn"
              onClick={() => handleNavClick('contact')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-blue-600"
            >
              Consult
            </button>
            <button
              id="mobile-menu-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 focus:outline-hidden shadow-xs"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1.5">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id || 
                  (currentPage === 'project-slug' && item.id === 'projects') ||
                  (currentPage === 'service-slug' && item.id === 'services') ||
                  (currentPage === 'blog-slug' && item.id === 'blog');

                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-3 border-t border-slate-100">
                <button
                  id="mobile-menu-book-btn"
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                  Book Real-World AI Solution
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
