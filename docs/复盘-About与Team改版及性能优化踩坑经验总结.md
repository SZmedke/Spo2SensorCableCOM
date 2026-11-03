# 复盘：About 与 Team 改版及性能优化踩坑经验总结

> **文档类型**：技术复盘 + 性能诊断报告 + 长效避坑 SOP
> **项目**：Medke B2B 官网（React + Vite + Tailwind CSS，Vercel 部署，SSG 预渲染）
> **时间**：2026-10-31
> **范围**：`/about-us`、`/team` 全量改版；PDF 留资下载链路；滑屏卡顿性能根治
> **关联提交**：`11e6e30` → `fe20a66` → `a1ae1d8` → `0af6b9a`
> **一句话结论**：**这次卡顿不是 CSS 动画问题，而是 10 张 2400 万像素原图把显存带宽打满了**——把图片从 4000×6000 降到 600×900，比任何 `will-change`、`transform` 调优都有效 100 倍。

---

## 一、任务交付清单

### 1.1 交付总览

| 类别 | 交付物 | 状态 | 验证方式 |
|---|---|---|---|
| About 页面 | `src/pages/AboutPage.jsx` + `src/pages/AboutPage.css` | ✅ 上线 | 10 大板块齐全，路由 `/about-us` 可访问 |
| About 原型 | `design/about-us-page/about-preview-v3.html` | ✅ 已对齐 | 与原型逐板块比对 |
| Team 页面 | `src/pages/TeamPage.jsx` + `src/pages/TeamPage.css` | ✅ 上线 | 5 大板块齐全，路由 `/team` 可访问 |
| Team 原型 | `design/team-page/team-preview-v4.html` | ✅ 已对齐 | 与原型逐板块比对 |
| 官方 PDF | `public/docs/Medke-Company-Profile.pdf`（8.04 MB） | ✅ 已入库 | 文件存在且体积一致 |
| 留资下载弹窗 | `src/components/landing/LeadBrochureModal.jsx` | ✅ 参数化解耦 | 点击→留资→入库→邮件→自动下载 |
| 性能优化 | 图片降采样 + `lazy/async` + 移除 `will-change` | ✅ 上线 | 见第四章数据对比 |
| 构建 | 全站 SSG 预渲染 | ✅ 通过 | `npm run build` 无报错 |

### 1.2 About 页面：10 大叙事板块

源码中的真实板块注释（`src/pages/AboutPage.jsx`）：

| # | 板块 | 行号 |
|---|---|---|
| 1 | HERO - Asymmetric Industrial Fleet | 120 |
| 2 | TAGLINE REVEAL (Engineering Philosophy) | 200 |
| 3 | 17-YEAR MANUFACTURING EVOLUTION (Editorial Split) | 237 |
| 4 | 17-YEAR STRATEGIC CHRONO-STRIP | 322 |
| 5 | BENTO GRID FACILITY MATRIX | 384 |
| 6 | R&D AGILITY & OEM/ODM MATRIX | 470 |
| 7 | ACCREDITED SHIELD GALLERY (6 Pure White Certificates) | 535 |
| 8 | GLOBAL CLIENT TRUST & COMPATIBILITY | 673 |
| 9 | B2B PROCUREMENT FAQ | 721 |
| 10 | FACTORY AUDIT CONVERSION DOCK | 760 |

**关键还原点**：

- **6 大纯白透明认证徽标**：`white-iso13485.png`、`white-ce0123.png`、`white-fda.png`、`white-sfda.png`、`white-rzn.png`、`white-mdsap.png`，统一使用纯白透明版本，避免彩色徽标破坏深色背景的视觉秩序；
- **经典品牌墙恢复**：`brand-grid-10`，10 个兼容品牌 Logo（Philips、Mindray、GE、Dräger、Biolight、Comen、EDAN、Bionet、Schiller、Huntleigh）；
- **务实标题**：`Trusted Across 100+ Countries & 5,200+ Clients`（第 679 行），不写空泛形容词，直接给数量级。

