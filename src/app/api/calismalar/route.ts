import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, ID, Query } from 'node-appwrite';

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
  try {
    const body = await req.json();
    const db = getServerClient();
    const doc = await db.createDocument(DB_ID, COL_ID, ID.unique(), {
      ...body,
      olusturulma: new Date().toISOString(),
    });
    return NextResponse.json({ calisma: doc });
  } catch (error) {
    console.error('POST calisma error:', error);
    return NextResponse.json({ error: 'Kaydetme başarısız' }, { status: 500 });
  }
}
