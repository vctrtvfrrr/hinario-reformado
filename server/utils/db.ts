import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from '../database/schema'

let pool: pg.Pool | null
let db: NodePgDatabase<typeof schema> | null

const config = useRuntimeConfig()

export function useDb() {
  if (pool && db) return db

  pool = new pg.Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  })

  db = drizzle(pool, { schema })

  return db
}
