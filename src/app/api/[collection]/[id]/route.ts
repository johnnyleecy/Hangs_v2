import { NextRequest } from 'next/server';
import { readCollection, writeCollection, DbShape, COLLECTIONS } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const { collection, id } = await params;
  if (!COLLECTIONS.includes(collection as keyof DbShape)) return Response.json({ error: '未知集合' }, { status: 404 });
  const body = await req.json();
  const items = (await readCollection(collection as keyof DbShape)) as any[];
  const index = items.findIndex((i: any) => String(i.id ?? i.slug) === id);
  if (index === -1) return Response.json({ error: '找不到項目' }, { status: 404 });
  items[index] = { ...items[index], ...body, id: items[index].id };
  await writeCollection(collection as keyof DbShape, items as any);
  return Response.json(items[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const { collection, id } = await params;
  if (!COLLECTIONS.includes(collection as keyof DbShape)) return Response.json({ error: '未知集合' }, { status: 404 });
  const items = (await readCollection(collection as keyof DbShape)) as any[];
  const next = items.filter((i: any) => String(i.id ?? i.slug) !== id);
  await writeCollection(collection as keyof DbShape, next as any);
  return Response.json({ ok: true });
}
