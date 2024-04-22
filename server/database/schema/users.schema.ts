import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { deletedAt, id, timestamps } from '../../utils/dbFields'

export const users = sqliteTable('users', {
  id,
  name: text('name', { length: 100 }).notNull(),
  email: text('email').notNull().unique(),
  password: text('password', { length: 80 }).notNull(),
  ...timestamps,
  deletedAt,
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
