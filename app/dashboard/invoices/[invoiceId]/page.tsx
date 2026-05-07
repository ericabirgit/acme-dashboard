import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import InvoiceForm from '@/components/InvoiceForm';

type Props = {
  params: {
    invoiceId: string;
  };
};

export default async function InvoiceEditPage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.invoiceId },
  });

  if (!invoice || invoice.userId !== user.id) {
    redirect('/dashboard/invoices');
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl space-y-8 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950">Muokkaa laskua</h1>
          <p className="mt-2 text-sm text-slate-600">Päivitä laskun tiedot tai poista lasku kokonaan.</p>
        </div>
        <Link
          href="/dashboard/invoices"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition hover:bg-slate-50"
        >
          Takaisin laskuihin
        </Link>
      </div>

      <InvoiceForm
        invoice={{
          id: invoice.id,
          customer: invoice.customer,
          amount: invoice.amount,
          status: invoice.status,
        }}
      />
    </div>
  );
}
