import React, { useState, useEffect, useRef } from 'react';
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
import Lenis from 'lenis';
import { useDocumentMetadata } from './hooks/useDocumentMetadata';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currentSlug, setCurrentSlug] = useState<string>('');
  const lenisRef = useRef<Lenis | null>(null);

  // Automatically update document title, meta description, OG tags, Twitter cards, and Schema.org JSON-LD
  useDocumentMetadata(currentPage, currentSlug);

  // Initialize Lenis luxury inertial smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

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

    // Smooth scroll to top on page switch
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="will-change-transform"
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
