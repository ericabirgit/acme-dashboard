import { prisma } from '@/lib/prisma';
import { invoices, customers } from '@/lib/placeholder-data';

export async function GET() {
  try {
    await prisma.customer.createMany({
      data: customers,
    });
    await prisma.invoice.createMany({
      data: invoices,
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}