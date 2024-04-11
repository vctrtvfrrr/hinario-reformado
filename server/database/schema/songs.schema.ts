import { sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'
import { deletedAt, id, timestamps } from '../../utils/dbFields'

export const songs = sqliteTable('songs', {
  id,
  title: text('title', { length: 100 }).notNull(),
  artist: text('artist', { length: 50 }).notNull(),
  lyrics: text('lyrics').notNull(),
  chords: text('chords').notNull(),
  ...timestamps,
  deletedAt,
}, t => ({
  unq: unique().on(t.title, t.artist),
}))

export type Song = typeof songs.$inferSelect
export type NewSong = typeof songs.$inferInsert
