import React from 'react';
import { ShieldCheck, Award, Wrench, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0a0c12] relative border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Founder & Heritage Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              <span>The Engineering Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Since 2018</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#f8fafc] tracking-tight leading-tight">
              Eight Years of Grounded Trust in Mansehra.
            </h2>

            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              Established in 2018 under the leadership of CEO <strong className="text-[#fae8b4]">Junaid Farooq</strong>, JD Electrical &amp; Plumbing Services was founded with a singular standard: to replace makeshift wiring and makeshift plumbing with uncompromising, certified MEP engineering.
            </p>

            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              Over 8+ years across the Mansehra valley and Hazara region, we have engineered electrical networks and hydraulic sanitary systems for hundreds of executive villas, commercial plazas, and institutions. Every project is measured against safety codes: 100% pure copper conductivity, phase-balanced distribution boards, certified earthing grounds, and hydrostatic leak-free piping.
            </p>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-[#121520] border border-[#d4af37]/20">
                <div className="w-8 h-8 rounded bg-[#1c2234] text-[#d4af37] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-sm text-[#f8fafc]">Zero-Compromise Safety</h4>
                <p className="text-xs text-[#94a3b8] mt-1">
                  We install genuine Schneider/ABB residual current breakers (RCCBs) to safeguard families from electrical shocks.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#121520] border border-[#d4af37]/20">
                <div className="w-8 h-8 rounded bg-[#1c2234] text-[#22d3ee] flex items-center justify-center mb-3">
                  <Wrench className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-sm text-[#f8fafc]">12-Bar Hydraulic Integrity</h4>
                <p className="text-xs text-[#94a3b8] mt-1">
                  All concealed PPRC and sanitary loops undergo rigorous hydrostatic pressure testing before any tile is laid.
                </p>
              </div>
            </div>

            {/* Leadership Credentials Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-sm bg-gradient-to-br from-[#1c2234] to-[#10131d] border border-[#d4af37] flex items-center justify-center font-serif-lux font-bold text-base text-[#fae8b4] shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  JF
                </div>
                <div>
                  <div className="text-[11px] text-[#94a3b8]">Chief Executive Officer (Est. 2018)</div>
                  <div className="font-display font-bold text-base text-[#fae8b4]">Junaid Farooq</div>
                  <div className="text-[11px] text-[#d4af37]">CEO &amp; Master MEP Project Lead · Mansehra</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="tel:03021822160"
                  className="px-4 py-2 rounded bg-white/5 hover:bg-[#1c2234] border border-white/10 text-xs font-semibold text-[#f8fafc] flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>0302-1822160</span>
                </a>
                <a
                  href="mailto:jaidykhan9@gmail.com"
                  className="px-4 py-2 rounded bg-white/5 hover:bg-[#1c2234] border border-white/10 text-xs font-semibold text-[#f8fafc] flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>jaidykhan9@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Visual Badge Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-8 bg-gradient-to-b from-[#161a26] to-[#0e1017] border-2 border-[#d4af37]/40 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="font-serif-lux text-5xl font-bold text-[#d4af37] tracking-widest mb-4">
                JD
              </div>

              <div className="text-xs uppercase tracking-widest text-[#fae8b4] font-bold mb-2">
                Operational Headquarters
              </div>
              <div className="font-display font-bold text-xl text-[#f8fafc] mb-4">
                Mansehra, Khyber Pakhtunkhwa, Pakistan
              </div>

              <ul className="space-y-3 text-xs text-[#94a3b8] border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Permanent dispatch vehicles covering entire Mansehra District</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Direct emergency line active 24 hours / 7 days</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Official partner for industrial and luxury villa installations</span>
                </li>
              </ul>

              <div className="mt-8 p-4 rounded bg-[#121520]/80 border border-[#d4af37]/20 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#94a3b8]">Founded</div>
                  <div className="font-mono font-bold text-sm text-[#f8fafc]">Year 2018</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <div className="text-[11px] text-[#94a3b8]">Active Service</div>
                  <div className="font-mono font-bold text-sm text-[#d4af37]">8+ Years</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <div className="text-[11px] text-[#94a3b8]">Direct Dispatch</div>
                  <div className="font-mono font-bold text-sm text-[#25d366]">WhatsApp</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
