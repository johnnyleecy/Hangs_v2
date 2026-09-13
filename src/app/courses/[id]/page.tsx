import { getCourses } from '@/lib/data-access';
import { notFound } from 'next/navigation';

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courses = await getCourses();
  const course = courses.find((c: any) => String(c.id) === String(id));
  if (!course) notFound();

  return (
    <main className="course">
      <div className="wrap">
        <h1>{course.title}</h1>
        {course.desc && <p className="course-desc">{course.desc}</p>}
        {course.content && <div className="course-content">{course.content}</div>}
        <div className="course-meta">
          {course.tool?.length > 0 && <div><b>工具：</b>{course.tool.join('、')}</div>}
          {course.role?.length > 0 && <div><b>角色：</b>{course.role.join('、')}</div>}
          {course.audience?.length > 0 && <div><b>對象：</b>{course.audience.join('、')}</div>}
          {course.duration && <div><b>時長：</b>{course.duration}</div>}
          {course.price && <div><b>價錢：</b>{course.price}</div>}
          {(course.nitpp || course.vtc) && <div><b>資助：</b>{[course.nitpp && 'NITTP', course.vtc && 'VTC'].filter(Boolean).join('／')}</div>}
        </div>
        {course.yt && <div className="course-video"><iframe src={course.yt} title={course.title} /></div>}
      </div>
    </main>
  );
}