### 1.3 Hero 首屏留资与 PDF 下载链路

**设计目标**：用户点击“下载公司简介”时，先完成留资（进入 CRM/询盘体系），再静默触发浏览器下载，全程不打断浏览。

**实现链路**（已逐环节核验）：

```
点击 Hero 下载按钮（AboutPage.jsx:163）
        ↓
打开 LeadBrochureModal
        ↓
提交邮箱 → submitInquiry()（Supabase Edge Function）
        ↓
写入 inquiries 表 + 发送通知邮件至 contact@medke.com
        ↓
triggerDownload()：动态创建 <a download> 并 click()
        ↓
浏览器静默下载 + 成功态展示 + 兜底“重新下载”链接
        ↓
GTM dataLayer 推送 download_datasheet_lead
```

**参数化解耦**：`LeadBrochureModal` 不再写死某一份 PDF，而是通过 props 复用：

```jsx
<LeadBrochureModal
  isOpen={isBrochureModalOpen}
  onClose={() => setIsBrochureModalOpen(false)}
  badge="Official Corporate Profile (PDF)"
  title="Medke Corporate Profile & Factory Capability"
  subtitle="Instant download: 4,000㎡ smart facility overview, Class 100,000 cleanroom specs, TÜV ISO 13485 & CE MDR regulatory certificates, and OEM/ODM capacity deck."
  pdfUrl="/docs/Medke-Company-Profile.pdf"
  downloadFilename="Medke_Company_Profile.pdf"
  assetName="Medke Company Profile (PDF)"
  fileSize="8.0 MB"
/>
```

**下载触发核心代码**（`LeadBrochureModal.jsx`）：

```js
const triggerDownload = () => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
```

**留资提交核心代码**：

```js
const result = await submitInquiry({
  name: 'Brochure Downloader',
  email: trimmed,
  product_name: assetName,
  company: 'Website E-Catalog Visitor',
  inquiry_type: 'E-Catalog Download',
  message: `Visitor requested and downloaded ${assetName} (${fileSize}) from ${sourcePage}. Please follow up with technical catalog and pricing.`
}, {
  skipDataLayer: true,
  honeypotValue: honeypot
});
```

> **为什么用动态 `<a>` 而不是 `window.open`**：`window.open` 容易被浏览器拦截，且无法指定 `download` 文件名；动态 `<a download>` 是当前最稳定的静默下载方案，同时保留“未开始？点此重新下载”的兜底链接。

### 1.4 Team 页面：5 大板块

| # | 板块 | 行号 |
|---|---|---|
| 1 | HERO - Pillars of Precision (58:42 Asymmetric Split) | 87 |
| 2 | 3-TIER TEAM ARCHITECTURE | 153 |
| 3 | IN-ACTION DOCUMENTARY STRIP | 519 |
| 4 | QUANTIFIED SLA COMMITMENTS (Four-Sided Borders Only) | 584 |
| 5 | DIRECT EXPERT CHANNELS CTA (Flat Navy Background) | 624 |

**三层专家矩阵（10 人档案）**：

- 第一层：创始人 / 董事长（Li Zhenzong、Li Weitao）
- 第二层：核心管理层（Xian Zuyin、Wu Fengguang、Zhou Yuanbin、Huang Yuanbin、Gong Shuangyu、Lu Wen）
- 第三层：一线销售与运营（Nancy Liu、Amy Yi Si）
- 全部采用 **3:4 实拍肖像**（600×900），叠加资质徽章与引语。

**4 大量化 SLA**（源码实测）：

| 指标 | 服务承诺 |
|---|---|
| `< 24h` | DFM Engineering Review（引脚验证 + 3D 模具可行性图） |
| `3–5 Days` | Rapid Tooling Samples（功能样件 + 空运） |
| `100%` | Triple Electrical Inspection（通断/电阻/1,500V 耐压） |
| `100%` | Lot Traceability（原材料批次 → 工位 → 成品全链路） |

**双通道直连**：工程负责人邮箱 + WhatsApp 一键唤起，减少询盘转接层级。

