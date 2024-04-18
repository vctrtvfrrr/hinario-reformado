import 'dotenv/config'
import { resolve } from 'pathe'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

const sqlite = new Database(
  resolve(__dirname, '../../', process.env.DATABASE || 'server/database/db.sqlite')
)
const db = drizzle(sqlite)

migrate(db, { migrationsFolder: resolve(__dirname, './migrations') })

sqlite.close()
