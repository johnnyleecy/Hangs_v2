import { NextRequest } from 'next/server';
import { readCollection, writeCollection, DbShape, COLLECTIONS } from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!COLLECTIONS.includes(collection as keyof DbShape)) return Response.json({ error: '未知集合' }, { status: 404 });
  return Response.json(await readCollection(collection as keyof DbShape));
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!COLLECTIONS.includes(collection as keyof DbShape)) return Response.json({ error: '未知集合' }, { status: 404 });
  const body = await req.json();
  const items = (await readCollection(collection as keyof DbShape)) as any[];
  const item = { ...body, id: body.id ?? Date.now() };
  items.push(item);
  await writeCollection(collection as keyof DbShape, items as any);
  return Response.json(item, { status: 201 });
}
