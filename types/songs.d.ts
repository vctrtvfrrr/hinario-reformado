import type { songs } from '~/server/database/schema'

declare global {
  type Song = typeof songs.$inferSelect
  type NewSong = typeof songs.$inferInsert

  type SongGetRequest = {
    id: number
    title: string
    artist: string
    lyrics: string
    chords: string
  }
}
