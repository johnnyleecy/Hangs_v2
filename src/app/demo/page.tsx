import { getPainPoints, getSolutions, getCases, getCourses, getFaqs } from '@/lib/data-access';

const nameOf = (item: any) => item.title || item.name || item.question || item.slug || `#${item.id}`;

export default async function DemoPage() {
  const [painPoints, solutions, cases, courses, faqs] = await Promise.all([
    getPainPoints(), getSolutions(), getCases(), getCourses(), getFaqs(),
  ]);

  // 導流例子：第一個同時有方案（via FAQ）＋課程嘅痛症
  const example = painPoints.find((p: any) => {
    const hasSol = faqs.some((f: any) => String(f.painPointId) === String(p.id) && f.solutionId);
    const hasCourse = courses.some((c: any) => (c.painPointIds ?? []).map(String).includes(String(p.id)));
    return hasSol && hasCourse;
  }) ?? painPoints[0];

  let exampleSolutions: any[] = [];
  let exampleCases: any[] = [];
  let exampleCourses: any[] = [];
  if (example) {
    const sids = [...new Set(faqs
      .filter((f: any) => String(f.painPointId) === String(example.id) && f.solutionId)
      .map((f: any) => Number(f.solutionId)))];
    exampleSolutions = solutions.filter((s: any) => sids.includes(Number(s.id)));
    exampleCases = cases.filter((c: any) => sids.includes(Number(c.solutionId)));
    exampleCourses = courses.filter((c: any) => (c.painPointIds ?? []).map(String).includes(String(example.id)));
  }

  return (
    <main className="demo">
      <header className="demo-hero">
        <h1>三網資料示範</h1>
        <p>同一批資料，三個網，唔同呈現 —— 網1 講痛、網2 講解決、網3 講學</p>
        <span className="demo-tag">共用資料庫 · 痛點／方案／案例／課程／FAQ／Tag 三網同步</span>
      </header>

      {example && (
        <section className="demo-section">
          <h2>① 一個痛症，三個網嘅呈現</h2>
          <div className="demo-flow">
            <div className="demo-node node-1">
              <span className="demo-node-tag">網1 · Aaron 世界</span>
              <div className="demo-node-title">{nameOf(example)}</div>
              <div className="demo-node-sub">只講痛 · 零術語 · 不賣方案 · 無 CTA</div>
            </div>
            <div className="demo-arrow">外判 ↘</div>
            <div className="demo-node node-2">
              <span className="demo-node-tag">網2 · HANGS 實瀚科技</span>
              <div className="demo-node-title">方案：{exampleSolutions.map(nameOf).join('、') || '—'}</div>
              <div className="demo-node-sub">案例：{exampleCases.map(nameOf).join('、') || '—'}</div>
            </div>
            <div className="demo-arrow">培訓 ↘</div>
            <div className="demo-node node-3">
              <span className="demo-node-tag">網3 · ITE 宏業創科教育</span>
              <div className="demo-node-title">課程：{exampleCourses.map(nameOf).join('、') || '—'}</div>
              <div className="demo-node-sub">學識自己做 · NITTP／VTC 資助</div>
            </div>
          </div>
        </section>
      )}

      <section className="demo-section">
        <h2>② 三網完整資料分佈</h2>
        <div className="demo-cols">
          <div className="demo-col">
            <div className="demo-col-head">網1 痛症（入口）<span>{painPoints.length}</span></div>
            <ul className="demo-col-list">
              {painPoints.map((p: any) => <li key={p.id}>{nameOf(p)}</li>)}
            </ul>
          </div>
          <div className="demo-col">
            <div className="demo-col-head">網2 方案／案例（外判）<span>{solutions.length + cases.length}</span></div>
            <ul className="demo-col-list">
              {solutions.map((s: any) => <li key={s.id}>{nameOf(s)}</li>)}
              {cases.map((c: any) => <li key={c.slug} className="case">📌 {nameOf(c)}</li>)}
            </ul>
          </div>
          <div className="demo-col">
            <div className="demo-col-head">網3 課程（培訓）<span>{courses.length}</span></div>
            <ul className="demo-col-list">
              {courses.map((c: any) => <li key={c.id}>{nameOf(c)}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <footer className="demo-foot">
        資料來源：後台 <code>/admin</code> 共用 db.json · 三網讀同一份資料，任何一網更新即時同步
      </footer>
    </main>
  );
}
