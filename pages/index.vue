<script setup lang="ts">
const { data: songs } = await useFetch('/api/songs')

function preview(text: string): string {
  const lines = text.split('\n')
  if (lines.length >= 2) text = `${lines[0]}<br />${lines[1]}`
  return text
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="song in songs"
      :key="song.id"
      class="border shadow rounded px-4 py-2"
    >
      <h3 class="font-bold text-lg">
        <NuxtLink :to="`/song/${song.id}`">
          {{ `${song.title} &mdash; ${song.artist}` }}
        </NuxtLink>
      </h3>
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="text-sm italic"
        v-html="preview(song.lyrics)"
      />
    </div>
  </div>
</template>
