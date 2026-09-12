'use client';

import { useEffect, useState } from 'react';
import { Check, ArrowUpRight, X } from 'lucide-react';
import { solutions as seedSolutions, solutionCategories, solutionCatIcons, subFor, slugFor } from '@/lib/solutions-data';
import { cases as seedCases } from '@/lib/cases-data';
import { useConsultation } from './site-shell';

type Solution = (typeof seedSolutions)[number];
type CasePost = (typeof seedCases)[number];

export default function SolutionPicker() {
  const { openConsult } = useConsultation();
  const [cat, setCat] = useState('');
  const [sub, setSub] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [previewId, setPreviewId] = useState<number | null>(null);
  const [data, setData] = useState<Solution[]>(seedSolutions);
  const [caseData, setCaseData] = useState<CasePost[]>(seedCases);

  useEffect(() => {
    fetch('/api/solutions').then(r => r.json()).then(d => { if (Array.isArray(d) && d.length) setData(d); }).catch(() => {});
    fetch('/api/cases').then(r => r.json()).then(d => { if (Array.isArray(d) && d.length) setCaseData(d); }).catch(() => {});
  }, []);

  const subList = cat ? [...new Set(data.filter(s => s.cat === cat).map(s => subFor(s)))] : [];
  const list = cat ? (sub ? data.filter(s => s.cat === cat && subFor(s) === sub) : data.filter(s => s.cat === cat)) : data;
  const selectedList = data.filter(s => selected.has(s.id));
  const preview = previewId != null ? data.find(s => s.id === previewId) : null;
  const relatedCases = preview ? caseData.filter(c => c.tags?.some(t => preview.tags?.includes(t))).slice(0, 3) : [];
  const relatedSolutions = preview ? data.filter(x => x.id !== preview.id && (x.cat === preview.cat || x.tags.some(t => preview.tags.includes(t)))).slice(0, 3) : [];

  const toggle = (id: number) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return <div className="picker">
    <div className="drill-cats">
      <button className={`drill-cat ${cat === '' ? 'on' : ''}`} onMouseEnter={() => { setCat(''); setSub(''); }}><span className="drill-cat-ic">🗂</span><span>全部</span></button>
      {solutionCategories.map(c => <button key={c} className={`drill-cat ${cat === c ? 'on' : ''}`} onMouseEnter={() => { setCat(c); setSub(''); }}><span className="drill-cat-ic">{solutionCatIcons[c]}</span><span>{c}</span></button>)}
    </div>

    <div className="drill-panel">
      {cat && <div className="picker-row"><button className={`filter-chip ${sub === '' ? 'on' : ''}`} onMouseEnter={() => setSub('')}>全部</button>{subList.map(sb => <button key={sb} className={`filter-chip ${sub === sb ? 'on' : ''}`} onMouseEnter={() => setSub(sb)}>{sb}</button>)}</div>}

      <div className="block-grid">
        {list.map(s => { const on = selected.has(s.id); return (
          <div key={s.id} className="sol-item">
            <button type="button" className={`block-chip ${on ? 'on' : ''}`} onClick={() => toggle(s.id)} aria-pressed={on}>
              <span className="block-chip-head">{subFor(s)}</span>
              <span className="block-chip-title">{s.title}</span>
              {on && <Check className="block-chip-check" size={16} />}
            </button>
            <button type="button" className="sol-info" aria-label="睇詳情" onClick={() => setPreviewId(s.id)}><ArrowUpRight size={14} /></button>
          </div>
        ); })}
      </div>
    </div>

    {preview && <div className="drilldown-overlay" onClick={() => setPreviewId(null)}>
      <div className="drilldown-modal" onClick={e => e.stopPropagation()}>
        <div className="drilldown-head"><span>{preview.title}</span><button className="icon-button" aria-label="關閉" onClick={() => setPreviewId(null)}><X size={18} /></button></div>
        <p className="mini-label">{solutionCatIcons[preview.cat]} {preview.cat} · {subFor(preview)}</p>
        <p className="catalog-sub">{preview.sub}</p>
        <p className="catalog-desc">{preview.desc}</p>
        {preview.content && <div className="sol-preview-content">{String(preview.content).split('\n').filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}</div>}
        {preview.yt && String(preview.yt).includes('youtube') && <div className="catalog-video"><iframe src={String(preview.yt).replace('watch?v=', 'embed/')} title={preview.title} allowFullScreen /></div>}
        {Array.isArray(preview.options) && preview.options.length > 0 && <div className="sol-preview-options">{preview.options.map((o: string) => <span key={o} className="tag-chip">{o}</span>)}</div>}

        {relatedSolutions.length > 0 && <div className="sol-preview-section"><h5>你可能感興趣的方案</h5><div className="block-grid">{relatedSolutions.map(r => <button key={r.id} type="button" className="block-chip" onClick={() => setPreviewId(r.id)}><span className="block-chip-title">{r.title}</span></button>)}</div></div>}
        {relatedCases.length > 0 && <div className="sol-preview-section"><h5>解決過的過往案例</h5><div className="block-grid">{relatedCases.map(c => <button key={c.slug} type="button" className="block-chip" onClick={() => setPreviewId(null)}><span className="block-chip-head">{c.industry}</span><span className="block-chip-title">{c.title}</span></button>)}</div></div>}

        <button className="button button-primary" style={{ marginTop: 18 }} onClick={() => openConsult({ message: `我對以下方案感興趣：\n• ${preview.title}` })}>預約免費諮詢<ArrowUpRight size={15} /></button>
      </div>
    </div>}

    {selected.size > 0 && <div className="picker-bar"><span className="picker-bar-count">已選 <b>{selected.size}</b> 個方案</span><div className="picker-bar-chips">{selectedList.map(s => <button key={s.id} className="tag-chip on" onClick={() => toggle(s.id)}>{s.title} <X size={12} /></button>)}</div><button className="button button-primary" onClick={() => openConsult({ message: `我對以下方案感興趣：\n${selectedList.map(s => '• ' + s.title).join('\n')}` })}>預約免費諮詢</button></div>}
  </div>;
}
