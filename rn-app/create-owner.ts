import { prisma } from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  
  if (!email || !password) {
    console.error("Please provide email and password as arguments.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  
  await prisma.user.upsert({
    where: { email },
    update: { password: hash, role: 'OWNER' },
    create: { email, name: 'Owner', password: hash, role: 'OWNER' }
  });
  console.log(`Owner account created/updated for ${email}!`);
}

main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
});
