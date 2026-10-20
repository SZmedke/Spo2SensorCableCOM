import React, { useState, useEffect, useRef } from 'react';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitInquiry } from '../../lib/inquiries';

const BLOCKED_DOMAINS = [
  'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
  'test.com', 'example.com', 'fake.com', '123.com', 'aaa.com', 'qq.com'
];

export default function EegInquiryForm({ selectedModel = '', prefillBrand = '', onResetSelectedModel }) {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(['Casted Golden Cups', 'Casted Ag/AgCl Cups']);
  const [brand, setBrand] = useState('Natus / Grass / Nicolet');
  const [quantity, setQuantity] = useState('Wholesale Batch (50 - 200 Sets)');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const formStartedAt = useRef(Date.now());

  // When model is prefilled from cards or table
  useEffect(() => {
    if (selectedModel) {
      if (selectedModel.includes('Golden')) {
        setSelectedProducts((prev) => Array.from(new Set([...prev, 'Casted Golden Cups'])));
      } else if (selectedModel.includes('Ag/AgCl')) {
        setSelectedProducts((prev) => Array.from(new Set([...prev, 'Casted Ag/AgCl Cups'])));
      } else if (selectedModel.includes('Silver')) {
        setSelectedProducts((prev) => Array.from(new Set([...prev, 'Pure Silver Cups'])));
      } else if (selectedModel.includes('Snap') || selectedModel.includes('Pinch')) {
        setSelectedProducts((prev) => Array.from(new Set([...prev, 'Snap Leads', 'Pinch Leads'])));
      } else if (selectedModel.includes('Pin') || selectedModel.includes('Needle')) {
        setSelectedProducts((prev) => Array.from(new Set([...prev, 'Pin Adapter Jumpers'])));
      } else if (selectedModel.includes('Alligator')) {
        setSelectedProducts((prev) => Array.from(new Set([...prev, 'Alligator Red Boot'])));
      }
      setNotes((prev) => prev ? `${prev}\n[Inquiry Model]: ${selectedModel}` : `[Inquiry Model]: ${selectedModel}`);
    }
  }, [selectedModel]);

  useEffect(() => {
    if (prefillBrand) {
      if (prefillBrand.toLowerCase().includes('natus') || prefillBrand.toLowerCase().includes('grass')) {
        setBrand('Natus / Grass / Nicolet');
      } else if (prefillBrand.toLowerCase().includes('nihon')) {
        setBrand('Nihon Kohden');
      } else if (prefillBrand.toLowerCase().includes('cadwell')) {
        setBrand('Cadwell (Easy III / Arc)');
      } else if (prefillBrand.toLowerCase().includes('compumedics')) {
        setBrand('Compumedics (Grael / PSG)');
      } else if (prefillBrand.toLowerCase().includes('philips')) {
        setBrand('Philips Respironics Alice');
      }
    }
  }, [prefillBrand]);

  const handleCheckboxChange = (value) => {
    setSelectedProducts((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const validate = () => {
    const errs = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name / contact person.';
    }

    const emailTrimmed = workEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      errs.workEmail = 'Please provide a valid work or hospital email address.';
    } else {
      const domain = emailTrimmed.split('@')[1]?.toLowerCase();
      if (domain && BLOCKED_DOMAINS.includes(domain)) {
        errs.workEmail = 'Please provide a valid corporate or hospital work email address.';
      }
    }

    if (selectedProducts.length === 0) {
      errs.products = 'Please select at least one EEG product line.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRfqSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const productsString = selectedProducts.join(', ');

    const compiledMessage = [
      `Product Lines Needed: ${productsString}`,
      `Target EEG Brand: ${brand}`,
      `Estimated Quantity: ${quantity}`,
      country.trim() ? `Destination Country/Port: ${country.trim()}` : '',
      notes.trim() ? `Specific Requirements: ${notes.trim()}` : ''
    ].filter(Boolean).join('\n');

    try {
      const res = await submitInquiry({
        name: fullName.trim(),
        email: workEmail.trim(),
        product_name: `[EEG] ${productsString}`,
        company: company.trim() || undefined,
        country: country.trim() || undefined,
        quantity_text: quantity,
        message: compiledMessage,
        inquiry_type: 'Landing Page EEG Direct Quote'
      }, { honeypotValue: honeypot, formStartedAt: formStartedAt.current });

      if (res.blocked) return;

      setSubmittedData({
        ref: res.ref,
        email: workEmail.trim(),
        products: productsString
      });
    } catch (err) {
      setErrors({ form: err.message || 'An unexpected error occurred. Please try again or chat with our engineering sales team on WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_whatsapp',
        placement: 'eeg_inquiry_form',
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <section id="inquiry-form" className="py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 bg-[#E8EBF7] text-[#243181] font-bold text-xs uppercase tracking-wider rounded mb-2">
            Direct B2B Procurement Portal
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#243181] tracking-tight">
            Request Factory Quotation &amp; Free Evaluation Samples
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Receive tiered wholesale pricing, technical engineering datasheets, and sample evaluation availability within 2.4 hours.
          </p>
        </div>

        {/* Centered Wide Single Card */}
        <div id="form-card-container" className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-card-subtle border border-slate-200 relative overflow-hidden transition-all duration-300">
          
          {/* Decorative Header Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#243181] via-[#0047FF] to-emerald-500 absolute top-0 left-0"></div>

          {submittedData ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#243181]">
                RFQ Inquiry Received Successfully!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Thank you for your inquiry. Your inquiry ticket reference is{' '}
                <span className="font-mono font-bold text-[#0047FF]">{submittedData.ref}</span>.
                Our clinical engineering sales team will dispatch your customized quotation and specifications to{' '}
                <span className="font-semibold text-slate-900">{submittedData.email}</span> within 2.4 hours.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedData(null);
                    setHoneypot('');
                    formStartedAt.current = Date.now();
                    if (onResetSelectedModel) onResetSelectedModel();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
                <a
                  href={`https://wa.me/8615302654212?text=Hello%20Medke,%20I%20just%20submitted%20an%20inquiry%20(Ref:%20${submittedData.ref})%20for%20EEG%20cables.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  Fast-Track on WhatsApp &rarr;
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRfqSubmit} className="space-y-6">
              <input
                type="text"
                name="b2b_website_url_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
              />
              
              {/* Contact Person Name & Business Email (Row 1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name / Contact Person <span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Thomas Mueller"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-[#0047FF] focus:ring-[#0047FF]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Business Email <span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@hospital-or-company.com"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.workEmail ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-[#0047FF] focus:ring-[#0047FF]'
                    }`}
                  />
                  {errors.workEmail && <p className="text-[11px] text-red-600 mt-1">{errors.workEmail}</p>}
                </div>
              </div>

              {/* 1. Select EEG Product Lines Needed (Multiple Select Checkboxes) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select EEG Product Lines Needed (Multiple Select):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {[
                    { label: 'Golden Cups (4 styles)', value: 'Casted Golden Cups' },
                    { label: 'Ag/AgCl Cups (<3mV)', value: 'Casted Ag/AgCl Cups' },
                    { label: 'Pure Silver (99.9%)', value: 'Pure Silver Cups' },
                    { label: 'Snap Leads (4.0mm)', value: 'Snap Leads' },
                    { label: 'Pinch / Grabber', value: 'Pinch Leads' },
                    { label: 'Pin Adapter Jumpers', value: 'Pin Adapter Jumpers' },
                    { label: 'Alligator (Red Boot)', value: 'Alligator Red Boot' },
                    { label: 'Custom OEM / ODM', value: 'Custom OEM / ODM' }
                  ].map((p) => {
                    const isChecked = selectedProducts.includes(p.value);
                    return (
                      <label
                        key={p.value}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                          isChecked
                            ? 'border-[#0047FF] bg-blue-50/50 text-[#243181]'
                            : 'border-slate-200 hover:border-[#0047FF]/40 bg-slate-50/50 hover:bg-blue-50/30 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(p.value)}
                          className="rounded text-[#0047FF] focus:ring-[#0047FF]"
                        />
                        <span className="font-medium">{p.label}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.products && <p className="text-[11px] text-red-600 mt-1">{errors.products}</p>}
              </div>

              {/* 2. Target Brand & 3. Quantity (Row 3) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    2. Target EEG System / Headbox Brand:
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#0047FF] focus:ring-1 focus:ring-[#0047FF] bg-white cursor-pointer"
                  >
                    <option value="Natus / Grass / Nicolet">Natus / Grass / Nicolet</option>
                    <option value="Nihon Kohden">Nihon Kohden</option>
                    <option value="Cadwell (Easy III / Arc)">Cadwell (Easy III / Arc)</option>
                    <option value="Compumedics (Grael / PSG)">Compumedics (Grael / PSG)</option>
                    <option value="Philips Respironics Alice">Philips Respironics Alice</option>
                    <option value="Standard 1.5mm DIN 42802 Universal">Standard 1.5mm DIN 42802 Universal</option>
                    <option value="Other / Custom EEG Brand">Other / Custom EEG Brand</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    3. Estimated Order Quantity / Sets:
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#0047FF] focus:ring-1 focus:ring-[#0047FF] bg-white cursor-pointer"
                  >
                    <option value="Sample Order (1 - 5 Sets for Evaluation)">Sample Order (1 - 5 Sets for Evaluation)</option>
                    <option value="Small Batch (10 - 50 Sets)">Small Batch (10 - 50 Sets)</option>
                    <option value="Wholesale Batch (50 - 200 Sets)">Wholesale Batch (50 - 200 Sets)</option>
                    <option value="Hospital Fleet / OEM (> 500 Sets)">Hospital Fleet / OEM (&gt; 500 Sets)</option>
                  </select>
                </div>
              </div>

              {/* Company Name & Destination Country (Row 4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Hospital Organization:
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Charité Hospital / MedTech GmbH"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#0047FF] focus:ring-1 focus:ring-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Destination Country / Port:
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Germany / Mexico / United States"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#0047FF] focus:ring-1 focus:ring-[#0047FF]"
                  />
                </div>
              </div>

              {/* Specific Requirements & Notes (Row 5) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Specific Specifications / Lead Length / Customization:
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Request 50 sets of E0001-B (10-color) 1.5m and 30 sets of Casted Ag/AgCl cups with evaluation samples..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#0047FF] focus:ring-1 focus:ring-[#0047FF]"
                />
              </div>

              {errors.form && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {errors.form}
                </div>
              )}

              {/* Side-by-Side Dual Action Buttons: Submit Quote Request + Chat on WhatsApp */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 px-6 rounded-xl bg-[#0047FF] hover:bg-[#0038CC] disabled:opacity-70 text-white font-extrabold text-base shadow-glow-cta transition hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Submit Factory Quote Request 🚀</span>
                  )}
                </button>

                <div className="flex items-center justify-center sm:justify-start">
                  <span className="text-xs text-slate-400 px-3 hidden sm:inline font-bold">OR</span>
                  <a
                    href="https://wa.me/8615302654212?text=Hello%20Medke,%20I%20am%20inquiring%20about%20EEG%20cables%20and%20electrodes."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition hover:-translate-y-0.5 cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Micro-Trust Reassurance Footer */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Strict Commercial Confidentiality &amp; NDA Protection
                </span>
                <span>Direct Manufacturer Wholesale &bull; Zero Middleman Markups</span>
                <span>Official RFQ Mailbox: contact@medke.com</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
