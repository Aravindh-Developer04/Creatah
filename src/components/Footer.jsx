import React from 'react';
import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer({ onNavigatePage }) {
  const handleNav = (e, page, hash) => {
    if (onNavigatePage) {
      e.preventDefault();
      onNavigatePage(page, hash);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-slate-800">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Top Company Info Row */}
        <div className="pb-8 sm:pb-12 mb-8 sm:mb-12 border-b border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center">
              <a
                href="/"
                onClick={(e) => handleNav(e, 'home')}
                className="inline-block transition hover:opacity-90 cursor-pointer"
                aria-label="Creatah Home"
              >
                <img
                  src="/logo.webp"
                  alt="Creatah"
                  className="h-9 sm:h-11 md:h-12 w-auto object-contain"
                />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Leading custom software development company based in Chennai, India. Specializing in bespoke web applications, mobile platforms, enterprise cloud solutions, and performance digital marketing.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3.5 sm:gap-6 text-xs text-slate-300">
            <a href="tel:+918838229241" className="flex items-center gap-2.5 hover:text-cyan-400 transition py-1">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+91 88 3822 9241</span>
            </a>
            <a href="mailto:info@creatah.com" className="flex items-center gap-2.5 hover:text-cyan-400 transition py-1">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>info@creatah.com</span>
            </a>
            <div className="flex items-center gap-2.5 py-1">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Chennai, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns Grid - 1 col on tiny mobile, 2 on xs+, 4 on md+ */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12 text-xs">
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li><a href="/" onClick={(e) => handleNav(e, 'home')} className="hover:text-cyan-400 transition py-0.5 inline-block">Home</a></li>
              <li><a href="/about-us" onClick={(e) => handleNav(e, 'about')} className="hover:text-cyan-400 transition py-0.5 inline-block">About Us</a></li>
              <li><a href="/careers" onClick={(e) => handleNav(e, 'careers')} className="hover:text-cyan-400 transition py-0.5 inline-block">Careers <span className="text-[10px] text-emerald-400 font-bold ml-1">Hiring</span></a></li>
              <li><a href="/industries" onClick={(e) => handleNav(e, 'industries')} className="hover:text-cyan-400 transition py-0.5 inline-block">Industries</a></li>
              <li><a href="/process" onClick={(e) => handleNav(e, 'process')} className="hover:text-cyan-400 transition py-0.5 inline-block">Engineering Process</a></li>
              <li><a href="/contact-us" onClick={(e) => handleNav(e, 'contact')} className="hover:text-cyan-400 transition py-0.5 inline-block">Contact Us</a></li>
              <li><a href="/request-a-proposal" onClick={(e) => handleNav(e, 'proposal')} className="hover:text-cyan-400 transition py-0.5 inline-block">Request a Proposal</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li><a href="#services" onClick={(e) => handleNav(e, 'home', '#services')} className="hover:text-cyan-400 transition py-0.5 inline-block">Mobile App Development</a></li>
              <li><a href="#services" onClick={(e) => handleNav(e, 'home', '#services')} className="hover:text-cyan-400 transition py-0.5 inline-block">Web App Development</a></li>
              <li><a href="#services" onClick={(e) => handleNav(e, 'home', '#services')} className="hover:text-cyan-400 transition py-0.5 inline-block">IT Staffing Solutions</a></li>
              <li><a href="#services" onClick={(e) => handleNav(e, 'home', '#services')} className="hover:text-cyan-400 transition py-0.5 inline-block">Digital Marketing & SEO</a></li>
              <li><a href="#services" onClick={(e) => handleNav(e, 'home', '#services')} className="hover:text-cyan-400 transition py-0.5 inline-block">Cloud Computing & DevOps</a></li>
            </ul>
          </div>

          {/* Hire Developers */}
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">
              Hire Developers
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li><a href="/request-a-proposal" onClick={(e) => handleNav(e, 'proposal')} className="hover:text-cyan-400 transition py-0.5 inline-block">Mobile App Developers</a></li>
              <li><a href="/request-a-proposal" onClick={(e) => handleNav(e, 'proposal')} className="hover:text-cyan-400 transition py-0.5 inline-block">Backend Node / Python</a></li>
              <li><a href="/request-a-proposal" onClick={(e) => handleNav(e, 'proposal')} className="hover:text-cyan-400 transition py-0.5 inline-block">UI/UX Product Designers</a></li>
              <li><a href="/request-a-proposal" onClick={(e) => handleNav(e, 'proposal')} className="hover:text-cyan-400 transition py-0.5 inline-block">Full Stack Engineers</a></li>
              <li><a href="/request-a-proposal" onClick={(e) => handleNav(e, 'proposal')} className="hover:text-cyan-400 transition py-0.5 inline-block">WordPress & CMS Developers</a></li>
            </ul>
          </div>

          {/* Industries We Serve */}
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">
              Industries We Serve
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li><a href="/industries" onClick={(e) => handleNav(e, 'industries')} className="hover:text-cyan-400 transition py-0.5 inline-block">Healthcare & Diagnostics</a></li>
              <li><a href="/industries" onClick={(e) => handleNav(e, 'industries')} className="hover:text-cyan-400 transition py-0.5 inline-block">Logistics & Supply Chain</a></li>
              <li><a href="/industries" onClick={(e) => handleNav(e, 'industries')} className="hover:text-cyan-400 transition py-0.5 inline-block">Retail & Ecommerce</a></li>
              <li><a href="/industries" onClick={(e) => handleNav(e, 'industries')} className="hover:text-cyan-400 transition py-0.5 inline-block">Real Estate & Construction</a></li>
              <li><a href="/industries" onClick={(e) => handleNav(e, 'industries')} className="hover:text-cyan-400 transition py-0.5 inline-block">Fintech & Banking</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Social Strip & Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800/80 flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-xs text-center md:text-left">
          <div>
            <a href="#" className="hover:text-cyan-400 transition mr-4">Privacy Policy</a>
            <span className="text-slate-500 block sm:inline mt-1 sm:mt-0">
              Copyright © 2026 Creatah Software Technologies (P) Ltd. All Rights Reserved.
            </span>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-slate-400">
            <a
              href="https://in.linkedin.com/company/creatah"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg bg-[#080c18] border border-white/10 hover:text-cyan-400 hover:bg-[#131b30] hover:border-cyan-500/40 transition shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/creatah.in/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg bg-[#080c18] border border-white/10 hover:text-cyan-400 hover:bg-[#131b30] hover:border-cyan-500/40 transition shadow-sm"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/creatahsoftware/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg bg-[#080c18] border border-white/10 hover:text-cyan-400 hover:bg-[#131b30] hover:border-cyan-500/40 transition shadow-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCs7LmMraebi9fV8OTpPAujg"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg bg-[#080c18] border border-white/10 hover:text-cyan-400 hover:bg-[#131b30] hover:border-cyan-500/40 transition shadow-sm"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
