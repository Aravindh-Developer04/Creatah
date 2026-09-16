import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Users,
  Target,
  Award,
  Zap,
  Building2,
  Code2,
  Globe2,
  Quote,
  Star,
  MessageCircle,
} from 'lucide-react';

const STATS = [
  { value: '540+', label: 'Projects Delivered', sub: 'Across 18+ industry domains' },
  { value: '10+', label: 'Years of Craft', sub: 'Serving Chennai & global leaders' },
  { value: '70%+', label: 'Repeat Client Rate', sub: 'Long-term trusted partnerships' },
  { value: '100%', label: 'In-House Engineers', sub: 'Zero third-party outsourcing' },
];

const CLIENT_LOGOS = [
  { name: 'Verse Tech', file: '/brand-logo/verse.webp' },
  { name: 'BMEG Group', file: '/brand-logo/bmeg.webp' },
  { name: 'Dartexon Logistics', file: '/brand-logo/dartexon.webp' },
  { name: 'MyRMC Ready-Mix', file: '/brand-logo/myrmc.webp' },
  { name: 'Nannir Diagnostic', file: '/brand-logo/nannir.webp' },
  { name: 'Sakthi Cars', file: '/brand-logo/sakthicars.webp' },
];

const PILLARS = [
  {
    number: '01',
    title: 'We Understand Before We Build',
    description:
      'We dive deep into your business model, operational bottlenecks, and competitive landscape before writing code. We produce a comprehensive SRS and architectural blueprint so there are zero surprises.',
    icon: Target,
    tag: 'Discovery & Architecture',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    number: '02',
    title: 'Proven Across Demanding Industries',
    description:
      'From mission-critical diagnostic reporting portals in Chennai to high-frequency logistics tracking across South India and pan-India retail platforms, our software operates reliably under heavy loads.',
    icon: Building2,
    tag: 'Domain Expertise',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  {
    number: '03',
    title: 'One Dedicated In-House Team',
    description:
      'Every developer, UI/UX designer, and QA engineer working on your product is a full-time, vetted Creatah employee under one roof in Chennai. No revolving doors of unknown freelancers.',
    icon: Users,
    tag: 'Full Accountability',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    number: '04',
    title: 'Engineered for 10x Scalability',
    description:
      'We architect software systems to handle exponential user growth, peak festival traffic, and complex third-party API integrations without stuttering, security leaks, or costly rewrites.',
    icon: Zap,
    tag: 'Enterprise Architecture',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
];

const CORE_VALUES = [
  {
    title: 'Radical Transparency',
    desc: 'You get full access to sprint boards, weekly demo builds, and direct communication with developers. No middlemen, no smoke and mirrors.',
    icon: Globe2,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    title: 'Fixed Scoping & Honest Pricing',
    desc: 'We define the scope rigorously upfront. If we underestimate, we absorb the cost. We never surprise you with hidden fees or bill shock.',
    icon: ShieldCheck,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    title: '100% Client Code Ownership',
    desc: 'From day one, all repositories, intellectual property, design source files, and database schemas belong entirely and legally to your business.',
    icon: Code2,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  {
    title: '60-Day Free Post-Launch Warranty',
    desc: 'Every production release is protected by 60 days of complimentary bug fixing, performance tuning, and technical guidance.',
    icon: Clock,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Creatah built our diagnostic portal from scratch in 14 weeks. Patient test reports are processed seamlessly, and our turnaround time improved by 40%.',
    author: 'Naveen Raj',
    role: 'Managing Director, Diagnostic Center',
    location: 'Chennai, Tamil Nadu',
  },
  {
    quote:
      'Our logistics tracking app needed to work in low-connectivity areas across South India. Creatah’s engineering team delivered a rock-solid solution that our drivers love.',
    author: 'Suresh Kumar',
    role: 'Operations Head, Supply Chain & Fleet',
    location: 'Coimbatore, Tamil Nadu',
  },
  {
    quote:
      'Working with Creatah felt like having our own CTO and senior engineering department next door. Their attention to UX and performance is unmatched.',
    author: 'Nisha R.',
    role: 'Founder, Retail D2C Brand',
    location: 'Bangalore, Karnataka',
  },
];

export default function AboutUsPage({ onNavigateHome, onNavigateToProposal }) {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#f8fafc] text-slate-900 min-h-screen">
      
      {/* Top Breadcrumb & 2-Column Hero Showcase */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-blue-600 transition flex items-center gap-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-blue-600 font-bold">About Us</span>
        </nav>

        {/* 2-Column Hero: Left Text & CTAs, Right 3D Team Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Chennai Headquarters • 10+ Years of Craftsmanship</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.2]">
              Pioneering Custom Software Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">From Chennai to the World</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              For over a decade, Creatah Software Technologies has been building bespoke web applications, mobile platforms, enterprise cloud systems, and performance digital strategies for ambitious businesses that prioritize longevity, scalability, and craftsmanship.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToProposal}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/25 hover:shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="#contact-us"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '#contact-us';
                }}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl transition text-xs sm:text-sm shadow-sm"
              >
                <span>Contact Our Desk</span>
              </a>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-y-2 gap-x-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% In-House Team</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full Code & IP Ownership</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fixed-Price Scoping</span>
              </div>
            </div>
          </div>

          {/* Right 3D Team Illustration Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 border border-blue-100 shadow-xl shadow-blue-500/5 p-4 sm:p-5 relative overflow-hidden group">
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
                <img
                  src="/about-team-3d.jpg"
                  alt="Creatah Software Engineering Team"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Status Badges */}
              <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-blue-100 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Dedicated In-House Engineers</span>
                </div>
                <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Velachery, Chennai
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Stats Grid (Crisp White Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 pt-8 border-t border-slate-200">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition group"
            >
              <div className="text-2xl xs:text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1 group-hover:scale-105 transition-transform">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">
                {s.label}
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">{s.sub}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Trusted By Client Brands Strip */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Trusted By Growing Companies & Established Brands
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 items-center">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.name}
                className="p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-white hover:border-slate-200 transition"
                title={client.name}
              >
                <img
                  src={client.file}
                  alt={client.name}
                  className="h-6 sm:h-8 w-auto max-w-[100px] object-contain opacity-75 hover:opacity-100 transition grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Story & Philosophy */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <span>Our Roots & Philosophy</span>
            </div>

            <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              We Don&apos;t Just Ship Code. We Build Sustainable Competitive Advantages.
            </h2>

            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p>
                Founded in Chennai, India, Creatah was built to eliminate the common frustration businesses face with traditional agencies: over-promising sales pitches, subcontracted unknown developers, and brittle codebases that break under production traffic.
              </p>
              <p>
                We took a different stand: 100% full-time, in-house engineers working collaboratively under one roof. When you partner with Creatah, you speak directly with system architects and engineers who understand your domain logic, database schemas, and business targets.
              </p>
              <p>
                Whether you need high-frequency IoT telemetry, multi-tenant B2B SaaS, or high-conversion mobile apps, our focus remains on long-term code quality, security, and measurable performance.
              </p>
            </div>
          </div>

          {/* Highlight The Creatah Oath Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-50 via-white to-indigo-50/70 border border-blue-200/80 p-6 sm:p-8 shadow-md shadow-blue-500/5 space-y-4">
              <Quote className="w-10 h-10 text-blue-600/20 absolute top-5 right-5 pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
                <span>The Creatah Oath</span>
              </div>

              <blockquote className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed italic relative z-10">
                &ldquo;We&apos;re not the cheapest option in Chennai. We&apos;re not going to pretend otherwise. But for businesses that are serious about building something that lasts, scales effortlessly, and drives real revenue — we&apos;re the right team.&rdquo;
              </blockquote>

              <div className="pt-3 border-t border-blue-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Creatah Engineering Leadership</div>
                  <div className="text-xs text-slate-500">Velachery, Chennai HQ</div>
                </div>
                <img
                  src="/creatah-emblem.jpg"
                  alt="Creatah Emblem"
                  className="w-9 h-9 rounded-full shadow-sm border border-white"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            How We Are Different
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The Four Pillars of Creatah Engineering
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Why visionary founders and enterprise businesses partner with our team for critical initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm ${p.color} group-hover:scale-105 transition`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 group-hover:text-blue-600 transition font-mono">
                    {p.number}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="inline-block text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {p.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Values Strip */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Guiding Principles
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Our Commitments to Every Client
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              We stand firmly behind every line of code we write and every system we deploy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${val.color} border shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{val.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Client Testimonials Spotlight */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Real Client Experiences
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trusted by Business Leaders Across South India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
                <div className="text-[11px] text-blue-600 font-semibold mt-0.5">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-8 sm:p-10 shadow-xl shadow-blue-600/25 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to Discuss Your Project with Our Tech Team?
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Get an architectural roadmap, technology stack recommendations, and fixed-price quotation within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToProposal}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md shadow-blue-900/20 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Request a Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateHome}
              className="px-4.5 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm border border-blue-400/40 transition cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
