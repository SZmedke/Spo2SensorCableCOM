# 复盘：Contact 页面改版与 Hero 排版踩坑经验总结

> **文档类型**：技术复盘 + 防踩坑 SOP
> **项目**：Medke B2B 官网（React + Vite + Tailwind CSS，Vercel 部署，SSG 预渲染）
> **时间**：2026-10-30
> **范围**：`/contact` 页面 1:1 还原、Supabase 附件与邮件链路、Hero 首屏标题排版连续 4 次返工
> **关联提交**：`b50ba33` → `342c881` → `a6847a9` → `c438874` → `491d17f` → `6bb4f15`
> **一句话结论**：**Hero 排版的 4 次失败不是“调得不够细”，而是“没有先测量、就急着改代码”**——真正的问题只有两个：全局 `max-width: 640px` 的静默限制、以及容器宽度不足；其余 `<br>`、`display: block`、`clamp()` 都是在错误前提上的补丁。

---

## 一、任务背景与交付清单

### 1.1 背景

Contact 页面是 B2B 询盘转化链路的核心落地页。本次任务要求：

1. 将定稿原型 `design/contact-page/contact-preview-v2.html` **1:1 落地**为 React 页面；
2. 打通“表单附件上传 → Supabase Storage → Edge Function → 邮件物理附件 + 下载卡片”的完整链路；
3. 在页面中校准工厂面积、欧盟授权代表等**合规事实**；
4. 完成全站 SSG 预渲染与上线。

> **原型一致性事实**：`contact-preview-v1.html` 与 `contact-preview-v2.html` 的 SHA256 完全一致（`B94B4DF1…B85C4744`），v2 只是命名版本，内容与 v1 字节一致。因此“以 v2 为准”与“以 v1 为准”在实现上没有差异。

### 1.2 交付清单

| 类别 | 交付物 | 验证方式 |
|---|---|---|
| 页面组件 | `src/pages/ContactPage.jsx` | 路由 `/contact` 可访问，结构与原型一致 |
| 页面样式 | `src/pages/ContactPage.css` | 全部规则嵌套在 `.contact-page` 作用域内 |
| 路由与 SEO | `scripts/route-meta.mjs` 中登记 `/contact` | 标题、描述、canonical 正常输出 |
| 附件上传 | 前端拖拽/选择文件、卡片预览、移除 | 25MB 前端校验、上传成功返回公开 URL |
| 存储桶 | Supabase `inquiry-attachments` | 上传成功、公开读取正常 |
| 邮件附件 | `supabase/functions/inquiry-submit/index.ts` | 邮件内出现物理附件 + 下载按钮 |
| 防垃圾 | Honeypot + 最小填写时长 | 机器人提交返回 400 |
| 合规事实 | 4,000 m² 工厂、Münster 欧代、`contact@medke.com` | 页面文案与邮件收件人一致 |
| 构建 | 81 个静态 HTML | `dist/` 实测 80 个页面 + 1 个 `404.html` |

### 1.3 关联提交链（真实记录）

| 提交 | 说明 | 结果 |
|---|---|---|
| `b50ba33` | 重构 Contact 页面：双栏工作区、RFQ Hub、工厂实证 | 基础版落地 |
| `342c881` | 按原型 100% 还原规格与样式 | 标题仍依赖自然折行 |
| `a6847a9` | 用 `<br>` + `clamp()` 强制两行 | **错误方案 1**：语义被改、仍是补丁 |
| `c438874` | 用 `.hero-title-line { display: block }` 强制两行 | **错误方案 2**：切词仍错 |
| `491d17f` | 对齐字体与标记，`hero-header` 放宽到 920px | **错误方案 3**：宽度仍不足 |
| `6bb4f15` | 解除 `max-width` 限制 + 语义化两行 + 1040px 容器 | **最终根治**（`+10 / -2`，仅 2 文件） |

---

## 二、系统基建：Supabase 附件与邮件链路

### 2.1 存储桶与 RLS 策略

在 Supabase 中创建存储桶：

