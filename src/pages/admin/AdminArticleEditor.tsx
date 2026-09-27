import React, { useEffect, useState } from 'react';
import { 
  AlertTriangle, 
  ArrowLeft, 
  Check, 
  Eye, 
  Globe, 
  HelpCircle, 
  Image, 
  Save, 
  Sparkles 
} from 'lucide-react';
import { Article, Category } from '../../types';
import { getArticleBySlug, getArticles, getCategories, saveArticle } from '../../services/dataService';
import { HERO_OCEAN_IMAGE } from '../../data/seedData';

interface AdminArticleEditorProps {
  id?: string;
  onNavigate: (path: string) => void;
}

export const AdminArticleEditor: React.FC<AdminArticleEditorProps> = ({ id, onNavigate }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: HERO_OCEAN_IMAGE,
    category_id: '',
    reading_time: '5 min read',
    seo_title: '',
    seo_description: '',
    featured: false,
    status: 'draft'
  });

  useEffect(() => {
    async function init() {
      const cats = await getCategories();
      setCategories(cats);

      if (id) {
        // Fetch article by id
        const all = await getArticles({ status: 'all' });
        const existing = all.find((a) => a.id === id);
        if (existing) {
          setFormData(existing);
        }
      } else {
        // Default first category
        if (cats.length > 0) {
          setFormData((prev) => ({ ...prev, category_id: cats[0].id }));
        }
      }
    }
    init();
  }, [id]);

  const handleTitleChange = (val: string) => {
    const slugified = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.id ? prev.slug : slugified,
      seo_title: prev.seo_title || val
    }));
  };

  const insertTag = (before: string, after: string) => {
    const textarea = document.getElementById('article-content-input') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || 'text';
    const replacement = `${before}${selected}${after}`;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  const handleSave = async (publishNow = false) => {
    if (!formData.title || !formData.slug) {
      alert('Please provide a title and slug for the article.');
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    const payload: Partial<Article> = {
      ...formData,
      status: publishNow ? 'published' : formData.status || 'draft',
      published_at: publishNow ? new Date().toISOString() : formData.published_at
    };

    const saved = await saveArticle(payload);
    setSaving(false);
    setStatusMessage(`Article ${publishNow ? 'published' : 'saved'} successfully!`);
    setFormData(saved);

    setTimeout(() => {
      onNavigate('/admin/articles/');
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin/articles/')}
            className="p-1.5 rounded-md hover:bg-stone-200 text-stone-600 transition"
            aria-label="Back to articles"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-medium text-stone-900">
              {id ? 'Edit Article' : 'Compose New Article'}
            </h1>
            <p className="text-xs text-stone-500">
              Database-driven editorial publication engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPreview ? 'Editor Mode' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(false)}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Publish Now</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {isPreview ? (
        /* Live Preview Mode */
        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
          <div className="text-xs uppercase tracking-wider text-teal-800 font-semibold mb-2">
            Live Preview
          </div>
          <h1 className="font-serif text-3xl font-medium text-stone-900 mb-4">
            {formData.title || 'Untitled Article'}
          </h1>
          <p className="text-stone-600 text-sm italic mb-6">
            {formData.excerpt}
          </p>
          {formData.featured_image && (
            <img
              src={formData.featured_image}
              alt=""
              className="aspect-16/9 w-full object-cover rounded-xl mb-8 bg-stone-100"
            />
          )}
          <div
            className="prose prose-stone text-xs sm:text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content written yet.</p>' }}
          />
        </div>
      ) : (
        /* Edit Form Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Editing Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Guide to Ocean Wave Lacing"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-teal-700 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  URL Slug *
                </label>
                <div className="flex items-center text-xs bg-stone-50 border border-stone-200 rounded-lg overflow-hidden focus-within:border-teal-700">
                  <span className="px-3 text-stone-400 bg-stone-100 py-2.5 border-r border-stone-200">
                    /articles/
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-transparent focus:outline-none text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Short Editorial Excerpt
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary for article cards, search results, and social cards..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value, seo_description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 focus:bg-white transition resize-none"
                />
              </div>

              {/* Semantic HTML Formatting Toolbar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Article Body Content (Clean Semantic HTML)
                  </label>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <button
                      type="button"
                      onClick={() => insertTag('<h2>', '</h2>')}
                      className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded cursor-pointer"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<h3>', '</h3>')}
                      className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded cursor-pointer"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<strong>', '</strong>')}
                      className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded cursor-pointer font-bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<em>', '</em>')}
                      className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded cursor-pointer italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<blockquote>\n  "', '"\n</blockquote>')}
                      className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded cursor-pointer"
                    >
                      Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
                      className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded cursor-pointer"
                    >
                      List
                    </button>
                  </div>
                </div>

                <textarea
                  id="article-content-input"
                  rows={16}
                  placeholder="Write in clean semantic HTML (<h2>, <p>, <ul>, <blockquote>)..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-3 text-xs sm:text-sm font-mono bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 focus:bg-white transition leading-relaxed resize-y"
                />
              </div>
            </div>
          </div>

          {/* Settings & SEO Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
              <h3 className="font-serif font-semibold text-stone-900 text-sm pb-2 border-b border-stone-100">
                Publication Settings
              </h3>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-teal-700"
                />
                {formData.featured_image && (
                  <img
                    src={formData.featured_image}
                    alt=""
                    className="w-full aspect-16/9 object-cover rounded-md mt-2 border border-stone-200"
                  />
                )}
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Reading Time
                </label>
                <input
                  type="text"
                  value={formData.reading_time}
                  onChange={(e) => setFormData({ ...formData, reading_time: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-teal-700"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-teal-700"
                />
                <label htmlFor="featured-check" className="font-semibold text-stone-700 cursor-pointer">
                  Feature on Homepage
                </label>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Publishing Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 font-bold"
                >
                  <option value="draft">Draft (Hidden from public & sitemap)</option>
                  <option value="published">Published (Visible publicly)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* SEO Metadata Box */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3 text-xs">
              <h3 className="font-serif font-semibold text-stone-900 text-sm pb-2 border-b border-stone-100 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span>Search Engine Optimization</span>
              </h3>

              <div>
                <label className="block text-stone-600 mb-1 font-medium">
                  SEO Title (30–60 chars)
                </label>
                <input
                  type="text"
                  placeholder={formData.title}
                  value={formData.seo_title}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1 font-medium">
                  SEO Meta Description
                </label>
                <textarea
                  rows={2}
                  placeholder={formData.excerpt}
                  value={formData.seo_description}
                  onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