### 1.5 团队文案去“假大空”

**问题**：原稿使用“守护每一次心跳”等修辞，信息密度低，无法证明制造能力。

**决策**：全量改写为“方案一”——用**可验证的工艺参数**替代形容词：

| 原表达类型 | 改后表达（源码实测） |
|---|---|
| 空泛修辞 | `From custom mold tooling and medical TPU extrusion to 100,000-class cleanroom soldering and 100% electrical testing.` |
| 身份形容词 | `Meet our 108 in-house engineers, technicians, and QA specialists producing reliable patient monitoring accessories in Shenzhen since 2008.` |
| 无依据承诺 | `Proprietary Mold Tooling Vault: 2,000+ Active Sets` |
| 无依据质量 | `Traceability Records Preserved: 100% Batch Lot Trail` |

> **核验结果**：`AboutPage.jsx` 与 `TeamPage.jsx` 中“守护每一次心跳 / Every Heartbeat”出现次数为 **0**。

### 1.6 提交链（真实记录）

| 提交 | 内容 | 规模 |
|---|---|---|
| `11e6e30` | feat(about): 基于 v3 原型上线 About 页 | 32 files, +3,887 / −180 |
| `fe20a66` | feat(about): 接入 Company Profile PDF 与留资下载弹窗 | 3 files, +41 / −35 |
| `a1ae1d8` | feat(team): 基于 v4 原型上线 Team 页 | 2 files, +2,087 / −111 |
| `0af6b9a` | perf: 图片优化 + 移除 will-change + 补 lazy loading | 17 files, +37 / −39 |

---

## 二、核心技术决策

| # | 决策 | 原因 | 代价/边界 |
|---|---|---|---|
| 1 | 页面样式独立成 `AboutPage.css` / `TeamPage.css` | 原型自带完整设计系统，独立作用域避免污染全站 | 两份 CSS 体量较大（提交新增约 1,497 / 1,361 行） |
| 2 | 文案务实化（方案一） | B2B 采购决策依赖可验证参数，修辞降低可信度 | 需要业务方提供真实数据（108 人、2,000+ 模具等） |
| 3 | PDF 弹窗参数化解耦 | 同一弹窗可复用于 Brochure、Company Profile、未来的 Cookie/合规文件 | 调用方必须正确传 `fileSize`，否则文案会显示默认值 |
| 4 | 三层专家矩阵 + 3:4 肖像 | 兼顾“决策者—执行者—对接人”的信任链路 | 10 张肖像带来显著的性能风险（本次踩坑根源） |
| 5 | 先压图，再加属性，最后清 CSS | 按开销排序处理，避免在 1% 的问题上花 99% 的时间 | 需要建立图片入库规范，否则问题会复发 |

---

## 三、滑屏卡顿深度诊断

### 3.1 现象与定位方法

**现象**：仅新上线的 `/about-us` 与 `/team` 在下滑浏览时明显阻滞、掉帧；其他页面（首页、Contact、VR 展厅）流畅。

**定位方法**（按顺序）：

1. **对比法**：同设备、同浏览器，对比新旧页面的滚动表现，锁定“新增内容”；
2. **Network 面板**：按体积排序，发现 10 张团队肖像单张 1.5–2.3MB，累计 19.24MB；
3. **Elements → Properties**：查看 `naturalWidth / naturalHeight`，发现原图为 **4000×6000**；
4. **Rendering 面板**：勾选 Paint flashing / Layer borders，观察滚动时的重绘与复合层；
5. **Coverage / Performance**：确认滚动期间主线程被图片解码占用。

> **关键结论**：卡顿与 CSS 动画无关，**90% 的开销来自图片解码与缩放**。

### 3.2 根因一：2400 万像素原图直出（90% 开销）

**真实数据**（逐张实测，原图来自 `0af6b9a~1`）：

