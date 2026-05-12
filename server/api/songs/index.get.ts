import { isNull } from 'drizzle-orm'
import { songs as songsTable } from '~/server/database/schema'

export default defineEventHandler(async () => {
  const songs = await useDb().select().from(songsTable).where(isNull(songsTable.deletedAt))
  return songs
})
