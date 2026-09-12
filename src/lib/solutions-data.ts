export type Solution = {
  id: number;
  cat: string;
  title: string;
  sub: string;
  desc: string;
  content: string;
  tags: string[];
  options: string[];
  cover: string;
  yt: string;
};

export const solutionCategories = ['AI 解決方案', '流程自動化', 'AI Admin', 'AI HR', 'AI Account', '雲端與資安'];
export const solutionCatIcons: Record<string, string> = {
  'AI 解決方案': '🤖', '流程自動化': '⚙️', 'AI Admin': '🗂️', 'AI HR': '👥', 'AI Account': '🧾', '雲端與資安': '☁️',
};

export const solutions: Solution[] = [
  { id: 1, cat: 'AI 解決方案', title: 'AI 解決方案顧問', sub: '企業級 AI 導入與落地', desc: '端到端的 AI 導入規劃、模型訓練與落地部署。', content: '我們提供從需求訪談、可行性評估、模型訓練到上線部署的全流程 AI 顧問服務。\n\n涵蓋生成式 AI、電腦視覺、NLP 與預測分析，協助企業找出最適合的 AI 應用場景。', tags: ['AI', '顧問', '導入'], options: ['需求訪談', '模型訓練', '落地部署'], cover: 'linear-gradient(135deg,#22c55e,#15803d)', yt: '' },
  { id: 2, cat: 'AI 解決方案', title: '生成式 AI 導入', sub: 'Chatbot、內容與程式碼生成', desc: '導入大型語言模型，打造企業專屬生成式 AI 應用。', content: '協助企業導入 ChatGPT、Claude、Llama 等大型語言模型。\n\n包含私有化部署、Prompt 工程、RAG 檢索增強與企業知識庫串接。', tags: ['生成式AI', 'LLM', 'Chatbot'], options: ['私有化部署', 'RAG 串接', 'Prompt 工程'], cover: 'linear-gradient(135deg,#16a34a,#0d9488)', yt: '' },
  { id: 3, cat: 'AI 解決方案', title: 'AI 數據分析平台', sub: '商業智能與預測洞察', desc: '建置數據儀表板與預測模型，讓決策有數據支撐。', content: '整合企業各系統數據，建立視覺化儀表板與自動報表。\n\n運用機器學習進行銷售預測、客戶分群與異常偵測。', tags: ['數據分析', 'BI', '預測'], options: ['儀表板', '自動報表', '預測模型'], cover: 'linear-gradient(135deg,#0d9488,#0891b2)', yt: '' },
  { id: 4, cat: 'AI 解決方案', title: '智能客服機器人', sub: '24 小時自動應答', desc: '以 AI 客服機器人分擔客戶查詢，降低人力成本。', content: '建置多管道智能客服，支援網站、LINE、WhatsApp 等平台。\n\n機器人能回答常見問題、引導流程，複雜問題轉接真人客服。', tags: ['客服', 'Chatbot', '自動化'], options: ['多管道', '意圖辨識', '真人轉接'], cover: 'linear-gradient(135deg,#0891b2,#2563eb)', yt: 'https://www.youtube.com/embed/9bZkp7q19f0' },
  { id: 5, cat: 'AI 解決方案', title: 'AI 內容生成引擎', sub: '行銷文案與素材自動產出', desc: '自動生成行銷文案、社群貼文與廣告素材。', content: '以生成式 AI 協助企業快速產出各類行銷內容。\n\n從社群貼文、電子報、廣告文案到圖片素材。', tags: ['內容生成', '行銷', '文案'], options: ['社群貼文', '電子報', '廣告素材'], cover: 'linear-gradient(135deg,#2563eb,#7c3aed)', yt: '' },
  { id: 6, cat: 'AI 解決方案', title: 'AI 影像辨識系統', sub: '電腦視覺自動檢測', desc: '用 AI 辨識影像、物件與瑕疵，提升品管效率。', content: '建置電腦視覺系統，應用於產品瑕疵檢測、人臉辨識、車牌辨識。\n\n可整合於產線，即時偵測異常。', tags: ['影像辨識', 'CV', '品管'], options: ['瑕疵檢測', '人臉辨識', '產線整合'], cover: 'linear-gradient(135deg,#7c3aed,#c026d3)', yt: '' },
  { id: 7, cat: 'AI 解決方案', title: 'AI 語音辨識與合成', sub: '語音轉文字與語音客服', desc: '語音轉文字、語音合成與語音指令應用。', content: '提供語音辨識（ASR）與語音合成（TTS）解決方案。\n\n應用於會議逐字稿、語音客服與多語言翻譯。', tags: ['語音', 'ASR', 'TTS'], options: ['逐字稿', '語音客服', '多語言翻譯'], cover: 'linear-gradient(135deg,#c026d3,#e11d48)', yt: '' },
  { id: 8, cat: 'AI 解決方案', title: '自然語言處理 NLP', sub: '文字理解與情緒分析', desc: '文本分類、關鍵字擷取、情緒分析等 NLP 應用。', content: '建置自然語言處理模型，處理大量文字資料。\n\n包含文本分類、關鍵字擷取、情緒分析與自動摘要。', tags: ['NLP', '文字分析', '情緒'], options: ['文本分類', '情緒分析', '自動摘要'], cover: 'linear-gradient(135deg,#e11d48,#f97316)', yt: '' },
  { id: 9, cat: 'AI 解決方案', title: 'AI 預測模型建置', sub: '銷售、需求與風險預測', desc: '以機器學習建立預測模型，提前掌握趨勢。', content: '運用歷史數據訓練預測模型，應用於銷售預測、庫存需求、風險評估。\n\n提供模型建置、驗證與持續監控。', tags: ['ML', '預測', '模型'], options: ['銷售預測', '需求預測', '模型監控'], cover: 'linear-gradient(135deg,#f97316,#eab308)', yt: '' },
  { id: 10, cat: 'AI 解決方案', title: 'AI 知識庫管理', sub: '企業知識檢索與問答', desc: '建立企業知識庫，讓員工用自然語言查詢。', content: '整合企業文件、FAQ 與內部資料，建置可自然語言查詢的知識庫。\n\n透過 RAG 技術讓 AI 精準回答。', tags: ['知識庫', 'RAG', '搜尋'], options: ['知識庫', 'FAQ', 'RAG'], cover: 'linear-gradient(135deg,#eab308,#84cc16)', yt: '' },
  { id: 11, cat: '流程自動化', title: '流程自動化 RPA', sub: '機器人流程自動化', desc: '以 RPA 自動化重複性行政流程，釋放人力。', content: '導入 RPA 機器人，自動處理資料輸入、表單填寫、系統查詢。\n\n可 7x24 運作、零出錯。', tags: ['RPA', '自動化', '行政'], options: ['資料輸入', '表單填寫', '7x24 運作'], cover: 'linear-gradient(135deg,#84cc16,#22c55e)', yt: '' },
  { id: 12, cat: '流程自動化', title: '企業工作流自動化', sub: '審批與簽核流程', desc: '數位化審批簽核流程，加速決策。', content: '將請假、採購、報銷等審批流程數位化，線上簽核與追蹤。\n\n自動通知相關人員、紀錄歷程。', tags: ['工作流', '審批', '簽核'], options: ['線上簽核', '自動通知', '歷程紀錄'], cover: 'linear-gradient(135deg,#22c55e,#10b981)', yt: '' },
  { id: 13, cat: '流程自動化', title: '文件自動化處理', sub: 'OCR 與文件歸檔', desc: '自動辨識、分類與歸檔紙本文件。', content: '運用 OCR 光學字元辨識自動擷取文件內容，並依規則分類歸檔。\n\n適用於發票、合約、申請表等大量紙本文件。', tags: ['OCR', '文件', '歸檔'], options: ['OCR 辨識', '自動分類', '歸檔'], cover: 'linear-gradient(135deg,#10b981,#14b8a6)', yt: '' },
  { id: 14, cat: '流程自動化', title: '報表自動化生成', sub: '定時產出營運報表', desc: '自動彙整數據，定時寄送營運報表。', content: '自動從各系統抓取數據，依排程生成營運報表並寄送給主管。\n\n支援日報、週報、月報。', tags: ['報表', '定時', '彙整'], options: ['日報', '週報', '月報'], cover: 'linear-gradient(135deg,#14b8a6,#06b6d4)', yt: '' },
  { id: 15, cat: '流程自動化', title: '跨系統資料整合', sub: '串接異質系統資料', desc: '自動同步不同系統間的資料，消除資料孤島。', content: '透過 API 或中介軟體串接 CRM、ERP、電商等異質系統。\n\n自動同步訂單、庫存、客戶資料。', tags: ['整合', 'API', '同步'], options: ['API 串接', '資料同步', '系統整合'], cover: 'linear-gradient(135deg,#06b6d4,#0ea5e9)', yt: '' },
  { id: 16, cat: '流程自動化', title: '電子簽核流程', sub: '線上簽署與追蹤', desc: '文件線上簽署，追蹤簽核進度。', content: '建置電子簽核系統，合約、表單線上簽署並自動追蹤進度。\n\n支援多簽署人、順序簽與並行簽。', tags: ['電子簽', '簽署', '追蹤'], options: ['多簽署人', '順序簽', '進度追蹤'], cover: 'linear-gradient(135deg,#0ea5e9,#3b82f6)', yt: '' },
  { id: 17, cat: '流程自動化', title: '自動備份與排程', sub: '資料備份自動化', desc: '自動排程備份，確保資料安全。', content: '設定自動備份排程，定期備份資料庫、檔案與系統設定。\n\n搭配異地備份與還原演練。', tags: ['備份', '排程', '災難復原'], options: ['定時備份', '異地備份', '還原演練'], cover: 'linear-gradient(135deg,#3b82f6,#6366f1)', yt: '' },
  { id: 18, cat: '流程自動化', title: '通知與提醒自動化', sub: '事件驅動自動通知', desc: '依事件自動發送通知與提醒，不漏接重要事項。', content: '設定事件觸發的自動通知，如訂單成立、庫存不足、簽核逾期。\n\n透過 Email、簡訊或即時通訊推播。', tags: ['通知', '提醒', '事件'], options: ['Email 通知', '簡訊', '即時通訊'], cover: 'linear-gradient(135deg,#6366f1,#8b5cf6)', yt: '' },
  { id: 19, cat: '流程自動化', title: '訂單流程自動化', sub: '下單到出貨自動串接', desc: '自動處理訂單、發票與出貨通知。', content: '將訂單從接收、核對、開立發票到出貨通知全自動化。\n\n減少人工操作失誤。', tags: ['訂單', '出貨', '串接'], options: ['訂單核對', '發票開立', '出貨通知'], cover: 'linear-gradient(135deg,#8b5cf6,#a855f7)', yt: '' },
  { id: 20, cat: '流程自動化', title: '庫存同步自動化', sub: '多通路庫存即時同步', desc: '自動同步各通路庫存，避免超賣。', content: '串接官網、蝦皮、Lazada 等通路，即時同步庫存數量。\n\n庫存變動自動更新並觸發補貨提醒。', tags: ['庫存', '同步', '多通路'], options: ['多通路同步', '庫存提醒', '補貨觸發'], cover: 'linear-gradient(135deg,#a855f7,#d946ef)', yt: '' },
  { id: 21, cat: 'AI Admin', title: 'AI 行政管理助手', sub: '行政庶務自動化', desc: 'AI 助手處理會議、郵件、文件等行政事務。', content: '打造企業行政 AI 助手，協助處理日常庶務。\n\n涵蓋會議安排、郵件草擬、文件整理與待辦追蹤。', tags: ['行政', '助手', '自動化'], options: ['會議安排', '郵件草擬', '待辦追蹤'], cover: 'linear-gradient(135deg,#d946ef,#ec4899)', yt: '' },
  { id: 22, cat: 'AI Admin', title: 'AI 會議記錄與摘要', sub: '自動逐字稿與重點摘要', desc: '自動產生會議逐字稿與重點摘要。', content: '錄音後自動轉為逐字稿，並以 AI 產生會議重點、決議事項與待辦。\n\n支援多語言與講者辨識。', tags: ['會議', '逐字稿', '摘要'], options: ['逐字稿', '重點摘要', '講者辨識'], cover: 'linear-gradient(135deg,#ec4899,#f43f5e)', yt: 'https://www.youtube.com/embed/M7lc1UVf-VE' },
  { id: 23, cat: 'AI Admin', title: 'AI 郵件管理', sub: '郵件分類與自動回覆', desc: 'AI 分類郵件、草擬回覆，整理收件匣。', content: '以 AI 自動分類郵件優先順序、標記重點，並草擬回覆草稿。\n\n降低郵件處理時間。', tags: ['郵件', '分類', '回覆'], options: ['優先分類', '草擬回覆', '重點標記'], cover: 'linear-gradient(135deg,#f43f5e,#fb7185)', yt: '' },
  { id: 24, cat: 'AI Admin', title: 'AI 行事曆排程', sub: '智慧會議排程', desc: 'AI 自動協調與安排會議時間。', content: 'AI 依據與會者空檔自動協調會議時間，發送邀請與提醒。\n\n減少來回確認時間。', tags: ['行事曆', '排程', '會議'], options: ['空檔協調', '邀請發送', '提醒'], cover: 'linear-gradient(135deg,#fb7185,#fda4af)', yt: '' },
  { id: 25, cat: 'AI Admin', title: 'AI 文件歸檔管理', sub: '文件自動分類歸檔', desc: '自動分類、標籤與歸檔企業文件。', content: '運用 AI 自動辨識文件類型、擷取關鍵資訊並歸檔。\n\n搭配全文檢索。', tags: ['文件', '歸檔', '分類'], options: ['類型辨識', '關鍵擷取', '全文檢索'], cover: 'linear-gradient(135deg,#fda4af,#fecdd3)', yt: '' },
  { id: 26, cat: 'AI HR', title: 'AI 人力資源管理', sub: '數位化 HR 流程', desc: '整合招聘、考勤、績效與薪資的一站式 HR 方案。', content: '打造數位化 HR 平台，涵蓋員工資料、考勤、績效與薪資管理。\n\n以 AI 輔助決策。', tags: ['HR', '管理', '數位化'], options: ['員工資料', '考勤', '績效薪資'], cover: 'linear-gradient(135deg,#22d3ee,#38bdf8)', yt: '' },
  { id: 27, cat: 'AI HR', title: 'AI 招聘篩選', sub: '履歷自動篩選與評分', desc: 'AI 自動篩選履歷、評分排序，加速招聘。', content: '以 AI 分析履歷，依職缺需求自動篩選與評分排序。\n\n節省人資大量瀏覽時間。', tags: ['招聘', '履歷', '篩選'], options: ['履歷分析', '自動篩選', '評分排序'], cover: 'linear-gradient(135deg,#38bdf8,#60a5fa)', yt: '' },
  { id: 28, cat: 'AI HR', title: 'AI 績效評估', sub: '客觀績效數據分析', desc: '以數據輔助績效評估，減少主觀偏見。', content: '整合工作數據與目標達成率，以 AI 輔助績效評估。\n\n提供客觀指標與回饋建議。', tags: ['績效', '評估', '數據'], options: ['目標達成', '客觀指標', '回饋建議'], cover: 'linear-gradient(135deg,#60a5fa,#818cf8)', yt: '' },
  { id: 29, cat: 'AI HR', title: 'AI 排班管理', sub: '智慧排班與調度', desc: 'AI 自動排班，兼顧人力需求與法規。', content: '依據業務量、員工技能與勞基法規自動排班。\n\n快速產出合理班表。', tags: ['排班', '調度', '法規'], options: ['自動排班', '調班', '法規合規'], cover: 'linear-gradient(135deg,#818cf8,#a5b4fc)', yt: '' },
  { id: 30, cat: 'AI HR', title: 'AI 薪資計算', sub: '自動計算薪資與扣繳', desc: '自動化薪資計算、扣繳與出糧流程。', content: '自動計算薪資、加班、獎金與扣繳，並產生薪資單。\n\n符合法規要求。', tags: ['薪資', '計算', '出糧'], options: ['薪資計算', '扣繳', '薪資單'], cover: 'linear-gradient(135deg,#a5b4fc,#c7d2fe)', yt: '' },
  { id: 31, cat: 'AI HR', title: 'AI 員工培訓', sub: '個人化學習推薦', desc: 'AI 依員工需求推薦培訓課程。', content: '以 AI 分析員工技能缺口，推薦個人化培訓課程與進度追蹤。\n\n提升學習成效。', tags: ['培訓', '學習', '推薦'], options: ['技能分析', '課程推薦', '進度追蹤'], cover: 'linear-gradient(135deg,#c7d2fe,#e0e7ff)', yt: '' },
  { id: 32, cat: 'AI Account', title: 'AI 會計帳務', sub: '自動開票與入帳', desc: 'AI 自動開票、入圖入帳與年審報表。', content: '以 AI 自動處理日常會計作業：自動開立發票、掃描單據入圖入帳、自動對帳。\n\n年末自動產出年審報表，大幅減輕會計工作量。', tags: ['會計', '開票', '入帳'], options: ['自動開票', '自動入圖入帳', '自動對帳', '自動出年審報表'], cover: 'linear-gradient(135deg,#fbbf24,#f59e0b)', yt: '' },
  { id: 33, cat: 'AI Account', title: 'AI 發票處理', sub: '發票自動辨識與核對', desc: '自動辨識發票內容並核對，加速報帳。', content: '運用 OCR 自動擷取發票資訊，核對金額與品項，並自動入帳。\n\n搭配電子發票整合。', tags: ['發票', 'OCR', '核對'], options: ['自動辨識發票', '自動核對金額', '自動入帳', '電子發票整合'], cover: 'linear-gradient(135deg,#f59e0b,#f97316)', yt: '' },
  { id: 34, cat: 'AI Account', title: 'AI 報稅輔助', sub: '稅務計算與申報輔助', desc: 'AI 輔助稅務計算與申報，降低錯誤。', content: '以 AI 輔助稅務計算、分類與申報資料整理。\n\n自動檢查異常與提醒申報期限。', tags: ['報稅', '稅務', '申報'], options: ['自動算稅', '自動填報', '申報期限提醒'], cover: 'linear-gradient(135deg,#f97316,#fb923c)', yt: '' },
  { id: 35, cat: 'AI Account', title: 'AI 預算預測', sub: '財務預算智慧預測', desc: '以 AI 預測財務預算與支出趨勢。', content: '運用歷史財務數據，以 AI 預測未來預算與支出趨勢。\n\n輔助管理層做出更精準的財務規劃。', tags: ['預算', '預測', '財務'], options: ['預算預測', '支出趨勢分析', '現金流預測'], cover: 'linear-gradient(135deg,#fb923c,#fdba74)', yt: '' },
  { id: 36, cat: 'AI Account', title: 'AI 現金流管理', sub: '現金流監控與預警', desc: 'AI 監控現金流並提前預警風險。', content: '即時監控應收應付與現金水位，AI 預測未來現金流。\n\n提前預警資金缺口。', tags: ['現金流', '監控', '預警'], options: ['現金水位監控', '應收應付追蹤', '資金缺口預警'], cover: 'linear-gradient(135deg,#fdba74,#fed7aa)', yt: '' },
  { id: 37, cat: 'AI Account', title: 'AI 費用報銷', sub: '報銷流程自動化', desc: '自動審核與核銷員工費用報銷。', content: '以 AI 自動審核費用報銷單據、比對政策並完成核銷入帳。\n\n縮短報銷週期。', tags: ['報銷', '審核', '核銷'], options: ['單據自動審核', '政策比對', '自動入帳'], cover: 'linear-gradient(135deg,#fed7aa,#ffedd5)', yt: '' },
  { id: 38, cat: '雲端與資安', title: '雲端遷移服務', sub: '搬遷至 AWS / Azure / 阿里雲', desc: '協助企業將系統遷移至雲端，降低成本提升彈性。', content: '規劃與執行雲端遷移，涵蓋評估、搬遷、測試與優化。\n\n支援 AWS、Azure、阿里雲等平台。', tags: ['雲端', '遷移', 'AWS'], options: ['遷移評估', '搬遷執行', '上雲優化'], cover: 'linear-gradient(135deg,#34d399,#2dd4bf)', yt: '' },
  { id: 39, cat: '雲端與資安', title: '網絡安全健診', sub: '弱點掃描與資安評估', desc: '全面資安健診，找出系統弱點與風險。', content: '提供弱點掃描、組態檢查與資安風險評估。\n\n出具健診報告並提供修補建議。', tags: ['資安', '健診', '弱點掃描'], options: ['弱點掃描', '組態檢查', '風險報告'], cover: 'linear-gradient(135deg,#2dd4bf,#5eead4)', yt: '' },
  { id: 40, cat: '雲端與資安', title: '滲透測試', sub: '模擬駭客攻擊測試', desc: '模擬真實攻擊，驗證系統防禦能力。', content: '由專業團隊模擬駭客攻擊，測試網站與系統的防禦能力。\n\n找出可被利用的漏洞並協助修補。', tags: ['滲透測試', '安全', '攻擊'], options: ['模擬攻擊', '漏洞挖掘', '修補建議'], cover: 'linear-gradient(135deg,#5eead4,#99f6e4)', yt: '' },
  { id: 41, cat: '雲端與資安', title: 'DevOps 自動化', sub: '開發營運一體化', desc: '導入 DevOps 文化與工具鏈，加速交付。', content: '導入 DevOps 工具鏈，建立自動化測試、建置與部署流程。\n\n縮短上線時間、降低人為錯誤。', tags: ['DevOps', 'CI/CD', '自動化'], options: ['自動測試', '自動建置', '自動部署'], cover: 'linear-gradient(135deg,#4ade80,#86efac)', yt: '' },
  { id: 42, cat: '雲端與資安', title: 'CI/CD 管線', sub: '持續整合與交付', desc: '建置自動化 CI/CD 管線，快速交付。', content: '建置持續整合與持續交付管線，自動化測試與部署。\n\n讓每次程式變更都能快速、安全地上線。', tags: ['CI/CD', '交付', '管線'], options: ['持續整合', '持續交付', '自動部署'], cover: 'linear-gradient(135deg,#86efac,#bbf7d0)', yt: '' },
  { id: 43, cat: '雲端與資安', title: '容器化部署', sub: 'Docker 與 Kubernetes', desc: '以容器化技術部署應用，彈性擴充。', content: '協助應用程式容器化，並以 Kubernetes 進行部署與管理。\n\n提升資源利用率、支援自動擴充與高可用性。', tags: ['Docker', 'K8s', '容器'], options: ['Docker 化', 'K8s 部署', '自動擴充'], cover: 'linear-gradient(135deg,#6ee7b7,#a7f3d0)', yt: '' },
  { id: 44, cat: '雲端與資安', title: '網站開發', sub: '企業官網與 Web 應用', desc: '客製化網站與 Web 應用開發。', content: '提供企業官網、後台系統與 Web 應用客製化開發。\n\n採用現代技術棧，兼顧效能、安全與使用者體驗。', tags: ['網站', '開發', '前端'], options: ['企業官網', '後台系統', 'Web 應用'], cover: 'linear-gradient(135deg,#67e8f9,#a5f3fc)', yt: '' },
  { id: 45, cat: '雲端與資安', title: '電商系統建置', sub: '網路商店一頁式與商城', desc: '建置電商平台，串接金流與物流。', content: '建置電商網站，整合商品、庫存、金流與物流。\n\n支援多通路銷售。', tags: ['電商', '金流', '物流'], options: ['商品管理', '金流串接', '物流整合'], cover: 'linear-gradient(135deg,#a5f3fc,#cffafe)', yt: '' },
  { id: 46, cat: '雲端與資安', title: 'CRM 系統建置', sub: '客戶關係管理', desc: '建置 CRM 系統，管理客戶與銷售。', content: '建置客戶關係管理系統，集中管理客戶資料、互動紀錄與銷售流程。\n\n提升客戶滿意度與轉換率。', tags: ['CRM', '客戶', '銷售'], options: ['客戶管理', '銷售流程', '互動紀錄'], cover: 'linear-gradient(135deg,#fbcfe8,#f9a8d4)', yt: '' },
  { id: 47, cat: '雲端與資安', title: 'ERP 系統導入', sub: '企業資源規劃', desc: '導入 ERP 整合企業各部門流程。', content: '導入 ERP 系統，整合財務、採購、庫存與生產流程。\n\n消除資訊孤島。', tags: ['ERP', '整合', '管理'], options: ['財務整合', '採購庫存', '生產流程'], cover: 'linear-gradient(135deg,#f9a8d4,#fecdd3)', yt: '' },
  { id: 48, cat: '雲端與資安', title: '物聯網 IoT 方案', sub: '設備聯網與數據採集', desc: '建置 IoT 方案，採集設備數據並分析。', content: '建置物聯網解決方案，串接感測器與設備，即時採集數據。\n\n應用於智慧工廠、智慧辦公室與遠端監控。', tags: ['IoT', '聯網', '數據採集'], options: ['感測器串接', '即時採集', '遠端監控'], cover: 'linear-gradient(135deg,#fde68a,#fcd34d)', yt: '' },
  { id: 49, cat: '雲端與資安', title: '大數據平台', sub: '海量數據處理與分析', desc: '建置大數據平台，處理與分析海量資料。', content: '建置大數據處理平台，整合分散資料源進行即時與離線分析。\n\n支援海量資料儲存、運算與視覺化。', tags: ['大數據', '處理', '分析'], options: ['資料整合', '即時分析', '視覺化'], cover: 'linear-gradient(135deg,#fcd34d,#fbbf24)', yt: '' },
  { id: 50, cat: '雲端與資安', title: '技術支援服務', sub: 'IT 維運與技術支援', desc: '提供系統維運、監控與技術支援服務。', content: '提供長期 IT 維運與技術支援，包含系統監控、故障排除與定期維護。\n\n作為企業的技術後盾。', tags: ['支援', '維運', '監控'], options: ['系統監控', '故障排除', '定期維護'], cover: 'linear-gradient(135deg,#d9f99d,#bef264)', yt: '' },
];

