import { Mail, Phone, Printer, MapPin, Clock } from 'lucide-react';
import { Breadcrumbs, Eyebrow, PageHeading, PageSchema } from '@/components/page-blocks';
import ContactForm from '@/components/contact-form';
import { pageMetadata } from '@/lib/metadata';

const description = '聯絡實瀚科技 HANGS TECH LIMITED。歡迎致電、電郵、傳真或親臨，或直接在頁面填表查詢。';
export const metadata = pageMetadata('聯絡我們', description, '/contact');

const contacts = [
  { icon: Mail, label: '電郵', value: 'info@hang-tech.pro' },
  { icon: Phone, label: '電話', value: '3163 9373' },
  { icon: Printer, label: '傳真', value: '2120 8709' },
  { icon: Clock, label: '辦公時間', value: '星期一至六 09:00–20:00' },
  { icon: MapPin, label: '地址一', value: 'Shop 143, 1/F, Godfrey Centre, 175-185 Lai Chi Kok Road, Sham Shui Po, Kowloon' },
  { icon: MapPin, label: '地址二', value: 'Flat B, 7/F, Sun Shine Centre, 61-63 Portland Street, Yau Ma Tei, Kowloon' },
];

export default function ContactPage() {
  return <><PageSchema title="聯絡我們" description={description} path="/contact" faqs={[]} /><main id="main" className="contact-page">
    <section className="services-page-hero"><div className="container"><Breadcrumbs label="聯絡我們" /><div className="services-intro-grid"><div><Eyebrow>CONTACT US</Eyebrow><h1>聯絡我們，<br /><span>傾吓你嘅下一步。</span></h1><p>一個電話、一封電郵，<br />或者直接喺下面填表。</p></div></div></div></section>

    <section className="section"><div className="container">
      <PageHeading eyebrow="OUR DETAILS" title={['聯絡資料', '隨時搵到我哋。']} intro="" />
      <div className="block-grid">{contacts.map(c => <div key={c.label} className="block-chip" style={{ cursor: 'default' }}><span className="block-chip-head">{c.label}</span><span className="block-chip-title" style={{ whiteSpace: 'pre-wrap', fontWeight: 400 }}>{c.value}</span></div>)}</div>
    </div></section>

    <section className="section"><div className="container" style={{ maxWidth: 720 }}>
      <PageHeading eyebrow="GET IN TOUCH" title={['直接填表', '我哋盡快回覆。']} intro="" />
      <ContactForm />
    </div></section>
  </main></>;
}
