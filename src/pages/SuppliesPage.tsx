import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { 
  RESIN_WORKSHOP_IMAGE, 
  HERO_OCEAN_IMAGE, 
  RESIN_GEODE_IMAGE 
} from '../data/seedData';

export const SuppliesPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Epoxy Resins',
    'Pigments & Colors',
    'Silicone Molds',
    'Decorative Elements'
  ];

  const suppliesList = [
    {
      category: 'Epoxy Resins',
      title: 'Art-Grade Coating Epoxy',
      ratio: '1:1 by Volume',
      desc: 'Formulated with self-leveling additives and UV inhibitors. Designed for canvas art, trays, and coaster flood coats up to 1/8 inch thick.',
      useFor: 'Canvas pours, wooden trays, surface flood coats, coasters',
      tip: 'Do not pour deeper than 1/4 inch at once to avoid thermal runaway boiling.'
    },
    {
      category: 'Epoxy Resins',
      title: 'Deep Pour Casting Resin',
      ratio: '2:1 or 3:1 by Volume',
      desc: 'Low viscosity with a gentle, extended exothermic cure cycle. Enables single pours from 2 to 4 inches deep without excessive heat build-up.',
      useFor: 'River tables, large silicone pyramid molds, deep botanical blocks',
      tip: 'Requires 48 to 72 hours to reach gel state; be patient and shield from dust.'
    },
    {
      category: 'Pigments & Colors',
      title: 'Natural Mica Powders',
      ratio: 'Dry Powder',
      desc: 'Finely ground silicate minerals coated with titanium dioxide or iron oxides. Gives resin a rich pearlescent, metallic shimmer.',
      useFor: 'Ocean swirls, geode rings, metallic accents',
      tip: 'Keep total pigment weight under 6% of the resin volume to maintain shore hardness.'
    },
    {
      category: 'Pigments & Colors',
      title: 'Alcohol Inks',
      ratio: 'Liquid Solvent',
      desc: 'Fast-drying alcohol-based dyes that create transparent jewel-toned tints. Reacts with white sinker ink to generate petri dish effects.',
      useFor: 'Translucent casting, petri dish art, glass-like gradients',
      tip: 'Avoid excessive drops; high alcohol volume can impede hard curing.'
    },
    {
      category: 'Silicone Molds',
      title: 'Platinum-Cure Silicone Molds',
      ratio: 'Flexible Tooling',
      desc: 'High tear strength molds that yield a high-gloss mirror finish without requiring mold release sprays.',
      useFor: 'Coasters, bookmarks, ring cones, jewelry bezels',
      tip: 'Never apply direct flame from a torch inside silicone molds or the resin will fuse.'
    },
    {
      category: 'Decorative Elements',
      title: 'Pressed Botanicals & Dried Flowers',
      ratio: 'Inclusions',
      desc: 'Completely dried miniature flowers and ferns. Must have 0% moisture content before encapsulation.',
      useFor: 'Resin jewelry, paperweights, bookmarks',
      tip: 'Any remaining moisture in fresh plants will cause flowers to turn brown and bubble inside cured resin.'
    }
  ];

  const filtered = suppliesList.filter(
    (s) => activeCategory === 'All' || s.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Resin Art Supplies' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
          Materials Syllabus
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-3">
          Resin Art Supplies
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed">
          Find the best resins, pigments, molds, and more. Discover the essential supplies you need for your resin art journey with zero sponsored bias.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Supplies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filtered.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                <span className="font-semibold text-teal-800 text-[11px] uppercase tracking-wide">
                  {item.category}
                </span>
                <span>{item.ratio}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
              <div>
                <strong className="text-stone-900 block font-medium">Best for:</strong>
                <span className="text-stone-500">{item.useFor}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 text-stone-600">
                <span className="font-semibold text-stone-800">Pro Tip: </span>
                {item.tip}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shop & Reading Guides (Matches Mockup) */}
      <div className="bg-stone-100/70 rounded-2xl p-8 border border-stone-200">
        <h3 className="font-serif text-xl font-medium text-stone-900 mb-6">
          Educational Guides & Chemical Deep Dives
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Best Resin for Art', desc: 'Coating vs casting viscosity curves.', path: '/best-resin-for-art' },
            { title: 'Epoxy vs Casting Resin', desc: 'Understanding exothermic heat tolerance.', path: '/resin-vs-epoxy/' },
            { title: 'Resin Pigments Guide', desc: 'Mica, liquid tint, and paste behavior.', path: '/resin-pigments/' }
          ].map((guide) => (
            <button
              key={guide.title}
              onClick={() => onNavigate(guide.path)}
              className="text-left bg-white p-4 rounded-xl border border-stone-200 hover:border-teal-700 transition-all cursor-pointer group"
            >
              <h4 className="font-serif font-semibold text-stone-900 text-sm group-hover:text-teal-900">
                {guide.title}
              </h4>
              <p className="text-xs text-stone-500 mt-1">{guide.desc}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 mt-3">
                <span>Read Guide</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
