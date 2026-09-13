'use client';

import { useState, useEffect, useCallback } from 'react';
import PostForm from './post-form';
import OverviewTab from './overview-tab';

const COLLECTIONS = [
  { key: 'painPoints', label: '痛症' },
  { key: 'solutions', label: '解決方案' },
  { key: 'cases', label: '案例' },
  { key: 'courses', label: '課程' },
  { key: 'faqs', label: 'FAQ' },
  { key: 'tags', label: 'Tag' },
] as const;

export default function AdminPanel() {
  const [tab, setTab] = useState<string>('overview');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState('');

  const isOverview = tab === 'overview';

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${tab}`);
      if (res.ok) setItems(await res.json());
      else setItems([]);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, [tab]);

  useEffect(() => {
    if (isOverview) return;
    load();
  }, [load, isOverview]);

  const seed = async () => {
    const res = await fetch('/api/seed', { method: 'POST' });
    const data = await res.json();
    setMsg(`已導入：方案 ${data.solutions}、案例 ${data.cases}、課程 ${data.courses}、FAQ ${data.faqs}、痛點 ${data.painPoints}、Tag ${data.tags}`);
    if (!isOverview) load();
  };

  const remove = async (id: any) => {
    await fetch(`/api/${tab}/${id}`, { method: 'DELETE' });
    load();
  };

  const title = (item: any) => item.title || item.name || item.question || item.slug || `#${item.id}`;
  const itemKey = (item: any) => String(item.id ?? item.slug);

  return (
    <div className="admin-panel">
      <div className="admin-tabs">
        <button className={tab === 'overview' ? 'on' : ''} onClick={() => { setTab('overview'); setAdding(false); setMsg(''); }}>總覽</button>
        {COLLECTIONS.map(c => <button key={c.key} className={tab === c.key ? 'on' : ''} onClick={() => { setTab(c.key); setAdding(false); setMsg(''); }}>{c.label}</button>)}
        <button className="seed-btn" onClick={seed}>⬇ Seed 資料</button>
      </div>

      {isOverview ? (
        <OverviewTab />
      ) : (
        <>
          <div className="admin-bar">
            <span>{loading ? '載入中…' : `${items.length} 項`}</span>
            <button className="button button-primary" onClick={() => setAdding(!adding)}>{adding ? '取消' : '＋ 新增'}</button>
          </div>

          {msg && <p className="admin-msg">{msg}</p>}

          {adding && (
            <div className="admin-add">
              <PostForm collection={tab} onSaved={() => { setAdding(false); setMsg('已儲存'); load(); }} onCancel={() => setAdding(false)} />
            </div>
          )}

          <ul className="admin-list">
            {items.map(item => (
              <li key={itemKey(item)}>
                <span className="admin-item-title">{title(item)}</span>
                <button className="admin-del" onClick={() => remove(itemKey(item))}>刪除</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
