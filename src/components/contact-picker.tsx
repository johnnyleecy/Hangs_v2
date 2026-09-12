'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { painPoints, painCategories } from '@/lib/pain-points-data';
import { solutions, solutionCategories, solutionCatIcons, subFor } from '@/lib/solutions-data';
import { cases } from '@/lib/cases-data';
import { useConsultation } from './site-shell';

export default function ContactPicker() {
  const { openConsult } = useConsultation();
  const [selPain, setSelPain] = useState<Set<number>>(new Set());
  const [selSol, setSelSol] = useState<Set<number>>(new Set());
  const [selCase, setSelCase] = useState<Set<string>>(new Set());
  const [painCat, setPainCat] = useState('');
  const [solCat, setSolCat] = useState('');

  const tPain = (id: number) => setSelPain(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const tSol = (id: number) => setSelSol(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const tCase = (slug: string) => setSelCase(prev => { const n = new Set(prev); n.has(slug) ? n.delete(slug) : n.add(slug); return n; });

  const painList = painPoints.filter(p => selPain.has(p.id));
  const solList = solutions.filter(s => selSol.has(s.id));
  const caseList = cases.filter(c => selCase.has(c.slug));
  const total = selPain.size + selSol.size + selCase.size;

  const submit = () => {
    const lines: string[] = [];
    if (painList.length) lines.push('痛點：\n' + painList.map(p => '• ' + p.title).join('\n'));
    if (solList.length) lines.push('感興趣方案：\n' + solList.map(s => '• ' + s.title).join('\n'));
    if (caseList.length) lines.push('參考案例：\n' + caseList.map(c => '• ' + c.title).join('\n'));
    openConsult({ message: lines.join('\n\n') });
  };

  return <div className="picker">
    <div className="picker-filters">
      <div className="picker-row"><span className="picker-label">痛症類別</span>{['', ...painCategories].map(c => <button key={c || 'all'} className={`filter-chip ${painCat === c ? 'on' : ''}`} onClick={() => setPainCat(c)}>{c || '全部'}</button>)}</div>
      <div className="picker-row"><span className="picker-label">方案類別</span>{['', ...solutionCategories].map(c => <button key={c || 'all'} className={`filter-chip ${solCat === c ? 'on' : ''}`} onClick={() => setSolCat(c)}>{c ? `${solutionCatIcons[c]} ${c}` : '全部'}</button>)}</div>
    </div>

    <h3 className="contact-sec">1. 你的痛點（可多選）</h3>
    <div className="pain-grid">{(painCat ? painPoints.filter(p => p.cat === painCat) : painPoints).map(p => { const on = selPain.has(p.id); return <button key={p.id} type="button" className={`pain-chip ${on ? 'on' : ''}`} onClick={() => tPain(p.id)} aria-pressed={on}>{on && <Check size={14} />}{p.title}</button>; })}</div>

    <h3 className="contact-sec">2. 感興趣的方案（Block · 可多選）</h3>
    <div className="block-grid">{(solCat ? solutions.filter(s => s.cat === solCat) : solutions).map(s => { const on = selSol.has(s.id); return <button key={s.id} type="button" className={`block-chip ${on ? 'on' : ''}`} onClick={() => tSol(s.id)} aria-pressed={on}><span className="block-chip-head">{solutionCatIcons[s.cat]} {subFor(s)}</span><span className="block-chip-title">{s.title}</span>{on && <Check size={14} className="block-chip-check" />}</button>; })}</div>

    <h3 className="contact-sec">3. 實例比較（可多選）</h3>
    <div className="block-grid">{cases.map(c => { const on = selCase.has(c.slug); return <button key={c.slug} type="button" className={`block-chip ${on ? 'on' : ''}`} onClick={() => tCase(c.slug)} aria-pressed={on}><span className="block-chip-head">{c.industry}</span><span className="block-chip-title">{c.title}</span>{on && <Check size={14} className="block-chip-check" />}</button>; })}</div>

    {total > 0 && <div className="picker-bar">
      <span className="picker-bar-count">已選 <b>{total}</b> 項</span>
      <div className="picker-bar-chips">
        {painList.map(p => <button key={`p${p.id}`} className="tag-chip on" onClick={() => tPain(p.id)}>{p.title} <X size={12} /></button>)}
        {solList.map(s => <button key={`s${s.id}`} className="tag-chip on" onClick={() => tSol(s.id)}>{s.title} <X size={12} /></button>)}
        {caseList.map(c => <button key={`c${c.slug}`} className="tag-chip on" onClick={() => tCase(c.slug)}>{c.title} <X size={12} /></button>)}
      </div>
      <button className="button button-primary" onClick={submit}>一拼提交諮詢</button>
    </div>}
  </div>;
}