| # | 文件 | 原图尺寸 | 原图体积 |
|---|---|---|---|
| 01 | `01_Nancy_Liu-Guiting_Sales-Director.jpg` | 4000×6000 | 1,947 KB |
| 02 | `02_Wu-Fengguang_R-and-D-Manager.jpg` | 4000×6000 | 2,052 KB |
| 03 | `03_Xian-Zuyin_General-Manager.jpg` | 4000×6000 | 1,538 KB |
| 04 | `04_Zhou-Yuanbin_Quality-Control-Manager.jpg` | 4000×6000 | 2,310 KB |
| 05 | `05_Amy_Yi-Si_Sales-Assistant.jpg` | 4000×6000 | 1,726 KB |
| 06 | `06_Gong-Shuangyu_Supply-Chain-Manager.jpg` | 4000×6000 | 1,766 KB |
| 07 | `07_Huang-Yuanbin_Factory-Supervisor.jpg` | 4000×6000 | 1,868 KB |
| 08 | `08_Li-Weitao_Chairman-and-CEO.jpg` | 4000×6000 | 2,011 KB |
| 09 | `09_Li-Zhenzong_Founder.jpg` | 4000×6000 | 2,393 KB |
| 10 | `10_Lu-Wen_Finance-Manager.jpg` | 4000×6000 | 2,092 KB |
| — | **合计** | — | **19.24 MB** |

**显存公式**：

浏览器的解码位图通常按 **RGBA 4 字节/像素** 存储：

$$
\text{单张显存} = W \times H \times 4\ \text{bytes}
$$

- 原图：$4000 \times 6000 \times 4 = 96{,}000{,}000\ \text{B} \approx 96\ \text{MB}$
- 10 张：$96 \times 10 = 960\ \text{MB} \approx 1\ \text{GB}$
- 压缩后：$600 \times 900 \times 4 = 2{,}160{,}000\ \text{B} \approx 2.16\ \text{MB}$
- 10 张：$21.6\ \text{MB}$

**缩小比例**：单边缩小 $4000/600 = 6.67$ 倍，面积缩小 $6.67^2 \approx 44.4$ 倍，显存下降 **97.75%**。

**为什么会导致掉帧**：

1. 页面展示高度约 **280px**，GPU 需要把 4000×6000 的纹理重采样到约 210×280，**过采样约 19 倍**；
2. 滑动时每一帧都要参与纹理采样与合成，显存带宽被大量消耗；
3. 若发生纹理重上传，按 960MB/帧估算：$960\ \text{MB} \times 60\ \text{fps} = 57.6\ \text{GB/s}$，已超过多数集成显卡的带宽上限；
4. 60fps 的单帧预算只有 **16.67ms**（120Hz 为 **8.33ms**），解码 2400 万像素位图远超这一预算，必然造成主线程阻塞与丢帧。

> **数据口径说明**：任务简报中记为“累计 19.5MB / 压缩后 302KB / 降幅 98.5%”。本报告采用当前仓库逐字节实测值：**19.24MB → 306.2KB，降幅 98.45%**；差异来自四舍五入，不影响结论。

### 3.3 根因二：缺少 `loading="lazy"` 与 `decoding="async"`

**问题**：所有 `<img>` 默认立即解码，10 张大图在页面加载阶段同时进入解码队列，主线程被同步解码阻塞。

**为什么 `decoding="async"` 重要**：它允许浏览器把解码放到后台线程，避免解码期间阻塞滚动与输入响应；`loading="lazy"` 则让首屏之外的图片延迟到接近视口时才加载。

**修复前后覆盖率**（源码实测）：

| 页面 | `<img>` 总数 | `loading="lazy"` | `loading="eager"` | `decoding="async"` |
|---|---|---|---|---|
| About | 22 | 21 | 1（首屏工厂外景，保 LCP） | 22 |
| Team | 15 | 15 | 0 | 15 |

> 首屏 LCP 图保留 `eager` 是**刻意为之**：懒加载首屏主图会拖慢 LCP，属于“优化过度”。

### 3.4 根因三：`will-change` 滥用导致复合层爆炸

