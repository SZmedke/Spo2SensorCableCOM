import React from 'react';

export default function EsuTrustProof({ data, onOpenCert, onOpenLightbox }) {
  const { title, description, credential, factories, testTargets, nmpaNotice, complianceNotice } = data;

  return (
    <section id="trust-proof" className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & ISO Credential */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-end mb-9">
          <div className="lg:col-span-8">
            <span className="text-xs font-bold tracking-wider uppercase text-medkeBlue">
              Quality control, testing & compliance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-medkeNavy tracking-tight mt-2">
              {title}
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenCert('iso')}
            className="lg:col-span-4 text-left p-5 rounded-2xl bg-medkeNavy text-white border border-blue-900 shadow-xl cursor-pointer hover:bg-medkeNavy/95 transition-all"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              {credential.tag}
            </span>
            <p className="text-lg font-bold mt-2 text-white">
              {credential.title}
            </p>
            <p className="text-xs text-blue-100 mt-1">
              {credential.sub}
            </p>
            <span className="text-xs font-bold text-white mt-3 block">
              {credential.cta}
            </span>
          </button>
        </div>

        {/* 3 Facility Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {factories.map((fac) => (
            <button
              key={fac.id}
              type="button"
              onClick={() => onOpenLightbox(fac.imgSrc, fac.title)}
              className="text-left rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm group flex flex-col cursor-zoom-in transition-all hover:shadow-md"
            >
              <div className="h-56 sm:h-60 overflow-hidden bg-white shrink-0">
                <img
                  src={fac.imgSrc}
                  alt={fac.alt}
                  className="w-full h-full object-cover photo-zoom transition-transform duration-350 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex-1">
                <p className="font-bold text-medkeNavy">{fac.title}</p>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                  {fac.caption}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* 4 Test Criteria Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
          {testTargets.map((target, idx) => {
            const isClickable = Boolean(target.certKey);
            if (isClickable) {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onOpenCert(target.certKey)}
                  className="text-left p-5 bg-white rounded-2xl border border-slate-200 hover:border-medkeBlue hover:shadow-md transition-all cursor-pointer shadow-sm"
                >
                  <span className="text-3xl font-semibold text-medkeBlue font-mono">{target.val}</span>
                  <h3 className="font-bold text-medkeNavy mt-3">{target.title}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{target.desc}</p>
                </button>
              );
            }
            return (
              <div key={idx} className="text-left p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-3xl font-semibold text-medkeBlue font-mono">{target.val}</span>
                <h3 className="font-bold text-medkeNavy mt-3">{target.title}</h3>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{target.desc}</p>
              </div>
            );
          })}
        </div>

        {/* NMPA & Regulatory Notice Row */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <button
            type="button"
            onClick={() => onOpenCert('nmpa')}
            className="lg:col-span-4 text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-medkeBlue hover:shadow-sm transition-all cursor-pointer"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {nmpaNotice.tag}
            </p>
            <p className="font-bold text-medkeNavy mt-2 text-sm sm:text-base">
              {nmpaNotice.title}
            </p>
            <span className="text-xs font-bold text-medkeBlue mt-2 block">
              {nmpaNotice.cta}
            </span>
          </button>

          <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3 items-start">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-medkeBlue flex items-center justify-center shrink-0 font-bold text-sm">
              i
            </span>
            <div>
              <p className="font-bold text-medkeNavy">
                {complianceNotice.title}
              </p>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {complianceNotice.text}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
