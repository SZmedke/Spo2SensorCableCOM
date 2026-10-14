import React from 'react';
import { Package, ArrowRight, Check } from 'lucide-react';

export default function ProductCategoryGrid({ categories, onSelectCategory }) {
  const isSixCols = categories.length === 6;

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide mb-3">
            <Package className="w-3.5 h-3.5" />
            <span>Product Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Medical Cable Lines
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Engineered for hospitals, clinical distributors, and OEM medical equipment manufacturers worldwide.
          </p>
        </div>

        {/* Dynamic Responsive Grid */}
        <div
          className={`grid gap-6 sm:gap-8 ${
            isSixCols
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Top Image Showcase (Seamless Header) */}
              <div className="relative h-48 w-full bg-slate-50/80 border-b border-slate-100 p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="max-h-full max-w-full object-contain mix-blend-multiply filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category Tag */}
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md mb-2">
                    {cat.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {cat.desc}
                  </p>

                  {/* Spec Bullet Points */}
                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-700">
                    {cat.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectCategory && onSelectCategory(cat.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Request Quote & Free Sample</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
