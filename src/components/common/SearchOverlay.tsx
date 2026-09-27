import React, { useEffect, useRef, useState } from 'react';
import { Clock, Search, Tag, X } from 'lucide-react';
import { Article, Project } from '../../types';
import { getArticles, getProjects } from '../../services/dataService';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setArticles([]);
      setProjects([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setArticles([]);
      setProjects([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const [arts, projs] = await Promise.all([
          getArticles({ search: query, status: 'published' }),
          getProjects({ search: query, status: 'published' })
        ]);
        setArticles(arts);
        setProjects(projs);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const popularSuggestions = [
    'Ocean waves',
    'Sticky resin fix',
    'Remove bubbles',
    'Geode tray',
    'Resin coasters',
    'Resin vs epoxy'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-stone-900/70 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-stone-200">
          <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search guides, techniques, troubleshooting, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-stone-800 placeholder-stone-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800 bg-stone-100 rounded-sm"
          >
            Esc
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {/* Default Suggestions */}
          {!query && (
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
                Suggested Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSuggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-teal-50 hover:text-teal-800 text-stone-700 text-xs rounded-md transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="py-12 text-center text-xs text-stone-400">
              Searching ResinArt database...
            </div>
          )}

          {/* Empty State */}
          {!loading && query && articles.length === 0 && projects.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-stone-700">No matching guides found</p>
              <p className="text-xs text-stone-500 mt-1">
                Try searching for broader terms like "bubbles", "waves", "mixing", or "curing".
              </p>
            </div>
          )}

          {/* Results: Articles */}
          {!loading && articles.length > 0 && (
            <div className="space-y-3 mb-6">
              <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                Guides & Articles ({articles.length})
              </div>
              <div className="divide-y divide-stone-100">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onNavigate(`/articles/${art.slug}`);
                      onClose();
                    }}
                    className="py-3 px-2 flex gap-3 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors group"
                  >
                    <img
                      src={art.featured_image}
                      alt={art.title}
                      className="w-16 h-16 object-cover rounded-md bg-stone-100 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-teal-700 font-medium mb-1">
                        <span>{art.category?.name || 'Guide'}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-stone-400">
                          <Clock className="w-3 h-3" />
                          {art.reading_time}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-teal-700 truncate">
                        {art.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results: Projects */}
          {!loading && projects.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                Hands-On Projects ({projects.length})
              </div>
              <div className="divide-y divide-stone-100">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      onNavigate(`/projects/${proj.slug}`);
                      onClose();
                    }}
                    className="py-3 px-2 flex gap-3 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors group"
                  >
                    <img
                      src={proj.featured_image}
                      alt={proj.title}
                      className="w-16 h-16 object-cover rounded-md bg-stone-100 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-teal-700 font-medium mb-1">
                        <Tag className="w-3 h-3" />
                        <span>{proj.difficulty}</span>
                        <span>·</span>
                        <span className="text-stone-400">{proj.estimated_time}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-teal-700 truncate">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                        {proj.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
