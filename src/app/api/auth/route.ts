import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, hasSessionPassword, isPasswordValid, SESSION_COOKIE_NAME } from '@/lib/server-auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!hasSessionPassword()) {
    return NextResponse.json({ ok: false, error: 'Şifre yapılandırılmamış' }, { status: 500 });
  }

  if (isPasswordValid(password)) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: getSessionToken(),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    maxAge: 0,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  return res;
}
