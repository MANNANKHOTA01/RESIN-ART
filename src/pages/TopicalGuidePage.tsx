import React from 'react';
import { ArrowRight, BookOpen, Check, Clock, HelpCircle, Layers, ShieldCheck, Wrench } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { HERO_OCEAN_IMAGE, RESIN_WORKSHOP_IMAGE, RESIN_GEODE_IMAGE, RESIN_SAFETY_IMAGE } from '../data/seedData';

interface TopicConfig {
  title: string;
  category: string;
  readingTime: string;
  heroImage: string;
  intro: string;
  takeaways: string[];
  sections: { title: string; content: string }[];
  faqs: { q: string; a: string }[];
}

const TOPICS_DATA: Record<string, TopicConfig> = {
  'epoxy-resin': {
    title: 'Epoxy Resin: Polymer Chemistry, Formulations & Art Applications',
    category: 'Chemistry & Materials',
    readingTime: '8 min read',
    heroImage: RESIN_WORKSHOP_IMAGE,
    intro: 'Epoxy resin is a synthetic thermosetting polymer system created by the stoichiometric reaction between epichlorohydrin-derived resins and polyamine hardeners. In modern fluid art, it provides a high-clarity, non-shrinking glossy surface with superior substrate adhesion.',
    takeaways: [
      'Epoxies cure via exothermic cross-linking, not liquid solvent evaporation.',
      'Different formulations are tailored for thin coatings (high viscosity) versus deep castings (low viscosity).',
      'Hindered Amine Light Stabilizers (HALS) are critical for preventing yellowing.'
    ],
    sections: [
      {
        title: 'The Polymer Chemistry of Epoxy',
        content: 'Unlike polyester resin which relies on free radical polymerization and volatile styrene solvents, two-part epoxy polymerizes through nucleophilic addition. Each epoxide ring on the Part A molecule opens and cross-links with active amine hydrogens on Part B, forming a dense, three-dimensional thermoset lattice with zero solvent emissions.'
      },
      {
        title: 'Viscosity Profiles and Pour Thickness',
        content: 'Surface coating resins exhibit a viscosity between 3,000 and 5,000 cps. This thick consistency allows the resin to self-level smoothly at 1/8-inch thickness and maintain defined color boundaries. Conversely, deep-pour casting resins are formulated at 300 to 600 cps, releasing heat slowly and allowing bubbles to escape across 2-to-4-inch pours.'
      },
      {
        title: 'Shore Hardness & Thermal Resistance',
        content: 'Art epoxies typically achieve a Shore D hardness between 78 and 85 once fully cured. Heat deflection temperatures range from 120°F (50°C) for standard craft resins to 195°F (90°C) for specialized coaster formulations.'
      }
    ],
    faqs: [
      { q: 'Is epoxy waterproof when cured?', a: 'Yes. Fully cured epoxy creates a 100% moisture-barrier seal that is water-resistant.' },
      { q: 'Does epoxy adhere to glass and wood?', a: 'Yes. Epoxy exhibits exceptional mechanical and chemical adhesion to wood, canvas, glass, metal, and stone.' }
    ]
  },
  'resin-vs-epoxy': {
    title: 'Resin vs Epoxy: Chemical Differences, Viscosity & Applications',
    category: 'Materials Comparison',
    readingTime: '7 min read',
    heroImage: RESIN_GEODE_IMAGE,
    intro: 'While the terms "resin" and "epoxy" are often used interchangeably, resin is a wide umbrella term for liquid polymers, whereas epoxy is a specific thermosetting resin family known for minimal shrinkage, low odor, and optical clarity.',
    takeaways: [
      'Epoxy has less than 1% cure shrinkage; polyester resin shrinks by 5% to 7%.',
      'UV resin cures in 2 minutes under UV light but is limited to small depths (< 3mm).',
      'Polyurethane resins cure extremely fast (5–20 mins) but are highly sensitive to moisture.'
    ],
    sections: [
      {
        title: 'Comparison of the Four Main Craft Resins',
        content: 'Crafters encounter four distinct resins: Epoxy (2-part, high clarity, slow cure), Polyester (liquid fiberglass resin, pungent odor, high shrinkage), Polyurethane (rapid curing, opaque or semi-clear, moisture sensitive), and UV Resin (single-part photo-initiated acrylate, instant cure).'
      },
      {
        title: 'When to Choose Epoxy Over Other Resins',
        content: 'For canvas wall art, serving trays, river tables, and high-gloss coasters, epoxy is undisputed. Its self-leveling surface tension creates an impeccable mirror finish that polyester or acrylic topcoats cannot match.'
      }
    ],
    faqs: [
      { q: 'Which resin is safest for indoor studios?', a: 'Epoxy resin is much safer than polyester resin because it contains no volatile styrene monomer fumes.' },
      { q: 'Can I mix UV resin with two-part epoxy?', a: 'No. They use entirely different chemical catalysts and will not cure together properly.' }
    ]
  },
  'resin-molds': {
    title: 'Resin Molds: Silicone Care, Demolding & Preservation',
    category: 'Supplies & Tools',
    readingTime: '6 min read',
    heroImage: RESIN_WORKSHOP_IMAGE,
    intro: 'Silicone molds are the backbone of resin casting. Understanding the difference between condensation-cure and platinum-cure silicone, and preventing resin mold tear-out, ensures your molds last for hundreds of pours.',
    takeaways: [
      'Never use an open flame torch directly inside silicone molds.',
      'Platinum-cure silicone lasts 4x longer than condensation-cure molds.',
      'Demold within 24–36 hours to avoid chemical sticking.'
    ],
    sections: [
      {
        title: 'Why Resins Tear Silicone Molds',
        content: 'As epoxy cures, it emits exothermic heat and aggressive chemical amines. If an open flame torch is applied to bubbles inside a mold, the high heat temporarily breaks the silicone polymer, permanently fusing the epoxy to the mold and causing it to tear during demolding.'
      },
      {
        title: 'Cleaning and Conditioning Silicone Molds',
        content: 'Clean molds with warm water, mild liquid soap, or sticky tape to pull out micro-dust. Never use abrasive scrubbers. Store molds completely flat in ziplock bags away from dust and direct sun.'
      }
    ],
    faqs: [
      { q: 'Can I use mold release spray?', a: 'Yes. A light mist of silicone-safe mold release prolongs mold life by creating a sacrificial barrier.' }
    ]
  },
  'resin-pigments': {
    title: 'Resin Pigments: Micas, Alcohol Inks, Liquid Dyes & Pastes',
    category: 'Color Chemistry',
    readingTime: '7 min read',
    heroImage: HERO_OCEAN_IMAGE,
    intro: 'Coloring epoxy requires specialized colorants formulated without moisture. Explore the physical behavior of dry mica powders, alcohol inks, liquid resin dyes, and titanium wave pastes.',
    takeaways: [
      'The 6% Rule: Never exceed 6% total pigment volume in your resin batch.',
      'Water-based acrylic paints can ruin resin, causing foaming and cloudy rubbery curing.',
      'White pigment paste with high titanium dioxide density is essential for ocean wave cells.'
    ],
    sections: [
      {
        title: 'Mica Powders: Shimmer and Metallic Radiance',
        content: 'Mica is a naturally occurring silicate mineral ground into fine micro-platelets coated with metal oxides. When suspended in clear resin, light reflects off the angled platelets, creating radiant three-dimensional metallic luster.'
      },
      {
        title: 'Alcohol Inks: Jewel-Toned Transparency',
        content: 'Alcohol inks dissolve into epoxy without clouding, producing transparent stained-glass effects. In petri-dish casting, heavy white sinker ink pushes through the colored alcohol ink, pulling tentacle-like formations to the bottom.'
      }
    ],
    faqs: [
      { q: 'Can I use eyeshadow as resin pigment?', a: 'Yes, provided the cosmetic eyeshadow consists of pure mica and mineral pigments without oils or moist binders.' }
    ]
  },
  'resin-mixing': {
    title: 'Resin Mixing: The 3-Minute Protocol, Ratios & Gravimetric Precision',
    category: 'Fundamentals',
    readingTime: '8 min read',
    heroImage: RESIN_WORKSHOP_IMAGE,
    intro: 'Proper mixing is the single most critical step in resin art. Discover why volume vs weight matters, how to read a meniscus, and the science behind the double-cup stirring technique.',
    takeaways: [
      'Volumetric (1:1) formulas are NOT 1:1 by weight; Part A is denser than Part B.',
      'Stir smoothly for 3 minutes without whipping air into the liquid.',
      'Always transfer to a second clean cup and mix for another 60 seconds.'
    ],
    sections: [
      {
        title: 'Gravimetric vs. Volumetric Measurement',
        content: 'Resin Part A typically has a specific gravity of 1.15 g/cm³, whereas polyamine Part B is around 0.98 g/cm³. If a manufacturer specifies 1:1 by volume, measuring 100g of Part A and 100g of Part B will result in an excess of resin monomer and a sticky, uncured surface.'
      },
      {
        title: 'The Dual-Cup Stirring Rule',
        content: 'When mixing in a single cup, unmixed hardener or resin always clings to the interior corners and sidewalls. By pouring the stirred mixture into a second clean container and mixing for an additional 60 seconds, you guarantee 100% stoichiometric integration.'
      }
    ],
    faqs: [
      { q: 'What happens if I stir too fast?', a: 'Fast stirring whips atmospheric air into the resin, generating millions of micro-bubbles that are difficult to pop.' }
    ]
  },
  'resin-curing': {
    title: 'Resin Curing: Chemical Stages, Environmental Humidity & Post-Cure',
    category: 'Chemistry & Science',
    readingTime: '7 min read',
    heroImage: RESIN_SAFETY_IMAGE,
    intro: 'Epoxy curing is a dynamic thermal process comprising open working time, gel transition, green cure, and full vitrification. Learn how temperature and humidity dictate results.',
    takeaways: [
      'Curing stops below 68°F (20°C); maintain studio warmth between 72°F–78°F.',
      'High humidity causes amine blush (a greasy surface film).',
      'Full chemical hardness takes 7 to 30 days.'
    ],
    sections: [
      {
        title: 'The Four Stages of Epoxy Curing',
        content: '1. Liquid Open Time (20–45 mins): Fluid manipulation.\n2. Gel Stage (1–3 hours): Soft rubbery texture; cannot be worked.\n3. Green Cure (12–24 hours): Firm enough to demold, but susceptible to bending.\n4. Full Cure (72 hours to 30 days): Maximum Shore D hardness and chemical resistance.'
      },
      {
        title: 'Humidity and Amine Blush Prevention',
        content: 'When humidity exceeds 50%, atmospheric moisture reacts with primary amines in Part B to form carbamate salts—known as amine blush. This appears as a dull, greasy or waxy surface film that prevents subsequent layer adhesion unless washed off with warm water and soap.'
      }
    ],
    faqs: [
      { q: 'Can I speed up curing with a heater?', a: 'Gentle warmth (up to 80°F) safely speeds cure, but excessive direct heat can trigger thermal runaway and boiling.' }
    ]
  },
  'remove-resin-bubbles': {
    title: 'How to Remove Resin Bubbles: Thermal Sweeps, Alcohol & Degassing',
    category: 'Troubleshooting & Tools',
    readingTime: '6 min read',
    heroImage: HERO_OCEAN_IMAGE,
    intro: 'Air bubbles ruin transparency. Learn how to prevent bubbles during mixing and eliminate stubborn micro-bubbles using heat torches, alcohol atomizers, and vacuum degassing chambers.',
    takeaways: [
      'Pre-warm resin bottles in warm tap water before measuring.',
      'A culinary butane torch produces CO2 and heat to pop surface bubbles instantaneously.',
      'Use 91%+ isopropyl alcohol mist in silicone molds where flame is prohibited.'
    ],
    sections: [
      {
        title: 'Why Bubbles Form',
        content: 'Bubbles are introduced either mechanically by vigorous stirring, or outgassed from porous timber and canvas substrates. Sealing porous surfaces with a thin primer coat before the main pour prevents substrate outgassing.'
      },
      {
        title: 'The Butane Torch Sweep Technique',
        content: 'Hold your torch 5 to 6 inches from the surface. Sweep in fluid, overlapping strokes like spray paint. The carbon dioxide in the exhaust flame instantly reduces surface tension, bursting bubbles without scorching.'
      }
    ],
    faqs: [
      { q: 'Can I use a hairdryer instead of a torch?', a: 'No. Hairdryers blow high-speed air, which scatters wet resin, introduces dust, and cools the surface instead of popping bubbles.' }
    ]
  }
};

