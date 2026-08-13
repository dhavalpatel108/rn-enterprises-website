const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres.unlwcjibxsawnbpoxuxu:%40Ren15041960%23@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
});

async function main() {
  await client.connect();
  const res = await client.query('SELECT pg_size_pretty(pg_database_size(current_database())) as size');
  console.log(res.rows[0].size);
  await client.end();
}

main().catch(console.error);
