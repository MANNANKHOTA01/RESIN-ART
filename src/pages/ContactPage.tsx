import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { submitContactMessage } from '../services/dataService';

export const ContactPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    const res = await submitContactMessage(formData);
    if (res.success) {
      setStatus({ type: 'success', message: res.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus({ type: 'error', message: res.message });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Contact Us' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="max-w-2xl mb-12">
        <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
          Editorial Desk
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-3">
          Contact Us
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed">
          Have a question, feedback on an editorial guide, or a studio collaboration inquiry? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left: Get in touch info (Matches Mockup) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
            <h3 className="font-serif text-xl font-medium text-stone-900 pb-3 border-b border-stone-100">
              Get in Touch
            </h3>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <Mail className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 font-semibold">Editorial Inquiries</strong>
                <span className="text-stone-500">hello@resinart.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <Phone className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 font-semibold">Studio Phone</strong>
                <span className="text-stone-500">+1 (555) 019-4587</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 font-semibold">Studio Headquarters</strong>
                <span className="text-stone-500">128 Creative Way, Art City, CA 90210</span>
              </div>
            </div>
          </div>

          <div className="bg-stone-100/70 p-5 rounded-xl border border-stone-200 text-xs text-stone-600">
            <h4 className="font-semibold text-stone-900 mb-1">Response Time Guarantee</h4>
            <p className="leading-relaxed">
              Our editorial and chemical advisors read and review all incoming submissions. You will receive a direct reply within 1–2 business days.
            </p>
          </div>
        </div>

        {/* Right: Send Us a Message Form (Matches Mockup) */}
        <div className="md:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            <h3 className="font-serif text-xl font-medium text-stone-900 mb-6">
              Send Us a Message
            </h3>

            {status.type === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-medium text-stone-900">Message Received</h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  {status.message}
                </p>
                <button
                  onClick={() => setStatus({ type: 'idle', message: '' })}
                  className="mt-4 px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Question on wave paste formulation"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can our editorial team help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 focus:bg-white transition resize-y"
                  />
                </div>

                {status.type === 'error' && (
                  <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                    {status.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{status.type === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
