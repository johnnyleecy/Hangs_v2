export type Faq = {
  id: string;
  zone: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  question: string;
  answer: string;
  painPointId?: number;
  solutionId?: number;
  audience?: string[];
  tags?: string[];
};

// F 區：痛症對照（30 個痛點 → 對應方案）
export const faqs: Faq[] = [
  { id: 'f-1', zone: 'F', question: '點解每次開完會都唔記得啲重點？', answer: '因為冇人即時記低「決定、負責人、期限」，散會後自然模糊。用「AI 會議記錄與摘要」方案，散會即出清晰紀錄——邊個負責、幾時交、有咩要跟進，一目了然。', painPointId: 1, solutionId: 22, tags: ['開會', '文書'] },
  { id: 'f-2', zone: 'F', question: '通告出咗，同事仲係唔知要做咩？', answer: '通告通常只「通知」，冇講清「對你有咩影響、你要做咩、幾時生效」。用「AI 行政管理助手」，自動把通告寫成「影響＋行動＋期限」結構，減少逐個問。', painPointId: 2, solutionId: 21, tags: ['通告', '行政'] },
  { id: 'f-3', zone: 'F', question: '簽約成日要等律師等成個星期？', answer: '合約初稿其實可以先生成。用「文件自動化處理」，把條款、合作內容預先寫好，律師只負責確認簽署，慳返幾日。', painPointId: 3, solutionId: 13, tags: ['合約', '法律'] },
  { id: 'f-4', zone: 'F', question: '份報告寫咗幾日，老闆仲話冇重點？', answer: '因為資料同重點冇分開。用「AI 內容生成」，自動把冗長內容改寫成「結論行先＋關鍵數字＋建議」嘅決策版。', painPointId: 4, solutionId: 5, tags: ['報告', '文書'] },
  { id: 'f-5', zone: 'F', question: '一封正經信都寫唔出第一句？', answer: '用「AI 內容生成」，話佢知寫畀邊個、咩目的，即出得體版本，仲附「更客氣／更直接」兩個版本俾你揀。', painPointId: 5, solutionId: 5, tags: ['書信', '文書'] },
  { id: 'f-6', zone: 'F', question: '客戶名單亂晒，同一個客出現幾次？', answer: '用「AI 數據分析」或「RPA 流程自動化」，自動去重、統一格式、標出異常，唔使逐格執。', painPointId: 6, solutionId: 3, tags: ['數據', '客戶名單'] },
  { id: 'f-7', zone: 'F', question: '每個月頭砌報表都砌到遲？', answer: '用「自動報表」方案，數據自動匯總出報表，月頭唔使再人手 copy，準時交。', painPointId: 7, solutionId: 14, tags: ['報表', '數據'] },
  { id: 'f-8', zone: 'F', question: '做咗個圖，老闆睇唔明？', answer: '用「AI 數據分析」，自動把圖表配上「一句結論＋關鍵數字」，等決策者一眼睇明。', painPointId: 8, solutionId: 3, tags: ['圖表', '數據'] },
  { id: 'f-9', zone: 'F', question: '使爆預算，月底先知？', answer: '用「AI 預算管理」，開支實時追蹤、接近上限自動提示，唔使月底先知爆咗。', painPointId: 9, solutionId: 35, tags: ['預算', '會計'] },
  { id: 'f-10', zone: 'F', question: '對數對唔平，搵到半夜？', answer: '用「AI 記帳」，自動比對銀行紀錄同帳簿，標出每一筆差額，慳返成晚時間。', painPointId: 10, solutionId: 32, tags: ['對數', '會計'] },
  { id: 'f-11', zone: 'F', question: '要 pitch 客，簡報唔知點鋪？', answer: '用「AI 內容生成」，按「痛點→方案→成果」幫你排簡報大綱，pitch 更有說服力。', painPointId: 11, solutionId: 5, tags: ['簡報', '提案'] },
  { id: 'f-12', zone: 'F', question: '簡報成版都係字，冇人想睇？', answer: '用「AI 內容生成」，把每版濃縮成「一句重點＋一個視覺」，簡報變返清爽。', painPointId: 12, solutionId: 5, tags: ['簡報'] },
  { id: 'f-13', zone: 'F', question: '上台講到一半就斷咗？', answer: '用「AI 內容生成」，幫你寫好演講稿＋逐頁提示，跟住講唔會亂。', painPointId: 13, solutionId: 5, tags: ['演講', '簡報'] },
  { id: 'f-14', zone: 'F', question: '寫咗十頁提案，客冇時間睇？', answer: '用「AI 內容生成」，把十頁壓成一頁提案，客 30 秒睇得明。', painPointId: 14, solutionId: 5, tags: ['提案', '簡報'] },
  { id: 'f-15', zone: 'F', question: '貼咗數據出去先知係假？', answer: '用「AI 數據分析」事前查證數據來源同準確性，唔再尷尷哋收返。', painPointId: 15, solutionId: 3, tags: ['查證', '數據'] },
  { id: 'f-16', zone: 'F', question: '記者問兩句，搵資料搵成個鐘？', answer: '用「AI 知識庫管理」，公司資料集中存放，一句查詢即搵到相關資料。', painPointId: 16, solutionId: 10, tags: ['知識庫', '資料'] },
  { id: 'f-17', zone: 'F', question: 'quote 咗個 blogger 先知原來錯？', answer: '用「AI 知識庫管理」核實來源，只引用有根據嘅資料，唔再信錯來源。', painPointId: 17, solutionId: 10, tags: ['來源', '查證'] },
  { id: 'f-18', zone: 'F', question: '揀系統揀成個月都揀唔落？', answer: '用「AI 數據分析」做決策比較表，列晒準則同權重，幫你理性揀，唔使再拖。', painPointId: 18, solutionId: 3, tags: ['決策', '數據'] },
  { id: 'f-19', zone: 'F', question: '日程撞到七彩，仲要人肉排？', answer: '用「智能排程」，自動避開撞期、預留車程，幾秒排好晒。', painPointId: 19, solutionId: 24, tags: ['排程', '行政'] },
  { id: 'f-20', zone: 'F', question: 'email 改十次，send 出去仲嬲到人？', answer: '用「智能郵件助理」，幫你寫得體電郵，語氣啱先 send，唔怕得罪人。', painPointId: 20, solutionId: 23, tags: ['電郵', '行政'] },
  { id: 'f-21', zone: 'F', question: '搵一份合同搵咗半日？', answer: '用「智能文件歸檔」，文件自動分類＋關鍵字搜尋，幾秒搵到。', painPointId: 21, solutionId: 25, tags: ['文件', '歸檔'] },
  { id: 'f-22', zone: 'F', question: '老闆問一句，要煲成晚先答到？', answer: '用「自動報表」或「AI 會議記錄」，進度數據自動匯總，老闆一問即答。', painPointId: 22, solutionId: 14, tags: ['匯報', '行政'] },
  { id: 'f-23', zone: 'F', question: '同一份內容，要砌十個版本？', answer: '用「文件自動化處理」，一份源內容自動轉做簡報、Excel、流程圖等不同格式。', painPointId: 23, solutionId: 13, tags: ['格式轉換', '文件'] },
  { id: 'f-24', zone: 'F', question: '對客同對同事語氣唔同，好易出事？', answer: '用「AI 內容生成」，同一訊息自動轉換語氣，對客客氣、對同事直接。', painPointId: 24, solutionId: 5, tags: ['語氣', '文書'] },
  { id: 'f-25', zone: 'F', question: '想出個 post，坐成日都出唔到一篇？', answer: '用「AI 內容生成」，畀個主題即出貼文草稿＋Hashtag，唔使坐成日。', painPointId: 25, solutionId: 5, tags: ['社媒', '行銷'] },
  { id: 'f-26', zone: 'F', question: '有新聞要出，唔識寫新聞稿？', answer: '用「AI 內容生成」，幫你寫新聞稿，跟返媒體格式，唔似廣告。', painPointId: 26, solutionId: 5, tags: ['新聞稿', '行銷'] },
  { id: 'f-27', zone: 'F', question: 'send email 出去，冇人覆？', answer: '用「智能郵件助理」，幫你寫更有吸引嘅開場＋單一 CTA，回覆率自然高。', painPointId: 27, solutionId: 23, tags: ['行銷', '電郵'] },
  { id: 'f-28', zone: 'F', question: '搞 annual dinner 搞到頭大？', answer: '用「工作流程自動化」，把籌備清單、邀請、場地跟進自動化，你只跟進度。', painPointId: 28, solutionId: 12, tags: ['活動', '專案'] },
  { id: 'f-29', zone: 'F', question: 'project 成日延遲，唔知邊度出事？', answer: '用「工作流程自動化」，把每個環節嘅負責人、期限同進度透明化，邊度卡住一睇就知。', painPointId: 29, solutionId: 12, tags: ['專案', '流程'] },
  { id: 'f-30', zone: 'F', question: '活動前一晚先發現漏十樣嘢？', answer: '用「工作流程自動化」，生成完整檢查清單，逐項提醒，唔會臨急抱佛腳。', painPointId: 30, solutionId: 12, tags: ['清單', '活動'] },

  // A 區：概念
  { id: 'a-1', zone: 'A', question: '「舊腦翻新」係咩意思？', answer: '係用你手頭嘅舊電腦，重新配置成一個專責「AI 同事」，唔使買新機。資料留喺你自己部機，高度保密。', tags: ['概念', '舊腦翻新'] },
  { id: 'a-2', zone: 'A', question: '「AI 同事」同普通 AI 工具有咩分別？', answer: '普通 AI 工具要你自己逐個試、逐個寫指令；AI 同事係度身調校好，專責一個崗位（如秘書、會計），開箱即用。', tags: ['概念', 'AI 同事'] },
  { id: 'a-3', zone: 'A', question: '要唔要買新機先用到？', answer: '唔使。我哋專門用你現有嘅舊電腦翻新，慳成本之餘資料更安全。', tags: ['概念', '舊電腦'] },

  // B 區：方案／價錢
  { id: 'b-1', zone: 'B', question: '月付點計？有冇一次性費用？', answer: '舊腦翻新有一次性的設定費用，另設月費計劃。具體按你揀嘅同事數量同功能而定。', tags: ['價錢', '方案'] },
  { id: 'b-2', zone: 'B', question: '包啲咩？可以要幾個同事？', answer: '方案涵蓋行政、會計、秘書、法律顧問、推廣五個角色，可按需要揀一個或多個。', tags: ['方案', '角色'] },
  { id: 'b-3', zone: 'B', question: '有冇保養／支援？', answer: '有，舊腦翻新提供三個月保養；亦設月費計劃涵蓋持續支援。', tags: ['保養', '支援'] },

  // C 區：安全／私隱
  { id: 'c-1', zone: 'C', question: '公司資料會唔會外洩？', answer: '唔會。資料留喺你自己部電腦（本地部署），唔會上傳去第三方，高度保密。', tags: ['私隱', '安全'] },
  { id: 'c-2', zone: 'C', question: '資料留喺邊度？可唔可以本地部署？', answer: '可以，舊腦翻新正正係本地部署——所有資料留喺你部機，唔出街。', tags: ['私隱', '本地部署'] },
  { id: 'c-3', zone: 'C', question: '有冇資安健診？', answer: '有，我哋提供資安健診同滲透測試方案，幫你把關系統安全。', tags: ['資安', '安全'] },

  // D 區：啱唔啱我
  { id: 'd-1', zone: 'D', question: '一人公司啱唔啱用？', answer: '非常啱。一人公司冇人手，一個 AI 同事就可以頂起文書、會計、客服等重複工作，用舊電腦慳成本。', audience: ['一人公司'], tags: ['一人公司', '啱唔啱我'] },
  { id: 'd-2', zone: 'D', question: '中小企啱唔啱用？', answer: '啱。中小企可以用多個 AI 同事分擔行政、會計、客服，仲可以本地部署保障資料。', audience: ['中小企'], tags: ['中小企', '啱唔啱我'] },
  { id: 'd-3', zone: 'D', question: '企業團隊啱唔啱用？', answer: '啱。企業團隊可以跨部門共用數據庫、共用多個 AI（MCP、AI Agent），做客製化雲部署。', audience: ['企業團隊'], tags: ['企業團隊', '啱唔啱我'] },

  // E 區：點開始
  { id: 'e-1', zone: 'E', question: '要幾耐先上到線？', answer: '視乎方案複雜度，由 2 星期至 9 個月不等。簡單嘅舊腦翻新可以好快上線。', tags: ['開始', '時間'] },
  { id: 'e-2', zone: 'E', question: '要唔要識 IT／寫 code？', answer: '唔使。我哋手把手幫你設定，之後仲有培訓同技術轉移，你識用就得。', tags: ['開始', '培訓'] },
  { id: 'e-3', zone: 'E', question: '第一步係咩？', answer: '預約免費諮詢，講吓你嘅痛點同目標，我哋會建議啱你嘅方案組合。', tags: ['開始', '諮詢'] },
];

export function faqsByPainPoint(painPointId: number): Faq[] {
  return faqs.filter(f => f.painPointId === painPointId);
}
export function faqsBySolution(solutionId: number): Faq[] {
  return faqs.filter(f => f.solutionId === solutionId);
}
export function faqsByZone(zone: Faq['zone']): Faq[] {
  return faqs.filter(f => f.zone === zone);
}
export function faqsForAudience(audience: string): Faq[] {
  return faqs.filter(f => !f.audience || f.audience.includes(audience));
}
