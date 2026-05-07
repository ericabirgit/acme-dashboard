import { cookies } from 'next/headers';
import { prisma } from './prisma';

const SESSION_COOKIE_NAME = 'acme-session';
const DEFAULT_USER_EMAIL = 'user@acme.com';
const DEFAULT_USER_PASSWORD = 'password123';

export async function getCurrentUser() {
  const cookieStore = cookies();
  const userId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function ensureDefaultUser() {
  let user = await prisma.user.findUnique({
    where: { email: DEFAULT_USER_EMAIL },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: DEFAULT_USER_EMAIL,
        password: DEFAULT_USER_PASSWORD,
      },
    });
  }

  return user;
}

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return null;
  }

  return user;
}

export function createSessionCookie(userId: string) {
  const maxAge = 60 * 60 * 24 * 7;
  return `${SESSION_COOKIE_NAME}=${userId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge};`;
}

export function deleteSessionCookie() {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0;`; 
}

export const DEFAULT_USER_CREDENTIALS = {
  email: DEFAULT_USER_EMAIL,
  password: DEFAULT_USER_PASSWORD,
};