- **Bucket 名称**：`inquiry-attachments`
- **访问策略**：配置 **2 条 public RLS 策略**（允许匿名上传、允许公开读取），以支持前端直传与邮件中的公开下载链接。

> **重要事实**：这两条存储桶策略是在 Supabase 云端控制台配置的；仓库内 `supabase/migrations/0001_inquiries.sql` **只包含** `public.inquiries` 表结构与权限回收，**不包含** bucket 迁移。新人复现时不要去找存储桶迁移文件，应直接登录 Supabase Dashboard → Storage 创建。

仓库内的表结构迁移（`supabase/migrations/0001_inquiries.sql`）关键内容：

```sql
create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  ref text not null unique,
  name text not null,
  company text,
  country text,
  email text not null,
  phone text,
  product_name text,
  quantity integer,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;
revoke all on table public.inquiries from anon;
revoke all on table public.inquiries from authenticated;
```

写入只走 Edge Function 的 service role，前端不直接写表。

### 2.2 前端上传与预览

`src/pages/ContactPage.jsx` 的上传逻辑分三步：

1. **前端校验**：单文件不得超过 25MB；
2. **Base64 转换**：仅当文件 ≤ 10MB 时读取为 Base64，用于 Resend 物理附件；
3. **上传 Storage**：把文件直传到 `inquiry-attachments`，成功后拼接公开 URL。

核心代码（节选，均来自当前源码）：

```js
// 1) 25MB 前端上限
if (file.size > 25 * 1024 * 1024) {
  setErrors((prev) => ({ ...prev, attachment: 'File size exceeds 25MB limit.' }));
  return;
}
setAttachment(file);

// 2) ≤10MB 才转 Base64，供邮件物理附件使用
if (attachment.size <= 10 * 1024 * 1024) {
  attachmentBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(attachment);
  });
}

// 3) 直传 Supabase Storage
const cleanFileName = attachment.name.replace(/[^a-zA-Z0-9._-]/g, '_');
const storagePath = `rfq_${Date.now()}_${cleanFileName}`;
const uploadRes = await fetch(
  `${supabaseUrl}/storage/v1/object/inquiry-attachments/${storagePath}`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${supabaseAnonKey}`,
      apikey: supabaseAnonKey,
      'Content-Type': attachment.type || 'application/octet-stream',
    },
    body: attachment,
  }
);
if (uploadRes.ok) {
  attachmentUrl = `${supabaseUrl}/storage/v1/object/public/inquiry-attachments/${storagePath}`;
}
```

提交时把附件元数据一并送入 Edge Function：

```js
source: 'Contact Page RFQ Form',
attachment_url: attachmentUrl,
attachment_name: attachment ? attachment.name : null,
attachment_size: attachment ? attachment.size : null,
attachment_base64: attachmentBase64,
```

> **设计要点**：URL 与 Base64 **双通道**。URL 用于邮件里的“下载原文件”卡片，Base64 用于“邮件物理附件”。二者互为兜底：即使 Storage 公开链接失效，收件人仍可直接收到附件。

### 2.3 Edge Function：附件处理与邮件发送

`supabase/functions/inquiry-submit/index.ts` 的关键逻辑：

```ts
import { encodeBase64 } from 'https://deno.land/std@0.224.0/encoding/base64.ts';

const MIN_FORM_ELAPSED_MS = 2500;

const honeypot = str(payload.b2b_website_url_hp, 500);
const formElapsedMs = Number(payload.form_elapsed_ms);
if (honeypot || !Number.isFinite(formElapsedMs) || formElapsedMs < MIN_FORM_ELAPSED_MS) {
  return jsonResponse({ error: 'Invalid submission' }, 400);
}
```

**物理附件兜底**：如果前端没有传 Base64、但存在 `attachment_url`，服务端会主动下载该文件，并在 ≤15MB 时转为 Base64：

```ts
if (!attachment_base64 && attachment_url) {
  const fileRes = await fetch(attachment_url);
  const buffer = await fileRes.arrayBuffer();
  if (buffer.byteLength <= 15 * 1024 * 1024) {
    attachment_base64 = encodeBase64(new Uint8Array(buffer));
  }
}

