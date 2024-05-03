import { drizzle } from 'drizzle-orm/node-postgres'
import { pgPool } from './db'
import { userSeeder } from './seeds'

console.log('Start seeding...')

const db = drizzle(pgPool)
await userSeeder(db)

console.log('Database seeded successfully!')

await pgPool.end()

process.exit(0)
