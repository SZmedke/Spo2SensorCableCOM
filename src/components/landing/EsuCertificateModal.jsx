import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function EsuCertificateModal({ certType, certData, isOpen, onClose }) {
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

  const item = certData[certType] || {
    title: 'Credential Detail',
    body: 'Documentation is maintained under Medke quality management system.'
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-bold text-medkeNavy text-lg sm:text-xl">
            {item.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close credential details"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-sm text-slate-600 leading-relaxed space-y-4">
          <div
            className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
          <p className="text-xs font-medium text-slate-500">
            Evidence is reviewed within the controlled quality and regulatory file. Request the current approved document set during supplier qualification.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-medkeNavy hover:bg-medkeNavyHover text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
