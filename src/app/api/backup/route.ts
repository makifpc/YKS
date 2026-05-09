import { NextRequest, NextResponse } from 'next/server';
import { backupCalismaToGitHub } from '@/lib/server-github-backup';
import { isRequestAuthenticated } from '@/lib/server-auth';

export async function POST(req: NextRequest) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ ok: false, error: 'Yetkisiz işlem' }, { status: 401 });
  }

  try {
    const { id, data } = await req.json();
    const ok = await backupCalismaToGitHub(id, data);
    return NextResponse.json({ ok });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json({ ok: false });
  }
}
