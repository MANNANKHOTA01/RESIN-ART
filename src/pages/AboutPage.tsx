import React from 'react';
import { ArrowRight, BookOpen, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RESIN_WORKSHOP_IMAGE, HERO_OCEAN_IMAGE } from '../data/seedData';
import { NewsletterSection } from '../components/common/NewsletterSection';

export const AboutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'About ResinArt' }]}
        onNavigate={onNavigate}
      />

      {/* Hero */}
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
          Editorial Publication & Resource
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-4">
          About ResinArt
        </h1>
        <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
          We are dedicated to resin art education, providing scientifically grounded guides, step-by-step creative tutorials, and transparent safety standards for artists of all levels.
        </p>
      </div>

      {/* Our Story with Side Image (Matches Mockup) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
        <div className="md:col-span-7 space-y-4 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="font-serif text-2xl font-medium text-stone-900">
            Our Story & Philosophy
          </h2>
          <p>
            ResinArt originated from a simple observation: while epoxy resin has become one of the most vibrant artistic mediums of the modern era, high-quality, scientifically sound guidance is difficult to find. Crafters are frequently confronted with vague social media tips, ruined sticky pours, and unsafe workshop practices.
          </p>
          <p>
            We created ResinArt to provide a trustworthy, rigorous editorial publication. Every formula, ratio check, technique breakdown, and troubleshooting solution is verified through hands-on studio experience and chemical knowledge.
          </p>
        </div>

        <div className="md:col-span-5 relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
          <img
            src={RESIN_WORKSHOP_IMAGE}
            alt="ResinArt workshop table"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Our Mission (Matches Mockup: Educate, Inspire, Support) */}
      <div className="mb-16">
        <h2 className="font-serif text-2xl font-medium text-stone-900 mb-8 text-center">
          Our Three Guiding Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-semibold text-stone-900 mb-2">
              Educate
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Demystify polymer chemistry, stoichiometry, and temperature management with clear, jargon-free explanations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-semibold text-stone-900 mb-2">
              Inspire
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Showcase breathtaking techniques—from oceanic wave cells to organic quartz geode formations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-semibold text-stone-900 mb-2">
              Support
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Champion uncompromising personal safety, respiratory protection, and practical troubleshooting diagnostics.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Approach & Safety Commitment */}
      <div className="space-y-6 mb-16">
        <div className="bg-white p-6 rounded-xl border border-stone-200">
          <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
            Independent Editorial Standards
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            ResinArt is not an online store or resin manufacturer. We do not accept payment to rank specific epoxy brands higher. When we recommend supplies, molds, and tools, our evaluations are grounded purely in chemical durability, UV stability, and maker utility.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200">
          <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
            Safety Commitment
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            We advocate strict respiratory health, eye defense, and skin barrier protocols. We adhere to Safety Data Sheet (SDS) standards and actively discourage reckless pouring without protective equipment.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};
