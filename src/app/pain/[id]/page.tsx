import { getPainPoints, getSolutions, getCourses } from '@/lib/data-access';
import { notFound } from 'next/navigation';

export default async function PainPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [painPoints, solutions, courses] = await Promise.all([
    getPainPoints(), getSolutions(), getCourses(),
  ]);
  const pain = painPoints.find((p: any) => String(p.id) === String(id));
  if (!pain) notFound();

  const related = painPoints.filter((p: any) => p.cat === pain.cat && String(p.id) !== String(id));
  const idx = painPoints.findIndex((p: any) => String(p.id) === String(id));
  const next = idx >= 0 ? painPoints[idx + 1] : undefined;

  const solutionTitle = (sid: number) => solutions.find((s: any) => Number(s.id) === Number(sid))?.title;
  const courseTitle = (cid: number) => courses.find((c: any) => Number(c.id) === Number(cid))?.title;

  const ratings = (pain.ratings ?? []).filter((r: any) => r.visible !== false && (r.desc || r.level));

  return (
    <main className="pain">
      <div className="pain-layout">
        <article className="pain-main">
          <span className="pain-cat">{pain.cat}</span>
          <h1>{pain.title}</h1>
          {pain.audience?.length > 0 && <div className="pain-aud">服務對象：{pain.audience.join('、')}</div>}
          {pain.body && <div className="pain-body">{pain.body}</div>}

          {ratings.length > 0 && (
            <div className="pain-ratings">
              <div className="pain-ratings-title">呢個痛，有三種解法：</div>
              {ratings.map((r: any, i: number) => (
                <div key={i} className={`pain-tier${r.solutionId ? ' hot' : ''}`}>
                  <div className="pain-stars">
                    <span className="on">{'★'.repeat(r.stars)}</span>
                    <span className="off">{'☆'.repeat(5 - r.stars)}</span>
                  </div>
                  <div className="pain-tier-body">
                    <div className="pain-tier-level">{r.level}</div>
                    {r.desc && <div className="pain-tier-desc">{r.desc}</div>}
                    {r.solutionId && <a className="pain-ref" href={`/catalog/s-${r.solutionId}`}>→ 網2 方案：{solutionTitle(r.solutionId) || `#${r.solutionId}`}</a>}
                    {r.courseId && <a className="pain-ref course" href={`/courses/${r.courseId}`}>→ 網3 課程：{courseTitle(r.courseId) || `#${r.courseId}`}</a>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {pain.ctaText && <p className="pain-cta">{pain.ctaText}</p>}
          {next && <a className="pain-next" href={`/pain/${next.id}`}>下一篇：{next.title} →</a>}
        </article>

        <aside className="pain-side">
          <h3>你可能感興趣</h3>
          {related.length > 0 ? (
            related.map((r: any) => (
              <a key={r.id} className="pain-side-item" href={`/pain/${r.id}`}>{r.title}</a>
            ))
          ) : (
            <p className="pain-side-empty">暫無相關文章</p>
          )}
        </aside>
      </div>
    </main>
  );
}
