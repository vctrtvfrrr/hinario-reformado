import { boolean, date, integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
import { timestamps } from './columns.helpers'

const songs = pgTable('songs', {
  id: serial('id').primaryKey(),
  page: integer('page').notNull(),
  title: varchar('title').notNull(),
  version: varchar('version').notNull(),
  lyrics: boolean('lyrics').default(false).notNull(),
  chords: boolean('chords').default(false).notNull(),
  rehearsed: boolean('rehearsed').default(false).notNull(),
  theme: varchar('theme').notNull(),
  subtheme: varchar('subtheme').notNull(),
  tags: text('tags'),
  lastTimeSung: date('last_time_sung'),
  timesSung: integer('times_sung').default(0).notNull(),
  references: varchar('references'),
  notes: varchar('notes'),
  ...timestamps,
})

export { songs as songsTable }
