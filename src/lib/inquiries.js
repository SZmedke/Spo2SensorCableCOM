// Lead capture module.
// Submits to the inquiry-submit Edge Function (service-role write; direct REST
// access to the inquiries table is revoked for anon/authenticated).
// Success and GTM conversion telemetry require a server-issued inquiry ref.

const URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const INQUIRY_HONEYPOT_NAME = 'b2b_website_url_hp';
export const MIN_INQUIRY_ELAPSED_MS = 2500;

const INQUIRY_REF_PATTERN = /^MK-[A-Z0-9]+-[A-Z0-9]+$/;
const BASIC_EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const ALTERNATING_GIBBERISH_PATTERN = /(?:[a-z][A-Z]){4,}|(?:[A-Z][a-z]){4,}/;

export function getInquiryEmailError(email) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!BASIC_EMAIL_PATTERN.test(normalized)) {
    return 'Please provide a valid business email address.';
  }

  const [localPart, domain] = normalized.split('@');
  if (domain === 'gmail.com' && (localPart.match(/\./g) || []).length >= 3) {
    return 'Please provide a valid business email without excessive punctuation.';
  }

  return '';
}

export function hasSuspiciousInquiryText(value) {
  return String(value || '')
    .split(/\s+/)
    .some((token) => token.length >= 12 && ALTERNATING_GIBBERISH_PATTERN.test(token));
}

function getElapsedMs(formStartedAt) {
  const startedAt = Number(formStartedAt);
  if (!Number.isFinite(startedAt) || startedAt <= 0) return null;
  return Math.max(0, Date.now() - startedAt);
}

export async function submitInquiry(payload, options = {}) {
  if (!URL || !ANON_KEY) {
    throw new Error('Inquiry service is not configured yet.');
  }

  const honeypotValue = String(options.honeypotValue || payload?.[INQUIRY_HONEYPOT_NAME] || '').trim();
  const formElapsedMs = getElapsedMs(options.formStartedAt ?? payload?.form_started_at);

  if (honeypotValue || (formElapsedMs !== null && formElapsedMs < MIN_INQUIRY_ELAPSED_MS)) {
    return { ok: false, blocked: true, ref: '' };
  }

  const emailError = getInquiryEmailError(payload?.email);
  if (emailError) throw new Error(emailError);

  if (
    hasSuspiciousInquiryText(payload?.name) ||
    hasSuspiciousInquiryText(payload?.company) ||
    hasSuspiciousInquiryText(payload?.message)
  ) {
    throw new Error('Please review your contact details and inquiry message.');
  }

  const securedPayload = {
    ...payload,
    [INQUIRY_HONEYPOT_NAME]: honeypotValue,
    form_elapsed_ms: formElapsedMs,
  };

  const res = await fetch(`${URL}/functions/v1/inquiry-submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify(securedPayload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || 'Failed to save inquiry');
  }
  if (!INQUIRY_REF_PATTERN.test(data.ref || '')) {
    throw new Error('Inquiry service returned an invalid reference.');
  }

  const shouldSkipDataLayer = options.skipDataLayer || payload?.inquiry_type === 'E-Catalog Download';
  if (!shouldSkipDataLayer && typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_submit_lead',
      anti_fraud_status: 'verified',
      inquiry_ref: data.ref,
      inquiry_type: payload?.inquiry_type || 'Website Inquiry',
      product_name: payload?.product_name || '',
      timestamp: new Date().toISOString(),
    });
  }

  return { ok: true, blocked: false, ref: data.ref };
}
