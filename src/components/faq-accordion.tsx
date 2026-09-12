import { faqs } from '@/lib/faqs-data';

export default function FaqAccordion({ items, title = '常見問題' }: { items: typeof faqs; title?: string }) {
  if (!items.length) return null;
  return <section className="section"><div className="container">
    <div className="section-heading"><div><p className="section-label"><span />FAQ</p><h2>{title}</h2></div></div>
    <div className="faq-accordion">
      {items.map(f => <details key={f.id} className="faq-item"><summary><span>{f.question}</span></summary><p>{f.answer}</p></details>)}
    </div>
  </div></section>;
}
