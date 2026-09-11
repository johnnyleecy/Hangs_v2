import type { Metadata, Viewport } from 'next';
import { company, siteUrl } from '@/lib/site';
import './globals.css';
import './pages.css';
import './catalog.css';
import './choose.css';
import SiteShell from '@/components/site-shell';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? 'http://localhost:3000'),
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  title: '實瀚科技 HANGS｜AI 應用、流程自動化及企業 IT 解決方案',
  description: company.description,
  applicationName: company.name,
  keywords: ['香港 AI 解決方案', '一人公司 AI', '企業 AI 應用', '流程自動化', '雲端遷移', 'DevOps', '客製系統開發', '實瀚科技'],
  openGraph: {
    title: '少一點繁瑣，多一點可能。｜實瀚科技',
    description: company.description,
    type: 'website',
    locale: 'zh_HK',
    siteName: '實瀚科技 HANGS',
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: { card: 'summary_large_image', title: '實瀚科技｜讓科技，成為你的成長力。', description: company.description },
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  category: 'technology',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body><a className="skip-link" href="#main">跳至主要內容</a><noscript><div style={{ padding: '10px 20px', background: '#eef5e4', color: '#162144', fontSize: 12, textAlign: 'center' }}>你仍可瀏覽服務、合作流程及常見問題。客群切換與諮詢摘要需要啟用 JavaScript。</div></noscript><SiteShell>{children}</SiteShell></body></html>;
}
