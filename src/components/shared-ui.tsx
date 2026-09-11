'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Check, X, LockKeyhole, CircleCheck, Copy } from 'lucide-react';
import { services } from '@/lib/site';

const subscribeToHydration = () => () => {};
const hydratedSnapshot = () => true;
const serverSnapshot = () => false;
export function useHydrated() { return useSyncExternalStore(subscribeToHydration, hydratedSnapshot, serverSnapshot); }

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return <Link href="/" className={`brand ${inverted ? 'brand-inverted' : ''}`} aria-label="實瀚科技首頁"><svg width="38" height="38" viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M5 5h9v13h16V5h9v34h-9V26H14v13H5z" fill="currentColor"/><path d="M14 18h16v8H14z" fill="#a9ce47"/><path d="M30 5h9v13h-9z" fill="#009c6f"/></svg><span className="brand-name">實瀚科技<span>HANGS TECHNOLOGY</span></span></Link>;
}

export function Modal({ title, children, onClose, wide = false }: { title: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = originalOverflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className={`modal ${wide ? 'modal-wide' : ''}`} aria-labelledby="modal-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); } }}><div className="modal-heading"><span className="mini-label">LET’S BUILD SOMETHING BETTER</span><button className="icon-button" aria-label="關閉視窗" onClick={onClose}><X size={20} /></button></div><h2 id="modal-title">{title}</h2>{children}</dialog>;
}

export function Consultation({ onClose, prefill }: { onClose: () => void; prefill?: { message?: string; service?: string } }) {
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { if (summary) summaryRef.current?.focus(); }, [summary]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSummary(`實瀚科技｜諮詢需求摘要\n\n稱呼：${String(data.get('name')).trim()}\n公司／團隊：${String(data.get('company')).trim() || '未填寫'}\n電郵：${data.get('email')}\n團隊規模：${data.get('size')}\n感興趣的服務：${data.get('service')}\n\n想解決的問題：\n${String(data.get('message')).trim()}\n\n此摘要由前端頁面產生，尚未傳送至實瀚科技。`);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(summary); setCopied(true); setCopyError(false); }
    catch { summaryRef.current?.focus(); summaryRef.current?.select(); setCopyError(true); }
  }
  return <Modal title={summary ? '好的合作，從理解開始。' : '聊聊你的下一步。'} onClose={onClose} wide>
    {!summary ? <><p className="modal-intro">不需要先懂技術。告訴我們你想改善的工作，就從那裡開始。</p><div className="form-notice"><LockKeyhole size={15} /><span>前端示範：資料只在此頁面整理，不會上傳。正式聯絡渠道待接入。</span></div><form onSubmit={submit} className="consult-form"><div className="form-grid"><label>你的稱呼 <span>*</span><input autoComplete="name" name="name" required maxLength={80} pattern=".*\S.*" placeholder="怎樣稱呼你？" /></label><label>公司／團隊名稱<input autoComplete="organization" name="company" maxLength={120} placeholder="一人公司也歡迎" /></label><label>聯絡電郵 <span>*</span><input type="email" autoComplete="email" name="email" required maxLength={180} placeholder="you@company.com" /></label><label>團隊規模<select name="size" defaultValue="一人公司"><option>一人公司</option><option>2–20 人</option><option>21–100 人</option><option>100 人以上</option></select></label></div><label>你感興趣的方向<select name="service" defaultValue={prefill?.service ?? '還未確定，想先聽聽建議'}><option>還未確定，想先聽聽建議</option>{services.map(service => <option key={service.id}>{service.title}</option>)}</select></label><label>目前最想解決甚麼問題？ <span>*</span><textarea name="message" rows={3} required maxLength={2000} defaultValue={prefill?.message} placeholder="例如：每天要花很多時間回覆重複查詢，想用 AI 協助處理……" /></label><button type="submit" className="button button-primary form-submit">整理我的諮詢需求<ArrowRight size={17} /></button><p className="form-footnote">此步驟只產生可複製的摘要，並不代表預約或提交成功。</p></form></> : <div className="summary-panel"><div className="summary-success"><CircleCheck size={22} /><span>需求摘要已在本機產生，尚未送出。</span></div><textarea ref={summaryRef} aria-label="諮詢需求摘要，可選取複製" className="summary-text" readOnly value={summary} rows={12} /><div className="summary-actions"><button className="button button-primary" onClick={copy}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? '已複製摘要' : '複製需求摘要'}</button><button className="button button-secondary" onClick={() => { setSummary(''); setCopied(false); setCopyError(false); }}>重新填寫</button></div><p role="status" className="form-footnote">{copyError ? '無法自動複製，已選取文字；請使用 ⌘C 或 Ctrl+C。' : copied ? '已複製。正式聯絡渠道接入後，即可用於提交諮詢。' : '你可以先複製保存。關閉視窗後，資料不會保留。'}</p></div>}
  </Modal>;
}

