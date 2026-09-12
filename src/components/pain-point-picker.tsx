'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { painPoints, painCategories } from '@/lib/pain-points-data';
import { useConsultation } from './site-shell';

export default function PainPointPicker() {
  const { openConsult } = useConsultation();
  const [cat, setCat] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  let list = painPoints;
  if (cat) list = list.filter(p => p.cat === cat);
  const toggle = (id: number) => setSelected(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const selectedList = painPoints.filter(p => selected.has(p.id));

  return <div className="picker">
    <div className="picker-filters">
      <div className="picker-row"><span className="picker-label">痛症類別</span>{['', ...painCategories].map(c => <button key={c || 'all'} className={`filter-chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c || '全部'}</button>)}</div>
    </div>
    <p className="picker-count">共 {list.length} 個痛點 · 點擊即可選取</p>
    <div className="pain-grid">{list.map(p => { const on = selected.has(p.id); return (
      <button key={p.id} type="button" className={`pain-chip ${on ? 'on' : ''}`} onClick={() => toggle(p.id)} aria-pressed={on}>{on && <Check size={14} />}{p.title}</button>
    ); })}</div>
    {selected.size > 0 && <div className="picker-bar"><span className="picker-bar-count">已選 <b>{selected.size}</b> 個痛點</span><div className="picker-bar-chips">{selectedList.map(p => <button key={p.id} className="tag-chip on" onClick={() => toggle(p.id)}>{p.title} <X size={12} /></button>)}</div><button className="button button-primary" onClick={() => openConsult({ message: `我的痛點：\n${selectedList.map(p => '• ' + p.title).join('\n')}` })}>加入諮詢</button></div>}
  </div>;
}
