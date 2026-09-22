import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Building2,
  ChevronDown,
  Search,
  UploadCloud,
  FileText,
  X,
  Lock,
  MessageCircle,
  HelpCircle,
  ChevronUp,
  ExternalLink,
  User,
  Zap,
} from 'lucide-react';
import { submitLead } from '../services/leadService';
import { COUNTRY_CODES } from '../data/countryCodes';

const SERVICES_OPTIONS = [
  'Mobile App Development (iOS & Android)',
  'Custom Software & Web Platforms (React / Node)',
  'Flutter & Cross-Platform Apps',
  'Digital Marketing & Performance SEO',
  'IT Staffing & Dedicated Developers',
  'Enterprise Cloud & Architecture Consultation',
];

const FAQS = [
  {
    q: 'How quickly can our project kickoff after the initial consultation?',
    a: 'Following our initial discovery session, we prepare a detailed SRS and architectural roadmap within 24 to 48 hours. Once approved, our dedicated in-house engineering team typically kicks off development within 3 to 7 business days.',
  },
  {
    q: 'Do you work on fixed-price contracts or dedicated monthly teams?',
    a: 'We offer both models based on your project requirements: Fixed-Price Milestone contracts for well-defined scopes with zero cost overrun risk, and Dedicated Engineering Teams (billed monthly) for evolving startups and continuous agile iteration.',
  },
  {
    q: 'Who legally owns the source code and intellectual property?',
    a: 'You own 100% of the intellectual property, source code, database schemas, and design assets from day one. Everything is signed under a binding Non-Disclosure Agreement (NDA) and transferred directly to your company repositories.',
  },
  {
    q: 'How do we communicate and track daily progress?',
    a: 'You are assigned a dedicated Project Manager who coordinates directly with you over a private WhatsApp/Slack channel. Every 14 days, you receive a working build on our secure staging servers with a live walkthrough demo.',
  },
  {
    q: 'What kind of support do you provide after launch?',
    a: 'Every production release is backed by 60 days of complimentary post-launch warranty, covering bug fixes, server telemetry monitoring, and performance tuning. We also provide long-term SLA maintenance retainers.',
  },
];

