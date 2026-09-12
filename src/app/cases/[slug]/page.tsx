import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { getCases, getSolutions } from '@/lib/data-access';
import { slugFor } from '@/lib/solutions-data';
import { Breadcrumbs, PageCTA, PageSchema } from '@/components/page-blocks';
import { ConsultButton } from '@/components/site-shell';
import { pageMetadata } from '@/lib/metadata';

export async function generateStaticParams() { const all = await getCases(); return all.map(c => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await getCases();
  const c = all.find(x => x.slug === slug);
  if (!c) notFound();
  return pageMetadata(c.title, c.summary, `/cases/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await getCases();
  const c = all.find(x => x.slug === slug);
  if (!c) notFound();
  const allSol = await getSolutions();
  const solution = allSol.find(s => s.id === c.solutionId);
  const related = all.filter(x => x.slug !== c.slug && x.tags.some((t: string) => c.tags.includes(t))).slice(0, 3);

  return <><PageSchema title={c.title} description={c.summary} path={`/cases/${c.slug}`} faqs={[]} /><main id="main" className="case-detail-page">
    <section className="services-page-hero"><div className="container"><Breadcrumbs label="真實案例" /><div className="catalog-detail-head">
      <div><p className="section-label"><span />{c.industry}</p><h1>{c.title}</h1><p className="catalog-lead">{c.summary}</p>
        <div className="hero-actions"><ConsultButton />{solution && <Link href={`/catalog/${slugFor(solution)}`} className="button button-secondary">對應方案：{c.solutionTitle}<ArrowUpRight size={15} /></Link>}</div>
      </div>
    </div></div></section>

    <section className="section"><div className="container">
      <h2 className="catalog-section-h">案例故事</h2>
      <div className="catalog-content">{c.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}</div>
      <div className="catalog-tags">{c.tags.map(t => <Link key={t} href={`/cases?tag=${encodeURIComponent(t)}`} className="tag-chip">#{t}</Link>)}</div>
      <p className="catalog-result"><strong>成效</strong>：{c.result}</p>
    </div></section>

    {related.length > 0 && <section className="section"><div className="container">
      <h2 className="catalog-section-h">你可能感興趣</h2>
      <div className="catalog-grid">{related.map(r => <Link key={r.slug} href={`/cases/${r.slug}`} className="catalog-card"><div className="catalog-card-body"><span className="mini-label">{r.industry}</span><h3>{r.title}</h3><p className="catalog-desc">{r.summary}</p></div></Link>)}</div>
    </div></section>}

    <PageCTA title={['想複製呢個案例？', '預約免費諮詢。']} text="告訴我們你的行業與現況，我們先了解問題，再判斷呢個做法係咪啱你，或建議更合適的組合。" checklist={['你的行業及團隊規模', '想解決的類似痛點', '現有工具與資料來源', '期望的結果']} />
  </main></>;
}
