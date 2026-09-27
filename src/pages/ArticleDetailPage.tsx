import React, { useEffect, useState } from 'react';
import { Clock, Share2, Tag, User, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Article, Project } from '../types';
import { getArticleBySlug, getArticles, getProjects } from '../services/dataService';
import { ArticleCard } from '../components/common/ArticleCard';
import { NewsletterSection } from '../components/common/NewsletterSection';

interface ArticleDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailProps> = ({ slug, onNavigate }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const art = await getArticleBySlug(slug);
      if (art) {
        setArticle(art);
        const all = await getArticles({ status: 'published' });
        setRelatedArticles(all.filter((a) => a.id !== art.id).slice(0, 3));
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-xs text-stone-500">
        Loading editorial article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl text-stone-900 mb-2">Article Not Found</h2>
        <p className="text-xs text-stone-600 mb-6">The requested article could not be located in our publication.</p>
        <button
          onClick={() => onNavigate('/')}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: article.category?.name || 'Guides', path: '/resin-art-techniques/' },
          { label: article.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Meta */}
      <header className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
          <span className="font-semibold text-teal-800 uppercase tracking-wide">
            {article.category?.name || 'Editorial Guide'}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            {article.reading_time}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{new Date(article.published_at || article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-sans">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between py-3 border-y border-stone-200 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-serif text-xs font-bold">
              R
            </div>
            <div>
              <span className="font-medium text-stone-900 block">{article.author_name || 'ResinArt Editorial Team'}</span>
              <span className="text-[11px] text-stone-400">Peer-Reviewed Studio Craft</span>
            </div>
          </div>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: article.title, url: window.location.href });
              }
            }}
            className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Featured Visual Image */}
      <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-100 mb-10 shadow-xs border border-stone-200">
        <img
          src={article.featured_image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content Layout */}
      <div className="max-w-3xl">
        <div
          className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Safety Note Callout */}
        <div className="my-10 p-5 rounded-xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3 text-xs sm:text-sm text-teal-950">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold mb-1">ResinArt Studio Safety Reminder</strong>
            <span>Always conduct resin pours in an active cross-ventilated workspace with an organic vapor half-mask respirator and powder-free nitrile gloves.</span>
          </div>
        </div>

        {/* Internal Link Suggestions */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <h4 className="font-serif text-base font-semibold text-stone-900 mb-3">
            Related Exploration
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('/resin-art-for-beginners/')}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200/80 rounded-lg text-xs text-stone-700 transition"
            >
              Beginner Starter Guide →
            </button>
            <button
              onClick={() => onNavigate('/resin-art-safety/')}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200/80 rounded-lg text-xs text-stone-700 transition"
            >
              Health & Safety Standards →
            </button>
            <button
              onClick={() => onNavigate('/resin-art-troubleshooting/')}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200/80 rounded-lg text-xs text-stone-700 transition"
            >
              Troubleshoot Sticky Resin →
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-16">
        <NewsletterSection />
      </div>

      {/* Related Content */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-12 border-t border-stone-200">
          <h3 className="font-serif text-2xl font-medium text-stone-900 mb-6">
            Related Editorial Guides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((art) => (
              <ArticleCard key={art.id} article={art} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
