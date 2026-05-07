import { prisma } from '@/lib/prisma';

const DEFAULT_USER_EMAIL = 'test@example.com';
const DEFAULT_USER_PASSWORD = 'password123';

async function getDefaultUserId() {
  let user = await prisma.user.findUnique({
    where: { email: DEFAULT_USER_EMAIL },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: DEFAULT_USER_EMAIL,
        password: DEFAULT_USER_PASSWORD,
      },
    });
  }

  return user.id;
}

export async function POST(req: Request) {
  const { customer, amount } = await req.json();
  const userId = await getDefaultUserId();

  await prisma.invoice.create({
    data: {
      customer,
      amount,
      status: 'pending',
      userId,
    },
  });

  return Response.json({ ok: true });
}
