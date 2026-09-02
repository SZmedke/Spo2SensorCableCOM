import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../data/catalog';
import SectionHeading from '../components/common/SectionHeading';

// Client chips (hi-fi design p8): 8 brands, derived from the BRANDS array + 2 extras.
const CLIENT_BRANDS = [
  ...BRANDS.map((n) => (n === 'Fukuda Denshi' ? 'Fukuda' : n)),
  'Bionet',
  'Aeon',
];

const JOURNEY = [
  { year: '2008', text: 'Medke Technology was established with a registered capital of 1 million RMB and a factory area of 1,000㎡.' },
  { year: '2010', text: 'The factory area expanded to 2,000㎡, and a 100,000-class cleanroom was put into operation.' },
  { year: '2011', text: 'Medke obtained the "Medical Device Manufacturing Enterprise License".' },
  { year: '2013', text: 'The "MEDKE" brand was officially trademarked.' },
  { year: '2014', text: 'Achieved TÜV ISO 13485:2003 quality management system certification.' },
  { year: '2015', text: 'The registered capital increased to 10 million RMB.' },
  { year: '2016', text: 'Medke products passed FDA certification in the United States.' },
  { year: '2018', text: 'The factory area expanded to 3,000㎡.' },
  { year: '2019', text: 'Successfully passed TÜV factory quality inspection.' },
  { year: '2020', text: 'Support comprehensive OEM solutions.' },
  { year: '2021', text: 'Expanded into online channels, becoming a Gold Supplier on Alibaba.' },
  { year: '2022', text: 'Completed the upgrade to comply with EU MDR regulations.' },
  { year: '2023', text: 'Implemented lean production across the entire supply chain.' },
  { year: '2024', text: 'Established a modern, intelligent production facility spanning over 4,000㎡, integrating R&D and manufacturing capabilities.' },
];

const FACTORY = [
  { image: '/assets/images/about/factory-01.jpg', title: 'Factory Exterior', desc: '4,000㎡ smart factory' },
  { image: '/assets/images/about/factory-workshop.jpg', title: 'Workshop', desc: 'Cleanroom workshop' },
  { image: '/assets/images/about/factory-warehouse.jpg', title: 'Warehouse', desc: 'Finished-goods warehouse · fast dispatch' },
  { image: '/assets/images/about/quality-lab.png', title: 'Quality Lab', desc: 'Incoming & finished-goods inspection' },
];

export default function AboutPage() {
  const scrollRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll('.journey-card'));
    const end = el.querySelector('.journey-end');
    if (typeof IntersectionObserver === 'undefined') {
      cards.forEach((c) => c.classList.add('is-visible'));
      return;
    }
    el.classList.add('is-animating');
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-visible');
          reveal.unobserve(en.target);
        });
      },
      { root: el, threshold: 0.12 }
    );
    cards.forEach((c) => reveal.observe(c));
    const endWatch = new IntersectionObserver(
      (entries) => {
        const atBottom = entries.some((en) => en.isIntersecting);
        hintRef.current?.classList.toggle('faded', atBottom);
      },
      { root: el, threshold: 0.8 }
    );
    if (end) endWatch.observe(end);
    return () => {
      reveal.disconnect();
      endWatch.disconnect();
    };
  }, []);

  return (
    <>
      {/* Company intro split — text left, image right */}
      <div className="section">
        <div className="container-site">
          <div className="about-story-grid">
            <div>
              <h2 className="h-2">Welcome to Medke</h2>
              <p className="muted" style={{ marginTop: 14, fontSize: 15, lineHeight: 1.7 }}>
                Shenzhen Medke Technology Co., Ltd. is a leading manufacturer of medical accessories
                and consumables. Established in 2008 with a registered capital of RMB 10 million, Medke
                is headquartered in the coastal city of Shenzhen — widely regarded as the
                "Silicon Valley" of China's medical electronics industry.
              </p>
              <p className="muted" style={{ marginTop: 12, fontSize: 15, lineHeight: 1.7 }}>
                Over a decade of growth, we have built a complete chain spanning design, R&amp;D,
                production and sales, delivering one-stop solutions across patient monitoring
                accessories — SpO2 sensors, ECG/EKG cables, NIBP cuffs, IBP cables, temperature
                probes, EEG cables, ESU consumables and fetal monitoring probes. Our plants operate
                under ISO 13485 and our products are certified with TÜV CE and FDA, opening access to
                major global markets. We provide reliable OEM / ODM services and export to more than
                100 countries and regions worldwide.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Get a Quote</Link>
                <Link to="/contact" className="btn btn-secondary">Request a Catalog</Link>
              </div>
            </div>
            <img
              src="/assets/images/about/about-intro.jpg"
              alt="Medke facility"
              width="1600"
              height="1069"
              loading="lazy"
              className="about-story-img"
            />
          </div>
        </div>
      </div>

      {/* Timeline (light background) */}
      <div className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <SectionHeading align="center" title="Our Journey" />
          <div className="journey-wrap">
            <div className="journey-scroll" ref={scrollRef}>
              {JOURNEY.map((m, i) => (
                <div className="journey-card" key={m.year} style={{ '--d': `${Math.min(i * 70, 490)}ms` }}>
                  <span className="journey-year">{m.year}</span>
                  <p className="muted">{m.text}</p>
                </div>
              ))}
              <div className="journey-end" aria-hidden="true" />
            </div>
          </div>
          <p className="journey-hint" ref={hintRef}>Scroll to explore all milestones</p>
        </div>
      </div>

      {/* Factory image cards */}
      <div className="section">
        <div className="container-site">
          <SectionHeading align="center" title="Factory at a Glance" />
          <div className="app-grid">
            {FACTORY.map((f) => (
              <figure className="app-card" key={f.title}>
                <div className="app-img-wrap">
                  <img src={f.image} alt={f.title} width="400" height="225" loading="lazy" />
                </div>
                <figcaption className="app-body">
                  <h3 className="h-3">{f.title}</h3>
                  <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>{f.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Team split — image left, text right (light background) */}
      <div className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <div className="team-frame">
            <div className="team-frame-left">
              <img
                src="/assets/images/about/about-team.jpg"
                alt="Medke team"
                width="640"
                height="480"
                loading="lazy"
                className="team-frame-img"
              />
            </div>
            <div className="team-frame-right">
              <div className="team-frame-top">
                <img
                  src="/assets/images/about/about-team-2.jpg"
                  alt="Medke team activity"
                  width="1200"
                  height="800"
                  loading="lazy"
                  className="team-frame-img"
                />
                <img
                  src="/assets/images/about/about-team-3.jpg"
                  alt="Medke team workshop"
                  width="1200"
                  height="799"
                  loading="lazy"
                  className="team-frame-img"
                />
              </div>
              <div className="team-frame-text">
                <h3 className="h-3" style={{ fontWeight: 700 }}>Our Team</h3>
                <p className="muted" style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>
                  100+ professionals across sales, R&amp;D and QC. Bilingual sales team replies within
                  24 hours; R&amp;D supports custom connector and packaging development.
                </p>
                <p className="muted" style={{ marginTop: 10, fontSize: 14, lineHeight: 1.7 }}>
                  Our ISO 13485-certified plants run with full batch traceability, and a dedicated QC
                  team covers incoming, in-process and finished-goods inspection on every order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client logo chips */}
      <div className="section">
        <div className="container-site">
          <SectionHeading align="center" title="Meet Our Clients" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {CLIENT_BRANDS.map((b) => (
              <span className="chip" key={b}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
