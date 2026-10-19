import React, { useState } from 'react';
import { ibpLandingData } from '../data/landing/ibp-data';
import IbpHero from '../components/landing/IbpHero';
import IbpInterconnectHub from '../components/landing/IbpInterconnectHub';
import IbpConnectorMarquee from '../components/landing/IbpConnectorMarquee';
import IbpEngineeringAdvantages from '../components/landing/IbpEngineeringAdvantages';
import IbpTrustProof from '../components/landing/IbpTrustProof';
import IbpInquiryForm from '../components/landing/IbpInquiryForm';
import IbpFaqSection from '../components/landing/IbpFaqSection';
import MobileStickyBar from '../components/landing/MobileStickyBar';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';
import CertificateModal from '../components/landing/CertificateModal';
import IbpLightboxModal from '../components/landing/IbpLightboxModal';

export default function IbpLandingPage() {
  const [selectedMonitorId, setSelectedMonitorId] = useState('philips');
  const [selectedTransducerId, setSelectedTransducerId] = useState('bbraun');
  const [prefillRfqData, setPrefillRfqData] = useState(null);

  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '' });

  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const card = document.getElementById('form-card-container');
        if (card) {
          card.classList.add('ring-4', 'ring-[#0047FF]', 'transition-all');
          setTimeout(() => card.classList.remove('ring-4', 'ring-[#0047FF]'), 1500);
        }
      }
    }
  };

  const handleHubInquire = (inquirePayload) => {
    setPrefillRfqData(inquirePayload);
    scrollToForm();
  };

  const handleSelectTransducerFromGallery = (transducerId) => {
    setSelectedTransducerId(transducerId);
  };

  const handleOpenLightbox = (src, title) => {
    setLightboxData({ isOpen: true, src, title });
  };

  const handleCloseLightbox = () => {
    setLightboxData({ isOpen: false, src: '', title: '' });
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased font-sans pb-16 md:pb-0">
      
      {/* 1. Hero Section with CAD Vector Schematic, Metrics Badges, Trust Pills & Dual CTAs */}
      <IbpHero
        data={ibpLandingData}
        onOpenBrochure={() => setIsBrochureOpen(true)}
      />

      {/* 2. Dual-End Interconnect Hub (Monitor × Transducer Cable Cross-Matching) */}
      <IbpInterconnectHub
        monitorSystems={ibpLandingData.monitorSystems}
        transducerStandards={ibpLandingData.transducerStandards}
        selectedMonitorId={selectedMonitorId}
        selectedTransducerId={selectedTransducerId}
        onSelectMonitor={(id) => setSelectedMonitorId(id)}
        onSelectTransducer={(id) => setSelectedTransducerId(id)}
        onInquire={handleHubInquire}
      />

      {/* 3. 10 Transducer Connector Interface Standards (Infinite Smooth Marquee + Click Image to Lightbox Zoom) */}
      <IbpConnectorMarquee
        connectors={ibpLandingData.connectorGallery}
        onSelectTransducer={handleSelectTransducerFromGallery}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 4. Clinical & Engineering Advantages (ESU Noise, Gold Pins, TPU, 60-70% Savings) */}
      <IbpEngineeringAdvantages
        advantages={ibpLandingData.engineeringAdvantages}
      />

      {/* 5. 4,000 sqm Intelligent Factory & Quality Trust Proof (3 Equal-Height Plant Photos + 3 Compliance Plaques) */}
      <IbpTrustProof
        data={ibpLandingData.trustProof}
        onOpenCert={(cert) => setActiveCert(cert)}
      />

      {/* 6. Wide High-Conversion B2B RFQ Lead Portal */}
      <IbpInquiryForm
        prefillData={prefillRfqData}
        onResetPrefill={() => setPrefillRfqData(null)}
      />

      {/* 7. B2B Technical & Procurement FAQ (5 Core Questions Accordion) */}
      <IbpFaqSection
        faqs={ibpLandingData.faqs}
      />

      {/* 8. Mobile Sticky Conversion Bar (<768px) */}
      <MobileStickyBar onScrollToForm={scrollToForm} />

      {/* Modal 1: 2026 Medical Cable Technical Brochure Lead Magnet */}
      <LeadBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        leadType="IBP Cable Catalog Download"
      />

      {/* Modal 2: Official Compliance Credential (ISO 13485 / CE MDR DoC / SFDA MDMA) */}
      <CertificateModal
        isOpen={Boolean(activeCert)}
        certificate={activeCert}
        onClose={() => setActiveCert(null)}
      />

      {/* Modal 3: Connector HD Lightbox Zoom Modal */}
      <IbpLightboxModal
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        onClose={handleCloseLightbox}
      />

    </div>
  );
}
