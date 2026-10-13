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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanCustomerMessage(raw: string): string {
  if (!raw) return '';
  const lines = raw.split(/\r?\n/);
  const filtered = lines.filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return true; // keep blank lines for paragraph spacing
    // 过滤掉与上方客户档案/类型重复的系统拼接固定标签
    if (/^\[.*request.*\]$/i.test(trimmed)) return false;
    if (/^company\s*:/i.test(trimmed)) return false;
    if (/^country(\/region)?\s*:/i.test(trimmed)) return false;
    if (/^requested certificates(\/dossiers| & compliance dossiers)?\s*:/i.test(trimmed)) return false;
    if (/^(est\.? annual quantity|target line \/ est\.? quantity)\s*:/i.test(trimmed)) return false;
    return true;
  });

  // 去除首尾连续空行
  return filtered.join('\n').trim();
}

function formatMessageHtml(raw: string): string {
  const cleaned = cleanCustomerMessage(raw);
  if (!cleaned) return '<span style="color:#94a3b8;font-style:italic;">No additional message specified.</span>';
  const escaped = escapeHtml(cleaned);
  return escaped.replace(/\r\n/g, '<br/>').replace(/[\r\n]/g, '<br/>');
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'Server is missing Supabase environment variables' }, 500);
  }

  // 获取访客发件的真实公网 IP 与地理位置（优先从 Cloudflare/代理头获取）
  const clientIp = 
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'Unknown';
  const clientGeoCountry = request.headers.get('cf-ipcountry') || null;

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload' }, 400);
  }

  const name = str(payload.name, 120);
  const email = str(payload.email, 200);
  const rawMessage = str(payload.message, 5000);
  if (!name || !email || !rawMessage) {
    return jsonResponse({ error: 'name, email and message are required' }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return jsonResponse({ error: 'Invalid email address' }, 400);
  }

  // 提取其余字段并提供容错解析（如果顶层未传，从 message 中智能挽救）
  let company = str(payload.company, 200) || null;
  let country = str(payload.country, 100) || null;

  if (!company) {
    const compMatch = rawMessage.match(/Company\s*:\s*([^\r\n]+)/i);
    if (compMatch && compMatch[1]?.trim()) {
      company = compMatch[1].trim();
    }
  }

  if (!country) {
    const countryMatch = rawMessage.match(/Country(?:\/Region)?\s*:\s*([^\r\n]+)/i);
    if (countryMatch && countryMatch[1]?.trim()) {
      country = countryMatch[1].trim();
    } else if (clientGeoCountry && clientGeoCountry !== 'XX') {
      country = clientGeoCountry;
    }
  }

  const phone = str(payload.phone, 60) || null;
  const product_name = str(payload.product_name, 300) || null;
  const inquiry_type = str(payload.inquiry_type, 150) || null;
  let quantity_text = str(payload.quantity_text, 100) || null;

  if (!quantity_text) {
    const qtyMatch = rawMessage.match(/(?:Quantity|Target Line \/ Est\.? Quantity)\s*:\s*([^\r\n]+)/i);
    if (qtyMatch && qtyMatch[1]?.trim()) {
      quantity_text = qtyMatch[1].trim();
    }
  }

  let quantity: number | null = null;
  if (payload.quantity !== '' && payload.quantity != null) {
    const n = Number(payload.quantity);
    if (Number.isFinite(n) && n > 0) quantity = Math.min(999999, Math.floor(n));
  } else if (quantity_text) {
    const parsed = parseInt(quantity_text.replace(/[^\d]/g, ''), 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      quantity = Math.min(999999, parsed);
    }
  }

  const ref = `MK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 严格安全入库：只写入 inquiries 表已存在的列
  const { error } = await adminClient.from('inquiries').insert({
    ref,
    name,
    company,
    country,
    email,
    phone,
    product_name,
    quantity,
    message: rawMessage,
    status: 'new',
  });

  if (error) {
    console.error('inquiry insert failed', error.message);
    return jsonResponse({ error: 'Failed to save inquiry' }, 500);
  }

  // 写库成功后发邮件通知（fire-and-forget：邮件失败不影响询盘提交）
  const resendKey = Deno.env.get('RESEND_API_KEY');
  if (resendKey) {
    const typeTag = inquiry_type || (product_name ? 'Product Quote' : 'New Inquiry');
    const subjectParts = [
      `[${typeTag}]`,
      country ? `${country} · ` : '',
      company ? `${company} · ` : '',
      `${name} (${ref})`,
    ].filter(Boolean);
    const emailSubject = subjectParts.join(' ').replace(/\s+/g, ' ').trim();

    // 格式化时间 (UTC+8 对应深圳工作时间)
    const submittedTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Shanghai',
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: true,
    });

    // 快速跟进动作链接
    const mailtoUrl = `mailto:${email}`;

    const cleanPhoneDigits = phone ? phone.replace(/[^\d]/g, '') : '';
    const waText = encodeURIComponent(`Hello ${name}, this is Medke Technology regarding your recent inquiry (${ref}). How may we assist you with medical accessories?`);
    const waUrl = cleanPhoneDigits ? `https://wa.me/${cleanPhoneDigits}?text=${waText}` : null;

    const quantityDisplay = quantity != null 
      ? `${quantity.toLocaleString()} pcs` 
      : (quantity_text || null);

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Medke Inquiry</title>
</head>
<body style="margin:0;padding:24px 0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;-webkit-font-smoothing:antialiased;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;margin:0 auto;padding:0 12px;">
    <tr>
      <td>
        <!-- Main Card Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:#243181;padding:28px 32px;color:#ffffff;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;line-height:1.2;">
                      SHENZHEN MEDKE TECHNOLOGY
                    </div>
                    <div style="font-size:12px;color:#93c5fd;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-top:4px;">
                      Official Website Lead Alert · 官网新询盘通知
                    </div>
                  </td>
                  <td align="right" valign="top">
                    <span style="display:inline-block;padding:5px 12px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.03em;color:#ffffff;font-family:ui-monospace,Menlo,Consolas,monospace;">
                      ${escapeHtml(ref)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;">
                    <div style="display:inline-block;background:#0047ff;color:#ffffff;font-size:12px;font-weight:700;padding:4px 10px;border-radius:4px;margin-right:8px;">
                      ${escapeHtml(typeTag)}
                    </div>
                    <span style="font-size:12px;color:#cbd5e1;">
                      Submitted: ${submittedTime} (GMT+8)
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Profile Section -->
          <tr>
            <td style="padding:28px 32px 20px;">
              <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">
                Client Profile · 客户核心档案
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:14px;">
                <tr>
                  <td style="padding:10px 16px;color:#64748b;width:120px;border-bottom:1px solid #edf2f7;font-weight:600;">Full Name</td>
                  <td style="padding:10px 16px;color:#0f172a;border-bottom:1px solid #edf2f7;font-weight:700;font-size:15px;">
                    ${escapeHtml(name)}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#64748b;border-bottom:1px solid #edf2f7;font-weight:600;">Company</td>
                  <td style="padding:10px 16px;color:#1e293b;border-bottom:1px solid #edf2f7;font-weight:600;">
                    ${company ? escapeHtml(company) : '<span style="color:#94a3b8;font-weight:normal;">Not specified</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#64748b;border-bottom:1px solid #edf2f7;font-weight:600;">Country / Region</td>
                  <td style="padding:10px 16px;border-bottom:1px solid #edf2f7;">
                    ${country 
                      ? `<span style="display:inline-block;background:#e0f2fe;color:#0369a1;font-weight:700;padding:2px 8px;border-radius:4px;font-size:13px;">${escapeHtml(country)}</span>` 
                      : '<span style="color:#94a3b8;">Not specified</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#64748b;border-bottom:1px solid #edf2f7;font-weight:600;">Email Address</td>
                  <td style="padding:10px 16px;border-bottom:1px solid #edf2f7;">
                    <a href="mailto:${escapeHtml(email)}" style="color:#0047ff;font-weight:600;text-decoration:none;">
                      ${escapeHtml(email)}
                    </a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding:10px 16px;color:#64748b;font-weight:600;">Phone / WhatsApp</td>
                  <td style="padding:10px 16px;color:#0f172a;font-weight:600;">
                    ${escapeHtml(phone)}
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Requirement & Message Section -->
          <tr>
            <td style="padding:0 32px 28px;">
              <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">
                Requirement & Inquiry Details · 需求详情
              </div>
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;font-size:14px;">
                <tr>
                  <td style="padding:6px 0;color:#64748b;width:120px;font-weight:600;">Target Product / Scope:</td>
                  <td style="padding:6px 0;color:#1e293b;font-weight:700;">
                    ${product_name ? escapeHtml(product_name) : 'General Accessories'}
                  </td>
                </tr>
                ${quantityDisplay ? `
                <tr>
                  <td style="padding:6px 0;color:#64748b;font-weight:600;">Target Quantity:</td>
                  <td style="padding:6px 0;color:#0f172a;font-weight:700;">
                    <span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-size:13px;">
                      ${escapeHtml(quantityDisplay)}
                    </span>
                  </td>
                </tr>
                ` : ''}
              </table>

              <!-- Detailed Message Box (已清洗去重) -->
              <div style="background:#f8fafc;border-left:4px solid #243181;border-radius:4px 8px 8px 4px;padding:16px 18px;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
                <div style="font-size:12px;font-weight:700;color:#475569;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.04em;">
                  Customer Message / Requested Items:
                </div>
                <div style="font-size:14px;line-height:1.65;color:#1e293b;word-break:break-word;">
                  ${formatMessageHtml(rawMessage)}
                </div>
              </div>
            </td>
          </tr>

          <!-- Follow-up Action CTAs -->
          <tr>
            <td style="padding:20px 32px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;">
              <div style="font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:14px;">
                Direct Sales Follow-up Actions · 业务一键跟进
              </div>
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="${mailtoUrl}" style="display:inline-block;background:#0047ff;color:#ffffff;font-size:14px;font-weight:700;padding:12px 22px;border-radius:6px;text-decoration:none;box-shadow:0 2px 6px rgba(0,71,255,0.25);">
                      ✉️ Reply via Email / 一键回信
                    </a>
                  </td>
                  ${waUrl ? `
                  <td>
                    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#16a34a;color:#ffffff;font-size:14px;font-weight:700;padding:12px 20px;border-radius:6px;text-decoration:none;box-shadow:0 2px 6px rgba(22,163,74,0.25);">
                      💬 Chat on WhatsApp
                    </a>
                  </td>
                  ` : ''}
                </tr>
              </table>

              <!-- 访客实际发件公网 IP 地址展示栏 -->
              <div style="margin-top:18px;padding-top:14px;border-top:1px dashed #cbd5e1;font-size:12px;color:#64748b;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="color:#64748b;">
                      <strong>访客实际发件 IP：</strong>
                      <span style="font-family:ui-monospace,Menlo,Consolas,monospace;background:#e2e8f0;color:#0f172a;padding:2px 6px;border-radius:4px;font-weight:600;">${escapeHtml(clientIp)}</span>
                      ${clientGeoCountry ? `<span style="margin-left:6px;color:#475569;font-weight:600;">(${escapeHtml(clientGeoCountry)})</span>` : ''}
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

        </table>

        <!-- Email Footer -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:18px;">
          <tr>
            <td align="center" style="font-size:12px;color:#94a3b8;line-height:1.5;">
              This is an automated dispatch from <strong style="color:#64748b;">spo2sensorcable.com</strong>.<br/>
              Shenzhen Medke Technology Co., Ltd. · All rights reserved.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
    `;

    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SpO2SensorCable <noreply@spo2sensorcable.com>',
        to: ['contact@medke.com'],
        reply_to: email,
        subject: emailSubject,
        html: emailHtml,
      }),
    }).catch((err) => console.error('resend error', err));
  }

  return jsonResponse({ ok: true, ref });
});
