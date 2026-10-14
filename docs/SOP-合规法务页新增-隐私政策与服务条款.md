# SOP：为 Medke B2B 官网新增合规法务页（隐私政策 / 服务条款）

> **文档定位**：把"新增一组合规法务页并成功上线"的实战流程沉淀为可复制、照着做就能复现的标准作业流程（SOP）。
> **适用项目**：`E:\Acciowork Space\Ai建站\Spo2SensorCableCOM`（React + Vite + Tailwind CSS，Vercel 部署，预渲染生成静态 HTML）。
> **延伸用途**：以后新增 Cookie 政策、退换货政策、合规声明、经销商政策等同类页面，直接套用本流程。
> **首次实践**：`/privacy-policy` + `/terms-of-service` 两页 + 页脚常驻入口，上线 commit `fcf8248`（7 files changed, +462/-73）。预渲染 HTML 由 **77 增至 79**。
> **维护**：team-recorder。文档中所有路径、脚本、命令均已逐一核实存在（见附录 A）。

---

## 一、适用场景

满足以下任一情形时，使用本 SOP：

- 需要给官网**新增一个纯内容型法务/合规页面**（隐私政策、服务条款、Cookie 政策、退换货 / 退款政策、合规声明、经销商条款等）。
- 页面内容来源是 **DOCX / PDF 模板**，需要转写为站内 React 页面。
- 页面需要**进入 sitemap、可被搜索引擎与 AI 爬虫抓取**（本站为预渲染静态站，必须走同一套路由与 SEO 单一事实源）。
- 需要与既有页面**共享页脚入口 / 品牌信息（公司名、邮箱、电话）**，保证口径一致。

**不适用**：需要复杂交互、表单提交、登录态的功能页；这类页面走常规开发流程，不套用本 SOP。

---

## 二、前置条件

### 2.1 环境

| 项 | 要求 | 核实方式 |
|---|---|---|
| Node.js | 已安装（本项目实测 v22.x） | `node --version` |
| npm | 随 Node 安装 | `npm --version` |
| Python 3 | 用于 DOCX 抽取（可选，见阶段 1） | `python --version` |
| Git | 已配置并可推送 | `git --version` |
| 依赖 | 项目根目录已 `npm install` | 根目录存在 `node_modules/` |

### 2.2 项目现状（本 SOP 依赖的既有基建，均已存在）

| 能力 | 文件 | 说明 |
|---|---|---|
| 路由 / SEO **单一事实源** | `scripts/route-meta.mjs` | 导出 `ROUTES` 与 `ORIGIN`，sitemap 与预渲染共用，URL 与 `<head>` 永不漂移 |
| 预渲染脚本 | `scripts/prerender.mjs` | 为每条路由生成真实 HTML，供不执行 JS 的爬虫读取 |
| sitemap 生成脚本 | `scripts/generate-sitemap.mjs` | 由 `ROUTES` 生成 `public/sitemap.xml` |
| SSR 入口 | `src/entry-server.jsx` | 导出 `render(url)` 供预渲染调用 |
| 路由挂载 | `src/App.jsx` | 页面必须在 `<Routes>` 中注册 |
| 品牌信息源 | `src/data/catalog.js` | 导出 `COMPANY`（`legalName` / `email` / `whatsapp` / `address` 等） |
| 共享页脚 | `src/components/footer/Footer.jsx` | 法务入口与版权行 |
| 全局样式 | `src/styles.css` | 法务页样式位于 `Legal pages` 注释区块 |

### 2.3 脚本命令（`package.json` 中真实存在）

| 命令 | 作用 |
|---|---|
| `npm run dev` | 本地开发服务器 |
| `npm run sitemap` | 生成 `public/sitemap.xml` |
| `npm run build` | 完整构建 = `sitemap` → `build:client` → `build:ssr` → `prerender` |
| `npm run preview` | 本地预览 `dist/` 构建产物 |

### 2.4 内容准备

- 一份或两份**已批准的法律文本模板**（DOCX 或 PDF）。
- 明确需要替换的**公司事实口径**：法定公司名、域名、邮箱、电话 / WhatsApp、地址（本站在 `src/data/catalog.js` 的 `COMPANY` 中统一维护）。
- 明确本次是否需要对模板做**口径改写**（例如：管辖法条款、数据保留口径）。改写项必须逐条留档并经确认。

---

## 三、闭环总览（6 环，缺一不可）

