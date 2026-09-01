import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getCategory, getProduct, PRODUCTS } from '../data/catalog';
import { submitInquiry } from '../lib/inquiries';

/* fallback gallery images (confirmed assets) when a product has fewer than 3 photos */
const FALLBACK_GALLERY = [
  '/assets/images/products/spo2-sensor/spo2-sensor-02.jpg',
  '/assets/images/products/temp-probe/temp-probe-01.jpg',
  '/assets/images/categories/patient-monitoring.jpg',
];

const BUSINESS_TYPES = ['Wholesale Agent', 'OEM & ODM', 'Trader / Repairer', 'Broker'];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(id);

  const [activeImg, setActiveImg] = useState(0);
  const [form, setForm] = useState({
    businessType: BUSINESS_TYPES[0],
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!product) {
    return (
      <div className="section container-site">
        <h1 className="h-1">Product not found</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          <Link to="/products" className="category-link">Back to all products</Link>
        </p>
      </div>
    );
  }

  /* gallery: main image + up to 3 thumbs */
  const gallery = [0, 1, 2].map((i) => product.images[i] || FALLBACK_GALLERY[i]);

  const category = getCategory(product.categorySlug);
  const categoryName = category ? category.name : product.subcategory;

  /* compat table rows: 制造商 / 探针选项 / 订购代码 / 兼容型号 / OEM# */
  const compatRows = product.compat.length
    ? product.compat.map((c) => ({
        manufacturer: c.brand,
        option: c.series[0] || '—',
        code: product.partNumber,
        models: c.series.join(' · ') || '—',
        oem: '—',
      }))
    : [
        {
          manufacturer: product.brands[0] || 'Generic',
          option: '—',
          code: product.partNumber,
          models: '—',
          oem: '—',
        },
      ];

  /* related products: same category first, then fill with others */
  const sameCat = PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id);
  const others = PRODUCTS.filter((p) => p.categorySlug !== product.categorySlug && p.id !== product.id);
  const related = [...sameCat, ...others].slice(0, 4);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError('Please fill in Name, Email and Message.');
      return;
    }
    setFormError('');
    setSubmitting(true);
    try {
      const res = await submitInquiry({
        business_type: form.businessType,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        product_name: product.name,
        part_number: product.partNumber,
      });
      if (res.ok) {
        navigate(`/inquiry/success?ref=${res.ref}`);
      } else {
        setFormError('Something went wrong. Please try again or contact us on WhatsApp.');
      }
    } catch {
      setFormError('Failed to send the inquiry. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. Breadcrumb */}
      <div className="section-tight" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products">Products</Link>
            <ChevronRight size={14} />
            <span>{categoryName}</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--fg)' }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* 2. Main two-column block */}
      <section className="section" style={{ background: 'var(--surface)', paddingTop: 0 }}>
        <div className="container-site">
          <div className="product-detail-grid">
            <div>
              <div className="gallery-main">
                <img src={gallery[activeImg]} alt={product.name} />
              </div>
              <div className="gallery-thumbs">
                {gallery.map((src, i) => (
                  <button
                    type="button"
                    key={src}
                    className={`thumb${i === activeImg ? ' active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1} of ${product.name}`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow">{categoryName}</span>
              <h2 className="h-2" style={{ margin: '12px 0' }}>{product.name}</h2>
              <p className="muted" style={{ fontSize: 14, lineHeight: 1.7 }}>{product.description}</p>
              <div className="brand-pills" style={{ marginTop: 14 }}>
                {[...product.brands, 'TUV', 'CE', 'FDA'].map((c) => (
                  <span className="brand-pill" key={c}>{c}</span>
                ))}
              </div>
              <div className="product-detail-cta" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link className="btn btn-primary" to="/contact">Get a Quote</Link>
                <Link className="btn btn-secondary" to="/contact">Download Datasheet</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Compat table + 4. Spec table (light background) */}
      <section className="section" style={{ background: 'var(--accent-soft)' }}>
        <div className="container-site">
          <div className="data-block">
            <div className="dlabel">Compatible With</div>
            <table style={{ marginTop: 12 }}>
              <thead>
                <tr>
                  <th>Manufacturer</th>
                  <th>Probe Option</th>
                  <th>Order Code</th>
                  <th>Compatible Models</th>
                  <th>OEM#</th>
                </tr>
              </thead>
              <tbody>
                {compatRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.manufacturer}</td>
                    <td>{row.option}</td>
                    <td className="ok">{row.code}</td>
                    <td>{row.models}</td>
                    <td className="no">{row.oem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <table className="spec-table" style={{ marginTop: 28, background: 'var(--surface)' }}>
            <tbody>
              {product.specs.map((s) => (
                <tr key={s.label}>
                  <th style={{ width: '38%' }}>{s.label}</th>
                  <td>{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Bulk Ordering band */}
      <section
        className="section"
        style={{ background: 'var(--accent-soft)', borderTop: '1px solid #cdd5ef', borderBottom: '1px solid #cdd5ef' }}
      >
        <div className="container-site" style={{ textAlign: 'center' }}>
          <h2 className="h-2" style={{ color: 'var(--accent)' }}>Bulk Ordering</h2>
          <div style={{ marginTop: 20 }}>
            <Link className="btn btn-primary" to="/contact">Get Wholesale Price</Link>
          </div>
        </div>
      </section>

      {/* 6. Inquiry form */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 className="h-2">Request a Quote</h2>
          </div>
          <form className="inquiry-form" style={{ maxWidth: 640, margin: '0 auto' }} onSubmit={onSubmit} noValidate>
            <div className="form-grid">
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="field-label" htmlFor="pd-biz">Business Type</label>
                <select id="pd-biz" className="field-select" value={form.businessType} onChange={set('businessType')}>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="pd-name">Full Name *</label>
                <input id="pd-name" className="field-input" placeholder="Your name" value={form.name} onChange={set('name')} />
              </div>
              <div>
                <label className="field-label" htmlFor="pd-email">Email *</label>
                <input id="pd-email" type="email" className="field-input" placeholder="name@company.com" value={form.email} onChange={set('email')} />
              </div>
              <div>
                <label className="field-label" htmlFor="pd-phone">Phone</label>
                <input id="pd-phone" type="tel" inputMode="tel" className="field-input" placeholder="+86…" value={form.phone} onChange={set('phone')} />
              </div>
              <div>
                <label className="field-label" htmlFor="pd-product">Product</label>
                <input id="pd-product" className="field-input" value={product.name} readOnly />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="field-label" htmlFor="pd-msg">Message *</label>
                <textarea
                  id="pd-msg"
                  className="field-textarea"
                  placeholder="Quantity, target model, packaging…"
                  value={form.message}
                  onChange={set('message')}
                />
              </div>
            </div>
            {formError ? <p className="field-error" role="alert">{formError}</p> : null}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 16 }} disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </section>

      {/* 7. Related Products (light background) */}
      <section className="section" style={{ background: 'var(--accent-soft)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 className="h-2">Related Products</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <Link className="product-card" to={`/product/${p.id}`} key={p.id}>
                <div className="product-img-wrap">
                  <img src={p.images[0]} alt={p.name} loading="lazy" />
                </div>
                <div className="product-body">
                  <span className="product-pn">{p.partNumber}</span>
                  <h3 className="product-name">{p.name}</h3>
                  <div className="product-chips">
                    {p.brands.map((b) => (
                      <span className="chip" key={b}>{b}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
