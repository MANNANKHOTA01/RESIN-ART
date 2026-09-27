import React, { useEffect, useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  BookOpen, 
  Check, 
  Droplet, 
  Flame, 
  Layers, 
  Palette, 
  ShieldCheck, 
  Sparkles, 
  Wrench, 
  Zap 
} from 'lucide-react';
import { Article, Project } from '../types';
import { getArticles, getProjects } from '../services/dataService';
import { ArticleCard } from '../components/common/ArticleCard';
import { ProjectCard } from '../components/common/ProjectCard';
import { NewsletterSection } from '../components/common/NewsletterSection';
import { 
  HERO_OCEAN_IMAGE, 
  RESIN_GEODE_IMAGE, 
  RESIN_SAFETY_IMAGE, 
  RESIN_WORKSHOP_IMAGE 
} from '../data/seedData';

export const HomePage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadData() {
      const [arts, projs] = await Promise.all([
        getArticles({ status: 'published' }),
        getProjects({ status: 'published' })
      ]);
      setPopularArticles(arts.slice(0, 6));
      setProjects(projs.slice(0, 6));
    }
    loadData();
  }, []);

  const featureCards = [
    {
      title: 'Beginner Guides',
      desc: 'Learn the basics and get started with confidence.',
      icon: BookOpen,
      path: '/resin-art-for-beginners/',
      accent: 'text-sky-700 bg-sky-50'
    },
    {
      title: 'Popular Techniques',
      desc: 'Master ocean lacing, geode lines, and swipe methods.',
      icon: Droplet,
      path: '/resin-art-techniques/',
      accent: 'text-teal-700 bg-teal-50'
    },
    {
      title: 'Creative Ideas',
      desc: 'Discover practical projects and visual inspiration.',
      icon: Sparkles,
      path: '/resin-art-ideas/',
      accent: 'text-amber-700 bg-amber-50'
    },
    {
      title: 'Essential Supplies',
      desc: 'Explore quality resins, molds, pigments, and tools.',
      icon: Palette,
      path: '/resin-art-supplies/',
      accent: 'text-rose-700 bg-rose-50'
    }
  ];

  const techniques = [
    {
      name: 'Ocean Resin Art',
      tag: 'Lacing & Waves',
      desc: 'Create realistic ocean coastlines with white cell lacing and directional heat airflow.',
      image: HERO_OCEAN_IMAGE,
      path: '/articles/ocean-resin-art-guide'
    },
    {
      name: 'Geode Resin Art',
      tag: 'Crystals & Veins',
      desc: 'Build three-dimensional geological geodes with raw amethysts and metallic pigments.',
      image: RESIN_GEODE_IMAGE,
      path: '/articles/geode-resin-art-tutorial'
    },
    {
      name: 'Dirty Pour',
      tag: 'Fluid Blends',
      desc: 'Layer multiple resin colors inside a single cup before flipping for organic marbling.',
      image: RESIN_WORKSHOP_IMAGE,
      path: '/resin-art-techniques/'
    },
    {
      name: 'Swipe Technique',
      tag: 'Cell Dispersion',
      desc: 'Glide plastic film or damp paper over tinted layers to draw cells across the surface.',
      image: HERO_OCEAN_IMAGE,
      path: '/resin-art-techniques/'
    },
    {
      name: 'Layering & Depth',
      tag: '3D Illusion',
      desc: 'Pour multiple crystal-clear layers over cured art to simulate floating botanicals.',
      image: RESIN_WORKSHOP_IMAGE,
      path: '/resin-art-techniques/'
    },
    {
      name: 'Resin Marbling',
      tag: 'Stone Veining',
      desc: 'Replicate natural Carrara and Nero Marquina marble with high-viscosity resin lines.',
      image: RESIN_GEODE_IMAGE,
      path: '/resin-art-techniques/'
    }
  ];

  const starterSteps = [
    { num: '01', title: 'Prepare Your Workspace', desc: 'Maintain 75°F studio warmth, calibrate a level workbench, and gather inverted dust domes.' },
    { num: '02', title: 'Calibrate Exact Ratios', desc: 'Measure Part A and Part B with graduated silicone beakers or a digital scale to prevent sticky cures.' },
    { num: '03', title: 'The 3-Minute Dual Stir', desc: 'Mix thoroughly for 3 minutes scraping side walls, transfer into a fresh cup, and mix for 60 seconds.' },
    { num: '04', title: 'Infuse Color Pigments', desc: 'Add mica powders or alcohol inks, strictly keeping colorants under 6% total volume to preserve hardness.' },
    { num: '05', title: 'Pour & Guide Flow', desc: 'Pour smoothly onto sealed cradle boards or silicone molds; allow the liquid polymer to self-level.' },
    { num: '06', title: 'Sweep Bubbles & Shield', desc: 'Sweep a culinary butane torch 5 inches above the surface to pop micro-bubbles, then cover for 24 hours.' }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* =========================================================================
          HERO SECTION (Matches Mockup Layout with Ocean Waves & Editorial Headline)
         ========================================================================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Background Image with Dark Gradient Scrim */}
        <div className="absolute inset-0">
          <img
            src={HERO_OCEAN_IMAGE}
            alt="Handcrafted ocean resin art with sea foam lacing"
            className="w-full h-full object-cover object-center opacity-45 scale-102 transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest text-teal-300 font-semibold mb-3">
              The Peer-Reviewed Resin Art Publication
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight mb-5">
              Discover the <br className="hidden sm:inline" />
              <span className="italic font-normal text-teal-200">Art of Resin</span>
            </h1>
            <p className="text-stone-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
              Learn resin art from the fundamentals to advanced techniques, creative projects, materials, safety, and troubleshooting.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('/resin-art-techniques/')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-teal-300 hover:bg-teal-200 rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore Guides</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/resin-art-for-beginners/')}
                className="px-6 py-3 text-xs sm:text-sm font-medium text-white hover:text-teal-200 bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/20 rounded-lg transition-all cursor-pointer"
              >
                Start for Beginners
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 4 FEATURE BLOCKS (Beginners, Techniques, Ideas, Supplies)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => onNavigate(feat.path)}
                className="group cursor-pointer bg-white p-6 rounded-xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-lg ${feat.accent} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-teal-900 mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-teal-800">
                  <span>Explore topic</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: FEATURED EDITORIAL GUIDE (Resin Art for Beginners)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto lg:h-full min-h-[300px]">
            <img
              src={RESIN_WORKSHOP_IMAGE}
              alt="Artisan workspace prepared for beginner epoxy resin pouring"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12">
            <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
              Essential Foundations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4 leading-snug">
              Resin Art for Beginners: The Blueprint for Flawless Curing
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
              Learn the foundational science of Part A and Part B stoichiometry, critical workshop temperature boundaries, bubble degassing, and how to execute your first coaster or tray with zero sticky resin failures.
            </p>
            <div className="space-y-2 mb-8 text-xs sm:text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Complete beginner equipment checklist with non-toxic cleanup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Precision 3-minute dual-cup mixing rules to prevent tacky spots</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 shrink-0" />
                <span>How to identify and avoid the 5 most common beginner mistakes</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/resin-art-for-beginners/')}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Read Beginner Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: POPULAR GUIDES (6 content items with View All)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1 block">
              Curated Editorial
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
              Popular Guides & Articles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/resin-art-techniques/')}
            className="mt-3 sm:mt-0 flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularArticles.map((art) => (
            <ArticleCard key={art.id} article={art} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: POPULAR TECHNIQUES (Ocean, Geode, Dirty Pour, Swipe, etc.)
         ========================================================================= */}
      <section className="bg-stone-100/60 py-16 sm:py-20 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
              Artistic Repertoire
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-3">
              Popular Pouring Techniques
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              From organic ocean shoreline lacing to geode crystalline formations, explore the fluid methods defined by master resin artists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((tech) => (
              <div
                key={tech.name}
                onClick={() => onNavigate(tech.path)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-300 shadow-2xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-16/9 overflow-hidden bg-stone-100">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wide">
                      {tech.tag}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-teal-900 mt-1 mb-2">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-700 group-hover:text-teal-800">
                    <span>Learn technique</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PROJECT INSPIRATION (Coasters, Trays, Jewelry, Wall Art, etc.)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1 block">
              Hands-On Blueprints
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
              Creative Project Blueprints
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/resin-art-projects/')}
            className="mt-3 sm:mt-0 flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: BEGINNER STARTER BLUEPRINT (Numbered steps)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 sm:p-12 border border-stone-200 shadow-xs">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-1 block">
              Methodical Execution
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-3">
              The 6-Step Starter Pour Process
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Follow this laboratory-vetted sequence to guarantee rock-hard cures, crystal clarity, and mirror-level finishes on every pour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {starterSteps.map((step) => (
              <div key={step.num} className="relative pl-12">
                <span className="absolute left-0 top-0 font-serif text-2xl font-bold text-teal-600/30">
                  {step.num}
                </span>
                <h3 className="font-serif text-base font-semibold text-stone-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-stone-100 flex justify-end">
            <button
              onClick={() => onNavigate('/resin-art-for-beginners/')}
              className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Review comprehensive beginner syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: STUDIO HEALTH & SAFETY
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#091424] text-white p-8 sm:p-12 border border-slate-800 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Studio Health & Protection Protocol</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-4">
              Resin Safety Is Non-Negotiable
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
              Epoxy components contain polyamines and reactive monomers that can sensitize skin and the respiratory system over cumulative exposure. Never work without verified safety standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-300 mb-8">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 font-bold">1</span>
                <div>
                  <strong className="text-white block">NIOSH OV/P95 Respirator:</strong>
                  Standard dust masks do NOT block organic vapors emitted during exothermic curing.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 font-bold">2</span>
                <div>
                  <strong className="text-white block">Medical Nitrile Gloves:</strong>
                  Avoid latex—reactive chemicals penetrate latex within minutes. Always use nitrile.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 font-bold">3</span>
                <div>
                  <strong className="text-white block">Cross-Room Airflow:</strong>
                  Always provide active cross-ventilation or negative air pressure in your workspace.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 font-bold">4</span>
                <div>
                  <strong className="text-white block">Immediate Skin Defense:</strong>
                  If liquid resin contacts skin, wash immediately with soap and water; never clean skin with acetone.
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/resin-art-safety/')}
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Read Full Safety Manual</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-5 relative aspect-4/3 rounded-xl overflow-hidden border border-slate-700">
            <img
              src={RESIN_SAFETY_IMAGE}
              alt="Organic vapor respirator and safety gear on art table"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: TROUBLESHOOTING GRID (Sticky, bubbles, cloudy, cracks, yellowing)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-1 block">
            Rapid Diagnostic Matrix
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-2">
            Resin Problem Troubleshooting
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Encountered a sticky finish, trapped micro-bubbles, or thermal cracks? Diagnose the cause and apply the correct recovery technique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              issue: 'Sticky / Tacky Surface',
              cause: 'Improper measuring ratio or incomplete container side scraping.',
              fix: 'Sand lightly with 120-grit once partially firm, wipe clean, and pour a fresh calibrated flood coat.',
              path: '/articles/why-is-my-resin-sticky'
            },
            {
              issue: 'Trapped Micro-Bubbles',
              cause: 'Rapid aggressive stirring or pouring in cold rooms below 70°F.',
              fix: 'Pre-warm bottles in tap water before mixing; sweep with a butane culinary torch 5 minutes post-pour.',
              path: '/articles/how-to-remove-resin-bubbles'
            },
            {
              issue: 'Cloudy / Milky Casts',
              cause: 'High studio humidity (&gt;60%) causing moisture absorption or water droplets in mold.',
              fix: 'Store molds dry; operate a dehumidifier; avoid water-based acrylic paints in the resin mix.',
              path: '/resin-art-troubleshooting/'
            },
            {
              issue: 'Thermal Runaway & Cracking',
              cause: 'Pouring coating epoxy deeper than 1/4 inch; excessive exothermic heat build-up.',
              fix: 'Always use low-viscosity deep-pour casting resin for deep molds, or pour in shallow increments.',
              path: '/resin-art-troubleshooting/'
            },
            {
              issue: 'Yellowing Over Time',
              cause: 'UV exposure on low-grade resins without HALS inhibitors.',
              fix: 'Select art-grade epoxies with Hindered Amine Light Stabilizers; avoid direct sunlight display.',
              path: '/resin-art-care/'
            },
            {
              issue: 'Dimples & Fish-Eyes',
              cause: 'Oil, silicone lubricant residue, or dirt on substrate resisting fluid resin tension.',
              fix: 'Degrease surfaces with 99% isopropyl alcohol prior to pouring; sand substrate to a uniform key.',
              path: '/resin-art-troubleshooting/'
            }
          ].map((item) => (
            <div
              key={item.issue}
              onClick={() => onNavigate(item.path)}
              className="group cursor-pointer bg-white p-5 rounded-xl border border-stone-200/90 hover:border-amber-400/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Diagnostic</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-amber-800 transition-colors mb-2">
                  {item.issue}
                </h3>
                <p className="text-xs text-stone-500 mb-2">
                  <strong>Root Cause:</strong> {item.cause}
                </p>
                <p className="text-xs text-stone-700">
                  <strong>Solution:</strong> {item.fix}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-teal-800">
                <span>View recovery guide</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: NEWSLETTER SECTION
         ========================================================================= */}
      <NewsletterSection />
    </div>
  );
};
