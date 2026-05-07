import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const customer = body.customer?.toString().trim();
  const amount = Number(body.amount);
  const status = body.status?.toString() || 'pending';

  if (!customer || !amount) {
    return NextResponse.json({ error: 'Asiakkaan nimi ja summa ovat pakollisia.' }, { status: 400 });
  }

  await prisma.invoice.create({
    data: {
      customer,
      amount,
      status,
      userId: user.id,
    },
  });

  return NextResponse.json({ ok: true });
}
