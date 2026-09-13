import type { Metadata } from 'next';
import '../../pain.css';

export const metadata: Metadata = { title: '企業痛症｜實瀚科技' };

export default function PainLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
