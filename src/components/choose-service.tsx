'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, BrainCircuit, Workflow, Cloud, ShieldCheck, Check, ChevronDown, ArrowUpRight, CircleDot, X } from 'lucide-react';
import { services } from '@/lib/site';
import { chooseGroups, allOptions } from '@/lib/choose-service';
import { useConsultation } from './site-shell';
import { useHydrated } from './shared-ui';

const cardIcons: Record<string, typeof Sparkles> = { sparkles: Sparkles, brain: BrainCircuit, workflow: Workflow, cloud: Cloud, shield: ShieldCheck };

function ChooseCard({ id, active, onClick }: { id: string; active: boolean; onClick: () => void }) {
  const service = services.find(item => item.id === id);
  if (!service) return null;
  const Icon = cardIcons[service.icon] ?? Sparkles;
  const count = chooseGroups.find(group => group.cardId === id)?.options.length ?? 0;
  return <button type="button" className={`service-card choose-card ${active ? 'is-active' : ''}`} aria-expanded={active} aria-pressed={active} onClick={onClick}>
    <div className="service-card-top"><span className="service-icon"><Icon size={20} strokeWidth={1.5} /></span><span className="service-number">{service.number}</span></div>
    <p className="service-english">{service.english}</p>
    <h3>{service.title}</h3>
    <p className="service-description">{service.description}</p>
    <div className="service-card-foot"><span>{service.features[0]}</span><span className="choose-card-toggle"><span>{count} 項服務</span><ChevronDown size={18} /></span></div>
  </button>;
}

export default function ChooseService() {
  const ready = useHydrated();
  const { openConsult } = useConsultation();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const activeGroup = chooseGroups.find(group => group.cardId === activeCard) ?? null;
  const selectedOptions = allOptions.filter(option => selected.has(option.slug));
  const toggleCard = (id: string) => setActiveCard(current => (current === id ? null : id));
  const toggleOption = (slug: string) => setSelected(current => { const next = new Set(current); if (next.has(slug)) next.delete(slug); else next.add(slug); return next; });
  const selectAllInGroup = (group: typeof chooseGroups[number]) => setSelected(current => { const next = new Set(current); group.options.forEach(option => next.add(option.slug)); return next; });
  const selectAll = () => setSelected(new Set(allOptions.map(option => option.slug)));
  const clear = () => setSelected(new Set());
  const removeOption = (slug: string) => setSelected(current => { const next = new Set(current); next.delete(slug); return next; });
  const findDirection = () => {
    const message = selectedOptions.length ? `我感興趣的服務方向：\n${selectedOptions.map(option => `• ${option.title}`).join('\n')}\n\n（請補充你的業務背景與最想解決的問題）` : undefined;
    openConsult({ message });
  };
  return <main id="main" className="choose-page">
    <section className="choose-hero"><div className="container"><nav className="breadcrumbs" aria-label="麵包屑導覽"><Link href="/">首頁</Link><span aria-hidden="true">/</span><span aria-current="page">選擇我們的服務</span></nav><p className="hero-announcement"><span className="online-dot" />OUR EXPERTISE</p><h1>你的挑戰，<br />我們的出發點。</h1><p className="catalog-lead">先選你感興趣的方向，我們一起找到適合的起步方式。點選左邊任一類別展開服務項目，可全選或逐項挑選，再交給我們建議方向。</p></div></section>
    <section className="section choose-body"><div className="container">
      <div className="choose-layout">
        <div className="choose-cards" aria-label="服務類別">
          {services.map(service => <ChooseCard key={service.id} id={service.id} active={activeCard === service.id} onClick={() => toggleCard(service.id)} />)}
        </div>
        <aside className="choose-panel" aria-live="polite">
          {activeGroup ? <>
            <div className="choose-panel-head"><div><span className="mini-label">SERVICE OPTIONS</span><h2>{services.find(item => item.id === activeGroup.cardId)?.title}</h2></div><button type="button" className="text-button" onClick={() => selectAllInGroup(activeGroup)}>全選此類別</button></div>
            <div className="choose-options">{activeGroup.options.map(option => <div key={option.slug} className="choose-option"><label className="choose-option-main"><input type="checkbox" checked={selected.has(option.slug)} onChange={() => toggleOption(option.slug)} /><span className="check-box"><Check size={14} /></span><span className="choose-option-text"><strong>{option.title}</strong><small>{option.english}</small></span></label><Link href={option.href} className="choose-option-link" aria-label={`查看${option.title}詳情`}><ArrowUpRight size={16} /></Link></div>)}</div>
            <p className="choose-panel-note"><CircleDot size={14} />勾選感興趣的項目，稍後會一併帶入諮詢摘要。點選箭頭可查看每項服務詳情。</p>
          </> : <div className="choose-panel-empty"><span className="empty-glyph"><Sparkles size={24} strokeWidth={1.4} /></span><h2>點選左邊任一服務類別</h2><p>就會在這裡展開可選取的服務項目。你隨時可以回到首頁查看「OUR EXPERTISE」的完整介紹。</p></div>}
        </aside>
      </div>
      <div className="choose-summary">
        <div className="choose-summary-count"><span className="summary-badge">{selectedOptions.length}</span><span>已選取 {selectedOptions.length} 項服務</span>{selectedOptions.length === 0 && <em>尚未選取任何項目</em>}</div>
        <div className="choose-summary-chips">{selectedOptions.map(option => <button type="button" key={option.slug} className="summary-chip" onClick={() => removeOption(option.slug)}>{option.title}<X size={14} /></button>)}</div>
        <div className="choose-summary-actions"><button type="button" className="button button-ghost" onClick={selectAll}>全選所有</button><button type="button" className="button button-ghost" onClick={clear} disabled={selectedOptions.length === 0}>清除</button><button type="button" className="button button-primary" disabled={!ready} onClick={findDirection}>找到適合的方向<ArrowUpRight size={17} /></button></div>
      </div>
    </div></section>
  </main>;
}
