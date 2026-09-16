import React from 'react';
import { DEV_PROCESS } from '../data/creatahContent';
import { Search, PenTool, Code, CheckCircle, ShieldCheck } from 'lucide-react';

const icons = [Search, PenTool, Code, CheckCircle, ShieldCheck];

export default function DevelopmentProcess() {
  return (
    <section id="process" className="py-14 sm:py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="inline-block px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Clear Milestones
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our Development Process
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            A battle-tested 5-phase delivery model ensuring predictable budgets, bi-weekly deliverables, and zero launch surprises.
          </p>
        </div>

        {/* Process Steps Timeline */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {DEV_PROCESS.map((p, idx) => {
            const Icon = icons[idx] || Search;
            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>

                <div className="flex-1">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-blue-600">
                    {p.step}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
