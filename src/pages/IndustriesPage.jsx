import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Stethoscope,
  Truck,
  ShoppingBag,
  Landmark,
  Building,
  GraduationCap,
  Plane,
  Heart,
  UtensilsCrossed,
  Layers,
  Trees,
  Newspaper,
  Radio,
  Workflow,
  Share2,
  Check,
  Smartphone,
  ChevronRight,
} from 'lucide-react';

const CATEGORIES = [
  'All Verticals',
  'Healthcare & Life Sciences',
  'Logistics & Mobility',
  'Retail & Commerce',
  'Fintech & Real Estate',
  'Emerging Tech & IoT',
];

const CLIENT_LOGOS = [
  { name: 'Verse Tech', file: '/brand-logo/verse.webp' },
  { name: 'BMEG Group', file: '/brand-logo/bmeg.webp' },
  { name: 'Dartexon Logistics', file: '/brand-logo/dartexon.webp' },
  { name: 'MyRMC Ready-Mix', file: '/brand-logo/myrmc.webp' },
  { name: 'Nannir Diagnostic', file: '/brand-logo/nannir.webp' },
  { name: 'Sakthi Cars', file: '/brand-logo/sakthicars.webp' },
];

const ALL_INDUSTRIES = [
  {
    id: 1,
    name: 'Healthcare & Diagnostics',
    category: 'Healthcare & Life Sciences',
    icon: Stethoscope,
    tagline: 'LIMS, Patient Portals & Telemedicine',
    challenge: 'Securing HIPAA/NABH-compliant patient data flows with instant lab report delivery.',
    deliverables: ['Automated Lab Machine Interfacing', 'Doctor Teleconsultation Portal', 'Patient Mobile App with SMS/WhatsApp Reports'],
    tech: ['Node.js', 'React', 'Kotlin', 'PostgreSQL'],
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    id: 2,
    name: 'Logistics & Supply Chain',
    category: 'Logistics & Mobility',
    icon: Truck,
    tagline: 'Fleet Telematics & Warehouse Systems',
    challenge: 'Real-time GPS tracking and dispatch optimization under low-bandwidth mobile networks.',
    deliverables: ['Driver Android App (Offline First)', 'Live GPS Fleet Dashboard', 'Consignment & Dispatch ERP'],
    tech: ['Flutter', 'Python', 'Redis', 'MQTT'],
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    id: 3,
    name: 'Ecommerce & Retail',
    category: 'Retail & Commerce',
    icon: ShoppingBag,
    tagline: 'Omni-Channel D2C & Marketplaces',
    challenge: 'High-concurrency checkout during festive flashes without inventory discrepancies.',
    deliverables: ['Next.js Superfast Storefront', 'Integrated Payment Gateways & Wallets', 'Automated Courier & Shiprocket Sync'],
    tech: ['Next.js', 'React Native', 'Node.js', 'AWS'],
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    id: 4,
    name: 'Fintech & Banking',
    category: 'Fintech & Real Estate',
    icon: Landmark,
    tagline: 'Lending Portals & Digital Wallets',
    challenge: 'Strict RBI compliance, sub-second ledger updates, and bank-grade encryption.',
    deliverables: ['Digital KYC & Aadhaar Verification', 'Automated Loan Origination Engine', 'Double-Entry Accounting Ledger'],
    tech: ['Java/Spring', 'React', 'PostgreSQL', 'Docker'],
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  {
    id: 5,
    name: 'Real Estate & PropTech',
    category: 'Fintech & Real Estate',
    icon: Building,
    tagline: 'CRM, Virtual Tours & Lease Portals',
    challenge: 'Managing high-value lead pipelines, property listings, and broker commission tracking.',
    deliverables: ['Custom Real Estate CRM & Lead Router', 'Interactive 3D Virtual Tour Viewer', 'Automated Tenant Invoicing & Agreements'],
    tech: ['React', 'Laravel', 'MySQL', 'Three.js'],
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
  {
    id: 6,
    name: 'Manufacturing & Industrial',
    category: 'Logistics & Mobility',
    icon: Workflow,
    tagline: 'Smart Factory ERP & Inventory Sync',
    challenge: 'Eliminating manual spreadsheets and synchronizing floor machine logs in real-time.',
    deliverables: ['Shop-Floor Production Monitoring', 'Barcode/QR Raw Material Scanner App', 'Vendor Purchase Order Automation'],
    tech: ['Python', 'Angular', 'PostgreSQL', 'Docker'],
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
  },
  {
    id: 7,
    name: 'Education & EdTech',
    category: 'All Verticals',
    icon: GraduationCap,
    tagline: 'LMS, Live Classes & Student Portals',
    challenge: 'Low-latency interactive streaming, automated grading, and parent fee management.',
    deliverables: ['WebRTC Live Interactive Video Classrooms', 'Automated Quizzing & Progress Analytics', 'Parent Fee Payment & Attendance App'],
    tech: ['React', 'Node.js', 'WebRTC', 'MongoDB'],
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
  {
    id: 8,
    name: 'Travel, Tours & Mobility',
    category: 'Logistics & Mobility',
    icon: Plane,
    tagline: 'Booking Engines, Itinerary & Cab Dispatch',
    challenge: 'Dynamic airline/hotel API synchronization and automated currency conversion.',
    deliverables: ['GDS / Hotel API Aggregator Engine', 'Multi-City Itinerary Builder', 'Driver & Passenger Dispatch App'],
    tech: ['React Native', 'Node.js', 'Redis', 'Stripe'],
    color: 'text-sky-600 bg-sky-50 border-sky-200',
  },
  {
    id: 9,
    name: 'Social Networking & Communities',
    category: 'All Verticals',
    icon: Share2,
    tagline: 'Feeds, Messaging & Creator Tools',
    challenge: 'Real-time WebSocket chat scaling to millions of concurrent socket connections.',
    deliverables: ['Infinite Scroll Media Feed with Video', 'End-to-End Encrypted 1:1 & Group Chat', 'Creator Subscription & Tip Tipping Engine'],
    tech: ['Flutter', 'Go', 'WebSockets', 'AWS S3'],
    color: 'text-pink-600 bg-pink-50 border-pink-200',
  },
  {
    id: 10,
    name: 'Restaurant, Food & Cloud Kitchen',
    category: 'Retail & Commerce',
    icon: UtensilsCrossed,
    tagline: 'POS, KOT & Direct Ordering Web Apps',
    challenge: 'Direct commission-free ordering systems that cut out high delivery aggregator fees.',
    deliverables: ['QR Code Digital Dine-In Ordering', 'Kitchen Display System (KDS) for Chefs', 'Integrated Rider Tracking & Geofencing'],
    tech: ['React', 'Node.js', 'Firebase', 'Thermal Printers'],
    color: 'text-orange-600 bg-orange-50 border-orange-200',
  },
  {
    id: 11,
    name: 'SaaS Platforms & B2B Portals',
    category: 'Emerging Tech & IoT',
    icon: Layers,
    tagline: 'Multi-Tenant Cloud Architectures',
    challenge: 'Secure tenant data isolation, subscription billing, and role-based access control.',
    deliverables: ['Automated Stripe / Razorpay Subscriptions', 'Tenant DB Isolation Architecture', 'Comprehensive Audit Logs & SSO Integration'],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker/K8s'],
    color: 'text-violet-600 bg-violet-50 border-violet-200',
  },
  {
    id: 12,
    name: 'IoT & Smart Hardware Interfacing',
    category: 'Emerging Tech & IoT',
    icon: Cpu,
    tagline: 'MQTT Gateways & Industrial Dashboards',
    challenge: 'High-frequency telemetry data streams from remote sensors over 4G/2G SIM cards.',
    deliverables: ['MQTT Message Broker & TimescaleDB Schema', 'Live Interactive Sensor Telemetry Graph', 'Automated Threshold SMS & Siren Alarms'],
    tech: ['Python', 'MQTT', 'InfluxDB', 'React'],
    color: 'text-teal-600 bg-teal-50 border-teal-200',
  },
  {
    id: 13,
    name: 'Environmental, EVS & Solar Energy',
    category: 'Emerging Tech & IoT',
    icon: Trees,
    tagline: 'Solar Monitoring & Carbon Accounting',
    challenge: 'Parsing inverter MODBUS telemetry and generating governmental carbon credit reports.',
    deliverables: ['Solar Inverter Telemetry Live Logger', 'Carbon Footprint Computation Algorithm', 'State Grid Export / Invoicing Generator'],
    tech: ['Python', 'Angular', 'PostgreSQL', 'Grafana'],
    color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
  },
  {
    id: 14,
    name: 'News, Publishing & Digital Media',
    category: 'Retail & Commerce',
    icon: Newspaper,
    tagline: 'Fast CMS, Paywalls & Breaking Alerts',
    challenge: 'Google Core Web Vitals 95+ score under heavy Google News traffic spikes.',
    deliverables: ['Headless CMS with Instant Article AMP', 'Subscriber Paywall & Premium Audio Reader', 'Sub-Second Web Push Notification Dispatcher'],
    tech: ['Next.js', 'Laravel', 'Redis', 'Algolia'],
    color: 'text-slate-700 bg-slate-100 border-slate-300',
  },
  {
    id: 15,
    name: 'Entertainment, Media & OTT',
    category: 'All Verticals',
    icon: Radio,
    tagline: 'DRM Video Streaming & Live Events',
    challenge: 'Bandwidth-optimized HLS adaptive bitrate streaming with content piracy guards.',
    deliverables: ['Adaptive Bitrate (HLS/DASH) Video Player', 'Multi-DRM Widevine & FairPlay Security', 'Watch-Party Synchronized Live Chat'],
    tech: ['Flutter', 'Node.js', 'AWS CloudFront', 'HLS'],
    color: 'text-red-600 bg-red-50 border-red-200',
  },
  {
    id: 16,
    name: 'Matrimony & Community Platforms',
    category: 'All Verticals',
    icon: Heart,
    tagline: 'Verified Matchmaking & Profile Vaults',
    challenge: 'Strict photo privacy watermarking, government ID verification, and horoscope algos.',
    deliverables: ['Tamil & Vedic Horoscope Match Engine', 'Government ID & Selfie Face-Match Verification', 'Privacy-Locked Photo Viewer with Watermarks'],
    tech: ['React Native', 'Python', 'OpenCV', 'AWS Rekognition'],
    color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200',
  },
  {
    id: 17,
    name: 'Automotive & Vehicle Dealerships',
    category: 'Logistics & Mobility',
    icon: Truck,
    tagline: 'Vehicle Inventory & Service Booking',
    challenge: 'Tracking physical showroom inventory across multi-branch locations with live service updates.',
    deliverables: ['Branch Vehicle Inventory & Test Drive Booking', 'Workshop Job Card & Spares Inventory POS', 'Automated Service Reminder WhatsApp Bot'],
    tech: ['React', 'Laravel', 'MySQL', 'WhatsApp API'],
    color: 'text-blue-700 bg-blue-50 border-blue-300',
  },
  {
    id: 18,
    name: 'Drones, Robotics & Automation',
    category: 'Emerging Tech & IoT',
    icon: Cpu,
    tagline: 'Flight Pathing & Telemetry Control',
    challenge: 'Low-latency video relay and autonomous waypoint mission planning software.',
    deliverables: ['Ground Control Station (GCS) Desktop App', 'Live Video Stream RTSP Relay Portal', 'Automated Waypoint Mission Path Calculator'],
    tech: ['C++', 'Electron', 'Python', 'OpenCV'],
    color: 'text-indigo-700 bg-indigo-50 border-indigo-300',
  },
];

export default function IndustriesPage({ onNavigateHome, onNavigateToProposal }) {
  const [activeCategory, setActiveCategory] = useState('All Verticals');

  const filteredIndustries =
    activeCategory === 'All Verticals'
      ? ALL_INDUSTRIES
      : ALL_INDUSTRIES.filter((ind) => ind.category === activeCategory);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#f8fafc] text-slate-900 min-h-screen">
      
      {/* Top Breadcrumb & 2-Column Hero Showcase */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16">
        
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-blue-600 transition flex items-center gap-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-blue-600 font-bold">Industries</span>
        </nav>

        {/* 2-Column Hero: Left Text & Category Filters, Right 3D Ecosystem Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Domain Engineering • 18+ Industry Verticals</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.2]">
              Tailored Digital Platforms Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">18+ Core Industries</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              No two industries operate alike. We engineer bespoke software platforms tailored to the exact regulatory compliance frameworks, real-time data pipelines, hardware constraints, and user behaviors of your domain.
            </p>

            {/* Category Filter Tabs */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Filter by Industry Vertical:
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 border border-blue-500'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 shadow-sm'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 3D Ecosystem Illustration */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 border border-blue-100 shadow-xl shadow-blue-500/5 p-4 sm:p-5 relative overflow-hidden group">
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
                <img
                  src="/industries-ecosystem-3d.jpg"
                  alt="Creatah Industries Smart Ecosystem"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Badges */}
              <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-blue-100 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>HIPAA, RBI & GDPR Compliant</span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  18+ Domains Active
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Real Client Brands Strip */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Production Software Delivered Across Healthcare, Logistics, Automotive & Retail
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

      {/* Industries Grid (18 In-Depth Vertical Cards) */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((ind) => {
            const IconComponent = ind.icon;
            return (
              <div
                key={ind.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Icon & Tagline */}
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm ${ind.color} group-hover:scale-105 transition`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      #{ind.id < 10 ? `0${ind.id}` : ind.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {ind.name}
                    </h3>
                    <span className="text-xs font-semibold text-blue-600 block mt-0.5">
                      {ind.tagline}
                    </span>
                  </div>

                  {/* Challenge Box */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-900 block mb-0.5 text-[11px] uppercase tracking-wider">
                      Core Challenge Solved:
                    </strong>
                    {ind.challenge}
                  </div>

                  {/* Deliverables List */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Typical Custom Deliverables:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {ind.deliverables.map((del) => (
                        <li key={del} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Tech Tags & Action */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {ind.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onNavigateToProposal}
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <span>Discuss {ind.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-8 sm:p-10 shadow-xl shadow-blue-600/25 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Don&apos;t See Your Exact Industry Listed?
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              We specialize in custom first-principles engineering. If you have unique business workflows, we will build a tailored digital architecture for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToProposal}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md shadow-blue-900/20 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Consult With Us</span>
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
