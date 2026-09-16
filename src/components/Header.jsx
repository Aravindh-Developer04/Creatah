import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Smartphone,
  Globe,
  TrendingUp,
  ArrowRight,
  Code2,
  Shield,
  Phone,
  Mail,
  Sparkles,
} from 'lucide-react';

export default function Header({
  onOpenEstimate,
  onNavigateHome,
  onNavigateToProposal,
  onNavigatePage,
  currentPage = 'home',
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [mobileWhatWeDo, setMobileWhatWeDo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (e, page, targetAnchor = '') => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setWhatWeDoOpen(false);
    if (onNavigatePage) {
      onNavigatePage(page, targetAnchor);
    } else if (page === 'home' && onNavigateHome) {
      onNavigateHome(targetAnchor);
    } else if (page === 'proposal' && onNavigateToProposal) {
      onNavigateToProposal();
    }
  };

  const handleEstimateClick = () => {
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage('proposal');
    } else if (onNavigateToProposal) {
      onNavigateToProposal();
    } else if (onOpenEstimate) {
      onOpenEstimate();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080c18]/95 backdrop-blur-xl py-3.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] border-b border-white/[0.08]'
          : 'bg-[#080c18]/80 backdrop-blur-xl py-4 border-b border-white/[0.05]'
      }`}
    >
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="flex items-center justify-between">
          
          {/* Creatah Official Brand Logo */}
          <a
            href="#"
            onClick={(e) => handleNav(e, 'home')}
            className="flex items-center group cursor-pointer"
          >
            <img
              src="/logo.webp"
              alt="Creatah Software Technologies"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#"
              onClick={(e) => handleNav(e, 'home')}
              className={`text-sm font-semibold transition cursor-pointer relative py-1 ${
                currentPage === 'home'
                  ? 'text-cyan-400 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400'
                  : 'text-slate-200 hover:text-cyan-400'
              }`}
            >
              Home
            </a>
            <a
              href="#about-us"
              onClick={(e) => handleNav(e, 'about')}
              className={`text-sm font-semibold transition cursor-pointer relative py-1 ${
                currentPage === 'about'
                  ? 'text-cyan-400 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400'
                  : 'text-slate-200 hover:text-cyan-400'
              }`}
            >
              About Us
            </a>

            {/* "What We Do" Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setWhatWeDoOpen(true)}
              onMouseLeave={() => setWhatWeDoOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-200 hover:text-cyan-400 py-2 transition"
                onClick={() => setWhatWeDoOpen(!whatWeDoOpen)}
              >
                <span>What We Do</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${whatWeDoOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {whatWeDoOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-3 gap-6 animate-fadeIn text-slate-800 z-50">
                  
                  {/* Column 1: Mobile App Development */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <Smartphone className="w-4 h-4 text-blue-600" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Mobile Apps
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                          <img src="/icons/icons-01.svg" alt="Android" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">Android App Development</strong>
                            <span className="text-slate-500 text-[11px]">Native Kotlin apps</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                          <img src="/icons/icons-02.svg" alt="iOS" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">iOS App Development</strong>
                            <span className="text-slate-500 text-[11px]">Swift & Apple Pay</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                          <img src="/icons/icons-03.svg" alt="Flutter" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">Flutter App Development</strong>
                            <span className="text-slate-500 text-[11px]">Cross-platform 60fps</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
                          <img src="/icons/icons-04.svg" alt="React Native" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">React Native Development</strong>
                            <span className="text-slate-500 text-[11px]">Hybrid flexibility</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Web App Development */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <Globe className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Web Applications
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                          <img src="/icons/icons-04.svg" alt="React" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">ReactJS / Next.js</strong>
                            <span className="text-slate-500 text-[11px]">Modern reactive SPAs</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                          <img src="/icons/icons-06.svg" alt="Node.js" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">Node.js Backend</strong>
                            <span className="text-slate-500 text-[11px]">Scalable microservices</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                          <img src="/icons/icons-07.svg" alt="Laravel" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">Laravel & PHP</strong>
                            <span className="text-slate-500 text-[11px]">Robust enterprise portals</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                          <img src="/icons/icons-05.svg" alt="Angular" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">Angular Development</strong>
                            <span className="text-slate-500 text-[11px]">Structured enterprise apps</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Digital Marketing */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Digital Marketing
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition">
                          <img src="/icons/seo-1.svg" alt="SEO" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">SEO Services</strong>
                            <span className="text-slate-500 text-[11px]">Rank #1 on Google</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition">
                          <img src="/icons/seo-2.svg" alt="Social Media" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">Social Media Marketing</strong>
                            <span className="text-slate-500 text-[11px]">Brand engagement & leads</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition">
                          <img src="/icons/seo-3.svg" alt="Content Marketing" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">Content Marketing</strong>
                            <span className="text-slate-500 text-[11px]">High-conversion copy</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#services" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition">
                          <img src="/icons/seo-4.svg" alt="Paid Ads" className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <strong className="block text-slate-800">Paid Advertising (PPC)</strong>
                            <span className="text-slate-500 text-[11px]">Google & Meta Ads</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>

                </div>
              )}
            </div>

            <a
              href="#careers"
              onClick={(e) => handleNav(e, 'careers')}
              className={`text-sm font-semibold transition cursor-pointer relative py-1 flex items-center gap-1.5 ${
                currentPage === 'careers'
                  ? 'text-cyan-400 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400'
                  : 'text-slate-200 hover:text-cyan-400'
              }`}
            >
              <span>Careers</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 leading-none">
                Hiring
              </span>
            </a>
            <a
              href="#process"
              onClick={(e) => handleNav(e, 'process')}
              className={`text-sm font-semibold transition cursor-pointer relative py-1 ${
                currentPage === 'process'
                  ? 'text-cyan-400 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400'
                  : 'text-slate-200 hover:text-cyan-400'
              }`}
            >
              Process
            </a>
            <a
              href="#contact-us"
              onClick={(e) => handleNav(e, 'contact')}
              className={`text-sm font-semibold transition cursor-pointer relative py-1 ${
                currentPage === 'contact'
                  ? 'text-cyan-400 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400'
                  : 'text-slate-200 hover:text-cyan-400'
              }`}
            >
              Contact Us
            </a>
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handleEstimateClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Estimate Your Project</span>
            </button>
          </div>

          {/* Mobile Right Controls: Call CTA + Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:+918838229241"
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-blue-600/20 text-cyan-400 hover:bg-blue-600/30 flex items-center justify-center transition border border-blue-500/30"
              aria-label="Call Creatah Support"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition border border-slate-800"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Offcanvas Drawer with Safe Max-Height & Momentum Scrolling */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080c18]/98 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-8 space-y-2 animate-fadeIn text-slate-200 max-h-[calc(100dvh-4.5rem)] overflow-y-auto shadow-2xl">
          <a
            href="#"
            onClick={(e) => handleNav(e, 'home')}
            className={`block px-3.5 py-2.5 rounded-xl font-semibold text-sm transition ${
              currentPage === 'home'
                ? 'bg-blue-600/20 text-cyan-400 font-bold border border-blue-500/30'
                : 'hover:bg-white/[0.06] hover:text-cyan-400'
            }`}
          >
            Home
          </a>
          <a
            href="#about-us"
            onClick={(e) => handleNav(e, 'about')}
            className={`block px-3.5 py-2.5 rounded-xl font-semibold text-sm transition ${
              currentPage === 'about'
                ? 'bg-blue-600/20 text-cyan-400 font-bold border border-blue-500/30'
                : 'hover:bg-white/[0.06] hover:text-cyan-400'
            }`}
          >
            About Us
          </a>

          <div>
            <button
              onClick={() => setMobileWhatWeDo(!mobileWhatWeDo)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/[0.06] text-left transition"
            >
              <span>What We Do</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileWhatWeDo ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>
            {mobileWhatWeDo && (
              <div className="pl-5 pr-2 py-2 space-y-1 bg-[#050811]/60 rounded-xl border border-white/[0.08] mt-1">
                <a
                  href="#services"
                  onClick={(e) => handleNav(e, 'home', '#services')}
                  className="flex items-center gap-2 py-2 px-2 text-xs text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-white/[0.06]"
                >
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Mobile App Development</span>
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleNav(e, 'home', '#services')}
                  className="flex items-center gap-2 py-2 px-2 text-xs text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-white/[0.06]"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Web App Development</span>
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleNav(e, 'home', '#services')}
                  className="flex items-center gap-2 py-2 px-2 text-xs text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-white/[0.06]"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Digital Marketing & SEO</span>
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleNav(e, 'home', '#services')}
                  className="flex items-center gap-2 py-2 px-2 text-xs text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-white/[0.06]"
                >
                  <Code2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>IT Staffing Solutions</span>
                </a>
              </div>
            )}
          </div>

          <a
            href="#careers"
            onClick={(e) => handleNav(e, 'careers')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition ${
              currentPage === 'careers'
                ? 'bg-blue-600/20 text-cyan-400 font-bold border border-blue-500/30'
                : 'hover:bg-white/[0.06] hover:text-cyan-400'
            }`}
          >
            <span>Careers</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              We're Hiring
            </span>
          </a>
          <a
            href="#process"
            onClick={(e) => handleNav(e, 'process')}
            className={`block px-3.5 py-2.5 rounded-xl font-semibold text-sm transition ${
              currentPage === 'process'
                ? 'bg-blue-600/20 text-cyan-400 font-bold border border-blue-500/30'
                : 'hover:bg-white/[0.06] hover:text-cyan-400'
            }`}
          >
            Development Process
          </a>
          <a
            href="#contact-us"
            onClick={(e) => handleNav(e, 'contact')}
            className={`block px-3.5 py-2.5 rounded-xl font-semibold text-sm transition ${
              currentPage === 'contact'
                ? 'bg-blue-600/20 text-cyan-400 font-bold border border-blue-500/30'
                : 'hover:bg-white/[0.06] hover:text-cyan-400'
            }`}
          >
            Contact Us
          </a>

          {/* Quick Contact info in mobile drawer */}
          <div className="pt-3 pb-1 px-3 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
            <span>Chennai HQ</span>
            <a href="tel:+918838229241" className="text-cyan-400 font-semibold hover:underline">
              +91 88 3822 9241
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={handleEstimateClick}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Estimate Your Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
