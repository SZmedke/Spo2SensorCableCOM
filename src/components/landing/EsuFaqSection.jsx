import React, { useState } from 'react';

export default function EsuFaqSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 lg:py-20 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-9">
          <span className="text-xs font-bold tracking-wider uppercase text-medkeBlue">
            Procurement FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight mt-2">
            Questions Before Qualification
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            const question = item.question || item.q;
            const answer = item.answer || item.a;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-bold text-medkeNavy text-sm sm:text-base">
                    {question}
                  </span>
                  <span className="text-2xl text-medkeBlue font-light leading-none shrink-0 transition-transform">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {answer}
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
