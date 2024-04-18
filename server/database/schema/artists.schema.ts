import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { deletedAt, id, timestamps } from '../../utils/dbFields'

export const artists = sqliteTable('artists', {
  id,
  name: text('name', { length: 50 }).notNull().unique(),
  ...timestamps,
  deletedAt,
})

export type Artist = typeof artists.$inferSelect
export type NewArtist = typeof artists.$inferInsert
