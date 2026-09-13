'use client';

import { useState, useEffect } from 'react';

type FieldDef = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'checkboxes' | 'tags' | 'checkbox' | 'rating';
  options?: string[];
  dynamic?: 'solutions' | 'painPoints' | 'courses' | 'tags';
  placeholder?: string;
};

const AUDIENCE = ['一人公司', '中小企', '企業團隊'];
const ROLES = ['行政', '會計', '秘書', '法律顧問', '推廣'];
const TOOLS = ['AI', 'Agent', 'Python', 'MCP'];
const PAIN_CATS = ['文書', '數據', '簡報', '查證', '行政', '轉換', '行銷', '專案', '法律'];
const SOLUTION_CATS = ['AI 解決方案', '流程自動化', 'AI Admin', 'AI HR', 'AI Account', '雲端與資安'];
const FAQ_ZONES = ['A', 'B', 'C', 'D', 'E', 'F'];
const TAG_GROUPS = ['客層', '痛症類別', '角色', '行業', '場景'];

const FIELD_CONFIGS: Record<string, FieldDef[]> = {
  painPoints: [
    { key: 'title', label: '標題', type: 'text', placeholder: '開會沒人記下重點，就等於白開' },
    { key: 'cat', label: '痛症類別', type: 'select', options: PAIN_CATS },
    { key: 'audience', label: '服務對象', type: 'checkboxes', options: AUDIENCE },
    { key: 'tags', label: 'Tag（揀選後會收窄下方方案／課程）', type: 'checkboxes', dynamic: 'tags' },
    { key: 'body', label: '正文', type: 'textarea', placeholder: '400–600 字，零術語，講痛不講方案' },
    { key: 'ratings', label: '解決方案評分模組（星星 + Level + 連結網2／網3）', type: 'rating' },
    { key: 'ctaText', label: '結尾文字（直接顯示，唔係按鈕）', type: 'text', placeholder: '例如：把重點先生成，等律師簽名' },
    { key: 'nextPostId', label: '下一篇（ID 或標題）', type: 'text', placeholder: '例如：#2' },
  ],
  solutions: [
    { key: 'cat', label: '大類', type: 'select', options: SOLUTION_CATS },
    { key: 'title', label: '標題', type: 'text' },
    { key: 'sub', label: '副標', type: 'text' },
    { key: 'desc', label: '一句簡介', type: 'textarea' },
    { key: 'content', label: '詳細內容', type: 'textarea' },
    { key: 'tags', label: 'Tag（逗號分隔）', type: 'tags', placeholder: 'AI, 顧問, 導入' },
    { key: 'options', label: '細項（逗號分隔）', type: 'tags', placeholder: '需求訪談, 模型訓練' },
    { key: 'cover', label: '封面（漸變色或圖片 URL）', type: 'text', placeholder: 'linear-gradient(135deg,#16a34a,#0d9488)' },
    { key: 'yt', label: 'YouTube embed 連結', type: 'text', placeholder: 'https://www.youtube.com/embed/...' },
  ],
  cases: [
    { key: 'title', label: '標題', type: 'text' },
    { key: 'industry', label: '行業', type: 'text', placeholder: '貿易・批發' },
    { key: 'summary', label: '摘要', type: 'textarea' },
    { key: 'content', label: '內容', type: 'textarea' },
    { key: 'solutionId', label: '對應方案', type: 'select', dynamic: 'solutions' },
    { key: 'result', label: '成效', type: 'text', placeholder: '處理時間縮短 90%' },
    { key: 'cover', label: '封面（漸變色或圖片 URL）', type: 'text' },
    { key: 'tags', label: 'Tag（逗號分隔）', type: 'tags' },
  ],
  courses: [
    { key: 'title', label: '課程名', type: 'text' },
    { key: 'desc', label: '簡介', type: 'textarea' },
    { key: 'content', label: '詳情', type: 'textarea' },
    { key: 'tool', label: '工具', type: 'checkboxes', options: TOOLS },
    { key: 'role', label: '對應角色', type: 'checkboxes', options: ROLES },
    { key: 'audience', label: '服務對象', type: 'checkboxes', options: AUDIENCE },
    { key: 'painPointIds', label: '對應痛症', type: 'multiselect', dynamic: 'painPoints' },
    { key: 'solutionIds', label: '對應方案', type: 'multiselect', dynamic: 'solutions' },
    { key: 'tags', label: 'Tag（逗號分隔）', type: 'tags' },
    { key: 'nitpp', label: 'NITTP 資助', type: 'checkbox' },
    { key: 'vtc', label: 'VTC 合資格', type: 'checkbox' },
    { key: 'yt', label: 'YouTube embed 連結', type: 'text' },
    { key: 'duration', label: '時長', type: 'text' },
    { key: 'price', label: '價錢', type: 'text' },
  ],
  faqs: [
    { key: 'zone', label: '區（A 概念 / B 方案價錢 / C 安全私隱 / D 啱唔啱我 / E 點開始 / F 痛症對照）', type: 'select', options: FAQ_ZONES },
    { key: 'question', label: '問題', type: 'text' },
    { key: 'answer', label: '答案', type: 'textarea' },
    { key: 'painPointId', label: '對應痛症（可選）', type: 'select', dynamic: 'painPoints' },
    { key: 'solutionId', label: '對應方案（可選）', type: 'select', dynamic: 'solutions' },
    { key: 'audience', label: '服務對象（可選）', type: 'checkboxes', options: AUDIENCE },
    { key: 'tags', label: 'Tag（逗號分隔）', type: 'tags' },
  ],
  tags: [
    { key: 'name', label: 'Tag 名', type: 'text' },
    { key: 'group', label: '分組', type: 'select', options: TAG_GROUPS },
  ],
};

