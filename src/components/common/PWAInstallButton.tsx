import React, { useState } from 'react';
import { Download, Share2, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed, hide prompt
  if (isInstalled) {
    return null;
  }

  // Chromium / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-md transition-colors ${className}`}
        aria-label="Install ResinArt Web Application"
      >
        <Download className="w-3.5 h-3.5 text-amber-900" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors ${className}`}
          aria-label="Install on iPhone / iPad"
        >
          <Share2 className="w-3.5 h-3.5 text-amber-800" />
          <span>Install PWA</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl border border-stone-200">
              <button 
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-teal-400 font-serif font-bold text-lg">
                  R
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900">Install ResinArt on iOS</h3>
                  <p className="text-xs text-stone-500">Access guides & offline tools</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-stone-600 bg-stone-50 p-4 rounded-lg border border-stone-200">
                <p className="flex items-start gap-2">
                  <span className="font-bold text-stone-900">1.</span>
                  <span>Tap the <strong>Share button</strong> <Share2 className="w-4 h-4 inline text-blue-600" /> at the bottom of your Safari screen.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-stone-900">2.</span>
                  <span>Scroll down and select <strong>"Add to Home Screen"</strong>.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-stone-900">3.</span>
                  <span>Tap <strong>"Add"</strong> in the top-right corner to finish.</span>
                </p>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-md bg-stone-900 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-stone-800 transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
