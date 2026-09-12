# 實瀚科技 HANGS — 品牌首頁

白色為主的 Next.js 前端網站，使用品牌綠 `#009c6f`、青檸綠 `#a9ce47` 與深藍 `#162144`。參考 DeepSeek 的簡潔及留白方向，所有版面與示意介面均為此專案重新設計，沒有複製其商標或素材。

## 技術

- Next.js 16 App Router、React 19、TypeScript
- 原生 CSS 響應式設計；Lucide 圖示
- 靜態預先渲染首頁、SEO 路由與 Open Graph 圖片
- Playwright 瀏覽器互動測試
- 無資料庫、API 提交端點或 AI 模型串接

## 啟動

需要 Node.js 20.9+，建議 Node.js 22 LTS。

```bash
cd /Users/user/Documents/Web_project/hangs_v2
npm install
npm run dev
```

瀏覽 `http://localhost:3000`。

此電腦的非互動 shell 未預設載入 Node。如出現 `node: command not found`，先執行：

```bash
export PATH="/Users/user/.nvm/versions/node/v22.19.0/bin:$PATH"
```

## 指令

```bash
npm run lint
npm run typecheck
npm run build
npm run start
npm run test:e2e
```

首次在另一台電腦執行瀏覽器測試前，可執行 `npx playwright install chromium`。測試使用 production build，請先執行 `npm run build`；Playwright 會在獨立的 3107 埠啟動正式模式測試伺服器，測試後自動停止，不共用 3000 埠的預覽。

## 頁面架構

導覽列共五個跳轉目標：首頁、解決方案（一人公司／中小企業／企業團隊）及服務介紹，右側統一為「預約免費諮詢」按鈕。

| 路由 | 頁面 | 重點 |
| --- | --- | --- |
| `/` | 首頁 | Hero、五大服務分類、主打方案、差異點、合作流程、FAQ、CTA |
| `/solutions/solo` | 一人公司 | AI 工作夥伴、個人工作台示意、查詢／內容／輕量工作流、個人化實作方式 |
| `/solutions/sme` | 中小企業 | 資料散落 → AI 處理 → 人手審批、應用場景、識用識改識接手、試點再擴展 |
| `/solutions/enterprise` | 企業團隊 | 治理、權限與資料流向、受控 AI 與整合層、部署維運、企業級交付 |
| `/services` | 服務介紹 | 六項能力（AI、自動化、雲端 DevOps、資安、客製平台、培訓）單頁連續介紹 |
| `/services/[category]` | 服務分類（第一層） | 六大分類各一頁，列出該分類下的實際服務，並說明導入方式與流程 |
| `/services/[category]/[service]` | 服務詳情（第二層） | 每項實際服務一頁：解決甚麼、包含甚麼、導入流程、適合誰、FAQ |
| `/choose-service` | 選擇我們的服務 | 沿用首頁 OUR EXPERTISE 五張卡片，展開第二層服務項目並可勾選，彙整到諮詢摘要 |

服務目錄共 6 個分類、19 項實際服務（例如 `AI 應用與知識助手` → `AI 智能客服`），全部為靜態預渲染。分類是為了方便瀏覽，實際方案可混合選用多項能力。每頁均含獨立 title、description、canonical、麵包屑及 FAQ 結構化資料。

解決方案頁共用同一套視覺系統，但各有專屬流程示意與主色調；服務介紹刻意不分類、不做獨立服務子頁，以單一頁面完整呈現。每頁均為靜態預渲染，含獨立 title、description、canonical、breadcrumb、Service 及 FAQPage 結構化資料。

## 首頁內容

1. Hero：少一點繁瑣，多一點可能。
2. 可切換一人公司／中小企業／企業團隊的 AI 工作空間概念示意
3. 公司背景數據
4. 五大服務分類與詳情視窗
5. 三個主打方案：企業職能 AI、流程自動化、雲端與 DevOps
6. 四個合作差異點
7. 公司背景與全棧架構示意
8. 四階段合作流程
9. 六組常見問題
10. 收尾 CTA 與頁尾

## 已實作互動

