import React, { useEffect, useRef, useState } from 'react';
import { X, Download, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { submitInquiry } from '../../lib/inquiries';

const BLOCKED_DOMAINS = [
  'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
  'test.com', 'example.com', 'fake.com', '123.com', 'aaa.com', 'qq.com'
];

export default function LeadBrochureModal({
  isOpen,
  onClose,
  title = '2026 Medke Medical Cable Catalog',
  subtitle = 'Instant download: Full cross-reference index, pinout diagrams, biocompatibility certificates, and tiered OEM price sheets.',
  badge = 'Complete Engineering E-Brochure (472+ SKUs)',
  pdfUrl = '/docs/Medke-Brochure-2026.pdf',
  downloadFilename = 'Medke_2026_Medical_Cable_Brochure.pdf',
  assetName = 'Medke Brochure 2026 (PDF)',
  fileSize = '20.8 MB'
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const formStartedAt = useRef(Date.now());

  useEffect(() => {
    if (isOpen) {
      formStartedAt.current = Date.now();
      setHoneypot('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerDownload = () => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      setError('Please provide a valid corporate or work email address.');
      return;
    }

    const domain = trimmed.split('@')[1]?.toLowerCase();
    if (domain && BLOCKED_DOMAINS.includes(domain)) {
      setError('Please provide a valid corporate or hospital work email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // 1. Submit lead to Supabase & trigger email notification to contact@medke.com
    try {
      const sourcePage = typeof window !== 'undefined' ? window.location.pathname : 'Landing Page';
      const result = await submitInquiry({
        name: 'Brochure Downloader',
        email: trimmed,
        product_name: assetName,
        company: 'Website E-Catalog Visitor',
        inquiry_type: 'E-Catalog Download',
        message: `Visitor requested and downloaded ${assetName} (${fileSize}) from ${sourcePage}. Please follow up with technical catalog and pricing.`
      }, {
        skipDataLayer: true,
        honeypotValue: honeypot,
        formStartedAt: formStartedAt.current
      });
      if (result.blocked) {
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      setError(err.message || 'Unable to verify this download request. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // 2. Trigger browser native download
    triggerDownload();

    // 3. GTM Telemetry event
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'download_datasheet_lead',
        asset_name: assetName,
        file_size: fileSize,
        user_email: trimmed,
        timestamp: new Date().toISOString()
      });
      console.log('[GTM] Event fired: download_datasheet_lead', trimmed);
    }

    setIsSubmitting(false);
    setIsDownloaded(true);
  };

  const handleClose = () => {
    setIsDownloaded(false);
    setEmail('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1.5 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isDownloaded ? (
            /* Success Download Screen */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Download Initialized!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                  Your PDF file (<strong>{downloadFilename}</strong> · {fileSize}) is downloading automatically.
                </p>
              </div>

              <div className="pt-3">
                <a
                  href={pdfUrl}
                  download={downloadFilename}
                  className="inline-flex items-center gap-2 text-xs text-blue-600 font-bold hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Didn't start? Click here to re-download</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Back to Page
                </button>
              </div>
            </div>
          ) : (
            /* Email Input Form */
            <form onSubmit={handleDownloadSubmit} className="space-y-4">
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
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Enter Your Business / Institutional Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. procurement@hospital.org"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-1.5">
                  High-definition vector PDF ({fileSize}) will start downloading directly in your browser.
                </p>
              </div>

              <div className="space-y-2 pt-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Complete SpO2, ECG, NIBP, Temp & IBP SKUs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Detailed Pinout & Wiring Diagrams for Bio-Engineers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Distributor MOQ & Tiered Factory Pricing Schedule</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying & Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Unlock & Download High-Res PDF ({fileSize})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
