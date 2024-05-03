import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import { pgPool } from '../database/db'
import * as schema from '../database/schema'

let db: NodePgDatabase<typeof schema> | null

export function useDb() {
  if (db) return db
  db = drizzle(pgPool, { schema })
  return db
}