export function slugFor(s: Solution): string {
  return `s-${s.id}`;
}
export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find(s => slugFor(s) === slug);
}

// 服務對象（按類別對應）
export const audienceOptions = ['一人公司', '中小企', '企業團隊'];
const catAudience: Record<string, string[]> = {
  'AI 解決方案': ['一人公司', '中小企', '企業團隊'],
  '流程自動化': ['中小企', '企業團隊'],
  'AI Admin': ['一人公司', '中小企', '企業團隊'],
  'AI HR': ['中小企', '企業團隊'],
  'AI Account': ['一人公司', '中小企'],
  '雲端與資安': ['中小企', '企業團隊'],
};
export function audiencesFor(s: Solution): string[] {
  return catAudience[s.cat] ?? audienceOptions;
}

// 中類（Sub-category）歸類
export const subCategory: Record<number, string> = {
  1: 'AI 導入與顧問', 2: 'AI 導入與顧問', 3: '數據與預測', 4: '智能客服', 5: '內容生成', 6: '影像與語音', 7: '影像與語音', 8: '自然語言處理', 9: '數據與預測', 10: '知識庫',
  11: 'RPA', 12: '審批與簽核', 13: '文件與報表', 14: '文件與報表', 15: '資料整合', 16: '審批與簽核', 17: '備份與通知', 18: '備份與通知', 19: '訂單與庫存', 20: '訂單與庫存',
  21: '行政助手', 22: '會議與郵件', 23: '會議與郵件', 24: '排程', 25: '文件歸檔',
  26: '人力資源平台', 27: '招聘與績效', 28: '招聘與績效', 29: '排班與薪資', 30: '排班與薪資', 31: '員工培訓',
  32: '帳務與發票', 33: '帳務與發票', 34: '報稅', 35: '預算與現金流', 36: '預算與現金流', 37: '費用報銷',
  38: '雲端遷移', 39: '資安健診', 40: '資安健診', 41: 'DevOps', 42: 'DevOps', 43: 'DevOps', 44: '開發與平台', 45: '開發與平台', 46: '開發與平台', 47: '開發與平台', 48: 'IoT 與大數據', 49: 'IoT 與大數據', 50: '技術支援',
};
export function subFor(s: Solution): string {
  return subCategory[s.id] ?? s.cat;
}
// 每個大類下嘅中類（去重、按次序）
export function subsOf(cat: string): string[] {
  return [...new Set(solutions.filter(s => s.cat === cat).map(subFor))];
}
