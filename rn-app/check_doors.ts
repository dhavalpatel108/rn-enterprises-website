import { prisma } from './src/lib/prisma';

async function main() {
  const configs = await prisma.config.findMany();
  for (const c of configs) {
    if (c.key === 'doors') {
      console.log('doors config:', c.value);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
