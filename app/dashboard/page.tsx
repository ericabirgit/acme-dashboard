import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const invoiceCount = await prisma.invoice.count({
    where: { userId: user.id },
  });

  const amountSum = await prisma.invoice.aggregate({
    where: { userId: user.id },
    _sum: { amount: true },
  });

  const totalAmount = amountSum._sum.amount ?? 0;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Tervetuloa, {user.email}</h1>
          <p className="mt-2 text-slate-600">Täällä voit hallita laskuja, luoda uuden laskun ja seurata maksatuksia.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/invoices"
            className="rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Näytä laskut
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Laskut yhteensä</p>
          <p className="mt-6 text-4xl font-semibold">{invoiceCount}</p>
          <p className="mt-2 text-sm text-slate-400">Laskuja käyttäjällesi</p>
        </section>
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Kokonaismäärä</p>
          <p className="mt-6 text-4xl font-semibold text-slate-950">{totalAmount} €</p>
          <p className="mt-2 text-sm text-slate-500">Kaikki laskut yhteenlaskettuna</p>
        </section>
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Seuraava vaihe</p>
          <p className="mt-6 text-slate-900">Lisää uusi lasku tai muokkaa olemassa olevia laskuja laskujen hallintasivulla.</p>
        </section>
      </div>
    </main>
  );
}