```
① 模板转写  →  ② 3 处口径改写  →  ③ 独立内容校对
   →  ④ UI 视觉复核  →  ⑤ 缺陷修复  →  ⑥ 推送与生产复核
```

每一环都有明确的"产出物"与"验证方式"，未通过验证不得进入下一环。核心纪律：**本地构建验证 → 用户本地预览确认 → 才推送 → 推送后必须做生产环境复核**。

---

## 四、分步操作（命令可直接复制执行）

> 约定：以下命令在工作目录 `E:\Acciowork Space\Ai建站\Spo2SensorCableCOM` 下执行；Shell 为 Windows PowerShell 5.1（**不支持 `&&`，用 `;` 串联**）。

### 阶段 1 · 模板转写（DOCX → 可校对纯文本）

**目的**：把 DOCX 模板的正文提取成纯文本，供改写与校对使用。

**⚠️ 关键认知**：`.docx` 本质是 **ZIP 压缩包**。直接读会得到二进制流（以 `PK` 开头），必须解压其中的 `word/document.xml` 并去标签，或用 `python-docx` 抽取。

**方式 A（推荐，Python 标准库，无需安装第三方包）：**

把下面这段保存为临时脚本（放在项目**之外**，不污染仓库）：

```powershell
$py = @'
import zipfile, re, sys
with zipfile.ZipFile(sys.argv[1]) as z:
    xml = z.read("word/document.xml").decode("utf-8")
xml = re.sub(r"<w:p[ >]", "\n", xml)   # 段落换行
text = re.sub(r"<[^>]+>", "", xml)      # 去标签
print(text)
'@
Set-Content -Path "$env:TEMP\extract-docx.py" -Value $py -Encoding UTF8
python "$env:TEMP\extract-docx.py" "C:\路径\隐私政策模板.docx" > "$env:TEMP\privacy.txt"
Get-Content "$env:TEMP\privacy.txt" | Select-Object -First 40
```

**方式 B（python-docx，需先安装）：**

```powershell
pip install python-docx
python -c "import docx; print('\n'.join(p.text for p in docx.Document(r'C:\路径\隐私政策模板.docx').paragraphs))"
```

**产出物**：可读的纯文本 `privacy.txt` / `terms.txt`。
**通过标准**：文本可读、标题层级完整、模板占位符（如 `XXXXX`、"这里写"、"公司名"）肉眼可见。

---

### 阶段 2 · 内容落码（新建页面 + 挂路由 + 登记 SEO）

**目的**：让页面在站内真实可达、可预渲染、可进 sitemap。

**步骤 2.1 新建页面组件**

在 `src/pages/` 下新建页面，参考既有文件：

- `src/pages/PrivacyPolicyPage.jsx`
- `src/pages/TermsOfServicePage.jsx`

约定与要点：

- 外层用 `<div className="section">` + `<div className="container-site legal-page-wrap">`；
- 面包屑：`<nav className="breadcrumb">` + `lucide-react` 的 `ChevronRight`；
- 头部：`eyebrow`（"Compliance & Legal"）+ `<h1 className="h-1">` + 生效日期行；
- 正文容器：`<article className="legal-card legal-body">`（**列表编号/圆点的样式修复依赖 `.legal-body` 作用域，不要改类名**）；
- 公司事实**不要硬编码**，一律引用 `COMPANY`：

```jsx
import { COMPANY } from '../data/catalog';
// ...
<strong>{COMPANY.legalName}</strong><br />
Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
Phone/WhatsApp: {COMPANY.whatsapp}<br />
Address: {COMPANY.address}
```

**步骤 2.2 在 App.jsx 挂路由**

编辑 `src/App.jsx`：顶部 `import` 页面组件，并在 `<Routes>` 中注册（参考文件内 `/privacy-policy`、`/terms-of-service` 两行，现位于 `App.jsx` 第 79–80 行）。

```jsx
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
// ...
<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
```

**步骤 2.3 登记到 SEO 单一事实源**

编辑 `scripts/route-meta.mjs`，在 `build()` 内用 `add(...)` 登记（**这是唯一需要登记 SEO 的地方，切勿在别处重复维护 URL / 标题）**：

```js
add('/privacy-policy',
  `Privacy Policy | ${BRAND}`,
  `Privacy Policy for ${COMPANY.legalName} (${ORIGIN}). Learn how we collect, use, and protect your personal information and B2B inquiry data.`,
  0.3, 'yearly');
```

`add` 签名（`route-meta.mjs` 中实现）：

```
add(path, title, description, priority, changefreq, canonical)
```

