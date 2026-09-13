'use client';

import { useState, useEffect } from 'react';

const nameOf = (item: any) => item.title || item.name || item.question || item.slug || `#${item.id}`;

export default function OverviewTab() {
  const [data, setData] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      const keys = ['painPoints', 'solutions', 'cases', 'courses', 'faqs', 'tags'] as const;
      const res = await Promise.all(keys.map(k => fetch(`/api/${k}`).then(r => (r.ok ? r.json() : []))));
      if (!alive) return;
      const out: any = {};
      keys.forEach((k, i) => { out[k] = res[i]; });
      setData(out);
    })();
    return () => { alive = false; };
  }, [refreshKey]);

  if (!data) return <p className="ov-loading">載入中…</p>;

  const { painPoints, solutions, cases, courses, faqs, tags } = data;

  const counts = [
    { label: '痛症（網1）', n: painPoints.length },
    { label: '解決方案（網2）', n: solutions.length },
    { label: '案例（網2）', n: cases.length },
    { label: '課程（網3）', n: courses.length },
    { label: 'FAQ', n: faqs.length },
    { label: 'Tag', n: tags.length },
  ];

  const painToSolutions = (pid: any) => {
    const sids = new Set<number>();
    faqs.forEach((f: any) => { if (String(f.painPointId) === String(pid) && f.solutionId) sids.add(Number(f.solutionId)); });
    return solutions.filter((s: any) => sids.has(Number(s.id)));
  };
  const painToCourses = (pid: any) => courses.filter((c: any) => (c.painPointIds ?? []).map(String).includes(String(pid)));

  const linkedPains = painPoints.filter((p: any) => painToSolutions(p.id).length || painToCourses(p.id).length);

  return (
    <div className="overview">
      <div className="ov-bar">
        <button className="button" onClick={() => setRefreshKey(k => k + 1)}>🔄 重新整理</button>
      </div>

      <div className="ov-cards">
        {counts.map(c => (
          <div key={c.label} className="ov-card">
            <span className="ov-card-n">{c.n}</span>
            <span className="ov-card-label">{c.label}</span>
          </div>
        ))}
      </div>

      <h3 className="ov-h">三網資料分佈</h3>
      <div className="ov-net">
        <div className="ov-col">
          <div className="ov-col-head">網1 痛症（入口）</div>
          <ul className="ov-col-list">{painPoints.map((p: any) => <li key={p.id}>{nameOf(p)}</li>)}</ul>
        </div>
        <div className="ov-col">
          <div className="ov-col-head">網2 方案／案例（外判）</div>
          <ul className="ov-col-list">
            {solutions.map((s: any) => <li key={s.id}>{nameOf(s)}</li>)}
            {cases.map((c: any) => <li key={c.slug} className="ov-case">📌 {nameOf(c)}</li>)}
          </ul>
        </div>
        <div className="ov-col">
          <div className="ov-col-head">網3 課程（培訓）</div>
          <ul className="ov-col-list">{courses.map((c: any) => <li key={c.id}>{nameOf(c)}</li>)}</ul>
        </div>
      </div>

      <h3 className="ov-h">導流關聯鏈（痛症 → 外判／培訓）</h3>
      <div className="ov-links">
        {linkedPains.map((p: any) => {
          const sols = painToSolutions(p.id);
          const cours = painToCourses(p.id);
          return (
            <div key={p.id} className="ov-link">
              <div className="ov-link-pain">痛症：{nameOf(p)}</div>
              {sols.length > 0 && <div className="ov-link-line">→ 外判（網2）：{sols.map((s: any) => nameOf(s)).join('、')}</div>}
              {cours.length > 0 && <div className="ov-link-line">→ 培訓（網3）：{cours.map((c: any) => nameOf(c)).join('、')}</div>}
            </div>
          );
        })}
        {linkedPains.length === 0 && <p className="ov-empty">未有痛症關聯資料。撳「⬇ Seed 資料」先導入。</p>}
      </div>
    </div>
  );
}
