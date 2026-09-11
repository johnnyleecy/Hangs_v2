import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { ServiceCategory } from '@/lib/service-catalog';
import { categories } from '@/lib/service-catalog';
import { ConsultButton } from './site-shell';
import { categoryIcons } from './catalog-icons';
import { PageHeading, PageFAQ, PageCTA, PageSchema, PageProcess } from './page-blocks';

const categoryFaqs = [
  { question: '這個分類下的服務可以混合選用嗎？', answer: '可以。分類是為了方便你瀏覽，實際方案常結合多項能力。我們會先了解你的工作流程，再建議真正需要的組合，而非硬套單一服務。' },
  { question: '如何決定先從哪一項服務開始？', answer: '從最花時間、規則最清晰、有負責人的工作開始，成效較易衡量。免費諮詢可以協助你判斷優先順序。' },
  { question: '收費是否包括第三方平台及長期維護？', answer: '報價會列明開發、配置、培訓、雲端、模型用量及第三方訂閱的包含範圍。長期維護與支援通常按需求另行約定。' },
];

export default function CategoryPage({ category }: { category: ServiceCategory }) {
  const Icon = categoryIcons[category.icon];
  const otherCategories = categories.filter(item => item.slug !== category.slug);
  return <><PageSchema title={`${category.title}｜服務介紹`} description={category.description} path={`/services/${category.slug}`} faqs={categoryFaqs} breadcrumb={[{ name: '首頁', path: '/' }, { name: '服務介紹', path: '/services' }, { name: category.title }]} /><main id="main" className="category-page">
    <section className="catalog-hero"><div className="container"><nav className="breadcrumbs" aria-label="麵包屑導覽"><Link href="/">首頁</Link><span aria-hidden="true">/</span><Link href="/services">服務介紹</Link><span aria-hidden="true">/</span><span aria-current="page">{category.title}</span></nav><div className="catalog-hero-grid"><div><p className="hero-announcement"><span className="online-dot" />{category.english}</p><h1><span className="catalog-hero-icon"><Icon size={30} strokeWidth={1.4} /></span>{category.title}</h1><p className="catalog-lead">{category.intro}</p><div className="hero-actions"><ConsultButton /><a href="#service-list" className="button button-secondary">查看服務項目<ArrowDown size={16} /></a></div></div><div className="catalog-hero-aside" aria-label="此分類的服務項目概覽"><span className="aside-label">IN THIS CATEGORY</span><ul>{category.services.map((service, index) => <li key={service.slug}><span>0{index + 1}</span><Link href={`/services/${category.slug}/${service.slug}`}>{service.title}<ArrowUpRight size={14} /></Link></li>)}</ul></div></div></div></section>
    <section id="service-list" className="section"><div className="container"><PageHeading eyebrow="WHAT WE CAN DELIVER" title={['這類服務，包含以下項目。', '點選了解實際做法與導入流程。']} intro="每一項服務都能獨立進行，也可互相搭配。詳情頁會說明它能解決甚麼、包含甚麼及如何導入。" /><div className="catalog-grid">{category.services.map((service, index) => <Link className="catalog-card" key={service.slug} href={`/services/${category.slug}/${service.slug}`}><span className="catalog-card-number">0{index + 1}</span><div className="catalog-card-body"><span className="mini-label">{service.english}</span><h3>{service.title}</h3><p>{service.intro}</p></div><div className="catalog-card-foot"><span>{service.tagline}</span><span className="round-arrow"><ArrowUpRight size={18} /></span></div></Link>)}</div></div></section>
    <section className="section approach-section"><div className="container"><PageHeading eyebrow="HOW WE THINK ABOUT THIS" title={['先把方法說清楚，', '再談怎麼做。']} intro="同一個分類，做法也要貼合你的實際情況。這是我們進入合作前會先確認的事。" /><div className="catalog-approach">{category.approach.map((item, index) => <article key={item}><span className="approach-number">0{index + 1}</span><div><h3>{item.split('：')[0]}</h3><p>{item.split('：')[1]}</p></div></article>)}</div></div></section>
    <section className="section"><div className="container"><PageHeading eyebrow="A PRACTICAL WAY FORWARD" title={['怎麼開始？', '由了解需求到持續支援。']} intro="以下是這類服務一般的導入步驟，實際節奏會按你的項目範圍調整。" /><PageProcess steps={[{ title: '需求梳理', text: '了解工作流程、資料來源與想改善的結果。', output: '問題與初步範圍' }, { title: '方案與報價', text: '釐清範圍、介面、限制及驗收標準。', output: '方案建議與費用' }, { title: '實作與驗證', text: '分階段開發或試點，以真實資料驗證。', output: '可驗證的成果' }, { title: '交接與支援', text: '完成文件、教學及後續支援安排。', output: '正式交付與承接' }]} /></div></section>
    <PageFAQ items={categoryFaqs} /><PageCTA title={['需要這一類服務？', '先聊你想改善的工作。']} text={category.description + ' 告訴我們你的現況，我們一起判斷哪些服務真正用得上。'} checklist={category.checklist} /><div className="container related-solutions"><span>其他服務分類</span><div>{otherCategories.map(item => <Link key={item.slug} href={`/services/${item.slug}`}><span><strong>{item.title}</strong><small>{item.description}</small></span><ArrowUpRight size={17} /></Link>)}</div></div><div className="solution-back-home"><Link href="/services">回到服務介紹<ArrowUpRight size={13} /></Link></div>
  </main></>;
}
