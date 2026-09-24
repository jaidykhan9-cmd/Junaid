import React, { useState, useEffect } from 'react';
import { Download, Share2, X, Smartphone, Monitor, Tablet, Sparkles } from 'lucide-react';

interface PwaInstallBannerProps {
  onOpenDownloadModal?: () => void;
  deferredPrompt?: any;
}

export const PwaInstallBanner: React.FC<PwaInstallBannerProps> = ({
  onOpenDownloadModal,
  deferredPrompt: propDeferredPrompt,
}) => {
  const [internalDeferredPrompt, setInternalDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  const deferredPrompt = propDeferredPrompt || internalDeferredPrompt;

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('SW registration info:', err);
      });
    }

    // Check if already in standalone / installed mode
    const isRunningStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isRunningStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt (Chromium, Android, Edge, Desktop PC)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInternalDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (isStandalone || dismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDismissed(true);
      }
    } else if (onOpenDownloadModal) {
      onOpenDownloadModal();
    }
  };

  return (
    <>
      {/* Floating or Top Install Banner for iPhone, Android, Tablet, PC */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-40 max-w-md bg-gradient-to-r from-[#0c0e15] to-[#121520] border border-[#d4af37]/40 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37] flex items-center justify-center font-bold text-xs text-[#fae8b4] shrink-0 shadow">
              JD
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xs text-[#f8fafc]">
                  JD Services App
                </span>
                <span className="text-[9px] bg-[#d4af37]/20 border border-[#d4af37]/35 text-[#fae8b4] px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
                  Universal App
                </span>
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-0.5 leading-snug">
                Optimized for iPhone, Android, iPad/Tablet &amp; PC with instant 1-tap booking &amp; emergency dispatch.
              </p>
              
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-[#64748b]">
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-[#fae8b4]" /> iPhone &amp; Android
                </span>
                <span className="flex items-center gap-1">
                  <Tablet className="w-3 h-3 text-[#fae8b4]" /> Tablet
                </span>
                <span className="flex items-center gap-1">
                  <Monitor className="w-3 h-3 text-[#fae8b4]" /> PC
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="text-[#64748b] hover:text-white p-1 rounded transition-colors cursor-pointer"
            aria-label="Dismiss app banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
          <span className="text-[10px] text-[#94a3b8]">No app store required</span>
          
          <div className="flex items-center gap-2">
            {deferredPrompt ? (
              <button
                onClick={handleInstallClick}
                className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#fae8b4] text-[#08090d] font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install on Device</span>
              </button>
            ) : null}

            <button
              onClick={() => {
                if (onOpenDownloadModal) onOpenDownloadModal();
              }}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#f8fafc] font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#fae8b4]" />
              <span>Download / Guide</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
