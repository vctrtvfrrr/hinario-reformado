import Database, { type Database as DatabaseType } from 'better-sqlite3'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '../database/schema'

let sqlite: DatabaseType | null
let db: BetterSQLite3Database<typeof schema> | null

const config = useRuntimeConfig()

export function useDb() {
  if (sqlite && db) return db

  sqlite = new Database(config.database)
  db = drizzle(sqlite, { schema })

  return db
}