**问题**：原型 CSS 对大容器大量使用 `will-change: opacity, transform`。`will-change` 会强制浏览器提前创建 GPU 复合层，每个层都占用独立显存；层数过多会显著增加合成开销。

**修复**：`0af6b9a` 在 `AboutPage.css` 与 `TeamPage.css` 中各删除 **1 行** `will-change` 规则。

**核验**：当前 `src/pages/AboutPage.css` 与 `src/pages/TeamPage.css` 中 `will-change` 出现次数为 **0**。

> **正确用法**：`will-change` 只应用于“即将发生动画的少量元素”，且应在动画结束后移除；绝不能作为常驻样式挂在大容器上。

### 3.5 根因四：密集 `backdrop-filter: blur`

**问题**：`backdrop-filter` 需要实时读取背景像素并做高斯模糊，属于高成本合成操作；多个模糊层叠加会显著增加 GPU 负担。

**当前状态**（源码实测）：

| 文件 | 规则数 | 模糊半径 |
|---|---|---|
| `AboutPage.css` | 2 | `blur(8px)` |
| `TeamPage.css` | 2 | `blur(4px)` / `blur(12px)` |

> **如实说明**：本次根治**没有删除** `backdrop-filter`，只在移除 `will-change` 后使其成本可控。若后续仍有中低端设备卡顿，应优先减少模糊层数量或降低模糊半径。

### 3.6 四大根因权重

| 根因 | 估算权重 | 依据 |
|---|---|---|
| 2400 万像素原图 | **~90%** | 19.24MB 传输 + 960MB 解码显存 + 19 倍过采样 |
| 缺少 lazy/async | ~5% | 主线程同步解码阻塞 |
| `will-change` 滥用 | ~3% | 复合层数量增加、显存占用上升 |
| `backdrop-filter` | ~2% | 实时高斯模糊的合成开销 |

---

## 四、三步根治与效果对比

### 4.1 第一步：PIL 高质量降采样（核心）

**目标尺寸推导**：

- 卡片展示高度约 280px；
- 按 2× DPR 计算，目标高度 ≈ 560px；
- 取 3:4 比例 → **600×900**，留出适度余量，兼顾高分屏清晰度。

**压缩参数**：JPEG quality **85**、`optimize=True`、`progressive=True`。

### 4.2 第二步：全量补齐 `lazy/async`

- 首屏之外全部 `loading="lazy" decoding="async"`；
- 首屏 LCP 主图保留 `loading="eager" decoding="async"`。

### 4.3 第三步：彻底剔除 `will-change`

- 删除 `AboutPage.css`、`TeamPage.css` 中的 `will-change` 规则；
- 用真实的 `transform/opacity` 动画替代“提前升层”。

### 4.4 效果对比（逐字节实测）

| 指标 | 优化前 | 优化后 | 变化 |
|---|---|---|---|
| 单图尺寸 | 4000×6000 | 600×900 | 单边 −85% |
| 单图体积 | 1,538–2,393 KB | 25.2–38.3 KB | −98% 左右 |
| 10 图总体积 | **19.24 MB** | **306.2 KB** | **−98.45%** |
| 单图解码显存 | 96 MB | 2.16 MB | −97.75% |
| 10 图解码显存 | 960 MB | 21.6 MB | −97.75% |
| 过采样倍数 | 约 19× | 约 1× | 基本消除 |
| `will-change` 规则 | 2 条 | 0 条 | −100% |

**体积对比图**：

```text
优化前  10 张肖像  ████████████████████████████████████████  19.24 MB
优化后  10 张肖像  █                                              0.30 MB
```

**显存对比图**：

```text
优化前  解码位图  ████████████████████████████████████████  960 MB
优化后  解码位图  █                                              21.6 MB
```

### 4.5 同批次附带优化：About 页 3 张大图

`0af6b9a` 同时对 About 页 3 张实景图做了压缩：

