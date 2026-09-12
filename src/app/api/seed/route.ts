import { solutions } from '@/lib/solutions-data';
import { cases } from '@/lib/cases-data';
import { faqs } from '@/lib/faqs-data';
import { painPoints } from '@/lib/pain-points-data';
import { writeDb } from '@/lib/db';

export async function POST() {
  const allTags = [...new Set([
    ...solutions.flatMap(s => s.tags),
    ...cases.flatMap(c => c.tags),
    ...faqs.flatMap(f => f.tags ?? []),
    ...painPoints.map(p => p.cat),
  ])];
  await writeDb({
    posts: [],
    solutions,
    cases,
    tags: allTags.map((t, i) => ({ id: i + 1, name: t })),
    faqs,
    painPoints,
  });
  return Response.json({ ok: true, solutions: solutions.length, cases: cases.length, faqs: faqs.length, painPoints: painPoints.length, tags: allTags.length });
}
