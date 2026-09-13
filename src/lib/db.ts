import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'db.json');

export type DbShape = {
  posts: any[];
  solutions: any[];
  cases: any[];
  courses: any[];
  tags: any[];
  faqs: any[];
  painPoints: any[];
};

const EMPTY: DbShape = { posts: [], solutions: [], cases: [], courses: [], tags: [], faqs: [], painPoints: [] };

export async function readDb(): Promise<DbShape> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return { ...EMPTY };
  }
}

export async function writeDb(db: DbShape): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

export async function readCollection<K extends keyof DbShape>(name: K): Promise<DbShape[K]> {
  const db = await readDb();
  return db[name];
}

export async function writeCollection<K extends keyof DbShape>(name: K, items: DbShape[K]): Promise<void> {
  const db = await readDb();
  db[name] = items;
  await writeDb(db);
}

export const COLLECTIONS: (keyof DbShape)[] = ['posts', 'solutions', 'cases', 'courses', 'tags', 'faqs', 'painPoints'];
