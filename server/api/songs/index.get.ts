import { eq, isNull, sql } from 'drizzle-orm'
import * as table from '~/server/database/schema'

export default defineEventHandler(async (): Promise<SongGetRequest[]> => {
  const songs = await useDb()
    .select({
      id: table.songs.id,
      title: table.songs.title,
      artist: sql<string>`COALESCE(${table.artists.name}, '')`,
      lyrics: table.songs.lyrics,
      chords: sql<string>`COALESCE(${table.songChords.line}, '')`,
      link: table.songs.link,
    })
    .from(table.songs)
    .leftJoin(table.artists, eq(table.artists.id, table.songs.artistId))
    .leftJoin(table.songChords, eq(table.songChords.songId, table.songs.id))
    .where(isNull(table.songs.deletedAt))
    .execute()

  return songs
})
