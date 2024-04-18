import { relations } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core'
import { songs } from './songs.schema'
import { tags } from './tags.schema'

export const songsToTags = sqliteTable(
  'songs_to_tags',
  {
    songId: integer('song_id')
      .notNull()
      .references(() => songs.id),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id),
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
