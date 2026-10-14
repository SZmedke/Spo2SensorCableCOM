import React from 'react';
import { MessageCircle, Zap } from 'lucide-react';

export default function MobileStickyBar({ onScrollToForm, whatsappNumber = '8615302654212' }) {
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Medke, I would like to get a quote for medical cables.'
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex md:hidden items-center gap-3 shadow-2xl">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
      >
        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        onClick={onScrollToForm}
        className="flex-[1.5] py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-colors cursor-pointer"
      >
        <Zap className="w-4 h-4 fill-current shrink-0" />
        <span>Get Direct Quote</span>
      </button>
    </div>
  );
}
