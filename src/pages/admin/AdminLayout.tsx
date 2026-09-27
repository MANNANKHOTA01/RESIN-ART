import React, { useEffect } from 'react';
import { 
  BarChart3, 
  ExternalLink, 
  FileText, 
  FolderKanban, 
  Image, 
  Layers, 
  LogOut, 
  Mail, 
  Settings, 
  ShieldCheck, 
  Tag, 
  Users 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/layout/Logo';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPath, onNavigate, children }) => {
  const { isAdmin, loading, logout, authorizedEmail } = useAuth();

  useEffect(() => {
    // Enforce noindex dynamically on admin pages
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');

    return () => {
      meta?.setAttribute('content', 'index, follow');
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center text-xs text-stone-500">
        Verifying administrator credentials...
      </div>
    );
  }

  // Strict route protection
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4 shadow-md">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
            <LogOut className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-stone-900">
            Authorization Required
          </h2>
          <p className="text-xs text-stone-600">
            Only the verified administrator ({authorizedEmail}) can access the CMS.
          </p>
          <button
            onClick={() => onNavigate('/admin/login/')}
            className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard/', icon: BarChart3 },
    { label: 'Articles', path: '/admin/articles/', icon: FileText },
    { label: 'Projects', path: '/admin/projects/', icon: FolderKanban },
    { label: 'Categories & Tags', path: '/admin/categories/', icon: Layers },
    { label: 'Media Library', path: '/admin/media/', icon: Image },
    { label: 'Messages', path: '/admin/messages/', icon: Mail },
    { label: 'Subscribers', path: '/admin/subscribers/', icon: Users },
    { label: 'Site Settings', path: '/admin/settings/', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 text-stone-300 flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Logo variant="light" size="sm" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
            CMS
          </span>
        </div>

        <div className="p-3 text-[11px] text-stone-400 border-b border-slate-800/60 bg-slate-900/50 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="truncate">{authorizedEmail}</span>
        </div>

        <nav className="p-3 space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || currentPath.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-teal-700/80 text-white font-semibold'
                    : 'text-stone-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <button
            onClick={() => onNavigate('/')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-stone-400 hover:text-white hover:bg-slate-900 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </span>
          </button>

          <button
            onClick={async () => {
              await logout();
              onNavigate('/');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
