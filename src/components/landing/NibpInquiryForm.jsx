import React, { useState, useEffect, useRef } from 'react';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitInquiry } from '../../lib/inquiries';

const BLOCKED_DOMAINS = [
  'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
  'test.com', 'example.com', 'fake.com', '123.com', 'aaa.com', 'qq.com'
];

export default function NibpInquiryForm({ selectedProduct = '', prefillBrand = '', prefillCode = '', onResetSelected }) {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(['Reusable PU Bladderless Cuffs (C6)']);
  const [brand, setBrand] = useState('Philips IntelliVue / SureSigns');
  const [quantity, setQuantity] = useState('Wholesale Batch (500 - 2,000 pcs)');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const formStartedAt = useRef(Date.now());

  // When product or code is prefilled from other sections
  useEffect(() => {
    if (selectedProduct) {
      setSelectedProducts((prev) => Array.from(new Set([...prev, selectedProduct])));
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (prefillCode) {
      setNotes((prev) => prev ? `${prev}\n[Inquiry Model / Code]: ${prefillCode}` : `[Inquiry Model / Code]: ${prefillCode}`);
    }
  }, [prefillCode]);

  useEffect(() => {
    if (prefillBrand) {
      const lower = prefillBrand.toLowerCase();
      if (lower.includes('philips')) {
        setBrand('Philips IntelliVue / SureSigns');
      } else if (lower.includes('ge') || lower.includes('dinamap') || lower.includes('marquette')) {
        setBrand('GE Healthcare Dinamap / Carescape');
      } else if (lower.includes('mindray')) {
        setBrand('Mindray BeneVision / ePM / uMEC');
      } else if (lower.includes('welch')) {
        setBrand('Welch Allyn FlexiPort / Connex');
      } else if (lower.includes('dräger') || lower.includes('drager')) {
        setBrand('Dräger Infinity Delta / Vista');
      } else if (lower.includes('colin') || lower.includes('omron')) {
        setBrand('Colin / Omron BP Series');
      } else if (lower.includes('nihon')) {
        setBrand('Nihon Kohden Life Scope Series');
      } else if (lower.includes('nicu') || lower.includes('neonatal')) {
        setBrand('Universal NICU Miniature Luer');
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
      errs.products = 'Please select at least one NIBP product line.';
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
      `Target Patient Monitor / Connector Brand: ${brand}`,
      `Estimated Order Quantity: ${quantity}`,
      country.trim() ? `Destination Country/Port: ${country.trim()}` : '',
      notes.trim() ? `Specific Requirements: ${notes.trim()}` : ''
    ].filter(Boolean).join('\n');

    try {
      const res = await submitInquiry({
        name: fullName.trim(),
        email: workEmail.trim(),
        product_name: `[NIBP] ${productsString}`,
        company: company.trim() || undefined,
        country: country.trim() || undefined,
        quantity_text: quantity,
        message: compiledMessage,
        inquiry_type: 'Landing Page NIBP Direct Quote'
      }, { honeypotValue: honeypot, formStartedAt: formStartedAt.current });

      if (res.blocked) return;

      setSubmittedData({
        ref: res.ref,
        name: fullName.trim(),
        email: workEmail.trim(),
        products: productsString,
        brand: brand
      });
    } catch (err) {
      console.error('Submission failed:', err);
      setErrors({ form: err.message || 'Unable to submit your inquiry. Please try again or contact us on WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry-form" className="py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 bg-medkeSoft text-medkeNavy font-bold text-xs uppercase tracking-wider rounded mb-2">
            Direct B2B Procurement Portal
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-medkeNavy tracking-tight">
            Request Factory Wholesale Quotation &amp; Free Evaluation Samples
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Receive tiered manufacturer pricing, technical engineering datasheets, and sample evaluation availability within 2.4 hours.
          </p>
        </div>

        {/* Centered Wide Single Card */}
        <div id="form-card-container" className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-card-subtle border border-slate-200 relative overflow-hidden">
          
          {/* Decorative Header Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-medkeNavy via-medkeBlue to-emerald-500 absolute top-0 left-0"></div>

          {submittedData ? (
            /* Success Feedback Card */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                  RFQ Reference: {submittedData.ref}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-medkeNavy">
                  Quotation Request Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto">
                  Thank you, <strong>{submittedData.name}</strong>. Our senior international medical sales engineering team will review your specifications and email you factory direct wholesale pricing at <span className="font-mono text-medkeNavy font-bold">{submittedData.email}</span> within 2.4 hours.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Inquired Lines:</span>
                  <span className="font-bold text-slate-800 text-right">{submittedData.products}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target System:</span>
                  <span className="font-bold text-slate-800">{submittedData.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Response SLA:</span>
                  <span className="font-bold text-emerald-600">&lt; 2.4 Business Hours</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/8615302654212?text=Hello%20Medke,%20I%20have%20submitted%20RFQ%20${submittedData.ref}%20for%20NIBP%20cuffs.%20Please%20expedite%20pricing.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <span>Chat on WhatsApp for Expedited Quote 💬</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedData(null);
                    setHoneypot('');
                    formStartedAt.current = Date.now();
                    if (onResetSelected) onResetSelected();
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
                >
                  Submit Another Inquiry
                </button>
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
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Thomas Mueller"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue ${
                      errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
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
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@hospital-or-company.com"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue ${
                      errors.workEmail ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.workEmail && <p className="text-[11px] text-red-600 mt-1">{errors.workEmail}</p>}
                </div>
              </div>

              {/* 1. Select NIBP Product Lines Needed (Multiple Select Checkboxes) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select NIBP Product Lines Needed (Multiple Select):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {[
                    { val: 'Disposable Series (Neonate/Animal/Standard)', label: 'Disposable (Neo/Animal/Std)' },
                    { val: 'Reusable PU Bladderless Cuffs (C6)', label: 'Reusable PU Cuffs (C6)' },
                    { val: 'Reusable Classic Nylon Cuffs (C1/C2)', label: 'Nylon Cuffs (C1/C2)' },
                    { val: 'Sphygmomanometer Fabric Cuffs (D-Ring)', label: 'Sphygmomanometer Cuffs' },
                    { val: 'Ambulatory BP Monitor Cuffs (ABPM)', label: 'ABPM 24h Cuffs' },
                    { val: 'TPU NIBP Adapter Hoses (Single/Dual)', label: 'TPU Adapter Hoses' },
                    { val: 'Quick-Fit Air Connectors (30+ Models)', label: 'Air Connectors (30+)' },
                    { val: 'Custom OEM / Private-Label Manufacturing', label: 'Custom OEM / ODM' }
                  ].map((item) => {
                    const isChecked = selectedProducts.includes(item.val);
                    return (
                      <label
                        key={item.val}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                          isChecked
                            ? 'border-medkeBlue bg-blue-50/50 text-medkeNavy font-bold'
                            : 'border-slate-200 hover:border-medkeBlue/40 bg-slate-50/50 hover:bg-blue-50/30 text-slate-700 font-medium'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(item.val)}
                          className="rounded text-medkeBlue focus:ring-medkeBlue cursor-pointer"
                        />
                        <span className="text-[11px] sm:text-xs leading-tight">{item.label}</span>
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
                    2. Target Patient Monitor Brand / Connector:
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue bg-white cursor-pointer"
                  >
                    <option value="Philips IntelliVue / SureSigns">Philips IntelliVue / SureSigns</option>
                    <option value="GE Healthcare Dinamap / Carescape">GE Healthcare Dinamap / Carescape</option>
                    <option value="Mindray BeneVision / ePM / uMEC">Mindray BeneVision / ePM / uMEC</option>
                    <option value="Welch Allyn FlexiPort / Connex">Welch Allyn FlexiPort / Connex</option>
                    <option value="Dräger Infinity Delta / Vista">Dräger Infinity Delta / Vista</option>
                    <option value="Colin / Omron BP Series">Colin / Omron BP Series</option>
                    <option value="Nihon Kohden Life Scope Series">Nihon Kohden Life Scope Series</option>
                    <option value="Universal NICU Miniature Luer">Universal NICU Miniature Luer</option>
                    <option value="Other / Multiple Monitor Brands">Other / Multiple Monitor Brands</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    3. Estimated Order Quantity / Sets:
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue bg-white cursor-pointer"
                  >
                    <option value="Sample Order (1 - 5 Sets for Evaluation)">Evaluation Sample (1 - 5 pcs for Testing)</option>
                    <option value="Trial Batch (50 - 200 pcs)">Trial Batch (50 - 200 pcs)</option>
                    <option value="Wholesale Batch (500 - 2,000 pcs)">Standard Order (500 - 2,000 pcs)</option>
                    <option value="Hospital Fleet / Container (5,000+ pcs)">Container / Hospital Tender (5,000+ pcs)</option>
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
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue"
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
                    placeholder="e.g. Germany / Saudi Arabia / Mexico / USA"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue"
                  />
                </div>
              </div>

              {/* Specific Requirements & Notes (Row 5) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Specific Requirements / Connector Code / Tube Length:
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="e.g. Inquiring 200 pcs of C6711 Adult PU Cuffs with CB10 connectors, 50 pcs of TPU 3.0m dual hoses for GE Dinamap..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue"
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
                  className="flex-1 py-4 px-6 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white font-extrabold text-base shadow-glow-cta transition hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting Inquiry Dossier...</span>
                    </>
                  ) : (
                    <span>Submit Factory Quote Request 🚀</span>
                  )}
                </button>

                <div className="flex items-center justify-center sm:justify-start">
                  <span className="text-xs text-slate-400 px-3 hidden sm:inline font-bold">OR</span>
                  <a
                    href="https://wa.me/8615302654212?text=Hello%20Medke,%20I%20am%20inquiring%20about%20NIBP%20cuffs,%20hoses,%20and%20connectors."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition hover:-translate-y-0.5 cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
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
