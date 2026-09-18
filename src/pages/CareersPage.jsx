import React, { useState, useRef } from 'react';
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Clock,
  DollarSign,
  GraduationCap,
  HeartHandshake,
  Coffee,
  Laptop,
  UploadCloud,
  FileText,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  HelpCircle,
  Award,
  Zap,
  Send,
  Users,
  Building2,
  Calendar,
} from 'lucide-react';
import { COUNTRY_CODES } from '../data/countryCodes';

const OPEN_ROLES = [
  {
    id: 'frontend-sr',
    title: 'Senior React & Next.js Frontend Developer',
    department: 'Engineering',
    type: 'Full-Time',
    experience: '3 - 5 Years',
    location: 'Velachery, Chennai',
    summary:
      'Lead modern frontend architecture for enterprise-grade SaaS platforms, customer portals, and high-performance SPAs using React 19, Next.js 14, and Tailwind CSS.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'REST API'],
    highlights: [
      'Architect robust component libraries and micro-frontends',
      'Optimize Web Vitals (LCP < 1.8s, INP < 150ms)',
      'Collaborate directly with UI/UX designers and Node backend architects',
    ],
  },
  {
    id: 'mobile-flutter',
    title: 'Flutter Mobile Application Engineer',
    department: 'Engineering',
    type: 'Full-Time',
    experience: '2 - 4 Years',
    location: 'Velachery, Chennai',
    summary:
      'Build silky-smooth 60fps iOS and Android cross-platform mobile apps for healthcare, logistics, and fintech clients with deep native hardware integration.',
    tags: ['Flutter', 'Dart', 'BLoC / Riverpod', 'Firebase', 'Native Channels', 'App Store CI/CD'],
    highlights: [
      'Publish production apps to Google Play Store & Apple App Store',
      'Integrate payment gateways, push notifications, and GPS tracking',
      'Ensure high offline-first data caching and rock-solid crash rates (<0.1%)',
    ],
  },
  {
    id: 'backend-node',
    title: 'Node.js & Cloud Backend Architect',
    department: 'Engineering',
    type: 'Full-Time',
    experience: '4 - 6 Years',
    location: 'Velachery, Chennai',
    summary:
      'Design high-throughput RESTful and GraphQL APIs, distributed database schemas, and auto-scaling microservices deployed across AWS and Docker.',
    tags: ['Node.js', 'Express / NestJS', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS'],
    highlights: [
      'Design secure RBAC authentication, JWT session management, and caching',
      'Maintain 99.9% uptime SLA for multi-tenant enterprise clients',
      'Implement automated database migrations and CI/CD deployment pipelines',
    ],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Product Designer (Figma)',
    department: 'Design & UX',
    type: 'Full-Time',
    experience: '2 - 4 Years',
    location: 'Velachery, Chennai',
    summary:
      'Craft intuitive, accessible, and delightful digital user interfaces, interactive Figma wireframes, and scalable design systems for global B2B and consumer web/mobile apps.',
    tags: ['Figma', 'Design Systems', 'Wireframing', 'User Research', 'Prototyping', 'WCAG A11y'],
    highlights: [
      'Create high-fidelity interactive prototypes and design tokens',
      'Conduct customer usability interviews and heuristic evaluations',
      'Work closely with engineers to ensure 100% pixel-perfect implementation',
    ],
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Performance Growth Specialist',
    department: 'Digital Marketing',
    type: 'Full-Time',
    experience: '3 - 5 Years',
    location: 'Velachery, Chennai',
    summary:
      'Drive data-led organic search visibility, high-ROI Google Ads PPC campaigns, and conversion rate optimization (CRO) for client businesses across India & overseas.',
    tags: ['Technical SEO', 'Google Ads (PPC)', 'Meta Ads', 'GA4 & GTM', 'Semrush', 'CRO'],
    highlights: [
      'Perform in-depth technical on-page, off-page, and schema markup audits',
      'Scale profitable multi-channel advertising funnels with measurable ROI',
      'Deliver monthly transparent attribution reporting to client leadership',
    ],
  },
  {
    id: 'qa-engineer',
    title: 'QA Automation & Performance Engineer',
    department: 'Quality Assurance',
    type: 'Full-Time',
    experience: '2 - 4 Years',
    location: 'Velachery, Chennai',
    summary:
      'Own product reliability by building automated end-to-end regression suites, load testing pipelines, and API validation tests for web and mobile platforms.',
    tags: ['Playwright / Cypress', 'Jest', 'Postman', 'JMeter', 'Selenium', 'CI/CD Pipelines'],
    highlights: [
      'Automate functional and regression test coverage across all major browsers',
      'Execute load, stress, and security vulnerability scans prior to deployment',
      'Collaborate with developers in agile 2-week sprint retrospectives',
    ],
  },
];

const PERKS = [
  {
    icon: DollarSign,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    title: 'Competitive Compensation',
    desc: 'Top-tier industry salaries with performance-linked annual bonuses, transparent appraisals, and zero salary delays.',
  },
  {
    icon: Laptop,
    color: 'text-blue-600 bg-blue-50 border-blue-100',
    title: 'Modern Workstation & Gear',
    desc: 'Work with latest M-series Apple silicon or high-spec custom rigs with dual monitors and ergonomic Herman Miller chairs.',
  },
  {
    icon: GraduationCap,
    color: 'text-purple-600 bg-purple-50 border-purple-100',
    title: 'Learning & Certification Fund',
    desc: 'Annual education stipend for Udemy/Coursera courses, AWS/GCP technical certifications, and tech conference tickets.',
  },
  {
    icon: HeartHandshake,
    color: 'text-rose-600 bg-rose-50 border-rose-100',
    title: 'Comprehensive Health Cover',
    desc: 'Medical insurance cover for you and your dependents, annual executive health checkups, and wellness benefits.',
  },
  {
    icon: Coffee,
    color: 'text-amber-600 bg-amber-50 border-amber-100',
    title: 'Vibrant Chennai Tech Hub',
    desc: 'Prime Velachery office location with pantry, gourmet coffee, gaming station, team lunches, and annual corporate retreats.',
  },
  {
    icon: Sparkles,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    title: 'Zero Micromanagement',
    desc: 'Autonomous engineering culture that values quality code, clear ownership, flexible working hours, and genuine work-life balance.',
  },
];

const HIRING_STEPS = [
  {
    step: '01',
    title: 'Resume & Portfolio Review',
    time: 'Within 24 - 48 Hours',
    desc: 'Our technical recruiting team carefully reviews your resume, GitHub repositories, or design portfolio against open project roles.',
  },
  {
    step: '02',
    title: 'Technical Discussion & Code Review',
    time: '45 - 60 Minutes',
    desc: 'A friendly conversation with senior engineers discussing real-world architecture, problem-solving, and practical code examples.',
  },
  {
    step: '03',
    title: 'Culture Fit & Leadership Chat',
    time: '30 Minutes',
    desc: 'Meet your future team lead and directors to discuss values, career growth goals, mentorship, and expectations.',
  },
  {
    step: '04',
    title: 'Formal Offer & Welcome',
    time: 'Same Day Decision',
    desc: 'Transparent offer letter with breakdown of benefits, official joining date, and personalized welcome kit dispatch.',
  },
];

const FAQS = [
  {
    q: 'Where is the Creatah office located in Chennai?',
    a: 'Our primary engineering and design facility is located in Velachery, Chennai, Tamil Nadu — centrally positioned with convenient access to MRTS rail, bus depots, and major transit routes.',
  },
  {
    q: 'What is the work model (In-Office, Remote, or Hybrid)?',
    a: 'We operate primarily on an in-office and flexible hybrid model for Chennai-based candidates to encourage high-energy collaborative whiteboarding, pair programming, and team bonding.',
  },
  {
    q: 'Can freshers or final-year engineering students apply?',
    a: 'Yes! We actively nurture passionate self-taught developers, competitive programmers, and fresh graduates who have demonstrable hobby projects, GitHub repositories, or live deployed web apps.',
  },
  {
    q: 'How fast will I hear back after applying?',
    a: 'Every application submitted through our direct careers form is acknowledged immediately, and our hiring team provides feedback or an interview schedule within 24 to 48 business hours.',
  },
  {
    q: 'Does Creatah offer internship opportunities?',
    a: 'Yes, we provide 3-month and 6-month paid engineering internships with potential for full-time pre-placement offers (PPO) based on performance and project contributions.',
  },
];

export default function CareersPage({ onNavigateHome, onNavigateToProposal }) {
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [selectedRoleForForm, setSelectedRoleForForm] = useState(OPEN_ROLES[0].title);
  
  // Application Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // India (+91)
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [experience, setExperience] = useState('1-3 Years');
  const [noticePeriod, setNoticePeriod] = useState('Immediate / < 15 Days');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const fileInputRef = useRef(null);
  const formSectionRef = useRef(null);

  const departments = ['All', 'Engineering', 'Design & UX', 'Digital Marketing', 'Quality Assurance'];

  const filteredRoles =
    activeDepartment === 'All'
      ? OPEN_ROLES
      : OPEN_ROLES.filter((r) => r.department === activeDepartment);

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, selectedCountry.digits);
    setPhone(val);
    if (val.length > 0 && val.length < selectedCountry.digits) {
      setPhoneError(`Must be exactly ${selectedCountry.digits} digits`);
    } else {
      setPhoneError('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please upload a smaller resume.');
        return;
      }
      setAttachedFile(file);
    }
  };

  const handleApplyClick = (roleTitle) => {
    setSelectedRoleForForm(roleTitle);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (phone.length !== selectedCountry.digits) {
      setPhoneError(`Must be exactly ${selectedCountry.digits} digits`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPortfolioUrl('');
    setCoverNote('');
    setAttachedFile(null);
    setPhoneError('');
    setSubmitted(false);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pt-20 sm:pt-24 pb-16">
      
      {/* 1. Breadcrumbs Strip */}
      <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-sm sticky top-[68px] z-30">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={onNavigateHome}
              className="hover:text-blue-600 transition flex items-center gap-1 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-semibold">Careers at Creatah</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>6 Roles Actively Hiring in Chennai</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 space-y-12 sm:space-y-16 mt-6 sm:mt-8">
        
        {/* 2. Hero Section (2-Column with 3D Pixar Illustration) */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/50 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>JOIN OUR CHENNAI ENGINEERING TEAM</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.2]">
                Build Great Software That Matters.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                  Accelerate Your Career.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                We're a team of craftsmen, engineers, and digital innovators in Velachery, Chennai. We design, code, and deploy mission-critical mobile platforms and scalable web products for startups and enterprises worldwide.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#open-roles"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>View 6 Open Positions</span>
                </a>
                <button
                  onClick={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition cursor-pointer"
                >
                  <Send className="w-4 h-4 text-slate-600" />
                  <span>Quick Job Application Form</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% In-House Team</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2x Annual Appraisals</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero Micromanagement</span>
                </div>
              </div>
            </div>

            {/* Right 3D Visual Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px]">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-blue-50/50 to-indigo-50/40 p-2 sm:p-3 border border-slate-200/80 shadow-md">
                  <img
                    src="/career-hero-3d.jpg"
                    alt="Creatah Careers and Team Growth"
                    className="w-full h-auto object-cover rounded-xl shadow-inner hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                {/* Floating pill badge */}
                <div className="absolute -bottom-3 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="font-bold text-slate-800">Quick 3-Round Hiring</span>
                  </div>
                  <span className="text-blue-600 font-semibold">Decisions in 48 Hrs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Perks & Benefits ("Why Work at Creatah") */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              LIFE AT CREATAH
            </span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              More Than Just a Job. A Place to Do Your Best Work.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We empower our team with competitive pay, the freedom to innovate, and an authentic culture built on respect and technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((perk, i) => {
              const IconComp = perk.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 transition-transform group-hover:scale-110 ${perk.color}`}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Open Roles Grid with Department Filter */}
        <section id="open-roles" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                CURRENT OPPORTUNITIES
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Explore Open Positions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Find your calling across engineering, product design, marketing, or quality testing.
              </p>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-xl border border-slate-200">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeDepartment === dept
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Roles Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {role.department}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Clock className="w-3 h-3" />
                        {role.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {role.location}
                      </span>
                    </div>
                  </div>

                  {/* Title & Experience */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {role.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Required Experience: <span className="text-slate-800 font-bold">{role.experience}</span>
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {role.summary}
                  </p>

                  {/* Responsibilities bullets */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                      Key Responsibilities:
                    </span>
                    {role.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {role.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Velachery, Chennai Campus
                  </span>
                  <button
                    onClick={() => handleApplyClick(role.title)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm hover:shadow transition cursor-pointer"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Spontaneous Application Banner */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-white rounded-2xl p-6 sm:p-8 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Don't See Your Specific Tech Stack or Role Listed?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                We are always eager to meet high-caliber developers, DevOps architects, and product builders. Send us a spontaneous application!
              </p>
            </div>
            <button
              onClick={() => handleApplyClick('General / Other Tech Role')}
              className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              Submit General Application
            </button>
          </div>
        </section>

        {/* 5. Interactive Job Application Form ("form too") */}
        <section
          ref={formSectionRef}
          id="apply-form"
          className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-sm scroll-mt-24"
        >
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              /* Success State */
              <div className="text-center py-10 sm:py-14 space-y-5 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center border border-emerald-200 shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Application Received Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{fullName}</strong>. Your application for{' '}
                    <strong className="text-blue-600">{selectedRoleForForm}</strong> has been received by our hiring team in Velachery, Chennai.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Applicant:</span>
                    <strong className="text-slate-800">{fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact Email:</span>
                    <strong className="text-slate-800">{email}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone:</span>
                    <strong className="text-slate-800">{selectedCountry.dial_code} {phone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expected Turnaround:</span>
                    <strong className="text-emerald-700">24 to 48 Hours</strong>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="text-center space-y-2 pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    DIRECT APPLICATION
                  </span>
                  <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Apply to Join Creatah
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Fill out your credentials below. Our hiring partners evaluate every submission directly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Position Applying For */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Position Applying For <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRoleForForm}
                        onChange={(e) => setSelectedRoleForForm(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition appearance-none cursor-pointer"
                      >
                        {OPEN_ROLES.map((r) => (
                          <option key={r.id} value={r.title}>
                            {r.title} ({r.department})
                          </option>
                        ))}
                        <option value="General / Other Tech Role">
                          General / Other Tech Role (Spontaneous)
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suresh Karthik"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Work / Personal Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="suresh@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>

                  {/* Phone with Country Code */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex">
                      <button
                        type="button"
                        onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-l-xl bg-slate-100 border border-r-0 border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-200 transition shrink-0 cursor-pointer"
                      >
                        <span className="text-base">{selectedCountry.flag}</span>
                        <span>{selectedCountry.dial_code}</span>
                        <ChevronDown className="w-3 h-3 text-slate-500" />
                      </button>

                      <input
                        type="tel"
                        required
                        placeholder={`Enter ${selectedCountry.digits} digits`}
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full px-3.5 py-2.5 rounded-r-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                      />

                      {/* Dropdown Menu */}
                      {countryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 space-y-1 max-h-56 overflow-y-auto">
                          <div className="relative mb-2">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full pl-8 pr-2 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          {filteredCountries.map((c) => (
                            <button
                              type="button"
                              key={c.code}
                              onClick={() => {
                                setSelectedCountry(c);
                                setCountryDropdownOpen(false);
                                setCountrySearch('');
                              }}
                              className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg hover:bg-blue-50 hover:text-blue-600 transition text-left cursor-pointer"
                            >
                              <span className="flex items-center gap-2 truncate">
                                <span>{c.flag}</span>
                                <span className="font-medium text-slate-800">{c.name}</span>
                              </span>
                              <span className="text-slate-400 font-mono text-[11px] shrink-0">
                                {c.dial_code}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {phoneError && (
                      <p className="text-[11px] text-rose-500 font-medium">{phoneError}</p>
                    )}
                  </div>

                  {/* Total Experience */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Total Experience <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition appearance-none cursor-pointer"
                      >
                        <option value="Fresher / < 1 Year">Fresher / &lt; 1 Year</option>
                        <option value="1-3 Years">1 - 3 Years</option>
                        <option value="3-5 Years">3 - 5 Years</option>
                        <option value="5-8 Years">5 - 8 Years</option>
                        <option value="8+ Years">8+ Years (Lead / Principal)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Notice Period */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Notice Period <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={noticePeriod}
                        onChange={(e) => setNoticePeriod(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition appearance-none cursor-pointer"
                      >
                        <option value="Immediate / < 15 Days">Immediate / &lt; 15 Days</option>
                        <option value="15 - 30 Days">15 - 30 Days</option>
                        <option value="45 - 60 Days">45 - 60 Days</option>
                        <option value="Serving Notice Currently">Serving Notice Currently</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Portfolio / LinkedIn / GitHub URL */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      LinkedIn / GitHub / Portfolio URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>

                  {/* Resume File Upload Dropzone */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Upload Resume / CV (PDF, DOC, DOCX up to 10MB) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {attachedFile ? (
                      <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5 truncate">
                          <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                          <div className="truncate">
                            <span className="font-bold text-slate-800 block truncate">
                              {attachedFile.name}
                            </span>
                            <span className="text-slate-500 text-[11px]">
                              {(attachedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to submit
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAttachedFile(null)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition shrink-0 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="p-5 border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl bg-slate-50/60 hover:bg-blue-50/30 transition text-center cursor-pointer group"
                      >
                        <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-blue-600 mx-auto mb-1.5 transition-colors" />
                        <span className="text-xs font-bold text-slate-800 block">
                          Click to select resume or drag & drop here
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Supported formats: PDF, DOC, DOCX (Max 10MB)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Cover Note / Notes */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Why Creatah? / Tell Us About Your Proudest Project
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your core skills, recent achievements, or why you want to work with Creatah in Chennai..."
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting Your Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Job Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2.5">
                    🔒 Your information is confidential and will only be shared with our Chennai hiring committee.
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* 6. Transparent 4-Step Hiring Process */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              HIRING ROADMAP
            </span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our 4-Step Candidate Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We respect your time. Our streamlined process gives you rapid feedback at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HIRING_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-5 border border-slate-200 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-blue-600/30 font-mono">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {step.time}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FAQ Accordion */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              CANDIDATE FAQS
            </span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50 transition cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 8. Direct HR Inquiries Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-500/20">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-200">
              HAVE QUESTIONS ABOUT JOINING CREATAH?
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Connect Directly with Our Talent Acquisition Team
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Write to our Chennai recruitment desk with your portfolio or CV, or call us for interview updates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="mailto:careers@creatah.com"
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow transition flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>careers@creatah.com</span>
            </a>
            <a
              href="tel:+918838229241"
              className="px-5 py-2.5 rounded-xl bg-blue-700/80 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>+91 88 3822 9241</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
