import { eq, isNull, sql } from 'drizzle-orm'
import * as table from '~/server/database/schema'

export default defineEventHandler(async (): Promise<SongGetRequest[]> => {
  const songs = await useDb()
    .select({
      id: table.songs.id,
      title: table.songs.title,
      artist: sql<string>`COALESCE(${table.artists.name}, '')`,
      lyrics: table.songs.lyrics,
      chords: table.songs.chords,
    })
    .from(table.songs)
    .leftJoin(table.artists, eq(table.artists.id, table.songs.artistId))
    .where(isNull(table.songs.deletedAt))
    .all()

  return songs
})
