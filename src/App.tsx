import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingBackground } from './components/FloatingElements';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectSlugPage } from './pages/ProjectSlugPage';
import { ServiceSlugPage } from './pages/ServiceSlugPage';
import { BlogPage } from './pages/BlogPage';
import { BlogSlugPage } from './pages/BlogSlugPage';
import { ContactPage } from './pages/ContactPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currentSlug, setCurrentSlug] = useState<string>('');

  // Synchronize with URL hash for clean navigation and back button support
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === '') {
        setCurrentPage('home');
        setCurrentSlug('');
      } else if (hash.startsWith('project/')) {
        const slug = hash.replace('project/', '');
        setCurrentPage('project-slug');
        setCurrentSlug(slug);
      } else if (hash.startsWith('service/')) {
        const slug = hash.replace('service/', '');
        setCurrentPage('service-slug');
        setCurrentSlug(slug);
      } else if (hash.startsWith('blog/')) {
        const slug = hash.replace('blog/', '');
        setCurrentPage('blog-slug');
        setCurrentSlug(slug);
      } else if (['home', 'about', 'services', 'projects', 'blog', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageRoute);
        setCurrentSlug('');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (page: PageRoute, slug?: string) => {
    setCurrentPage(page);
    if (slug) {
      setCurrentSlug(slug);
      if (page === 'project-slug') {
        window.location.hash = `#/project/${slug}`;
      } else if (page === 'service-slug') {
        window.location.hash = `#/service/${slug}`;
      } else if (page === 'blog-slug') {
        window.location.hash = `#/blog/${slug}`;
      }
    } else {
      setCurrentSlug('');
      window.location.hash = `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative selection:bg-blue-600 selection:text-white">
      {/* Moving and Floating Ambient Background (Light Theme Blue, White, Black) */}
      <FloatingBackground />

      {/* Persistent Global Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content View Container */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (currentSlug ? `-${currentSlug}` : '')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && (
              <HomePage onNavigate={handleNavigate} />
            )}

            {currentPage === 'about' && (
              <AboutPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'services' && (
              <ServicesPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'service-slug' && (
              <ServiceSlugPage slug={currentSlug} onNavigate={handleNavigate} />
            )}

            {currentPage === 'projects' && (
              <ProjectsPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'project-slug' && (
              <ProjectSlugPage slug={currentSlug} onNavigate={handleNavigate} />
            )}

            {currentPage === 'blog' && (
              <BlogPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'blog-slug' && (
              <BlogSlugPage slug={currentSlug} onNavigate={handleNavigate} />
            )}

            {currentPage === 'contact' && (
              <ContactPage onNavigate={handleNavigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
