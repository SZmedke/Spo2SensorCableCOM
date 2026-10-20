import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function TempFaqSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold tracking-widest uppercase text-medkeBlue block mb-1">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight">
            Clinical &amp; Procurement FAQ
          </h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const question = faq.question || faq.q;
            const answer = faq.answer || faq.a;

            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-[#F8FAFC] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-medkeNavy text-sm sm:text-base flex items-center justify-between hover:text-medkeBlue transition cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-medkeBlue shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
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
