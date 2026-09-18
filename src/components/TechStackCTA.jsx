import React from 'react';
import { TECH_STACK } from '../data/creatahContent';
import { Sparkles, ArrowRight, Code, Cpu } from 'lucide-react';

export default function TechStackCTA({ onOpenEstimate }) {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-slate-950 text-white relative overflow-hidden border-y border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 relative z-10">
        
        {/* Technologies Badges Bar */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-cyan-400">
            Powered By Modern & Robust Tech Stacks
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 max-w-4xl mx-auto">
            {TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-[11px] sm:text-xs font-bold text-slate-300 hover:text-white transition-all cursor-default shadow-sm"
              >
                {tech.name} <span className="text-slate-500 font-normal">({tech.category})</span>
              </span>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/70 to-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-center max-w-4xl mx-auto shadow-2xl space-y-4 sm:space-y-6">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Transform Your Business Today!
          </h2>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Book Your First Presentation with Our Business & Technical Experts. Discover how we can architect, build, and scale your product.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
            <a
              href="#contactForm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5 text-sm sm:text-base min-h-[44px] cursor-pointer"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            <button
              onClick={onOpenEstimate}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-slate-700 hover:border-slate-500 transition-all text-sm sm:text-base min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Estimate Project Cost</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
