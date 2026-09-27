import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { subscribeNewsletter } from '../../services/dataService';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
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
    <section className="my-16 mx-auto max-w-5xl px-4 sm:px-6">
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-8 sm:p-12 text-white shadow-xl overflow-hidden border border-slate-700">
        {/* Subtle decorative glowing mesh */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-2 block">
            ResinArt Studio Dispatch
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-4">
            Get Better at Resin Art
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
            Practical guides, project formulas, temperature advisories, and resin troubleshooting directly from experienced makers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder="Your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-sm bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-stone-400 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400 transition"
            />
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-teal-300 hover:bg-teal-200 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              <span>{status.type === 'loading' ? 'Joining...' : 'Subscribe'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {status.type === 'success' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-emerald-300 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{status.message}</span>
            </div>
          )}
          {status.type === 'error' && (
            <p className="mt-4 text-rose-300 text-xs">{status.message}</p>
          )}

          <p className="mt-4 text-[11px] text-stone-400">
            No spam, ever. Unsubscribe with one click anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
