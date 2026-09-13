import type { Metadata } from 'next';
import '../../course.css';

export const metadata: Metadata = { title: '培訓課程｜實瀚科技' };

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
