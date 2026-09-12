import { Breadcrumbs, Eyebrow, PageSchema } from '@/components/page-blocks';
import { pageMetadata } from '@/lib/metadata';
import SolutionPicker from '@/components/solution-picker';
import ColleaguesIllustration from '@/components/colleagues-illustration';

const description = '實瀚科技解決方案：50 個實用方案，按服務對象、類別與 Tag 篩選，可多選加入諮詢，我們按你的痛點度身建議。';
export const metadata = pageMetadata('解決方案', description, '/catalog');

export default function CatalogPage() {
  return <><PageSchema title="解決方案" description={description} path="/catalog" faqs={[]} /><main id="main" className="catalog-index-page">
    <section className="services-page-hero"><div className="container"><Breadcrumbs label="解決方案" /><div className="services-intro-grid"><div><Eyebrow>SOLUTIONS</Eyebrow><h1>超過 50 個解決方案，<br /><span>按服務對象・類別・Tag 揀。</span></h1><p>可多選，揀完加入諮詢，<br />我哋按你嘅痛點度身建議。</p></div><ColleaguesIllustration className="hero-illustration" /></div></div></section>
    <section className="section"><div className="container"><SolutionPicker /></div></section>
  </main></>;
}