if (attachment_name && attachment_base64) {
  resendAttachments.push({
    filename: attachment_name,
    content: attachment_base64,
  });
}
```

**发送邮件（Resend）**：

```ts
const emailPayload: Record<string, unknown> = {
  from: 'SpO2SensorCable <noreply@spo2sensorcable.com>',
  to: ['contact@medke.com'],
  reply_to: email,
  subject: emailSubject,
  html: emailHtml,
};
if (resendAttachments.length > 0) {
  emailPayload.attachments = resendAttachments;
}

fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${resendKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(emailPayload),
});
```

**邮件内下载卡片**：

```html
<a href="${escapeHtml(attachment_url)}" target="_blank" rel="noopener noreferrer">
  ⬇️ Download File / 下载原文件
</a>
```

> **三层体积阈值**（务必分清）：前端校验 **25MB** → Base64 转换 **10MB** → 邮件物理附件 **15MB**。超过 10MB 的文件只走 Storage URL，不进物理附件；超过 15MB 的远端文件不会被服务端下载转码。

### 2.4 防垃圾与合规契约

| 机制 | 实现位置 | 规则 |
|---|---|---|
| Honeypot | `src/lib/inquiries.js` | 隐藏字段 `b2b_website_url_hp`，有值即拦截 |
| 最小填写时长（前端） | `src/lib/inquiries.js` | `MIN_INQUIRY_ELAPSED_MS = 2500` |
| 最小填写时长（服务端） | `supabase/functions/inquiry-submit/index.ts` | `MIN_FORM_ELAPSED_MS = 2500` |
| 邮箱质量校验 | `src/lib/inquiries.js` | 基础格式 + Gmail 过度点号检测 |
| 乱码文本检测 | `src/lib/inquiries.js` | 大小写交替的无意义长串 |
| 统一官方邮箱 | 页面 + 邮件 | `contact@medke.com` |

前端提交逻辑：

```js
export const INQUIRY_HONEYPOT_NAME = 'b2b_website_url_hp';
export const MIN_INQUIRY_ELAPSED_MS = 2500;

const securedPayload = {
  ...payload,
  [INQUIRY_HONEYPOT_NAME]: honeypotValue,
  form_elapsed_ms: formElapsedMs,
};

fetch(`${URL}/functions/v1/inquiry-submit`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ANON_KEY}`,
  },
  body: JSON.stringify(securedPayload),
});
```

> **注意**：前端常量名是 `MIN_INQUIRY_ELAPSED_MS`，服务端常量名是 `MIN_FORM_ELAPSED_MS`，两者值均为 `2500`。修改阈值时必须**同时改两处**，否则会出现“前端放行、服务端拒绝”的诡异现象。

### 2.5 合规事实校准

页面中的事实数据必须与公司资质一致，本次校准项：

| 字段 | 值 | 位置 |
|---|---|---|
| 工厂面积 | `4,000 m²` | 首屏统计、RFQ Hub 徽章、验厂 CTA、规格框 |
| 欧盟授权代表 | `MedNet EC-REP GmbH` | 合规信息区 |
| 欧代地址 | `Borkstrasse 10, 48163 Münster, Germany` | 合规信息区 |
| EUDAMED SRN | `CN-MF-000019638` | 合规信息区 |
| 官方邮箱 | `contact@medke.com` | 页面 `mailto:` + 邮件收件人 |

### 2.6 构建与预渲染

`package.json` 中的真实构建链：

```json
{
  "scripts": {
    "dev": "vite",
    "sitemap": "node scripts/generate-sitemap.mjs",
    "build:client": "vite build",
    "build:ssr": "vite build --ssr src/entry-server.jsx --outDir .ssr-build",
    "prerender": "node scripts/prerender.mjs",
    "build": "npm run sitemap && npm run build:client && npm run build:ssr && npm run prerender",
    "preview": "vite preview"
  }
}
```

实测结果：

