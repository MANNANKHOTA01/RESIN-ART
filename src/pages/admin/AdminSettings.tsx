import React, { useEffect, useState } from 'react';
import { Check, Globe, Lock, Save, Settings, Shield } from 'lucide-react';
import { SiteSettings } from '../../types';
import { getSiteSettings, updateSiteSettings } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';

export const AdminSettings: React.FC = () => {
  const { authorizedEmail } = useAuth();
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'ResinArt',
    site_description: '',
    default_seo_title: '',
    default_seo_description: '',
    contact_email: 'hello@resinart.com',
    support_phone: '+1 (555) 019-4587',
    studio_location: '128 Creative Way, Art City, CA 90210',
    instagram_url: 'https://instagram.com',
    pinterest_url: 'https://pinterest.com',
    youtube_url: 'https://youtube.com'
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const s = await getSiteSettings();
      setSettings(s);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight">
          Publication Settings & Metadata
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Configure site branding, contact coordinates, default SEO metadata, and social links.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Settings successfully saved and updated in publication state.</span>
        </div>
      )}

      {/* Security notice */}
      <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
        <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Security Boundary:</strong> Super administrator authorization is locked strictly to{' '}
          <span className="font-mono font-bold text-amber-950">{authorizedEmail}</span>. Role modification is restricted to the Supabase infrastructure layer.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand & Editorial Identity */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
          <h3 className="font-serif font-semibold text-stone-900 text-sm pb-2 border-b border-stone-100">
            Brand Identity
          </h3>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Site Title</label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Site Tagline / Description</label>
            <textarea
              rows={2}
              value={settings.site_description}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs resize-none"
            />
          </div>
        </div>

        {/* Global SEO Defaults */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
          <h3 className="font-serif font-semibold text-stone-900 text-sm pb-2 border-b border-stone-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-700" />
            <span>Default Search Engine Metadata</span>
          </h3>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Default Meta Title</label>
            <input
              type="text"
              value={settings.default_seo_title}
              onChange={(e) => setSettings({ ...settings, default_seo_title: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Default Meta Description</label>
            <textarea
              rows={2}
              value={settings.default_seo_description}
              onChange={(e) => setSettings({ ...settings, default_seo_description: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs resize-none"
            />
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
          <h3 className="font-serif font-semibold text-stone-900 text-sm pb-2 border-b border-stone-100">
            Contact Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Public Contact Email</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Studio Phone</label>
              <input
                type="text"
                value={settings.support_phone}
                onChange={(e) => setSettings({ ...settings, support_phone: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Studio Physical Location</label>
            <input
              type="text"
              value={settings.studio_location}
              onChange={(e) => setSettings({ ...settings, studio_location: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