- 桌面錨點導覽與區段提示
- 手機選單及 Escape 關閉
- 客群切換，更新工作空間示意
- 五大服務詳情對話框
- 原生 details / summary FAQ
- 諮詢表單驗證、在記憶體內產生需求摘要、複製摘要
- 原生 dialog 焦點限制、Escape 關閉及返回觸發按鈕焦點
- 鍵盤 focus、跳至主要內容及 reduced-motion

## 重要：諮詢並未傳送

未有正式公司電郵、電話、WhatsApp 或 CRM 接口，因此未虛構聯絡資料，也沒有模擬「提交成功」。表單會清楚顯示前端示範提示，只在頁面記憶體整理摘要，不會以 POST 傳送、不存入 localStorage，關閉視窗即清除。

此頁會向 Google Fonts 載入字型；如正式項目有嚴格資料保護或外部資源限制，請改為自託管字型。除字型外，目前沒有 analytics、第三方聊天或追蹤元件。

## SEO / AEO

已建立：

- 繁體中文 `lang`、單一 H1、語意化 section / article / nav
- Metadata title、description、Open Graph、Twitter Card
- 動態產生的品牌分享圖 `/opengraph-image`
- Organization、WebSite、Service、FAQPage JSON-LD
- FAQ 結構化答案與實際可見內容一致
- Sitemap、robots、canonical 的正式網域設定
- 服務、客群、部署、資料保密、交接及流程的清晰問答
- 主要內容在初始 HTML 中，不需等待客戶端請求

請在 `.env.local` 或部署平台環境變數加入真實網域：

```dotenv
NEXT_PUBLIC_SITE_URL=https://你的正式網域
```

然後重新 build。未設定時刻意使用 `noindex, nofollow`、robots 禁止收錄、空 sitemap，且不輸出假的 canonical；開發分享圖基準為 `http://localhost:3000`。設定後會開放索引，產生正式 canonical / sitemap / robots URL。

SEO / AEO 設計不代表保證排名、AI 引用或 FAQ rich results；搜尋平台有自己的呈現資格與政策。

## 上線前需要確認

- 將目前臨時 H 字形標誌替換成正式公司 logo
- 提供正式網域、公司電郵、電話／WhatsApp 及地址
- 接入真實諮詢處理流程及適用的私隱政策
- 核實「15 年以上」、「200+ 企業服務經驗」等由需求方提供的對外文案，釐清企業／團隊經驗口徑
- 源碼、帳號、知識產權、資料處理、駐場及 SLA 均須以實際合約為準
- Hero workspace 和 AI chat 均為概念示意，不是真實產品或客戶績效
- 未將「首屏 800ms」當作實測承諾；上線前需在目標環境實測 Core Web Vitals
- 原始介紹中對 WordPress / Wix 等平台的泛化比較，已改為中性、以需求為核心的客製架構說明
- 正式部署後設定 Search Console、提交 sitemap，按內容與實際業務持續優化

## 主要檔案

```text
src/app/page.tsx              首頁及 JSON-LD
src/app/layout.tsx            全站 metadata
src/app/globals.css           全站樣式、斷點、動效
src/app/robots.ts             搜尋引擎存取規則
src/app/sitemap.ts            網站地圖
src/app/opengraph-image.tsx   社群分享圖
src/app/icon.svg              臨時品牌 favicon
src/components/site-shell.tsx   導覽、頁尾、諮詢 Provider
src/components/shared-ui.tsx     Brand、Modal、Consultation
src/components/page-blocks.tsx   解決方案／服務共用區塊
src/components/solution-page.tsx 三類客群共用畫面與流程示意
src/lib/solutions.ts           三類客群全部文案資料
src/lib/metadata.ts            子頁 metadata 工具
src/app/solutions/[audience]/page.tsx  客群路由
src/lib/service-catalog.ts  6 大服務分類與 19 項服務全部文案
src/components/category-page.tsx      服務分類（第一層）畫面
src/components/service-detail-page.tsx 服務詳情（第二層）畫面
src/app/services/[category]/page.tsx           分類路由
src/app/services/[category]/[service]/page.tsx 詳情路由
src/app/catalog.css            分類與詳情頁樣式
```
# Hangs_v2
