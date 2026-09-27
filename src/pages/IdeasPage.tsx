import React, { useState } from 'react';
import { ArrowRight, Filter, Search, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { HERO_OCEAN_IMAGE, RESIN_GEODE_IMAGE, RESIN_WORKSHOP_IMAGE } from '../data/seedData';

interface IdeaItem {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  tag: string;
}

export const IdeasPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Home Decor',
    'Wall Art',
    'Jewelry',
    'Coasters',
    'Trays',
    'Furniture',
    'Beginner Projects'
  ];

  const ideasList: IdeaItem[] = [
    {
      id: 'idea-1',
      title: 'Geode Agate Resin Coasters with Gold Gilded Edges',
      category: 'Coasters',
      image: RESIN_GEODE_IMAGE,
      desc: 'Translucent violet and clear layers with real crushed amethyst points and metallic hand-painted rims.',
      tag: 'Home Decor'
    },
    {
      id: 'idea-2',
      title: 'Live-Edge Olive Wood and Turquoise Ocean Wave Tray',
      category: 'Trays',
      image: HERO_OCEAN_IMAGE,
      desc: 'Artisan acacia timber paired with white cell lacing and polished brushed brass handles.',
      tag: 'Furniture'
    },
    {
      id: 'idea-3',
      title: 'Pressed Botanical Teardrop Earrings in UV Resin',
      category: 'Jewelry',
      image: RESIN_WORKSHOP_IMAGE,
      desc: 'Encapsulated forget-me-not dried blossoms inside 14k gold-plated open-back geometric bezels.',
      tag: 'Small Projects'
    },
    {
      id: 'idea-4',
      title: 'Large-Format Cradled Panel Aerial Ocean Coastline',
      category: 'Wall Art',
      image: HERO_OCEAN_IMAGE,
      desc: 'Deep marine navy transitioning to emerald shoreline with three distinct wave crest elevations.',
      tag: 'Wall Art'
    },
    {
      id: 'idea-5',
      title: 'Carrara Marble & Gold Veined Charcuterie Serving Board',
      category: 'Home Decor',
      image: RESIN_GEODE_IMAGE,
      desc: 'Opaque porcelain white epoxy with charcoal and shimmering bronze feather veins.',
      tag: 'Gifts'
    },
    {
      id: 'idea-6',
      title: 'Walnut Slab River Coffee Table with Smoked Resin',
      category: 'Furniture',
      image: RESIN_WORKSHOP_IMAGE,
      desc: 'Kiln-dried bookmatched walnut with an ultra-deep clear river pour and matte hardwax finish.',
      tag: 'Furniture'
    }
  ];

  const filteredIdeas = ideasList.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' ||
      item.category === activeCategory ||
      item.tag === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Creative Resin Art Ideas' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
          Inspiration Gallery
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-3">
          Resin Art Ideas
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed">
          Get inspired with creative and unique resin art ideas. From home decor to wearable jewelry, find your next project here.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-10 space-y-4">
        {/* Search input (matches mockup "Looking for something specific?") */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ideas, techniques, or home crafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-teal-600"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Grid (Matches Mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            onClick={() => onNavigate('/resin-art-projects/')}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src={idea.image}
                alt={idea.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[10px] font-semibold uppercase text-stone-800 rounded-md">
                {idea.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-teal-900 mb-2 leading-snug">
                  {idea.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {idea.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-teal-800">
                <span>View project blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
