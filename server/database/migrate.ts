import 'dotenv/config'
import { resolve } from 'pathe'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

const sqlite = new Database(
  resolve(import.meta.dirname, '../../', process.env.DATABASE || 'server/database/db.sqlite')
)
const db = drizzle(sqlite)

migrate(db, { migrationsFolder: resolve(import.meta.dirname, './migrations') })

sqlite.close()
