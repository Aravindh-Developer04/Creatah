import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileCode2,
  Palette,
  Code2,
  CheckCheck,
  Headphones,
  Check,
  Calendar,
  Layers,
  FileCheck,
  GitBranch,
  ShieldCheck,
  Clock,
  Laptop,
} from 'lucide-react';

const PHASES = [
  {
    step: 'Phase 01',
    duration: 'Week 1 – 2',
    name: 'Research, Discovery & Architectural Blueprinting',
    tagline: 'Measure Twice, Cut Once',
    description:
      'Before writing code, our technical architects conduct deep discovery sessions. We document your exact business logic, user personas, API integrations, and edge cases to eliminate costly mid-project redesigns.',
    deliverables: [
      'Detailed Software Requirements Specification (SRS)',
      'Cloud & System Architecture Diagram',
      'Database Entity Relationship Diagram (ERD)',
      'Sprint Milestone Timeline & Cost Schedule',
    ],
    activities: [
      'Stakeholder & product team interviews',
      'Third-party API & hardware compatibility audit',
      'Compliance & data privacy analysis (HIPAA, RBI, GDPR)',
      'Technical risk mitigation planning',
    ],
    icon: FileCode2,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    step: 'Phase 02',
    duration: 'Week 2 – 4',
    name: 'UI/UX Design & Clickable Interactive Prototypes',
    tagline: 'Intuitive, Modern & Conversion-Focused',
    description:
      'We design every screen, button, and user flow in Figma. You receive an interactive, clickable prototype that lets you test the exact look, feel, and navigation of your app before development begins.',
    deliverables: [
      'Low-Fidelity Wireframes & User Journey Flows',
      'Full High-Fidelity UI Mockups (Mobile & Web)',
      'Complete Brand Design System & Component Library',
      'Clickable Interactive Figma Prototype',
    ],
    activities: [
      'User journey & information architecture mapping',
      'Mobile-first responsive layout design',
      'Interactive design review & client feedback rounds',
      'Developer handoff with design tokens',
    ],
    icon: Palette,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  {
    step: 'Phase 03',
    duration: 'Sprint Cycles (2-Week Cadence)',
    name: 'Iterative Sprint Development & Working Builds',
    tagline: 'Tangible Progress Every Two Weeks',
    description:
      'Our dedicated in-house engineering team works in strict 2-week Agile sprints. At the end of every sprint, you receive a working build on our secure staging environment, complete with a live walkthrough demo.',
    deliverables: [
      'Working Staging Builds every 14 days',
      'Clean, Well-Documented Source Code in Git',
      'Scalable Backend REST / GraphQL APIs',
      'Intuitive Admin Dashboard & Back-Office',
    ],
    activities: [
      'Daily standup synchronizations',
      'Strict peer code reviews on every git pull request',
      'Automated unit & integration test suites',
      'Bi-weekly live demonstration call with your team',
    ],
    icon: Code2,
    color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
  },
  {
    step: 'Phase 04',
    duration: 'Pre-Launch Milestone',
    name: 'Rigorous QA, Security Audits & Production Release',
    tagline: 'Zero Compromise on Stability & Speed',
    description:
      'We subject your application to testing across dozens of real physical devices, operating systems, and network conditions. Once signed off, our DevOps engineers orchestrate a seamless, zero-downtime release.',
    deliverables: [
      'Comprehensive QA Test Sign-Off Report',
      'Vulnerability Scanning & Penetration Test Report',
      'Zero-Downtime Cloud Deployment (AWS / GCP)',
      'Google Play Store & Apple App Store Approvals',
    ],
    activities: [
      'Cross-browser & multi-device compatibility testing',
      'Load, stress, and concurrency benchmarking',
      'Payment gateway sandbox to live key migration',
      'Production SSL, CDN, and DNS configuration',
    ],
    icon: CheckCheck,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  {
    step: 'Phase 05',
    duration: 'Day 1 to Day 60+ (Standard)',
    name: '60-Day Free Warranty & Long-Term Scalability',
    tagline: 'We Don’t Disappear After Launch',
    description:
      'Unlike other agencies that charge for bug fixes right after launch, Creatah provides a complimentary 60-day warranty. We monitor real-time server telemetry, optimize database indexes, and ensure operational stability.',
    deliverables: [
      '60-Day Complimentary Bug-Fix Warranty',
      '24/7 Production Server & Database Monitoring',
      'Comprehensive Video Handover & Documentation',
      'Dedicated SLA Support & Evolution Retainer Option',
    ],
    activities: [
      'Real-time crash & error rate telemetry monitoring',
      'Database query optimization under real production traffic',
      'Client internal team training & knowledge transfer',
      'Quarterly performance & feature roadmap consultations',
    ],
    icon: Headphones,
    color: 'bg-amber-50 text-amber-600 border-amber-200',
  },
];

const DELIVERABLES_MATRIX = [
  { phase: 'Discovery', time: 'Weeks 1-2', output: 'SRS Spec, ERD, Architecture Blueprint', touchpoint: 'Weekly Discovery Call' },
  { phase: 'UI/UX Design', time: 'Weeks 2-4', output: 'Figma Prototype, Design Tokens, User Flows', touchpoint: 'Interactive Design Review' },
  { phase: 'Development', time: 'Bi-Weekly', output: 'Staging Builds, Git Commits, API Docs', touchpoint: 'Sprint Demo Every 14 Days' },
  { phase: 'QA & Launch', time: 'Final Sprints', output: 'Test Sign-Off, Live Deployment, Store Live', touchpoint: 'Go-Live Release Checklist' },
  { phase: 'Post-Launch', time: '60 Days Free', output: 'Telemetry Logs, Bug Warranty, Handoff Docs', touchpoint: 'Dedicated WhatsApp/Slack SLA' },
];

export default function ProcessPage({ onNavigateHome, onNavigateToProposal }) {
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
          <span className="text-blue-600 font-bold">Development Process</span>
        </nav>

        {/* 2-Column Hero: Left Text & CTAs, Right 3D Process Workflow Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Agile Engineering Cadence • Zero Surprises</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.2]">
              Our 5-Step Agile Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">Engineering Lifecycle</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              High-performance software is the result of disciplined engineering habits. From day one discovery to post-launch scaling, our proven 5-step methodology ensures your product ships on schedule, within fixed budget, and built to enterprise standard.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToProposal}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/25 hover:shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
              >
                <span>Start Discovery Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="#matrix"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('matrix')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl transition text-xs sm:text-sm shadow-sm"
              >
                <span>View Deliverables Matrix</span>
              </a>
            </div>

            {/* Quick Badges */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-y-2 gap-x-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>2-Week Staging Builds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Outsourcing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>60-Day Free Warranty</span>
              </div>
            </div>
          </div>

          {/* Right 3D Process Workflow Illustration Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 border border-blue-100 shadow-xl shadow-blue-500/5 p-4 sm:p-5 relative overflow-hidden group">
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
                <img
                  src="/process-flow-3d.jpg"
                  alt="Creatah Agile Software Engineering Process"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Badges */}
              <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-blue-100 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <span>Agile Sprint Delivery</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Working Build Every 14 Days
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 5 Detailed Process Cards (Clean White Cards) */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 space-y-6 sm:space-y-8 mb-20">
        {PHASES.map((p) => {
          const IconComponent = p.icon;
          return (
            <div
              key={p.step}
              className="p-6 sm:p-8 lg:p-9 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-lg relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                
                {/* Left Phase Info */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm ${p.color} group-hover:scale-105 transition shrink-0`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                        {p.step} • {p.duration}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                        {p.name}
                      </h3>
                    </div>
                  </div>

                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {p.tagline}
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Right Deliverables & Activities Breakdown */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Deliverables Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-blue-600" />
                      <span>Key Deliverables</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {p.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Activities Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <GitBranch className="w-4 h-4 text-indigo-600" />
                      <span>Core Activities</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {p.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Deliverables Matrix Table */}
      <div id="matrix" className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 scroll-mt-28">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="mb-6 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Accountability Matrix
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Phase-by-Phase Deliverables & Client Touchpoints
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3.5 font-bold text-slate-900 rounded-l-xl">Lifecycle Phase</th>
                  <th className="p-3.5 font-bold text-slate-900">Typical Timeline</th>
                  <th className="p-3.5 font-bold text-slate-900">Core Output Delivered</th>
                  <th className="p-3.5 font-bold text-slate-900 rounded-r-xl">Client Touchpoint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DELIVERABLES_MATRIX.map((row) => (
                  <tr key={row.phase} className="hover:bg-blue-50/40 transition">
                    <td className="p-3.5 font-bold text-slate-900">{row.phase}</td>
                    <td className="p-3.5 text-blue-600 font-semibold">{row.time}</td>
                    <td className="p-3.5 text-slate-700">{row.output}</td>
                    <td className="p-3.5 text-slate-600">{row.touchpoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Engineering Guarantees Strip */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">100% IP Ownership</h4>
            <p className="text-xs text-slate-600 leading-relaxed">All code, git branches, and schemas belong legally to you from day one.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-cyan-300 transition">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Fixed-Price Scoping</h4>
            <p className="text-xs text-slate-600 leading-relaxed">No surprise invoices. We scope thoroughly and honor agreed milestone costs.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-indigo-300 transition">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">2-Week Sprint Cadence</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Live staging builds every 14 days so you can test features continuously.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-amber-300 transition">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">60-Day Free Support</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Complimentary bug fixing, telemetry monitoring, and tuning post-launch.</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-8 sm:p-10 shadow-xl shadow-blue-600/25 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Experience Our Engineering Process Firsthand
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Schedule a discovery call with our technical architects to receive an SRS and architectural roadmap for your idea.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToProposal}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md shadow-blue-900/20 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Start Discovery Call</span>
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
