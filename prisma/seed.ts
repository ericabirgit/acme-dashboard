import 'dotenv/config';
import { prisma } from '../lib/prisma.ts';

async function main() {
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'password123',
      invoices: {
        create: [
          { customer: 'Acme Corp', amount: 500, status: 'pending' },
          { customer: 'Globex', amount: 1200, status: 'paid' },
        ],
      },
    },
  });
}

main()
  .then(() => console.log('Seed completed'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
