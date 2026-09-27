import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  Clock, 
  FilePlus, 
  FileText, 
  FolderPlus, 
  ImagePlus, 
  Mail, 
  Plus, 
  ShieldCheck, 
  Users 
} from 'lucide-react';
import { Article, ContactMessage, Project } from '../../types';
import { 
  getArticles, 
  getCategories, 
  getContactMessages, 
  getNewsletterSubscribers, 
  getProjects 
} from '../../services/dataService';

export const AdminDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    publishedArticles: 0,
    draftArticles: 0,
    projectsCount: 0,
    categoriesCount: 0,
    subscribersCount: 0,
    unreadMessages: 0
  });
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [allArts, allProjs, cats, subs, msgs] = await Promise.all([
        getArticles({ status: 'all' }),
        getProjects({ status: 'all' }),
        getCategories(),
        getNewsletterSubscribers(),
        getContactMessages()
      ]);

      setStats({
        publishedArticles: allArts.filter(a => a.status === 'published').length,
        draftArticles: allArts.filter(a => a.status === 'draft').length,
        projectsCount: allProjs.length,
        categoriesCount: cats.length,
        subscribersCount: subs.filter(s => s.status === 'active').length,
        unreadMessages: msgs.filter(m => m.status === 'new').length
      });

      setRecentArticles(allArts.slice(0, 5));
      setRecentMessages(msgs.slice(0, 4));
      setLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs uppercase tracking-widest text-teal-800 font-semibold mb-1 block">
            ResinArt Publishing Suite
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight">
            Editorial CMS Dashboard
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('/admin/articles/new/')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/projects/new/')}
            className="px-3.5 py-2 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FolderPlus className="w-3.5 h-3.5 text-stone-500" />
            <span>New Project</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/media/')}
            className="px-3 py-2 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ImagePlus className="w-3.5 h-3.5 text-stone-400" />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Published Articles', value: stats.publishedArticles, color: 'text-teal-900 bg-teal-50 border-teal-200' },
          { label: 'Draft Articles', value: stats.draftArticles, color: 'text-amber-900 bg-amber-50 border-amber-200' },
          { label: 'Project Blueprints', value: stats.projectsCount, color: 'text-sky-900 bg-sky-50 border-sky-200' },
          { label: 'Categories', value: stats.categoriesCount, color: 'text-stone-900 bg-stone-100 border-stone-200' },
          { label: 'Active Subscribers', value: stats.subscribersCount, color: 'text-emerald-900 bg-emerald-50 border-emerald-200' },
          { label: 'New Messages', value: stats.unreadMessages, color: 'text-rose-900 bg-rose-50 border-rose-200' }
        ].map((m) => (
          <div key={m.label} className={`p-4 rounded-xl border ${m.color} flex flex-col justify-between`}>
            <span className="text-[11px] font-medium opacity-80 leading-tight mb-2">{m.label}</span>
            <span className="font-serif text-2xl font-bold tabular-nums">{loading ? '-' : m.value}</span>
          </div>
        ))}
      </div>

      {/* Two Column Section: Recent Articles & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Articles */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <h3 className="font-serif text-base font-semibold text-stone-900">
              Recent Articles
            </h3>
            <button
              onClick={() => onNavigate('/admin/articles/')}
              className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {recentArticles.map((art) => (
              <div key={art.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-semibold">
                    <span className={art.status === 'published' ? 'text-emerald-700' : 'text-amber-700'}>
                      {art.status}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-400">{art.category?.name || 'General'}</span>
                  </div>
                  <h4 className="font-medium text-xs sm:text-sm text-stone-900 truncate mt-0.5">
                    {art.title}
                  </h4>
                </div>
                <button
                  onClick={() => onNavigate(`/admin/articles/edit/${art.id}`)}
                  className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md shrink-0 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <h3 className="font-serif text-base font-semibold text-stone-900">
              Reader Inquiries
            </h3>
            <button
              onClick={() => onNavigate('/admin/messages/')}
              className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1"
            >
              <span>All Messages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="py-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-stone-900">{msg.name}</strong>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    msg.status === 'new' ? 'bg-rose-100 text-rose-800' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {msg.status}
                  </span>
                </div>
                <p className="text-xs text-stone-600 line-clamp-1">
                  {msg.subject}: {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
