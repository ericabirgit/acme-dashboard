"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type InvoiceFormProps = {
  invoice?: {
    id: string;
    customer: string;
    amount: number;
    status: string;
  };
};

export default function InvoiceForm({ invoice }: InvoiceFormProps) {
  const router = useRouter();
  const [customer, setCustomer] = useState(invoice?.customer || '');
  const [amount, setAmount] = useState(invoice?.amount.toString() || '0');
  const [status, setStatus] = useState(invoice?.status || 'pending');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      customer: customer.trim(),
      amount: Number(amount),
      status,
    };

    if (!payload.customer || !payload.amount) {
      setError('Syötä asiakkaan nimi ja summa.');
      setSaving(false);
      return;
    }

    const method = invoice ? 'PUT' : 'POST';
    const url = invoice ? `/api/invoices/${invoice.id}` : '/api/invoices';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError('Tallennus epäonnistui. Yritä uudelleen.');
      setSaving(false);
      return;
    }

    router.push('/dashboard/invoices');
  }

  async function handleDelete() {
    if (!invoice) return;
    const confirmDelete = window.confirm('Poistetaanko lasku?');
    if (!confirmDelete) return;

    await fetch(`/api/invoices/${invoice.id}`, { method: 'DELETE' });
    router.push('/dashboard/invoices');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-900">Asiakas</label>
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
          value={customer}
          onChange={(event) => setCustomer(event.target.value)}
          placeholder="Esim. ACME Oy"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-900">Summa</label>
          <input
            type="number"
            min="0"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-900">Tila</label>
          <select
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="pending">Odottaa</option>
            <option value="paid">Maksettu</option>
            <option value="overdue">Erääntynyt</option>
          </select>
        </div>
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Tallennetaan…' : invoice ? 'Päivitä lasku' : 'Luo lasku'}
        </button>

        {invoice ? (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
          >
            Poista lasku
          </button>
        ) : null}
      </div>
    </form>
  );
}
