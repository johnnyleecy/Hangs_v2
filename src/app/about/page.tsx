import { FileCode2, Code2, Gauge, Zap, Megaphone, Building2, Network, Check } from 'lucide-react';
import { ConsultButton } from '@/components/site-shell';
import { Breadcrumbs, Eyebrow, PageCTA, PageHeading, PageProcess, PageSchema } from '@/components/page-blocks';
import { pageMetadata } from '@/lib/metadata';

const description = '實瀚科技 HANGS TECH LIMITED —— 您的企業顧問。以 UML 架構設計、全棧開發技術與跨行業經驗，為香港中小企及企業提供客製化網站與系統解決方案。';
export const metadata = pageMetadata('關於我們', description, '/about');

const whyUs = [
  { icon: FileCode2, title: 'UML 架構設計，確保項目可完全交付', text: '我們以 UML 作為開發工具，配合文件與架構圖，讓需求、設計與驗收在開發前先對齊，避免上線後才發現重大偏差。' },
  { icon: Code2, title: '全棧開發（Full Stack），將 AI＋系統＋網站融為一體', text: '彈性選擇 AI 模型、AI Agent、MCP、Workflow Automation，轉化你的工具，甚至「24×7 同事」。' },
  { icon: Gauge, title: '網頁速度，遠勝 WordPress', text: '相比 WordPress、Wix 等工具載入偏慢，我們的全棧架構平均首屏載入少於 800ms，流暢度更高，更能滿足現代用戶對速度與功能的期望。' },
  { icon: Zap, title: '流暢度高，技術前衛', text: '令 SEO、GEO 排名更勝傳統網站，系統零 Delay，效率以倍加乘。' },
  { icon: Megaphone, title: '跨行業營銷經驗', text: '具備跨行業經驗，能準確指出企業痛點並逐一應對，把技術真正用在業務上，而非為技術而技術。' },
  { icon: Building2, title: '中小企：有限資源做無限方案', text: '例如「舊腦翻新」——把舊電腦裝上 AI 環境作本地部署，提供資安保密環境，讓中小企以有限資源做到原本負擔不起的方案。' },
  { icon: Network, title: '大企業：跨部門 AI 與共用數據庫', text: '跨部門開發 AI，共用數據庫與 Multi-AI 能力（MCP、AI Agent），配合客製化雲部署，讓大型團隊在受控環境下協作。' },
];

const techStack = ['React.js + TypeScript', 'Next.js · Figma · Python', '平均首屏載入 < 800ms', 'UML 架構設計確稿'];

const industries = [
  '項目／統籌：Project Management System', '網店／電商：E-Commerce / Data Analytics', '服務業／公關：CRM', '預約管理：Booking System',
  '零售業：Point of Sales System', '供應商管理：Supply Chain Connect', '轉營企業：線上線下支援系統', '會計／律師行：Local Deploy LLM',
  '線上客服：Chatbot', '建造業／產品：自動生成 3D 圖模式', '廣告業／推廣：線上排名及關鍵字', '商業培訓：技術轉移',
];

