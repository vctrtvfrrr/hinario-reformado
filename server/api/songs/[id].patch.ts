import { and, eq, isNull } from 'drizzle-orm'
import type { NewSong } from '~/server/database/schema'
import { songs as songsTable } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const newSongData = await readBody<NewSong>(event)
  const [song] = await useDb()
    .update(songsTable)
    .set({ ...newSongData, updatedAt: new Date().toISOString() })
    .where(and(eq(songsTable.id, +id), isNull(songsTable.deletedAt)))
    .returning()

  if (!song) return createError({
    statusCode: 404,
    message: 'Song not found',
  })

  return song
})
