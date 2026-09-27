import React, { useState } from 'react';
import { ChevronDown, LogIn, LogOut, Search, Shield, ShieldCheck, UserPlus, X } from 'lucide-react';
import { Logo } from './Logo';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../common/AuthModal';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  currentPath,
  onNavigate,
  onOpenSearch
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const { user, isAdmin, logout } = useAuth();

  if (!isOpen) return null;

  const handleNav = (path: string) => {
    onNavigate(path);
    onClose();
  };

  const mainLinks = [
    { label: 'Home', path: '/' },
    { label: 'Beginners', path: '/resin-art-for-beginners/' },
    { label: 'Techniques', path: '/resin-art-techniques/' },
    { label: 'Ideas', path: '/resin-art-ideas/' },
    { label: 'Projects', path: '/resin-art-projects/' },
    { label: 'Supplies', path: '/resin-art-supplies/' },
    { label: 'Tools', path: '/resin-art-tools/' },
    { label: 'Safety', path: '/resin-art-safety/' }
  ];

  const subLinks = [
    { label: 'Troubleshooting Guide', path: '/resin-art-troubleshooting/' },
    { label: 'Resin Care & Maintenance', path: '/resin-art-care/' },
    { label: 'Frequently Asked Questions', path: '/resin-art-faq/' },
    { label: 'Epoxy Resin Guide', path: '/epoxy-resin/' },
    { label: 'Resin vs. Epoxy Explained', path: '/resin-vs-epoxy/' },
    { label: 'Resin Molds & Silicone Care', path: '/resin-molds/' },
    { label: 'Pigments & Colorants', path: '/resin-pigments/' },
    { label: 'Resin Mixing Techniques', path: '/resin-mixing/' },
    { label: 'Curing Stages & Chemistry', path: '/resin-curing/' },
    { label: 'How to Remove Bubbles', path: '/remove-resin-bubbles/' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-r border-stone-200">
        {/* Header inside drawer */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search quick button */}
        <div className="p-4 border-b border-stone-200/80">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-stone-500 bg-stone-100 hover:bg-stone-200/80 rounded-lg border border-stone-200 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-stone-400" />
              <span>Search ResinArt guides...</span>
            </span>
          </button>
        </div>

        {/* Primary Navigation List */}
        <div className="flex-1 px-3 py-4 space-y-1">
          {mainLinks.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Expandable More Section */}
          <div className="pt-2">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              <span>More Topics & Guides</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMoreOpen && (
              <div className="pl-3 pr-1 py-1 space-y-1 mt-1 border-l-2 border-stone-200 ml-3">
                {subLinks.map((sub) => (
                  <button
                    key={sub.path}
                    onClick={() => handleNav(sub.path)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors ${
                      currentPath === sub.path
                        ? 'text-teal-800 font-semibold bg-teal-50/60'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Auth, PWA & Admin Info */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-3">
          {user ? (
            <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <img
                      src="/manan_irfan.jpg"
                      alt="Manan Irfan"
                      className="w-7 h-7 rounded-full object-cover border border-teal-600"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                      {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-semibold text-stone-900 block">
                      {user.fullName || (isAdmin ? 'Manan Irfan' : 'Reader')}
                    </span>
                    <span className="text-[10px] text-stone-500 block truncate max-w-[160px]">
                      {user.email}
                    </span>
                  </div>
                </div>
                {isAdmin && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200 rounded">
                    Admin
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                {isAdmin ? (
                  <button
                    onClick={() => handleNav('/admin/dashboard/')}
                    className="text-xs font-medium text-teal-800 flex items-center gap-1 hover:underline"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                    <span>CMS Dashboard</span>
                  </button>
                ) : (
                  <span className="text-xs text-stone-500">Member Session Active</span>
                )}

                <button
                  onClick={async () => {
                    await logout();
                  }}
                  className="text-xs text-rose-600 font-medium flex items-center gap-1 hover:underline"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('signin');
                  setIsAuthModalOpen(true);
                }}
                className="py-2 px-3 text-xs font-medium text-stone-800 bg-white border border-stone-200 rounded-lg text-center flex items-center justify-center gap-1.5 shadow-2xs hover:bg-stone-50"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="py-2 px-3 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg text-center flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <PWAInstallButton />
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200">
            <button onClick={() => handleNav('/about/')} className="hover:text-stone-800">About</button>
            <span className="text-stone-300">·</span>
            <button onClick={() => handleNav('/contact/')} className="hover:text-stone-800">Contact</button>
            <span className="text-stone-300">·</span>
            <button 
              onClick={() => handleNav(isAdmin ? '/admin/dashboard/' : '/admin/login/')} 
              className="flex items-center gap-1 hover:text-stone-800"
            >
              <Shield className="w-3 h-3 text-stone-400" />
              <span>{isAdmin ? 'CMS' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onNavigate={onNavigate}
      />
    </div>
  );
};
