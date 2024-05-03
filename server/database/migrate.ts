import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { resolve } from 'pathe'
import { pgPool } from './db'

console.log('Start migrating...')

const db = drizzle(pgPool)

await migrate(db, { migrationsFolder: resolve(import.meta.dirname, './migrations') })

console.log('Database migrated successfully!')

await pgPool.end()

process.exit(0)