- `public/sitemap.xml`：**76** 条 URL；
- `dist/`：**81** 个 `.html`（80 个路由页面 + 1 个 `404.html`）。

> **关于“构建前后保护 sitemap.xml”**：仓库内**没有**专门的备份/恢复脚本（`scripts/` 下只有 `generate-sitemap.mjs` 与 `prerender.mjs`）。`npm run build` 的第一步 `npm run sitemap` 会**覆盖** `public/sitemap.xml`。因此这是一项**人工纪律**，不是自动化能力。推荐做法见第 5.6 节。

---

## 三、Hero 排版为什么连续错 4 次

### 3.0 正确的设计语义（事实基线）

设计稿的强调词是 **`Medical Cable & Sensor`**，正确两行是：

```
Connect with Medke's Medical Cable & Sensor
Specialists
```

- **第一行**：`Connect with Medke's` + 高亮 `Medical Cable & Sensor`
- **第二行**：`Specialists`（不加高亮）

这个切分不是审美选择，而是**品类强调策略**：把“医疗线缆与传感器”作为一个完整的品类词组高亮，`Specialists` 作为身份落款单独成行。

### 3.1 根因一：全局样式污染（最隐蔽的杀手）

`src/styles.css` 第 295 行存在一条全局规则：

```css
/* src/styles.css:295 */
.hero-title { max-width: 640px; }
```

它在首页等旧页面是合理的，但对 Contact 页面是**静默约束**：

- 标题实际可用宽度被限制在 **640px**，而第一行文本在 40px Inter 下需要约 **976px**；
- 浏览器只能在 640px 内折行，于是出现“明明容器很宽，标题却提前断行”的诡异现象；
- 由于该规则不在 Contact 页面文件里，开发者即使反复检查 `ContactPage.css` 也找不到原因。

**教训**：跨页面复用的通用类名（`.hero-title`）一旦带尺寸约束，新页面必须**显式覆盖**，不能假设“我没写就是没限制”。

### 3.2 根因二：主观切词，篡改设计语义

第 2 次修复（`c438874`）的标记是：

```jsx
{/* 错误示范：c438874 */}
<span className="hero-title-line">Connect with Medke&apos;s Medical</span>
<span className="hero-title-line text-highlight">Cable &amp; Sensor Specialists</span>
```

问题有三层：

1. **`Medical` 被留在第一行**，导致高亮词组被拆散；
2. **第二行整体高亮**，`Specialists` 也被染色，强调重点从“品类”漂移到“身份”；
3. 开发者的真实动机是“让两行字数看起来对称”，这是**用视觉偏好覆盖设计意图**。

**教训**：设计稿的换行位置与高亮范围属于**内容语义**，不是样式细节。任何“为了好看”的切词都必须先向设计/需求方确认，不能自行决定。

### 3.3 根因三：用 Hack 掩盖真实问题

在真正的 `max-width` 问题被定位前，团队先后使用了三种“补丁”：

| 补丁 | 提交 | 为什么当时看起来有效 | 为什么最终无效 |
|---|---|---|---|
| `<br className="hero-title-break" />` | `a6847a9` | 强制在 `Medical` 后断行 | 只是把错误切词固化；移动端还需 `display: none` 额外处理 |
| `.hero-title-line { display: block }` | `c438874` | 每个 span 独占一行 | 依然没解决 640px 限制；切词仍然错误 |
| `font-size: clamp(32px, 4.2vw, 48px)` | `a6847a9` | 字号可变，视觉上“挤一挤能放下” | 字号随视口变化，排版不可预测；并未解除宽度约束 |

**教训**：当布局表现与 CSS 直觉不一致时，**第一动作是查 computed style，而不是加规则**。`<br>`、`display: block`、`clamp()` 都是“结果层”的补丁，无法修复“约束层”的根因。

### 3.4 根因四：字体度量差异

设计稿使用 **Inter**；生产环境早期未加载该字体时，浏览器回退到 **HarmonyOS Sans SC** 等中文优先字体，英文字符字面更宽，导致同一段文本的实际占宽变大、更早折行。

