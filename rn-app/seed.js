const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const hash = await bcrypt.hash('rn123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@rnenterprises.com' },
    update: { password: hash, role: 'OWNER' },
    create: { email: 'admin@rnenterprises.com', name: 'Admin', password: hash, role: 'OWNER' }
  });
  console.log('Admin account created!');
}
main().catch(console.error).finally(async () => { await prisma.$disconnect(); });
