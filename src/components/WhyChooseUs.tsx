import React from 'react';
import { motion } from 'motion/react';
import { Award, Wrench, Clock, Building2, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: 'Established Experience',
      desc: 'Serving customers since 2018, with practical experience across electrical and plumbing requirements.',
      badge: 'Est. 2018',
      color: 'text-[#d4af37]',
      border: 'border-[#d4af37]/30',
      bgGlow: 'from-[#d4af37]/10',
    },
    {
      icon: Wrench,
      title: 'Professional Workmanship',
      desc: 'We approach every job with attention to detail, careful workmanship, and a commitment to completing work properly.',
      badge: 'Quality First',
      color: 'text-[#38bdf8]',
      border: 'border-[#38bdf8]/30',
      bgGlow: 'from-[#38bdf8]/10',
    },
    {
      icon: Clock,
      title: 'Reliable Service',
      desc: 'We understand that electrical and plumbing problems can disrupt your home or business. We aim to provide responsive and practical solutions.',
      badge: 'Responsive',
      color: 'text-[#22d3ee]',
      border: 'border-[#22d3ee]/30',
      bgGlow: 'from-[#22d3ee]/10',
    },
    {
      icon: Building2,
      title: 'Residential & Commercial',
      desc: 'Our services are suitable for homes, offices, shops, rental properties, and commercial premises.',
      badge: 'All Properties',
      color: 'text-[#fae8b4]',
      border: 'border-[#fae8b4]/30',
      bgGlow: 'from-[#fae8b4]/10',
    },
    {
      icon: MessageSquare,
      title: 'Clear Communication',
      desc: 'We believe customers should understand the work being carried out. We communicate clearly about the service required and the solution provided.',
      badge: 'Transparent',
      color: 'text-[#a78bfa]',
      border: 'border-[#a78bfa]/30',
      bgGlow: 'from-[#a78bfa]/10',
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-[#090b10] relative border-t border-[#d4af37]/20 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141824] border border-[#d4af37]/40 text-xs font-semibold uppercase tracking-widest text-[#fae8b4] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#f8fafc] tracking-tight">
            Why Choose JD Electrical &amp; Plumbing Services?
          </h2>
          <p className="mt-4 text-base text-[#94a3b8] leading-relaxed">
            Reliable service, quality workmanship, and practical solutions delivered with established engineering experience since 2018.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-7 rounded-2xl bg-gradient-to-b from-[#141824]/90 to-[#0e1017]/90 border ${pillar.border} hover:border-opacity-80 transition-all duration-300 relative group overflow-hidden shadow-lg flex flex-col justify-between`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${pillar.bgGlow} to-transparent rounded-full blur-2xl pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1c2234] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${pillar.color}`} />
                    </div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#94a3b8] bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#f8fafc] group-hover:text-[#fae8b4] transition-colors mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#94a3b8] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-[#fae8b4]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Guaranteed Standards</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Our Commitment Banner Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#141724] via-[#1a2033] to-[#121522] border-2 border-[#d4af37]/50 shadow-[0_0_40px_rgba(212,175,55,0.15)] text-center max-w-4xl mx-auto overflow-hidden"
        >
          {/* Subtle Golden Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#d4af37]">
              Our Foundation &amp; Standard
            </span>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#f8fafc] tracking-tight">
              Our Commitment
            </h3>

            <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed max-w-2xl mx-auto font-normal">
              At <strong className="text-[#fae8b4] font-semibold">JD Electrical &amp; Plumbing Services</strong>, our goal is simple: to provide dependable electrical and plumbing services that customers can rely on.
            </p>

            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-2xl mx-auto">
              We combine practical experience with professional service to help keep your property operating safely and efficiently.
            </p>

            {/* Tri-Part Motto Ribbon */}
            <div className="pt-6 mt-6 border-t border-[#d4af37]/30 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base font-semibold">
              <span className="text-[#fae8b4] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                Quality service.
              </span>
              <span className="text-[#d4af37]">◆</span>
              <span className="text-[#38bdf8] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />
                Professional approach.
              </span>
              <span className="text-[#d4af37]">◆</span>
              <span className="text-[#22d3ee] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22d3ee]" />
                Reliable solutions.
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