这也是为什么“本地看起来刚好、线上却断行”的原因之一：**字体不是装饰，字体是布局度量的一部分**。

最终在 `index.html` 中补齐字体加载：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

并在页面标题上显式声明字体栈：

```css
.hero-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
```

### 3.5 根因五：外层容器宽度不足

第 3 次修复（`491d17f`）把 `.hero-header` 从默认值放宽到 **920px**，但实测仍不够：

- 第一行完整文本在 **40px Inter** 下的实际宽度约 **976px**；
- 920px 容器 → 仍然提前折行；
- 最终将容器放宽到 **1040px**，才留出安全余量。

```css
/* 最终值 */
.hero-header {
  max-width: 1040px;
  margin: 0 auto 36px;
  text-align: center;
}
```

**教训**：容器宽度不能“凭感觉给”，要按 **字号 × 字符数 × 字体度量** 估算后再验证；`920px` 与 `1040px` 的差别，就是“差 56px 就断行”的真实案例。

### 3.6 四次返工时间线：每次到底错在哪

| 次数 | 提交 | 改动 | 表面效果 | 仍然错误的原因 | 暴露的认知偏差 |
|---|---|---|---|---|---|
| 第 1 次 | `a6847a9` | 在 `Medical` 后插入 `<br className="hero-title-break" />`；标题字号改 `clamp(32px, 4.2vw, 48px)` | 确实变成两行 | 断点位置错误（`Medical` 留在第一行）；高亮范围错误；640px 限制未解除 | 把“换行”当成排版问题，而非约束问题 |
| 第 2 次 | `c438874` | 改为 `.hero-title-line { display: block }` 的两个 span | 两行更稳定 | 切词依旧错误；容器与全局限制未处理 | 用结构手段掩盖语义错误 |
| 第 3 次 | `491d17f` | `.hero-header` 放宽到 `920px`，对齐字体与标记 | 部分视口改善 | 第一行实际需约 976px，920px 仍不够；640px 仍在 | 凭感觉给宽度，没有实测文本宽度 |
| 第 4 次 | `6bb4f15` | `.hero-header` 改 `1040px`；`.hero-title` 显式 `max-width: none`；语义化 `hero-title-top` / `hero-title-sub` | 完全符合设计稿 | —— | 先测量、再改代码，一次到位 |

> **关键观察**：前三次修复分别只处理了“换行方式”“结构”“容器”中的**一个**变量，却始终没有同时处理 **全局 640px 限制 + 容器 1040px + 语义切词** 这三个必要条件。排版问题往往是**多约束叠加**，单点修复必然反复。

---

## 四、最终彻底根治的技术方案

最终方案只有三件事：**语义化结构 + 显式解除限制 + 补齐字体度量**。改动量仅 `+10 / -2`（2 个文件），却解决了前面 4 次都没解决的问题。

### 4.1 语义化两行结构

`src/pages/ContactPage.jsx`（当前源码）：

```jsx
<h1 className="hero-title">
  <span className="hero-title-top">Connect with Medke&apos;s <span className="text-highlight">Medical Cable &amp; Sensor</span></span>{' '}
  <span className="hero-title-sub">Specialists</span>
</h1>
```

要点：

- `hero-title-top` 完整包含第一行语义：`Connect with Medke's` + 高亮 `Medical Cable & Sensor`；
- `hero-title-sub` 只承载 `Specialists`；
- 两个 span 之间的 `{' '}` 不能删：移动端它们回退为 `inline` 时，需要一个真实空格分隔，否则会渲染成 `SensorSpecialists`。

### 4.2 显式解除宽度限制

`src/pages/ContactPage.css`（规则嵌套在 `.contact-page` 作用域内）：

```css
.hero-header {
  max-width: 1040px;
  margin: 0 auto 36px;
  text-align: center;
}

.hero-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.18;
  color: var(--accent);
  margin-bottom: 16px;
  text-align: center;
  max-width: none;
}
```

关键点：

