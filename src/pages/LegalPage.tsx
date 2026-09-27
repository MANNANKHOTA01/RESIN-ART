import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface LegalDoc {
  title: string;
  lastUpdated: string;
  content: string;
}

const LEGAL_DOCS: Record<string, LegalDoc> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    lastUpdated: 'March 2026',
    content: `
      <h2>1. Introduction</h2>
      <p>ResinArt ("we," "our," or "us") respects your privacy and is committed to protecting personal data. This privacy policy informs you how we collect and manage your information when you visit our publication (https://resin_art.vercel.app/).</p>
      
      <h2>2. Information We Collect</h2>
      <p>We do not require account registration for public readers. We only collect personal information that you voluntarily provide to us when subscribing to our newsletter (email address) or submitting an inquiry via our contact form (name, email address, message).</p>

      <h2>3. Use of Information</h2>
      <p>Any email submitted for newsletter subscription is utilized solely to deliver editorial articles, guides, and tips. We never sell, rent, or trade your email address to third-party data brokers or marketing networks.</p>

      <h2>4. Local Storage and Caching</h2>
      <p>To enable Progressive Web App (PWA) functionality and offline guide reading, this application utilizes standard browser Service Workers and CacheStorage APIs. This storage remains entirely local to your device.</p>
    `
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions',
    lastUpdated: 'March 2026',
    content: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and utilizing ResinArt, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.</p>

      <h2>2. Educational Nature of Content</h2>
      <p>All tutorials, chemical explanations, and project blueprints provided on ResinArt are for informational and educational purposes only. Users are solely responsible for verifying manufacturer-specific instructions on their own chemical products.</p>

      <h2>3. Intellectual Property</h2>
      <p>Original editorial text, photographic compositions, and branding materials on ResinArt are the intellectual property of the publication and may not be reproduced without written permission.</p>
    `
  },
  'disclaimer': {
    title: 'Health & Safety Disclaimer',
    lastUpdated: 'March 2026',
    content: `
      <h2>1. Chemical Handling Notice</h2>
      <p>Working with epoxy resins, polyamines, UV resins, and chemical solvents involves inherent health risks, including acute contact dermatitis, chemical burns, and respiratory sensitization. Always consult the manufacturer's official Safety Data Sheet (SDS) for your specific chemical product.</p>

      <h2>2. Not Medical Advice</h2>
      <p>No material on ResinArt is intended to serve as medical advice. If you experience an allergic reaction, chemical burn, or inhalation distress, seek emergency medical care immediately.</p>
    `
  },
  'cookie-policy': {
    title: 'Cookie & Local Storage Policy',
    lastUpdated: 'March 2026',
    content: `
      <h2>1. What Are Cookies?</h2>
      <p>Cookies and browser local storage are small data files placed on your device to maintain user preferences and offline availability.</p>

      <h2>2. How ResinArt Uses Storage</h2>
      <p>We utilize strictly necessary technical storage to remember cookie preferences, retain PWA cache states, and maintain secure administrator sessions.</p>
    `
  },
  'affiliate-disclosure': {
    title: 'Affiliate Disclosure',
    lastUpdated: 'March 2026',
    content: `
      <h2>1. Editorial Independence</h2>
      <p>ResinArt is an independent craft publication. We maintain strict editorial separation between educational guides and any future commercial affiliate partnerships.</p>

      <h2>2. Full Transparency</h2>
      <p>In the event that an article includes affiliate links to tools or supplies, it will be prominently disclosed at the top of that specific guide. We do not recommend tools we have not vetted.</p>
    `
  },
  'editorial-policy': {
    title: 'Editorial Standards & Review Policy',
    lastUpdated: 'March 2026',
    content: `
      <h2>1. Commitment to Scientific Rigor</h2>
      <p>Resin art is chemistry in practice. Our editorial guides are drafted and reviewed with focus on thermodynamic reality, stoichiometric accuracy, and studio durability.</p>

      <h2>2. No Sponsored Rankings</h2>
      <p>We do not accept payment to rank brands higher or fabricate user testimonials. Content is created purely for the benefit of makers and craft enthusiasts.</p>
    `
  },
  'corrections-policy': {
    title: 'Corrections Policy',
    lastUpdated: 'March 2026',
    content: `
      <h2>1. Prompt Rectification</h2>
      <p>ResinArt strives for total accuracy. If an error regarding chemical safety, mixing ratios, or tool specifications is identified, our team will correct the guide promptly.</p>

      <h2>2. Submitting a Correction</h2>
      <p>To report an error or suggest an update, please submit a message via our Contact page with the article URL and the specific technical discrepancy.</p>
    `
  }
};

export const LegalPage: React.FC<{
  legalKey: string;
  onNavigate: (path: string) => void;
}> = ({ legalKey, onNavigate }) => {
  const doc = LEGAL_DOCS[legalKey] || LEGAL_DOCS['privacy-policy'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: doc.title }]}
        onNavigate={onNavigate}
      />

      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight mb-2">
          {doc.title}
        </h1>
        <p className="text-xs text-stone-400">
          Last updated: {doc.lastUpdated} · ResinArt Editorial Publication
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs">
        <div
          className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: doc.content }}
        />
      </div>
    </div>
  );
};
