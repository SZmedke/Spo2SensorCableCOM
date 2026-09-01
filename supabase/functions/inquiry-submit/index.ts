// Public inquiry submission endpoint for the Medke lead form.
// Validates payload server-side and inserts with the service-role client.
// Direct table access is revoked for anon/authenticated — this function is
// the only write path. No secrets are exposed; service role stays server-side.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'Server is missing Supabase environment variables' }, 500);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload' }, 400);
  }

  const name = str(payload.name, 120);
  const email = str(payload.email, 200);
  const message = str(payload.message, 5000);
  if (!name || !email || !message) {
    return jsonResponse({ error: 'name, email and message are required' }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return jsonResponse({ error: 'Invalid email address' }, 400);
  }

  // 提取其余字段
  const company = str(payload.company, 200) || null;
  const country = str(payload.country, 100) || null;
  const phone = str(payload.phone, 60) || null;
  const product_name = str(payload.product_name, 300) || null;

  let quantity: number | null = null;
  if (payload.quantity !== '' && payload.quantity != null) {
    const n = Number(payload.quantity);
    if (Number.isFinite(n) && n > 0) quantity = Math.min(999999, Math.floor(n));
  }

  const ref = `MK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await adminClient.from('inquiries').insert({
    ref, name, company, country, email, phone, product_name, quantity, message, status: 'new',
  });

  if (error) {
    console.error('inquiry insert failed', error.message);
    return jsonResponse({ error: 'Failed to save inquiry' }, 500);
  }

  // 写库成功后发邮件通知（fire-and-forget：邮件失败不影响询盘提交）
  const resendKey = Deno.env.get('RESEND_API_KEY');
  if (resendKey) {
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SpO2SensorCable <noreply@spo2sensorcable.com>',
        to: ['contact@medke.com'],
        subject: `[新询盘] ${name} · ${ref}`,
        html: `
          <h2 style="color:#243181;">收到新询盘 ${ref}</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            <tr><td style="padding:8px;border:1px solid #ddd;color:#666;width:120px;"><b>姓名</b></td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;color:#666;"><b>公司</b></td><td style="padding:8px;border:1px solid #ddd;">${company ?? '-'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;color:#666;"><b>国家</b></td><td style="padding:8px;border:1px solid #ddd;">${country ?? '-'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;color:#666;"><b>邮箱</b></td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;color:#666;"><b>电话</b></td><td style="padding:8px;border:1px solid #ddd;">${phone ?? '-'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;color:#666;"><b>产品</b></td><td style="padding:8px;border:1px solid #ddd;">${product_name ?? '-'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;color:#666;"><b>数量</b></td><td style="padding:8px;border:1px solid #ddd;">${quantity ?? '-'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;color:#666;"><b>留言</b></td><td style="padding:8px;border:1px solid #ddd;">${message}</td></tr>
          </table>
          <p style="margin-top:16px;">
            <a href="https://supabase.com/dashboard/project/qfunwqytvbjyhhpxetsm/editor" style="background:#243181;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">
              → 在 Supabase 查看全部询盘
            </a>
          </p>
        `,
      }),
    }).catch((err) => console.error('resend error', err));
  }

  return jsonResponse({ ok: true, ref });
});
