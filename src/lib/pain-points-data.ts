export type PainPoint = {
  id: number;
  title: string;
  cat: string;
  audience: string[];
};

export const painPoints: PainPoint[] = [
  { id: 1, title: '開完會，咩都唔記得，下星期又傾返同一件事', cat: '文書', audience: ['一人公司', '中小企', '企業團隊'] },
  { id: 2, title: '通告出咗，同事都唔知要做咩', cat: '文書', audience: ['中小企', '企業團隊'] },
  { id: 3, title: '簽約要等律師成個星期', cat: '法律', audience: ['一人公司', '中小企'] },
  { id: 4, title: '報告寫咗三日，老闆話冇重點', cat: '文書', audience: ['一人公司', '中小企', '企業團隊'] },
  { id: 5, title: '寫封正經信，坐成個鐘都落唔到筆', cat: '文書', audience: ['一人公司', '中小企'] },
  { id: 6, title: '同一個客喺名單出現三次', cat: '數據', audience: ['一人公司', '中小企'] },
  { id: 7, title: '每個月頭砌報表砌到遲交', cat: '數據', audience: ['一人公司', '中小企'] },
  { id: 8, title: '做咗個圖，老闆睇唔明', cat: '數據', audience: ['中小企', '企業團隊'] },
  { id: 9, title: '使爆預算，月底先知', cat: '數據', audience: ['一人公司', '中小企'] },
  { id: 10, title: '對數對唔平，搵到半夜', cat: '數據', audience: ['一人公司', '中小企'] },
  { id: 11, title: '要 pitch 客，簡報唔知點鋪', cat: '簡報', audience: ['一人公司', '中小企'] },
  { id: 12, title: '簡報成版字，冇人想睇', cat: '簡報', audience: ['中小企', '企業團隊'] },
  { id: 13, title: '上台講到一半斷咗', cat: '簡報', audience: ['中小企', '企業團隊'] },
  { id: 14, title: '寫十頁提案，客冇時間睇', cat: '簡報', audience: ['一人公司', '中小企'] },
  { id: 15, title: '貼咗數據出去先知係假', cat: '查證', audience: ['中小企', '企業團隊'] },
  { id: 16, title: '記者問兩句，搵資料搵成個鐘', cat: '查證', audience: ['中小企', '企業團隊'] },
  { id: 17, title: 'quote 咗個 blogger，原來錯', cat: '查證', audience: ['中小企', '企業團隊'] },
  { id: 18, title: '揀系統揀成個月都揀唔落', cat: '查證', audience: ['中小企', '企業團隊'] },
  { id: 19, title: '日程撞到七彩，仲要人肉排', cat: '行政', audience: ['一人公司', '中小企', '企業團隊'] },
  { id: 20, title: 'email 改十次，send 出去仲嬲到人', cat: '行政', audience: ['一人公司', '中小企'] },
  { id: 21, title: '搵一份合同搵咗半日', cat: '行政', audience: ['一人公司', '中小企'] },
  { id: 22, title: '老闆問一句，要煲成晚先答到', cat: '行政', audience: ['中小企', '企業團隊'] },
  { id: 23, title: '同一份內容，要砌十個版本', cat: '轉換', audience: ['中小企', '企業團隊'] },
  { id: 24, title: '對客同對同事語氣唔同，好易出事', cat: '轉換', audience: ['一人公司', '中小企'] },
  { id: 25, title: '想 post 嘢，坐成日出唔到一篇', cat: '行銷', audience: ['一人公司'] },
  { id: 26, title: '有新聞要出，唔識寫新聞稿', cat: '行銷', audience: ['中小企', '企業團隊'] },
  { id: 27, title: 'send email 出去，冇人覆', cat: '行銷', audience: ['一人公司', '中小企'] },
  { id: 28, title: '搞 annual dinner 搞到頭大', cat: '專案', audience: ['中小企', '企業團隊'] },
  { id: 29, title: 'project 成日延遲，唔知邊度出事', cat: '專案', audience: ['中小企', '企業團隊'] },
  { id: 30, title: '活動前一晚先發現漏十樣嘢', cat: '專案', audience: ['中小企', '企業團隊'] },
];

export const painCategories = ['文書', '數據', '簡報', '查證', '行政', '轉換', '行銷', '專案', '法律'];
