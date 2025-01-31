import { eq } from 'drizzle-orm'
import { ZodError } from 'zod'
import { artists as artistsTable, songs as songsTable } from '~/server/database/schema'
import { Song as SongValidation } from '~/server/validations/song.validation'

export default defineEventHandler(async (event) => {
  const requestBody = await readBody<NewSong>(event)

  try {
    const validatedData = SongValidation.parse(requestBody)

    const newSongData: NewSong = {
      ...validatedData,
      artistId: await firstOrCreateArtist(validatedData.artist),
    }

    const [song] = await useDb().insert(songsTable).values(newSongData).returning()

    return song
  } catch (err) {
    if (err instanceof ZodError) {
      setResponseStatus(event, 422)
      return JSON.parse(err.message)
    }

    throw err
  }
})

async function firstOrCreateArtist(artistName: string): Promise<number> {
  const artist = await useDb()
    .select({ id: artistsTable.id })
    .from(artistsTable)
    .where(eq(artistsTable.name, artistName))
    .get()

  if (artist) return artist.id

  const [record] = await useDb().insert(artistsTable).values({ name: artistName }).returning()

  return record.id
}
