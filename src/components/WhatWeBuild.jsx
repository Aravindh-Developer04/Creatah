import React from 'react';
import {
  Code2,
  Smartphone,
  Globe,
  TrendingUp,
  UserCheck,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';

// Custom icons for Android and Apple
function AndroidIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.411 13.8533 8.1 12 8.1s-3.5902.311-5.1367.8497L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
    </svg>
  );
}

function AppleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.56.65-1.05 1.71-.92 2.74 1.01.08 2.02-.49 2.64-1.24z" />
    </svg>
  );
}

const CARDS_DATA = [
  {
    id: '01',
    title: 'Custom Software Development',
    description:
      'We build bespoke platforms, CRMs, ERPs, SaaS products, and workflow tools on React, Node.js, Python, and modern cloud infrastructure.',
    icon: Code2,
    iconBg: 'bg-blue-50 text-blue-600 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600',
    lineGradient: 'from-blue-600 via-indigo-600 to-cyan-400',
    tags: ['Bespoke SaaS', 'CRMs & ERPs', 'Cloud Architecture'],
    link: '#contactForm',
  },
  {
    id: '02',
    title: 'Mobile App Development',
    description:
      'Android and iOS applications built to be fast, reliable, intuitive, and scalable for startups and enterprise businesses.',
    icon: Smartphone,
    iconBg: 'bg-cyan-50 text-cyan-600 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600',
    lineGradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    tags: ['iOS & Android', 'Enterprise Grade', 'Fast & Reliable'],
    link: '#contactForm',
  },
  {
    id: '03',
    title: 'Android App Development',
    description:
      'Native Android apps using Kotlin with responsive UI/UX, API integration, Play Store deployment, and continuous maintenance.',
    icon: AndroidIcon,
    iconBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-600',
    lineGradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    tags: ['Kotlin Native', 'Play Store Deploy', 'REST APIs'],
    link: '#contactForm',
  },
  {
    id: '04',
    title: 'iOS App Development',
    description:
      'Swift-powered iPhone applications with Apple Pay, HealthKit, ARKit, and strict App Store guidelines compliance.',
    icon: AppleIcon,
    iconBg: 'bg-slate-100 text-slate-800 group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-950',
    lineGradient: 'from-slate-700 via-slate-800 to-slate-950',
    tags: ['Swift Native', 'Apple Pay', 'App Store Guidelines'],
    link: '#contactForm',
  },
  {
    id: '05',
    title: 'Flutter App Development',
    description:
      'Cross-platform Flutter applications that dramatically reduce development cost while maintaining native 60fps performance.',
    icon: Layers,
    iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-blue-600',
    lineGradient: 'from-sky-400 via-blue-500 to-indigo-600',
    tags: ['Single Codebase', '60 FPS Native', 'Cost-Effective'],
    link: '#contactForm',
  },
  {
    id: '06',
    title: 'Web Development',
    description:
      'React, Next.js, Angular, PHP, and Laravel web applications optimized for speed, security, responsiveness, and top-tier SEO.',
    icon: Globe,
    iconBg: 'bg-indigo-50 text-indigo-600 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600',
    lineGradient: 'from-indigo-600 via-purple-600 to-pink-500',
    tags: ['React & Next.js', 'Laravel & PHP', 'SEO Optimized'],
    link: '#contactForm',
  },
  {
    id: '07',
    title: 'Digital Marketing & SEO',
    description:
      'Data-driven SEO, Google Ads PPC, social media marketing, and conversion-focused strategies that consistently generate qualified B2B/B2C leads.',
    icon: TrendingUp,
    iconBg: 'bg-amber-50 text-amber-600 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-600',
    lineGradient: 'from-amber-400 via-orange-500 to-rose-500',
    tags: ['Rank #1 Google', 'PPC Ads', 'Qualified B2B Leads'],
    link: '#contactForm',
  },
  {
    id: '08',
    title: 'IT Staffing Services',
    description:
      'Hire vetted, experienced developers, QA engineers, DevOps leads, and technology consultants on flexible dedicated engagement models.',
    icon: UserCheck,
    iconBg: 'bg-purple-50 text-purple-600 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600',
    lineGradient: 'from-purple-600 via-indigo-600 to-blue-600',
    tags: ['Vetted Engineers', 'Dedicated Teams', 'Flexible Scaling'],
    link: '#contactForm',
  },
];

export default function WhatWeBuild() {
  return (
    <section id="services" className="py-14 sm:py-20 md:py-28 bg-slate-50/70 border-t border-slate-200 relative overflow-hidden">
      {/* Background ambient lighting accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Our Core Capabilities</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            What We Build and Do
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            End-to-end software development and digital marketing services, delivered by one team from discovery to launch. Serving businesses across Chennai, Tamil Nadu, and South India.
          </p>
        </div>

        {/* 8 Attractive Cards Grid with Distinctive Bottom Accent Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {CARDS_DATA.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-400/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Top Row: Icon and Number Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:shadow-lg shadow-sm ${card.iconBg}`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 transition-colors" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-blue-600 transition-colors bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                      {card.id}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 font-normal">
                    {card.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                    {card.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg group-hover:border-blue-100 group-hover:text-slate-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Explore More Link */}
                <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between mt-1 min-h-[44px]">
                  <a
                    href={card.link}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 group-hover:text-indigo-600 transition-colors py-1.5"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </a>
                  <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" />
                </div>

                {/* Prominent Bottom Accent Line under the card */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.lineGradient} group-hover:h-2.5 transition-all duration-300`}
                />

                {/* Subtle bottom glow effect on hover */}
                <div
                  className={`absolute -bottom-1 left-4 right-4 h-2 bg-gradient-to-r ${card.lineGradient} blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
