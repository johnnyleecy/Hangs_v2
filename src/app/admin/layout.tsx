import type { Metadata } from 'next';
import '../admin.css';

export const metadata: Metadata = { title: '管理後台｜實瀚科技', robots: { index: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
