import { defineStore } from 'pinia'
import type { Song } from '../server/database/schema'

export type SongParams = {
  artist: string
  title: string
}

export const useSongsStore = defineStore('Songs', () => {
  const items = ref<Song[]>()

  async function fetchSongs() {
    const { data } = await useFetch('/api/songs')
    if (data.value !== null) items.value = data.value
  }

  const songs = computed(() => {
    return items.value?.map((song) => {
      return { ...song, lyrics: preview(song.lyrics), chords: preview(song.chords) }
    })
  })

  const getSongByParams = computed(() => {
    return (params: SongParams) =>
      items.value?.find((i) => {
        return i.artist === params.artist && i.title === params.title
      })
  })

  return { items, fetchSongs, songs, getSongByParams }
})

function preview(text: string): string {
  const lines = text.split('\n')
  if (lines.length >= 2) text = `${lines[0]}<br />${lines[1]}`
  return text
}
