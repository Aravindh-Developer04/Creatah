import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/creatahContent';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="inline-block px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-amber-50 text-amber-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Client Experiences
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            What Our Clients Actually Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            Unfiltered feedback from founders, diagnostic heads, and operations leaders who trusted us with their core technology.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {TESTIMONIALS.map((review, i) => (
            <div
              key={i}
              className="bg-slate-50 hover:bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-slate-200 group-hover:text-blue-200 transition-colors absolute right-4 sm:right-6 top-4 sm:top-6 pointer-events-none" />

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4 sm:mb-5">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <blockquote className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-6 italic">
                  "{review.quote}"
                </blockquote>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-slate-900 text-sm sm:text-base">
                    {review.author}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    {review.company}
                  </p>
                </div>
                <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Verified Client
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