- `.hero-title { max-width: none; }` 是对全局 `src/styles.css:295` 的**显式覆盖**。因为规则嵌套在 `.contact-page` 下，编译后选择器为 `.contact-page .hero-title`，特异性高于全局 `.hero-title`，能够稳定生效；
- `.hero-header` 的 `1040px` 为第一行文本（约 976px）留出约 64px 安全余量。

### 4.3 引入 Inter 字体补齐度量

`index.html`：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

字体加载后，40px 下的字符宽度才与设计稿一致；否则回退字体（如 HarmonyOS Sans SC）会让英文更宽，继续提前折行。

### 4.4 响应式策略：桌面强制两行，移动端自然流

```css
/* 桌面端：≥769px 强制两个 span 各占一行，严格复刻设计稿 */
@media (min-width: 769px) {
  .hero-title-top,
  .hero-title-sub {
    display: block;
  }
}

/* 移动端：<769px 时 span 保持默认 inline，自然流式排版 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 28px;
    line-height: 1.25;
  }
}
```

为什么这样设计：

- **桌面端**：屏幕足够宽，设计稿的两行切分是品牌表达的一部分，必须严格保持；
- **移动端**：宽度不足以承载 40px 的两行文本，强行 `block` 会产生难看的孤行；回退为 `inline` 后由浏览器自然折行，同时把字号降到 `28px`、行高 `1.25`，保证可读性。

### 4.5 验证方法（可复制执行）

不要用“看起来对了”作为验收标准，用可量化的检查：

```js
// 1) 确认全局 640px 限制已被解除
getComputedStyle(document.querySelector('.hero-title')).maxWidth;
// 期望：'none'

// 2) 确认容器宽度达到 1040px（大屏）
document.querySelector('.hero-header').getBoundingClientRect().width;
// 期望：<= 1040，且在大屏下接近 1040

// 3) 确认字体确实是 Inter，而不是回退字体
getComputedStyle(document.querySelector('.hero-title')).fontFamily;
// 期望：以 'Inter' 开头
document.fonts.check('800 40px Inter');
// 期望：true

// 4) 确认桌面端为两行
const tops = document.querySelector('.hero-title-top').getBoundingClientRect();
const subs = document.querySelector('.hero-title-sub').getBoundingClientRect();
tops.bottom <= subs.top + 1;
// 期望：true（第二行在第一行下方）
```

多视口检查清单：

| 视口 | 期望表现 |
|---|---|
| 1440px | 两行；第一行完整包含 `Medical Cable & Sensor`；无横向滚动 |
| 1280px | 同上 |
| 1024px | 同上 |
| 769px | 同上（断点临界值） |
| 768px | 回退 inline 自然流；字号 28px；无溢出 |
| 375px | 自然流；字号 28px；无横向滚动 |

### 4.6 最终验收结果

- 桌面端（≥769px）：标题严格两行，第一行以高亮 `Medical Cable & Sensor` 结束，第二行为 `Specialists`；
- 移动端（<769px）：平滑回退为自然流，字号 28px、行高 1.25；
- 全视口无横向滚动、无文字裁切；
- 字体为 Inter（Google Fonts，400–800），度量与设计稿一致。

---

## 五、五大防踩坑规范（SOP）

以下五条不是“建议”，而是**强制检查项**。任何一条缺失，都可能重演本次的 4 次返工。

### SOP 1：改样式前，先量 computed style

**触发场景**：任何“宽度不对 / 折行不对 / 字体不对”的排版问题。

**标准动作（按顺序，不得跳步）**：

1. 打开 DevTools → Elements → 选中目标元素；
2. 切到 **Computed** 面板，记录 `width`、`max-width`、`font-family`、`font-size`、`line-height` 的**实际值**；
3. 在 Console 复核：

```js
const el = document.querySelector('.hero-title');
const cs = getComputedStyle(el);
console.log({
  maxWidth: cs.maxWidth,
  width: el.getBoundingClientRect().width,
  fontFamily: cs.fontFamily,
  fontSize: cs.fontSize,
  lineHeight: cs.lineHeight,
});
```

