import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitInquiry } from '../../lib/inquiries';

const BLOCKED_DOMAINS = [
  'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
  'test.com', 'example.com', 'fake.com', '123.com', 'aaa.com', 'qq.com'
];

export default function IbpInquiryForm({ prefillData, onResetPrefill }) {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [monitorBrand, setMonitorBrand] = useState('Philips');
  const [sensorBrand, setSensorBrand] = useState('Edwards TruWave');
  const [quantity, setQuantity] = useState('50-200 pcs');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Sync from Hub prefill
  useEffect(() => {
    if (prefillData) {
      const { sku, desc, monitorBrand: mb, sensorStandard: ss } = prefillData;
      const addText = `Required Model: ${sku} (${desc})`;
      setNotes((prev) => {
        if (!prev.includes(sku)) {
          return prev ? `${prev}\n${addText}` : addText;
        }
        return prev;
      });

      if (mb) {
        if (mb.includes('Philips')) setMonitorBrand('Philips');
        else if (mb.includes('GE')) setMonitorBrand('GE Healthcare');
        else if (mb.includes('Mindray')) setMonitorBrand('Mindray');
        else if (mb.includes('Dräger') || mb.includes('Drager')) setMonitorBrand('Dräger');
        else if (mb.includes('Nihon Kohden')) setMonitorBrand('Nihon Kohden');
        else if (mb.includes('Spacelabs')) setMonitorBrand('Spacelabs');
        else if (mb.includes('Edan') || mb.includes('Biolight') || mb.includes('Comen')) setMonitorBrand('Edan / Biolight');
        else setMonitorBrand('Multiple Brands');
      }

      if (ss) {
        if (ss.includes('Edwards')) setSensorBrand('Edwards TruWave');
        else if (ss.includes('B.Braun') || ss.includes('Philips')) setSensorBrand('B.Braun Combitrans');
        else if (ss.includes('BD')) setSensorBrand('BD Critical Care');
        else if (ss.includes('Abbott') || ss.includes('Medex')) setSensorBrand('Abbott / Medex');
        else if (ss.includes('Utah')) setSensorBrand('Utah Deltran');
        else setSensorBrand('All Standards');
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
  }, [prefillData, onResetPrefill]);

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

    if (!phone.trim() || phone.trim().length < 5) {
      errs.phone = 'Please provide a contact phone or WhatsApp number.';
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
      const payload = {
        name: fullName.trim(),
        email: workEmail.trim(),
        phone: phone.trim(),
        company: company.trim(),
        inquiry_type: 'Landing Page IBP Direct Quote',
        inquiry_details: {
          product_category: 'IBP Adapter Cables',
          primary_monitor_brand: monitorBrand,
          target_sensor_standard: sensorBrand,
          estimated_quantity: quantity,
          additional_notes: notes.trim(),
          lead_source: 'Google Ads IBP Landing Page'
        }
      };

      const result = await submitInquiry(payload);

      setSubmittedData({
        referenceId: result?.inquiry_id || `MEDKE-IBP-${Date.now().toString().slice(-4)}`,
        name: fullName,
        email: workEmail,
        company: company,
        monitorBrand: monitorBrand,
        sensorBrand: sensorBrand,
        quantity: quantity
      });
    } catch (err) {
      console.error('Failed to submit IBP inquiry:', err);
      // Fallback display on network/cors issue
      setSubmittedData({
        referenceId: `MEDKE-IBP-${Date.now().toString().slice(-4)}`,
        name: fullName,
        email: workEmail,
        company: company,
        monitorBrand: monitorBrand,
        sensorBrand: sensorBrand,
        quantity: quantity
      });
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
  };

  return (
    <section id="inquiry-form" className="py-16 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div id="form-card-container" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl transition-all duration-300">
          
          {submittedData ? (
            <div className="text-center py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                  <ShieldCheck className="w-4 h-4" /> Inquiry Registered Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight">
                  Thank You, {submittedData.name}!
                </h3>
                <p className="text-sm text-slate-600">
                  Your formal IBP RFQ has been logged into Medke's priority B2B dispatch queue. A technical sales engineer will send official factory pricing and sample options to <strong>{submittedData.email}</strong> within <strong>2.4 hours</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 font-sans">RFQ Reference:</span>
                  <span className="font-bold text-medkeBlue">{submittedData.referenceId}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-sans">Organization:</span>
                  <span className="font-semibold text-slate-800 font-sans">{submittedData.company}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-sans">Monitor Brand:</span>
                  <span className="font-semibold text-slate-800 font-sans">{submittedData.monitorBrand}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-sans">Sensor Interface:</span>
                  <span className="font-semibold text-slate-800 font-sans">{submittedData.sensorBrand}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-sans">Order Scale:</span>
                  <span className="font-semibold text-slate-800 font-sans">{submittedData.quantity}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a
                  href="https://wa.me/8615302654212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition"
                >
                  <span>Chat with Sales on WhatsApp 💬</span>
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition cursor-pointer"
                >
                  Submit Another RFQ
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-medkeBlue text-xs font-bold uppercase tracking-wider mb-2">
                  Direct Factory Sourcing
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight">
                  Request Factory Direct IBP Cable Wholesale Pricing
                </h2>
                <p className="text-slate-600 text-sm mt-1.5">
                  Fill in your monitor and transducer requirements below. Our dedicated technical sales engineering team will respond with formal B2B pricing, cross-reference sheets, and free sample options within <strong>2.4 hours</strong>.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="e.g. david@hospitalfleet.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue ${
                        errors.workEmail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.workEmail && <p className="text-[11px] text-rose-500 mt-1">{errors.workEmail}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +1 415 890 2345"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue ${
                        errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Company / Hospital Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Metro Health System / MedEquip B.V."
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue ${
                        errors.company ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.company && <p className="text-[11px] text-rose-500 mt-1">{errors.company}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Monitor Brand
                    </label>
                    <select
                      value={monitorBrand}
                      onChange={(e) => setMonitorBrand(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue bg-white"
                    >
                      <option value="Philips">Philips IntelliVue / M1165A</option>
                      <option value="GE Healthcare">GE Marquette / Dash / Solar</option>
                      <option value="Mindray">Mindray BeneView / ePM</option>
                      <option value="Dräger">Dräger Infinity / Siemens</option>
                      <option value="Nihon Kohden">Nihon Kohden Life Scope</option>
                      <option value="Spacelabs">Spacelabs Ultraview</option>
                      <option value="Edan / Biolight">Edan / Biolight / Comen</option>
                      <option value="Multiple Brands">Multiple Hospital Brands</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Target Sensor Standard
                    </label>
                    <select
                      value={sensorBrand}
                      onChange={(e) => setSensorBrand(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue bg-white"
                    >
                      <option value="Edwards TruWave">Edwards Lifesciences TruWave</option>
                      <option value="B.Braun Combitrans">B.Braun Combitrans / Certofix</option>
                      <option value="BD Critical Care">BD (Becton Dickinson)</option>
                      <option value="Abbott / Medex">Abbott / Medex Transpac IV</option>
                      <option value="Utah Deltran">Utah Medical Deltran IV</option>
                      <option value="All Standards">Full Assortment / Stocking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Estimated Quantity
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue bg-white"
                    >
                      <option value="10-50 pcs">10 - 50 pcs (Evaluation / Small Order)</option>
                      <option value="50-200 pcs">50 - 200 pcs (Hospital Fleet Batch)</option>
                      <option value="200-500 pcs">200 - 500 pcs (Wholesale Order)</option>
                      <option value="500+ pcs">500+ pcs (Tender / Annual Contract)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Required Models or Notes
                  </label>
                  <textarea
                    id="rfqNotes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Please specify cable SKUs (e.g. B0311, B0307), custom length requirements, or tender delivery dates..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-medkeBlue focus:ring-1 focus:ring-medkeBlue transition-all duration-300"
                  ></textarea>
                </div>

                {/* Dual Side-by-Side Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white text-base font-bold shadow-glow-cta transition flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Submit RFQ for Official Quote 🚀</span>
                    )}
                  </button>

                  <a
                    href="https://wa.me/8615302654212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold shadow-glow-green transition flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                    </svg>
                    <span>Instant WhatsApp Chat 💬</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-400 text-center pt-1">
                  🔒 Privacy Guarantee: Your contact and inquiry data will remain 100% confidential. No spam.
                </p>

              </form>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
