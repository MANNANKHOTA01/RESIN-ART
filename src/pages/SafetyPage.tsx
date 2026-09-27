import React, { useState } from 'react';
import { AlertTriangle, Check, Droplet, Eye, HeartHandshake, Shield, Wind } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RESIN_SAFETY_IMAGE, RESIN_WORKSHOP_IMAGE } from '../data/seedData';

export const SafetyPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [activeTopic, setActiveTopic] = useState<string>('toxicity');

  const topics = [
    { id: 'toxicity', label: 'Is Resin Safe?' },
    { id: 'ventilation', label: 'Ventilation & Airflow' },
    { id: 'gloves', label: 'Nitrile Gloves vs. Latex' },
    { id: 'eye-protection', label: 'Eye & Splash Protection' },
    { id: 'workspace', label: 'Safe Workspace Practices' },
    { id: 'skin-contact', label: 'Skin Contact & Spills' },
    { id: 'storage-disposal', label: 'Storage & Chemical Disposal' }
  ];

  const scrollTo = (id: string) => {
    setActiveTopic(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Resin Art Safety Protocol' }]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white mb-10 border border-stone-200">
        <div className="absolute inset-0">
          <img
            src={RESIN_SAFETY_IMAGE}
            alt="Safety respirator and personal protective gear"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-2 block">
            Health & Studio Standards
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3">
            Resin Art Safety
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Your safety comes first when working with resin. Read essential guidelines to protect your health, prevent sensitization, and create a safe creative workspace.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Topics Nav */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
            <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
              Safety Topics
            </h3>
            <div className="space-y-1">
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => scrollTo(t.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeTopic === t.id
                      ? 'bg-teal-50 text-teal-900 font-semibold border-l-3 border-teal-700'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-stone-100">
              <div className="flex items-center gap-2 text-rose-800 text-xs font-semibold mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Contact</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                In case of ingestion or severe ocular splash, consult the SDS (Safety Data Sheet) and call Poison Control immediately: 1-800-222-1222.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8 space-y-10">
          {/* Section: Is Resin Toxic */}
          <section id="toxicity" className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs scroll-mt-24">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mb-4">
              Is Epoxy Resin Toxic?
            </h2>
            <div className="text-stone-700 text-sm leading-relaxed space-y-3">
              <p>
                In its uncured liquid state, epoxy resin is an active chemical mixture containing polyamines and reactive monomers. While modern art-grade formulations are lower in volatile organic compounds (VOCs) than commercial industrial epoxies, <strong>all epoxies emit airborne chemical vapors during the exothermic cross-linking reaction</strong>.
              </p>
              <p>
                Once 100% fully cured (typically 72 hours to 7 days), high-quality epoxy becomes an inert, non-reactive plastic. However, repeated cumulative skin exposure to uncured resin can trigger a permanent allergic sensitization reaction, resulting in contact dermatitis and respiratory distress.
              </p>
            </div>

            <div className="mt-6 p-4 bg-teal-50/70 border border-teal-200/80 rounded-xl">
              <h4 className="font-serif text-sm font-semibold text-teal-950 mb-1 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-teal-800" />
                <span>Core Safety Tips</span>
              </h4>
              <ul className="text-xs text-teal-900 space-y-1.5 mt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-700" />
                  <span>Always work in a well-ventilated area with continuous cross-breeze.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-700" />
                  <span>Wear verified protective gear: NIOSH respirator and nitrile gloves.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-700" />
                  <span>Avoid direct skin contact; remove sticky spots with warm soapy water.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-700" />
                  <span>Keep pets and children completely away from wet curing pieces.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Ventilation */}
          <section id="ventilation" className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs scroll-mt-24">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mb-3 flex items-center gap-2">
              <Wind className="w-5 h-5 text-teal-700" />
              <span>Ventilation & Respiratory Defense</span>
            </h2>
            <div className="text-stone-700 text-sm leading-relaxed space-y-3">
              <p>
                A well-ventilated studio requires active airflow, not merely a closed room with an open door. Position a window fan blowing air outward (exhaust) while another open window draws fresh air inward.
              </p>
              <p>
                <strong>The Half-Face Respirator:</strong> Wear a fitted half-mask respirator equipped with NIOSH-approved Organic Vapor (OV) cartridges and P95 particulate pre-filters. Replace cartridges every 6 months or whenever you detect chemical odor through the mask.
              </p>
            </div>
          </section>

          {/* Section: Gloves */}
          <section id="gloves" className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs scroll-mt-24">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-700" />
              <span>Nitrile Gloves vs. Latex</span>
            </h2>
            <div className="text-stone-700 text-sm leading-relaxed space-y-3">
              <p>
                Never use latex gloves when working with epoxy. Studies prove that epoxy monomers and amine curing agents permeate latex within 2 to 5 minutes, allowing chemicals to absorb through skin without visible tears.
              </p>
              <p>
                <strong>Always use powder-free nitrile gloves</strong> (minimum 4 to 6 mil thickness). Nitrile provides chemical resistance and does not degrade in the presence of epoxy or isopropyl alcohol.
              </p>
            </div>
          </section>

          {/* Section: Skin Contact & Spills */}
          <section id="skin-contact" className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs scroll-mt-24">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mb-3 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-rose-700" />
              <span>Skin Contact Protocol & Spill Response</span>
            </h2>
            <div className="text-stone-700 text-sm leading-relaxed space-y-3">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-rose-900">
                <strong className="block font-semibold mb-1">CRITICAL RULE: Never Clean Skin with Acetone or Solvents!</strong>
                Acetone breaks down the natural lipid barrier of your epidermis, driving liquid epoxy molecules deep into your bloodstream and rapidly accelerating chemical sensitization.
              </div>
              <p>
                If resin touches your skin: wash immediately with liquid dish soap, warm water, and a paper towel. For stubborn residue, use baking soda with soap or an organic citrus pumice mechanic soap.
              </p>
            </div>
          </section>

          {/* Section: Disposal */}
          <section id="storage-disposal" className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs scroll-mt-24">
            <h2 className="font-serif text-2xl font-medium text-stone-900 mb-3">
              Storage & Chemical Disposal
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Never pour liquid Part A or Part B down household drains or municipal sewers. Uncured epoxy is hazardous to aquatic life.
            </p>
            <div className="text-xs text-stone-600 space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <p><strong>To dispose of leftover resin safely:</strong> Combine residual Part A and Part B in equal proportions in a disposable container. Allow the mixture to fully cure into a solid inert plastic block. Once hardened, it can be disposed of in standard household trash.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
