import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases } from 'node-appwrite';
import { isRequestAuthenticated } from '@/lib/server-auth';
import { calismaSchema } from '@/lib/validation';

function getServerClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');
  return new Databases(client);
}

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const COL_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';

// Next.js 15'te dinamik route params, Promise olarak gelen bir yapıdadır.
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: 'Yetkisiz işlem' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = getServerClient();
    await db.deleteDocument(DB_ID, COL_ID, id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: 'Yetkisiz işlem' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = calismaSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Geçersiz veri' }, { status: 400 });
    }

    const { id } = await params;
    const db = getServerClient();
    const doc = await db.updateDocument(DB_ID, COL_ID, id, parsed.data);
    return NextResponse.json({ calisma: doc });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
  }
}
