import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import InvoiceForm from '@/components/InvoiceForm';

export default async function CreateInvoicePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <div>
          <h1 className="text-3xl font-semibold">Luo uusi lasku</h1>
          <p className="mt-2 text-slate-600">Täytä laskun tiedot ja tallenna lasku omalle dashboardillesi.</p>
        </div>

        <InvoiceForm />
      </div>
    </main>
  );
}
