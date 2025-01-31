import { relations } from 'drizzle-orm'
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { songs } from '.'
import { id, timestamps } from './dbFields'

export const songChords = pgTable('song_chords', {
  id,
  songId: integer('song_id').references(() => songs.id, { onDelete: 'cascade' }),
  line: varchar('line', { length: 100 }).notNull(),
  ...timestamps,
})

export const songChordsRelations = relations(songChords, ({ one }) => ({
  song: one(songs, {
    fields: [songChords.songId],
    references: [songs.id],
  }),
}))
