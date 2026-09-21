import React, { useState, useRef } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Send,
  ShieldCheck,
  Clock,
  Search,
  ChevronDown,
  UploadCloud,
  FileText,
  Building2,
  Check,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  X,
  Lock,
  MessageSquare,
  Cpu,
  UserPlus
} from 'lucide-react';
import { submitLead } from '../services/leadService';
import { COUNTRY_CODES } from '../data/countryCodes';
import './RequestProposalPage.css';

const SERVICES_LIST = [
  'Android App Development',
  'iOS App Development',
  'Flutter App Development',
  'React Native App Development',
  'Web App Development',
  'Digital Marketing',
  'IT Staffing',
];

const STEPS = [
  {
    number: 'Step 1',
    title: 'Free Consultation with our Tech Gurus',
    description: 'Our tech experts will discuss your project and recommend the best technologies to use to make your vision a reality.',
    icon: MessageSquare,
    accentClass: 'step-accent-1',
  },
  {
    number: 'Step 2',
    title: 'Meet the Creatah Team',
    description: "We'll connect you with our development team. They'll explain how they'll bring your idea to life.",
    icon: Cpu,
    accentClass: 'step-accent-2',
  },
  {
    number: 'Step 3',
    title: 'Get Your Team on Board',
    description: 'Our developers can easily join your existing team and work together seamlessly.',
    icon: UserPlus,
    accentClass: 'step-accent-3',
  },
];

