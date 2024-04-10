import { Database } from 'bun:sqlite'
import type { BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import * as schema from '../database/schema'

let sqlite: Database | null
let db: BunSQLiteDatabase<typeof schema> | null

const config = useRuntimeConfig()

export function useDb() {
  if (sqlite && db) return db

  sqlite = new Database(config.database)
  db = drizzle(sqlite, { schema })

  return db
}
