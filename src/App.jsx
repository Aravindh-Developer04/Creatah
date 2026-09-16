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

function getRouteFromLocation() {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  if (hash.includes('about') || path.includes('about')) return 'about';
  if (hash.includes('career') || path.includes('career')) return 'careers';
  if (hash.includes('industr') || path.includes('industr')) return 'industries';
  if (hash.includes('process') || path.includes('process')) return 'process';
  if (hash.includes('contact') || path.includes('contact')) return 'contact';
  if (
    hash.includes('proposal') ||
    hash.includes('consult') ||
    path.includes('proposal') ||
    path.includes('consult')
  ) {
    return 'proposal';
  }

  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => getRouteFromLocation());
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getRouteFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToPage = (page, anchor = '') => {
    setCurrentPage(page);
    let targetHash = '';
    if (page === 'about') targetHash = '#about-us';
    else if (page === 'careers' || page === 'career') targetHash = '#careers';
    else if (page === 'industries') targetHash = '#industries';
    else if (page === 'process') targetHash = '#process';
    else if (page === 'contact') targetHash = '#contact-us';
    else if (page === 'proposal') targetHash = '#request-a-proposal';
    else if (page === 'home') targetHash = anchor || '#';

    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
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

  const isDarkPage = currentPage === 'proposal';

  return (
    <div
      className={`min-h-screen flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased ${
        isDarkPage ? 'bg-[#0e0d17] text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Global Header with Active Route States */}
      <Header
        currentPage={currentPage}
        onNavigatePage={navigateToPage}
        onNavigateHome={() => navigateToPage('home')}
        onNavigateToProposal={() => navigateToPage('proposal')}
        onOpenEstimate={() => navigateToPage('proposal')}
      />

      {/* Main Page Dynamic Content */}
      <main className="flex-grow">
        {currentPage === 'about' && (
          <AboutUsPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
          />
        )}

        {currentPage === 'careers' && (
          <CareersPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
          />
        )}

        {currentPage === 'industries' && (
          <IndustriesPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
          />
        )}

        {currentPage === 'process' && (
          <ProcessPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactUsPage
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToProposal={() => navigateToPage('proposal')}
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

      {/* Global Footer */}
      <Footer onNavigatePage={navigateToPage} />

      {/* Estimator Modal fallback */}
      <EstimateModal
        isOpen={estimateModalOpen}
        onClose={() => setEstimateModalOpen(false)}
      />
    </div>
  );
}