4. 在 **Styles** 面板向上追溯，找到**真正生效的规则及其来源文件**；
5. 记录“实际值 vs 设计期望值”，再决定改哪一条。

**禁止**：在未查明根因前添加 `<br>`、`!important`、`clamp()`、`display: block`。

**验收**：能明确说出“是哪一行 CSS 导致了当前表现”。

### SOP 2：设计语义不可篡改（换行位置与高亮范围）

**触发场景**：标题、标语、品类词、认证名称等品牌文案。

**标准动作**：

1. 换行位置、高亮范围、标点符号以设计稿为唯一依据；
2. 若为了响应式必须调整，先向设计/需求方确认，并记录决策；
3. 实现时用**语义化 span**（如 `hero-title-top` / `hero-title-sub`）承载设计切分，而不是用 `<br>` 或字数均衡；
4. Code Review 时逐字比对文案与高亮范围。

**验收**：设计稿与线上截图逐字一致；高亮词未被拆散。

### SOP 3：禁止用 Hack 作为首选修复

**禁止清单**：

- 用 `<br>` 控制布局换行；
- 无依据的 `clamp()` 调字号；
- 无依据的 `!important`；
- 用 `display: block` 强行制造行。

**允许场景**：仅在根因已确认、且有明确兜底需求时使用；使用时必须写注释说明“为什么必须这样做”。

**验收**：每个 Hack 都能回答“根因是什么、为什么常规方案不适用”。

### SOP 4：全局通用类必须显式重置

**触发场景**：新页面复用了全局类名（`.hero-title`、`.container`、`.factory-card` 等）。

**标准动作**：

1. 开发前先全局检索同名类：

```bash
grep -rn "\.hero-title" src/styles.css src/**/*.css
```

2. 在页面作用域内**显式声明**需要覆盖的属性（如 `max-width: none`），不要依赖“默认值”；
3. 优先使用页面作用域选择器（`.contact-page .hero-title`），**不要直接修改全局规则**，避免影响其他页面；
4. 覆盖后必须验证 computed style 已变化。

**验收**：新页面的 computed style 与设计期望一致，且其他页面无回归。

### SOP 5：字体与容器宽度纳入验收（度量意识）

**触发场景**：任何依赖文本宽度的排版（标题、按钮、导航）。

**标准动作**：

1. 字体必须在 `index.html` 通过 Google Fonts（或本地字体）加载，并使用 `display=swap`；
2. 在目标字号下实测文本宽度，容器宽度 = 实测宽度 + 安全余量（建议 ≥5%）；
3. 验收时必须等字体加载完成后再测（`document.fonts.ready`）；
4. 多视口截图留档，记录实际像素值。

**验收**：字体加载前后布局不跳变；容器不产生意外折行。

### 5.6 附：构建前 sitemap 保护纪律（人工操作）

> 再次强调：仓库**没有**自动化保护脚本。`npm run build` 会先执行 `npm run sitemap` 覆盖 `public/sitemap.xml`。

推荐的人工流程：

```powershell
# 1) 构建前备份
Copy-Item public\sitemap.xml public\sitemap.xml.bak -Force

# 2) 构建（内部会重新生成 sitemap）
npm run build

# 3) 构建后校验 URL 数量（当前基线为 76）
(Select-String public\sitemap.xml -Pattern '<loc>' -AllMatches).Matches.Count

# 4) 若生成结果异常，用备份恢复，并同步 dist
Copy-Item public\sitemap.xml.bak public\sitemap.xml -Force
Copy-Item public\sitemap.xml dist\sitemap.xml -Force
Remove-Item public\sitemap.xml.bak -Force
```

**验收**：`public/sitemap.xml` 与 `dist/sitemap.xml` 内容一致、URL 数量为预期值。

---

## 六、结论与上线前自检清单

### 6.1 一句话结论

> Hero 排版的 4 次返工，本质是**把“约束问题”误判为“样式问题”**。先量 computed style，再改一行 CSS，胜过四次直觉补丁。

### 6.2 上线前自检清单

