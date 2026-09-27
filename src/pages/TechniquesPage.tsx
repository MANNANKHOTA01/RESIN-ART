import React, { useState } from 'react';
import { ArrowRight, Check, Clock, Droplet, Flame, Layers, Sparkles, Tag, Wrench } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { 
  HERO_OCEAN_IMAGE, 
  RESIN_GEODE_IMAGE, 
  RESIN_WORKSHOP_IMAGE, 
  RESIN_SAFETY_IMAGE 
} from '../data/seedData';

interface TechniqueDetail {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  image: string;
  overview: string;
  materials: string[];
  steps: string[];
}

export const TechniquesPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const techniquesList: TechniqueDetail[] = [
    {
      id: 'ocean-resin-art',
      name: 'Ocean Resin Art',
      difficulty: 'Intermediate',
      time: '1.5 hours + 24 hr cure',
      image: HERO_OCEAN_IMAGE,
      overview: 'Create breathtaking shoreline gradients with transparent turquoise depths and organic cellular white sea-foam lacing using titanium dioxide wave paste and directed heat airflow.',
      materials: ['1:1 Art Epoxy Resin', 'White Titanium Wave Paste', 'Deep Ocean Blue & Teal Pigments', 'Heat Gun with Concentrator Nozzle', 'Wooden Substrate or Canvas'],
      steps: [
        'Prepare your wooden substrate and seal the wood grain with a clear primer coat.',
        'Mix and tint four resin shades: clear shoreline, aquamarine, cerulean, and midnight navy.',
        'Pour the color gradient bands from dark to light, blending borders with a gloved finger.',
        'Apply a fine bead of white wave paste along the waterline transition.',
        'Hold the heat gun at a 45° angle to push the white paste over the wet blue, creating cellular lacing.'
      ]
    },
    {
      id: 'geode-resin-art',
      name: 'Geode Resin Art',
      difficulty: 'Advanced',
      time: '2 hours + 48 hr cure',
      image: RESIN_GEODE_IMAGE,
      overview: 'Simulate natural hollow quartz crystals and gemstone veins using raw amethyst points, reflective crushed fire glass, and concentric metallic gold leaf ribbons.',
      materials: ['High-Viscosity Art Resin', 'Crushed Reflective Fire Glass', 'Raw Quartz / Amethyst Chips', 'Metallic Mica Powders', 'Gold Foil Leaf & Paint Pen'],
      steps: [
        'Sketch asymmetrical concentric geode rings on your wooden cradle board.',
        'Adhere coarse crushed glass and quartz along the inner fault line using clear resin.',
        'Pour tinted gradient resin bands along the sketched contours.',
        'Sweep lightly with a torch to eliminate micro-bubbles without disturbing the glass.',
        'Hand-gild vein borders with metallic gold paint once resin reaches its firm green-cure stage.'
      ]
    },
    {
      id: 'dirty-pour',
      name: 'Dirty Pour',
      difficulty: 'Beginner',
      time: '45 mins + 24 hr cure',
      image: RESIN_WORKSHOP_IMAGE,
      overview: 'Layer distinct contrasting colored resins inside a single cup, then flip or pour the entire vessel across the panel for mesmerizing marble swirl patterns.',
      materials: ['Medium-Viscosity Epoxy', 'Assorted Mica Powders', 'Silicone Spatulas', '91% Isopropyl Alcohol Spray'],
      steps: [
        'Mix your master resin batch and distribute into 4 individual cups with contrasting colors.',
        'Gently layer each color into one single tall cup without stirring.',
        'Invert the cup onto the center of your board, lift smoothly, and tilt the surface to spread.',
        'Mist once with 91% alcohol to create soft reaction cells and pop bubbles.'
      ]
    },
    {
      id: 'swipe-technique',
      name: 'Swipe Technique',
      difficulty: 'Intermediate',
      time: '1 hour + 24 hr cure',
      image: HERO_OCEAN_IMAGE,
      overview: 'Drag a thin flexible sheet of plastic or damp paper towel across pigmented resin bands to draw an expansive blanket of microscopic cells.',
      materials: ['Art Resin', 'Dense White Pigment Paste', 'Flexible Acetate / Plastic Sheet', 'Silicone Mat'],
      steps: [
        'Lay down adjacent stripes of tinted epoxy on a level canvas.',
        'Pour a thin line of activator color (typically white paste) along the top edge.',
        'Gently rest the plastic sheet over the activator line.',
        'Glide the sheet across the wet resin in one smooth continuous stroke without pushing down.'
      ]
    },
    {
      id: 'layering-depth',
      name: 'Layering & 3D Depth',
      difficulty: 'Advanced',
      time: '3 days (multiple pours)',
      image: RESIN_WORKSHOP_IMAGE,
      overview: 'Pour multiple crystal-clear layers in succession, suspending dried botanicals, metallic leaf, and painting details at different elevations for a deep 3D optical lens effect.',
      materials: ['Ultra-Clear Low-Viscosity Epoxy', 'Pressed Dried Botanicals', 'Fine Acrylic Paint', '1000-Grit Sandpaper'],
      steps: [
        'Pour the initial base foundation layer and let cure to firm green stage (12 hours).',
        'Place botanical specimens or paint fine details directly on the cured surface.',
        'Pour the secondary clear layer to encapsulate the elements.',
        'Repeat for up to 3 to 4 tiers to achieve true volumetric perspective.'
      ]
    },
    {
      id: 'marbling',
      name: 'Resin Marbling',
      difficulty: 'Beginner',
      time: '1 hour + 24 hr cure',
      image: RESIN_GEODE_IMAGE,
      overview: 'Replicate natural Carrara, Calacatta, and Nero Marquina marble with high-opacity resin bases and fine alcohol-softened pigment veins.',
      materials: ['Opaque White / Black Resin Tint', 'Metallic Pigment Paste', 'Wooden Skewers', 'Torch'],
      steps: [
        'Flood your panel with an opaque white or black base coat.',
        'Drizzle contrasting fine lines of charcoal and gold tinted resin across the wet field.',
        'Feather the vein edges using a heat gun or dry wooden skewer.',
        'Torch surface to blend natural mineral gradients.'
      ]
    }
  ];

  const [selectedTech, setSelectedTech] = useState<TechniqueDetail>(techniquesList[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Resin Art Techniques' }]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white mb-10 border border-stone-200">
        <div className="absolute inset-0">
          <img
            src={HERO_OCEAN_IMAGE}
            alt="Fluid resin art pouring techniques"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-2 block">
            Craft Repertoire
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3">
            Resin Art Techniques
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Explore a variety of techniques to create unique effects, from ocean waves to geode patterns. Learn how to master each method and bring your creative vision to life.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar List */}
        <aside className="lg:col-span-4 space-y-2">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
            <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
              Pouring Techniques
            </h3>
            <div className="space-y-1">
              {techniquesList.map((t) => {
                const isSelected = selectedTech.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTech(t)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 text-teal-900 font-semibold border-l-3 border-teal-700'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <span>{t.name}</span>
                    <span className="text-[10px] text-stone-400 uppercase">{t.difficulty}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Active Technique Viewer (Matches Mockup) */}
        <main className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs uppercase tracking-wider text-teal-700 font-semibold">
                  Featured Technique
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-0.5">
                  {selectedTech.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="px-2.5 py-1 bg-stone-100 rounded-md font-medium text-stone-700">
                  {selectedTech.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {selectedTech.time}
                </span>
              </div>
            </div>

            {/* Media Image */}
            <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-6 bg-stone-100">
              <img
                src={selectedTech.image}
                alt={selectedTech.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              {selectedTech.overview}
            </p>

            {/* Step-by-Step Blueprint */}
            <div className="mb-8">
              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">
                Steps to Create {selectedTech.name}
              </h3>
              <ol className="space-y-3">
                {selectedTech.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                    <span className="w-6 h-6 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{st}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tools & Materials Needed */}
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200">
              <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-teal-700" />
                <span>Tools & Materials Required</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTech.materials.map((m) => (
                  <span
                    key={m}
                    className="px-3 py-1 bg-white border border-stone-200 rounded-md text-xs text-stone-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Related Techniques Grid */}
          <div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mb-4">
              Explore More Techniques
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {techniquesList
                .filter((t) => t.id !== selectedTech.id)
                .slice(0, 3)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedTech(item)}
                    className="group cursor-pointer bg-white p-3 rounded-xl border border-stone-200 hover:border-stone-300 transition-all flex flex-col"
                  >
                    <div className="aspect-16/10 rounded-lg overflow-hidden mb-3 bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                      />
                    </div>
                    <h4 className="font-serif font-semibold text-stone-900 text-xs sm:text-sm group-hover:text-teal-800">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                      {item.overview}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
