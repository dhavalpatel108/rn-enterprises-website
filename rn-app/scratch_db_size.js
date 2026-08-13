const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const result = await prisma.$queryRaw`SELECT pg_size_pretty(pg_database_size(current_database())) as size`;
    console.log(result);
}
main().catch(console.error).finally(() => prisma.$disconnect());
