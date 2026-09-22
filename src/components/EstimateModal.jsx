import React, { useState } from 'react';
import {
  X,
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
} from 'lucide-react';
import { submitLead } from '../services/leadService';
import { COUNTRY_CODES } from '../data/countryCodes';

const SERVICES = [
  'Android App Development',
  'iOS App Development',
  'Flutter App Development',
  'React Native App Development',
  'Web App Development',
  'Digital Marketing',
  'IT Staffing',
];

const BUDGET_RANGES = [
  '₹2 Lakhs – ₹5 Lakhs',
  '₹5 Lakhs – ₹15 Lakhs',
  '₹15 Lakhs – ₹30 Lakhs',
  '₹30 Lakhs+',
  'Flexible / Need Advice',
];

const TIMELINES = [
  'Immediate (< 1 month)',
  '1 – 3 Months',
  '3 – 6 Months',
  'Exploring / Planning',
];

export default function EstimateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // India (+91)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [company, setCompany] = useState('');
  const [selectedService, setSelectedService] = useState('Custom Software');
  const [selectedBudget, setSelectedBudget] = useState('₹5 Lakhs – ₹15 Lakhs');
  const [selectedTimeline, setSelectedTimeline] = useState('1 – 3 Months');
  const [projectDetails, setProjectDetails] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
      setPhoneError(`Enter ${selectedCountry.digits} digits for ${selectedCountry.name}`);
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (phone && phone.length !== selectedCountry.digits) {
      setPhoneError(`Enter ${selectedCountry.digits} digits for ${selectedCountry.name}`);
      return;
    }

    setLoading(true);

    try {
      const res = await submitLead({
        name,
        email,
        phone: phone ? `${selectedCountry.code} ${phone}` : '',
        company,
        service: selectedService,
        budget: selectedBudget,
        timeline: selectedTimeline,
        message: projectDetails,
        form_type: 'estimate_modal',
      });

      if (res && res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res?.error || 'Failed to submit estimate. Please verify the information entered.');
      }
    } catch (err) {
      console.error('Estimate submission error:', err);
      setErrorMessage(err?.message || 'Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setProjectDetails('');
    setAttachedFile(null);
    setPhoneError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92dvh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white px-4 py-3.5 sm:px-6 sm:py-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/25">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Request a Proposal
                </h3>
                <span className="hidden xs:inline-block text-[10px] uppercase font-extrabold bg-blue-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-blue-400/30">
                  Free Consultation
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Share your requirements & get an architectural roadmap within 24 hours.
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close Proposal Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {submitted ? (
            <div className="text-center py-8 sm:py-12 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                Proposal Request Received!
              </h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name || 'Partner'}</strong>. Our technical solutions team is reviewing your requirements for <strong>{selectedService}</strong>.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-xs text-slate-600 space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{selectedService}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Budget:</span>
                  <span className="font-bold text-slate-900">{selectedBudget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Target Timeline:</span>
                  <span className="font-bold text-slate-900">{selectedTimeline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Proposal Sent To:</span>
                  <span className="font-bold text-blue-600">{email}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                A dedicated solution architect will contact you within 24 business hours.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition min-h-[44px]"
              >
                Close & Continue Browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Which Service Do You Need? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES.map((srv) => {
                    const isSelected = selectedService === srv;
                    return (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => setSelectedService(srv)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-sm ring-1 ring-blue-600'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="truncate">{srv}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s.]/g, ''))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition"
                  />
                </div>
              </div>

              {/* Phone & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Phone with Country Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  
                  <div className="flex rounded-xl border border-slate-300 focus-within:border-blue-600 overflow-hidden bg-white">
                    {/* Country Code Trigger */}
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="px-2.5 py-2 bg-slate-50 border-r border-slate-200 flex items-center gap-1 text-xs font-bold text-slate-800 hover:bg-slate-100 transition shrink-0"
                    >
                      <span className="text-base">{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                      <ChevronDown className="w-3 h-3 text-slate-500" />
                    </button>

                    <input
                      type="tel"
                      required
                      placeholder={`${selectedCountry.digits} digits`}
                      value={phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      className="w-full px-3 py-2.5 text-sm text-slate-900 focus:outline-none"
                    />
                  </div>

                  {phoneError && (
                    <span className="text-[11px] text-rose-500 font-medium mt-1 block">
                      {phoneError}
                    </span>
                  )}

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-72 max-w-[calc(100vw-3.5rem)] max-h-56 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                      <div className="p-2 border-b border-slate-100 bg-slate-50">
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs">
                          <Search className="w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search country..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="w-full text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="overflow-y-auto max-h-40 py-1 text-xs">
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
                            className={`w-full px-3 py-1.5 flex items-center justify-between hover:bg-blue-50 text-left transition ${
                              selectedCountry.code === c.code ? 'bg-blue-50/60 font-bold' : ''
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span className="truncate max-w-[130px]">{c.name}</span>
                            </span>
                            <span className="text-slate-500 font-mono">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    *Tell us about your company:- *
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-blue-600 px-3 py-2 bg-white">
                    <Building2 className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. Acme Technologies"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full text-sm text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Budget & Timeline in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimated Budget *
                  </label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Timeline */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Timeline *
                  </label>
                  <select
                    value={selectedTimeline}
                    onChange={(e) => setSelectedTimeline(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
                  >
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Details Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tell Us About Your Project & Scope *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe what you want to build, key features, target audience, or any third-party systems..."
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition resize-none"
                />
              </div>

              {/* Optional RFP / Scope Document Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Attach Scope Document / RFP <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative border border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50 hover:bg-slate-100 transition">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                    <UploadCloud className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate max-w-[280px]">
                      {attachedFile ? attachedFile.name : 'Upload PDF, DOCX or Presentation (up to 25MB)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Strip */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col xs:flex-row items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>*Your idea is 100% protected by our non disclosure agreement.</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Direct reply within 24 business hours</span>
                </div>
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Submitting Proposal Request...' : 'Submit Proposal Request'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
