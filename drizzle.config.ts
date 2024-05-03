import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { dbConfig } from './server/database/db'

export default defineConfig({
  schema: './server/database/schema/index.ts',
  out: './server/database/migrations',
  driver: 'pg',
  dbCredentials: dbConfig,
  verbose: true,
  strict: true,
})
