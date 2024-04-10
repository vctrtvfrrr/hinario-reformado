<script setup lang="ts">
const { data: songs } = await useFetch('/api/songs')

function preview(text: string): string {
  if (text.length > 70) text = text.slice(0, 70) + '...'
  return text.replace(/\n/g, '<br />')
}
</script>

<template>
  <div class="flex">
    <div
      v-for="song in songs"
      :key="song.id"
      class="border shadow rounded m-2 px-4 py-2"
    >
      <h3 class="font-bold text-lg">
        {{ song.title }}
      </h3>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="preview(song.lyrics)" />
    </div>
  </div>
</template>
