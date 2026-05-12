<script setup lang="ts">
const store = useSongsStore()

await useAsyncData('songs', () => store.fetchSongs())

const { songs } = storeToRefs(store)

function preview(text: string): string {
  const lines = text.split('\n')
  if (lines.length >= 2) text = `${lines[0]}<br />${lines[1]}`
  return text
}
</script>

<template>
  <div class="space-y-4">
    <div v-for="song in songs" :key="song.id" class="rounded border px-4 py-2 shadow">
      <h3 class="text-lg font-bold">
        <NuxtLink :to="`/${urlencode(song.artist)}/${urlencode(song.title)}`">
          {{ `${song.title} &mdash; ${song.artist}` }}
        </NuxtLink>
      </h3>
      <!-- eslint-disable vue/no-v-html -->
      <div class="text-sm italic" v-html="preview(song.lyrics)" />
    </div>
  </div>
</template>
