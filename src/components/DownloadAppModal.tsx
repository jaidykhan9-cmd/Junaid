import React, { useState, useEffect } from 'react';
import {
  Download,
  Share2,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  X,
  QrCode,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  WifiOff,
} from 'lucide-react';
import QRCode from 'qrcode';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt?: any;
  onPromptAccepted?: () => void;
}

type DeviceTab = 'auto' | 'android' | 'ios' | 'pc' | 'qr';

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onPromptAccepted,
}) => {
  const [activeTab, setActiveTab] = useState<DeviceTab>('auto');
  const [detectedPlatform, setDetectedPlatform] = useState<'android' | 'ios' | 'pc'>('pc');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [installing, setInstalling] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    // Detect user platform
    const ua = navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    let platform: 'android' | 'ios' | 'pc' = 'pc';
    if (isIos) platform = 'ios';
    else if (isAndroid) platform = 'android';

    setDetectedPlatform(platform);
    setActiveTab(platform);

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Generate dynamic QR code for the current app URL
    const appUrl = window.location.origin;
    QRCode.toDataURL(appUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#08090d',
        light: '#fae8b4',
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Failed to generate QR code:', err));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        setInstalling(true);
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          if (onPromptAccepted) onPromptAccepted();
          onClose();
        }
      } catch (err) {
        console.error('Install prompt error:', err);
      } finally {
        setInstalling(false);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#10131d] to-[#08090d] border border-[#d4af37]/50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Ribbon */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#141824]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center font-serif-lux font-bold text-base text-[#fae8b4] shadow-[0_0_12px_rgba(212,175,55,0.3)]">
              JD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#f8fafc]">
                  Download JD Services App
                </h3>
                <span className="text-[10px] bg-[#d4af37]/20 text-[#fae8b4] border border-[#d4af37]/40 px-2 py-0.5 rounded font-mono font-bold">
                  v2.0 PWA
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Install for iPhone, Android, iPad/Tablet &amp; PC · No app store download needed
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#94a3b8] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close download modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Selection Tabs */}
        <div className="p-2 sm:p-3 bg-[#0a0c12] border-b border-white/5 flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
          <button
            onClick={() => setActiveTab('android')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'android'
                ? 'bg-[#d4af37] text-[#08090d] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android</span>
            {detectedPlatform === 'android' && (
              <span className="text-[9px] bg-black/30 px-1 py-0.2 rounded font-mono">You</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-[#d4af37] text-[#08090d] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone &amp; iPad</span>
            {detectedPlatform === 'ios' && (
              <span className="text-[9px] bg-black/30 px-1 py-0.2 rounded font-mono">You</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('pc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'pc'
                ? 'bg-[#d4af37] text-[#08090d] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>PC &amp; Mac</span>
            {detectedPlatform === 'pc' && (
              <span className="text-[9px] bg-black/30 px-1 py-0.2 rounded font-mono">You</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-[#d4af37] text-[#08090d] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR Code</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Status Message if already in standalone */}
          {isStandalone && (
            <div className="p-3 bg-[#102a1b] border border-[#22c55e]/40 rounded-xl flex items-center gap-2.5 text-xs text-[#bbf7d0]">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
              <span>You are already running the installed standalone version of JD Services App!</span>
            </div>
          )}

          {/* TAB 1: ANDROID */}
          {activeTab === 'android' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-sm text-[#fae8b4] flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#d4af37]" />
                    <span>Install on Android (Samsung, Xiaomi, Oppo, Vivo, Pixel)</span>
                  </h4>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    Adds an official application icon to your home screen with instant 1-tap booking.
                  </p>
                </div>
              </div>

              {deferredPrompt ? (
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#161a26] to-[#121520] border border-[#d4af37]/60 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="font-bold text-xs text-[#f8fafc] block">
                      Direct 1-Click Install Available
                    </span>
                    <span className="text-[11px] text-[#94a3b8]">
                      Instant download without Google Play Store verification wait.
                    </span>
                  </div>
                  <button
                    onClick={handleInstallClick}
                    disabled={installing}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#fae8b4] via-[#d4af37] to-[#aa820a] hover:brightness-110 text-[#08090d] font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>{installing ? 'Installing...' : 'Install App Now'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs text-[#f8fafc] font-semibold mb-2">
                    How to install on Chrome / Samsung Internet:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-[#121520] border border-white/5 space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#fae8b4] font-bold text-xs flex items-center justify-center">
                        1
                      </div>
                      <div className="font-semibold text-[#fae8b4]">Open Browser Menu</div>
                      <p className="text-[11px] text-[#94a3b8]">
                        Tap the three vertical dots (⋮) in the top-right corner of Chrome.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#121520] border border-white/5 space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#fae8b4] font-bold text-xs flex items-center justify-center">
                        2
                      </div>
                      <div className="font-semibold text-[#fae8b4]">Tap &quot;Install app&quot;</div>
                      <p className="text-[11px] text-[#94a3b8]">
                        Select &quot;Install app&quot; or &quot;Add to Home screen&quot; from the options.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#121520] border border-white/5 space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#fae8b4] font-bold text-xs flex items-center justify-center">
                        3
                      </div>
                      <div className="font-semibold text-[#fae8b4]">Confirm Install</div>
                      <p className="text-[11px] text-[#94a3b8]">
                        Tap &quot;Install&quot;. The JD Services app icon will appear in your app drawer!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: IOS (IPHONE / IPAD) */}
          {activeTab === 'ios' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h4 className="font-display font-bold text-sm text-[#fae8b4] flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#d4af37]" />
                  <span>Install on iPhone &amp; iPad (Apple Safari)</span>
                </h4>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Apple iOS allows you to install the complete JD Services app without Apple ID password prompts or App Store downloads.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#121520] border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#fae8b4] font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-[#f8fafc] block">Tap the Safari Share Icon</span>
                    <span className="text-[#94a3b8]">
                      At the bottom bar of Safari on iPhone (or top bar on iPad), tap the square Share button (
                      <Share2 className="inline w-3.5 h-3.5 text-[#38bdf8] mx-0.5" />
                      ).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#121520] border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#fae8b4] font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-[#f8fafc] block">
                      Select &quot;Add to Home Screen&quot;
                    </span>
                    <span className="text-[#94a3b8]">
                      Scroll down the sharing sheet and tap <strong className="text-[#fae8b4]">&quot;Add to Home Screen&quot;</strong>.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#121520] border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#fae8b4] font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-[#f8fafc] block">Tap &quot;Add&quot;</span>
                    <span className="text-[#94a3b8]">
                      Confirm by tapping <strong className="text-white">&quot;Add&quot;</strong> in the top-right corner. The luxury JD icon is placed on your iPhone screen!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PC & MAC */}
          {activeTab === 'pc' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h4 className="font-display font-bold text-sm text-[#fae8b4] flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-[#d4af37]" />
                  <span>Install on Desktop PC, Mac &amp; Laptop</span>
                </h4>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Run JD Services in an isolated, high-performance desktop window without browser tabs.
                </p>
              </div>

              {deferredPrompt ? (
                <div className="p-4 rounded-xl bg-[#161a26] border border-[#d4af37]/50 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-xs text-[#f8fafc] block">
                      Desktop Installation Ready
                    </span>
                    <span className="text-[11px] text-[#94a3b8]">
                      Install to your Windows Start Menu, Taskbar, or macOS Dock.
                    </span>
                  </div>
                  <button
                    onClick={handleInstallClick}
                    className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#fae8b4] text-[#08090d] font-bold text-xs rounded-xl flex items-center gap-2 shadow cursor-pointer active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install Desktop App</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#121520] border border-white/5 space-y-2 text-xs">
                  <div className="font-semibold text-[#fae8b4] flex items-center gap-1.5">
                    <Monitor className="w-4 h-4" />
                    <span>Browser Address Bar Install Icon</span>
                  </div>
                  <p className="text-[#94a3b8]">
                    In Chrome, Microsoft Edge, or Brave: look for the <strong>install icon (🖥️ or ➕)</strong> on the right side of your address bar and click <strong>&quot;Install&quot;</strong>.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SCAN QR CODE */}
          {activeTab === 'qr' && (
            <div className="flex flex-col sm:flex-row items-center gap-6 animate-fadeIn">
              {qrCodeUrl ? (
                <div className="p-3 bg-[#fae8b4] rounded-2xl shadow-xl shrink-0 border-2 border-[#d4af37]">
                  <img
                    src={qrCodeUrl}
                    alt="Scan QR code to install JD Services App"
                    className="w-44 h-44 sm:w-48 sm:h-48 rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 rounded-xl bg-white/5 flex items-center justify-center text-xs text-[#94a3b8]">
                  Generating QR...
                </div>
              )}

              <div className="space-y-3 text-xs">
                <h4 className="font-display font-bold text-sm text-[#fae8b4] flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#d4af37]" />
                  <span>Scan with Camera to Install on Mobile</span>
                </h4>
                <p className="text-[#94a3b8] leading-relaxed">
                  Open your iPhone Camera or Android Google Lens / Camera app and point it at the QR code to immediately launch and download the application on your mobile device.
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#f8fafc] text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Copy App URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feature Highlights Grid */}
          <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-white/5 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#f8fafc] block">1-Tap Emergency</span>
                <span className="text-[11px] text-[#94a3b8]">Direct priority dispatch line to CEO Junaid Farooq</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white/5 flex items-start gap-2.5">
              <WifiOff className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#f8fafc] block">Works Offline</span>
                <span className="text-[11px] text-[#94a3b8]">Access contact logs and emergency MEP specs without network</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white/5 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#22d3ee] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#f8fafc] block">Zero App Store Wait</span>
                <span className="text-[11px] text-[#94a3b8]">Lightweight progressive technology under 1 MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0c0e15] border-t border-white/10 flex items-center justify-between text-xs text-[#64748b]">
          <span>JD Electrical &amp; Plumbing Services · Est. 2018</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
