import type { Metadata } from 'next';
import '../demo.css';

export const metadata: Metadata = { title: '三網資料示範｜實瀚科技' };

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
