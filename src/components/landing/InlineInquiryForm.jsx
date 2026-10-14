import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitInquiry } from '../../lib/inquiries';

const BLOCKED_DOMAINS = [
  'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
  'test.com', 'example.com', 'fake.com', '123.com', 'aaa.com', 'qq.com'
];

export default function InlineInquiryForm({ pageCategory = 'SpO2', selectedModel = '', onResetSelectedModel }) {
  const [values, setValues] = useState({
    fullName: '',
    workEmail: '',
    targetModel: selectedModel || '',
    companyCountry: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (selectedModel) {
      setValues((v) => ({ ...v, targetModel: selectedModel }));
    }
  }, [selectedModel]);

  const validate = () => {
    const errs = {};
    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const emailTrimmed = values.workEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      errs.workEmail = 'Please enter a valid business email address.';
    } else {
      const domain = emailTrimmed.split('@')[1]?.toLowerCase();
      if (domain && BLOCKED_DOMAINS.includes(domain)) {
        errs.workEmail = 'Please provide a valid corporate or hospital work email address.';
      }
    }

    if (!values.targetModel.trim() || values.targetModel.trim().length < 2) {
      errs.targetModel = 'Please specify the monitor brand or cable model needed.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const fallbackRef = `MEDKE-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      let inquiryRef = fallbackRef;
      try {
        const res = await submitInquiry({
          name: values.fullName.trim(),
          email: values.workEmail.trim(),
          product_name: `[${pageCategory}] ${values.targetModel.trim()}`,
          company: values.companyCountry.trim() || undefined,
          message: values.message.trim() || `Inquiry for ${values.targetModel.trim()}`,
          inquiry_type: `Landing Page ${pageCategory} Direct Quote`
        });
        if (res && res.ref) {
          inquiryRef = res.ref;
        }
      } catch (err) {
        console.warn('Inquiry submit edge function notice:', err);
      }

      // Telemetry GTM trigger
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'form_submit_lead',
          lead_type: 'direct_factory_quote',
          category: pageCategory,
          target_model: values.targetModel,
          contact_name: values.fullName,
          ticket_id: inquiryRef,
          timestamp: new Date().toISOString()
        });
        console.log('[GTM] Event fired: form_submit_lead', inquiryRef);
      }

      setSubmittedData({
        ref: inquiryRef,
        email: values.workEmail,
        model: values.targetModel
      });
    } catch {
      setErrors({ form: 'An unexpected error occurred. Please try again or message our WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setValues({
      fullName: '',
      workEmail: '',
      targetModel: '',
      companyCountry: '',
      message: ''
    });
    setErrors({});
    if (onResetSelectedModel) onResetSelectedModel();
  };

  const waUrl = `https://wa.me/8615302654212?text=${encodeURIComponent(
    `Hello Medke, I need an urgent factory quote for ${values.targetModel || pageCategory} cables.`
  )}`;

  return (
    <section id="inquiry-form" className="py-16 bg-[#EDF2FE] scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Container with High-Focus Styling: 1:1 Matching Preview HTML */}
        <div id="form-card-container" className="bg-white rounded-2xl shadow-xl border-2 border-medkeNavy/20 overflow-hidden transition-all duration-300">
          
          {/* Gradient Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-medkeNavy via-medkeBlue to-emerald-500"></div>

          <div className="p-6 sm:p-10">
            
            {/* Form Header */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wide border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ⚡ Guaranteed 2.4-Hour Medical Engineering Response
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-medkeNavy mt-3">
                Request Direct Factory Pricing & Specifications
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Get tiered wholesale pricing, technical pinout diagrams, and free evaluation samples directly from our engineering sales team.
              </p>
            </div>

            {/* SUCCESS STATE */}
            {submittedData ? (
              <div className="p-6 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-center space-y-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-extrabold text-emerald-900">Inquiry Received Successfully!</h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Thank you for choosing Medke! Our medical accessories engineering team has received your request and will send official quotation & technical drawings to <strong>{submittedData.email}</strong> within <strong>2.4 hours</strong>.
                </p>
                <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-emerald-900 font-semibold">
                  <span>Reference Ticket: <strong className="font-mono">#{submittedData.ref}</strong></span>
                  <span>&bull;</span>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-medkeBlue underline">
                    Fast-track via WhatsApp Now &rarr;
                  </a>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-bold text-emerald-700 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* ACTUAL FORM */
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {errors.form && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errors.form}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Field 1: Full Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-medkeNavy uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      </div>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={values.fullName}
                        onChange={(e) => setValues({ ...values, fullName: e.target.value })}
                        placeholder="e.g. Dr. Alex Mercer / Sarah Jenkins"
                        className="w-full pl-9 pr-3 py-3 rounded-lg border border-slate-300 focus:border-medkeBlue focus:ring-2 focus:ring-medkeBlue/20 text-sm transition outline-none"
                      />
                    </div>
                    {errors.fullName ? (
                      <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1">Primary contact for engineering follow-up.</p>
                    )}
                  </div>

                  {/* Field 2: Work Email */}
                  <div>
                    <label htmlFor="work-email" className="block text-xs font-bold text-medkeNavy uppercase tracking-wider mb-1.5">
                      Business / Work Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                      </div>
                      <input
                        type="email"
                        id="work-email"
                        required
                        value={values.workEmail}
                        onChange={(e) => setValues({ ...values, workEmail: e.target.value })}
                        placeholder="purchasing@hospital-distributor.com"
                        className="w-full pl-9 pr-3 py-3 rounded-lg border border-slate-300 focus:border-medkeBlue focus:ring-2 focus:ring-medkeBlue/20 text-sm transition outline-none"
                      />
                    </div>
                    {errors.workEmail ? (
                      <p className="text-[11px] text-red-500 mt-1">{errors.workEmail}</p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1">Official tiered pricing & spec sheets sent here.</p>
                    )}
                  </div>

                  {/* Field 3: Target Brand / Equipment Model */}
                  <div>
                    <label htmlFor="target-model" className="block text-xs font-bold text-medkeNavy uppercase tracking-wider mb-1.5">
                      Target Brand / Equipment Model <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
                      </div>
                      <input
                        type="text"
                        id="target-model"
                        required
                        value={values.targetModel}
                        onChange={(e) => setValues({ ...values, targetModel: e.target.value })}
                        placeholder="e.g. Philips IntelliVue MP50, GE Dash 4000, or Mindray"
                        className="w-full pl-9 pr-3 py-3 rounded-lg border border-slate-300 focus:border-medkeBlue focus:ring-2 focus:ring-medkeBlue/20 text-sm transition outline-none"
                      />
                    </div>
                    {errors.targetModel ? (
                      <p className="text-[11px] text-red-500 mt-1">{errors.targetModel}</p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1">Auto-filled when clicking any brand row or product above.</p>
                    )}
                  </div>

                  {/* Field 4: Company / Organization / Country */}
                  <div>
                    <label htmlFor="company-name" className="block text-xs font-bold text-medkeNavy uppercase tracking-wider mb-1.5">
                      Company / Hospital / Country <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                      </div>
                      <input
                        type="text"
                        id="company-name"
                        value={values.companyCountry}
                        onChange={(e) => setValues({ ...values, companyCountry: e.target.value })}
                        placeholder="e.g. MedSupply Global / UAE / Germany"
                        className="w-full pl-9 pr-3 py-3 rounded-lg border border-slate-300 focus:border-medkeBlue focus:ring-2 focus:ring-medkeBlue/20 text-sm transition outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Helps calculate regional delivery time & tax rates.</p>
                  </div>

                </div>

                {/* Field 5: Message / Quantity */}
                <div>
                  <label htmlFor="inquiry-message" className="block text-xs font-bold text-medkeNavy uppercase tracking-wider mb-1.5">
                    Estimated Order Quantity & Specific Technical Requests (Optional)
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={3}
                    value={values.message}
                    onChange={(e) => setValues({ ...values, message: e.target.value })}
                    placeholder="e.g. Looking for 300 pcs reusable SpO2 sensors compatible with Philips M1191A. Need pricing tier (100 / 300 / 500 pcs) and sample testing to Dubai / Houston."
                    className="w-full p-3 rounded-lg border border-slate-300 focus:border-medkeBlue focus:ring-2 focus:ring-medkeBlue/20 text-sm transition outline-none"
                  ></textarea>
                </div>

                {/* Submit Action & WhatsApp Split: 1:1 Parallel Layout */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="submit"
                    id="submit-btn"
                    disabled={isSubmitting}
                    className="flex-1 py-4 px-6 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover text-white font-extrabold text-base shadow-glow-cta transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 text-white" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Submit Factory Quote Request 🚀</span>
                    )}
                  </button>

                  <div className="flex items-center justify-center sm:justify-start">
                    <span className="text-xs text-slate-400 px-2 hidden sm:inline">OR</span>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Micro-Trust Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    100% Privacy Protected &bull; NDA Available
                  </span>
                  <span>Direct Manufacturer Wholesale &bull; Zero Middleman Markups</span>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
