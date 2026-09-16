import React from 'react';
import { MARQUEE_STATS } from '../data/creatahContent';

export default function HeroMarquee() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 text-white py-3 sm:py-4 overflow-hidden border-y border-blue-800/60 select-none">
      <div className="flex items-center space-x-6 sm:space-x-8 whitespace-nowrap animate-marquee">
        {[...MARQUEE_STATS, ...MARQUEE_STATS, ...MARQUEE_STATS].map((stat, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-2xl font-black text-cyan-300">
              {stat.value}
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-200 tracking-wide uppercase">
              {stat.label}
            </span>
            <span className="text-cyan-400 font-bold mx-2 sm:mx-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
