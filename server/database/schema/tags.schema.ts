import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { deletedAt, id, timestamps } from '../../utils/dbFields'
import { songsToTags } from './songsToTags.schema'

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
