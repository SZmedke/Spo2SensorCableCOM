import React, { useState } from 'react';

export default function IbpFaqSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-medkeBlue uppercase tracking-widest block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight mt-1">
            B2B Procurement &amp; Compatibility Q&amp;A
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Technical compatibility, electrical shielding, and commercial order terms.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const qText = faq.question || faq.q;
            const aText = faq.answer || faq.a;

            return (
              <div key={idx} className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-medkeNavy text-sm sm:text-base flex justify-between items-center gap-4 cursor-pointer hover:bg-slate-100/60 transition"
                >
                  <span>{qText}</span>
                  <span className="text-lg text-medkeBlue font-mono">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 animate-in fade-in">
                    {aText}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
