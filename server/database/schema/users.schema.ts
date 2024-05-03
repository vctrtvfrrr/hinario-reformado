import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { deletedAt, id, timestamps } from './dbFields'

export const users = pgTable('users', {
  id,
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password', { length: 80 }).notNull(),
  ...timestamps,
  deletedAt,
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
