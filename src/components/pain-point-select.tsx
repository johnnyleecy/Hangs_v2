'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { painPoints, painCategories } from '@/lib/pain-points-data';

export default function PainPointSelect({ name }: { name: string }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [cat, setCat] = useState('');
  const [open, setOpen] = useState(false);

  const list = cat ? painPoints.filter(p => p.cat === cat) : painPoints;
  const selectedList = painPoints.filter(p => selected.has(p.id));
  const toggle = (id: number) => setSelected(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return <div className="solution-select">
    <input type="hidden" name={name} value={selectedList.map(p => p.title).join('、')} />
    <div className="sol-select-tags">{selectedList.map(p => <button key={p.id} type="button" className="tag-chip on" onClick={() => toggle(p.id)}>{p.title} <X size={12} /></button>)}</div>
    <button type="button" className="add-btn" onClick={() => setOpen(true)}><Plus size={15} /> 加痛點</button>

    {open && <div className="drilldown-overlay" onClick={() => setOpen(false)}>
      <div className="drilldown-modal" onClick={e => e.stopPropagation()}>
        <div className="drilldown-head"><span>揀痛點（可多選）</span><button className="icon-button" aria-label="關閉" onClick={() => setOpen(false)}><X size={18} /></button></div>
        <div className="picker-row"><span className="picker-label">痛症類別</span>{['', ...painCategories].map(c => <button key={c || 'all'} className={`filter-chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c || '全部'}</button>)}</div>
        <div className="block-grid drilldown-list">{list.map(p => { const on = selected.has(p.id); return <button key={p.id} type="button" className={`block-chip ${on ? 'on' : ''}`} onClick={() => toggle(p.id)} aria-pressed={on}><span className="block-chip-title">{p.title}</span></button>; })}</div>
        <button type="button" className="button button-primary" style={{ marginTop: 16 }} onClick={() => setOpen(false)}>完成選擇</button>
      </div>
    </div>}
  </div>;
}
