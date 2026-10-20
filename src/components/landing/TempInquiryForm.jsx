import React, { useState, useEffect, useRef } from 'react';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitInquiry } from '../../lib/inquiries';

const BLOCKED_DOMAINS = [
  'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
  'test.com', 'example.com', 'fake.com', '123.com', 'aaa.com', 'qq.com'
];

export default function TempInquiryForm({ prefillData, onResetPrefill }) {
  const [selectedPillars, setSelectedPillars] = useState([
    'Reusable Skin & Cavity Probes'
  ]);
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [monitorBrand, setMonitorBrand] = useState('Philips IntelliVue');
  const [quantity, setQuantity] = useState('50-200 pcs (Department Batch)');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const formStartedAt = useRef(Date.now());

  // Handle prefill from Compatibility Hub or Pillar Cards
  useEffect(() => {
    if (prefillData) {
      if (typeof prefillData === 'string') {
        // From Pillar card
        const lineName = prefillData;
        const addText = `Interested in: ${lineName}`;
        setNotes((prev) => (prev.includes(lineName) ? prev : prev ? `${prev}\n${addText}` : addText));

        if (lineName.includes('Reusable') && !selectedPillars.includes('Reusable Skin & Cavity Probes')) {
          setSelectedPillars((prev) => [...prev, 'Reusable Skin & Cavity Probes']);
        } else if (lineName.includes('Disposable') && !selectedPillars.includes('Disposable Infection-Control Probes')) {
          setSelectedPillars((prev) => [...prev, 'Disposable Infection-Control Probes']);
        } else if (lineName.includes('Adapter') && !selectedPillars.includes('Temperature Adapter Cables (T0)')) {
          setSelectedPillars((prev) => [...prev, 'Temperature Adapter Cables (T0)']);
        } else if (lineName.includes('TurboTemp') && !selectedPillars.includes('TurboTemp Rapid Predictive Probes')) {
          setSelectedPillars((prev) => [...prev, 'TurboTemp Rapid Predictive Probes']);
        }
      } else if (prefillData.sku) {
        // From Compatibility Hub
        const { sku, desc, monitorBrand: mb } = prefillData;
        const addText = `Requested Model: ${sku} (${desc})`;
        setNotes((prev) => (prev.includes(sku) ? prev : prev ? `${prev}\n${addText}` : addText));

        if (mb) {
          if (mb.includes('Philips')) setMonitorBrand('Philips IntelliVue');
          else if (mb.includes('GE')) setMonitorBrand('GE Healthcare');
          else if (mb.includes('Mindray')) setMonitorBrand('Mindray');
          else if (mb.includes('Dräger') || mb.includes('Drager')) setMonitorBrand('Dräger');
          else if (mb.includes('Welch Allyn')) setMonitorBrand('Welch Allyn');
          else if (mb.includes('YSI 400')) setMonitorBrand('YSI 400 Universal');
          else if (mb.includes('YSI 700')) setMonitorBrand('YSI 700 Series');
          else setMonitorBrand('Mixed Fleets / Multiple Brands');
        }
      }

      // Smooth scroll and pulse highlight
      if (typeof window !== 'undefined') {
        const rfqSection = document.getElementById('inquiry-form');
        if (rfqSection) {
          rfqSection.scrollIntoView({ behavior: 'smooth' });
        }
        const notesField = document.getElementById('rfqNotes');
        if (notesField) {
          notesField.classList.remove('highlight-focus');
          void notesField.offsetWidth;
          notesField.classList.add('highlight-focus');
          setTimeout(() => notesField.classList.remove('highlight-focus'), 2000);
        }
      }

      if (onResetPrefill) {
        onResetPrefill();
      }
    }
  }, [prefillData, onResetPrefill, selectedPillars]);

  const togglePillar = (val) => {
    setSelectedPillars((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
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

    if (phone.trim() && phone.trim().length < 5) {
      errs.phone = 'Please provide a valid contact phone or WhatsApp number.';
    }

    if (!company.trim() || company.trim().length < 2) {
      errs.company = 'Please enter your company or hospital name.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const compiledMessage = [
        `Product Line: Clinical Temperature Probes & Adapter Cables`,
        `Selected Pillars: ${selectedPillars.join(', ') || 'General Inquiries'}`,
        `Primary Patient Monitor Fleet: ${monitorBrand}`,
        `Estimated Order Scale: ${quantity}`,
        phone.trim() ? `Phone / WhatsApp: ${phone.trim()}` : '',
        company.trim() ? `Company / Hospital: ${company.trim()}` : '',
        notes.trim() ? `Specific Requirements: ${notes.trim()}` : ''
      ].filter(Boolean).join('\n');

      const payload = {
        name: fullName.trim(),
        email: workEmail.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        product_name: `[TEMP] Temperature Probes - ${monitorBrand}`,
        quantity_text: quantity,
        message: compiledMessage,
        inquiry_type: 'Landing Page TEMP Direct Quote'
      };

      const result = await submitInquiry(payload, {
        honeypotValue: honeypot,
        formStartedAt: formStartedAt.current
      });

      if (result.blocked) return;

      setSubmittedData({
        referenceId: result.ref,
        name: fullName,
        email: workEmail,
        company: company,
        monitorBrand: monitorBrand,
        quantity: quantity,
        selectedPillars: selectedPillars
      });
    } catch (err) {
      console.error('Failed to submit TEMP inquiry:', err);
      setErrors({ form: err.message || 'Unable to submit your inquiry. Please try again or contact us on WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFullName('');
    setWorkEmail('');
    setPhone('');
    setCompany('');
    setNotes('');
    setErrors({});
    setHoneypot('');
    formStartedAt.current = Date.now();
  };

  return (
    <section id="inquiry-form" className="py-16 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div id="form-card-container" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl transition-all duration-300">
          
          {submittedData ? (
            <div className="text-center py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Inquiry Confirmed: #{submittedData.referenceId}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight">
                  Thank you, {submittedData.name}!
                </h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Your clinical temperature probe RFQ has been received. Our clinical engineering and sales team will prepare formal tier pricing and compliance documentation for <strong>{submittedData.email}</strong> within 2.4 hours.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 max-w-md mx-auto text-left text-xs space-y-2 border border-slate-200">
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Target Fleet:</span>
                  <span className="font-bold text-slate-800">{submittedData.monitorBrand}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Order Scale:</span>
                  <span className="font-bold text-slate-800">{submittedData.quantity}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Company / Hospital:</span>
                  <span className="font-bold text-slate-800">{submittedData.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reference Ref:</span>
                  <span className="font-mono font-bold text-emerald-600">{submittedData.referenceId}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  Submit Another RFQ
                </button>
                <a
                  href={`https://wa.me/8615302654212?text=${encodeURIComponent(
                    `Hello Medke, I just submitted RFQ #${submittedData.referenceId} for ${submittedData.monitorBrand} temperature probes.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs font-extrabold tracking-widest uppercase text-medkeBlue block mb-1">
                  DIRECT FACTORY QUOTATION · OFFICIAL B2B RFQ PORTAL
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight">
                  Request Temperature Probe Wholesale Pricing
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Complete the form below to receive formal tier pricing, sample evaluation terms, and complete compliance dossiers within 2.4 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Anti-Fraud Honeypot Field */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    id="b2b_website_url_hp"
                    name="b2b_website_url_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {errors.form && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                    {errors.form}
                  </div>
                )}

                {/* Product Line Checkboxes (Multi-select, 4 Core Lines) */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2.5">
                    1. Select Temperature Product Lines Needed (Multiple Select):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-medkeBlue cursor-pointer transition bg-slate-50/50">
                      <input
                        type="checkbox"
                        checked={selectedPillars.includes('Reusable Skin & Cavity Probes')}
                        onChange={() => togglePillar('Reusable Skin & Cavity Probes')}
                        className="rounded text-medkeBlue focus:ring-medkeBlue w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-800">Reusable Skin &amp; Cavity Probes</span>
                    </label>
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-medkeBlue cursor-pointer transition bg-slate-50/50">
                      <input
                        type="checkbox"
                        checked={selectedPillars.includes('Disposable Infection-Control Probes')}
                        onChange={() => togglePillar('Disposable Infection-Control Probes')}
                        className="rounded text-medkeBlue focus:ring-medkeBlue w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-800">Disposable Infection-Control Probes</span>
                    </label>
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-medkeBlue cursor-pointer transition bg-slate-50/50">
                      <input
                        type="checkbox"
                        checked={selectedPillars.includes('Temperature Adapter Cables (T0)')}
                        onChange={() => togglePillar('Temperature Adapter Cables (T0)')}
                        className="rounded text-medkeBlue focus:ring-medkeBlue w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-800">Temperature Adapter Cables (T0)</span>
                    </label>
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-medkeBlue cursor-pointer transition bg-slate-50/50">
                      <input
                        type="checkbox"
                        checked={selectedPillars.includes('TurboTemp Rapid Predictive Probes')}
                        onChange={() => togglePillar('TurboTemp Rapid Predictive Probes')}
                        className="rounded text-medkeBlue focus:ring-medkeBlue w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-800">TurboTemp Rapid Predictive Probes</span>
                    </label>
                  </div>
                </div>

                {/* Contact Fields (2x2 Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      id="rfqName"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Robert Vance"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-medkeBlue transition ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                      Work Email (for official quote dispatch) *
                    </label>
                    <input
                      type="email"
                      id="rfqEmail"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="e.g. r.vance@medtech-supply.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-medkeBlue transition ${
                        errors.workEmail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.workEmail && <p className="text-[11px] text-rose-600 mt-1">{errors.workEmail}</p>}
                  </div>

                  <div>
                    {/* Phone / WhatsApp is strictly OPTIONAL */}
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      id="rfqPhone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +1 415 890 1234"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-medkeBlue transition ${
                        errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                      Hospital / Company Name *
                    </label>
                    <input
                      type="text"
                      id="rfqCompany"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Vanguard Health Systems / MedEquip B.V."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-medkeBlue transition ${
                        errors.company ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.company && <p className="text-[11px] text-rose-600 mt-1">{errors.company}</p>}
                  </div>
                </div>

                {/* Requirements Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                      Primary Monitor Brand / Fleet
                    </label>
                    <select
                      id="rfqMonitorBrand"
                      value={monitorBrand}
                      onChange={(e) => setMonitorBrand(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-medkeBlue bg-white cursor-pointer"
                    >
                      <option value="Philips IntelliVue">Philips (IntelliVue MP/MX series)</option>
                      <option value="GE Healthcare">GE Healthcare (Marquette, Dash, Carescape)</option>
                      <option value="Mindray">Mindray (BeneView, ePM, iPM, PM series)</option>
                      <option value="Dräger">Dräger (Infinity Delta / Kappa / Vista)</option>
                      <option value="Welch Allyn">Welch Allyn (SureTemp Plus 690 / 679)</option>
                      <option value="YSI 400 Universal">YSI 400 Universal (2.252 kΩ Jack)</option>
                      <option value="YSI 700 Series">YSI 700 Series (Dual Banana Plug)</option>
                      <option value="Mixed Fleets / Multiple Brands">Multiple Brands / General Distributor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                      Estimated Order Scale
                    </label>
                    <select
                      id="rfqQty"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-medkeBlue bg-white cursor-pointer"
                    >
                      <option value="10-50 pcs (Sample Evaluation)">10 – 50 pcs (Sample Evaluation)</option>
                      <option value="50-200 pcs (Department Batch)">50 – 200 pcs (Department Batch)</option>
                      <option value="200-500 pcs (Hospital Fleet)">200 – 500 pcs (Hospital Fleet Contract)</option>
                      <option value="500-2,000 pcs (Tender / Wholesale)">500 – 2,000 pcs (Regional Distribution)</option>
                      <option value="2,000+ pcs (OEM Contract)">2,000+ pcs (OEM Annual Schedule)</option>
                    </select>
                  </div>
                </div>

                {/* Notes Textarea */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                    Specific Model Numbers, OEM Cross-References, or Custom Requests
                  </label>
                  <textarea
                    id="rfqNotes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Need quotation for 200 pcs T2305 (Philips cavity), 500 pcs T5106 (disposable skin), and 50 pcs T7125 (GE TurboTemp oral). Please provide FOB pricing and CE/FDA documentation."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-medkeBlue transition"
                  />
                </div>

                {/* Side-by-Side Dual Submit Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover disabled:opacity-60 text-white font-bold text-sm sm:text-base shadow-glow-cta transition hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting RFQ...</span>
                      </>
                    ) : (
                      <span>Submit RFQ for Official Quote 🚀</span>
                    )}
                  </button>
                  <a
                    href="https://wa.me/8615302654212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:w-auto py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-sm transition hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
                    <span>Instant WhatsApp Chat 💬</span>
                  </a>
                </div>

                {/* Privacy and Anti-Spam Reassurance */}
                <p className="text-[11px] text-slate-400 text-center pt-2">
                  🔒 Your hospital and procurement contact details are protected under ISO 27001 data governance. We strictly protect commercial confidentiality and never share inquiries with third parties.
                </p>
              </form>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
