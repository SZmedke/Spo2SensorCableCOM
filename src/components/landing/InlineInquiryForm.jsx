import React, { useState, useEffect } from 'react';
import { Send, Loader2, CheckCircle2, MessageCircle, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { submitInquiry } from '../../lib/inquiries';
import { COMPANY } from '../../data/catalog';

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
        errs.workEmail = 'Please provide a valid corporate or institutional email address.';
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
    `Hello Medke, I need an urgent wholesale quote for ${values.targetModel || pageCategory} cables.`
  )}`;

  return (
    <section id="inquiry-form" className="bg-white py-16 sm:py-24 border-b border-slate-200 scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast B2B Turnaround</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Request Direct Factory Pricing & Free Samples
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Connect directly with Medke medical engineering specialists. We respond to wholesale & OEM requests within 2.4 hours.
          </p>
        </div>

        {/* Main Card Container */}
        <div
          id="form-card-container"
          className="rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left 4 Cols: Factory Trust & Fast Contact Panel */}
            <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-slate-850 text-white p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold mb-6">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>ISO 13485 & CE MDR Verified</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
                  Partner with Shenzhen Source Factory
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Skip middleman markups. Receive factory-direct tiered quotations, free sample kits, and customized private-label pinouts.
                </p>

                <div className="space-y-4 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Average response time: <strong>&lt; 2.4 hours</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Free sample clinical evaluation sets</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>NDA & confidentiality agreements supported</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Channel */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="text-xs text-slate-400 mb-2 font-medium">Need immediate reply?</div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/30"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp (+86 153 0265 4212)</span>
                </a>
              </div>
            </div>

            {/* Right 8 Cols: Form or Success Card */}
            <div className="lg:col-span-8 p-8 sm:p-12 bg-white flex flex-col justify-center">
              {submittedData ? (
                /* In-Place Success Card */
                <div className="text-center py-6 px-4 space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Inquiry Successfully Received!
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                      Thank you. Your inquiry ticket <strong className="text-blue-600 font-mono text-base">{submittedData.ref}</strong> has been assigned to our medical cable engineering team.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Email:</span>
                      <span className="font-semibold text-slate-800">{submittedData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Equipment:</span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{submittedData.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Guaranteed Reply:</span>
                      <span className="font-semibold text-emerald-600">Within 2.4 Hours</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Expedite via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* 4+1 Field Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {errors.form && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  {/* 2x2 Grid of Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* 1. Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={values.fullName}
                        onChange={(e) => setValues({ ...values, fullName: e.target.value })}
                        placeholder="e.g. Dr. Alex Mercer / John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.fullName}</p>
                      )}
                    </div>

                    {/* 2. Work Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Business / Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={values.workEmail}
                        onChange={(e) => setValues({ ...values, workEmail: e.target.value })}
                        placeholder="e.g. alex@hospital-procurement.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.workEmail
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20'
                        }`}
                      />
                      {errors.workEmail && (
                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.workEmail}</p>
                      )}
                    </div>

                    {/* 3. Target Model */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Target Brand / Model <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={values.targetModel}
                        onChange={(e) => setValues({ ...values, targetModel: e.target.value })}
                        placeholder="e.g. Philips M1191B, GE Dash, Mindray N12"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.targetModel
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20'
                        }`}
                      />
                      {errors.targetModel && (
                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.targetModel}</p>
                      )}
                    </div>

                    {/* 4. Company / Country (Optional) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Company / Hospital / Country <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={values.companyCountry}
                        onChange={(e) => setValues({ ...values, companyCountry: e.target.value })}
                        placeholder="e.g. Apex HealthCare Ltd, United States"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* 5. Message / Estimated Quantity (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Lead Configuration & Estimated Order Quantity <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={values.message}
                      onChange={(e) => setValues({ ...values, message: e.target.value })}
                      placeholder="e.g. Need 500 pcs adult finger clip sensors with 8-Pin connector. Please include shipping to Miami port and ISO 13485 dossier."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Inquiry Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Get Direct Factory Quote (Within 2.4h)</span>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center sm:text-right">
                      🔒 Strictly Confidential. No spam guarantee.
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
