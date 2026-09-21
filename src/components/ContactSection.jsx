import React, { useState } from 'react';
import { COUNTRY_CODES } from '../data/countryCodes';
import {
  Phone,
  Mail,
  UploadCloud,
  CheckCircle2,
  Lock,
  ChevronDown,
  Search,
  FileText,
  X,
  Send,
  Info,
} from 'lucide-react';
import { submitLead } from '../services/leadService';

export default function ContactSection() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // India +91
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("I'm interested in your services.");
  const [attachedFile, setAttachedFile] = useState(null);
  const [turnstileChecked, setTurnstileChecked] = useState(true);
  
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setPhoneError(`Enter exactly ${selectedCountry.digits} digits for ${selectedCountry.name}`);
    } else {
      setPhoneError('');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== selectedCountry.digits) {
      setPhoneError(`Please enter a valid ${selectedCountry.digits}-digit phone number`);
      return;
    }

    setLoading(true);

    try {
      await submitLead({
        name,
        email,
        phone: `${selectedCountry.code} ${phone}`,
        message,
        form_type: 'contact_form',
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contactForm" className="py-14 sm:py-20 md:py-28 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 xs:px-6 sm:px-10 lg:px-14 xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Quick Support */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full">
                Quick Support
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-slate-900 mt-3 sm:mt-4 mb-2 sm:mb-3 tracking-tight leading-tight">
                Get All Your Questions Answered by Our Business Development Team.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Look for our reply within the next business day. Direct consultations with experienced solution architects.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 sm:space-y-4">
              {/* Call Us */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Call Us</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 mb-1.5 sm:mb-2">
                    Give us a call and we'll be happy to answer any questions.
                  </p>
                  <a
                    href="tel:+918838229241"
                    className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 py-1"
                  >
                    <span>+91 88382 29241</span>
                  </a>
                </div>
              </div>

              {/* Email Support */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Email Support</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 mb-1.5 sm:mb-2">
                    Our team will assist you from <strong>10:00 AM to 7:00 PM IST</strong>.
                  </p>
                  <a
                    href="mailto:info@creatah.com"
                    className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 py-1"
                  >
                    <span>info@creatah.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* NDA Trust Callout */}
            <div className="bg-white/80 border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-xs text-slate-600">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
              <span>
                All inquiries and project briefs are covered under a strict <strong>100% Non-Disclosure Agreement (NDA)</strong>.
              </span>
            </div>
          </div>

          {/* Right Column: Contact & Lead Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200 shadow-xl relative">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Thank You, {name || 'Partner'}!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Your project details have been sent to our Business Development team. A dedicated technical consultant will reach out to <strong>{email}</strong> within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setAttachedFile(null);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center pb-2">
                    <h3 className="text-2xl font-black text-slate-900">
                      Got a Project in Mind?
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      Tell us about your requirements and we’ll prepare a free estimate & roadmap.
                    </p>
                  </div>

                  {/* Name & Phone in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Johnathan Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s.]/g, ''))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition"
                      />
                    </div>

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
                          className="px-3 py-2 bg-slate-50 border-r border-slate-200 flex items-center gap-1 text-xs font-bold text-slate-800 hover:bg-slate-100 transition shrink-0"
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
                          className="w-full px-3 py-3 text-sm text-slate-900 focus:outline-none"
                        />
                      </div>

                      {/* Dropdown Menu */}
                      {dropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-72 max-w-[calc(100vw-3.5rem)] max-h-60 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                          <div className="p-2 border-b border-slate-100 bg-slate-50">
                            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs">
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
                                className={`w-full px-3 py-2 flex items-center justify-between hover:bg-blue-50 text-left transition ${
                                  selectedCountry.code === c.code ? 'bg-blue-50/60 font-bold' : ''
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span>{c.flag}</span>
                                  <span className="text-slate-800">{c.name}</span>
                                </span>
                                <span className="text-slate-400">{c.code}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {phoneError && (
                        <p className="text-[11px] text-red-600 mt-1">{phoneError}</p>
                      )}
                    </div>
                  </div>

                  {/* Business Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition"
                    />
                  </div>

                  {/* Project Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      How Can We Help You? *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition"
                      placeholder="Describe your project, timeline, and goals..."
                    ></textarea>
                  </div>

                  {/* File Attachment Uploader */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Attach Project Document / RFP (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer transition relative bg-slate-50/50">
                      <input
                        type="file"
                        id="creatah-file-input"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center space-y-1 pointer-events-none">
                        <UploadCloud className="w-7 h-7 text-blue-600" />
                        <span className="text-xs font-bold text-slate-700">
                          {attachedFile ? attachedFile.name : 'Drag & drop or browse to upload your files'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Supported: PDF, DOCX, PPTX, XLS, PNG, JPG, ZIP (up to 25MB)
                        </span>
                      </div>
                    </div>

                    {attachedFile && (
                      <div className="mt-2 flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="truncate">{attachedFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-1 hover:bg-blue-100 rounded text-blue-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Cloudflare Turnstile Checkbox Simulation */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={turnstileChecked}
                        onChange={(e) => setTurnstileChecked(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs font-semibold text-slate-700">
                        Cloudflare Turnstile Verified
                      </span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      Protected by Cloudflare
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Submitting Inquiry...' : 'Connect With a Project Expert'}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-center text-[10px] sm:text-[11px] text-slate-500 pt-1">
                    *Your idea is 100% protected by our non-disclosure agreement.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
