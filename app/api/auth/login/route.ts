import { NextResponse } from 'next/server';
import { verifyCredentials, ensureDefaultUser, createSessionCookie, DEFAULT_USER_CREDENTIALS } from '@/lib/auth';

export async function POST(request: Request) {
  await ensureDefaultUser();

  const body = await request.json();
  const email = body.email?.toString().trim();
  const password = body.password?.toString().trim();

  if (!email || !password) {
    return NextResponse.json({ error: 'Syötä sähköposti ja salasana.' }, { status: 400 });
  }

  const user = await verifyCredentials(email, password);

  if (!user) {
    return NextResponse.json({
      error: `Käyttäjätunnus tai salasana ei täsmää. Käytä: ${DEFAULT_USER_CREDENTIALS.email} / ${DEFAULT_USER_CREDENTIALS.password}`,
    }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.headers.set('Set-Cookie', createSessionCookie(user.id));
  return response;
}
