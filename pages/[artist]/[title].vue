<script lang="ts" setup>
const { params } = useRoute()
const store = useSongsStore()

for (const key in params) {
  params[key] = urldecode(params[key] as string)
}

const song = store.getSongByParams(params as SongParams)

if (!song) navigateTo('/')
</script>

<template>
  <div>
    <h1 class="mb-8 text-2xl font-bold">
      {{ song?.title }} <small class="block text-base font-normal italic">{{ song?.artist }}</small>
    </h1>

    <div class="flex gap-4">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="song?.lyrics.replace(/\n/g, '<br />')" />
      <ChordsArea v-if="song?.chords" :chords="song.chords" />
    </div>

    <div class="flex">
      <UButton to="/" label="Voltar" />
    </div>
  </div>
</template>
