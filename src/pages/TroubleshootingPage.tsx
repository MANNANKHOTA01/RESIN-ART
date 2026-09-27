import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, ArrowRight, Check, HelpCircle, RefreshCw, Wrench } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RESIN_SAFETY_IMAGE, HERO_OCEAN_IMAGE } from '../data/seedData';

interface IssueDetail {
  id: string;
  name: string;
  symptom: string;
  causes: string[];
  solutions: string[];
  prevention: string;
}

export const TroubleshootingPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const issues: IssueDetail[] = [
    {
      id: 'sticky-resin',
      name: 'Resin is Sticky / Tacky',
      symptom: 'Surface remains soft, gummy, or leaves fingerprints after 24–48 hours of curing.',
      causes: [
        'Incorrect measuring ratio (even a 5% difference stops cross-linking).',
        'Scraping unmixed resin from mixing cup sidewalls onto the artwork.',
        'Ambient room temperature fell below 70°F (21°C) during cure.',
        'High atmospheric humidity causing surface amine blush.'
      ],
      solutions: [
        'If liquid: Scrape off uncured resin with a spatula and clean with 91% alcohol.',
        'If tacky/firm: Sand the entire surface thoroughly with 120-grit wet sandpaper to create a mechanical key.',
        'Wipe away sanding dust completely with a microfiber cloth.',
        'Pour a fresh, accurately measured clear epoxy topcoat.'
      ],
      prevention: 'Always measure by calibrated volume or digital scale. Use the 3-minute dual-cup mixing protocol and never scrape the cup.'
    },
    {
      id: 'bubbles',
      name: 'Trapped Micro-Bubbles',
      symptom: 'Cloud of tiny bubbles frozen permanently inside cured resin or bursting at the surface.',
      causes: [
        'Aggressive whipping during stirring.',
        'Cold room temperature increasing resin viscosity.',
        'Air escaping from porous unsealed wood or canvas substrates.'
      ],
      solutions: [
        'If already cured: Sand down until bubbles are opened up, wipe clean, and pour a fresh flood coat.',
        'If currently liquid: Sweep swiftly with a butane torch held 5 inches away.'
      ],
      prevention: 'Pre-warm resin bottles in warm water before mixing; seal porous substrates with a thin primer coat before the main pour.'
    },
    {
      id: 'cloudy-resin',
      name: 'Resin is Cloudy / Milky',
      symptom: 'Cast lacks optical crystal clarity; milky film or opaque haze obscures colors.',
      causes: [
        'Moisture contamination from humid air or water-based acrylic paint.',
        'Condensation inside silicone molds.',
        'Extreme thermal shock or cold temperatures.'
      ],
      solutions: [
        'Cannot be chemically reversed once cured. Surface cloudiness can be sanded through 3000-grit and polished with buffing compound.'
      ],
      prevention: 'Operate a dehumidifier to keep humidity under 50%. Only use oil-free dry micas or alcohol-based tints.'
    },
    {
      id: 'not-curing',
      name: 'Resin is Not Curing (Liquid)',
      symptom: 'Piece remains 100% liquid like syrup after 24 hours.',
      causes: [
        'Omitted Part B hardener completely.',
        'Confused Part A with Part A or Part B with Part B.',
        'Disastrous volumetric measurement imbalance.'
      ],
      solutions: [
        'The chemical reaction cannot restart. Scrape off the syrup, wipe with denatured alcohol, and start fresh.'
      ],
      prevention: 'Label bottles clearly and verify measurements twice before pouring.'
    },
    {
      id: 'cracking',
      name: 'Resin Cracked or Boiled',
      symptom: 'Deep fissures, distorted ripples, or smoke erupted from the center of the mold.',
      causes: [
        'Thermal runaway: poured coating resin too deep (greater than 1/4 inch at once).',
        'Excessive mass concentrated in a narrow space.'
      ],
      solutions: [
        'Cracked castings cannot be healed. Small cracks can be chiseled and backfilled with tinted epoxy.'
      ],
      prevention: 'Use low-viscosity deep-pour casting resin (2:1 or 3:1) for any project deeper than 1/2 inch.'
    },
    {
      id: 'yellowing',
      name: 'Resin Yellowed Over Time',
      symptom: 'Clear resin has developed an amber or yellow tinge.',
      causes: [
        'Sunlight ultraviolet radiation breaking chemical polymer bonds.',
        'Low-grade epoxy lacking Hindered Amine Light Stabilizers (HALS).'
      ],
      solutions: [
        'Cannot be restored once UV degraded. Paint opaque colors or backfill with darker shades.'
      ],
      prevention: 'Select premium art-grade resin with HALS inhibitors and display finished work away from direct sun.'
    },
    {
      id: 'uneven-surface',
      name: 'Dimples, Craters & Fish-Eyes',
      symptom: 'Resin pulled away from certain spots, leaving circular bare depressions.',
      causes: [
        'Substrate was contaminated with oil, grease, or silicone mold release.',
        'Resin was poured too thin, breaking surface tension.'
      ],
      solutions: [
        'Sand the entire surface flat with 180-grit sandpaper, degrease with 99% alcohol, and apply a thicker flood coat.'
      ],
      prevention: 'Never touch substrates with bare fingers; clean with isopropyl alcohol prior to pouring.'
    }
  ];

  const [selectedIssue, setSelectedIssue] = useState<IssueDetail>(issues[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Resin Art Troubleshooting' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-3xl mb-10">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2 block">
          Diagnostic Lab
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-3">
          Resin Art Troubleshooting
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed">
          Encountered a sticky pour, trapped bubbles, or cloudy finish? Select your issue below to discover the exact root cause, prevention measures, and step-by-step repair solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Common Issues Sidebar */}
        <aside className="lg:col-span-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
            <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
              Common Issues
            </h3>
            <div className="space-y-1">
              {issues.map((iss) => {
                const isSelected = selectedIssue.id === iss.id;
                return (
                  <button
                    key={iss.id}
                    onClick={() => setSelectedIssue(iss)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-50 text-amber-950 font-semibold border-l-3 border-amber-600'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <span>{iss.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Diagnostic Panel (Matches Mockup) */}
        <main className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Issue Diagnostic Report</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-3">
              {selectedIssue.name}
            </h2>

            <p className="text-stone-600 text-sm italic mb-6 border-l-2 border-amber-400 pl-3">
              "{selectedIssue.symptom}"
            </p>

            {/* Two Column Causes vs Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
                <h3 className="font-serif font-semibold text-stone-900 text-sm mb-3">
                  Possible Causes
                </h3>
                <ul className="space-y-2 text-xs text-stone-600">
                  {selectedIssue.causes.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200/70">
                <h3 className="font-serif font-semibold text-emerald-950 text-sm mb-3">
                  How to Fix It
                </h3>
                <ul className="space-y-2 text-xs text-stone-700">
                  {selectedIssue.solutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Long-term prevention */}
            <div className="p-4 bg-stone-100/60 rounded-xl border border-stone-200 text-xs text-stone-700">
              <strong className="block text-stone-900 font-semibold mb-1">
                Prevention for Future Pours:
              </strong>
              <span>{selectedIssue.prevention}</span>
            </div>
          </div>

          {/* Related In-Depth Guide Link */}
          <div className="bg-teal-50/80 p-5 rounded-xl border border-teal-200/80 flex items-center justify-between">
            <div>
              <h4 className="font-serif font-semibold text-teal-950 text-sm">
                Need Comprehensive Chemical Walkthrough?
              </h4>
              <p className="text-xs text-teal-800 mt-0.5">
                Read our full peer-reviewed article on curing failure diagnostics.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/articles/why-is-my-resin-sticky')}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
            >
              Read Full Article
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
