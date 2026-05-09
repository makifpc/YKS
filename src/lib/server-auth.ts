import { createHash, timingSafeEqual } from 'crypto';
import { NextRequest } from 'next/server';

export const SESSION_COOKIE_NAME = 'yks_session';

function getSessionPassword(): string {
  return process.env.SESSION_PASSWORD?.trim() || '';
}

function createSessionToken(): string {
  return createHash('sha256').update(`yks:${getSessionPassword()}`).digest('hex');
}

function safeCompare(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    const maxLength = Math.max(leftBuffer.length, rightBuffer.length);
    const paddedLeft = Buffer.alloc(maxLength);
    const paddedRight = Buffer.alloc(maxLength);
    leftBuffer.copy(paddedLeft);
    rightBuffer.copy(paddedRight);
    timingSafeEqual(paddedLeft, paddedRight);
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function hasSessionPassword(): boolean {
  return getSessionPassword().length > 0;
}

export function isPasswordValid(password: string): boolean {
  const expected = getSessionPassword();
  return !!expected && safeCompare(password, expected);
}

export function getSessionToken(): string {
  return createSessionToken();
}

export function isRequestAuthenticated(req: NextRequest): boolean {
  if (!hasSessionPassword()) return false;
  const cookieValue = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!cookieValue) return false;
  return safeCompare(cookieValue, createSessionToken());
}
