import Link from 'next/link';
import { Briefcase, ArrowUpRight } from 'lucide-react';
import { getCases } from '@/lib/data-access';
import CaseDiagram from '@/components/case-diagram';
import { Breadcrumbs, PageCTA, PageHeading, PageSchema } from '@/components/page-blocks';
import { ConsultButton } from '@/components/site-shell';
import { pageMetadata } from '@/lib/metadata';

const description = '實瀚科技的真實案例。從一人公司到企業團隊，看看我們如何以 AI、自動化與客製系統，逐一應對各行各業的痛點。每個案例都可點入睇詳情。';
export const metadata = pageMetadata('真實案例', description, '/cases');

export default async function CasesPage() {
  const cases = await getCases();
  return <><PageSchema title="真實案例" description={description} path="/cases" faqs={[]} /><main id="main" className="cases-page">
    <section className="services-page-hero"><div className="container"><Breadcrumbs label="真實案例" /><div className="services-intro-grid"><div><p className="section-label"><span />REAL CASES</p><h1>真實案例，<br /><span>痛點逐一應對。</span></h1><p>技術可以跨行業，方案必須貼近你的工作。<br />每個案例都是一個 Post，點入去睇詳情。</p><div className="hero-actions"><ConsultButton /><a href="#cases" className="button button-secondary">睇案例</a></div></div><div className="services-network" aria-label="跨行業案例示意"><div className="network-orbit" /><div className="network-center"><Briefcase size={30} strokeWidth={1.3} /><strong>跨行業</strong><small>ACROSS INDUSTRIES</small></div></div></div></div></section>

    <section id="cases" className="section"><div className="container"><PageHeading eyebrow="WHAT WE DELIVERED" title={['每個案例，', '都從一個痛點開始。']} intro="案例經去識別化處理，只保留行業、做法與成效。點入去睇完整故事。" />
      <div className="catalog-grid">{cases.map(c => <Link key={c.slug} href={`/cases/${c.slug}`} className="catalog-card">
        <CaseDiagram slug={c.slug} />
        <div className="catalog-card-body">
          <span className="mini-label">{c.industry}</span>
          <h3>{c.title}</h3>
          <p className="catalog-desc">{c.summary}</p>
          <div className="catalog-tags">{c.tags.map(t => <span key={t} className="tag-chip">#{t}</span>)}</div>
          <div className="catalog-card-foot"><span>{c.result}</span><span className="round-arrow"><ArrowUpRight size={18} /></span></div>
        </div>
      </Link>)}</div>
    </div></section>

    <PageCTA title={['你的行業痛點，', '值得一套貼身的方案。']} text="告訴我們你的行業、現有做法及最想改善的一步。我們先了解問題，再判斷適合的技術與交付方式。" checklist={['你的行業及相關部門規模', '目前最花時間的一項工作', '正在使用的工具或系統', '期望的結果及內部參與人員']} />
  </main></>;
}
