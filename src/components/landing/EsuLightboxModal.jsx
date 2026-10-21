import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function EsuLightboxModal({ isOpen, src, title, onClose }) {
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

  if (!isOpen || !src) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl transform animate-in zoom-in-95 duration-200">
        
        {/* Lightbox Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-200 bg-white">
          <h3 className="font-bold text-medkeNavy text-base sm:text-lg">
            {title || 'Product Image'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product image"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lightbox Image Container */}
        <div className="p-4 bg-slate-50 flex items-center justify-center">
          <img
            src={src}
            alt={title || 'Product view'}
            className="w-full max-h-[75vh] object-contain rounded-xl bg-white shadow-sm"
          />
        </div>

      </div>
    </div>
  );
}
