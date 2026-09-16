import React from 'react';
import { WHY_CHOOSE_CREATAH } from '../data/creatahContent';
import { MessageSquare, Briefcase, Users, TrendingUp, Quote } from 'lucide-react';

const iconMap = {
  MessageSquare,
  Briefcase,
  Users,
  TrendingUp,
};

export default function WhyChooseCreatah() {
  return (
    <section id="why-choose" className="py-14 sm:py-20 md:py-28 bg-white">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="inline-block px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Why Choose Creatah?
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Why Businesses Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Creatah
            </span>{' '}
            Over Every Other Software Company
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Most software projects fail not because of bad code, but because the wrong questions were asked at the start. At <strong>Creatah</strong>, we’ve seen that pattern enough times to build our entire process around fixing it.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {WHY_CHOOSE_CREATAH.map((item, idx) => {
            const Icon = iconMap[item.icon] || MessageSquare;
            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 sm:mb-4 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Authentic Quote Box Callout */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <Quote className="w-16 h-16 sm:w-20 sm:h-20 text-blue-500/15 absolute right-4 sm:right-6 bottom-3 sm:bottom-4 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-3">
            <h4 className="text-lg sm:text-xl md:text-2xl font-black text-cyan-300 leading-snug italic">
              "We're not the cheapest option in Chennai. We're not going to pretend otherwise."
            </h4>
            <p className="text-slate-300 text-xs sm:text-base md:text-lg leading-relaxed">
              But for businesses that are serious about building something that lasts, something that grows with them, not against them, we're the right call.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
