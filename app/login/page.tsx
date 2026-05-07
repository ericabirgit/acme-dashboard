"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DEFAULT_USER_CREDENTIALS } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Kirjautumisessa tapahtui virhe.');
      return;
    }

    router.push('/dashboard');
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">Kirjaudu ACME Dashboardiin</h1>
          <p className="text-slate-600">
            Käytä esimerkkitunnuksia, jotta pääset kokeilemaan sovelluksen laskujen hallintaa.
          </p>
          <p className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Sähköposti: <strong>{DEFAULT_USER_CREDENTIALS.email}</strong> <br />
            Salasana: <strong>{DEFAULT_USER_CREDENTIALS.password}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-900">Sähköposti</label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Salasana</label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Salasana"
              required
            />
          </div>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Kirjaudutaan…' : 'Kirjaudu'}
          </button>
        </form>

        <p className="text-sm text-slate-600">
          Takaisin etusivulle{' '}
          <Link className="font-semibold text-slate-950 hover:underline" href="/">
            ACME kotiin
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
