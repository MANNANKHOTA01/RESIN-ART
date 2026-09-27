import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  layout?: 'horizontal' | 'stacked';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showTagline = false,
  layout = 'horizontal'
}) => {
  const isLight = variant === 'light';

  const markDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl'
  };

  const taglineSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9px] tracking-[0.24em]',
    lg: 'text-[11px] tracking-[0.26em]',
    xl: 'text-xs tracking-[0.3em]'
  };

  return (
    <div
      className={`inline-flex ${
        layout === 'stacked' ? 'flex-col items-center text-center' : 'items-center'
      } select-none ${className}`}
    >
      {/* Official 3D Resin Wave "R" with Golden Rim & Splashes */}
      <div className={`relative shrink-0 ${markDimensions[size]}`}>
        <svg
          viewBox="0 0 400 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm overflow-visible"
        >
          <defs>
            {/* Rich Ocean Blue & Teal Resin Gradient */}
            <linearGradient id="waveResinFlow" x1="50" y1="30" x2="350" y2="280" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="25%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="75%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </linearGradient>

            {/* Brushed Champagne Gold Ribbon Rim */}
            <linearGradient id="goldRibbonSweep" x1="40" y1="120" x2="260" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#eab308" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="75%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            {/* Translucent Surface Sheen */}
            <linearGradient id="glassGlossSheen" x1="120" y1="40" x2="260" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Glowing Droplet Fluid */}
            <radialGradient id="dropletHighlight" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#075985" />
            </radialGradient>
          </defs>

          {/* Golden Underside Ribbon Layer */}
          <path
            d="M 125 105 C 105 135, 75 190, 85 240 C 95 270, 140 280, 185 245 C 215 220, 235 225, 275 240 C 235 258, 175 255, 135 220 C 105 195, 95 160, 125 105 Z"
            fill="url(#goldRibbonSweep)"
          />
          <path
            d="M 125 105 C 145 70, 175 50, 195 40 C 160 65, 140 90, 125 105 Z"
            fill="url(#goldRibbonSweep)"
          />

          {/* Primary Fluid Turquoise "R" Wave Crest */}
          <path
            d="M 140 220 C 110 180, 115 110, 170 65 C 220 25, 290 45, 305 110 C 315 155, 270 195, 210 195 C 165 195, 140 225, 145 245 C 150 265, 180 270, 230 240 C 270 215, 300 220, 340 215 C 310 245, 260 270, 190 275 C 135 280, 115 245, 140 220 Z"
            fill="url(#waveResinFlow)"
          />

          {/* Secondary Swirling Inner Wave Volume */}
          <path
            d="M 160 180 C 185 130, 230 90, 275 110 C 300 120, 295 160, 255 175 C 220 188, 185 210, 160 180 Z"
            fill="url(#glassGlossSheen)"
            opacity="0.8"
          />

          {/* Gloss Light Reflection Curve */}
          <path
            d="M 175 75 C 220 50, 265 65, 280 110 C 285 125, 270 145, 245 150"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Flying Splash Droplet (Upper) */}
          <circle cx="310" cy="155" r="9" fill="url(#dropletHighlight)" />
          <circle cx="308" cy="153" r="2.5" fill="#ffffff" opacity="0.9" />

          {/* Elongated Splashing Tear Droplet (Right) */}
          <path
            d="M 335 150 C 345 135, 358 135, 362 145 C 366 155, 355 170, 345 170 C 335 170, 328 160, 335 150 Z"
            fill="url(#dropletHighlight)"
          />
          <circle cx="350" cy="148" r="3" fill="#ffffff" opacity="0.85" />
        </svg>
      </div>

      {/* Brand Typography Lockup */}
      <div className={`${layout === 'stacked' ? 'mt-2 text-center' : 'ml-2.5 sm:ml-3 flex flex-col justify-center'}`}>
        <div className="flex items-baseline">
          <span
            className={`font-serif font-bold tracking-tight ${textSizes[size]} ${
              isLight ? 'text-white' : 'text-[#0c1a2e]'
            }`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Resin<span className={`${isLight ? 'text-teal-300' : 'text-teal-700'}`}>Art</span>
          </span>
        </div>

        {/* Tagline: EXPLORE • CREATE • INSPIRE */}
        {showTagline && (
          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 opacity-90">
            <span
              className={`h-[0.5px] w-3 sm:w-5 ${
                isLight ? 'bg-white/40' : 'bg-stone-400'
              }`}
            />
            <span
              className={`font-sans uppercase font-medium ${taglineSizes[size]} ${
                isLight ? 'text-stone-300' : 'text-stone-600'
              }`}
            >
              Explore <span className="text-teal-600">·</span> Create <span className="text-teal-600">·</span> Inspire
            </span>
            <span
              className={`h-[0.5px] w-3 sm:w-5 ${
                isLight ? 'bg-white/40' : 'bg-stone-400'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