export default function AboutPage() {
  return <><PageSchema title="關於我們" description={description} path="/about" faqs={[]} /><main id="main" className="about-page">
    <section className="services-page-hero"><div className="container"><Breadcrumbs label="關於我們" /><div className="services-intro-grid"><div><Eyebrow>HANGS TECH LIMITED</Eyebrow><h1>您貼身的企業顧問，<br /><span>度身訂造 AI 助手＋網站＋系統。</span></h1><p>專注幫助企業進入數碼化時代，提供客製化的網站及系統解決方案，<br />讓各行各業實現運作效益的提升、簡化工作流程。</p><div className="hero-actions"><ConsultButton /><a href="#why-us" className="button button-secondary">為何選擇我們</a></div></div><div className="services-network" aria-label="企業顧問與技術能力示意"><div className="network-orbit" /><div className="network-center"><Network size={30} strokeWidth={1.3} /><strong>企業顧問</strong><small>AI · FULL-STACK</small></div><span className="network-node node-ai"><FileCode2 size={20} />UML 架構</span><span className="network-node node-cloud"><Code2 size={20} />全棧開發</span><span className="network-node node-code"><Megaphone size={20} />跨行業</span><span className="network-node node-security"><Gauge size={20} />極速體驗</span></div></div><div className="services-intro-foot"><span>一個技術夥伴，串起從需求到維運的每一步。</span><span>AI · AUTOMATION · CLOUD · PLATFORMS</span></div></div></section>

    <section id="why-us" className="section"><div className="container"><PageHeading eyebrow="WHY US" title={['為何選擇我們？', '我們的承諾。']} intro="我們不只是寫程式，而是以企業顧問的身份，先理解你的痛點，再以合適的技術逐一應對。" /><div className="service-offerings">{whyUs.map((item, index) => <article className="offering-row" key={item.title}><div className="offering-identity"><span className="offering-number">0{index + 1}</span><span className="service-icon"><item.icon size={27} strokeWidth={1.4} /></span></div><div className="offering-description"><h3>{item.title}</h3><p>{item.text}</p></div><span className="offering-decoration" aria-hidden="true"><item.icon size={22} strokeWidth={1} /></span></article>)}</div></div></section>

    <section className="section"><div className="container"><PageHeading eyebrow="OUR BACKGROUND" title={['公司的背景，', '經得起驗證。']} intro="成立於 2023 年，團隊成員均有 15 年以上系統開發經驗，是一家專注「企業級數位化解決方案」的高科技服務商。" /><div className="delivery-grid"><div><Eyebrow>15+ YEARS EXPERIENCE</Eyebrow><h2>服務超過 200 家企業，<br />深知各行各業的痛點。</h2><p>我們了解企業正面臨數碼化轉型的壓力，也清楚每個行業真正的樽頸在哪裏。</p><ConsultButton className="text-link">了解我們的做法</ConsultButton></div><div className="delivery-checklist">{techStack.map(item => <article key={item}><Check size={22} strokeWidth={1.4} /><div><h3>{item}</h3></div><Check size={16} /></article>)}</div></div></div></section>

    <section className="section"><div className="container"><PageHeading eyebrow="INDUSTRY MATRIX" title={['行業解決方案矩陣，', '按行業逐一應對。']} intro="技術可以跨行業，方案必須貼近你的工作。以下為我們熟悉的行業場景。" /><div className="industry-grid">{industries.map(item => <div key={item} className="industry-item"><h3>{item.split('：')[0]}</h3><p>{item.split('：')[1]}</p></div>)}</div></div></section>

    <section className="section"><div className="container"><PageHeading eyebrow="FULL-STACK VS TEMPLATES" title={['全棧網頁架構，', '我們可以進一步提供的技術。']} intro="WordPress、Wix 因成本低、易上手而普及，卻存在載入偏慢、功能受限等缺點——例如無法對同時段預約作出限制，影響用戶體驗。" /><p className="section-description">隨著手機普及，用戶對速度與功能的要求愈來愈高。App 其實是網站的延伸，兩者共用同一數據庫，只在介面與排版上不同。全棧架構比模板工具更靈活、更高效，已有多家上市公司憑藉 App 成功運營而上市——這正是全棧架構的市場價值。</p></div></section>

    <section className="section"><div className="container"><PageHeading eyebrow="OUR PROCESS" title={['網頁及系統的開發流程，', '由需求到交付。']} intro="需時 2 星期至 9 個月，視乎公司／企業的需要以及資料完整度。" /><PageProcess steps={[{ title: '收集數據及流程', text: '分析企業提供的工作流程和數據，確定關鍵需求。', output: '需求確認' }, { title: '開發與製作', text: '根據收集到的資料進行數據化，模擬操作的可行性。', output: '原型與方案' }, { title: '核對與確認', text: '驗證初稿並加以改進，確保系統無誤。', output: '確認初稿' }, { title: '試用與評測', text: '進行內部測試，並多次改進以達至最佳效果。', output: '測試結果' }, { title: '確認無誤', text: '取代舊有系統並實施新方案，邁向可持續發展。', output: '正式上線' }, { title: '實行培訓', text: '提供流程簡介，提升員工使用系統的熟練度，進而提高生產力。', output: '培訓完成' }]} /></div></section>

    <PageCTA title={['想了解我們能怎樣幫你？', '歡迎預約免費諮詢。']} text="告訴我們你的行業、現有做法及最想改善的一步。我們先了解問題，再判斷值得投入的技術及交付範圍。" checklist={['你的行業及團隊規模', '目前最花時間的一項工作', '正在使用的工具或系統', '期望的結果與內部參與人員']} />
  </main></>;
}
