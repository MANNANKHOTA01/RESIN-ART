import React from 'react';
import { ArrowRight, Compass, Home, Search } from 'lucide-react';
import { Logo } from '../components/layout/Logo';

export const NotFoundPage: React.FC<{
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}> = ({ onNavigate, onOpenSearch }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center mx-auto shadow-xs">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold block">
          404 — Page Not Located
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
          Looks like this page took a wrong turn.
        </h1>

        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          The guide or resource you were looking for may have moved, been retitled, or is no longer published.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>

          <button
            onClick={() => onNavigate('/resin-art-for-beginners/')}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSearch}
            className="w-full sm:w-auto px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
