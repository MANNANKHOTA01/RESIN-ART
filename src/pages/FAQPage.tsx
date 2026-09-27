import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface FAQItem {
  q: string;
  a: string;
  cat: 'Beginners' | 'Materials' | 'Techniques' | 'Safety' | 'Troubleshooting' | 'Projects';
}

export const FAQPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [activeCat, setActiveCat] = useState<string>('All');
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const faqs: FAQItem[] = [
    {
      cat: 'Beginners',
      q: 'How long does resin take to cure completely?',
      a: 'Most standard 1:1 coating epoxies become dry to the touch in 24 hours, reach 95% cure strength in 72 hours, and achieve full chemical cure (maximum Shore D hardness) in 7 to 30 days.'
    },
    {
      cat: 'Beginners',
      q: 'Why did my resin stay sticky or bendable?',
      a: 'Resin stays sticky due to incorrect measuring ratios, inaccurate stirring without scraping cup walls, high humidity, or temperatures below 70°F (21°C).'
    },
    {
      cat: 'Materials',
      q: 'Can I use acrylic paint to color my resin?',
      a: 'Use extreme caution with acrylic paint. Acrylics are water-based; water triggers foaming, micro-bubbles, cloudiness, and gummy cures. Limit acrylic to less than 1% of the mix, or better, use oil-free mica powders or alcohol inks.'
    },
    {
      cat: 'Materials',
      q: 'What is the difference between coating resin and casting resin?',
      a: 'Coating resin has high viscosity and rapid heat release, designed for thin pours under 1/4 inch. Casting resin has low viscosity and slow heat release, designed for deep pours up to 2–4 inches without thermal cracking.'
    },
    {
      cat: 'Techniques',
      q: 'How do artists create ocean wave white cells?',
      a: 'Cells are created using heavy white pigment paste rich in titanium dioxide. A thin line of paste is heated and blown gently across wet blue resin using a heat gun at a 45-degree angle.'
    },
    {
      cat: 'Safety',
      q: 'Do I really need a respirator for epoxy resin?',
      a: 'Yes. Even "low odor" or "zero VOC" epoxies emit airborne polyamine vapors during the chemical reaction. A NIOSH-approved organic vapor respirator (OV/P95) protects your respiratory system from irreversible allergic sensitization.'
    },
    {
      cat: 'Safety',
      q: 'Why can I not wear latex gloves?',
      a: 'Epoxy chemicals and polyamine hardeners permeate through latex in under 2 minutes. Always wear chemical-resistant powder-free nitrile gloves.'
    },
    {
      cat: 'Troubleshooting',
      q: 'How do I pop bubbles without burning the resin?',
      a: 'Use a culinary butane torch held 5 to 6 inches above the surface. Move the flame across the surface continuously like a spray paint stroke. Never linger in one spot.'
    },
    {
      cat: 'Projects',
      q: 'Are resin coasters and trays food safe?',
      a: 'Once fully cured (typically 14–30 days), high-quality FDA-compliant epoxies are suitable for incidental contact (e.g., serving crackers or fruit on a tray), but should not be used as cutting boards, microwaved, or subjected to direct high-heat meals.'
    }
  ];

  const categories = ['All', 'Beginners', 'Materials', 'Techniques', 'Safety', 'Troubleshooting', 'Projects'];

  const filtered = faqs.filter((f) => activeCat === 'All' || f.cat === activeCat);

  const toggle = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Frequently Asked Questions' }]}
        onNavigate={onNavigate}
      />

      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
          Knowledge Base
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed">
          Clear, scientifically accurate answers to common questions about resin art, chemistry, safety, curing, and projects.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-4 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeCat === c
                ? 'bg-slate-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FAQ Accordions */}
      <div className="space-y-3">
        {filtered.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/60"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-teal-700 text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                    [{faq.cat}]
                  </span>
                  <span className="font-serif text-base font-semibold text-stone-900">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-teal-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/40">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