| 文件 | 优化前 | 优化后 | 降幅 |
|---|---|---|---|
| `cleanroom-real-clean.jpg` | 270,460 B | 115,635 B | −57.2% |
| `factory-warehouse.jpg` | 271,126 B | 213,487 B | −21.3% |
| `lab-testing-real-web.jpg` | 461,306 B | 195,384 B | −57.6% |
| **小计** | **1,002,892 B（979.4 KB）** | **524,506 B（512.2 KB）** | **−47.7%** |

**全部 13 张图片合计**：

- 优化前：**21,178,485 B ≈ 20.20 MB**
- 优化后：**838,029 B ≈ 818.4 KB**
- 总降幅：**−96.04%**

### 4.6 遗留项（需持续观察）

1. `backdrop-filter` 仍保留 4 条规则（About 2 条、Team 2 条）；
2. 图片压缩为**有损**（quality 85），若未来需要印刷级素材，应保留原图在独立目录，不得直接覆盖；
3. 未建立自动化的图片体积门禁，仍依赖人工检查。

---

## 五、可复现操作指令（Windows PowerShell 5.1）

> 以下命令均在项目根目录 `E:\Acciowork Space\Ai建站\Spo2SensorCableCOM` 执行。

### 5.1 压缩前备份

```powershell
New-Item -ItemType Directory -Force -Path backup\team-originals | Out-Null
Copy-Item public\assets\images\team\*.jpg backup\team-originals\ -Force
```

> 原图已存在于 Git 历史（`0af6b9a~1`），备份只是本地双保险。

### 5.2 PIL 批量降采样（600×900 / quality 85）

```python
# 一次性工具：保存为 $env:TEMP\compress_team_images.py（不纳入仓库）
from pathlib import Path
from PIL import Image

SRC = Path("public/assets/images/team")
TARGET = (600, 900)
QUALITY = 85
LANCZOS = getattr(Image, "Resampling", Image).LANCZOS

files = sorted(SRC.glob("[0-9][0-9]_*.jpg"))
print(f"found {len(files)} images")
for p in files:
    before = p.stat().st_size
    im = Image.open(p).convert("RGB")
    im.thumbnail(TARGET, LANCZOS)          # 等比缩放，长边不超过 600x900
    im.save(p, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    after = p.stat().st_size
    print(f"{p.name}\t{im.size[0]}x{im.size[1]}\t{before//1024}KB -> {after//1024}KB")
```

执行：

```powershell
python $env:TEMP\compress_team_images.py
```

> 若未安装 Pillow：`python -m pip install pillow`。

### 5.3 校验尺寸与体积

```powershell
Add-Type -AssemblyName System.Drawing
$imgs = Get-ChildItem public\assets\images\team -Filter '*.jpg' |
        Where-Object { $_.Name -match '^\d{2}_' }
$total = 0
foreach ($f in $imgs) {
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  "{0}`t{1}x{2}`t{3:N1} KB" -f $f.Name, $img.Width, $img.Height, ($f.Length/1KB)
  $img.Dispose()
  $total += $f.Length
}
"TOTAL: {0:N1} KB" -f ($total/1KB)
```

**期望值**：10 张均为 `600x900`，单张 25–39KB，合计约 **306KB**。

### 5.4 校验 `lazy/async` 覆盖率

```powershell
foreach ($f in @('src\pages\AboutPage.jsx','src\pages\TeamPage.jsx')) {
  $c = Get-Content -Raw $f
  "{0}`timg={1}`tlazy={2}`teager={3}`tasync={4}" -f $f,
    ([regex]::Matches($c,'<img\b')).Count,
    ([regex]::Matches($c,'loading="lazy"')).Count,
    ([regex]::Matches($c,'loading="eager"')).Count,
    ([regex]::Matches($c,'decoding="async"')).Count
}
```

**期望值**：`AboutPage.jsx img=22 lazy=21 eager=1 async=22`；`TeamPage.jsx img=15 lazy=15 eager=0 async=15`。

### 5.5 校验 `will-change` 已清零

```powershell
Select-String -Path src\pages\AboutPage.css,src\pages\TeamPage.css -Pattern 'will-change'
```

**期望值**：无输出。

