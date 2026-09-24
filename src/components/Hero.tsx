import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Calendar, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { LuxuryHeadline } from './LuxuryHeadline.tsx';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenDownloadApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenDownloadApp }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
      {/* Background Media with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_cinematic_service_1790130686955.jpg"
          alt="JD Electrical and Plumbing architectural installation in Mansehra"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.48] contrast-[1.05]"
        />
        {/* Deep Obsidian and Subtle Gold Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090b10]/90 via-[#0d0f17]/85 to-[#090b10]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a2032]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Warm Golden Radiant Aura & Subtle Electric Accents */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        {/* Golden Central Radiant Aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-[#d4af37]/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#0284c7]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#0891b2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Trust Origin Marker with Rich Gold Frame */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#141724] via-[#1c2234] to-[#141724] border border-[#d4af37]/60 text-xs tracking-wider uppercase text-[#fae8b4] mb-4 shadow-[0_0_16px_rgba(212,175,55,0.2)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37] animate-ping" />
          <span className="font-semibold">CEO Junaid Farooq · Est. 2018 · Mansehra</span>
          <span className="text-[#d4af37]/60">◆</span>
          <span className="text-[#fae8b4] font-mono text-[11px]">Certified MEP</span>
        </motion.div>

        {/* Master Luxury Cinematic Animated Headline */}
        <LuxuryHeadline />

        {/* Supporting Message - Exact Client Copy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-3xl space-y-3"
        >
          <p className="text-base sm:text-lg text-[#f8fafc] font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
            Since 2018, JD Electrical &amp; Plumbing Services has been providing professional electrical and plumbing solutions for residential, commercial, and property maintenance requirements.
          </p>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed" style={{ textWrap: 'balance' }}>
            Whether you need an electrical installation, fault diagnosis, plumbing repair, maintenance work, or a complete service solution, our focus is on delivering dependable workmanship and professional customer service.
          </p>
        </motion.div>

        {/* Primary Action Buttons with Golden Elevation & Download App */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          {/* Primary: Request a Service */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#08090d] bg-gradient-to-r from-[#fae8b4] via-[#d4af37] to-[#aa820a] hover:from-[#fff5cc] hover:to-[#b89122] border border-[#fae8b4]/70 rounded-xl shadow-[0_0_24px_rgba(212,175,55,0.35)] hover:shadow-[0_0_32px_rgba(212,175,55,0.55)] transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#08090d]" />
            <span>Request a Service</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#08090d]" />
          </button>

          {/* Contact Us */}
          <a
            href="#contact"
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#f8fafc] bg-[#161a26]/90 hover:bg-[#1f2538] border border-white/20 hover:border-[#d4af37] rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Contact Us</span>
          </a>

          {/* Download App Action */}
          {onOpenDownloadApp && (
            <button
              onClick={onOpenDownloadApp}
              className="w-full sm:w-auto px-5 py-3.5 text-sm font-bold text-[#fae8b4] bg-gradient-to-r from-[#1c2234] via-[#161a28] to-[#121522] hover:from-[#252e46] border border-[#d4af37]/70 hover:border-[#d4af37] rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_18px_rgba(212,175,55,0.25)] group active:scale-95"
              title="Download App for iPhone, Android, Tablet & PC"
            >
              <Download className="w-4 h-4 text-[#d4af37] group-hover:-translate-y-0.5 transition-transform" />
              <span>Download App</span>
            </button>
          )}

          {/* Secondary: WhatsApp Us */}
          <a
            href="https://wa.me/923021822160?text=Hello%20JD%20Electrical%20%26%20Plumbing%20Services%2C%20I%20would%20like%20to%20request%20a%20service."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-[#f8fafc] bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/50 hover:border-[#25d366] rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#25d366]" />
            <span>WhatsApp Us</span>
          </a>

          {/* Third: Call Now */}
          <a
            href="tel:03021822160"
            className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-[#f8fafc] bg-[#161a26]/85 hover:bg-[#202538] border border-white/15 hover:border-white/30 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#fae8b4]" />
            <span>Call Now</span>
          </a>
        </motion.div>

        {/* Claim-to-Proof Metric Ribbon with Golden Framed Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-16 pt-8 border-t border-[#d4af37]/25 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 w-full max-w-4xl text-left"
        >
          <div className="p-4 rounded-xl bg-gradient-to-b from-[#141724]/90 to-[#0e1017]/90 border border-[#d4af37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#d4af37]/60 transition-all">
            <div className="font-display font-bold text-2xl sm:text-3xl text-[#fae8b4] tabular-nums drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
              8+ Years
            </div>
            <div className="text-xs text-[#94a3b8] mt-1 font-medium">
              Established 2018 · CEO Junaid Farooq
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-[#141724]/90 to-[#0e1017]/90 border border-[#d4af37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#d4af37]/60 transition-all">
            <div className="font-display font-bold text-2xl sm:text-3xl text-[#38bdf8] tabular-nums">
              100% Safety
            </div>
            <div className="text-xs text-[#94a3b8] mt-1 font-medium">
              Pure Copper &amp; Hydrostatic Pressure Rated
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-[#141724]/90 to-[#0e1017]/90 border border-[#d4af37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#d4af37]/60 transition-all">
            <div className="font-display font-bold text-2xl sm:text-3xl text-[#22d3ee] tabular-nums">
              24/7 Rapid
            </div>
            <div className="text-xs text-[#94a3b8] mt-1 font-medium">
              Emergency MEP Dispatch in Mansehra
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-[#141724]/90 to-[#0e1017]/90 border border-[#d4af37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#d4af37]/60 transition-all">
            <div className="font-display font-bold text-2xl sm:text-3xl text-[#fae8b4] tabular-nums drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
              Mansehra Valley
            </div>
            <div className="text-xs text-[#94a3b8] mt-1 font-medium">
              Local Engineering Authority &amp; Trust
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
