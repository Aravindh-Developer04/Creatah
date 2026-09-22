import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import HeroMarquee from './components/HeroMarquee';
import TrustedBy from './components/TrustedBy';
import WhyChooseCreatah from './components/WhyChooseCreatah';
import WhatWeBuild from './components/WhatWeBuild';
import Industries from './components/Industries';
import TechStackCTA from './components/TechStackCTA';
import Testimonials from './components/Testimonials';
import WhyClientsStay from './components/WhyClientsStay';
import DevelopmentProcess from './components/DevelopmentProcess';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import EstimateModal from './components/EstimateModal';
import RequestProposalPage from './pages/RequestProposalPage';
import AboutUsPage from './pages/AboutUsPage';
import IndustriesPage from './pages/IndustriesPage';
import CareersPage from './pages/CareersPage';
import ProcessPage from './pages/ProcessPage';
import ContactUsPage from './pages/ContactUsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { getSeoForUrl } from './data/seoData';

function getRouteFromLocation(url) {
  if (url) {
    const cleanUrl = url.toLowerCase();
    if (cleanUrl.includes('admin')) return 'admin';
    if (cleanUrl.includes('about')) return 'about';
    if (cleanUrl.includes('career')) return 'careers';
    if (cleanUrl.includes('industr')) return 'industries';
    if (cleanUrl.includes('process')) return 'process';
    if (cleanUrl.includes('contact')) return 'contact';
    if (cleanUrl.includes('proposal') || cleanUrl.includes('consult')) return 'proposal';
    return 'home';
  }
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.includes('admin') || hash.includes('admin')) return 'admin';
  if (path.includes('about') || hash.includes('about')) return 'about';
  if (path.includes('career') || hash.includes('career')) return 'careers';
  if (path.includes('industr') || hash.includes('industr')) return 'industries';
  if (path.includes('process') || hash.includes('process')) return 'process';
  if (path.includes('contact') || hash.includes('contact')) return 'contact';
  if (
    path.includes('proposal') ||
    path.includes('consult') ||
    hash.includes('proposal') ||
    hash.includes('consult')
  ) {
    return 'proposal';
  }

  return 'home';
}

function getPathForPage(page) {
  switch (page) {
    case 'admin':
      return '/admin';
    case 'about':
      return '/about-us';
    case 'careers':
    case 'career':
      return '/careers';
    case 'industries':
      return '/industries';
    case 'process':
      return '/process';
    case 'contact':
      return '/contact-us';
    case 'proposal':
      return '/request-a-proposal';
    case 'home':
    default:
      return '/';
  }
}

export default function App({ initialUrl }) {
  const [currentPage, setCurrentPage] = useState(() => getRouteFromLocation(initialUrl));
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);

  useEffect(() => {
    // If the browser currently has a hash (like #about-us), immediately strip it and replace with clean URL
    if (window.location.hash) {
      const initialPage = getRouteFromLocation();
      const cleanPath = getPathForPage(initialPage);
      window.history.replaceState(null, '', cleanPath);
    }

    const handlePopState = () => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname || '/');
      }
      setCurrentPage(getRouteFromLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Global listener to prevent '#' from appearing in browser URL for any anchor links
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href === '#') {
        e.preventDefault();
        return;
      }

      if (href.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname || '/');
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const navigateToPage = (page, anchor = '') => {
    setCurrentPage(page);
    const targetPath = getPathForPage(page);

    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }

    if (anchor && page === 'home') {
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Synchronize document title and primary meta tags on client route change
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const currentPath = getPathForPage(currentPage);
    const seo = getSeoForUrl(currentPath);
    if (seo) {
      document.title = seo.title;
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) descMeta.setAttribute('content', seo.description);
      const titleMeta = document.querySelector('meta[name="title"]');
      if (titleMeta) titleMeta.setAttribute('content', seo.title);
      const kwMeta = document.querySelector('meta[name="keywords"]');
      if (kwMeta) kwMeta.setAttribute('content', seo.keywords);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', seo.canonical);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', seo.title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', seo.description);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', seo.canonical);
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', seo.title);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', seo.description);
      const twUrl = document.querySelector('meta[name="twitter:url"]');
      if (twUrl) twUrl.setAttribute('content', seo.canonical);
    }
  }, [currentPage]);

  const isDarkPage = currentPage === 'proposal';

  return (
    <div
      className={`min-h-screen flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased ${
        isDarkPage ? 'bg-[#0e0d17] text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Global Header with Active Route States (Hidden on Admin Portal) */}
      {currentPage !== 'admin' && (
        <Header
          currentPage={currentPage}
          onNavigatePage={navigateToPage}
          onNavigateHome={() => navigateToPage('home')}
          onNavigateToProposal={() => navigateToPage('proposal')}
          onOpenEstimate={() => navigateToPage('proposal')}
        />
      )}

      {/* Main Page Dynamic Content */}
      <main className="flex-grow">
        {currentPage === 'admin' && (
          <AdminDashboardPage />
        )}

        {currentPage === 'about' && (
          <AboutUsPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
            onNavigateContact={() => navigateToPage('contact')}
            onNavigatePage={navigateToPage}
          />
        )}

        {currentPage === 'careers' && (
          <CareersPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
            onNavigatePage={navigateToPage}
          />
        )}

        {currentPage === 'industries' && (
          <IndustriesPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
            onNavigatePage={navigateToPage}
          />
        )}

        {currentPage === 'process' && (
          <ProcessPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
            onNavigatePage={navigateToPage}
          />
        )}

        {currentPage === 'contact' && (
          <ContactUsPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
            onNavigatePage={navigateToPage}
          />
        )}

        {currentPage === 'proposal' && (
          <RequestProposalPage onNavigateHome={() => navigateToPage('home')} />
        )}

        {currentPage === 'home' && (
          <>
            {/* 4-Slide Hero Slider */}
            <HeroSlider onOpenEstimate={() => navigateToPage('proposal')} />

            {/* Live Metrics Marquee Ticker */}
            <HeroMarquee />

            {/* Client Brand Logos */}
            <TrustedBy />

            {/* Why Businesses Choose Creatah */}
            <WhyChooseCreatah />

            {/* What We Build and Do (8 Services) */}
            <WhatWeBuild />

            {/* 18 Industries Grid */}
            <Industries />

            {/* Tech Stack & Transformation CTA */}
            <TechStackCTA onOpenEstimate={() => navigateToPage('proposal')} />

            {/* Authentic Client Testimonials */}
            <Testimonials />

            {/* Why Clients Stay With Creatah (6 Pillars) */}
            <WhyClientsStay />

            {/* Our 5-Step Development Process */}
            <DevelopmentProcess />

            {/* Quick Support & Lead Generation Form */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Global Footer (Hidden on Admin Portal) */}
      {currentPage !== 'admin' && (
        <Footer onNavigatePage={navigateToPage} />
      )}

      {/* Estimator Modal fallback */}
      <EstimateModal
        isOpen={estimateModalOpen}
        onClose={() => setEstimateModalOpen(false)}
      />
    </div>
  );
}
