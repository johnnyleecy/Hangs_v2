export type CasePost = {
  slug: string;
  industry: string;
  title: string;
  cover: string;
  summary: string;
  content: string;
  tags: string[];
  solutionId: number;
  solutionTitle: string;
  result: string;
};

export const cases: CasePost[] = [
  {
    slug: 'meeting-minutes',
    industry: '貿易・批發',
    title: '會議紀錄由半日變五分鐘',
    cover: 'linear-gradient(135deg,#009c6f,#16a34a)',
    summary: '一人公司老闆把舊電腦翻新成專責會議紀錄的同事，開會後五分鐘出到清晰紀錄，資料留喺本機零外洩。',
    content: '陳先生（化名）經營一間貿易公司，一個人頂住所有文書。他最怕的，就是開會。每開完一次會，他都要聽回整個鐘的錄音、逐句打出來、再追問誰負責哪一項。一份會議紀錄，往往要拖到第二日才出到。\n\n後來，他把公司那部用了五年的舊電腦，翻新成一個「專責會議紀錄」的同事。現在，他開完會，五分鐘內一份清清楚楚的紀錄就出了來——誰負責、何時交、有甚麼要跟進，一目了然。資料全程留在他自己的電腦，客戶內容一毫子都不會外洩。\n\n他不再聽錄音，不再逐句打字。慳回來的那半日，他拿去見客、談生意。',
    tags: ['開會', '文書', '一人公司', '秘書'],
    solutionId: 22,
    solutionTitle: 'AI 會議記錄與摘要',
    result: '處理時間縮短 90%',
  },
  {
    slug: 'ai-customer-service',
    industry: '客服・教育',
    title: 'AI 智能客服減輕查詢負擔',
    cover: 'linear-gradient(135deg,#0891b2,#2563eb)',
    summary: '把常見查詢、服務資料與回覆原則放進 AI 助手，整理客戶問題、草擬回覆，敏感內容仍由真人確認。',
    content: '一間教育機構每天收到大量重複查詢：課程內容、上堂時間、學費、報名流程。客服同事每日花大半時間回覆同一批問題，語氣仲要因人手而異。\n\n導入 AI 智能客服後，系統先整理常見問題與服務資料，自動分類查詢、查找答案並草擬回覆。涉及價錢、承諾與敏感的內容，仍由真人確認後才送出。\n\n結果重複查詢由 AI 處理，客服同事得以專注處理真正需要人手的個案，回覆速度與一致性都提升了。',
    tags: ['客服', 'Chatbot', '自動化', '教育'],
    solutionId: 4,
    solutionTitle: '智能客服機器人',
    result: '重複查詢由 AI 集中處理',
  },
  {
    slug: 'knowledge-base',
    industry: '專業服務・行政',
    title: '企業知識庫，新人更快上手',
    cover: 'linear-gradient(135deg,#eab308,#84cc16)',
    summary: '以檢索增強生成建立內部知識搜尋，員工用自然語言查找 SOP 與文件，答案附來源，減少反覆詢問。',
    content: '一間專業服務公司內部文件眾多，SOP、指引、範本散落各處。新同事入職，往往要問足幾個月先搵到正確答案，資深同事的時間都被重複詢問佔用。\n\n建立企業知識庫後，員工用自然語言就能查找 SOP 與文件，答案附上來源與版本，減少誤用舊版本。知識更新亦有流程，而不是放著不管。\n\n新人更快上手，資深同事亦不再被重複問題打斷。',
    tags: ['知識庫', 'RAG', '搜尋', '專業服務'],
    solutionId: 10,
    solutionTitle: 'AI 知識庫管理',
    result: '新人上手時間縮短',
  },
  {
    slug: 'document-extraction',
    industry: '物流・貨代',
    title: '出貨文件自動抽取',
    cover: 'linear-gradient(135deg,#10b981,#14b8a6)',
    summary: '處理多變格式的出貨文件，自動抽取關鍵欄位、標示缺漏，交由同事覆核，減少人手抄寫與出錯。',
    content: '一間物流公司的出貨文件格式多變，同事要逐份人手抄寫提單號碼、收件人、貨品資料，既費時又容易出錯，尤其旺季更加吃力。\n\n導入文件自動化處理後，系統自動辨識文件、抽取關鍵欄位，並標示缺漏或需核對的項目，交由同事覆核。\n\n人手抄寫大幅減少，錯漏率下降，旺季亦不再需要臨時加人。',
    tags: ['OCR', '文件', '物流', '自動化'],
    solutionId: 13,
    solutionTitle: '文件自動化處理',
    result: '文件整理自動化',
  },
  {
    slug: 'inventory-reporting',
    industry: '電商・零售',
    title: '庫存與報表自動整合',
    cover: 'linear-gradient(135deg,#f59e0b,#f97316)',
    summary: '串接不同系統的資料，統一欄位與格式，建立銷售分析與庫存概覽，減少逐份匯出再拼湊。',
    content: '一間電商在多個平台賣貨，官網、蝦皮、Lazada 的庫存與訂單散落不同系統。同事每個月都要逐份匯出、人手拼湊，先出到一份銷售報表，庫存仲成日因同步不及而超賣。\n\n導入跨系統資料整合後，各平台資料自動同步，欄位與格式統一，建立銷售分析與庫存概覽。\n\n報表由人手變自動，庫存即時同步，超賣情況不再發生。',
    tags: ['庫存', '報表', '整合', '電商'],
    solutionId: 20,
    solutionTitle: '庫存同步自動化',
    result: '報表由人手變自動',
  },
  {
    slug: 'local-llm',
    industry: '會計・律師行',
    title: '本地部署 LLM，資料不出門',
    cover: 'linear-gradient(135deg,#0f172a,#334155)',
    summary: '以本地部署方式處理敏感文件與合約，配合高度保密環境，讓會計及律師行用得安心。',
    content: '會計及律師行處理的資料極度敏感，客戶的財務數據、合約條款都不可外洩。用一般雲端 AI 工具處理，隨時觸犯私隱條例，令他們遲遲不敢採用 AI。\n\n透過本地部署，把 AI 環境裝在客戶自己的機器上，資料全程留在本機，零外洩風險。會計工作如自動開票、入帳、對帳，律師行的文件整理與合約草擬，都可在保密環境下完成。\n\n既用得上 AI 的效率，又守得住客戶的信任。',
    tags: ['本地部署', '私隱', '保密', '會計', '法律'],
    solutionId: 2,
    solutionTitle: '生成式 AI 導入',
    result: '資料全程留在本機',
  },
];

export function getCaseBySlug(slug: string): CasePost | undefined {
  return cases.find(c => c.slug === slug);
}

// 案例示意圖（會意圖）：輸入 → AI → 輸出
export const caseFlow: Record<string, [string, string]> = {
  'meeting-minutes': ['會議錄音', '會議紀錄'],
  'ai-customer-service': ['客戶查詢', '回覆草稿'],
  'knowledge-base': ['文件查詢', '來源答案'],
  'document-extraction': ['出貨文件', '欄位資料'],
  'inventory-reporting': ['分散數據', '銷售報表'],
  'local-llm': ['敏感文件', '本機處理'],
};
export function flowFor(slug: string): [string, string] {
  return caseFlow[slug] ?? ['你的工作', '自動化結果'];
}