export default function RequestProposalPage({ onNavigateHome }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // India (+91)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedServices, setSelectedServices] = useState(['Android App Development']);
  const [helpDetails, setHelpDetails] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  const toggleService = (service) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((s) => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

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

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachedFile(e.dataTransfer.files[0]);
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
    if (!phone || phone.length !== selectedCountry.digits) {
      setPhoneError(`${selectedCountry.digits}-digit number required`);
      return;
    }

    setLoading(true);

    try {
      await submitLead({
        name,
        email,
        company,
        phone: `${selectedCountry.code} ${phone}`,
        service: selectedServices.join(', '),
        budget: selectedBudget,
        timeline: selectedTimeline,
        message: helpDetails,
        form_type: 'proposal_request',
      });
    } catch (err) {
      console.error('Proposal submit error:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setSelectedServices(['Android App Development']);
    setHelpDetails('');
    setAttachedFile(null);
    setPhoneError('');
  };

  return (
    <div className="proposal-page">
      
      {/* Top Breadcrumbs & Page Intro */}
      <div className="proposal-container">
        <nav className="proposal-breadcrumbs">
          <button onClick={onNavigateHome} className="breadcrumbs-btn">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span className="breadcrumbs-separator">/</span>
          <span className="breadcrumbs-current">Request a Proposal</span>
        </nav>

        <div className="proposal-header-row">
          <div>
            <div className="proposal-top-badge">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Technical Consultation</span>
            </div>
            <h1 className="proposal-main-title">
              Request a Proposal
            </h1>
          </div>
          <p className="proposal-header-desc">
            Partner with Chennai&apos;s leading software engineering firm. Transform your business vision into scalable, enterprise-grade digital products.
          </p>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="proposal-container">
        <div className="proposal-grid">
          
          {/* ================= LEFT COLUMN: "We'll be in touch!" & 3 Steps ================= */}
          <div className="proposal-left-col">
            
            {/* Introductory Header */}
            <div className="steps-intro">
              <span className="steps-badge">Fast Turnaround</span>
              <h2 className="steps-heading">
                We&apos;ll be in touch!
              </h2>
              <p className="steps-desc">
                We&apos;ll reach out to you within 24 hours to chat more about your project. In the meantime, here&apos;s a quick idea of what happens next:
              </p>
            </div>

            {/* 3 Steps Timeline Cards */}
            <div className="steps-stack">
              {STEPS.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.number} className="step-card">
                    <div className="step-card-content">
                      <div className={`step-icon-outer ${step.accentClass}`}>
                        <div className="step-icon-inner">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="step-text-wrap">
                        <span className="step-badge-pill">{step.number}</span>
                        <h3 className="step-card-title">{step.title}</h3>
                        <p className="step-card-desc">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Contact Card */}
            <div className="direct-contact-card">
              <h4 className="direct-contact-title">
                Prefer Immediate Communication?
              </h4>
              <div className="direct-contact-list">
                <a href="tel:+918838229241" className="contact-row">
                  <div className="contact-icon-box icon-box-blue">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="contact-meta">
                    <span className="contact-meta-label">Call our direct line</span>
                    <strong className="contact-meta-val">+91 88 3822 9241</strong>
                  </div>
                </a>

                <a href="mailto:sales@creatah.com" className="contact-row">
                  <div className="contact-icon-box icon-box-purple">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="contact-meta">
                    <span className="contact-meta-label">Email our proposal desk</span>
                    <strong className="contact-meta-val">sales@creatah.com</strong>
                  </div>
                </a>

                <div className="contact-row">
                  <div className="contact-icon-box icon-box-emerald">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="contact-meta">
                    <span className="contact-meta-label">Creatah Global Delivery Centre</span>
                    <span className="contact-meta-val" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                      Velachery, Chennai, Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>

              <div className="direct-contact-footer">
                <div className="trust-item">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% In-House Team</span>
                </div>
                <div className="trust-item">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>24-Hour SLA</span>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: "Request a Proposal" Form (WHITE BACKGROUND) ================= */}
          <div className="proposal-right-col">
            <div className="proposal-form-card">
              
              {/* Subtle top ambient glow */}
              <div className="form-ambient-glow" />

              {submitted ? (
                /* Success Confirmation State */
                <div className="form-success-wrapper">
                  <div className="success-check-badge">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="success-title">
                      Proposal Request Received!
                    </h3>
                    <p className="success-subtitle">
                      Thank you, <strong>{name || 'Partner'}</strong>. Our tech gurus are reviewing your requirements and will reach out to you within 24 hours.
                    </p>
                  </div>

                  {/* Submission Recap Card */}
                  <div className="success-summary-box">
                    <div className="summary-row">
                      <span className="summary-label">Company / Brand:</span>
                      <strong className="summary-val-dark">{company || 'Not Specified'}</strong>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Contact Email:</span>
                      <strong className="summary-val-blue">{email}</strong>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Phone:</span>
                      <strong className="summary-val-dark">{selectedCountry.code} {phone}</strong>
                    </div>
                    <div>
                      <span className="summary-label">Selected Services:</span>
                      <div className="summary-chips-wrap">
                        {selectedServices.map((s) => (
                          <span key={s} className="summary-service-tag">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    {attachedFile && (
                      <div className="summary-row" style={{ borderBottom: 'none', paddingTop: '0.25rem' }}>
                        <span className="summary-label">Attached Document:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#2563eb' }}>
                          <FileText className="w-3.5 h-3.5" />
                          <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {attachedFile.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="success-actions-row">
                    <button onClick={onNavigateHome} className="btn-return-home">
                      Return to Home
                    </button>
                    <button onClick={handleReset} className="btn-submit-another">
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Proposal Form */
                <form onSubmit={handleSubmit} className="proposal-actual-form">
                  
                  {/* Form Header */}
                  <div className="form-header-box">
                    <span className="form-badge-pill">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Request a Proposal.
                    </span>

                    <h2 className="form-heading-title">
                      Get in Touch to Discuss Your Project, Request a Quote
                    </h2>

                    {/* Career Page Notice */}
                    <p className="form-career-notice">
                      *To apply for a job, visit the{' '}
                      <a
                        href="/careers"
                        className="form-career-link"
                      >
                        career page.
                      </a>
                    </p>
                  </div>

                  {/* 1. Name and Business Email */}
                  <div className="form-row-2col">
                    <div className="form-field-group">
                      <label className="form-field-label">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s.]/g, ''))}
                        className="form-input-text"
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ramesh@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input-text"
                      />
                    </div>
                  </div>

                  {/* 2. *Tell us about your company:- */}
                  <div className="form-field-group">
                    <label className="form-field-label">
                      *Tell us about your company:- *
                    </label>
                    <div className="form-input-with-icon">
                      <Building2 className="w-4 h-4 form-input-icon" />
                      <input
                        type="text"
                        required
                        placeholder="Company name, industry, website, or organization"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="form-input-text"
                      />
                    </div>
                  </div>

                  {/* 3. Phone: 10-digit number required with country code */}
                  <div className="form-field-group">
                    <label className="form-field-label">
                      Phone: {selectedCountry.digits}-digit number required *
                    </label>

                    <div className="phone-input-combo">
                      {/* Country code selector button */}
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="country-select-btn"
                      >
                        <span className="phone-flag-text">{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <ChevronDown className="w-3.5 h-3.5" style={{ color: '#64748b' }} />
                      </button>

                      {/* Phone input */}
                      <input
                        type="tel"
                        required
                        placeholder={`${selectedCountry.digits} digits (e.g. 9876543210)`}
                        value={phone}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                        className="phone-text-input"
                      />
                    </div>

                    {phoneError && (
                      <span className="phone-error-msg">
                        {phoneError}
                      </span>
                    )}

                    {/* Country Picker Dropdown */}
                    {dropdownOpen && (
                      <div className="country-dropdown-card">
                        <div className="country-search-bar">
                          <div className="country-search-inner">
                            <Search className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="country-search-input"
                            />
                          </div>
                        </div>

                        <div className="country-scroll-list">
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
                              className={`country-option-row ${selectedCountry.code === c.code ? 'active' : ''}`}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>{c.flag}</span>
                                <span className="country-name-truncate">{c.name}</span>
                              </span>
                              <span style={{ color: '#64748b', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                                {c.code}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4. Choose Services (Multi-select) */}
                  <div className="form-field-group">
                    <div className="services-header-row">
                      <label className="form-field-label">
                        Choose Services *
                      </label>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        Select one or more
                      </span>
                    </div>

                    <div className="services-chips-wrap">
                      {SERVICES_LIST.map((srv) => {
                        const isSelected = selectedServices.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => toggleService(srv)}
                            className={`service-chip-btn ${isSelected ? 'selected' : ''}`}
                          >
                            <span>{srv}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" style={{ flexShrink: 0 }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5. How can we help you? */}
                  <div className="form-field-group">
                    <label className="form-field-label">
                      How can we help you? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please describe your project scope, timeline, requirements, target users, or key deliverables..."
                      value={helpDetails}
                      onChange={(e) => setHelpDetails(e.target.value)}
                      className="form-input-textarea"
                    />
                  </div>

                  {/* 6. Drag and drop or browse to upload your files */}
                  <div className="form-field-group">
                    <label className="form-field-label">
                      Attach Scope Document / RFP <span className="form-optional-tag">(optional)</span>
                    </label>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`file-upload-box ${isDragging ? 'dragging' : attachedFile ? 'attached' : ''}`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip"
                        style={{ display: 'none' }}
                      />

                      {attachedFile ? (
                        <div className="dropzone-attached-row">
                          <FileText className="w-5 h-5 text-emerald-600" style={{ flexShrink: 0 }} />
                          <div style={{ textAlign: 'left' }}>
                            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {attachedFile.name}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                              {(attachedFile.size / 1024 / 1024).toFixed(2)} MB • Click to change
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setAttachedFile(null);
                            }}
                            className="file-remove-btn"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="dropzone-empty">
                          <UploadCloud className="dropzone-icon" />
                          <p className="dropzone-title">
                            Drag and drop or browse to upload your files
                          </p>
                          <p className="dropzone-subtext">
                            PDF, DOC, DOCX, PPTX, or ZIP files (up to 25MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 7. *Your idea is 100% protected by our non disclosure agreement. */}
                  <div className="nda-badge-box">
                    <div className="nda-icon-box">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <p className="nda-text">
                      <strong className="nda-text-bold">*Your idea is 100% protected by our non disclosure agreement.</strong> We treat all project briefs and company IP with strict confidentiality.
                    </p>
                  </div>

                  {/* 8. Submit Proposal Button */}
                  <button type="submit" disabled={loading} className="submit-proposal-btn" style={loading ? { opacity: 0.6, cursor: 'not-allowed' } : {}}>
                    <span>{loading ? 'Submitting Proposal...' : 'Submit Proposal'}</span>
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
