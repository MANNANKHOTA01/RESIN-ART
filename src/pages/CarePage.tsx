import React from 'react';
import { AlertCircle, Check, Droplet, Flame, Sparkles, Sun, SunMedium, Shield } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const CarePage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Resin Art Care & Maintenance' }]}
        onNavigate={onNavigate}
      />

      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
          Preservation Guide
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-3">
          Resin Art Care & Maintenance
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed">
          Proper maintenance preserves the glass-like optical clarity and surface hardness of your epoxy resin pieces for decades. Follow these conservation practices.
        </p>
      </div>

      <div className="space-y-6">
        {/* Cleaning */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <h2 className="font-serif text-xl font-medium text-stone-900 mb-3 flex items-center gap-2">
            <Droplet className="w-5 h-5 text-teal-700" />
            <span>Cleaning & Dust Removal</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
            Clean resin surfaces using a soft, non-abrasive microfiber cloth dampened with lukewarm water and mild dish soap. Never use glass cleaner, ammonia, bleach, or alcohol sprays on cured resin, as harsh solvents soften the plastic and leave cloudy micro-scratches.
          </p>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-700">
            <strong>Recommended cleaning tool:</strong> Optical-grade microfiber cloth with distilled water.
          </div>
        </div>

        {/* Heat Considerations */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <h2 className="font-serif text-xl font-medium text-stone-900 mb-3 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-700" />
            <span>Heat Resistance & Temperature Limits</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
            Most cured art epoxies withstand heat up to 120°F–130°F (50°C), while specialized heat-resistant coaster formulas can resist up to 200°F (93°C). Never place boiling pots or hot pans directly onto a resin surface without a trivet; excessive thermal contact causes circular indentation rings and softening.
          </p>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900">
            <strong>Rule of thumb:</strong> If a mug or dish is too hot to hold comfortably with bare hands, use a protective coaster or cloth.
          </div>
        </div>

        {/* Polishing & Scratches */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <h2 className="font-serif text-xl font-medium text-stone-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-700" />
            <span>Buffing Scratches & Restoring Gloss</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
            Fine hairline surface scratches can be removed with automotive plastic polish (such as Novus Plastic Polish) applied with a foam pad. For deeper scratches, wet sand with 1000, 2000, and 3000-grit sandpaper, then finish with a buffing wheel, or simply pour a thin, fresh clear epoxy flood coat over the sanded area.
          </p>
        </div>

        {/* UV Exposure */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <h2 className="font-serif text-xl font-medium text-stone-900 mb-3 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-600" />
            <span>Display & UV Protection</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Even epoxy resins formulated with HALS light stabilizers should be kept away from direct, continuous south-facing window sunlight. Long-term solar ultraviolet radiation causes ambering and weakens polymer chains over years of exposure.
          </p>
        </div>
      </div>
    </div>
  );
};
