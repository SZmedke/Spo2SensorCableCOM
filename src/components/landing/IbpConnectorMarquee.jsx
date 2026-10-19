import React from 'react';

export default function IbpConnectorMarquee({ connectors, onSelectTransducer, onOpenLightbox }) {
  const handleCardClick = (transducerId) => {
    if (onSelectTransducer) {
      onSelectTransducer(transducerId);
    }
    if (typeof window !== 'undefined') {
      const hub = document.getElementById('interconnect-hub');
      if (hub) {
        hub.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleImageClick = (e, connector) => {
    e.stopPropagation();
    if (onOpenLightbox) {
      onOpenLightbox(connector.lightboxImgSrc, `${connector.name} IBP Connector (${connector.prefix})`);
    }
  };

  const renderCard = (conn, uniqueKey) => (
    <div
      key={uniqueKey}
      onClick={() => handleCardClick(conn.id)}
      className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl p-3 border border-slate-200 hover:border-medkeBlue hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
    >
      <div>
        {/* Clickable Image Box with Zoom */}
        <div
          onClick={(e) => handleImageClick(e, conn)}
          title="Click image to zoom in HD"
          className="relative h-36 sm:h-40 rounded-xl bg-slate-50/70 p-2 border border-slate-100/90 flex items-center justify-center overflow-hidden mb-3 group-hover:border-medkeBlue/30 transition cursor-zoom-in group/img"
        >
          <img
            src={conn.imgSrc}
            alt={conn.alt}
            className="w-full h-full object-contain group-hover/img:scale-108 transition duration-300"
            loading="lazy"
          />
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-medium text-slate-600 shadow-xs border border-slate-200/80 flex items-center gap-1 group-hover/img:text-medkeBlue group-hover/img:border-medkeBlue transition pointer-events-none">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Zoom
          </span>
        </div>

        <div className="flex items-center justify-between px-0.5">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-medkeSoft text-medkeNavy">
            {conn.prefix} · Standard {conn.standardNumber}
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> In Stock
          </span>
        </div>

        <h4 className="text-sm font-bold text-slate-900 group-hover:text-medkeBlue transition mt-1.5 px-0.5">
          {conn.name}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5 px-0.5">{conn.sub}</p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs px-0.5">
        <span className="font-bold text-medkeBlue flex items-center gap-1 group-hover:translate-x-0.5 transition">
          Select in Hub →
        </span>
        <span className="text-[11px] text-slate-400 font-mono">1:1 Molded</span>
      </div>
    </div>
  );

  return (
    <section id="connector-gallery" className="py-16 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-medkeBlue uppercase tracking-widest block">
            PRECISION TOOLING &amp; PINOUTS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-medkeNavy tracking-tight mt-1">
            10 Transducer Connector Interface Standards
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Medke manufactures 1:1 precision-molded connectors compliant with international clinical pressure transducer standards.
          </p>
        </div>

      </div>

      {/* Full-Width Smooth Marquee Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Gradient Fade Edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>

        {/* Marquee Track (2 Identical Sets for Seamless Infinite Loop) */}
        <div className="animate-marquee flex gap-5 py-2">
          {/* SET A */}
          {connectors.map((conn) => renderCard(conn, `setA-${conn.id}`))}
          {/* SET B */}
          {connectors.map((conn) => renderCard(conn, `setB-${conn.id}`))}
        </div>
      </div>
    </section>
  );
}
