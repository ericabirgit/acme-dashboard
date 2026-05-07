import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import InvoiceTable from '@/components/InvoiceTable';

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  const invoiceRows = invoices.map((invoice) => ({
    id: invoice.id,
    customer: invoice.customer,
    amount: invoice.amount,
    status: invoice.status,
    createdAt: invoice.createdAt.toISOString(),
  }));

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Laskut</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Hallitse laskujasi</h1>
          <p className="mt-2 text-slate-600">Täällä voit tarkastella, muokata ja poistaa omia laskujasi.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/invoices/create"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Luo uusi lasku
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
          >
            Takaisin dashboardiin
          </Link>
        </div>
      </div>

      <InvoiceTable invoices={invoiceRows} />
    </main>
  );
}
