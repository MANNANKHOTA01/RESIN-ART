import React, { useEffect, useState } from 'react';
import { Edit2, Eye, FilePlus, Globe, Lock, Plus, Search, Trash2 } from 'lucide-react';
import { Article } from '../../types';
import { deleteArticle, getArticles, saveArticle } from '../../services/dataService';

export const AdminArticles: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    const data = await getArticles({ status: 'all' });
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleToggleStatus = async (art: Article) => {
    const newStatus = art.status === 'published' ? 'draft' : 'published';
    await saveArticle({ ...art, status: newStatus });
    await fetchArticles();
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      await deleteArticle(id);
      await fetchArticles();
    }
  };

  const filtered = articles.filter((a) => {
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchesSearch =
      !search.trim() ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight">
            Article Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Create, edit, preview, and control publishing status across the publication.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/admin/articles/new/')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <FilePlus className="w-3.5 h-3.5" />
          <span>New Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-teal-700"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {(['all', 'published', 'draft'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize cursor-pointer transition ${
                filterStatus === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Read Time</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-stone-400">
                    Loading articles...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-stone-500">
                    No articles found matching filters.
                  </td>
                </tr>
              ) : (
                filtered.map((art) => (
                  <tr key={art.id} className="hover:bg-stone-50/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                        {art.title}
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        /articles/{art.slug}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {art.category?.name || 'General'}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(art)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition ${
                          art.status === 'published'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle publish/draft"
                      >
                        {art.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      {art.reading_time}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      {art.status === 'published' && (
                        <button
                          onClick={() => onNavigate(`/articles/${art.slug}`)}
                          className="p-1.5 text-stone-400 hover:text-stone-900 rounded hover:bg-stone-100"
                          title="View on public site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onNavigate(`/admin/articles/edit/${art.id}`)}
                        className="p-1.5 text-teal-700 hover:text-teal-900 rounded hover:bg-teal-50"
                        title="Edit article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(art.id, art.title)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                        title="Delete article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
