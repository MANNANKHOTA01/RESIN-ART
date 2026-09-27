/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { SearchOverlay } from './components/common/SearchOverlay';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { CookieConsent } from './components/common/CookieConsent';

// Public Pages
import { HomePage } from './pages/HomePage';
import { BeginnerPage } from './pages/BeginnerPage';
import { TechniquesPage } from './pages/TechniquesPage';
import { IdeasPage } from './pages/IdeasPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { SuppliesPage } from './pages/SuppliesPage';
import { ToolsPage } from './pages/ToolsPage';
import { SafetyPage } from './pages/SafetyPage';
import { TroubleshootingPage } from './pages/TroubleshootingPage';
import { CarePage } from './pages/CarePage';
import { FAQPage } from './pages/FAQPage';
import { TopicalGuidePage } from './pages/TopicalGuidePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SearchPage } from './pages/SearchPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminArticles } from './pages/admin/AdminArticles';
import { AdminArticleEditor } from './pages/admin/AdminArticleEditor';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminProjectEditor } from './pages/admin/AdminProjectEditor';
import { AdminTaxonomy } from './pages/admin/AdminTaxonomy';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSubscribers } from './pages/admin/AdminSubscribers';
import { AdminSettings } from './pages/admin/AdminSettings';

import { INITIAL_ARTICLES, INITIAL_PROJECTS } from './data/seedData';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept all internal <a> link clicks so they smoothly navigate without 404
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      // Don't intercept target="_blank", mailto, tel, or download links
      if (
        target.target === '_blank' || 
        target.hasAttribute('download') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      // If it's a relative link or matches the app domain
      if (
        href.startsWith('/') ||
        href.startsWith('https://resinartus.vercel.app') ||
        href.startsWith('https://resin_art.vercel.app') ||
        href.startsWith(window.location.origin)
      ) {
        e.preventDefault();
        let targetPath = href;
        if (targetPath.startsWith('http://') || targetPath.startsWith('https://')) {
          try {
            const parsed = new URL(targetPath);
            targetPath = parsed.pathname + parsed.search + parsed.hash;
          } catch {}
        }
        navigate(targetPath || '/');
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [currentPath]);

  const navigate = (path: string) => {
    let clean = path;
    // Normalize full URLs to paths
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      try {
        const u = new URL(clean);
        clean = u.pathname + u.search + u.hash;
      } catch {}
    }

    if (clean === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', clean);
    setCurrentPath(clean);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminRoute = currentPath.startsWith('/admin/');

  // Router dispatcher
  const renderRoute = () => {
    // Normalization: strip origin, search params, hashes, trailing slashes
    let path = currentPath;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      try {
        path = new URL(path).pathname;
      } catch {}
    }
    path = path.split('?')[0].split('#')[0].toLowerCase();
    if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1);
    }

    // Homepage
    if (path === '' || path === '/') {
      return <HomePage onNavigate={navigate} />;
    }

    // Main Sections
    if (path === '/resin-art-for-beginners') {
      return <BeginnerPage onNavigate={navigate} />;
    }
    if (path === '/resin-art-techniques') {
      return <TechniquesPage onNavigate={navigate} />;
    }
    if (path === '/resin-art-ideas') {
      return <IdeasPage onNavigate={navigate} />;
    }
    if (path === '/resin-art-projects') {
      return <ProjectsPage onNavigate={navigate} />;
    }
    if (path === '/resin-art-supplies') {
      return <SuppliesPage onNavigate={navigate} />;
    }
    if (path === '/resin-art-tools') {
      return <ToolsPage onNavigate={navigate} />;
    }
    if (path === '/resin-art-safety') {
      return <SafetyPage onNavigate={navigate} />;
    }
    if (path === '/resin-art-troubleshooting') {
      return <TroubleshootingPage onNavigate={navigate} />;
    }
    if (path === '/resin-art-care') {
      return <CarePage onNavigate={navigate} />;
    }
    if (path === '/resin-art-faq') {
      return <FAQPage onNavigate={navigate} />;
    }

    // Supporting Topical Pages
    if (path === '/epoxy-resin') {
      return <TopicalGuidePage topicKey="epoxy-resin" onNavigate={navigate} />;
    }
    if (path === '/resin-vs-epoxy') {
      return <TopicalGuidePage topicKey="resin-vs-epoxy" onNavigate={navigate} />;
    }
    if (path === '/resin-molds') {
      return <TopicalGuidePage topicKey="resin-molds" onNavigate={navigate} />;
    }
    if (path === '/resin-pigments') {
      return <TopicalGuidePage topicKey="resin-pigments" onNavigate={navigate} />;
    }
    if (path === '/resin-mixing') {
      return <TopicalGuidePage topicKey="resin-mixing" onNavigate={navigate} />;
    }
    if (path === '/resin-curing') {
      return <TopicalGuidePage topicKey="resin-curing" onNavigate={navigate} />;
    }
    if (path === '/remove-resin-bubbles') {
      return <TopicalGuidePage topicKey="remove-resin-bubbles" onNavigate={navigate} />;
    }

    // Dynamic Article Detail Route: /articles/:slug
    if (path.startsWith('/articles/')) {
      const slug = path.replace('/articles/', '');
      return <ArticleDetailPage slug={slug} onNavigate={navigate} />;
    }

    // Dynamic Project Detail Route: /projects/:slug
    if (path.startsWith('/projects/')) {
      const slug = path.replace('/projects/', '');
      return <ProjectDetailPage slug={slug} onNavigate={navigate} />;
    }

    // About, Contact, Search
    if (path === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (path === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (path === '/search') {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q') || '';
      return <SearchPage initialQuery={q} onNavigate={navigate} />;
    }

    // Legal Pages
    if (path === '/privacy-policy') {
      return <LegalPage legalKey="privacy-policy" onNavigate={navigate} />;
    }
    if (path === '/terms-and-conditions') {
      return <LegalPage legalKey="terms-and-conditions" onNavigate={navigate} />;
    }
    if (path === '/disclaimer') {
      return <LegalPage legalKey="disclaimer" onNavigate={navigate} />;
    }
    if (path === '/cookie-policy') {
      return <LegalPage legalKey="cookie-policy" onNavigate={navigate} />;
    }
    if (path === '/affiliate-disclosure') {
      return <LegalPage legalKey="affiliate-disclosure" onNavigate={navigate} />;
    }
    if (path === '/editorial-policy') {
      return <LegalPage legalKey="editorial-policy" onNavigate={navigate} />;
    }
    if (path === '/corrections-policy') {
      return <LegalPage legalKey="corrections-policy" onNavigate={navigate} />;
    }

    // Admin Routes
    if (path === '/admin/login') {
      return <AdminLogin onNavigate={navigate} />;
    }
    if (path === '/admin' || path === '/admin/dashboard') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminDashboard onNavigate={navigate} />
        </AdminLayout>
      );
    }
    if (path === '/admin/articles') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminArticles onNavigate={navigate} />
        </AdminLayout>
      );
    }
    if (path === '/admin/articles/new') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminArticleEditor onNavigate={navigate} />
        </AdminLayout>
      );
    }
    if (path.startsWith('/admin/articles/edit/')) {
      const editId = path.replace('/admin/articles/edit/', '');
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminArticleEditor id={editId} onNavigate={navigate} />
        </AdminLayout>
      );
    }
    if (path === '/admin/projects') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminProjects onNavigate={navigate} />
        </AdminLayout>
      );
    }
    if (path === '/admin/projects/new') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminProjectEditor onNavigate={navigate} />
        </AdminLayout>
      );
    }
    if (path.startsWith('/admin/projects/edit/')) {
      const editId = path.replace('/admin/projects/edit/', '');
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminProjectEditor id={editId} onNavigate={navigate} />
        </AdminLayout>
      );
    }
    if (path === '/admin/categories' || path === '/admin/tags') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminTaxonomy />
        </AdminLayout>
      );
    }
    if (path === '/admin/media') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminMedia />
        </AdminLayout>
      );
    }
    if (path === '/admin/messages') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminMessages />
        </AdminLayout>
      );
    }
    if (path === '/admin/subscribers') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminSubscribers />
        </AdminLayout>
      );
    }
    if (path === '/admin/settings') {
      return (
        <AdminLayout currentPath={currentPath} onNavigate={navigate}>
          <AdminSettings />
        </AdminLayout>
      );
    }

    // Direct Article Slug Fallback (e.g. /ocean-resin-art-guide)
    const directSlug = path.startsWith('/') ? path.slice(1) : path;
    const matchingArticle = INITIAL_ARTICLES.find(a => a.slug.toLowerCase() === directSlug);
    if (matchingArticle) {
      return <ArticleDetailPage slug={matchingArticle.slug} onNavigate={navigate} />;
    }

    // Direct Project Slug Fallback (e.g. /ocean-resin-charcuterie-board)
    const matchingProject = INITIAL_PROJECTS.find(p => p.slug.toLowerCase() === directSlug);
    if (matchingProject) {
      return <ProjectDetailPage slug={matchingProject.slug} onNavigate={navigate} />;
    }

    // 404 Fallback
    return (
      <NotFoundPage
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    );
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-teal-700 selection:text-white">
        {/* Render Global Header on public pages */}
        {!isAdminRoute && (
          <Header
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenMobileMenu={() => setIsMobileNavOpen(true)}
          />
        )}

        {/* Mobile Navigation Drawer */}
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenSearch={() => {
            setIsMobileNavOpen(false);
            setIsSearchOpen(true);
          }}
        />

        {/* Global Search Overlay (Desktop & Mobile) */}
        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={navigate}
        />

        {/* Offline Indicator & Cookie Banner */}
        <OfflineIndicator />
        <CookieConsent />

        {/* Dynamic Route View */}
        <main className="flex-1">
          {renderRoute()}
        </main>

        {/* Render Global Footer on public pages */}
        {!isAdminRoute && <Footer onNavigate={navigate} />}
      </div>
    </AuthProvider>
  );
}
