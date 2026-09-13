export type Course = {
  id: number;
  title: string;
  desc: string;
  content: string;
  tool: string[];
  role: string[];
  audience: string[];
  painPointIds: number[];
  solutionIds: number[];
  tags: string[];
  nitpp: boolean;
  vtc: boolean;
  yt: string;
  duration: string;
  price: string;
};

export const courseTools = ['AI', 'Agent', 'Python', 'MCP'];
export const courseRoles = ['行政', '會計', '秘書', '法律顧問', '推廣'];

export const courses: Course[] = [
  {
    id: 1,
    title: 'AI 秘書實戰班',
    desc: '把舊電腦翻新成專責會議紀錄、文件草擬的 AI 秘書。',
    content: '手把手教你用舊電腦建立 AI 秘書，處理會議紀錄、電郵草擬、文件整理。涵蓋 Prompt 工程與本地部署，資料留喺本機。',
    tool: ['AI', 'Agent'],
    role: ['秘書', '行政'],
    audience: ['一人公司', '中小企'],
    painPointIds: [1, 4, 5],
    solutionIds: [22, 21],
    tags: ['秘書', '會議', '文書'],
    nitpp: true,
    vtc: true,
    yt: '',
    duration: '4 小時',
    price: '面議',
  },
  {
    id: 2,
    title: 'Python 行政自動化入門',
    desc: '用 Python 自動處理重複的行政流程，釋放人手。',
    content: '從零開始學 Python，針對行政重複工作（資料輸入、表單填寫、報表彙整）做自動化。手把手跟住揼，唔使寫 code 底。',
    tool: ['Python'],
    role: ['行政', '會計'],
    audience: ['中小企', '企業團隊'],
    painPointIds: [7, 10, 22],
    solutionIds: [11, 14],
    tags: ['Python', '自動化', '行政'],
    nitpp: true,
    vtc: false,
    yt: '',
    duration: '8 小時',
    price: '面議',
  },
  {
    id: 3,
    title: 'MCP 企業 Agent 實作',
    desc: '把 AI Agent 接上企業工具，建立跨部門 AI 同事。',
    content: '進階課程，教你用 MCP 將 AI Agent 接上內部系統與數據庫，建立可共用、可量化的 AI 同事。適合企業團隊。',
    tool: ['MCP', 'Agent'],
    role: ['行政', '會計', '秘書', '法律顧問', '推廣'],
    audience: ['企業團隊'],
    painPointIds: [19, 22, 29],
    solutionIds: [1, 15],
    tags: ['MCP', 'Agent', '企業'],
    nitpp: true,
    vtc: true,
    yt: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '12 小時',
    price: '面議',
  },
];