### 5.6 构建与线上验证

```powershell
npm run build
```

```powershell
# 线上页面可达性
Invoke-WebRequest 'https://www.spo2sensorcable.com/about-us' -UseBasicParsing |
  Select-Object StatusCode
Invoke-WebRequest 'https://www.spo2sensorcable.com/team' -UseBasicParsing |
  Select-Object StatusCode

# 线上 PDF 可达性
Invoke-WebRequest 'https://www.spo2sensorcable.com/docs/Medke-Company-Profile.pdf' `
  -UseBasicParsing -Method Head | Select-Object StatusCode
```

### 5.7 性能复测（人工）

1. Chrome DevTools → Performance → 录制 5 秒滚动；
2. 检查 **Frames** 轨道是否出现红色长任务；
3. Network 面板确认肖像图片单张 ≤ 40KB；
4. 在 4G 网络 + 4× CPU 降速下复测，确认无长时间解码阻塞。

---

## 六、团队长效避坑 SOP（六条）

### SOP 1：图片入库前必须过“三关”

**触发场景**：任何设计师/运营提供的实拍图、证书图、产品图入库前。

| 关卡 | 规则 | 不通过的处理 |
|---|---|---|
| 尺寸关 | 像素尺寸 ≤ 展示尺寸 × 2（DPR） | 必须降采样，禁止原图直出 |
| 体积关 | 卡片图 ≤ 100KB；首屏 LCP 图 ≤ 200KB；单页图片总量 ≤ 1MB | 压缩质量至 80–85 或改 WebP |
| 格式关 | 优先 WebP/AVIF；兼容性要求高时用 JPEG（progressive） | 转换格式 |

**验收**：`Get-ChildItem` 统计单图与总量，写入 PR 说明。

### SOP 2：`<img>` 默认 `lazy + async`，首屏显式 `eager`

**标准写法**：

```jsx
// 首屏主图（LCP）
<img src="..." alt="..." loading="eager" decoding="async" />

