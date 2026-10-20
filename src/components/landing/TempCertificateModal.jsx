import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function TempCertificateModal({ certType, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !certType) return null;

  let title = 'Official Compliance Credential';
  let body = null;

  if (certType === 'fda') {
    title = 'US FDA 510(k) Premarket Clearance';
    body = (
      <>
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
          <span className="font-bold text-blue-900 block">Clearance Number: K243000 (FEI: 3012804266)</span>
          <span className="text-[11px] text-blue-700">Device Class: Class II · Regulation: 21 CFR 880.2910 · Product Code: FLL</span>
        </div>
        <p className="font-bold text-slate-800 pt-1">Cleared Models (6 Core Models):</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li><strong>T1306</strong>: Reusable Adult Skin Surface Temperature Probe</li>
          <li><strong>T2306</strong>: Reusable Adult Esophageal / Rectal Cavity Temperature Probe</li>
          <li><strong>T3306</strong>: Reusable Pediatric Skin Surface Temperature Probe</li>
          <li><strong>T4306</strong>: Reusable Pediatric Cavity Temperature Probe</li>
          <li><strong>T5106</strong>: Disposable Skin Surface Temperature Sensor</li>
          <li><strong>T6106</strong>: Disposable Esophageal / Rectal Temperature Probe</li>
        </ul>
        <p className="text-[11px] text-slate-500 italic mt-2">
          * Evaluated as non-sterile devices in FDA official summary. Authorized for prescription clinical use in hospital monitoring environments.
        </p>
      </>
    );
  } else if (certType === 'iso13485') {
    title = 'TÜV SÜD ISO 13485:2016 Certificate';
    body = (
      <>
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
          <span className="font-bold text-emerald-900 block">Certificate Registration No: Q5 085432 0005 Rev. 05</span>
          <span className="text-[11px] text-emerald-700">Issued by: TÜV SÜD Product Service GmbH · Valid Until: 2029-01-25</span>
        </div>
        <p className="font-bold text-slate-800 pt-1">Certified Scope:</p>
        <p className="text-slate-600 leading-relaxed">
          Design, development, cleanroom manufacturing, and distribution of medical cable assemblies, temperature probes and sensors, non-invasive blood pressure accessories, and physiological monitoring components.
        </p>
      </>
    );
  } else if (certType === 'cemdr') {
    title = 'EU CE MDR Class I DoC & Saudi SFDA MDMA';
    body = (
      <>
        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 mb-2">
          <span className="font-bold text-indigo-900 block">EU MDR 2017/745 Class I DoC: MDR-TPEC-T0-02 v1.0</span>
          <span className="text-[11px] text-indigo-700">Basic UDI-DI: 697101811TP0MS · EMDN: T0205 / T0204 / T0207 / T0203</span>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
          <span className="font-bold text-amber-900 block">Saudi SFDA Licences: MDMA-2-2026-2681 &amp; MDMA-2-2026-1845</span>
          <span className="text-[11px] text-amber-700">Official MDMA registration covering Temperature Probes &amp; Extension Cables throughout the Kingdom of Saudi Arabia.</span>
        </div>
      </>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-white rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h4 className="text-base font-bold text-medkeNavy">{title}</h4>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="py-4 space-y-3 text-xs text-slate-600 leading-relaxed">
          {body}
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-medkeNavy hover:bg-medkeNavyHover text-white font-bold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