const DEFAULT_RATINGS = [
  { level: '低效', stars: 2, desc: '成本 $0 但忽略時間成本、隨時被 AI 幻覺坑倒、客戶資料上網有私隱風險', visible: true, solutionId: undefined, courseId: undefined },
  { level: '中效', stars: 4, desc: '一次性費用＋高度保密資料留本機＋精準調控＋三個月保養＋另設月費計劃', visible: true, solutionId: undefined, courseId: undefined },
  { level: '高效', stars: 5, desc: '團隊共用數據、客製化數據存取、保密高效方便', visible: true, solutionId: undefined, courseId: undefined },
];

function RatingEditor({ value, onChange, solutions, courses, selectedTags }: {
  value: any[];
  onChange: (v: any[]) => void;
  solutions: any[];
  courses: any[];
  selectedTags: string[];
}) {
  const narrow = (list: any[], selected: string[]) => {
    if (!selected.length) return list;
    const hit = list.filter((x: any) => (x.tags ?? []).some((t: string) => selected.includes(t)));
    return hit.length ? hit : list;
  };
  const filteredSolutions = narrow(solutions, selectedTags);
  const filteredCourses = narrow(courses, selectedTags);

  const update = (i: number, patch: any) => {
    onChange(value.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  };

  return (
    <div className="pf-ratings">
      {value.map((t, i) => (
        <div key={i} className="pf-rating">
          <div className="pf-rating-row">
            <input type="text" value={t.level ?? ''} onChange={e => update(i, { level: e.target.value })} placeholder="Level（低效／中效／高效）" className="pf-rating-level" />
            <select value={t.stars ?? 3} onChange={e => update(i, { stars: Number(e.target.value) })}>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</option>)}
            </select>
            <label className="pf-check"><input type="checkbox" checked={!!t.visible} onChange={e => update(i, { visible: e.target.checked })} />顯示</label>
          </div>
          <textarea rows={2} value={t.desc ?? ''} onChange={e => update(i, { desc: e.target.value })} placeholder="描述（例如：一次性費用＋資料留本機＋三個月保養）" />
          <div className="pf-rating-refs">
            <select value={t.solutionId ?? ''} onChange={e => update(i, { solutionId: e.target.value ? Number(e.target.value) : undefined })}>
              <option value="">— 網2 方案（可選）—</option>
              {filteredSolutions.map((s: any) => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
            <select value={t.courseId ?? ''} onChange={e => update(i, { courseId: e.target.value ? Number(e.target.value) : undefined })}>
              <option value="">— 網3 課程（可選）—</option>
              {filteredCourses.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PostForm({ collection, onSaved, onCancel }: { collection: string; onSaved: () => void; onCancel: () => void }) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [refs, setRefs] = useState<{ solutions: any[]; painPoints: any[]; courses: any[]; tags: any[] }>({ solutions: [], painPoints: [], courses: [], tags: [] });
  const [saving, setSaving] = useState(false);

  const fields = FIELD_CONFIGS[collection] ?? [];

  useEffect(() => {
    setValues({});
    (async () => {
      const [s, p, c, t] = await Promise.all([
        fetch('/api/solutions').then(r => (r.ok ? r.json() : [])),
        fetch('/api/painPoints').then(r => (r.ok ? r.json() : [])),
        fetch('/api/courses').then(r => (r.ok ? r.json() : [])),
        fetch('/api/tags').then(r => (r.ok ? r.json() : [])),
      ]);
      setRefs({ solutions: s, painPoints: p, courses: c, tags: t });
    })();
  }, [collection]);

  const opts = (f: FieldDef) => {
    if (f.dynamic === 'solutions') return refs.solutions.map((s: any) => ({ value: String(s.id), label: s.title || `#${s.id}` }));
    if (f.dynamic === 'painPoints') return refs.painPoints.map((p: any) => ({ value: String(p.id), label: p.title || `#${p.id}` }));
    if (f.dynamic === 'courses') return refs.courses.map((c: any) => ({ value: String(c.id), label: c.title || `#${c.id}` }));
    if (f.dynamic === 'tags') return refs.tags.map((t: any) => ({ value: t.name, label: t.name }));
    return (f.options ?? []).map(o => ({ value: o, label: o }));
  };

  const set = (k: string, v: any) => setValues(p => ({ ...p, [k]: v }));

  const toggle = (k: string, v: string) => {
    const arr: string[] = values[k] ?? [];
    set(k, arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };

  const submit = async () => {
    setSaving(true);
    const body: any = {};
    for (const f of fields) {
      const v = values[f.key];
      if (f.dynamic) {
        if (f.type === 'multiselect') body[f.key] = (v ?? []).map(Number);
        else body[f.key] = v ? Number(v) : undefined;
      }
      else if (f.type === 'checkboxes' || f.type === 'multiselect') body[f.key] = v ?? [];
      else if (f.type === 'rating') body[f.key] = v ?? DEFAULT_RATINGS;
      else if (f.type === 'tags') body[f.key] = String(v ?? '').split(/[,，]/).map((s: string) => s.trim()).filter(Boolean);
      else if (f.type === 'checkbox') body[f.key] = !!v;
      else body[f.key] = v ?? '';
    }
    if (collection === 'cases') {
      body.slug = `case-${Date.now()}`;
      const sol = refs.solutions.find((s: any) => String(s.id) === String(body.solutionId));
      if (sol) body.solutionTitle = sol.title;
    }
    await fetch(`/api/${collection}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setSaving(false);
    onSaved();
  };

  return (
    <div className="post-form">
      {fields.map(f => (
        <label key={f.key} className="pf-field">
          <span className="pf-label">{f.label}</span>
          {f.type === 'text' && <input type="text" value={values[f.key] ?? ''} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} />}
          {f.type === 'textarea' && <textarea rows={4} value={values[f.key] ?? ''} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} />}
          {f.type === 'tags' && <input type="text" value={values[f.key] ?? ''} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} />}
          {f.type === 'checkbox' && <input type="checkbox" checked={!!values[f.key]} onChange={e => set(f.key, e.target.checked)} />}
          {f.type === 'rating' && (
            <RatingEditor
              value={values[f.key] ?? DEFAULT_RATINGS}
              onChange={v => set(f.key, v)}
              solutions={refs.solutions}
              courses={refs.courses}
              selectedTags={values.tags ?? []}
            />
          )}
          {f.type === 'select' && (
            <select value={values[f.key] ?? ''} onChange={e => set(f.key, e.target.value)}>
              <option value="">— 請選擇 —</option>
              {opts(f).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          )}
          {(f.type === 'checkboxes' || f.type === 'multiselect') && (
            <div className="pf-checks">
              {opts(f).map(o => {
                const arr: string[] = values[f.key] ?? [];
                return (
                  <label key={o.value} className="pf-check">
                    <input type="checkbox" checked={arr.includes(o.value)} onChange={() => toggle(f.key, o.value)} />
                    {o.label}
                  </label>
                );
              })}
            </div>
          )}
        </label>
      ))}
      <div className="pf-actions">
        <button className="button button-primary" onClick={submit} disabled={saving}>{saving ? '儲存中…' : '儲存'}</button>
        <button className="button" onClick={onCancel}>取消</button>
      </div>
    </div>
  );
}
