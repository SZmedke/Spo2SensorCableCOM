import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function IbpLightboxModal({ isOpen, imageSrc, title, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 transition duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-white rounded-2xl p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h4 className="text-sm font-bold text-medkeNavy">{title || 'Connector Detail'}</h4>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="py-4 flex items-center justify-center max-h-[70vh] overflow-hidden bg-slate-50/50 rounded-xl">
          <img
            src={imageSrc}
            alt={title || 'Zoomed detail'}
            className="max-h-[60vh] max-w-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
