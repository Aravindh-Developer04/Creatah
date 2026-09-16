import React from 'react';
import { INDUSTRIES } from '../data/creatahContent';
import {
  Factory,
  HeartPulse,
  Share2,
  Film,
  Plane,
  Sparkles,
  Utensils,
  ShoppingCart,
  Cloud,
  Landmark,
  Leaf,
  Building,
  GraduationCap,
  Newspaper,
  Truck,
  Tractor,
  Bot,
  Cpu,
} from 'lucide-react';

const iconMap = {
  Factory,
  HeartPulse,
  Share2,
  Film,
  Plane,
  Sparkles,
  Utensils,
  ShoppingCart,
  Cloud,
  Landmark,
  Leaf,
  Building,
  GraduationCap,
  Newspaper,
  Truck,
  Tractor,
  Bot,
  Cpu,
};

export default function Industries() {
  return (
    <section id="industries" className="py-14 sm:py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="inline-block px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Domain Expertise
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Industries We’ve Actually Worked In
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            We’ve delivered software solutions for businesses across Chennai, Tamil Nadu, and South India in industries where getting it wrong has real consequences.
          </p>
        </div>

        {/* 18 Industries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {INDUSTRIES.map((ind) => {
            const Icon = iconMap[ind.icon] || Factory;
            return (
              <div
                key={ind.name}
                className="bg-slate-50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200 hover:border-transparent transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white group-hover:bg-white/20 flex items-center justify-center text-blue-600 group-hover:text-white shadow-sm mb-2 sm:mb-3 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 group-hover:text-white transition-colors line-clamp-2">
                  {ind.name}
                </h4>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