- `canonical` 可省略，默认等于 `path`；仅当两个 URL 渲染同一内容（别名页）时才显式指向长格式。
- `description` 会被内部 `clamp()` 截断到约 158 字符，无需手动截断。

**步骤 2.4 补充页脚常驻入口**

编辑 `src/components/footer/Footer.jsx`，在 `footer-legal-links` 容器内加入 `<Link>`（当前为 Privacy Policy / Terms of Service 两条，中间以 `·` 分隔，见 `Footer.jsx` 第 67–71 行）。

**通过标准**：本地 `npm run dev` 能直接访问新路由且无控制台报错。

---

### 阶段 3 · 三处口径改写（本次具体改写项）

只改"必须改"的地方，其余**忠实照搬模板**。本次批准的 3 处改写：

| # | 改写项 | 位置 | 说明 |
|---|---|---|---|
| ① | **占位符替换** | 全篇 | 域名 → `www.spo2sensorcable.com`（或 `ORIGIN`）；公司名 → `COMPANY.legalName`；邮箱 / 电话 / 地址 → `COMPANY` 对应字段 |
| ② | **Terms §10 管辖法** | `src/pages/TermsOfServicePage.jsx` 的 `10. Governing Law` | 改为受**中华人民共和国法律**管辖（`the laws of the People's Republic of China`） |
| ③ | **Privacy DATA RETENTION** | `src/pages/PrivacyPolicyPage.jsx` 的 `DATA RETENTION` | 改为 **B2B 询盘口径**：仅在收到询盘/报价请求时保留询盘与联系信息，直至用户要求删除 |

**写码手法**：把提取出的纯文本逐段搬进 JSX 的元素里（`<h2>` / `<p>` / `<ol>` / `<ul>` / `<li>`），保留原有编号与层级；不要用 Markdown 渲染器，直接使用语义标签。

**通过标准**：三处改写均落在代码中，且可用阶段 4 的方法逐条检出。

---

### 阶段 4 · 独立内容校对

**目的**：在"看渲染"之前，先用**文本层**证明改写确实生效，避免被 HTML 转义误导。

**4.1 在源码层确认三处改写**

```powershell
Select-String -Path src\pages\TermsOfServicePage.jsx -Pattern "People's Republic of China"
Select-String -Path src\pages\PrivacyPolicyPage.jsx -Pattern "DATA RETENTION"
Select-String -Path src\pages\PrivacyPolicyPage.jsx,src\pages\TermsOfServicePage.jsx -Pattern "COMPANY\."
```

**4.2 在全站产物层扫描占位符残留**

构建后扫描渲染 HTML（构建命令见阶段 6）：

```powershell
Get-ChildItem -Path dist -Recurse -Filter index.html |
  Select-String -Pattern 'XXXXX|这里写|公司名|Ltd\.\.'
```

**通过标准**：占位符统计为 **0 命中**。

**⚠️ 校对陷阱**：不要直接在**原始 HTML** 上用正则搜 `People's Republic of China`——预渲染会把撇号转义成 `&#x27;`，正则会返回 0，导致误判"条款没改"。必须在**解码后的文本或 DOM** 上校验（详见第六节 坑 4）。

---

### 阶段 5 · UI 视觉复核（双端）

**目的**：证明页面在桌面与移动端都"能看、能点、不溢出"。

**步骤 5.1 本地预览**

```powershell
npm run preview
```

**步骤 5.2 复核清单**

| 检查项 | 桌面 | 375px 移动端 | 通过标准 |
|---|---|---|---|
| 标题 / 正文排版 | ✅ | ✅ | 层级清晰、行距可读 |
| **有序 / 无序列表编号与圆点** | ✅ | ✅ | `<ol>` 显示 1. 2. 3.，`<ul>` 显示圆点（见坑 2） |
| 页脚法务入口可达 | ✅ | ✅ | 链接真实可点击跳转 |
| 页脚链接热区 | — | ✅ | 触控热区约 **36px** |
| 横向溢出 | — | ✅ | **无横向滚动条** |
| 页脚版权行标点 | ✅ | ✅ | 不出现 `Ltd..`（见坑 3） |

**产出物**：桌面 + 移动端截图各若干，作为验收证据。

---

### 阶段 6 · 本地构建 + 预渲染验证

**目的**：证明页面不是只在 dev 里能跑，而是在**生产构建 + 预渲染**链路中也能正确生成。

```powershell
npm run build
```

`npm run build` 的真实执行链（来自 `package.json`）：

