import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correctPassword = process.env.SESSION_PASSWORD;
  if (!correctPassword) {
    return NextResponse.json({ ok: false, error: 'Şifre yapılandırılmamış' }, { status: 500 });
  }
  if (password === correctPassword) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
