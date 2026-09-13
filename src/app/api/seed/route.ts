import { solutions } from '@/lib/solutions-data';
import { cases } from '@/lib/cases-data';
import { courses } from '@/lib/courses-data';
import { faqs } from '@/lib/faqs-data';
import { painPoints } from '@/lib/pain-points-data';
import { writeDb } from '@/lib/db';

const TAG_GROUPS = ['客層', '痛症類別', '角色', '行業', '場景'];

function tagGroup(name: string): string {
  if (['一人公司', '中小企', '企業團隊'].includes(name)) return '客層';
  if (['文書', '數據', '簡報', '查證', '行政', '轉換', '行銷', '專案', '法律'].includes(name)) return '痛症類別';
  if (['行政', '會計', '秘書', '法律顧問', '推廣'].includes(name)) return '角色';
  if (['貿易', '零售', '顧問', '網店', '專業服務', '物流', '電商', '教育', '客服'].includes(name)) return '行業';
  return '場景';
}

export async function POST() {
  const allTags = [...new Set([
    ...solutions.flatMap(s => s.tags),
    ...cases.flatMap(c => c.tags),
    ...courses.flatMap(c => c.tags),
    ...faqs.flatMap(f => f.tags ?? []),
    ...painPoints.map(p => p.cat),
  ])];
  await writeDb({
    posts: [],
    solutions,
    cases,
    courses,
    tags: allTags.map((t, i) => ({ id: i + 1, name: t, group: tagGroup(t) })),
    faqs,
    painPoints,
  });
  return Response.json({
    ok: true,
    solutions: solutions.length,
    cases: cases.length,
    courses: courses.length,
    faqs: faqs.length,
    painPoints: painPoints.length,
    tags: allTags.length,
  });
}