```
npm run sitemap      -> node scripts/generate-sitemap.mjs
npm run build:client -> vite build
npm run build:ssr    -> vite build --ssr src/entry-server.jsx --outDir .ssr-build
npm run prerender    -> node scripts/prerender.mjs
```

**核对构建日志**：

- sitemap 行：`sitemap.xml written: N URLs (M aliases excluded)`；
- 预渲染末行：`prerender: N HTML files written` —— 本次应较上次 **+2**（77 → 79）；
- 若任一预渲染路由失败，脚本会打印 `prerender FAILED for N route(s)` 并以非 0 退出，构建即失败，必须修复后重跑。

**产出物**：`dist/privacy-policy/index.html`、`dist/terms-of-service/index.html` 等真实 HTML。

**通过标准**：构建零报错；预渲染文件数为预期值；`dist/` 下能找到两个新页面的 `index.html`。

---

### 阶段 7 · 缺陷修复

**目的**：把阶段 4–6 发现的问题修掉并回归验证，形成"发现 → 修复 → 再验证"闭环。

常见缺陷与修法见第六节。**修复后必须重跑阶段 6 的构建**，而不是只看 dev 页面。

---

### 阶段 8 · 提交推送与生产复核

**给用户的确认门槛**：先在本地把可预览版本交付用户确认，**确认后才推送**（本项目用户偏好"本地预览确认 → 一次性推送部署"）。

**步骤 8.1 提交并推送**

```powershell
git status
git diff --stat
git add -A
git commit -m "feat(legal): add privacy policy and terms of service pages with footer links"
git push origin main
```

**步骤 8.2 生产环境复核（必做）**

Vercel 有构建与 CDN 生效延迟，**首次 404 不代表失败**，应等部署完成后再复核：

```powershell
# 单页探活
Invoke-WebRequest -Uri "https://www.spo2sensorcable.com/privacy-policy" -UseBasicParsing |
  Select-Object StatusCode
Invoke-WebRequest -Uri "https://www.spo2sensorcable.com/terms-of-service" -UseBasicParsing |
  Select-Object StatusCode

# sitemap 全量 URL 探活（逐条请求，统计非 200）
(Select-String -Path public\sitemap.xml -Pattern '<loc>([^<]+)</loc>' -AllMatches).Matches |
  ForEach-Object { $u = $_.Groups[1].Value; $c = (Invoke-WebRequest -Uri $u -UseBasicParsing).StatusCode; "$c`t$u" }
