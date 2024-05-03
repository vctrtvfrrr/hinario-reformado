import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { deletedAt, id, timestamps } from '../../utils/dbFields'

export const artists = pgTable('artists', {
  id,
  name: varchar('name', { length: 50 }).notNull().unique(),
  ...timestamps,
  deletedAt,
})

export type Artist = typeof artists.$inferSelect
export type NewArtist = typeof artists.$inferInsert
