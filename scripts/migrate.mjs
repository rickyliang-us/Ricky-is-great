// Runs as Railway's pre-deploy command (see .railway/railway.ts) before each new
// deployment receives traffic. Applies pending Drizzle migrations from drizzle/.
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

try {
  process.loadEnvFile?.()
} catch {}

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const sql = postgres(url, { max: 1, connect_timeout: 10, onnotice: () => {} })
const db = drizzle(sql)

// On a brand-new project, Postgres may still be starting when this runs.
// Railway doesn't retry a failed pre-deploy command, so wait for it here.
for (let attempt = 1; ; attempt++) {
  try {
    await sql`select 1`
    break
  } catch (error) {
    if (attempt >= 20) throw error
    console.log(`waiting for Postgres (attempt ${attempt}): ${error.message}`)
    await new Promise((r) => setTimeout(r, 3000))
  }
}

await migrate(db, { migrationsFolder: './drizzle' })
console.log('✓ migrations applied')

await sql.end()
