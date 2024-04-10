import type { NewSong } from '~/server/database/schema'
import { songs as songsTable } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const newSongData = await readBody<NewSong>(event)
  const [song] = await useDb().insert(songsTable).values(newSongData).returning()
  return song
})
