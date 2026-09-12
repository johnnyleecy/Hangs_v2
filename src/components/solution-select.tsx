'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { solutions, solutionCategories, solutionCatIcons, subFor, subsOf } from '@/lib/solutions-data';
import { cases } from '@/lib/cases-data';

export default function SolutionSelect({ name }: { name: string }) {
  const [selSol, setSelSol] = useState<Set<number>>(new Set());
  const [selCase, setSelCase] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<'sol' | 'case' | null>(null);
  const [cat, setCat] = useState('');
  const [sub, setSub] = useState('');

  const solList = solutions.filter(s => selSol.has(s.id));
  const caseList = cases.filter(c => selCase.has(c.slug));
  const subList = cat ? subsOf(cat) : [];
  const list = cat ? (sub ? solutions.filter(s => s.cat === cat && subFor(s) === sub) : solutions.filter(s => s.cat === cat)) : solutions;

  const toggleSol = (id: number) => setSelSol(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleCase = (slug: string) => setSelCase(prev => { const n = new Set(prev); if (n.has(slug)) n.delete(slug); else n.add(slug); return n; });

  return <div className="solution-select">
    <input type="hidden" name={name} value={[...solList.map(s => s.title), ...caseList.map(c => c.title)].join('、')} />
    <div className="sol-select-tags">
      {solList.map(s => <button key={s.id} type="button" className="tag-chip on" onClick={() => toggleSol(s.id)}>{s.title} <X size={12} /></button>)}
      {caseList.map(c => <button key={c.slug} type="button" className="tag-chip on" onClick={() => toggleCase(c.slug)}>{c.title} <X size={12} /></button>)}
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button type="button" className="add-btn" onClick={() => setMode('sol')}><Plus size={15} /> 加方案</button>
      <button type="button" className="add-btn" onClick={() => setMode('case')}><Plus size={15} /> 加案例</button>
    </div>

    {mode && <div className="drilldown-overlay" onClick={() => setMode(null)}>
      <div className="drilldown-modal" onClick={e => e.stopPropagation()}>
        <div className="drilldown-head"><span>{mode === 'sol' ? '揀方案（可多選）' : '揀案例（可多選）'}</span><button className="icon-button" aria-label="關閉" onClick={() => setMode(null)}><X size={18} /></button></div>

        {mode === 'sol' ? <>
          <div className="picker-row"><span className="picker-label">大類</span>{['', ...solutionCategories].map(c => <button key={c || 'all'} className={`filter-chip ${cat === c ? 'on' : ''}`} onClick={() => { setCat(c); setSub(''); }}>{c || '全部'}</button>)}</div>
          {cat && <div className="picker-row"><span className="picker-label">中類</span><button className={`filter-chip ${sub === '' ? 'on' : ''}`} onClick={() => setSub('')}>全部</button>{subList.map(sb => <button key={sb} className={`filter-chip ${sub === sb ? 'on' : ''}`} onClick={() => setSub(sb)}>{sb}</button>)}</div>}
          <div className="block-grid drilldown-list">{list.map(s => <button key={s.id} type="button" className={`block-chip ${selSol.has(s.id) ? 'on' : ''}`} onClick={() => toggleSol(s.id)}><span className="block-chip-head">{subFor(s)}</span><span className="block-chip-title">{s.title}</span></button>)}</div>
        </> : <div className="block-grid drilldown-list">{cases.map(c => <button key={c.slug} type="button" className={`block-chip ${selCase.has(c.slug) ? 'on' : ''}`} onClick={() => toggleCase(c.slug)}><span className="block-chip-head">{c.industry}</span><span className="block-chip-title">{c.title}</span></button>)}</div>}

        <button type="button" className="button button-primary" style={{ marginTop: 16 }} onClick={() => setMode(null)}>完成選擇</button>
      </div>
    </div>}
  </div>;
}
