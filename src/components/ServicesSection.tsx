import React, { useState } from 'react';
import { Zap, Droplets, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ELECTRICAL_SERVICES, PLUMBING_SERVICES } from '../data/servicesData.ts';
import { ServiceItem } from '../types/index.ts';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'electrical' | 'plumbing'>('all');

  const displayedServices =
    activeTab === 'all'
      ? [...ELECTRICAL_SERVICES, ...PLUMBING_SERVICES]
      : activeTab === 'electrical'
      ? ELECTRICAL_SERVICES
      : PLUMBING_SERVICES;

  return (
    <section id="services" className="py-24 bg-[#0a0c12] relative border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
              <span>JD Electrical &amp; Plumbing Services</span>
              <span aria-hidden="true">·</span>
              <span>Serving Since 2018</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#f8fafc] tracking-tight">
              Our Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              {activeTab === 'electrical'
                ? 'Professional electrical services designed to keep your property safe, functional, and properly maintained.'
                : activeTab === 'plumbing'
                ? 'Reliable plumbing solutions for repairs, installations, maintenance, and common plumbing problems.'
                : 'Professional electrical and plumbing services designed to keep your property safe, functional, and properly maintained with reliable solutions.'}
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="mt-6 md:mt-0 flex items-center p-1 bg-[#121520] rounded-xl border border-[#d4af37]/35 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#1c2234] text-[#fae8b4] shadow-sm border border-[#d4af37]/40'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              All Services ({ELECTRICAL_SERVICES.length + PLUMBING_SERVICES.length})
            </button>
            <button
              onClick={() => setActiveTab('electrical')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'electrical'
                  ? 'bg-[#0f2c42] text-[#38bdf8] shadow-sm border border-[#0284c7]/50'
                  : 'text-[#94a3b8] hover:text-[#38bdf8]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Electrical Services ({ELECTRICAL_SERVICES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('plumbing')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'plumbing'
                  ? 'bg-[#0d343c] text-[#22d3ee] shadow-sm border border-[#0891b2]/50'
                  : 'text-[#94a3b8] hover:text-[#22d3ee]'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>Plumbing Services ({PLUMBING_SERVICES.length})</span>
            </button>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayedServices.map((service, index) => {
            const isElectrical = service.category === 'electrical' || service.category === 'emergency';
            const accentBorder = isElectrical
              ? 'hover:border-[#38bdf8]/50 group-hover:shadow-[0_8px_30px_rgba(2,132,199,0.15)]'
              : 'hover:border-[#22d3ee]/50 group-hover:shadow-[0_8px_30px_rgba(8,145,178,0.15)]';
            
            return (
              <div
                key={service.id}
                className={`luxury-card rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${accentBorder}`}
              >
                {/* Visual Header Image if available */}
                {service.image && (
                  <div className="mb-6 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 h-48 overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center filter brightness-[0.75] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-transparent to-transparent" />
                  </div>
                )}

                <div>
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center gap-2 text-xs text-[#94a3b8] mb-2.5">
                    <span className={isElectrical ? 'text-[#38bdf8] font-semibold' : 'text-[#22d3ee] font-semibold'}>
                      {service.tag}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Starting {service.startingPrice}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#f8fafc] group-hover:text-[#fae8b4] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Engineering Specifications List */}
                  <ul className="mt-5 space-y-2 pt-4 border-t border-white/5">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#cbd5e1]">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isElectrical ? 'text-[#38bdf8]' : 'text-[#22d3ee]'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                  <div className="text-xs text-[#94a3b8]">
                    <span className="font-mono text-[#fae8b4] font-semibold tabular-nums">{service.startingPrice}</span>
                    <span className="ml-1 text-[11px] text-[#64748b]">base inspection &amp; rigging</span>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#f8fafc] bg-white/5 hover:bg-[#d4af37] hover:text-[#08090d] border border-white/10 hover:border-[#d4af37] rounded transition-all cursor-pointer font-medium"
                  >
                    <span>Request Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
