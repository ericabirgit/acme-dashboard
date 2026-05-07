import { prisma } from '@/lib/prisma';

export default async function Page() {
  const invoices = await prisma.invoice.findMany({
    include: { user: true },
  });

  return (
    <div>
      <h1>Invoices</h1>
      <p>
        <a href="/dashboard/invoices/create">Create new invoice</a>
      </p>
      <ul>
        {invoices.map((inv) => (
          <li key={inv.id}>
            {inv.customer} — {inv.amount}€ — {inv.status} — {inv.user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
