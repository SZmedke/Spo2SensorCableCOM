import React, { useState, useEffect, useRef } from 'react';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitInquiry } from '../../lib/inquiries';

const BLOCKED_DOMAINS = [
  'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
  'test.com', 'example.com', 'fake.com', '123.com', 'aaa.com', 'qq.com'
];

export default function EsuInquiryForm({ prefillData, onResetPrefill }) {
  const [selectedInterests, setSelectedInterests] = useState([
    'Grounding Pads & Return Cables'
  ]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const formStartedAt = useRef(Date.now());
  const messageInputRef = useRef(null);

  useEffect(() => {
    if (prefillData) {
      if (typeof prefillData === 'string') {
        const item = prefillData;
        setMessage((prev) => (prev.includes(item) ? prev : prev ? `${prev}\nInterested in: ${item}` : `Interested in: ${item}`));
        if (item.includes('Grounding') || item.includes('Pad')) {
          setSelectedInterests((prev) => Array.from(new Set([...prev, 'Grounding Pads & Return Cables'])));
        } else if (item.includes('Bipolar') || item.includes('Cable')) {
          setSelectedInterests((prev) => Array.from(new Set([...prev, 'Bipolar Cables'])));
        } else if (item.includes('Plate')) {
          setSelectedInterests((prev) => Array.from(new Set([...prev, 'Reusable Patient Plates'])));
        } else {
          setSelectedInterests((prev) => Array.from(new Set([...prev, 'Complementary OR Supply'])));
        }
      } else if (prefillData.sku || prefillData.message) {
        const { interest, message: msgText } = prefillData;
        if (interest) {
          setSelectedInterests((prev) => Array.from(new Set([...prev, interest])));
        }
        if (msgText) {
          setMessage((prev) => (prev.includes(msgText) ? prev : prev ? `${prev}\n${msgText}` : msgText));
        }
      }

      if (messageInputRef.current) {
        messageInputRef.current.classList.add('highlight-focus');
        setTimeout(() => {
          if (messageInputRef.current) {
            messageInputRef.current.classList.remove('highlight-focus');
          }
        }, 1600);
      }

      if (onResetPrefill) onResetPrefill();
    }
  }, [prefillData, onResetPrefill]);

  const toggleInterest = (val) => {
    setSelectedInterests((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errs.email = 'Business email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errs.email = 'Please enter a valid email address.';
      } else {
        const domain = trimmedEmail.split('@')[1]?.toLowerCase();
        if (domain && BLOCKED_DOMAINS.includes(domain)) {
          errs.email = 'Please provide a valid corporate or hospital work email.';
        }
      }
    }

    if (selectedInterests.length === 0) {
      errs.interests = 'Please select at least one product interest.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    // Honeypot & timing checks
    if (honeypot || Date.now() - formStartedAt.current < 2500) {
      return;
    }

    setIsSubmitting(true);

    try {
      const compiledMessage = [
        `Selected Interests: ${selectedInterests.join(', ')}`,
        country ? `Country/Market: ${country}` : '',
        phone ? `Phone/WhatsApp: ${phone}` : '',
        company ? `Company: ${company}` : '',
        message ? `Requirements / Notes: ${message}` : ''
      ].filter(Boolean).join('\n');

      const payload = {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        product_name: `[ESU] Electrosurgical Accessories - ${selectedInterests.join(' / ')}`,
        quantity_text: 'B2B RFQ Inquiry',
        message: compiledMessage,
        inquiry_type: 'Landing Page ESU Direct Quote'
      };

      const result = await submitInquiry(payload, {
        honeypotValue: honeypot,
        formStartedAt: formStartedAt.current
      });

      if (result.blocked) return;

      setSubmittedData({
        referenceId: result.ref,
        name: fullName,
        email: email,
        company: company,
        country: country,
        selectedInterests: selectedInterests
      });
    } catch (err) {
      console.error('Failed to submit ESU inquiry:', err);
      setErrors({ form: err.message || 'Unable to submit your inquiry. Please try again or contact us on WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFullName('');
    setEmail('');
    setCompany('');
    setCountry('');
    setPhone('');
    setMessage('');
    setErrors({});
    setHoneypot('');
    formStartedAt.current = Date.now();
  };

  return (
    <section id="inquiry-form" className="py-16 lg:py-20 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="form-card-container" className="rounded-3xl bg-gradient-to-br from-medkeNavy to-[#17245F] shadow-2xl overflow-hidden transition-all duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: B2B RFQ Portal Meta */}
            <div className="lg:col-span-4 p-7 sm:p-9 text-white relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -left-20 -bottom-20 w-56 h-56 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
              
              <div className="relative">
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                  B2B compatibility RFQ portal
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-3 text-white">
                  Get a Port-Matched Quote
                </h2>
                <p className="text-blue-100/85 text-sm leading-relaxed mt-3">
                  Send the generator model, port photo, current cable reference and target quantity. Engineering review precedes sample confirmation.
                </p>

                <div className="space-y-3 mt-7 text-sm">
                  <div className="flex gap-2">
                    <span className="text-emerald-300 font-bold">✓</span>
                    <span>Compatibility review within 24–48 hours</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-300 font-bold">✓</span>
                    <span>MOQ from 10 pcs for reusable cables</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-300 font-bold">✓</span>
                    <span>12-month reusable product warranty</span>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 pt-4">
                <a
                  href="https://wa.me/8615302654212?text=Hello%20Medke%2C%20I%20would%20like%20to%20inquire%20about%20ESU%20grounding%20pads%20and%20bipolar%20cables."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#159447] hover:bg-[#11783A] text-white font-bold border border-emerald-300/40 shadow-lg transition-colors cursor-pointer"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  <span>Chat on WhatsApp +86 15302654212</span>
                </a>
              </div>
            </div>

            {/* Right Column: Form Container */}
            <div className="lg:col-span-8 bg-white p-7 sm:p-9">
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
                      Your ESU interconnect RFQ has been received. Our clinical engineering team will review connector geometry and prepare formal wholesale tier pricing for <strong>{submittedData.email}</strong> within 24 hours.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 max-w-md mx-auto text-left text-xs space-y-2 border border-slate-200">
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500">Products:</span>
                      <span className="font-bold text-slate-800">{submittedData.selectedInterests.join(', ')}</span>
                    </div>
                    {submittedData.company && (
                      <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                        <span className="text-slate-500">Company:</span>
                        <span className="font-bold text-slate-800">{submittedData.company}</span>
                      </div>
                    )}
                    {submittedData.country && (
                      <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                        <span className="text-slate-500">Target Market:</span>
                        <span className="font-bold text-slate-800">{submittedData.country}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-0.5">
                      <span className="text-slate-500">Confirmation Sent To:</span>
                      <span className="font-bold text-medkeBlue">{submittedData.email}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  
                  {/* Step 1: Select product interest */}
                  <fieldset>
                    <legend className="text-sm font-bold text-medkeNavy">
                      1. Select product interest
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {[
                        'Grounding Pads & Return Cables',
                        'Bipolar Cables',
                        'Reusable Patient Plates',
                        'Complementary OR Supply'
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-medkeBlue cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedInterests.includes(item)}
                            onChange={() => toggleInterest(item)}
                            className="accent-blue-600 w-4 h-4 rounded"
                          />
                          <span className="text-sm font-semibold text-slate-800">{item}</span>
                        </label>
                      ))}
                    </div>
                    {errors.interests && (
                      <p className="text-xs text-rose-500 mt-1">{errors.interests}</p>
                    )}
                  </fieldset>

                  {/* Step 2: Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div>
                      <label className="text-xs font-bold text-slate-600 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="mt-1.5 w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-medkeBlue text-sm font-normal"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 block">
                        Business email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="mt-1.5 w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-medkeBlue text-sm font-normal"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 block">
                        Company <span className="font-normal text-slate-400">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company name"
                        className="mt-1.5 w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-medkeBlue text-sm font-normal"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 block">
                        Country / market <span className="font-normal text-slate-400">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="e.g. Germany"
                        className="mt-1.5 w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-medkeBlue text-sm font-normal"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-600 block">
                        Phone / WhatsApp <span className="font-normal text-slate-400">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone or WhatsApp number"
                        className="mt-1.5 w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-medkeBlue text-sm font-normal"
                      />
                    </div>
                  </div>

                  {/* Requirements / Notes Textarea */}
                  <div className="mt-4">
                    <label className="text-xs font-bold text-slate-600 block">
                      Generator model, port and quantity <span className="font-normal text-slate-400">(Optional)</span>
                    </label>
                    <textarea
                      ref={messageInputRef}
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Generator brand/model, port photo availability, existing OEM P/N, instrument-side connector and target quantity..."
                      className="mt-1.5 w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-medkeBlue text-sm font-normal resize-y transition-all"
                    />
                  </div>

                  {/* Anti-fraud honeypot */}
                  <input
                    type="text"
                    name="b2b_website_url_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex="-1"
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {errors.form && (
                    <div className="mt-4 p-3 rounded-xl text-sm font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                      {errors.form}
                    </div>
                  )}

                  {/* Single High-Focus Submit Button */}
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3.5 rounded-xl bg-medkeBlue hover:bg-medkeBlueHover disabled:opacity-60 text-white font-bold shadow-glow-cta flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Verifying & Sending RFQ...</span>
                        </>
                      ) : (
                        <span>Submit Port-Matched RFQ ⚡</span>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 leading-relaxed text-center">
                    🔒 Protected under ISO 27001 data governance. Your procurement specifications and commercial inquiries are strictly confidential.
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
