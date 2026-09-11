# 第一版驗證紀錄

## 已驗證

- `npm run build`：成功，首頁及 metadata 路由預先渲染。
- `npm run lint`：成功，無 warning / error。
- `npm run typecheck`：成功。
- Chromium / Playwright：14 項測試全部通過。
- 響應式寬度：320、375、430、768、1024、1440px，document 無橫向溢出。
- 客群按鈕可切換三種工作空間內容。
- 服務詳情可開啟、Escape 關閉並恢復觸發按鈕焦點。
- 諮詢驗證及本機摘要可操作，測試未發出 POST。
- 手機選單可開關、導覽及 Escape 關閉。
- FAQ 可展開與收合。
- 關閉 JavaScript 後仍有主要內容與可操作的原生 FAQ。
- FAQPage JSON-LD 與 DOM 問答一致。
- robots、sitemap、favicon 及 Open Graph 圖片路由可存取。
- 本次 npm install audit 回報 0 個已知漏洞；此數字只代表執行當時依賴資料庫結果。

## 實作修正

- 明確指定 Turbopack root，避免誤判上層專案 lockfile。
- 未設定正式網域時刻意禁止搜尋索引，避免測試頁收錄。
- JavaScript 初始化前暫停純互動按鈕，初始化後啟用。
- 測試伺服器明確使用 production 模式，避免開發熱更新環境干擾。
- 字型使用 variable weight range，避免重複載入多組靜態字重 CSS。

## 尚非測試承諾

- 未測試 Safari / Firefox、實機輔助科技或完整 WCAG 對比度稽核。
- 未提供 Lighthouse 分數或 Core Web Vitals / 首屏 800ms 保證。
- 沒有真實 AI 模型、服務 SLA、郵件提交或 CRM 整合測試。
- 搜尋排名、AI 引用及 rich results 仍由各平台決定。

桌面與手機全頁截圖由測試生成於 `test-results/home-1440.png` 與 `test-results/home-375.png`。每次測試會重建 test-results。
