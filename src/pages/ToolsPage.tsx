import React from 'react';
import { AlertCircle, Check, Flame, Scale, Shield, Wrench } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface ToolItem {
  name: string;
  category: string;
  beginnerNeed: 'Essential' | 'Recommended' | 'Advanced';
  purpose: string;
  safeUsage: string;
  mistakes: string;
}

export const ToolsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const toolsList: ToolItem[] = [
    {
      name: 'Digital Precision Gram Scale',
      category: 'Measuring',
      beginnerNeed: 'Essential',
      purpose: 'Ensures exact weight-based measurement for resins formulated by mass (e.g. 100:45 or 2:1 by weight).',
      safeUsage: 'Always cover scale with plastic cling wrap before weighing to protect the load cell from resin drips.',
      mistakes: 'Using volume cups for resins engineered strictly for gravimetric weight measurements.'
    },
    {
      name: 'Silicone Mixing Cups & Beakers',
      category: 'Mixing',
      beginnerNeed: 'Essential',
      purpose: 'Chemical-resistant containers that do not absorb polymers. Resin does not bond to silicone; residue peels right out after curing.',
      safeUsage: 'Inspect interior walls for tears before each pour; wipe with isopropyl alcohol before reuse.',
      mistakes: 'Using waxed paper cups—hot resin dissolves the interior wax, ruining clarity and causing sticky spots.'
    },
    {
      name: 'Flat Silicone Stir Spatulas',
      category: 'Mixing',
      beginnerNeed: 'Essential',
      purpose: 'Flat blades scrape the bottom and vertical sidewalls of mixing containers cleanly, preventing unmixed liquid pockets.',
      safeUsage: 'Stir methodically with figure-eight and perimeter scraping motions without whipping air.',
      mistakes: 'Using round wooden dowels or popsicle sticks which introduce wood splinters and fail to scrape corners.'
    },
    {
      name: 'Dual-Temperature Heat Gun',
      category: 'Thermal Manipulation',
      beginnerNeed: 'Recommended',
      purpose: 'Provides controlled warm airflow to push ocean foam cells, thin high-viscosity resin, and manipulate fluid veins.',
      safeUsage: 'Use the low fan setting with a focused nozzle held at a 45-degree angle 3 inches away.',
      mistakes: 'Blowing full blast at 90 degrees, splashing wet resin across your studio and onto clothing.'
    },
    {
      name: 'Butane Culinary Torch',
      category: 'Thermal De-bubbling',
      beginnerNeed: 'Essential',
      purpose: 'Emits carbon dioxide and gentle heat that immediately pops surface micro-bubbles in seconds without disturbing liquid patterns.',
      safeUsage: 'Keep the flame moving constantly across the piece like a spray paint can; never hold in one spot.',
      mistakes: 'Holding the flame too close or stationary, scorching the epoxy and melting silicone molds.'
    },
    {
      name: 'Heavy-Duty Silicone Work Mat',
      category: 'Workspace Protection',
      beginnerNeed: 'Essential',
      purpose: 'Protects table surfaces from irreversible epoxy drips. Cured resin simply peels away effortlessly.',
      safeUsage: 'Clean cured drips after each session with tape or by flexing the mat over a waste bin.',
      mistakes: 'Working over porous cardboard or newspapers, which permanently bond to wet resin.'
    },
    {
      name: 'Medical-Grade Nitrile Gloves',
      category: 'Personal Protection',
      beginnerNeed: 'Essential',
      purpose: 'Blocks reactive polyamines and epoxy monomers from absorbing into the dermal layer.',
      safeUsage: 'Change gloves immediately if resin contacts the fingers. Always peel off inside-out.',
      mistakes: 'Wearing latex gloves. Epoxy monomers permeate latex in under 2 minutes.'
    },
    {
      name: 'NIOSH OV/P95 Half-Face Respirator',
      category: 'Personal Protection',
      beginnerNeed: 'Essential',
      purpose: 'Dual cartridges filter organic vapors and airborne dust generated during exothermic curing and sanding.',
      safeUsage: 'Conduct a positive/negative pressure seal check every time you put the respirator on.',
      mistakes: 'Relying on standard cloth dust masks, which offer ZERO filtration against chemical organic vapors.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Resin Art Tools & Equipment' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
          Equipment Taxonomy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-3">
          Resin Art Tools
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed">
          Detailed guide to essential tools used in modern resin crafting. Learn what each tool does, whether beginners need it, how to operate it safely, and common mistakes to avoid.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolsList.map((tool) => (
          <div
            key={tool.name}
            className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-stone-400 font-medium">{tool.category}</span>
                <span
                  className={`px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase tracking-wide ${
                    tool.beginnerNeed === 'Essential'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-teal-50 text-teal-800 border border-teal-200'
                  }`}
                >
                  {tool.beginnerNeed}
                </span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
                {tool.name}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {tool.purpose}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                <strong className="text-stone-800 block mb-0.5">Safe Usage Protocol:</strong>
                <span className="text-stone-600">{tool.safeUsage}</span>
              </div>
              <div className="bg-rose-50/50 p-2.5 rounded-lg border border-rose-100 text-rose-900">
                <strong className="block mb-0.5">Common Pitfall:</strong>
                <span>{tool.mistakes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
