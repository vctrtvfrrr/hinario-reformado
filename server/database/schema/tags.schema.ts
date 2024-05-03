import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { songsToTags } from '.'
import { deletedAt, id, timestamps } from './dbFields'

export const tags = pgTable('tags', {
  id,
  label: varchar('label', { length: 50 }).notNull().unique(),
  ...timestamps,
  deletedAt,
})

export const tagsRelations = relations(tags, ({ many }) => ({
  songsToTags: many(songsToTags),
}))

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert
