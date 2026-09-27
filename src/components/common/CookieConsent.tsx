import React, { useEffect, useState } from 'react';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('resinart_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (val: 'accepted' | 'essential_only') => {
    localStorage.setItem('resinart_cookie_consent', val);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md p-4 bg-stone-900/95 text-stone-100 rounded-lg shadow-2xl border border-stone-800 text-xs backdrop-blur-xs">
      <p className="leading-relaxed mb-3">
        ResinArt uses essential local storage and cache cookies to enable offline reading and preserve site preferences. We do not use third-party ad tracking.
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleChoice('accepted')}
          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded transition-colors text-xs"
        >
          Accept
        </button>
        <button
          onClick={() => handleChoice('essential_only')}
          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium rounded transition-colors text-xs"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
};
