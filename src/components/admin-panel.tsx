'use client';

import { useState, useEffect, useCallback } from 'react';

const COLLECTIONS = [
  { key: 'posts', label: 'Post' },
  { key: 'solutions', label: '解決方案' },
  { key: 'cases', label: '案例' },
  { key: 'tags', label: 'Tag' },
  { key: 'faqs', label: 'FAQ' },
  { key: 'painPoints', label: '痛點' },
] as const;

export default function AdminPanel() {
  const [tab, setTab] = useState<string>('posts');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [json, setJson] = useState('');
  const [msg, setMsg] = useState('');

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

  useEffect(() => { load(); }, [load]);

  const seed = async () => {
    const res = await fetch('/api/seed', { method: 'POST' });
    const data = await res.json();
    setMsg(`已導入：方案 ${data.solutions}、案例 ${data.cases}、FAQ ${data.faqs}、痛點 ${data.painPoints}、Tag ${data.tags}`);
    load();
  };

  const remove = async (id: any) => {
    await fetch(`/api/${tab}/${id}`, { method: 'DELETE' });
    load();
  };

  const add = async () => {
    try {
      const obj = JSON.parse(json);
      await fetch(`/api/${tab}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });
      setJson('');
      setAdding(false);
      setMsg('');
      load();
    } catch {
      setMsg('JSON 格式錯誤，請檢查。');
    }
  };

  const title = (item: any) => item.title || item.name || item.question || item.slug || `#${item.id}`;

  return (
    <div className="admin-panel">
      <div className="admin-tabs">
        {COLLECTIONS.map(c => <button key={c.key} className={tab === c.key ? 'on' : ''} onClick={() => { setTab(c.key); setAdding(false); setMsg(''); }}>{c.label}</button>)}
        <button className="seed-btn" onClick={seed}>⬇ Seed 資料</button>
      </div>

      <div className="admin-bar">
        <span>{loading ? '載入中…' : `${items.length} 項`}</span>
        <button className="button button-primary" onClick={() => setAdding(!adding)}>{adding ? '取消' : '＋ 新增'}</button>
      </div>

      {msg && <p className="admin-msg">{msg}</p>}

      {adding && (
        <div className="admin-add">
          <textarea value={json} onChange={e => setJson(e.target.value)} placeholder={`貼上 ${tab} 嘅 JSON 物件`} rows={7} />
          <button className="button button-primary" onClick={add}>儲存</button>
        </div>
      )}

      <ul className="admin-list">
        {items.map(item => (
          <li key={String(item.id)}>
            <span className="admin-item-title">{title(item)}</span>
            <button className="admin-del" onClick={() => remove(item.id)}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
