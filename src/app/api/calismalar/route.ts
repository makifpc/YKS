import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, ID, Query } from 'node-appwrite';
import { calismaSchema } from '@/lib/validation';
import { isRequestAuthenticated } from '@/lib/server-auth';
import { backupCalismaToGitHub } from '@/lib/server-github-backup';

function getServerClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');
  return new Databases(client);
}

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const COL_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';

export async function GET() {
  try {
    const db = getServerClient();
    const result = await db.listDocuments(DB_ID, COL_ID, [
      Query.orderDesc('tarih'),
      Query.limit(500),
    ]);
    return NextResponse.json({ calismalar: result.documents });
  } catch (error) {
    console.error('GET calismalar error:', error);
    return NextResponse.json({ calismalar: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: 'Yetkisiz işlem' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = calismaSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Geçersiz veri' }, { status: 400 });
    }

    const db = getServerClient();
    const doc = await db.createDocument(DB_ID, COL_ID, ID.unique(), {
      ...parsed.data,
      olusturulma: new Date().toISOString(),
    });

    const backupOk = await backupCalismaToGitHub(doc.$id, doc);
    if (!backupOk) {
      console.warn(`Kayıt oluşturuldu ancak GitHub yedeği başarısız: ${doc.$id}`);
    }

    return NextResponse.json({ calisma: doc });
  } catch (error) {
    console.error('POST calisma error:', error);
    return NextResponse.json({ error: 'Kaydetme başarısız' }, { status: 500 });
  }
}
