import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck } from 'lucide-react';

export const LuxuryHeadline: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none py-3">
      {/* Background Volumetric Glow & Light Spotlights */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Warm Golden Core Radiance */}
        <div className="w-[580px] h-[190px] bg-gradient-to-r from-[#d4af37]/20 via-[#fae8b4]/25 to-[#38bdf8]/15 blur-[90px] rounded-full animate-pulse" />
        
        {/* Subtle Horizontal Light Streak */}
        <div className="absolute w-[85%] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent top-1/2 -translate-y-1/2" />
      </div>

      {/* Floating Micro-Light Sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.5 }}
            animate={{
              opacity: [0, 0.75, 0],
              y: [-10, -50],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
            style={{
              left: `${12 + i * 15}%`,
              top: `${50 + (i % 3) * 15}%`,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#fae8b4] shadow-[0_0_10px_#ffd700]"
          />
        ))}
      </div>

      {/* Main Luxury Cinematic Headline */}
      <div className="relative z-10 text-center space-y-3">
        {/* Title: JD Electrical & Plumbing Services */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1 font-serif-lux font-black">
          {/* "JD Electrical &" in Pure 24K Liquid Gold */}
          <motion.span
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center group relative"
          >
            <span className="relative z-10 bg-gradient-to-r from-[#fae8b4] via-[#ffd700] via-[#fff7d6] via-[#d4af37] to-[#fae8b4] bg-[length:300%_auto] animate-powering-flow bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(212,175,55,0.6)]">
              JD Electrical &amp;
            </span>

            {/* Electric Spark Icon Pulsing with Living Energy */}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                filter: [
                  'drop-shadow(0 0 6px rgba(212,175,55,0.8))',
                  'drop-shadow(0 0 20px rgba(56,189,248,0.95))',
                  'drop-shadow(0 0 6px rgba(212,175,55,0.8))',
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block ml-1 text-[#ffd700] align-middle"
            >
              <Zap className="w-5 h-5 sm:w-7 sm:h-7 fill-[#ffd700] text-[#38bdf8]" />
            </motion.span>

            {/* Golden Sheen Sweep Overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer-ltr pointer-events-none mix-blend-overlay" />
          </motion.span>

          {/* "Plumbing Services" in Electric Hydraulic Sapphire & Champagne */}
          <motion.span
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center font-serif-lux font-black relative"
          >
            <span className="bg-gradient-to-r from-[#e0f2fe] via-[#7dd3fc] via-[#38bdf8] to-[#0284c7] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(56,189,248,0.5)]">
              Plumbing Services
            </span>
          </motion.span>
        </h1>

        {/* Sub-Headline: Professional Electrical & Plumbing Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-[#fae8b4] tracking-normal"
        >
          Professional Electrical &amp; Plumbing Solutions
        </motion.div>

        {/* Slogan: Reliable service. Quality workmanship. Practical solutions. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm md:text-base font-medium tracking-wide text-[#cbd5e1] flex items-center justify-center gap-2 flex-wrap"
        >
          <span className="text-[#fae8b4]">Reliable service.</span>
          <span className="text-[#d4af37]">◆</span>
          <span className="text-[#38bdf8]">Quality workmanship.</span>
          <span className="text-[#d4af37]">◆</span>
          <span className="text-[#22d3ee]">Practical solutions.</span>
        </motion.div>
      </div>

      {/* Subtle Heritage Underline Accent */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        className="w-40 sm:w-64 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-4"
      />
    </div>
  );
};
