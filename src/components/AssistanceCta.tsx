import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Calendar, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';

interface AssistanceCtaProps {
  onOpenBooking: () => void;
}

export const AssistanceCta: React.FC<AssistanceCtaProps> = ({ onOpenBooking }) => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#090b10] via-[#0d1017] to-[#090b10] relative border-t border-[#d4af37]/25 overflow-hidden">
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-[#0284c7]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141824] border border-[#d4af37]/50 text-xs font-semibold uppercase tracking-widest text-[#fae8b4] mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#25d366] animate-ping" />
          <span>Active Response · Mansehra &amp; Hazara Division</span>
        </motion.div>

        {/* Section Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#f8fafc] tracking-tight mb-5"
        >
          Need Electrical or Plumbing Assistance?
        </motion.h2>

        {/* Client Copy Description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-3 mb-10"
        >
          <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed">
            Whether it is a repair, installation, maintenance requirement, or an electrical or plumbing issue that needs attention, <strong className="text-[#fae8b4]">JD Electrical &amp; Plumbing Services</strong> is ready to help.
          </p>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            Contact us today to discuss your requirements and arrange a service.
          </p>
        </motion.div>

        {/* Action Buttons: Call Now, WhatsApp Us, Request a Service */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* 1. Request a Service */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#08090d] bg-gradient-to-r from-[#fae8b4] via-[#d4af37] to-[#aa820a] hover:from-[#fff5cc] hover:to-[#b89122] border border-[#fae8b4]/70 rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#08090d]" />
            <span>Request a Service</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#08090d]" />
          </button>

          {/* 2. WhatsApp Us */}
          <a
            href="https://wa.me/923021822160?text=Hello%20JD%20Electrical%20%26%20Plumbing%20Services%2C%20I%20need%20assistance%20with%20an%20electrical%2Fplumbing%20requirement."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 text-sm font-bold text-[#f8fafc] bg-[#25d366]/20 hover:bg-[#25d366]/30 border border-[#25d366]/60 hover:border-[#25d366] rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_20px_rgba(37,211,102,0.2)]"
          >
            <MessageCircle className="w-5 h-5 text-[#25d366]" />
            <span>WhatsApp Us</span>
          </a>

          {/* 3. Call Now */}
          <a
            href="tel:03021822160"
            className="w-full sm:w-auto px-7 py-4 text-sm font-bold text-[#fae8b4] bg-[#161a26] hover:bg-[#202538] border border-[#d4af37]/50 hover:border-[#d4af37] rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span>Call Now: 0302-1822160</span>
          </a>
        </motion.div>

        {/* Quick Reference Contact Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            <span>Mon - Sat: 8:00 AM - 9:00 PM (Emergency 24/7)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#38bdf8]" />
            <span>Mansehra, Khyber Pakhtunkhwa, Pakistan</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#25d366]" />
            <span>Verified Workmanship Guaranteed</span>
          </div>
        </div>

      </div>
    </section>
  );
};
