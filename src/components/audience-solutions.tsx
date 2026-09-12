import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getSolutions } from '@/lib/data-access';
import { slugFor, audiencesFor, solutionCatIcons, subFor } from '@/lib/solutions-data';

const audienceMap: Record<string, string> = { solo: '一人公司', sme: '中小企', enterprise: '企業團隊' };

export default async function AudienceSolutions({ slug }: { slug: string }) {
  const solutions = await getSolutions();
  const audience = audienceMap[slug];
  if (!audience) return null;
  const list = solutions.filter(s => audiencesFor(s).includes(audience)).slice(0, 9);
  if (!list.length) return null;
  return <section className="section"><div className="container">
    <div className="section-heading"><div><p className="section-label"><span />RELATED SOLUTIONS</p><h2>適合{audience}的方案</h2></div></div>
    <div className="catalog-grid">{list.map(s => <Link key={s.id} href={`/catalog/${slugFor(s)}`} className="catalog-card"><div className="catalog-card-body"><span className="mini-label">{solutionCatIcons[s.cat]} {s.cat} · {subFor(s)}</span><h3>{s.title}</h3><div className="catalog-tags">{s.tags.slice(0, 3).map(t => <span key={t} className="tag-chip">#{t}</span>)}</div></div></Link>)}</div>
    <div className="solution-back-home"><Link href="/catalog">查看全部 50 個方案<ArrowUpRight size={13} /></Link></div>
  </div></section>;
}
