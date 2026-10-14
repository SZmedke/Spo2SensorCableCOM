import React from 'react';
import { X, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export default function CertificateModal({ certificate, isOpen, onClose }) {
  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-slate-900 p-6 sm:p-7 text-white border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Official Regulatory Compliance Dossier</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {certificate.badge}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            {certificate.authority}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Certificate / Filing ID:</span>
              <span className="font-bold text-slate-900">{certificate.certNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Status:</span>
              <span className="font-bold text-emerald-600">Active & Fully Audited</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Manufacturer:</span>
              <span className="font-bold text-slate-800 font-sans">Shenzhen Medke Technology Co., Ltd.</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">Certified Production Scope:</h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100/60">
              {certificate.scope}
            </p>
          </div>

          <div className="space-y-2 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full compliance with ISO 10993 biological evaluation requirements</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Annual unannounced audit surveillance by accredited notified bodies</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full audit dossier & technical files available upon hospital tender request</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Close Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
