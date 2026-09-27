import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  onNavigate: (path: string) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate, featured = false }) => {
  return (
    <article
      onClick={() => onNavigate(`/articles/${article.slug}`)}
      className="group cursor-pointer flex flex-col h-full bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-300 shadow-2xs hover:shadow-md transition-all duration-200"
    >
      {/* Featured image container */}
      <div className={`relative overflow-hidden bg-stone-100 ${featured ? 'aspect-16/9' : 'aspect-4/3'}`}>
        <img
          src={article.featured_image}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
          onError={(e) => {
            // Styled graceful fallback container
            (e.target as HTMLElement).style.opacity = '0';
          }}
        />
        <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2.5">
            <span className="font-semibold text-teal-800 tracking-wide uppercase text-[11px]">
              {article.category?.name || 'Guide'}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{article.reading_time}</span>
          </div>

          {/* Heading */}
          <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-teal-900 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Quiet Read Link */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-teal-800">
          <span>Read Full Guide</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
};
