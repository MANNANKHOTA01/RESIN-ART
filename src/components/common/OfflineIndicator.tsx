import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-amber-800 text-amber-50 px-4 py-2.5 text-xs font-medium shadow-xl border border-amber-600/40 animate-fade-in">
      <WifiOff className="w-4 h-4 text-amber-300" />
      <span>Offline Mode — Cached ResinArt guides are active.</span>
    </div>
  );
};
