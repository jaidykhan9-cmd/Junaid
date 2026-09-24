import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Heart, Download, Smartphone } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPayment: () => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
  onOpenDownloadApp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenPayment,
  onOpenPortal,
  onOpenAdmin,
  onOpenDownloadApp,
}) => {
  return (
    <footer className="bg-[#07080c] border-t border-[#d4af37]/20 text-xs text-[#94a3b8]">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#161a26] border border-[#d4af37] flex items-center justify-center font-serif-lux font-bold text-lg text-[#fae8b4]">
                JD
              </div>
              <div>
                <span className="font-display font-bold text-lg text-[#f8fafc] block">
                  JD Electrical &amp; Plumbing Services
                </span>
                <span className="text-[11px] text-[#d4af37] tracking-wider uppercase">
                  Reliable service · Quality workmanship · Practical solutions
                </span>
              </div>
            </div>

            <p className="text-xs text-[#94a3b8] max-w-sm leading-relaxed">
              Since 2018, JD Electrical &amp; Plumbing Services has been providing professional electrical and plumbing solutions for residential, commercial, and property maintenance requirements in Mansehra.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[#fae8b4]">
                <span>⚡ Electrical Services</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[#38bdf8]">
                <span>🚰 Plumbing Solutions</span>
              </span>
            </div>
          </div>

          {/* Col 3: Engineering Services */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-[#f8fafc] uppercase tracking-wider">
              Engineering Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#fae8b4] transition-colors">
                  Architectural Conduit Wiring
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#fae8b4] transition-colors">
                  Smart ATS Generator Panels
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#fae8b4] transition-colors">
                  Concealed European Cisterns
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#fae8b4] transition-colors">
                  High-Pressure PPRC Infrastructure
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#fae8b4] transition-colors">
                  Acoustic Leak Detection
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Payment */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-[#f8fafc] uppercase tracking-wider">
              Client &amp; Admin
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#fae8b4] transition-colors text-left cursor-pointer">
                  Book a Service Dispatch
                </button>
              </li>
              {onOpenDownloadApp && (
                <li>
                  <button
                    onClick={onOpenDownloadApp}
                    className="hover:text-[#fae8b4] text-[#fae8b4] font-semibold transition-colors text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Download App (iOS, Android, PC)</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenPortal} className="hover:text-[#fae8b4] transition-colors text-left cursor-pointer">
                  Client Portal &amp; Live Tracking
                </button>
              </li>
              <li>
                <button onClick={onOpenPayment} className="hover:text-[#fae8b4] transition-colors text-left cursor-pointer">
                  JazzCash Manual Verification
                </button>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#fae8b4] transition-colors">
                  Preventive Maintenance Plans
                </a>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-[#d4af37] hover:text-[#fae8b4] font-semibold transition-colors text-left cursor-pointer">
                  Administrator Console
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Dispatch HQ */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-[#f8fafc] uppercase tracking-wider">
              Mansehra Operations
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Mansehra, Khyber Pakhtunkhwa, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="tel:03021822160" className="hover:text-[#f8fafc] font-mono">
                  0302-1822160
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25d366] shrink-0" />
                <a href="https://wa.me/923021822160" target="_blank" rel="noreferrer" className="hover:text-[#25d366] font-mono">
                  WhatsApp: 03021822160
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="mailto:jaidykhan9@gmail.com" className="hover:text-[#f8fafc]">
                  jaidykhan9@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Footer Legal & Attribution */}
      <div className="border-t border-white/5 bg-[#050608] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748b]">
          <div>
            &copy; 2018&ndash;{new Date().getFullYear()} JD Electrical &amp; Plumbing Services. All rights reserved. Registered in Pakistan.
          </div>
          <div className="flex items-center gap-4">
            <span>Direct Dispatch: jaidykhan9@gmail.com</span>
            <span aria-hidden="true">·</span>
            <span>Cloud SQL Database (PostgreSQL)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
