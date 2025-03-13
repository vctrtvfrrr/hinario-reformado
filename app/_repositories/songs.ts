'use server'

import { db } from '@/drizzle/db'
import { songsTable } from '@/drizzle/schema'
import { and, asc, count, eq, ilike, isNull, or } from 'drizzle-orm'

export async function countSongs(query: string = '') {
  const result = await db
    .select({ count: count() })
    .from(songsTable)
    .where(
      and(
        isNull(songsTable.deletedAt),
        or(
          ilike(songsTable.title, `%${query}%`),
          ilike(songsTable.version, `%${query}%`),
          ilike(songsTable.theme, `%${query}%`),
          ilike(songsTable.subtheme, `%${query}%`),
          ilike(songsTable.tags, `%${query}%`)
        )
      )
    )

  return result[0].count
}

export async function getSongs(page: number, itemsPerPage: number, query: string = '') {
  return await db
    .select()
    .from(songsTable)
    .where(
      and(
        isNull(songsTable.deletedAt),
        or(
          ilike(songsTable.title, `%${query}%`),
          ilike(songsTable.version, `%${query}%`),
          ilike(songsTable.theme, `%${query}%`),
          ilike(songsTable.subtheme, `%${query}%`),
          ilike(songsTable.tags, `%${query}%`)
        )
      )
    )
    .orderBy(asc(songsTable.page))
    .limit(itemsPerPage)
    .offset((page - 1) * itemsPerPage)
}

export async function searchSongs(query: string) {
  const results = await db
    .select()
    .from(songsTable)
    .where(and(isNull(songsTable.deletedAt), ilike(songsTable.title, `%${query}%`)))

  return results
}

export async function getSongById(id: number) {
  const result = await db
    .select()
    .from(songsTable)
    .where(and(isNull(songsTable.deletedAt), eq(songsTable.id, id)))
    .limit(1)

  return result[0]
}

export async function getSongByPage(page: number) {
  const result = await db.select().from(songsTable).where(eq(songsTable.page, page)).limit(1)

  return result[0]
}

export async function createSong(song: typeof songsTable.$inferInsert) {
  return await db.insert(songsTable).values(song).returning()
}

export async function updateSong(id: number, song: Partial<typeof songsTable.$inferSelect>) {
  return await db
    .update(songsTable)
    .set(song)
    .where(and(isNull(songsTable.deletedAt), eq(songsTable.id, id)))
    .returning()
}

export async function deleteSong(id: number) {
  return await db
    .update(songsTable)
    .set({ updatedAt: new Date(), deletedAt: new Date() })
    .where(and(isNull(songsTable.deletedAt), eq(songsTable.id, id)))
}