- [ ] `.hero-title` 的 computed `max-width` 为 `none`；
- [ ] `.hero-header` 在大屏下宽度为 1040px（或接近）；
- [ ] 字体为 Inter，`document.fonts.check('800 40px Inter')` 为 `true`；
- [ ] 桌面端（≥769px）标题严格两行，第一行以高亮 `Medical Cable & Sensor` 结束；
- [ ] 移动端（<769px）自然流、字号 28px、无横向滚动；
- [ ] 375 / 768 / 769 / 1024 / 1280 / 1440 六档视口均无溢出与裁切；
- [ ] 设计稿与线上截图逐字比对通过；
- [ ] 附件上传链路：25MB 前端拦截、≤10MB 转 Base64、Storage 公开 URL 可访问；
- [ ] 邮件链路：物理附件存在、`⬇️ Download File / 下载原文件` 可点击；
- [ ] 防垃圾：Honeypot 有值被拦截、`< 2500ms` 提交返回 400；
- [ ] 合规事实：`4,000 m²`、`Münster` 欧代、`contact@medke.com` 全站一致；
- [ ] 构建：81 个 HTML、sitemap 76 条 URL。

---

## 附录 A：本次涉及的真实文件与命令

| 类型 | 路径 / 命令 |
|---|---|
| 设计原型 | `design/contact-page/contact-preview-v2.html`（与 v1 SHA256 一致） |
| 页面组件 | `src/pages/ContactPage.jsx` |
| 页面样式 | `src/pages/ContactPage.css`（规则嵌套于 `.contact-page`） |
| 全局污染源 | `src/styles.css`（第 295 行 `.hero-title { max-width: 640px; }`） |
| 字体加载 | `index.html`（Google Fonts Inter，400–800） |
| 询盘客户端 | `src/lib/inquiries.js`（`INQUIRY_HONEYPOT_NAME`、`MIN_INQUIRY_ELAPSED_MS`） |
| Edge Function | `supabase/functions/inquiry-submit/index.ts`（`MIN_FORM_ELAPSED_MS`、Resend、附件） |
| 表结构迁移 | `supabase/migrations/0001_inquiries.sql` |
| 存储桶 | Supabase `inquiry-attachments`（控制台创建，**仓库无迁移文件**） |
| SEO 路由 | `scripts/route-meta.mjs` |
| sitemap 生成 | `scripts/generate-sitemap.mjs`（`npm run sitemap`） |
| 预渲染 | `scripts/prerender.mjs`（`npm run prerender`） |
| 构建 | `npm run build` |

## 附录 B：事实核验记录

| 核验项 | 结果 |
|---|---|
| v1 / v2 原型一致性 | SHA256 完全相同（`B94B4DF1…B85C4744`） |
| 全局 640px 规则 | `src/styles.css:295` 实测存在 |
| 历史 920px 容器 | `git show 491d17f:src/pages/ContactPage.css` 实测存在 |
| 历史 `<br>` 方案 | `git show a6847a9:src/pages/ContactPage.jsx` 实测存在 |
| 历史 `.hero-title-line` 方案 | `git show c438874:src/pages/ContactPage.jsx` 实测存在 |
| 历史 `clamp(32px, 4.2vw, 48px)` | `git show a6847a9:src/pages/ContactPage.css` 实测存在 |
| 最终 1040px / `max-width: none` | `src/pages/ContactPage.css:132-190` 实测存在 |
| 桌面两行 / 移动 28px | `ContactPage.css:191-196`、`1577-1592` 实测存在 |
| Inter 字体 | `index.html:16` 实测存在 |
| 双端 2500ms 阈值 | 客户端 `src/lib/inquiries.js:10`、服务端 `index.ts:22` 实测存在 |
| sitemap / HTML 数量 | 76 条 URL；`dist/` 81 个 HTML（80 + 404） |
| 提交链 | `b50ba33` → `342c881` → `a6847a9` → `c438874` → `491d17f` → `6bb4f15` |

---

*文档整理：team-recorder | 依据：本次 Contact 改版全部提交记录、源码逐行抽查、构建产物实测*
