import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { deletedAt, id, timestamps } from '../../utils/dbFields'

export const songs = sqliteTable('songs', {
  id,
  title: text('title', { length: 100 }).notNull(),
  lyrics: text('lyrics').notNull(),
  chords: text('chords').notNull(),
  ...timestamps,
  deletedAt,
})

export type Song = typeof songs.$inferSelect
export type NewSong = typeof songs.$inferInsert
