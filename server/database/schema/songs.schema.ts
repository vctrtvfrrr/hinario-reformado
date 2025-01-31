import { relations } from 'drizzle-orm'
import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core'
import { artists, songChords, songsToTags } from '.'
import { deletedAt, id, timestamps } from './dbFields'

export const songs = pgTable(
  'songs',
  {
    id,
    title: varchar('title', { length: 100 }).notNull(),
    artistId: integer('artist_id').references(() => artists.id, { onDelete: 'restrict' }),
    lyrics: varchar('lyrics').notNull(),
    link: varchar('link'),
    ...timestamps,
    deletedAt,
  },
  (t) => ({
    unq: unique().on(t.title, t.artistId),
  })
)

export const songsRelations = relations(songs, ({ many }) => ({
  songsToTags: many(songsToTags),
  chords: many(songChords),
}))
