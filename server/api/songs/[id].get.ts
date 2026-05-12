import { and, eq, isNull } from 'drizzle-orm'
import { songs as songsTable } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const [song] = await useDb()
    .select()
    .from(songsTable)
    .where(and(eq(songsTable.id, +id), isNull(songsTable.deletedAt)))

  if (song) return song

  return createError({
    statusCode: 404,
    message: 'Song not found',
  })
})
