import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Plus, ShieldCheck, MessageSquareText } from 'lucide-react';
import { ConsultButton } from './site-shell';
import { company, siteUrl } from '@/lib/site';
import type { FAQ } from '@/lib/solutions';

export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="section-label"><span />{children}</p>; }
export function PageHeading({ eyebrow, title, intro }: { eyebrow: string; title: [string, string]; intro: string }) {
  return <div className="section-heading solution-section-heading"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title[0]}<br />{title[1]}</h2></div><p className="section-description">{intro}</p></div>;
}
export function Breadcrumbs({ label, solution = false }: { label: string; solution?: boolean }) {
  return <nav className="breadcrumbs" aria-label="麵包屑導覽"><Link href="/">首頁</Link><span aria-hidden="true">/</span>{solution && <><span>服務對象</span><span aria-hidden="true">/</span></>}<span aria-current="page">{label}</span></nav>;
}
export function PageSchema({ title, description, path, faqs, breadcrumb }: { title: string; description: string; path: string; faqs: readonly FAQ[]; breadcrumb?: { name: string; path?: string }[] }) {
  const url = siteUrl ? `${siteUrl}${path}` : undefined;
  const providerId = siteUrl ? `${siteUrl}/#organization` : '/#organization';
  const crumbs = breadcrumb ?? [{ name: '首頁', path: '/' }, { name: title }];
  const graph = [
    { '@type': 'Organization', '@id': providerId, name: company.name, alternateName: company.englishName, foundingDate: '2023', ...(siteUrl ? { url: siteUrl, logo: `${siteUrl}/icon.svg` } : {}) },
    { '@type': 'WebPage', name: title, description, inLanguage: 'zh-Hant', ...(url ? { url } : {}), publisher: { '@id': providerId } },
    { '@type': 'Service', name: title, description, areaServed: 'Hong Kong', provider: { '@id': providerId }, ...(url ? { url } : {}) },
    { '@type': 'BreadcrumbList', itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, ...(crumb.path && siteUrl ? { item: `${siteUrl}${crumb.path}` } : {}) })) },
    { '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }} />;
}
export function PageFAQ({ items }: { items: readonly FAQ[] }) {
  return <section id="faq" className="section faq-section"><div className="container faq-grid"><div className="faq-heading"><Eyebrow>A LITTLE MORE CLARITY</Eyebrow><h2>開始之前，<br />你可能想知道。</h2><p>先說清楚範圍、責任與限制，<br />合作才更容易落地。</p><ConsultButton className="text-link">討論你的問題</ConsultButton><div className="faq-art" aria-hidden="true"><MessageSquareText size={47} strokeWidth={1} /><span>?</span><i /></div></div><div className="faq-list">{items.map((faq, index) => <details className="faq-item" key={faq.question}><summary><span className="faq-number">0{index + 1}</span><h3>{faq.question}</h3><Plus size={18} className="faq-plus" /></summary><div className="faq-answer"><p>{faq.answer}</p></div></details>)}</div></div></section>;
}
export function PageCTA({ title, text, checklist }: { title: [string, string]; text: string; checklist: string[] }) {
  return <section id="contact" className="cta-section solution-contact"><div className="container"><div className="cta-panel solution-cta"><div className="cta-copy"><Eyebrow>ONE CONVERSATION. A CLEARER NEXT STEP.</Eyebrow><h2>{title[0]}<br />{title[1]}</h2><p>{text}</p><ConsultButton className="button button-navy" /><span className="cta-note">初步諮詢免費；開發、試點及培訓另行評估報價。</span></div><aside className="contact-preparation"><span className="prep-icon"><MessageSquareText size={22} strokeWidth={1.4} /></span><h3>初步聯絡，可以先告訴我們</h3><ol>{checklist.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol><p><ShieldCheck size={14} />請勿附上個人資料、帳戶密碼或機密文件。</p></aside></div></div></section>;
}
export function PageProcess({ steps }: { steps: { title: string; text: string; output?: string }[] }) {
  return <ol className="process-grid solution-process">{steps.map((step, index) => <li className="process-step" key={step.title}><div className="process-top"><span className="process-number">0{index + 1}</span><span className="process-line" /><ArrowRight size={15} /></div><span className="mini-label">STEP 0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p>{step.output && <span className="process-deliver"><Check size={13} />{step.output}</span>}</li>)}</ol>;
}
export function RelatedSolutions({ current }: { current?: string }) {
  const links = [{ slug: 'solo', label: '一人公司', text: '讓 AI 成為你的日常助手' }, { slug: 'sme', label: '中小企業', text: '接通流程，培養團隊能力' }, { slug: 'enterprise', label: '企業團隊', text: '把治理與擴展一起規劃' }];
  return <div className="container related-solutions"><span>另一個起點，也可能適合你。</span><div>{links.filter(item => item.slug !== current).map(item => <Link key={item.slug} href={`/solutions/${item.slug}`}><span><strong>{item.label}</strong><small>{item.text}</small></span><ArrowUpRight size={17} /></Link>)}{current && <Link href="/services"><span><strong>解決方案</strong><small>從技術到交付，一次了解</small></span><ArrowUpRight size={17} /></Link>}</div></div>;
}
