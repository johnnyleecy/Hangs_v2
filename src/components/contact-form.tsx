'use client';

import { useState } from 'react';
import SolutionSelect from './solution-select';
import PainPointSelect from './pain-point-select';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) return <div className="cta-panel" style={{ maxWidth: 720 }}><h3>多謝你嘅查詢！</h3><p>我哋已收到，會盡快以電郵或電話回覆你。</p></div>;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const summary = `姓名：${String(fd.get('name')).trim()}\n團隊規模：${fd.get('size')}\n聯絡電話：${String(fd.get('phone')).trim() || '未填寫'}\n電郵：${fd.get('email')}\n感興趣方向：${fd.get('service') || '未填寫'}\n\n痛點：\n${fd.get('painpoints') || '未填寫'}\n\n其他補充：\n${fd.get('message') || '未填寫'}`;
    window.location.href = `mailto:info@hang-tech.pro?subject=${encodeURIComponent('網站查詢')}&body=${encodeURIComponent(summary)}`;
    setSent(true);
  };

  return <form className="contact-form" onSubmit={onSubmit}>
    <div className="form-grid">
      <label>你的稱呼 <span>*</span><input autoComplete="name" name="name" required maxLength={80} placeholder="怎樣稱呼你？" /></label>
      <label>團隊規模<select name="size" defaultValue="一人公司"><option>一人公司</option><option>2–20 人</option><option>21–100 人</option><option>100 人以上</option></select></label>
      <label>聯絡電話<input type="tel" autoComplete="tel" name="phone" maxLength={40} placeholder="你的聯絡電話" /></label>
      <label>聯絡電郵 <span>*</span><input type="email" autoComplete="email" name="email" required maxLength={180} placeholder="you@company.com" /></label>
    </div>
    <label className="form-full">你感興趣的方向<SolutionSelect name="service" /></label>
    <label className="form-full">目前最想解決甚麼問題？<PainPointSelect name="painpoints" /><textarea name="message" rows={3} placeholder="其他補充（可選）..." /></label>
    <button type="submit" className="button button-primary">提交查詢</button>
  </form>;
}
