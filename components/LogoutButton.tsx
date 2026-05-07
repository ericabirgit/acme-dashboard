"use client";

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-900 transition hover:bg-slate-100"
    >
      Kirjaudu ulos
    </button>
  );
}