```

**通过标准**：新页面 200；`public/sitemap.xml` 中全部 URL 均 200；占位符全站 0 命中；页脚入口真实可达。

---

## 五、验收清单（上线前逐条打勾）

- [ ] 新页面已在 `src/App.jsx` 注册路由，`npm run dev` 可访问
- [ ] 已在本 SOP 指定的**唯一** SEO 位置 `scripts/route-meta.mjs` 用 `add(...)` 登记
- [ ] 页脚常驻入口已加入并真实可点击跳转
- [ ] 三处口径改写（占位符 / 管辖法 / 数据保留）已在源码层逐条检出
- [ ] `npm run build` 零报错，预渲染文件数为预期值（本次 +2）
- [ ] `dist/` 中存在两个新页面的 `index.html`
- [ ] 全站产物扫描占位符（`XXXXX` / `这里写` / `公司名` / `Ltd..`）命中为 **0**
- [ ] 桌面端排版正常；**有序/无序列表编号与圆点正常**（坑 2）
- [ ] 375px 无横向溢出；页脚法务链接热区约 36px
- [ ] 版权行无 `Ltd..`（坑 3）
- [ ] 用户本地预览确认后才推送
- [ ] 推送后生产复核：新页 200、sitemap 全部 URL 200
- [ ] 已知未修项已明确标注（坑 5：移动端 WhatsApp 遮挡，见下）

---

## 六、踩坑与规避（本次真实踩坑，共 6 个）

> 每个坑给出 **症状 → 根因 → 修法 → 验证方式** 四段式。凡标注 **【已知未修】** 的，是本次**在线但尚未解决**的问题，不计入"已修复"。

### 坑 1 · 直接 read DOCX 得到 ZIP 二进制流

- **症状**：直接读取 `.docx` 得到的是一堆以 `PK` 开头的二进制 / 乱码，看不到正文。
- **根因**：`.docx` 是 **ZIP 容器格式**，正文在内部 `word/document.xml`。
- **修法**：解压并抽取 `word/document.xml` 去标签，或用 `python-docx` 抽全文（见阶段 1 的方式 A / B）。
- **验证方式**：抽取出的纯文本可读、段落与标题层级完整，且模板占位符（`XXXXX` 等）可见。

### 坑 2 · Tailwind preflight 让列表编号 / 圆点全部消失

- **症状**：法务页里 `<ol>` 没有 `1. 2. 3.`、`<ul>` 没有圆点，列表看起来像普通段落。
- **根因**：Tailwind 的 **preflight** 全局把 `ol/ul` 置为 `list-style: none` 并清零缩进，覆盖了浏览器默认列表样式。
- **修法**：在 `.legal-body` 作用域内**局部恢复**列表样式（已在 `src/styles.css` 的 `Legal pages` 区块落地）：

```css
.legal-body ul { list-style-type: disc; margin: 0 0 16px 0; padding-left: 24px; }
.legal-body ol { list-style-type: decimal; margin: 0 0 16px 0; padding-left: 24px; }
.legal-body li { margin-bottom: 8px; line-height: 1.7; }
```

- **验证方式**：构建后在浏览器 / 预渲染 HTML 中确认 `<ol>` 渲染出编号、`<ul>` 渲染出圆点；或在 `src/styles.css` 中 grep `list-style-type` 确认规则存在。

### 坑 3 · `COMPANY.legalName` 自带句点，JSX 再补一个 → 渲染成 `Ltd..`

- **症状**：页面上出现 `Shenzhen Medke Technology Co., Ltd..`（两个句点）。
- **根因**：`src/data/catalog.js` 中 `legalName: 'Shenzhen Medke Technology Co., Ltd.'` **值本身以 `.` 结尾**；JSX 里若再写 `{COMPANY.legalName}.` 就会输出 `Ltd..`。**共享页脚（`Footer.jsx`）的版权行同样会中招**。
- **修法**：引用 `legalName` 时**不要在其后再补句点**；需要断句的地方改用其他标点或让后续文案自带标点。
- **验证方式**：全站渲染产物中搜 `Ltd..`（`Get-ChildItem -Path dist -Recurse -Filter index.html | Select-String -Pattern 'Ltd\.\.'`）计数为 **0**。

### 坑 4 · 在原始 HTML 上正则搜条款文案返回 0，误判"条款没改"

- **症状**：用正则搜 `People's Republic of China` 在预渲染 HTML 里返回 0 命中，看起来像管辖法条款没改成功。
- **根因**：预渲染输出的 HTML 中，撇号 `'` 被转义为 **`&#x27;`**，纯文本正则自然匹配不到。
- **修法**：**在解码后的文本或 DOM 上校验**——用浏览器 `document.body.innerText` / `textContent`，或先对 HTML 做实体解码再匹配；也可回源码层 `Select-String` 确认（阶段 4.1）。
- **验证方式**：解码后能匹配到 §10 的管辖法句子 1 处，证明改写确实生效。

### 坑 5 · 移动端 WhatsApp 悬浮球压住页脚免责声明最后一行 **【已知未修】**

- **症状**：375px 移动端下，右下角固定的 WhatsApp 悬浮球（`src/components/common/FloatingWhatsApp.jsx`）**压住共享页脚免责声明的最后一行**。
- **根因**：悬浮球为固定定位（fixed）浮在页面上层，而页脚底部没有为它预留安全空间。
- **修法**：**尚未实施**（拟在 `body` 增加 `padding-bottom` 预留空间）。当前处理：**用户已决定暂缓修复**。
- **状态标注**：**这是全站既有问题，并非本次法务页引入；本次交付中明确标记为"已知未修"，不得写成"已解决"。**
- **验证方式**：375px 端截图确认遮挡仍在（作为已知项留档，不计入本次法务页验收失败）。

### 坑 6 · 推送后立即访问线上 404，误判部署失败

- **症状**：`git push` 后立刻访问线上新页面得到 404，以为上线失败。
- **根因**：Vercel 需要**构建 + CDN 分发**，生效存在延迟；首次 404 通常是部署尚未完成。
- **修法**：先查看 Vercel 部署状态，等待构建完成后重试；不要因首次 404 就改动代码或重复推送。
- **验证方式**：等待后重新探活，新页面返回 200；再跑 sitemap 全量 URL 探活确认 200（见阶段 8.2）。

---

## 七、可复用检查表（新增任何同类合规页时直接照抄）

### 7.1 落码检查

