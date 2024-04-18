import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'
import { deletedAt, id, timestamps } from '../../utils/dbFields'
import { artists } from './artists.schema'
import { songsToTags } from './songsToTags.schema'

export const songs = sqliteTable(
  'songs',
  {
    id,
    title: text('title', { length: 100 }).notNull(),
    artistId: integer('artist_id').references(() => artists.id),
    lyrics: text('lyrics').notNull(),
    chords: text('chords').notNull(),
    ...timestamps,
    deletedAt,
  },
  (t) => ({
    unq: unique().on(t.title, t.artistId),
  })
)

export const songsRelations = relations(songs, ({ many }) => ({
  songsToTags: many(songsToTags),
}))

export type Song = typeof songs.$inferSelect
export type NewSong = typeof songs.$inferInsert
