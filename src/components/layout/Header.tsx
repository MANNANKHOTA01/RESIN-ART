import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Search, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { PWAInstallButton } from '../common/PWAInstallButton';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenMobileMenu
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Beginners', path: '/resin-art-for-beginners/' },
    { label: 'Techniques', path: '/resin-art-techniques/' },
    { label: 'Ideas', path: '/resin-art-ideas/' },
    { label: 'Projects', path: '/resin-art-projects/' },
    { label: 'Supplies', path: '/resin-art-supplies/' },
    { label: 'Tools', path: '/resin-art-tools/' },
    { label: 'Safety', path: '/resin-art-safety/' }
  ];

  const moreLinks = [
    { label: 'Troubleshooting', path: '/resin-art-troubleshooting/' },
    { label: 'Resin Care', path: '/resin-art-care/' },
    { label: 'FAQ', path: '/resin-art-faq/' },
    { label: 'Epoxy Resin', path: '/epoxy-resin/' },
    { label: 'Resin vs Epoxy', path: '/resin-vs-epoxy/' },
    { label: 'Resin Molds', path: '/resin-molds/' },
    { label: 'Resin Pigments', path: '/resin-pigments/' },
    { label: 'Resin Mixing', path: '/resin-mixing/' },
    { label: 'Resin Curing', path: '/resin-curing/' },
    { label: 'Remove Resin Bubbles', path: '/remove-resin-bubbles/' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-3'
          : 'bg-[#FAF8F5] border-b border-stone-200/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-sm cursor-pointer"
            aria-label="ResinArt Home"
          >
            <Logo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-medium text-stone-700">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-teal-900 font-semibold bg-teal-50/80'
                      : 'hover:text-stone-900 hover:bg-stone-100/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* "More" Dropdown Menu */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  isMoreOpen ? 'text-teal-900 bg-stone-100' : 'hover:text-stone-900 hover:bg-stone-100/60'
                }`}
                aria-expanded={isMoreOpen}
                aria-haspopup="true"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white p-2 shadow-xl border border-stone-200 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="text-[11px] font-semibold text-stone-400 px-3 py-1.5 uppercase tracking-wider">
                    Topics & Diagnostics
                  </div>
                  <div className="grid grid-cols-1 gap-0.5">
                    {moreLinks.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          onNavigate(item.path);
                          setIsMoreOpen(false);
                        }}
                        className={`text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                          currentPath === item.path
                            ? 'bg-teal-50 text-teal-800 font-medium'
                            : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PWA Install */}
            <div className="hidden sm:block">
              <PWAInstallButton />
            </div>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 rounded-md transition-colors cursor-pointer"
              aria-label="Search articles and tutorials"
              title="Search (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Admin CMS indicator if logged in */}
            {isAdmin && (
              <button
                onClick={() => onNavigate('/admin/dashboard/')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors"
                title="Admin CMS Active"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin</span>
              </button>
            )}

            {/* Primary CTA */}
            <button
              onClick={() => onNavigate('/resin-art-for-beginners/')}
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold tracking-wide text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              Explore Guides
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
