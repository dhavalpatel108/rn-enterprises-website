import { prisma } from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@rnenterprises.com' },
    update: { password: hash, role: 'OWNER' },
    create: { email: 'admin@rnenterprises.com', name: 'Admin', password: hash, role: 'OWNER' }
  });
  console.log('Admin account created!');
}

main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
});
