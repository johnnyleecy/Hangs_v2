import { readDb } from './db';
import { solutions as seedSolutions } from './solutions-data';
import { cases as seedCases } from './cases-data';
import { faqs as seedFaqs } from './faqs-data';
import { painPoints as seedPainPoints } from './pain-points-data';
import { courses as seedCourses } from './courses-data';

// 公開頁面資料源：優先讀 db.json（後台改過），未 seed 就 fallback 返 TS 種子
export async function getSolutions() {
  const db = await readDb();
  return db.solutions?.length ? db.solutions : seedSolutions;
}
export async function getCases() {
  const db = await readDb();
  return db.cases?.length ? db.cases : seedCases;
}
export async function getFaqs() {
  const db = await readDb();
  return db.faqs?.length ? db.faqs : seedFaqs;
}
export async function getPainPoints() {
  const db = await readDb();
  return db.painPoints?.length ? db.painPoints : seedPainPoints;
}
export async function getCourses() {
  const db = await readDb();
  return db.courses?.length ? db.courses : seedCourses;
}
