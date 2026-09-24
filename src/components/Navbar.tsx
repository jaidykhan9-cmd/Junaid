import React, { useState } from 'react';
import { Phone, MessageSquare, ShieldCheck, Menu, X, User, Download, Smartphone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceTitle?: string, category?: string) => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
  onOpenDownloadApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenPortal,
  onOpenAdmin,
  onOpenDownloadApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full luxury-glass border-b border-[#d4af37]/25 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#hero" className="flex items-center gap-3 group text-left">
          <div className="relative overflow-hidden w-10 h-10 rounded-sm bg-gradient-to-br from-[#1c2130] to-[#10131d] border-2 border-[#d4af37]/60 flex items-center justify-center font-serif-lux font-bold text-lg text-[#fae8b4] shadow-[0_0_16px_rgba(212,175,55,0.3)] group-hover:border-[#d4af37] transition-all">
            <span>JD</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer-ltr pointer-events-none" />
          </div>
          <span className="font-display font-bold text-lg md:text-xl tracking-tight text-[#f8fafc] group-hover:text-[#fae8b4] transition-colors whitespace-nowrap">
            JD Electrical &amp; Plumbing
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#94a3b8]">
          <a href="#services" className="hover:text-[#fae8b4] transition-colors py-1">
            Services
          </a>
          <a href="#why-choose-us" className="hover:text-[#fae8b4] transition-colors py-1">
            Why Choose Us
          </a>
          <a href="#packages" className="hover:text-[#fae8b4] transition-colors py-1">
            Packages
          </a>
          <a href="#gallery" className="hover:text-[#fae8b4] transition-colors py-1">
            Projects
          </a>
          <a href="#about" className="hover:text-[#fae8b4] transition-colors py-1">
            About
          </a>
          <a href="#contact" className="hover:text-[#fae8b4] transition-colors py-1">
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary actions & Download App button */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={onOpenDownloadApp}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#fae8b4] border border-[#d4af37]/60 hover:border-[#d4af37] rounded-lg bg-gradient-to-r from-[#1c2234] to-[#121624] hover:from-[#242c42] transition-all whitespace-nowrap cursor-pointer shadow-[0_0_14px_rgba(212,175,55,0.25)] group active:scale-95"
            title="Download JD Services App for iPhone, Android, Tablet & PC"
          >
            <Download className="w-3.5 h-3.5 text-[#d4af37] group-hover:-translate-y-0.5 transition-transform" />
            <span>Download App</span>
          </button>

          <button
            onClick={onOpenPortal}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#f8fafc] border border-white/15 hover:border-white/30 rounded-lg bg-[#161a26]/80 hover:bg-[#1f2536] transition-all whitespace-nowrap cursor-pointer shadow-sm"
          >
            <User className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span>Client Portal</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#08090d] bg-gradient-to-r from-[#fae8b4] via-[#d4af37] to-[#aa820a] hover:brightness-110 border border-[#fae8b4]/60 rounded-lg shadow-[0_0_18px_rgba(212,175,55,0.35)] transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            Book a Service
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={onOpenDownloadApp}
            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold text-[#fae8b4] bg-[#161a26] border border-[#d4af37]/50 rounded-lg shadow-sm"
            title="Download App"
          >
            <Download className="w-3 h-3 text-[#d4af37]" />
            <span>App</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 text-xs font-bold text-[#08090d] bg-gradient-to-r from-[#fae8b4] to-[#d4af37] rounded-lg shadow-sm"
          >
            Book
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#94a3b8] hover:text-[#d4af37] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#d4af37]/20 bg-[#0d0f17]/98 backdrop-blur-xl px-5 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-[#94a3b8]">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-white/5 hover:text-[#d4af37]"
            >
              Services
            </a>
            <a
              href="#why-choose-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-white/5 hover:text-[#d4af37]"
            >
              Why Choose Us
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-white/5 hover:text-[#d4af37]"
            >
              Packages
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-white/5 hover:text-[#d4af37]"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-white/5 hover:text-[#d4af37]"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-white/5 hover:text-[#d4af37]"
            >
              Contact
            </a>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownloadApp();
              }}
              className="w-full text-center py-2.5 text-xs font-bold text-[#08090d] bg-gradient-to-r from-[#fae8b4] via-[#d4af37] to-[#aa820a] rounded-lg shadow-[0_0_16px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download JD App (iOS, Android, PC)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold text-[#f8fafc] border border-white/10 rounded-lg bg-white/5"
            >
              Client Portal &amp; Live Tracking
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-[#08090d] bg-[#d4af37] rounded font-bold"
            >
              Book a Service Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
