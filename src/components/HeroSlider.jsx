import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: '/custom-app-development.webp',
    badge: 'Custom Software Solutions',
    title: 'Custom Software Development Company',
    subtitle: 'We transform your ideas into powerful software solutions that drive real results for your business.',
  },
  {
    id: 2,
    image: '/mobile-app-development.webp',
    badge: 'Mobile Applications',
    title: 'Mobile Application Development Service',
    subtitle: 'Innovative Mobile App Solutions for Your Success — Turn your ideas into reality with user-friendly, affordable, and tailored applications.',
  },
  {
    id: 3,
    image: '/digital-marketing.webp',
    badge: 'Growth & Visibility',
    title: 'Digital Marketing & SEO Services',
    subtitle: 'Unlock the full potential of your brand online with our expert Digital Marketing Services that generate qualified leads and drive revenue.',
  },
  {
    id: 4,
    image: '/it-staffing.webp',
    badge: 'Talent on Demand',
    title: 'Expert IT Staffing Solutions',
    subtitle: 'Our IT Staffing services match your exact requirements with vetted, skilled professionals, driving your business success forward.',
  },
];

const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds auto-slide

export default function HeroSlider({ onOpenEstimate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);

  // Auto slide effect
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch swipe support for mobile/tablet
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <section
      className="relative min-h-[100dvh] pt-24 sm:pt-32 lg:pt-36 pb-24 sm:pb-28 lg:pb-32 flex items-center bg-[#0e0d17] text-white overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Slides with zero blur - full resolution crisp image */}
      {SLIDES.map((s, index) => {
        const isActive = currentSlide === index;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundPosition: 'right center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* On screens below lg (below 1024px): soft background shade so text is readable if image narrows */}
            <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-[#0e0d17]/85 via-[#0e0d17]/80 to-[#0e0d17]/95" />
          </div>
        );
      })}

      {/* Main Slide Content - Balanced wide layout aligned with left margin */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 relative z-10 w-full">
        <div className="w-full lg:w-3/5 xl:w-[58%] max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-6">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{slide.badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] font-black text-white leading-[1.18] sm:leading-[1.15] tracking-tight min-h-[64px] xs:min-h-[76px] sm:min-h-[96px] flex items-center">
            <span>{slide.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm xs:text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl xl:max-w-2xl font-normal min-h-[44px] xs:min-h-[50px] sm:min-h-[56px]">
            {slide.subtitle}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-1">
            <button
              onClick={onOpenEstimate}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-4.5 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all text-xs sm:text-sm cursor-pointer"
            >
              <span>Consult Now</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <a
              href="#why-choose"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('why-choose')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#080c18]/90 hover:bg-[#131b30] border border-white/15 text-slate-200 font-semibold px-4 sm:px-4.5 py-2.5 rounded-xl hover:border-cyan-500/40 transition-all text-xs sm:text-sm backdrop-blur-md shadow-md cursor-pointer"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 sm:pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-5 text-[11px] sm:text-xs md:text-sm text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>Chennai HQ & Global Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>100% In-House Team</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>60-Day Free Support</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slider Controls (Pagination Dots + Arrows) */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-0 right-0 z-20">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 flex items-center justify-between">
          
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {SLIDES.map((s, index) => {
              const isActive = currentSlide === index;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer min-h-[32px] flex items-center ${
                    isActive
                      ? 'w-7 sm:w-8 bg-cyan-400 shadow-sm shadow-cyan-400/50'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Slide ${index + 1}: ${s.title}`}
                />
              );
            })}
            <span className="text-xs text-slate-400 font-mono pl-2 sm:pl-3 hidden sm:inline-block">
              0{currentSlide + 1} / 0{SLIDES.length}
            </span>
          </div>

          {/* Navigation Arrows with minimum 44px touch target */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 sm:p-2.5 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center rounded-xl bg-[#080c18]/85 hover:bg-[#131b30] border border-white/10 text-slate-300 hover:text-white transition cursor-pointer shadow-md backdrop-blur-md active:scale-95 hover:border-cyan-500/40"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 sm:p-2.5 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center rounded-xl bg-[#080c18]/85 hover:bg-[#131b30] border border-white/10 text-slate-300 hover:text-white transition cursor-pointer shadow-md backdrop-blur-md active:scale-95 hover:border-cyan-500/40"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
