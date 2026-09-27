import React, { useState } from 'react';
import { 
  AlertCircle, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Clock, 
  Droplet, 
  FileText, 
  Flame, 
  HelpCircle, 
  Layers, 
  Thermometer, 
  Wrench 
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RESIN_WORKSHOP_IMAGE, HERO_OCEAN_IMAGE } from '../data/seedData';

export const BeginnerPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('what-is-resin');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const tocItems = [
    { id: 'what-is-resin', label: 'What is Resin Art?' },
    { id: 'getting-started', label: 'Workspace & Chemistry' },
    { id: 'essential-materials', label: 'Beginner Materials Checklist' },
    { id: 'step-by-step-guide', label: 'Step-by-Step Starter Guide' },
    { id: 'common-mistakes', label: 'Common Beginner Mistakes' },
    { id: 'beginner-tips', label: 'Master Studio Tips' },
    { id: 'beginner-faq', label: 'Beginner FAQ' }
  ];

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileTocOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Resin Art for Beginners' }]}
        onNavigate={onNavigate}
      />

      {/* Hero Header */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white mb-12 border border-stone-200">
        <div className="absolute inset-0">
          <img
            src={RESIN_WORKSHOP_IMAGE}
            alt="Artisan workspace prepared for beginner epoxy pouring"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
        <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-2 block">
            Beginner Master Syllabus
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 leading-tight">
            Resin Art for Beginners
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
            Everything you need to know to get started with resin art. From basic concepts to step-by-step guides, start your creative journey here with zero guesswork.
          </p>
          <div className="flex items-center gap-4 text-xs text-stone-400">
            <span>Published by ResinArt Editorial</span>
            <span>·</span>
            <span>12 min read</span>
            <span>·</span>
            <span>Updated for 2026 Standards</span>
          </div>
        </div>
      </div>

      {/* Layout with Sticky TOC (Desktop) and Main Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left TOC Sidebar */}
        <aside className="lg:col-span-4">
          {/* Mobile Collapsible TOC */}
          <div className="lg:hidden mb-6 bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-700"
            >
              <span>Table of Contents</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileTocOpen && (
              <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="w-full text-left py-1 text-xs text-stone-600 hover:text-teal-800"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sticky Sidebar */}
          <div className="hidden lg:block sticky top-24 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
            <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-4">
              Quick Links
            </h3>
            <nav className="space-y-1 text-xs font-medium">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-teal-50 text-teal-900 font-semibold border-l-3 border-teal-700'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                Need Help?
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-3">
                Check our interactive diagnostic tool for gummy or uncured resin.
              </p>
              <button
                onClick={() => onNavigate('/resin-art-troubleshooting/')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
              >
                <span>Troubleshooting Tool</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Body */}
        <main className="lg:col-span-8 space-y-12">
          {/* Section: What is Resin Art */}
          <section id="what-is-resin" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
              What Is Resin Art?
            </h2>
            <div className="prose prose-stone max-w-none text-stone-700 text-sm leading-relaxed space-y-4">
              <p>
                Resin art is the practice of combining liquid epoxy polymers and hardeners with pigments, minerals, or encapsulated objects to create luminous, glass-like artworks. Unlike standard paints that dry through water or solvent evaporation, epoxy cures via an exothermic chemical cross-linking reaction.
              </p>
              <p>
                When mixed in the exact ratio specified by the manufacturer, Part A (the resin) and Part B (the polyamine curing agent) undergo molecular polymerization. As heat is released, the mixture transitions from an open liquid state into a gel, and finally into a rock-solid, ultra-durable plastic surface.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <span className="text-xs font-semibold text-teal-800 uppercase block mb-1">
                  1. Liquid State
                </span>
                <p className="text-xs text-stone-600">
                  Open working time (20–45 mins). Fluid pouring, color blending, and bubble torching occur here.
                </p>
              </div>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <span className="text-xs font-semibold text-amber-800 uppercase block mb-1">
                  2. Gel State
                </span>
                <p className="text-xs text-stone-600">
                  Soft jelly-like consistency. Do NOT manipulate further or permanent ridges will form.
                </p>
              </div>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <span className="text-xs font-semibold text-emerald-800 uppercase block mb-1">
                  3. Full Cure
                </span>
                <p className="text-xs text-stone-600">
                  Reached between 24–72 hours. Rock hard, non-tacky, and resistant to moisture.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Workspace & Chemistry */}
          <section id="getting-started" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
              Workspace Setup & Studio Climate
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              Resin is remarkably sensitive to atmospheric conditions. Setting up your studio properly before opening a single bottle prevents 90% of beginner mishaps.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-xl border border-stone-200 flex gap-3">
                <Thermometer className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm mb-1">Room Temperature (72°F–78°F)</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Cold temperatures make resin thick like molasses, trapping bubbles and preventing full chemical curing.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-stone-200 flex gap-3">
                <Droplet className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm mb-1">Humidity Below 50%</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Moisture reacts with curing polyamines, producing "amine blush"—a sticky, cloudy, greasy residue on top.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-stone-200 flex gap-3">
                <Layers className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm mb-1">Perfect Level Workbench</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Resin self-levels completely. If your table tilts by even 1 millimeter, resin will slowly run off the low edge.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-stone-200 flex gap-3">
                <AlertCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm mb-1">Dust Covers at the Ready</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Have clean plastic totes or cardboard boxes ready to invert immediately over wet pours during curing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Essential Materials Checklist */}
          <section id="essential-materials" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
              Beginner Materials Checklist
            </h2>
            <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100 overflow-hidden text-xs sm:text-sm">
              {[
                { name: '1:1 Art-Grade Epoxy Resin', desc: 'Pre-formulated for coating and canvas pours with UV blockers and self-leveling additives.' },
                { name: 'Silicone Mixing Cups & Spatulas', desc: 'Resin does not adhere to silicone; dried leftover resin peels right out, eliminating waste.' },
                { name: 'Nitrile Gloves (2–3 pairs)', desc: 'Latex is porous to epoxy monomers; always insist on genuine powder-free nitrile.' },
                { name: 'NIOSH OV/P95 Half-Face Respirator', desc: 'Protects lungs from invisible organic vapors released during the exothermic phase.' },
                { name: 'Culinary Butane Torch', desc: 'Produces carbon dioxide and a focused flame sweep to burst surface micro-bubbles in seconds.' },
                { name: 'Mica Powders & Alcohol Inks', desc: 'Dry, moisture-free pigments that disperse evenly without throwing off the chemical ratio.' }
              ].map((item) => (
                <div key={item.name} className="p-4 flex items-start gap-3">
                  <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{item.name}</strong>
                    <span className="text-stone-600">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Step-by-Step Guide */}
          <section id="step-by-step-guide" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-6">
              Step-by-Step Starter Guide
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Warm the Bottles (10 mins)',
                  desc: 'Place sealed Part A and Part B bottles in a bath of warm (not boiling) tap water. Warm resin flows freely and allows trapped air to escape with ease.'
                },
                {
                  step: '02',
                  title: 'Measure with Equal Volumes',
                  desc: 'Pour Part A and Part B into calibrated measuring cups with exact eye-level precision. Even a 5% measurement discrepancy will cause soft or gummy curing.'
                },
                {
                  step: '03',
                  title: 'The 3-Minute Dual-Cup Stir Protocol',
                  desc: 'Stir for 3 full continuous minutes, diligently scraping the bottom and sides. Transfer into a secondary clean cup and mix for another 60 seconds to ensure 100% molecular integration.'
                },
                {
                  step: '04',
                  title: 'Separate and Tint with Pigments',
                  desc: 'Divide into smaller cups for different colors. Stir in mica powders or resin tints, ensuring total colorant volume remains under 6% of the mix.'
                },
                {
                  step: '05',
                  title: 'Pour and Allow Self-Leveling',
                  desc: 'Pour onto your primed cradle board or into silicone molds. Spread gently to edges using a silicone spatula. Allow 3 minutes for bubbles to rise to the top.'
                },
                {
                  step: '06',
                  title: 'Torch Sweeping and Dust Shielding',
                  desc: 'Hold your torch 6 inches away and sweep swiftly across the surface. Immediately cover with an inverted clean box and leave undisturbed for 24 hours.'
                }
              ].map((s) => (
                <div key={s.step} className="p-5 bg-white rounded-xl border border-stone-200 flex gap-4">
                  <span className="font-serif text-xl font-bold text-teal-700/40 shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="font-serif font-semibold text-stone-900 text-sm mb-1">{s.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Common Mistakes */}
          <section id="common-mistakes" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
              5 Biggest Beginner Mistakes to Avoid
            </h2>
            <div className="space-y-3">
              {[
                { title: 'Scraping the mixing cup onto the artwork', desc: 'Unmixed resin residue always clings to the cup walls. Pouring it onto your art leaves permanent wet tacky streaks.' },
                { title: 'Adding too much liquid dye or water-based acrylics', desc: 'Moisture is epoxy’s enemy. Water boils and clouds resin. Never exceed 6% dry pigment or alcohol ink.' },
                { title: 'Pouring in a cold basement or garage (&lt; 70°F)', desc: 'Chemical cross-linking stops below 68°F. The resin will remain soft and rubbery indefinitely.' },
                { title: 'Over-torching or holding the flame in one place', desc: 'Excessive heat burns the epoxy surface, creating permanent yellow scorched wrinkling and smoke.' },
                { title: 'Rushing demolding before 24 hours', desc: 'Even if the piece feels firm to touch, demolding too early warps edges and leaves fingerprint marks.' }
              ].map((m, idx) => (
                <div key={idx} className="p-4 bg-rose-50/50 rounded-xl border border-rose-200/80 flex gap-3 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">{m.title}</strong>
                    <span className="text-stone-600">{m.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: FAQ */}
          <section id="beginner-faq" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-6">
              Frequently Asked Beginner Questions
            </h2>
            <div className="space-y-4">
              {[
                { q: 'Is resin art safe to do at home?', a: 'Yes, provided you have good room ventilation, wear an organic vapor half-mask respirator (NIOSH OV/P95), and wear nitrile gloves at all times.' },
                { q: 'Can I fix resin if it cured sticky?', a: 'Yes. Sand the surface with 120-grit sandpaper, clean with isopropyl alcohol, and apply a fresh, accurately measured clear topcoat.' },
                { q: 'How do I clean sticky resin off my hands?', a: 'Never use acetone or mineral spirits directly on skin—they drive chemicals deeper into pores. Use dish soap, warm water, or a specialized citrus pumice hand cleaner.' }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-stone-200">
                  <h4 className="font-serif font-semibold text-stone-900 text-sm mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-teal-700" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
