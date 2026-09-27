import React from 'react';

export const Logo: React.FC<{
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', variant = 'dark', size = 'md' }) => {
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9'
  };

  return (
    <div className={`flex items-center gap-2.5 font-serif select-none tracking-tight ${className}`}>
      {/* Abstract Resin Wave Flow Emblem */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
          <defs>
            <linearGradient id="logoWaveGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <radialGradient id="dropletCore" cx="50" cy="40" r="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f766e" />
            </radialGradient>
          </defs>
          {/* Fluid Droplet Body */}
          <path
            d="M50 8 C68 30, 85 48, 85 68 C85 86, 69 94, 50 94 C31 94, 15 86, 15 68 C15 48, 32 30, 50 8 Z"
            fill="url(#dropletCore)"
          />
          {/* Swirling Crest Ribbon */}
          <path
            d="M24 72 C32 82, 48 84, 62 76 C76 68, 82 72, 84 70"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          {/* Tiny Floating Ocean Cell */}
          <circle cx="58" cy="62" r="3" fill="#ffffff" fillOpacity="0.9" />
          <circle cx="42" cy="74" r="2" fill="#ffffff" fillOpacity="0.7" />
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      <span className={`font-semibold ${sizeClasses[size]} ${isLight ? 'text-white' : 'text-slate-900'} tracking-tight`}>
        Resin<span className="text-teal-600 font-normal">Art</span>
      </span>
    </div>
  );
};
