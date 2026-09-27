import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { subscribeNewsletter } from '../../services/dataService';

export const Footer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ type: 'loading', message: '' });
    const res = await subscribeNewsletter(email);
    if (res.success) {
      setStatus({ type: 'success', message: res.message });
      setEmail('');
    } else {
      setStatus({ type: 'error', message: res.message });
    }
  };

  return (
    <footer className="bg-[#091424] text-stone-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed font-sans">
              ResinArt is an independent editorial publication dedicated to advancing knowledge in epoxy craft, fluid resin mechanics, studio safety standards, and artisanal finishing.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-widest text-teal-400 font-semibold mb-2">
                Join Our Creative Community
              </h4>
              <p className="text-xs text-stone-400 mb-3">
                Practical guides, project formulas, and resin tips delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900/90 border border-slate-700 text-stone-200 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-teal-500 flex-1"
                />
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {status.type === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {status.type === 'success' && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{status.message}</span>
                </div>
              )}
              {status.type === 'error' && (
                <p className="text-rose-400 text-xs mt-2">{status.message}</p>
              )}
            </div>
          </div>

          {/* Column: Core Guides */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-100 font-semibold mb-4">
              Core Guides
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('/resin-art-for-beginners/')} className="hover:text-teal-300 transition-colors">
                  Beginner Starter Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-art-techniques/')} className="hover:text-teal-300 transition-colors">
                  Pouring Techniques
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-art-ideas/')} className="hover:text-teal-300 transition-colors">
                  Creative Ideas Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-art-projects/')} className="hover:text-teal-300 transition-colors">
                  Step-by-Step Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-art-supplies/')} className="hover:text-teal-300 transition-colors">
                  Essential Supplies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-art-tools/')} className="hover:text-teal-300 transition-colors">
                  Studio Tools & Gear
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-art-safety/')} className="hover:text-teal-300 transition-colors">
                  Health & Safety Protocol
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-art-troubleshooting/')} className="hover:text-teal-300 transition-colors">
                  Troubleshooting Sticky Resin
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Chemistry & Tutorials */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-100 font-semibold mb-4">
              Science & Topics
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('/epoxy-resin/')} className="hover:text-teal-300 transition-colors">
                  Epoxy Resin Explained
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-vs-epoxy/')} className="hover:text-teal-300 transition-colors">
                  Resin vs. Epoxy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-mixing/')} className="hover:text-teal-300 transition-colors">
                  Mixing & Ratios
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-curing/')} className="hover:text-teal-300 transition-colors">
                  Curing Stages & Humidity
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/remove-resin-bubbles/')} className="hover:text-teal-300 transition-colors">
                  Bubble Removal Methods
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-molds/')} className="hover:text-teal-300 transition-colors">
                  Silicone Mold Care
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-pigments/')} className="hover:text-teal-300 transition-colors">
                  Pigments, Micas & Inks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-art-care/')} className="hover:text-teal-300 transition-colors">
                  Resin Care & Polishing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resin-art-faq/')} className="hover:text-teal-300 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Publication & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-100 font-semibold mb-4">
              Publication & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('/about/')} className="hover:text-teal-300 transition-colors">
                  About Our Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact/')} className="hover:text-teal-300 transition-colors">
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/editorial-policy/')} className="hover:text-teal-300 transition-colors">
                  Editorial Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/corrections-policy/')} className="hover:text-teal-300 transition-colors">
                  Corrections Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/affiliate-disclosure/')} className="hover:text-teal-300 transition-colors">
                  Affiliate Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy-policy/')} className="hover:text-teal-300 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms-and-conditions/')} className="hover:text-teal-300 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer/')} className="hover:text-teal-300 transition-colors">
                  Safety Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cookie-policy/')} className="hover:text-teal-300 transition-colors">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal Shortcut */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} ResinArt. All rights reserved. Peer-vetted resin craft education.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-stone-600">Production URL: resin_art.vercel.app</span>
            <span className="text-stone-700">·</span>
            <button
              onClick={() => onNavigate('/admin/login/')}
              className="flex items-center gap-1 text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
              title="Admin Portal (Authorized Personnel Only)"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