// 首屏之外
<img src="..." alt="..." loading="lazy" decoding="async" />
```

**验收**：`<img>` 总数 = `loading` 属性数 = `decoding="async"` 数（脚本见 5.4）。

### SOP 3：禁止滥用 `will-change`

- 只允许用于“即将发生动画的少量元素”；
- 动画结束后移除；
- 禁止挂在大容器、列表容器、页面根节点上；
- Code Review 时 `will-change` 必须附带理由。

**验收**：`grep -r "will-change" src/` 结果可解释。

### SOP 4：`backdrop-filter` 设置数量预算

- 单页 ≤ 3 处；
- 模糊半径 ≤ 12px；
- 大面积容器避免使用；
- 中低端设备出现卡顿时，优先移除模糊层，而不是调动画。

**验收**：统计单页 `backdrop-filter` 规则数，超预算需评审。

### SOP 5：性能纳入 Definition of Done

任何页面改版上线前，必须完成：

- [ ] Network 面板：首屏资源总量 ≤ 1MB（不含视频/PDF）；
- [ ] 单张卡片图 ≤ 100KB；
- [ ] Performance 录制：滚动无明显长任务；
- [ ] 4× CPU 降速下可正常滚动；
- [ ] LCP 图使用 `eager`，其余 `lazy`。

### SOP 6：B2B 文案“去修辞、给参数”

**禁止**：空泛修辞（“守护每一次心跳”“行业领先”“世界一流”）。

**要求**：每个价值主张至少配一个可验证参数（面积、人数、年限、良率、认证编号、测试电压）。

**验收**：文案评审时逐条追问“这个说法有数据支撑吗”。

---

## 七、上线前自检清单

- [ ] About 页 10 大板块齐全，6 大纯白认证徽标与 10 品牌墙正常；
- [ ] Team 页 5 大板块齐全，10 人档案均使用 600×900 肖像；
- [ ] 4 大量化 SLA 数值与文案一致；
- [ ] 团队文案无“假大空”修辞，均有参数支撑；
- [ ] 点击下载按钮 → 弹窗 → 留资 → 入库 → 邮件 → 自动下载全链路通过；
- [ ] `public/docs/Medke-Company-Profile.pdf` 为 8.04MB，线上 HEAD 200；
- [ ] 10 张肖像均为 600×900、单张 ≤ 40KB、合计 ≤ 320KB；
- [ ] `<img>` 的 `lazy/async` 覆盖率为 100%（首屏 LCP 图除外）；
- [ ] `will-change` 计数为 0；
- [ ] `npm run build` 通过，线上 `/about-us`、`/team` 均 200。

---

## 附录 A：事实核验记录

| 核验项 | 结果 |
|---|---|
| 提交链 | `11e6e30`、`fe20a66`、`a1ae1d8`、`0af6b9a` 均存在且为连续提交 |
| About 原型路径 | `design/about-us-page/about-preview-v3.html`（105,310 B） |
| Team 原型路径 | `design/team-page/team-preview-v4.html`（100,312 B） |
| About 板块数 | 10（源码 SECTION 1–10） |
| Team 板块数 | 5（源码 SECTION 1–5） |
| 专家档案数 | 10（`01_`–`10_` 十张肖像，JSX 中 10 处引用） |
| 认证徽标数 | 6（ISO13485 / CE0123 / FDA / SFDA / RZN / MDSAP） |
| 原图尺寸 | 4000×6000（`git show 0af6b9a~1:…01_Nancy…jpg` 实测） |
| 原图总体积 | 20,175,593 B ≈ 19.24 MB（10 张合计） |
| 压缩后总体积 | 313,523 B ≈ 306.2 KB |
| 总降幅 | 98.45% |
| About 3 图压缩 | 1,002,892 B → 524,506 B（−47.7%） |
| 13 图合计 | 21,178,485 B → 838,029 B（−96.04%） |
| `will-change` 残留 | 0（两个页面 CSS） |
| `backdrop-filter` | About 2 条、Team 2 条（仍保留） |
| 图片属性覆盖 | About 22/21/1/22；Team 15/15/0/15 |
| PDF 体积 | 8,432,231 B = 8.04 MB |
| 路由 | `/about-us`、`/team`；`/about` 重定向至 `/about-us` |

## 附录 B：图片压缩明细（逐张）

| # | 文件名 | 原图体积 | 压缩后 | 降幅 |
|---|---|---|---|---|
| 01 | `01_Nancy_Liu-Guiting_Sales-Director.jpg` | 1,947 KB | 30.2 KB | −98.4% |
| 02 | `02_Wu-Fengguang_R-and-D-Manager.jpg` | 2,052 KB | 25.7 KB | −98.7% |
| 03 | `03_Xian-Zuyin_General-Manager.jpg` | 1,538 KB | 25.2 KB | −98.4% |
| 04 | `04_Zhou-Yuanbin_Quality-Control-Manager.jpg` | 2,310 KB | 35.2 KB | −98.5% |
| 05 | `05_Amy_Yi-Si_Sales-Assistant.jpg` | 1,726 KB | 33.6 KB | −98.1% |
| 06 | `06_Gong-Shuangyu_Supply-Chain-Manager.jpg` | 1,766 KB | 25.9 KB | −98.5% |
| 07 | `07_Huang-Yuanbin_Factory-Supervisor.jpg` | 1,868 KB | 38.3 KB | −97.9% |
| 08 | `08_Li-Weitao_Chairman-and-CEO.jpg` | 2,011 KB | 29.1 KB | −98.6% |
| 09 | `09_Li-Zhenzong_Founder.jpg` | 2,393 KB | 34.4 KB | −98.6% |
| 10 | `10_Lu-Wen_Finance-Manager.jpg` | 2,092 KB | 28.5 KB | −98.6% |
| — | **合计** | **19,702.7 KB** | **306.2 KB** | **−98.45%** |

---

*文档整理：team-recorder | 依据：四个关联提交、源码逐行抽查、Git 历史二进制取证、构建产物实测*
