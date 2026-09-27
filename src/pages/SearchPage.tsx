import React, { useEffect, useState } from 'react';
import { Clock, Search, Tag } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Article, Project } from '../types';
import { getArticles, getProjects } from '../services/dataService';
import { ArticleCard } from '../components/common/ArticleCard';
import { ProjectCard } from '../components/common/ProjectCard';

export const SearchPage: React.FC<{
  initialQuery?: string;
  onNavigate: (path: string) => void;
}> = ({ initialQuery = '', onNavigate }) => {
  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function executeSearch() {
      if (!query.trim()) {
        const [arts, projs] = await Promise.all([
          getArticles({ status: 'published' }),
          getProjects({ status: 'published' })
        ]);
        setArticles(arts);
        setProjects(projs);
        return;
      }

      setLoading(true);
      const [arts, projs] = await Promise.all([
        getArticles({ search: query, status: 'published' }),
        getProjects({ search: query, status: 'published' })
      ]);
      setArticles(arts);
      setProjects(projs);
      setLoading(false);
    }

    const timer = setTimeout(executeSearch, 200);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Search Knowledge Base' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-2xl mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight mb-4">
          Search ResinArt
        </h1>
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guides, techniques, troubleshooting, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-teal-700 shadow-2xs"
            autoFocus
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-stone-400">
          Searching ResinArt publication database...
        </div>
      ) : (
        <div className="space-y-12">
          {articles.length === 0 && projects.length === 0 && (
            <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8">
              <h3 className="font-serif text-lg font-medium text-stone-900 mb-1">
                No matching results found for "{query}"
              </h3>
              <p className="text-xs text-stone-500">
                Try searching for broader keywords such as "coasters", "bubbles", "waves", or "curing".
              </p>
            </div>
          )}

          {articles.length > 0 && (
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mb-6">
                Articles & Guides ({articles.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((art) => (
                  <ArticleCard key={art.id} article={art} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mb-6">
                Hands-On Projects ({projects.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <ProjectCard key={proj.id} project={proj} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
