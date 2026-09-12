import Link from 'next/link';
import { notFound } from 'next/navigation';
import { slugFor, solutionCatIcons, subFor } from '@/lib/solutions-data';
import { getSolutions, getFaqs } from '@/lib/data-access';
import { Breadcrumbs, PageCTA, PageSchema } from '@/components/page-blocks';
import { ConsultButton } from '@/components/site-shell';
import { pageMetadata } from '@/lib/metadata';
import FaqAccordion from '@/components/faq-accordion';

export async function generateStaticParams() {
  const all = await getSolutions();
  return all.map(s => ({ slug: slugFor(s) }));
}

function recommend(current: any, all: any[], limit = 5) {
  return all.filter(s => s.id !== current.id).map(s => {
    let score = 0;
    score += (current.tags || []).filter((t: string) => s.tags.includes(t)).length * 3;
    score += (current.options || []).filter((o: string) => s.options.includes(o)).length;
    if (s.cat === current.cat) score += 2;
    return { s, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map(x => x.s);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await getSolutions();
  const s = all.find(x => slugFor(x) === slug);
  if (!s) notFound();
  return pageMetadata(s.title, s.desc, `/catalog/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await getSolutions();
  const s = all.find(x => slugFor(x) === slug);
  if (!s) notFound();
  const related = recommend(s, all);
  const allFaqs = await getFaqs();
  const relatedFaqs = allFaqs.filter(f => f.solutionId === s.id);

  return <><PageSchema title={s.title} description={s.desc} path={`/catalog/${slug}`} faqs={[]} /><main id="main" className="catalog-detail-page">
    <section className="services-page-hero"><div className="container"><Breadcrumbs label="解決方案" /><div className="catalog-detail-head">
      <div><p className="section-label"><span />{solutionCatIcons[s.cat]} {s.cat} · {subFor(s)}</p><h1>{s.title}</h1><p className="catalog-sub">{s.sub}</p><p className="catalog-lead">{s.desc}</p><div className="hero-actions"><ConsultButton /></div></div>
    </div></div></section>

    <section className="section"><div className="container">
      <h2 className="catalog-section-h">方案內容</h2>
      <div className="catalog-content">{String(s.content || '').split('\n\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</div>
      {s.yt && String(s.yt).includes('youtube') && <div className="catalog-video"><iframe src={String(s.yt).replace('watch?v=', 'embed/')} title={s.title} allowFullScreen /></div>}
      <h2 className="catalog-section-h">涵蓋範圍</h2>
      <div className="catalog-tags">{(s.options || []).map((o: string) => <span key={o} className="tag-chip">✓ {o}</span>)}</div>
      <div className="catalog-tags">{(s.tags || []).map((t: string) => <span key={t} className="tag-chip">#{t}</span>)}</div>
    </div></section>

    {related.length > 0 && <section className="section"><div className="container">
      <h2 className="catalog-section-h">你可能感興趣</h2>
      <div className="catalog-grid">{related.map(r => <Link key={r.id} href={`/catalog/${slugFor(r)}`} className="catalog-card"><div className="catalog-card-body"><span className="mini-label">{solutionCatIcons[r.cat]} {r.cat} · {subFor(r)}</span><h3>{r.title}</h3><div className="catalog-tags">{r.tags.slice(0, 3).map((t: string) => <span key={t} className="tag-chip">#{t}</span>)}</div></div></Link>)}</div>
    </div></section>}

    <FaqAccordion items={relatedFaqs} title="相關常見問題" />

    <PageCTA title={['想將呢個方案落地？', '預約免費諮詢。']} text="告訴我們你的現況與目標，我們先了解問題，再判斷這個方案是否啱你，或建議更合適的組合。" checklist={['你的行業及團隊規模', '想用呢個方案解決咩', '現有工具與資料來源', '期望的結果與時間']} />
  </main></>;
}
