"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type InvoiceRow = {
  id: string;
  customer: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function InvoiceTable({ invoices }: { invoices: InvoiceRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm('Haluatko varmasti poistaa laskun?');
    if (!confirmDelete) {
      return;
    }

    setDeletingId(id);
    await fetch(`/api/invoices/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3">Asiakas</th>
            <th className="px-4 py-3">Summa</th>
            <th className="px-4 py-3">Tila</th>
            <th className="px-4 py-3">Luotu</th>
            <th className="px-4 py-3">Toiminnot</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {invoices.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                Ei vielä laskuja. Luo uusi lasku ylhäältä.
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-4 py-4 text-slate-900">{invoice.customer}</td>
                <td className="px-4 py-4 text-slate-900">{invoice.amount} €</td>
                <td className="px-4 py-4 text-slate-900">{invoice.status}</td>
                <td className="px-4 py-4 text-slate-500">{new Date(invoice.createdAt).toLocaleDateString('fi-FI')}</td>
                <td className="px-4 py-4 space-x-2">
                  <Link
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-200"
                    href={`/dashboard/invoices/${invoice.id}`}
                  >
                    Muokkaa
                  </Link>
                  <button
                    type="button"
                    disabled={deletingId === invoice.id}
                    onClick={() => handleDelete(invoice.id)}
                    className="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-700 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === invoice.id ? 'Poistetaan…' : 'Poista'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
