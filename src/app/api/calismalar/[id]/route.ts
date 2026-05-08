import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases } from 'node-appwrite';

function getServerClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');
  return new Databases(client);
}

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const COL_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getServerClient();
    await db.deleteDocument(DB_ID, COL_ID, params.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const db = getServerClient();
    const doc = await db.updateDocument(DB_ID, COL_ID, params.id, body);
    return NextResponse.json({ calisma: doc });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
  }
}
