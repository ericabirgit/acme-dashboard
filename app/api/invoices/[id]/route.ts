import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { customer, amount, status } = body;

  if (!customer || !amount || !status) {
    return NextResponse.json({ error: 'Kaikki kentät ovat pakollisia.' }, { status: 400 });
  }

  const invoice = await prisma.invoice.findUnique({ where: { id: params.id } });
  if (!invoice || invoice.userId !== user.id) {
    return NextResponse.json({ error: 'Laskua ei löydy.' }, { status: 404 });
  }

  await prisma.invoice.update({
    where: { id: params.id },
    data: {
      customer: customer.toString(),
      amount: Number(amount),
      status: status.toString(),
    },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const invoice = await prisma.invoice.findUnique({ where: { id: params.id } });
  if (!invoice || invoice.userId !== user.id) {
    return NextResponse.json({ error: 'Laskua ei löydy.' }, { status: 404 });
  }

  await prisma.invoice.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
