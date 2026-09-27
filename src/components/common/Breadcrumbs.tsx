import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  path?: string;
}

export const Breadcrumbs: React.FC<{
  items: Crumb[];
  onNavigate: (path: string) => void;
}> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-stone-500 mb-6 flex-wrap gap-1">
      <button
        onClick={() => onNavigate('/')}
        className="flex items-center gap-1 hover:text-stone-900 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((crumb, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
            {isLast || !crumb.path ? (
              <span className="text-stone-900 font-medium truncate max-w-xs">{crumb.label}</span>
            ) : (
              <button
                onClick={() => onNavigate(crumb.path!)}
                className="hover:text-stone-900 transition-colors truncate max-w-xs"
              >
                {crumb.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
