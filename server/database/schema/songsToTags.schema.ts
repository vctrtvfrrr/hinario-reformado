import { relations } from 'drizzle-orm'
import { integer, primaryKey, pgTable } from 'drizzle-orm/pg-core'
import { songs, tags } from '.'

export const songsToTags = pgTable(
  'songs_to_tags',
  {
    songId: integer('song_id')
      .notNull()
      .references(() => songs.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.songId, t.tagId] }),
  })
)

export const songsToTagsRelations = relations(songsToTags, ({ one }) => ({
  tag: one(tags, {
    fields: [songsToTags.tagId],
    references: [tags.id],
  }),
  song: one(songs, {
    fields: [songsToTags.songId],
    references: [songs.id],
  }),
}))