- [ ] 页面组件建于 `src/pages/`，套用 `legal-page-wrap` / `legal-card legal-body`
- [ ] 公司信息全部引用 `COMPANY`，**零硬编码**
- [ ] 页面已在 `src/App.jsx` 注册 `<Route>`
- [ ] 已在 `scripts/route-meta.mjs` 用 `add(path, title, description, priority, changefreq[, canonical])` 登记
- [ ] 已在 `Footer.jsx` 加常驻入口（如需）

### 7.2 内容检查

- [ ] 三处口径改写逐条留档并已确认
- [ ] 占位符全站扫描 0 命中
- [ ] 事实数据（公司名 / 联系信息 / 条款口径）与 `COMPANY`、已批准模板一致

### 7.3 视觉检查

- [ ] 列表编号 / 圆点正常（坑 2）
- [ ] 无 `Ltd..`（坑 3）
- [ ] 375px 无横向溢出，页脚链接热区约 36px

### 7.4 构建与上线检查

- [ ] `npm run build` 零报错，预渲染数 +1（每页 +1）
- [ ] 用户本地预览确认后才 `git push`
- [ ] 生产复核：新页 200 + sitemap 全量 URL 200
- [ ] 已知未修项（坑 5）已明确标注

---

## 附录 A · 关键文件与命令速查（均已核实存在）

### A.1 文件

| 路径 | 作用 |
|---|---|
| `package.json` | 脚本定义（`dev` / `sitemap` / `build:client` / `build:ssr` / `prerender` / `build` / `preview`） |
| `scripts/route-meta.mjs` | 路由 + SEO 单一事实源，导出 `ROUTES` / `ORIGIN`，含 `add(...)` |
| `scripts/prerender.mjs` | 预渲染，输出 `dist/**/index.html` 与 `dist/404.html` |
| `scripts/generate-sitemap.mjs` | 生成 `public/sitemap.xml` |
| `src/entry-server.jsx` | SSR 入口，导出 `render(url)` |
| `src/App.jsx` | 路由挂载（`/privacy-policy`、`/terms-of-service`） |
| `src/pages/PrivacyPolicyPage.jsx` | 隐私政策页 |
| `src/pages/TermsOfServicePage.jsx` | 服务条款页（含 §10 管辖法） |
| `src/components/footer/Footer.jsx` | 共享页脚、法务入口、版权行 |
| `src/components/common/FloatingWhatsApp.jsx` | 移动端 WhatsApp 悬浮球（坑 5） |
| `src/styles.css` | 法务页样式（`Legal pages` 区块，含列表样式修复） |
| `src/data/catalog.js` | `COMPANY` 品牌信息源（`legalName` 以 `.` 结尾） |
| `vercel.json` | 部署头配置（`/assets`、`/fonts` 一年期 immutable 缓存） |
| `public/sitemap.xml` | 生成的站点地图 |
| `public/robots.txt` | 爬虫规则 |

### A.2 常用命令

```powershell
npm run dev            # 本地开发
npm run sitemap        # 仅生成 sitemap
npm run build          # 完整构建（sitemap + client + ssr + prerender）
npm run preview        # 预览 dist 产物
node scripts/generate-sitemap.mjs   # 单独跑 sitemap 脚本
node scripts/prerender.mjs          # 单独跑预渲染脚本
```

### A.3 生产探活

```powershell
Invoke-WebRequest -Uri "https://www.spo2sensorcable.com/privacy-policy" -UseBasicParsing | Select-Object StatusCode
```

---

## 附录 B · 本次交付基线（用于核对复现结果）

| 项 | 值 |
|---|---|
| 新增页面 | `/privacy-policy`、`/terms-of-service` |
| 页脚入口 | 常驻 `footer-legal-links` |
| 上线 commit | `fcf8248`（7 files changed, +462/-73） |
| 预渲染 HTML | 77 → **79** |
| 线上复核 | sitemap 全部 74 个 URL 均 **200** |
| 占位符残留 | `XXXXX` / `这里写` / `公司名` / `Ltd..` 全站 **0** |
| 移动端 | 375px 无横向溢出；页脚法务链接热区 **36px** |
| 已知未修 | 移动端 WhatsApp 悬浮球遮挡页脚免责声明最后一行（坑 5，用户决定暂缓） |

---

*文档整理：team-recorder ｜ 依据：本次法务页交付实战 + 项目源码逐一核实 ｜ 所有路径 / 脚本 / 命令均已在项目中确认真实存在（见附录 A）*