export default function ContactUsPage({ onNavigateHome, onNavigateToProposal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // India (+91)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const fileInputRef = useRef(null);

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, selectedCountry.digits);
    setPhone(val);
    if (val.length === selectedCountry.digits) {
      setPhoneError('');
    }
  };

  const handlePhoneBlur = () => {
    if (phone && phone.length !== selectedCountry.digits) {
      setPhoneError(`${selectedCountry.digits}-digit number required for ${selectedCountry.name}`);
    } else {
      setPhoneError('');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!phone || phone.length !== selectedCountry.digits) {
      setPhoneError(`${selectedCountry.digits}-digit number required`);
      return;
    }

    setLoading(true);

    try {
      const res = await submitLead({
        name,
        email,
        company,
        phone: `${selectedCountry.code} ${phone}`,
        service: selectedService,
        message,
        form_type: 'contact_us_page',
      });

      if (res && res.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setFormError(res?.error || 'Failed to submit inquiry. Please check your information.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setFormError(err?.message || 'Could not connect to database API server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setSelectedService(SERVICES_OPTIONS[0]);
    setMessage('');
    setAttachedFile(null);
    setPhoneError('');
    setFormError('');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#f8fafc] text-slate-900 min-h-screen">
      
      {/* Top Breadcrumb & Hero Header */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-10 sm:mb-14">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-blue-600 transition flex items-center gap-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-blue-600 font-bold">Contact Us</span>
        </nav>

        {/* Hero Title and Badge */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Online Support Desk • Average 15-Minute Response</span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Let&apos;s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Exceptional Together</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed pt-1">
            Have a project in mind, need architectural advice, or want to augment your engineering team? Our friendly technical specialists in Chennai are ready to help you every step of the way.
          </p>
        </div>
      </div>

      {/* Main 2-Column Section: Left Support Rep Showcase & Direct Channels, Right Form */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: Friendly Support Showcase & Channels ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Friendly 3D Support Illustration Card */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 border border-blue-100 shadow-xl shadow-blue-500/5 p-6 sm:p-8 relative overflow-hidden">
              
              {/* Top Live Status Bar */}
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-blue-100/80 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Customer Support Team</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 font-bold text-[11px]">
                  Online Now
                </span>
              </div>

              {/* 3D Illustration */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 to-indigo-200/20 rounded-full blur-2xl -z-0"></div>
                <img
                  src="/support-illustration.png"
                  alt="Creatah Customer Support Representative"
                  className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain relative z-10 drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Friendly Description & Promise */}
              <div className="text-center pt-4 space-y-2 relative z-10">
                <h3 className="text-lg font-bold text-slate-900">
                  We&apos;re Here to Help You Succeed!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Direct conversation with senior engineers who understand modern codebases and business logic — zero pushy sales tactics.
                </p>
              </div>

              {/* Response Time Highlights */}
              <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-blue-100/80 text-center">
                <div className="p-2.5 rounded-xl bg-white/90 border border-blue-100">
                  <div className="text-base sm:text-lg font-black text-blue-600">&lt; 15 Mins</div>
                  <div className="text-[11px] text-slate-500 font-medium">WhatsApp Reply</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 border border-blue-100">
                  <div className="text-base sm:text-lg font-black text-indigo-600">24 Hours</div>
                  <div className="text-[11px] text-slate-500 font-medium">Full Proposal & Quote</div>
                </div>
              </div>
            </div>

            {/* Direct Channels Cards (Vibrant & User Friendly) */}
            <div className="space-y-3">
              
              {/* WhatsApp Direct Chat Card */}
              <a
                href="https://wa.me/918838229241?text=Hi%20Creatah%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 shadow-md shadow-slate-200/50 hover:shadow-lg hover:shadow-emerald-500/10 flex items-center justify-between gap-4 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/30 group-hover:scale-105 transition">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-600 block">Instant Chat</span>
                    <strong className="text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition">
                      Chat on WhatsApp
                    </strong>
                    <span className="text-[11px] text-slate-500 block">Fastest response for urgent inquiries</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
              </a>

              {/* Direct Phone Call Card */}
              <a
                href="tel:+918838229241"
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 shadow-md shadow-slate-200/50 hover:shadow-lg hover:shadow-blue-500/10 flex items-center justify-between gap-4 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/30 group-hover:scale-105 transition">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-blue-600 block">Direct Hotline</span>
                    <strong className="text-sm sm:text-base text-slate-900 group-hover:text-blue-700 transition">
                      +91 88 3822 9241
                    </strong>
                    <span className="text-[11px] text-slate-500 block">Mon – Sat, 9:30 AM – 7:00 PM IST</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
              </a>

              {/* Email Card */}
              <a
                href="mailto:sales@creatah.com"
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 shadow-md shadow-slate-200/50 hover:shadow-lg hover:shadow-indigo-500/10 flex items-center justify-between gap-4 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30 group-hover:scale-105 transition">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 block">Email Desk</span>
                    <strong className="text-sm sm:text-base text-slate-900 group-hover:text-indigo-700 transition">
                      sales@creatah.com
                    </strong>
                    <span className="text-[11px] text-slate-500 block">General: info@creatah.com</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />
              </a>

              {/* Office Location Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-md shadow-slate-200/50 flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-purple-600 block">Chennai Headquarters</span>
                  <strong className="text-sm sm:text-base text-slate-900 block">
                    Creatah Software Technologies (P) Ltd.
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Velachery, Chennai, Tamil Nadu, 600042, India
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* ================= RIGHT COLUMN: Clean White Interactive Form ================= */}
          <div className="lg:col-span-7">
            <div className="bg-white text-slate-900 border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/60 relative overflow-hidden">
              
              {/* Subtle Ambient Corner Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

              {submitted ? (
                /* Success Confirmation State */
                <div className="py-12 text-center space-y-6 animate-fadeIn relative z-10">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                      Inquiry Received
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      Thank You, {name || 'Partner'}!
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                      Our Chennai engineering team has received your project details. A dedicated technical consultant will review your scope and get back to you within 2 business hours.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs sm:text-sm text-slate-700 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Service:</span>
                      <strong className="text-slate-900">{selectedService}</strong>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Email Address:</span>
                      <strong className="text-blue-600 font-semibold">{email}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Phone Contact:</span>
                      <strong className="text-slate-900">{selectedCountry.code} {phone}</strong>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col xs:flex-row items-center justify-center gap-3">
                    <button
                      onClick={onNavigateHome}
                      className="w-full xs:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition min-h-[44px] cursor-pointer"
                    >
                      Return to Home
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full xs:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition min-h-[44px] cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  
                  {/* Form Header */}
                  <div className="space-y-2 border-b border-slate-100 pb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Send an Inquiry
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Tell Us About Your Project
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Fill in the simple form below and an engineer will connect with you shortly with architectural recommendations.
                    </p>
                  </div>

                  {/* Name and Business Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s.]/g, ''))}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ramesh@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition"
                      />
                    </div>
                  </div>

                  {/* Company Name & Service Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Company Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. Acme Health Corp"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Service Needed *
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition cursor-pointer"
                      >
                        {SERVICES_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Phone with International Country Dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Phone Number ({selectedCountry.digits}-digit required) *
                    </label>

                    <div className="flex rounded-xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 overflow-hidden bg-slate-50 focus-within:bg-white transition">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="px-3 py-3 bg-slate-100 border-r border-slate-300 flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:bg-slate-200 transition shrink-0 cursor-pointer"
                      >
                        <span className="text-base leading-none">{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      </button>

                      <input
                        type="tel"
                        required
                        placeholder={`${selectedCountry.digits} digits (e.g. 9876543210)`}
                        value={phone}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                        className="w-full px-4 py-3 text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                      />
                    </div>

                    {phoneError && (
                      <span className="text-xs text-rose-500 font-medium mt-1.5 block">
                        {phoneError}
                      </span>
                    )}

                    {/* Country Searchable Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 max-w-[calc(100vw-3rem)] max-h-60 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                        <div className="p-2.5 border-b border-slate-100 bg-slate-50">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs">
                            <Search className="w-3.5 h-3.5 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full text-xs text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="overflow-y-auto max-h-44 py-1 text-xs">
                          {filteredCountries.map((c) => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(c);
                                setPhone('');
                                setPhoneError('');
                                setDropdownOpen(false);
                                setCountrySearch('');
                              }}
                              className={`w-full px-3 py-2 flex items-center justify-between hover:bg-blue-50 text-left transition cursor-pointer ${
                                selectedCountry.code === c.code ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-800'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span>{c.flag}</span>
                                <span className="truncate max-w-[140px]">{c.name}</span>
                              </span>
                              <span className="text-slate-500 font-mono text-[11px]">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Message / Project Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe what you want to build, target platforms, timeline, or any specific questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition resize-none"
                    />
                  </div>

                  {/* File Upload Optional */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Attach Scope Document / RFP <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-3 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition flex items-center justify-center gap-2 text-xs text-slate-600"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip"
                        className="hidden"
                      />
                      <UploadCloud className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate max-w-[280px]">
                        {attachedFile ? attachedFile.name : 'Upload PDF, DOCX, PPTX (up to 25MB)'}
                      </span>
                    </div>
                  </div>

                  {/* NDA Strip */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-700">
                    <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>*Your idea is 100% protected by our mutual non-disclosure agreement.</span>
                  </div>

                  {/* Error Alert Display */}
                  {formError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                      <X className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer min-h-[50px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Submitting Inquiry...' : 'Send Inquiry & Get Recommendations'}</span>
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* 3 Trust Pillars Strip */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">24-Hour Scope Turnaround</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an architectural analysis, tech stack breakdown, and transparent milestone quote within 1 business day.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">100% IP & Code Ownership</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mutual NDA signed prior to disclosure. All code, designs, and repositories remain 100% your legal property.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Dedicated In-House Engineers</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Directly communicate with your dedicated engineers in Chennai with daily updates and bi-weekly sprint demos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Section */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm">
            Everything you need to know before reaching out to our technical desk.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
