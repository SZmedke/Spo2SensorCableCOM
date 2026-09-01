import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2 } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { submitInquiry } from '../lib/inquiries';

const CONTACT_INFO = [
  { icon: '✉️', title: 'Email', lines: ['info@medke.com', 'contact@medke.com'] },
  { icon: '📞', title: 'Phone / WhatsApp', lines: ['+86 153 0265 4212', 'Mon–Sat 9:00–18:00 (GMT+8)'] },
  { icon: '📍', title: 'Address', lines: ['Shenzhen, Guangdong, China', 'Showroom visits by appointment'] },
  { icon: '🌐', title: 'Business Hours', lines: ['24/7 online inquiry', 'Email replied within 24h'] },
];

const BUSINESS_TYPES = ['Wholesale Agent', 'OEM & ODM', 'Trader / Repairer', 'Broker'];

const iconBoxStyle = {
  width: 44,
  height: 44,
  borderRadius: 12,
  background: 'var(--accent-soft)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  marginBottom: 12,
};

export default function ContactPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    businessType: '',
    name: '',
    email: '',
    tel: '',
    website: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | error

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email.trim())) next.email = 'Please enter a valid email.';
    if (!values.message.trim()) next.message = 'Please tell us what you need.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const res = await submitInquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.tel.trim() || undefined,
        message: [
          values.message.trim(),
          values.businessType ? `Business Type: ${values.businessType}` : '',
          values.website ? `Website: ${values.website}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      });
      if (res.ok) {
        navigate(`/inquiry/success?ref=${res.ref}`);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Contact info */}
      <div className="section">
        <div className="container-site">
          <SectionHeading
            align="center"
            title="Contact Us"
            subtitle="We reply within 24 hours on business days"
          />
          <div className="cert-grid">
            {CONTACT_INFO.map((item) => (
              <div className="card" key={item.title}>
                <div style={iconBoxStyle} aria-hidden="true">{item.icon}</div>
                <h4 style={{ fontSize: 15, fontWeight: 600 }}>{item.title}</h4>
                <p className="muted" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55 }}>
                  {item.lines.map((line) => <span key={line} style={{ display: 'block' }}>{line}</span>)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiry form */}
      <div className="section" style={{ background: 'var(--surface-warm)' }}>
        <div className="container-site">
          <SectionHeading align="center" title="Send Us a Message" />
          <form
            onSubmit={onSubmit}
            noValidate
            style={{ maxWidth: 640, marginInline: 'auto' }}
            data-component="contact-form"
          >
            <div>
              <label className="field-label" htmlFor="cf-business-type">Business Type</label>
              <select
                id="cf-business-type"
                className="field-select"
                value={values.businessType}
                onChange={set('businessType')}
              >
                <option value="">Select…</option>
                {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="field-label" htmlFor="cf-name">Name *</label>
              <input
                id="cf-name"
                className="field-input"
                value={values.name}
                onChange={set('name')}
                placeholder="Your name"
                aria-invalid={errors.name ? 'true' : undefined}
              />
              {errors.name ? <p className="field-error" role="alert">{errors.name}</p> : null}
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="field-label" htmlFor="cf-email">Email *</label>
              <input
                id="cf-email"
                type="email"
                className="field-input"
                value={values.email}
                onChange={set('email')}
                placeholder="name@company.com"
                aria-invalid={errors.email ? 'true' : undefined}
              />
              {errors.email ? <p className="field-error" role="alert">{errors.email}</p> : null}
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="field-label" htmlFor="cf-tel">Tel</label>
              <input
                id="cf-tel"
                type="tel"
                inputMode="tel"
                className="field-input"
                value={values.tel}
                onChange={set('tel')}
                placeholder="+86…"
              />
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="field-label" htmlFor="cf-website">Website</label>
              <input
                id="cf-website"
                type="url"
                className="field-input"
                value={values.website}
                onChange={set('website')}
                placeholder="https://…"
              />
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="field-label" htmlFor="cf-message">Message *</label>
              <textarea
                id="cf-message"
                className="field-textarea"
                value={values.message}
                onChange={set('message')}
                placeholder="Tell us your needs…"
                aria-invalid={errors.message ? 'true' : undefined}
              />
              {errors.message ? <p className="field-error" role="alert">{errors.message}</p> : null}
            </div>

            {status === 'error' ? (
              <p className="field-error" role="alert" style={{ marginTop: 12 }}>
                Something went wrong sending your inquiry. Please try again or email us at info@medke.com.
              </p>
            ) : null}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* 24h commitment band */}
      <div
        style={{
          background: 'var(--accent-soft)',
          borderTop: '1px solid #CDD5EF',
          borderBottom: '1px solid #CDD5EF',
          textAlign: 'center',
          padding: '40px 20px',
        }}
      >
        <div className="container-site">
          <h2 className="h-2" style={{ color: 'var(--accent)' }}>24-Hour Response Commitment</h2>
          <p className="muted" style={{ marginTop: 8, fontSize: 14, maxWidth: 560, marginInline: 'auto' }}>
            Every inquiry is answered within 24 hours — quote, technical support or catalog.
          </p>
        </div>
      </div>
    </>
  );
}
