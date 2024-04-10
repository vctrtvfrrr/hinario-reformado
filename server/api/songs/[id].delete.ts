import { eq } from 'drizzle-orm'
import { songs as songsTable } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  await useDb()
    .update(songsTable)
    .set({ deletedAt: new Date().toISOString() })
    .where(eq(songsTable.id, +id))
})