export const TopicalGuidePage: React.FC<{
  topicKey: string;
  onNavigate: (path: string) => void;
}> = ({ topicKey, onNavigate }) => {
  const topic = TOPICS_DATA[topicKey] || TOPICS_DATA['epoxy-resin'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Topics', path: '/resin-art-techniques/' },
          { label: topic.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* Hero Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <span className="font-semibold text-teal-800 uppercase tracking-wide">
            {topic.category}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            {topic.readingTime}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight leading-tight">
          {topic.title}
        </h1>
        <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          {topic.intro}
        </p>
      </div>

      {/* Featured Banner */}
      <div className="relative aspect-16/8 rounded-2xl overflow-hidden bg-stone-100 mb-10 shadow-xs border border-stone-200">
        <img
          src={topic.heroImage}
          alt={topic.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Key Takeaways Callout */}
      <div className="bg-teal-50/70 p-6 rounded-2xl border border-teal-200/80 mb-10">
        <h3 className="font-serif font-semibold text-teal-950 text-base mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-800" />
          <span>Core Takeaways</span>
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-teal-900">
          {topic.takeaways.map((t, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      <div className="space-y-8 mb-12">
        {topic.sections.map((sec, i) => (
          <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs">
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mb-3">
              {sec.title}
            </h2>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {sec.content}
            </p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      {topic.faqs.length > 0 && (
        <div className="mb-12">
          <h3 className="font-serif text-2xl font-medium text-stone-900 mb-4">
            Common Questions
          </h3>
          <div className="space-y-3">
            {topic.faqs.map((faq, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-stone-200">
                <h4 className="font-serif font-semibold text-stone-900 text-sm mb-1.5 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Internal Links */}
      <div className="p-6 bg-stone-100 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-semibold text-stone-900 text-sm">
            Continue Your Studio Practice
          </h4>
          <p className="text-xs text-stone-600 mt-0.5">
            Explore hands-on projects, supplies, and safety guides.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('/resin-art-for-beginners/')}
            className="px-4 py-2 bg-white text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold hover:bg-stone-50"
          >
            Beginner Guide
          </button>
          <button
            onClick={() => onNavigate('/resin-art-projects/')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
          >
            Explore Projects
          </button>
        </div>
      </div>
    </div>
  );
};
