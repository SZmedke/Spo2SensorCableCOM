import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2, MessageCircle } from 'lucide-react';
import { COMPANY } from '../../data/catalog';
import { submitInquiry } from '../../lib/inquiries';

/**
 * @typedef {Object} InquiryFormProps
 * @property {string} [productName] Prefilled product name (read-only field, value carried in hidden input)
 * @property {string} [variant] 'compact' | 'full'
 */
export default function InquiryForm({ productName = '', variant = 'full' }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    product_name: productName,
    quantity: '',
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
        ...values,
        name: values.name.trim(),
        company: values.company.trim() || undefined,
        country: values.country.trim() || undefined,
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        product_name: values.product_name.trim() || undefined,
        message: values.message.trim(),
        inquiry_type: productName ? 'Product Quote Inquiry' : 'General Quote Inquiry',
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

  const waMessage = encodeURIComponent(
    `Hello Medke, I would like a quote for ${values.product_name || 'medical accessories'}${values.quantity ? ` (Qty: ${values.quantity})` : ''}.`
  );

  return (
    <form className="inquiry-form" onSubmit={onSubmit} noValidate data-component="inquiry-form" id="inquiry">
      <div className="inquiry-head">
        <div>
          <h3 className="h-3">Request a quote</h3>
          <p className="muted" style={{ fontSize: 13, marginTop: 4 }}>{COMPANY.responsePromise}</p>
        </div>
        <a className="btn btn-secondary" style={{ padding: '8px 14px', minHeight: 40 }} href={`${COMPANY.whatsappLink}?text=${waMessage}`} target="_blank" rel="noreferrer">
          <MessageCircle size={15} /> WhatsApp
        </a>
      </div>

      <div className={variant === 'full' ? 'form-grid' : 'form-grid compact'}>
        <div>
          <label className="field-label" htmlFor="in-name">Name *</label>
          <input id="in-name" className="field-input" value={values.name} onChange={set('name')} aria-invalid={errors.name ? 'true' : undefined} />
          {errors.name ? <p className="field-error" role="alert">{errors.name}</p> : null}
        </div>
        <div>
          <label className="field-label" htmlFor="in-company">Company</label>
          <input id="in-company" className="field-input" value={values.company} onChange={set('company')} />
        </div>
        <div>
          <label className="field-label" htmlFor="in-country">Country</label>
          <input id="in-country" className="field-input" value={values.country} onChange={set('country')} />
        </div>
        <div>
          <label className="field-label" htmlFor="in-email">Email *</label>
          <input id="in-email" type="email" className="field-input" value={values.email} onChange={set('email')} aria-invalid={errors.email ? 'true' : undefined} />
          {errors.email ? <p className="field-error" role="alert">{errors.email}</p> : null}
        </div>
        <div>
          <label className="field-label" htmlFor="in-phone">Phone</label>
          <input id="in-phone" type="tel" inputMode="tel" className="field-input" value={values.phone} onChange={set('phone')} />
        </div>
        <div>
          <label className="field-label" htmlFor="in-qty">Quantity</label>
          <input id="in-qty" type="number" inputMode="numeric" min="1" className="field-input" value={values.quantity} onChange={set('quantity')} />
        </div>
        <div style={{ gridColumn: variant === 'full' ? '1 / -1' : undefined }}>
          <label className="field-label" htmlFor="in-product">Product</label>
          <input id="in-product" className="field-input" value={values.product_name} onChange={set('product_name')} readOnly={Boolean(productName)} />
        </div>
        <div style={{ gridColumn: variant === 'full' ? '1 / -1' : undefined }}>
          <label className="field-label" htmlFor="in-message">Message *</label>
          <textarea id="in-message" className="field-textarea" value={values.message} onChange={set('message')} aria-invalid={errors.message ? 'true' : undefined} />
          {errors.message ? <p className="field-error" role="alert">{errors.message}</p> : null}
        </div>
      </div>

      {status === 'error' ? (
        <p className="field-error" role="alert" style={{ marginTop: 12 }}>
          Something went wrong sending your inquiry. Please try again or contact us by email at {COMPANY.email}.
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary" style={{ marginTop: 16 }} disabled={status === 'submitting'}>
        {status === 'submitting' ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
        {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  );
}
